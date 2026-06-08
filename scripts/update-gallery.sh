#!/bin/bash

# Target Directories
IMAGE_DIR="assets/images/progress"
OUTPUT_FILE="assets/data/gallery.json"

# Check if target image directory exists
if [ ! -d "$IMAGE_DIR" ]; then
    echo "Creating directory: $IMAGE_DIR"
    mkdir -p "$IMAGE_DIR"
fi

# Make sure assets/data directory exists
mkdir -p "assets/data"

echo "Scanning $IMAGE_DIR for progress photos..."

# Start JSON array
echo "[" > "$OUTPUT_FILE"

# Find jpg/jpeg/png files in the progress directory
first=true
# Read files sorted alphabetically/chronologically
find "$IMAGE_DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) | sort | while read -r filepath; do
    filename=$(basename "$filepath")
    
    # Defaults
    date=""
    caption=""
    
    # Try to parse date anywhere in the filename (e.g. YYYY-MM-DD)
    if [[ $filename =~ ([0-9]{4}-[0-9]{2}-[0-9]{2}) ]]; then
        date="${BASH_REMATCH[1]}"
        # Generate caption: remove extension, remove date pattern, remove "WhatsApp Image", remove times
        temp_caption="${filename%.*}"
        temp_caption=$(echo "$temp_caption" | sed -E 's/[0-9]{4}-[0-9]{2}-[0-9]{2}//g')
        temp_caption=$(echo "$temp_caption" | sed 's/WhatsApp Image//g')
        temp_caption=$(echo "$temp_caption" | sed 's/at//g')
        temp_caption=$(echo "$temp_caption" | sed -E 's/[0-9]{2}\.[0-9]{2}\.[0-9]{2}//g')
        # Clean up spaces
        temp_caption=$(echo "$temp_caption" | tr -s ' ' | sed 's/^ //' | sed 's/ $//')
        
        # Fallback if caption is empty after stripping metadata
        if [ -z "$temp_caption" ] || [ "$temp_caption" = "()" ] || [ "$temp_caption" = "(1)" ] || [ "$temp_caption" = "(2)" ] || [ "$temp_caption" = "(3)" ] || [ "$temp_caption" = "(4)" ] || [ "$temp_caption" = "(5)" ] || [ "$temp_caption" = "(6)" ] || [ "$temp_caption" = "(7)" ] || [ "$temp_caption" = "(8)" ]; then
            caption="Tiến độ thi công ngày $date"
        else
            caption="$temp_caption"
        fi
    else
        # Fallback to file modification date (cross-platform compatible format)
        if [[ "$OSTYPE" == "darwin"* ]]; then
            date=$(stat -f "%Sm" -t "%Y-%m-%d" "$filepath")
        else
            date=$(date -r "$filepath" +"%Y-%m-%d")
        fi
        caption="${filename%.*}"
        caption=${caption//_/ }
    fi
    
    # Add comma if not the first element
    if [ "$first" = true ]; then
        first=false
    else
        echo "," >> "$OUTPUT_FILE"
    fi
    
    # Write JSON object
    # Escape double quotes in caption if any
    clean_caption=$(echo "$caption" | sed 's/"/\\"/g')
    
    echo "  {" >> "$OUTPUT_FILE"
    echo "    \"src\": \"$filepath\"," >> "$OUTPUT_FILE"
    echo "    \"date\": \"$date\"," >> "$OUTPUT_FILE"
    echo "    \"caption\": \"$clean_caption\"" >> "$OUTPUT_FILE"
    echo -n "  }" >> "$OUTPUT_FILE"
    
done

# End JSON array
echo "" >> "$OUTPUT_FILE"
echo "]" >> "$OUTPUT_FILE"

echo "Manifest updated successfully: $OUTPUT_FILE"
