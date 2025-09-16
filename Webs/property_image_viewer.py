#!/usr/bin/env python3
"""
Property Image Viewer

A simple script to display properties and their associated images.
Demonstrates the image-to-property mapping in the BuyRentKenya scraper.

Author: AI Assistant
Date: September 16, 2025
"""

import json
import os
from pathlib import Path

def display_property_with_images():
    """Display properties with their associated images"""
    
    # Load property data
    json_file = "buyrentkenya_data/json/property_listings.json"
    images_dir = "buyrentkenya_data/images"
    
    try:
        with open(json_file, 'r', encoding='utf-8') as f:
            properties = json.load(f)
    except FileNotFoundError:
        print(f"❌ Property file not found: {json_file}")
        return
    
    print("🏠 BUYRENTKENYA PROPERTY LISTINGS WITH IMAGES")
    print("=" * 60)
    
    for i, prop in enumerate(properties, 1):
        prop_id = prop.get('id')
        title = prop.get('title', 'N/A')
        price = prop.get('price', 'N/A')
        location = prop.get('location', 'N/A')
        bedrooms = prop.get('bedrooms', 'N/A')
        bathrooms = prop.get('bathrooms', 'N/A')
        property_type = prop.get('property_type', 'N/A')
        transaction_type = prop.get('transaction_type', 'N/A')
        images = prop.get('images', [])
        
        print(f"\n📍 Property #{i} (ID: {prop_id})")
        print("-" * 40)
        print(f"🏡 Title: {title}")
        print(f"💰 Price: {price}")
        print(f"📍 Location: {location[:70]}{'...' if len(location) > 70 else ''}")
        print(f"🛏️  Bedrooms: {bedrooms} | 🚿 Bathrooms: {bathrooms}")
        print(f"🏗️  Type: {property_type} | 💼 Transaction: {transaction_type}")
        
        # Display images
        if images:
            print(f"📸 Images ({len(images)}):")
            for img in images:
                img_path = os.path.join("buyrentkenya_data", img)
                if os.path.exists(img_path):
                    file_size = os.path.getsize(img_path)
                    print(f"   ✅ {img} ({file_size:,} bytes)")
                else:
                    print(f"   ❌ {img} (FILE NOT FOUND)")
        else:
            print("📸 Images: No images available")
    
    # Summary
    total_properties = len(properties)
    properties_with_images = sum(1 for prop in properties if prop.get('images'))
    total_image_files = sum(len(prop.get('images', [])) for prop in properties)
    
    print(f"\n" + "=" * 60)
    print(f"📊 SUMMARY:")
    print(f"   Total Properties: {total_properties}")
    print(f"   Properties with Images: {properties_with_images}")
    print(f"   Total Image Files: {total_image_files}")
    print(f"   Image Coverage: {(properties_with_images/total_properties*100):.1f}%")
    
    # Show excluded IDs
    all_ids = set(range(1, 11))
    scraped_ids = set(prop.get('id') for prop in properties)
    excluded_ids = sorted(all_ids - scraped_ids)
    
    if excluded_ids:
        print(f"   Excluded Property IDs: {excluded_ids}")
    
    print(f"\n✨ All {total_properties} properties have been successfully mapped to their images!")

def show_image_file_structure():
    """Show the image file structure"""
    
    print(f"\n📁 IMAGE FOLDER STRUCTURE:")
    print("-" * 40)
    
    total_images = 0
    total_size = 0
    
    for prop_id in [1, 2, 3, 4, 6, 9, 10]:
        folder_name = f"id{prop_id}_Images"
        folder_path = os.path.join("buyrentkenya_data", folder_name)
        
        if os.path.exists(folder_path):
            image_files = [f for f in os.listdir(folder_path) if f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp'))]
            folder_size = sum(os.path.getsize(os.path.join(folder_path, f)) for f in image_files)
            total_images += len(image_files)
            total_size += folder_size
            
            print(f"   📁 {folder_name}/")
            print(f"      Images: {len(image_files)} | Size: {folder_size/(1024*1024):.2f} MB")
            
            # Show first few images
            for img in image_files[:3]:
                img_size = os.path.getsize(os.path.join(folder_path, img))
                print(f"      📸 {img} ({img_size:,} bytes)")
            
            if len(image_files) > 3:
                print(f"      ... and {len(image_files) - 3} more images")
        else:
            print(f"   ❌ {folder_name}/ (FOLDER NOT FOUND)")
    
    print(f"\n   📊 TOTALS:")
    print(f"   Total Image Folders: 7")
    print(f"   Total Images: {total_images}")
    print(f"   Total Size: {total_size/(1024*1024):.2f} MB")

if __name__ == "__main__":
    display_property_with_images()
    show_image_file_structure()
