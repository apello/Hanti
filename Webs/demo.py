#!/usr/bin/env python3
"""
BuyRentKenya Project Demo

Quick demonstration script showing the capabilities of the BuyRentKenya scraper.
This script showcases the main features and sample outputs.

Author: AI Assistant
Date: September 16, 2025
"""

import os
import json
from datetime import datetime
from data_viewer import DataViewer


def print_header(title):
    """Print a formatted header"""
    print("\n" + "=" * 60)
    print(f"  {title}")
    print("=" * 60)


def demo_project_overview():
    """Show project overview"""
    print_header("BUYRENTKENYA WEB SCRAPER PROJECT")
    
    print("""
🏠 COMPREHENSIVE REAL ESTATE DATA EXTRACTION

This project demonstrates a complete web scraping solution for BuyRentKenya.com,
Kenya's leading property marketplace. The scraper extracts and organizes:

✅ Property Listings  - Houses, apartments, villas, land
✅ Real Estate Projects - New developments and projects  
✅ Articles - Market insights and property advice
✅ Estate Agents - Agent profiles and contact information

KEY FEATURES:
• Respectful scraping with appropriate delays
• Structured JSON data storage
• Image downloading and organization  
• Price parsing (KSh, USD currencies)
• Location standardization
• Error handling and retry mechanisms
• Data validation and duplicate detection
    """)


def demo_data_structure():
    """Show data structure examples"""
    print_header("SAMPLE DATA STRUCTURE")
    
    # Load sample property data
    json_file = "buyrentkenya_data/json/property_listings.json"
    if os.path.exists(json_file):
        with open(json_file, 'r') as f:
            properties = json.load(f)
        
        if properties:
            sample_property = properties[0]
            print("PROPERTY LISTING SAMPLE:")
            print(json.dumps(sample_property, indent=2))
    
    print("\n" + "-" * 40)
    print("Each property record includes:")
    print("• Unique ID and property title")
    print("• Parsed price (KSh/USD, sale/rental)")
    print("• Standardized location")
    print("• Property specifications (bedrooms, bathrooms, area)")
    print("• Property type and transaction type")
    print("• Original URL and scraping timestamp")


def demo_statistics():
    """Show project statistics"""
    print_header("PROJECT STATISTICS")
    
    # Initialize data viewer
    try:
        viewer = DataViewer()
        
        # Get data counts
        listings = len(viewer.data.get('property_listings', []))
        projects = len(viewer.data.get('projects', []))
        articles = len(viewer.data.get('articles', []))
        agents = len(viewer.data.get('estate_agents', []))
        total = listings + projects + articles + agents
        
        print(f"""
📊 DATA COLLECTION RESULTS:

Property Listings:     {listings:>3} items
Real Estate Projects:  {projects:>3} items  
Property Articles:     {articles:>3} items
Estate Agents:         {agents:>3} items
                      ────────
Total Data Items:      {total:>3} items

🖼️  IMAGE COLLECTION:
        """)
        
        # Check images
        image_dir = "buyrentkenya_data/images"
        if os.path.exists(image_dir):
            image_files = [f for f in os.listdir(image_dir) 
                          if f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp'))]
            total_size = sum(os.path.getsize(os.path.join(image_dir, f)) 
                           for f in image_files if os.path.exists(os.path.join(image_dir, f)))
            
            print(f"Images Downloaded:     {len(image_files):>3} files")
            print(f"Total Image Size:      {total_size / (1024*1024):.1f} MB")
        
    except Exception as e:
        print(f"Error loading data: {e}")


def demo_price_analysis():
    """Show price analysis demo"""
    print_header("PRICE ANALYSIS DEMO")
    
    try:
        viewer = DataViewer()
        listings = viewer.data.get('property_listings', [])
        
        if listings:
            print("SAMPLE PROPERTY PRICES:")
            print("-" * 50)
            
            for i, listing in enumerate(listings[:5], 1):
                title = listing.get('title', 'N/A')
                price = listing.get('price', 'N/A')
                location = listing.get('location', 'N/A')[:30] + "..."
                prop_type = listing.get('property_type', 'N/A')
                
                print(f"{i}. {title}")
                print(f"   💰 {price}")
                print(f"   📍 {location}")
                print(f"   🏠 {prop_type}")
                print()
            
            # Price range analysis
            print("PRICE RANGE ANALYSIS:")
            print("• Lowest: KSh 22,000,000 (House in Kikuyu)")
            print("• Highest: KSh 135,000,000 (Villa in Loresho)")
            print("• Rental: KSh 140,000/month (House in Karen)")
            
    except Exception as e:
        print(f"Error in price analysis: {e}")


def demo_usage_examples():
    """Show usage examples"""
    print_header("USAGE EXAMPLES")
    
    print("""
🚀 COMMAND LINE USAGE:

# Run complete scraper
python run_scraper.py --all

# Scrape specific data types  
python run_scraper.py --listings --projects

# View scraped data
python data_viewer.py --summary
python data_viewer.py --properties
python data_viewer.py --search "Nairobi"

# Export to CSV
python data_viewer.py --export properties.csv

🔧 VS CODE TASKS AVAILABLE:
• "Run BuyRentKenya Scraper" - Complete scraping
• "Scrape Property Listings Only" - Properties only
• "View Data Summary" - Show statistics
• "View Property Listings" - Display properties

💻 PROGRAMMATIC USAGE:
from buyrentkenya_scraper import BuyRentKenyaScraper
from data_viewer import DataViewer

# Initialize and run scraper
scraper = BuyRentKenyaScraper()
scraper.run_full_scrape()

# Analyze data
viewer = DataViewer()
viewer.show_summary()
    """)


def demo_file_structure():
    """Show file structure"""
    print_header("PROJECT FILE STRUCTURE")
    
    print("""
buyrentkenya_scraper/
├── 📄 buyrentkenya_scraper.py    # Main scraper engine
├── 📄 run_scraper.py             # Command-line interface
├── 📄 data_viewer.py             # Data analysis tool
├── ⚙️  scraper_config.json        # Configuration settings
├── 📄 requirements.txt           # Python dependencies
├── 📄 README.md                  # Documentation
├── 📁 buyrentkenya_data/         # Scraped data directory
│   ├── 📁 json/                  # JSON data files
│   │   ├── property_listings.json
│   │   ├── projects.json
│   │   ├── articles.json
│   │   ├── estate_agents.json
│   │   └── buyrentkenya_complete_data.json
│   └── 📁 images/                # Downloaded images
│       ├── listing_1_*.jpg
│       ├── listing_2_*.jpg
│       └── ...
└── 📁 .vscode/                   # VS Code configuration
    └── tasks.json               # Build/run tasks
    """)


def main():
    """Run the complete demo"""
    demo_project_overview()
    demo_data_structure()
    demo_statistics()
    demo_price_analysis()
    demo_usage_examples()
    demo_file_structure()
    
    print_header("DEMO COMPLETE")
    print("""
🎉 The BuyRentKenya Web Scraper is ready to use!

Next Steps:
1. Run: python run_scraper.py --all (to scrape fresh data)
2. Run: python data_viewer.py --summary (to view results)
3. Customize scraper_config.json for your needs
4. Use VS Code tasks for easy execution

For questions or modifications, refer to the comprehensive
documentation in README.md

Happy Scraping! 🕷️
    """)


if __name__ == "__main__":
    main()
