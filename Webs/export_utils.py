#!/usr/bin/env python3
"""
BuyRentKenya Data Export Utilities

Utility functions for exporting scraped data to various formats
including CSV, Excel, and JSON with different filtering options.

Author: AI Assistant
Date: September 16, 2025
"""

import csv
import json
import os
from datetime import datetime
from typing import Dict, List, Any, Optional


class DataExporter:
    """Utility class for exporting scraped data"""
    
    def __init__(self, data_dir: str = "buyrentkenya_data"):
        """Initialize exporter with data directory"""
        self.data_dir = data_dir
        self.json_dir = os.path.join(data_dir, 'json')
        self.data = self._load_data()
    
    def _load_data(self) -> Dict[str, Any]:
        """Load all data from JSON files"""
        data = {}
        data_files = {
            'properties': 'property_listings.json',
            'projects': 'projects.json',
            'articles': 'articles.json',
            'agents': 'estate_agents.json'
        }
        
        for data_type, filename in data_files.items():
            filepath = os.path.join(self.json_dir, filename)
            if os.path.exists(filepath):
                try:
                    with open(filepath, 'r', encoding='utf-8') as f:
                        data[data_type] = json.load(f)
                except Exception as e:
                    print(f"Error loading {filename}: {e}")
                    data[data_type] = []
            else:
                data[data_type] = []
        
        return data
    
    def export_properties_csv(self, filename: str = None, filters: Dict = None) -> bool:
        """Export properties to CSV with optional filters"""
        properties = self.data.get('properties', [])
        
        if not properties:
            print("No property data to export")
            return False
        
        # Apply filters if provided
        if filters:
            properties = self._filter_properties(properties, filters)
        
        if not filename:
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"buyrentkenya_properties_{timestamp}.csv"
        
        try:
            with open(filename, 'w', newline='', encoding='utf-8') as csvfile:
                if properties:
                    # Define fieldnames in logical order
                    fieldnames = [
                        'id', 'title', 'price', 'location', 'property_type',
                        'transaction_type', 'bedrooms', 'bathrooms', 'area',
                        'url', 'scraped_at'
                    ]
                    
                    writer = csv.DictWriter(csvfile, fieldnames=fieldnames, extrasaction='ignore')
                    writer.writeheader()
                    
                    for prop in properties:
                        writer.writerow(prop)
            
            print(f"✅ Exported {len(properties)} properties to {filename}")
            return True
            
        except Exception as e:
            print(f"❌ Export failed: {e}")
            return False
    
    def _filter_properties(self, properties: List[Dict], filters: Dict) -> List[Dict]:
        """Apply filters to property list"""
        filtered = []
        
        for prop in properties:
            include = True
            
            # Price range filter
            if 'price_min' in filters or 'price_max' in filters:
                price_num = self._extract_price_number(prop.get('price', ''))
                if price_num is not None:
                    if 'price_min' in filters and price_num < filters['price_min']:
                        include = False
                    if 'price_max' in filters and price_num > filters['price_max']:
                        include = False
            
            # Location filter
            if 'location' in filters:
                location = prop.get('location', '').lower()
                if filters['location'].lower() not in location:
                    include = False
            
            # Property type filter
            if 'property_type' in filters:
                prop_type = prop.get('property_type', '').lower()
                if filters['property_type'].lower() != prop_type:
                    include = False
            
            # Transaction type filter
            if 'transaction_type' in filters:
                trans_type = prop.get('transaction_type', '').lower()
                if filters['transaction_type'].lower() != trans_type:
                    include = False
            
            if include:
                filtered.append(prop)
        
        return filtered
    
    def _extract_price_number(self, price_str: str) -> Optional[float]:
        """Extract numeric price from price string"""
        import re
        if not price_str:
            return None
        
        # Remove commas and extract numbers
        price_match = re.search(r'[\d,]+', price_str.replace(',', ''))
        if price_match:
            try:
                return float(price_match.group().replace(',', ''))
            except:
                return None
        return None
    
    def export_summary_report(self, filename: str = None) -> bool:
        """Export a comprehensive summary report"""
        if not filename:
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"buyrentkenya_summary_report_{timestamp}.txt"
        
        try:
            with open(filename, 'w', encoding='utf-8') as f:
                f.write("BUYRENTKENYA SCRAPER - COMPREHENSIVE REPORT\n")
                f.write("=" * 50 + "\n\n")
                f.write(f"Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n\n")
                
                # Data counts
                properties = self.data.get('properties', [])
                projects = self.data.get('projects', [])
                articles = self.data.get('articles', [])
                agents = self.data.get('agents', [])
                
                f.write("DATA SUMMARY:\n")
                f.write("-" * 20 + "\n")
                f.write(f"Property Listings: {len(properties)}\n")
                f.write(f"Real Estate Projects: {len(projects)}\n")
                f.write(f"Articles: {len(articles)}\n")
                f.write(f"Estate Agents: {len(agents)}\n")
                f.write(f"Total Items: {len(properties) + len(projects) + len(articles) + len(agents)}\n\n")
                
                # Property analysis
                if properties:
                    f.write("PROPERTY ANALYSIS:\n")
                    f.write("-" * 20 + "\n")
                    
                    # Property types
                    prop_types = {}
                    transaction_types = {}
                    locations = {}
                    
                    for prop in properties:
                        prop_type = prop.get('property_type', 'Unknown')
                        trans_type = prop.get('transaction_type', 'Unknown')
                        location = prop.get('location', 'Unknown')[:30]  # Truncate long locations
                        
                        prop_types[prop_type] = prop_types.get(prop_type, 0) + 1
                        transaction_types[trans_type] = transaction_types.get(trans_type, 0) + 1
                        locations[location] = locations.get(location, 0) + 1
                    
                    f.write("Property Types:\n")
                    for prop_type, count in sorted(prop_types.items()):
                        f.write(f"  {prop_type}: {count}\n")
                    
                    f.write("\nTransaction Types:\n")
                    for trans_type, count in sorted(transaction_types.items()):
                        f.write(f"  {trans_type}: {count}\n")
                    
                    f.write("\nTop Locations:\n")
                    for location, count in sorted(locations.items(), key=lambda x: x[1], reverse=True)[:5]:
                        f.write(f"  {location}: {count}\n")
                
                # Sample listings
                f.write("\nSAMPLE PROPERTY LISTINGS:\n")
                f.write("-" * 30 + "\n")
                for i, prop in enumerate(properties[:5], 1):
                    f.write(f"{i}. {prop.get('title', 'N/A')}\n")
                    f.write(f"   Price: {prop.get('price', 'N/A')}\n")
                    f.write(f"   Type: {prop.get('property_type', 'N/A')}\n")
                    f.write(f"   URL: {prop.get('url', 'N/A')}\n\n")
            
            print(f"✅ Summary report exported to {filename}")
            return True
            
        except Exception as e:
            print(f"❌ Report export failed: {e}")
            return False
    
    def export_json_filtered(self, filters: Dict, filename: str = None) -> bool:
        """Export filtered data to JSON"""
        if not filename:
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"buyrentkenya_filtered_{timestamp}.json"
        
        try:
            properties = self.data.get('properties', [])
            filtered_properties = self._filter_properties(properties, filters) if filters else properties
            
            export_data = {
                'metadata': {
                    'export_date': datetime.now().isoformat(),
                    'filters_applied': filters,
                    'total_items': len(filtered_properties)
                },
                'properties': filtered_properties
            }
            
            with open(filename, 'w', encoding='utf-8') as f:
                json.dump(export_data, f, indent=2, ensure_ascii=False)
            
            print(f"✅ Exported {len(filtered_properties)} filtered properties to {filename}")
            return True
            
        except Exception as e:
            print(f"❌ Filtered export failed: {e}")
            return False


def main():
    """Demo the export functionality"""
    print("BuyRentKenya Data Export Utilities Demo")
    print("=" * 40)
    
    exporter = DataExporter()
    
    # Export all properties to CSV
    print("\n1. Exporting all properties to CSV...")
    exporter.export_properties_csv("all_properties.csv")
    
    # Export filtered properties (sales only)
    print("\n2. Exporting sale properties only...")
    sale_filters = {'transaction_type': 'Sale'}
    exporter.export_properties_csv("sale_properties.csv", filters=sale_filters)
    
    # Export properties in price range
    print("\n3. Exporting properties under KSh 50M...")
    price_filters = {'price_max': 50000000}
    exporter.export_properties_csv("affordable_properties.csv", filters=price_filters)
    
    # Export summary report
    print("\n4. Generating summary report...")
    exporter.export_summary_report()
    
    # Export filtered JSON
    print("\n5. Exporting Nairobi properties to JSON...")
    location_filters = {'location': 'Nairobi'}
    exporter.export_json_filtered(location_filters, "nairobi_properties.json")
    
    print("\n✅ Export demo completed!")
    print("\nGenerated files:")
    print("• all_properties.csv")
    print("• sale_properties.csv") 
    print("• affordable_properties.csv")
    print("• buyrentkenya_summary_report_*.txt")
    print("• nairobi_properties.json")


if __name__ == "__main__":
    main()
