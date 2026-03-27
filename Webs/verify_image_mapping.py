#!/usr/bin/env python3
"""
Image-Property Mapping Verification

This script verifies that all property IDs have corresponding images
and displays the mapping between properties and their images.

Author: AI Assistant
Date: September 16, 2025
"""

import json
import os
from pathlib import Path

def verify_image_mapping():
    """Verify image-to-property mapping"""
    
    # Load property listings
    json_file = "buyrentkenya_data/json/property_listings.json"
    data_dir = "buyrentkenya_data"
    
    try:
        with open(json_file, 'r', encoding='utf-8') as f:
            properties = json.load(f)
    except FileNotFoundError:
        print(f"❌ Property listings file not found: {json_file}")
        return
    
    # Check if data directory exists
    if not os.path.exists(data_dir):
        print(f"❌ Data directory not found: {data_dir}")
        return
    
    print("🏠 PROPERTY-IMAGE MAPPING VERIFICATION")
    print("=" * 50)
    
    # Check each property
    total_properties = len(properties)
    properties_with_images = 0
    total_image_files = 0
    
    for property_data in properties:
        prop_id = property_data.get('id')
        title = property_data.get('title', 'N/A')
        price = property_data.get('price', 'N/A')
        images = property_data.get('images', [])
        
        print(f"\n📍 Property ID: {prop_id}")
        print(f"   Title: {title}")
        print(f"   Price: {price}")
        
        # Check for images in the corresponding id*_Images directory
        image_dir = os.path.join(data_dir, f"id{prop_id}_Images")
        
        if os.path.exists(image_dir):
            # Get actual image files in the directory
            actual_images = [f for f in os.listdir(image_dir) 
                           if f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp'))]
            
            if actual_images:
                properties_with_images += 1
                total_image_files += len(actual_images)
                print(f"   ✅ Images: {len(actual_images)} found in {image_dir}")
                
                # Check if all actual images are listed in JSON
                for img in actual_images:
                    expected_path = f"id{prop_id}_Images/{img}"
                    if expected_path in images:
                        print(f"      📸 {img} ✅")
                    else:
                        print(f"      📸 {img} ⚠️  Not listed in JSON")
                
                # Check if all JSON-listed images exist on disk
                for img_path in images:
                    img_filename = os.path.basename(img_path)
                    if img_filename not in actual_images:
                        print(f"         ❌ JSON image missing on disk: {img_path}")
            else:
                print(f"   ❌ No images found in {image_dir}")
        else:
            print(f"   ❌ Image directory not found: {image_dir}")
    
    print(f"\n" + "=" * 50)
    print(f"📊 SUMMARY:")
    print(f"   Total Properties: {total_properties}")
    print(f"   Properties with Images: {properties_with_images}")
    print(f"   Total Image Files: {total_image_files}")
    print(f"   Coverage: {(properties_with_images/total_properties*100):.1f}%")
    
    # List all property IDs and their status
    print(f"\n📋 PROPERTY ID STATUS:")
    property_ids = [prop.get('id') for prop in properties]
    property_ids.sort()
    
    missing_ids = []
    for i in range(1, max(property_ids) + 1):
        if i in property_ids:
            # Check if has images directory
            image_dir = os.path.join(data_dir, f"id{i}_Images")
            has_images = os.path.exists(image_dir) and any(
                f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp')) 
                for f in os.listdir(image_dir)
            )
            status = "✅ Has images" if has_images else "❌ No images"
            print(f"   ID {i:2d}: {status}")
        else:
            missing_ids.append(i)
            print(f"   ID {i:2d}: ⚪ Not scraped (as expected)")
    
    if missing_ids:
        print(f"\n🔍 Missing Property IDs: {missing_ids}")
        print("   (These IDs were intentionally excluded as mentioned)")
    
    print(f"\n✨ Image-Property mapping verification complete!")

if __name__ == "__main__":
    verify_image_mapping()
