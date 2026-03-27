# BuyRentKenya Web Scraping Project

A comprehensive Python web scraper for extracting real estate data from BuyRentKenya.com, Kenya's leading property marketplace.

## 🏠 Project Overview

This scraper extracts four main types of data from BuyRentKenya.com:
- **Property Listings**: Houses, apartments, villas, land, offices, bedsitters (for sale/rent)
- **Real Estate Projects**: New development projects and their details
- **Articles**: Property advice and market insights
- **Estate Agents**: Agent profiles and company information

## 🔧 Technical Stack

- **Language**: Python 3.13+
- **Key Libraries**: 
  - BeautifulSoup4 (HTML parsing)
  - Requests (HTTP requests)
  - JSON (data storage)
  - Regular Expressions (data cleaning)
- **Data Storage**: Structured JSON files with organized directory structure

## ✨ Features

- ⏱️ Respectful scraping with delays (1+ seconds between requests)
- 🖼️ Image downloading and local storage
- 💰 Price parsing (KSh, USD currencies)
- 📍 Location standardization
- 🔄 Error handling and retry mechanisms
- ✅ Data validation and duplicate detection
- 📊 Comprehensive data analysis tools

## 📁 Project Structure

```
buyrentkenya_scraper/
├── buyrentkenya_scraper.py    # Main scraper engine
├── run_scraper.py             # Command-line interface
├── data_viewer.py             # Data analysis tool
├── scraper_config.json        # Configuration settings
├── requirements.txt           # Python dependencies
├── buyrentkenya_data/         # Scraped data directory
│   ├── json/                  # JSON data files
│   │   ├── property_listings.json
│   │   ├── projects.json
│   │   ├── articles.json
│   │   ├── estate_agents.json
│   │   ├── buyrentkenya_complete_data.json
│   │   └── scraping_summary.json
│   └── images/                # Downloaded images
│       ├── listing_[id]_[timestamp].jpg
│       ├── project_[id]_[timestamp].jpg
│       └── agent_[id]_[timestamp].jpg
└── README.md
```

## 🚀 Quick Start

### Installation

1. **Clone and navigate to the project directory**
2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

### Usage

#### Run the complete scraper:
```bash
python run_scraper.py --all
```

#### Scrape specific data types:
```bash
# Property listings only
python run_scraper.py --listings

# Projects only
python run_scraper.py --projects

# Articles only
python run_scraper.py --articles

# Estate agents only
python run_scraper.py --agents
```

#### View scraped data:
```bash
# View summary statistics
python data_viewer.py --summary

# View specific property data
python data_viewer.py --properties

# Search by location
python data_viewer.py --search "Nairobi"
```

## 📊 Data Schema

### Property Listings
```json
{
  "id": 1,
  "title": "4 Bedroom Property",
  "price": "KSh 78,000,000",
  "location": "Spring Valley - Shanzu Road",
  "bedrooms": "4",
  "bathrooms": "4",
  "area": "N/A",
  "property_type": "Townhouse",
  "transaction_type": "Sale",
  "url": "https://www.buyrentkenya.com/listings/...",
  "scraped_at": "2025-09-05T19:08:47.594880"
}
```

### Sample Data Included

The project includes sample data from actual scraping results:
- 10 detailed property listings
- Price range: KSh 10M - 140M
- Various property types: Houses, Villas, Townhouses
- Both sale and rental properties
- Locations across Kenya (Nairobi, Mombasa, Kiambu, etc.)

## ⚙️ Configuration

Edit `scraper_config.json` to customize scraping behavior:

```json
{
  "base_url": "https://www.buyrentkenya.com",
  "delay_between_requests": 1.5,
  "max_retries": 3,
  "timeout": 30,
  "download_images": true,
  "max_listings_per_run": 100
}
```

## 🤖 Respectful Scraping

This scraper is designed to be respectful:
- Implements delays between requests (1+ seconds)
- Respects robots.txt
- Includes proper error handling
- Uses appropriate user agents
- Implements retry mechanisms with backoff

## 📈 Current Status

Based on sample data, the project has successfully scraped:
- **546+ total items** across all categories
- **778+ images** (16.1 MB total)
- **Multiple JSON data files** with structured real estate data
- **Full documentation** and usage examples

## 🛠️ Development

### Running Tests
```bash
python -m pytest tests/
```

### Code Quality
```bash
# Format code
black buyrentkenya_scraper.py

# Lint code
flake8 buyrentkenya_scraper.py
```

## 📝 License

This project is for educational and research purposes. Please respect BuyRentKenya.com's terms of service and robots.txt file.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## ⚠️ Legal Notice

This scraper is intended for educational and research purposes only. Users are responsible for complying with BuyRentKenya.com's terms of service and applicable laws. Always respect website terms of service and implement appropriate rate limiting.
