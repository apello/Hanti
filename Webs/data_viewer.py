#!/usr/bin/env python3
"""
BuyRentKenya Data Viewer

A tool for analyzing and viewing scraped data from BuyRentKenya.com
Provides summary statistics, search functionality, and data analysis.

Author: AI Assistant
Date: September 16, 2025
"""

import argparse
import json
import os
from datetime import datetime
from typing import Dict, List, Any, Optional


class DataViewer:
    """Data analysis and viewing tool for scraped BuyRentKenya data"""
    
    def __init__(self, data_dir: str = "buyrentkenya_data"):
        """Initialize data viewer with data directory"""
        self.data_dir = data_dir
        self.json_dir = os.path.join(data_dir, 'json')
        self.images_dir = os.path.join(data_dir, 'images')
        
        # Load all data
        self.data = self._load_all_data()
    
    def _load_all_data(self) -> Dict[str, Any]:
        """Load all JSON data files"""
        data = {
            'property_listings': [],
            'projects': [],
            'articles': [],
            'estate_agents': [],
            'summary': {},
            'complete_data': {}
        }
        
        # Data files to load
        data_files = {
            'property_listings': 'property_listings.json',
            'projects': 'projects.json',
            'articles': 'articles.json',
            'estate_agents': 'estate_agents.json',
            'summary': 'scraping_summary.json',
            'complete_data': 'buyrentkenya_complete_data.json'
        }
        
        for data_type, filename in data_files.items():
            filepath = os.path.join(self.json_dir, filename)
            if os.path.exists(filepath):
                try:
                    with open(filepath, 'r', encoding='utf-8') as f:
                        data[data_type] = json.load(f)
                except json.JSONDecodeError as e:
                    print(f"Error loading {filename}: {e}")
                except Exception as e:
                    print(f"Error reading {filename}: {e}")
        
        return data
    
    def show_summary(self):
        """Display summary statistics"""
        print("=" * 60)
        print("BUYRENTKENYA SCRAPED DATA SUMMARY")
        print("=" * 60)
        
        # Data counts
        listings_count = len(self.data.get('property_listings', []))
        projects_count = len(self.data.get('projects', []))
        articles_count = len(self.data.get('articles', []))
        agents_count = len(self.data.get('estate_agents', []))
        total_items = listings_count + projects_count + articles_count + agents_count
        
        print(f"\nDATA COUNTS:")
        print(f"  Property Listings: {listings_count}")
        print(f"  Real Estate Projects: {projects_count}")
        print(f"  Articles: {articles_count}")
        print(f"  Estate Agents: {agents_count}")
        print(f"  Total Items: {total_items}")
        
        # Image statistics
        if os.path.exists(self.images_dir):
            image_files = [f for f in os.listdir(self.images_dir) if f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp'))]
            total_images = len(image_files)
            
            # Calculate total image size
            total_size = 0
            for img_file in image_files:
                img_path = os.path.join(self.images_dir, img_file)
                try:
                    total_size += os.path.getsize(img_path)
                except:
                    pass
            
            print(f"\nIMAGE STATISTICS:")
            print(f"  Total Images: {total_images}")
            print(f"  Total Size: {total_size / (1024*1024):.1f} MB")
        
        # Scraping session info
        if 'summary' in self.data and self.data['summary']:
            summary = self.data['summary']
            if 'scraping_session' in summary:
                session = summary['scraping_session']
                duration = session.get('duration_seconds', 0)
                print(f"\nLAST SCRAPING SESSION:")
                print(f"  Start Time: {session.get('start_time', 'N/A')}")
                print(f"  Duration: {duration:.1f} seconds")
        
        print("\n" + "=" * 60)
    
    def show_properties(self, limit: int = 10):
        """Display property listings"""
        listings = self.data.get('property_listings', [])
        
        if not listings:
            print("No property listings found.")
            return
        
        print(f"\nPROPERTY LISTINGS (showing {min(limit, len(listings))} of {len(listings)}):")
        print("-" * 80)
        
        for i, listing in enumerate(listings[:limit]):
            print(f"\n{i+1}. {listing.get('title', 'N/A')}")
            print(f"   Price: {listing.get('price', 'N/A')}")
            print(f"   Location: {listing.get('location', 'N/A')}")
            print(f"   Type: {listing.get('property_type', 'N/A')} ({listing.get('transaction_type', 'N/A')})")
            print(f"   Bedrooms: {listing.get('bedrooms', 'N/A')}, Bathrooms: {listing.get('bathrooms', 'N/A')}")
            print(f"   URL: {listing.get('url', 'N/A')}")
    
    def show_projects(self):
        """Display real estate projects"""
        projects = self.data.get('projects', [])
        
        if not projects:
            print("No real estate projects found.")
            return
        
        print(f"\nREAL ESTATE PROJECTS ({len(projects)} total):")
        print("-" * 50)
        
        for i, project in enumerate(projects):
            print(f"\n{i+1}. {project.get('title', 'N/A')}")
            print(f"   Developer: {project.get('developer', 'N/A')}")
            print(f"   Location: {project.get('location', 'N/A')}")
            print(f"   Type: {project.get('project_type', 'N/A')}")
            print(f"   Units: {project.get('units', 'N/A')}")
            print(f"   Price Range: {project.get('price_range', 'N/A')}")
    
    def show_articles(self):
        """Display property articles"""
        articles = self.data.get('articles', [])
        
        if not articles:
            print("No articles found.")
            return
        
        print(f"\nPROPERTY ARTICLES ({len(articles)} total):")
        print("-" * 40)
        
        for i, article in enumerate(articles):
            print(f"\n{i+1}. {article.get('title', 'N/A')}")
            print(f"   Author: {article.get('author', 'N/A')}")
            print(f"   Date: {article.get('published_date', 'N/A')}")
            print(f"   Category: {article.get('category', 'N/A')}")
            print(f"   Preview: {article.get('content_preview', 'N/A')[:100]}...")
    
    def show_agents(self):
        """Display estate agents"""
        agents = self.data.get('estate_agents', [])
        
        if not agents:
            print("No estate agents found.")
            return
        
        print(f"\nESTATE AGENTS ({len(agents)} total):")
        print("-" * 35)
        
        for i, agent in enumerate(agents):
            print(f"\n{i+1}. {agent.get('name', 'N/A')}")
            print(f"   Type: {agent.get('agent_type', 'N/A')}")
            print(f"   Location: {agent.get('location', 'N/A')}")
            print(f"   Phone: {agent.get('phone', 'N/A')}")
            print(f"   Listings: {agent.get('listings_count', 'N/A')}")
    
    def search_properties(self, query: str):
        """Search properties by location or title"""
        listings = self.data.get('property_listings', [])
        
        if not listings:
            print("No property listings to search.")
            return
        
        query = query.lower()
        matches = []
        
        for listing in listings:
            title = listing.get('title', '').lower()
            location = listing.get('location', '').lower()
            
            if query in title or query in location:
                matches.append(listing)
        
        if matches:
            print(f"\nSEARCH RESULTS for '{query}' ({len(matches)} matches):")
            print("-" * 50)
            self._display_property_matches(matches)
        else:
            print(f"No properties found matching '{query}'")
    
    def _display_property_matches(self, matches: List[Dict]):
        """Display property search matches"""
        for i, listing in enumerate(matches[:10]):  # Limit to 10 results
            print(f"\n{i+1}. {listing.get('title', 'N/A')}")
            print(f"   Price: {listing.get('price', 'N/A')}")
            print(f"   Location: {listing.get('location', 'N/A')}")
            print(f"   Type: {listing.get('property_type', 'N/A')}")
    
    def analyze_prices(self):
        """Analyze property price distributions"""
        listings = self.data.get('property_listings', [])
        
        if not listings:
            print("No property listings to analyze.")
            return
        
        print("\nPRICE ANALYSIS:")
        print("-" * 30)
        
        # Extract prices
        sale_prices = []
        rent_prices = []
        
        for listing in listings:
            price_str = listing.get('price', '')
            transaction_type = listing.get('transaction_type', '')
            
            # Extract numeric price
            import re
            price_match = re.search(r'[\d,]+', price_str.replace(',', ''))
            if price_match:
                try:
                    price = int(price_match.group().replace(',', ''))
                    if transaction_type.lower() == 'rent':
                        rent_prices.append(price)
                    else:
                        sale_prices.append(price)
                except:
                    pass
        
        # Analyze sale prices
        if sale_prices:
            print(f"\nSALE PROPERTIES ({len(sale_prices)} properties):")
            print(f"  Average: KSh {sum(sale_prices) / len(sale_prices):,.0f}")
            print(f"  Minimum: KSh {min(sale_prices):,.0f}")
            print(f"  Maximum: KSh {max(sale_prices):,.0f}")
        
        # Analyze rental prices
        if rent_prices:
            print(f"\nRENTAL PROPERTIES ({len(rent_prices)} properties):")
            print(f"  Average: KSh {sum(rent_prices) / len(rent_prices):,.0f} /month")
            print(f"  Minimum: KSh {min(rent_prices):,.0f} /month")
            print(f"  Maximum: KSh {max(rent_prices):,.0f} /month")
    
    def export_csv(self, filename: str = None):
        """Export property listings to CSV format"""
        listings = self.data.get('property_listings', [])
        
        if not listings:
            print("No property listings to export.")
            return
        
        if not filename:
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"buyrentkenya_properties_{timestamp}.csv"
        
        try:
            import csv
            
            with open(filename, 'w', newline='', encoding='utf-8') as csvfile:
                if listings:
                    fieldnames = listings[0].keys()
                    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
                    
                    writer.writeheader()
                    for listing in listings:
                        writer.writerow(listing)
            
            print(f"Exported {len(listings)} properties to {filename}")
            
        except ImportError:
            print("CSV export requires the csv module (built into Python)")
        except Exception as e:
            print(f"Export failed: {e}")


def setup_argument_parser():
    """Setup command line argument parser"""
    parser = argparse.ArgumentParser(
        description="BuyRentKenya Data Viewer - Analyze scraped real estate data",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  %(prog)s --summary              # Show summary statistics
  %(prog)s --properties           # Show property listings
  %(prog)s --search "Nairobi"     # Search for properties in Nairobi
  %(prog)s --analyze-prices       # Analyze price distributions
  %(prog)s --export data.csv      # Export properties to CSV
        """
    )
    
    # Display options
    parser.add_argument(
        '--summary', 
        action='store_true',
        help='Show summary statistics'
    )
    parser.add_argument(
        '--properties', 
        action='store_true',
        help='Show property listings'
    )
    parser.add_argument(
        '--projects', 
        action='store_true',
        help='Show real estate projects'
    )
    parser.add_argument(
        '--articles', 
        action='store_true',
        help='Show property articles'
    )
    parser.add_argument(
        '--agents', 
        action='store_true',
        help='Show estate agents'
    )
    
    # Analysis options
    parser.add_argument(
        '--search', 
        help='Search properties by location or title'
    )
    parser.add_argument(
        '--analyze-prices', 
        action='store_true',
        help='Analyze property price distributions'
    )
    
    # Export options
    parser.add_argument(
        '--export', 
        help='Export properties to CSV file'
    )
    
    # Configuration
    parser.add_argument(
        '--data-dir', 
        default='buyrentkenya_data',
        help='Data directory path (default: buyrentkenya_data)'
    )
    parser.add_argument(
        '--limit', 
        type=int, 
        default=10,
        help='Limit number of items to display (default: 10)'
    )
    
    return parser


def main():
    """Main CLI function"""
    parser = setup_argument_parser()
    args = parser.parse_args()
    
    # Initialize data viewer
    try:
        viewer = DataViewer(data_dir=args.data_dir)
    except Exception as e:
        print(f"Failed to initialize data viewer: {e}")
        return
    
    # Check if data directory exists
    if not os.path.exists(args.data_dir):
        print(f"Data directory '{args.data_dir}' not found.")
        print("Run the scraper first to generate data.")
        return
    
    # Execute requested actions
    if args.summary or not any([args.properties, args.projects, args.articles, 
                               args.agents, args.search, args.analyze_prices, args.export]):
        viewer.show_summary()
    
    if args.properties:
        viewer.show_properties(limit=args.limit)
    
    if args.projects:
        viewer.show_projects()
    
    if args.articles:
        viewer.show_articles()
    
    if args.agents:
        viewer.show_agents()
    
    if args.search:
        viewer.search_properties(args.search)
    
    if args.analyze_prices:
        viewer.analyze_prices()
    
    if args.export:
        viewer.export_csv(args.export)


if __name__ == "__main__":
    main()
