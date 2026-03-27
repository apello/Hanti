#!/usr/bin/env python3
"""
BuyRentKenya Scraper CLI

Command-line interface for running the BuyRentKenya web scraper.
Provides options to scrape specific data types or run the complete scraper.

Author: AI Assistant
Date: September 16, 2025
"""

import argparse
import sys
import os
import logging
from datetime import datetime
from buyrentkenya_scraper import BuyRentKenyaScraper


def setup_argument_parser():
    """Setup command line argument parser"""
    parser = argparse.ArgumentParser(
        description="BuyRentKenya Web Scraper - Extract real estate data from BuyRentKenya.com",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  %(prog)s --all                    # Scrape all data types
  %(prog)s --listings               # Scrape property listings only
  %(prog)s --projects --articles    # Scrape projects and articles
  %(prog)s --config custom.json     # Use custom configuration file
  %(prog)s --max-listings 50        # Limit property listings to 50
        """
    )
    
    # Data type options
    parser.add_argument(
        '--all', 
        action='store_true', 
        help='Scrape all data types (properties, projects, articles, agents)'
    )
    parser.add_argument(
        '--listings', 
        action='store_true', 
        help='Scrape property listings'
    )
    parser.add_argument(
        '--projects', 
        action='store_true', 
        help='Scrape real estate projects'
    )
    parser.add_argument(
        '--articles', 
        action='store_true', 
        help='Scrape property articles'
    )
    parser.add_argument(
        '--agents', 
        action='store_true', 
        help='Scrape estate agents'
    )
    
    # Configuration options
    parser.add_argument(
        '--config', 
        default='scraper_config.json',
        help='Path to configuration file (default: scraper_config.json)'
    )
    parser.add_argument(
        '--max-listings', 
        type=int,
        help='Maximum number of property listings to scrape'
    )
    parser.add_argument(
        '--no-images', 
        action='store_true',
        help='Skip image downloading'
    )
    
    # Output options
    parser.add_argument(
        '--output-dir', 
        help='Output directory for scraped data'
    )
    parser.add_argument(
        '--verbose', '-v', 
        action='store_true',
        help='Enable verbose logging'
    )
    parser.add_argument(
        '--quiet', '-q', 
        action='store_true',
        help='Reduce output to errors only'
    )
    
    return parser


def main():
    """Main CLI function"""
    parser = setup_argument_parser()
    args = parser.parse_args()
    
    # Setup logging based on verbosity
    if args.quiet:
        logging.basicConfig(level=logging.ERROR)
    elif args.verbose:
        logging.basicConfig(level=logging.DEBUG)
    else:
        logging.basicConfig(level=logging.INFO)
    
    logger = logging.getLogger(__name__)
    
    # Initialize scraper
    try:
        scraper = BuyRentKenyaScraper(config_path=args.config)
        
        # Override config options from command line
        if args.max_listings:
            scraper.config['max_listings_per_run'] = args.max_listings
        if args.no_images:
            scraper.config['download_images'] = False
        if args.output_dir:
            scraper.config['output_directory'] = args.output_dir
            scraper.data_dir = args.output_dir
            scraper.json_dir = os.path.join(args.output_dir, 'json')
            scraper.images_dir = os.path.join(args.output_dir, 'images')
    
    except Exception as e:
        logger.error(f"Failed to initialize scraper: {e}")
        sys.exit(1)
    
    # Determine what to scrape
    scrape_all = args.all or not any([args.listings, args.projects, args.articles, args.agents])
    
    if not (scrape_all or args.listings or args.projects or args.articles or args.agents):
        logger.error("No scraping options specified. Use --help for usage information.")
        sys.exit(1)
    
    # Start scraping session
    logger.info("Starting BuyRentKenya scraping session")
    scraper.stats['start_time'] = datetime.now().isoformat()
    
    try:
        # Scrape based on options
        if scrape_all:
            logger.info("Running full scrape (all data types)")
            scraper.run_full_scrape()
        else:
            # Individual data type scraping
            if args.listings:
                logger.info("Scraping property listings")
                scraper.scraped_data['property_listings'] = scraper.scrape_property_listings()
            
            if args.projects:
                logger.info("Scraping real estate projects")
                scraper.scraped_data['projects'] = scraper.scrape_projects()
            
            if args.articles:
                logger.info("Scraping property articles")
                scraper.scraped_data['articles'] = scraper.scrape_articles()
            
            if args.agents:
                logger.info("Scraping estate agents")
                scraper.scraped_data['estate_agents'] = scraper.scrape_estate_agents()
            
            # Save data
            scraper.save_data()
        
        # Display summary
        total_items = scraper.stats['total_items']
        images_downloaded = scraper.stats['images_downloaded']
        errors = scraper.stats['errors']
        
        logger.info(f"""
Scraping completed successfully!

Summary:
- Total items scraped: {total_items}
- Images downloaded: {images_downloaded}
- Errors encountered: {errors}
- Data saved to: {scraper.data_dir}

Check the following files:
- JSON data: {scraper.json_dir}/
- Images: {scraper.images_dir}/
- Logs: buyrentkenya_scraper.log
        """)
        
    except KeyboardInterrupt:
        logger.warning("Scraping interrupted by user")
        sys.exit(130)
    except Exception as e:
        logger.error(f"Scraping failed: {e}")
        if args.verbose:
            import traceback
            logger.error(traceback.format_exc())
        sys.exit(1)
    
    finally:
        scraper.stats['end_time'] = datetime.now().isoformat()


if __name__ == "__main__":
    main()
