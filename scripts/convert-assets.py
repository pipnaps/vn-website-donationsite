import os
import glob
import pandas as pd

# Define paths
DATA_DIR = "assets/data"
RAW_DIR = "raw_assets"
OUTPUT_CSV = os.path.join(DATA_DIR, "donations.csv")

def find_excel_files():
    # Search for xlsx/xls in raw_assets and root
    files = glob.glob(os.path.join(RAW_DIR, "*.xlsx")) + glob.glob(os.path.join(RAW_DIR, "*.xls"))
    files += glob.glob("*.xlsx") + glob.glob("*.xls")
    return list(set(files))

def clean_column_name(col):
    return str(col).strip().lower()

def map_donation_columns(columns):
    mapping = {}
    for col in columns:
        clean = clean_column_name(col)
        # Map Date
        if any(x in clean for x in ["ngày", "date", "thời gian"]):
            mapping["Date"] = col
        # Map Name
        elif any(x in clean for x in ["tên", "họ tên", "người", "donor", "name", "ân nhân"]):
            mapping["Name"] = col
        # Map Amount
        elif any(x in clean for x in ["tiền", "số tiền", "amount", "giá trị", "đóng góp"]):
            mapping["Amount"] = col
        # Map Note
        elif any(x in clean for x in ["ghi chú", "note", "nội dung", "lời chúc"]):
            mapping["Note"] = col
    return mapping

def convert_excel_to_donations_csv():
    excel_files = find_excel_files()
    if not excel_files:
        print("No Excel files found in the project root or raw_assets/ directory.")
        return False
        
    for file_path in excel_files:
        print(f"Reading file: {file_path}")
        try:
            xl = pd.ExcelFile(file_path)
            for sheet_name in xl.sheet_names:
                df = xl.parse(sheet_name)
                # Filter out empty or very small sheets
                if df.empty or len(df.columns) < 2:
                    continue
                
                # Analyze columns
                mapping = map_donation_columns(df.columns)
                
                # Check if this sheet looks like a donation list (must have at least Name and Amount or Date)
                if "Name" in mapping or "Amount" in mapping:
                    print(f"-> Found donation data in sheet: '{sheet_name}' from {file_path}")
                    print(f"   Mapping columns: {mapping}")
                    
                    # Extract and rename columns
                    export_df = pd.DataFrame()
                    export_df['Date'] = df[mapping['Date']] if 'Date' in mapping else pd.Series([""] * len(df))
                    export_df['Name'] = df[mapping['Name']] if 'Name' in mapping else pd.Series(["Khuyết danh"] * len(df))
                    export_df['Amount'] = df[mapping['Amount']] if 'Amount' in mapping else pd.Series([0] * len(df))
                    export_df['Note'] = df[mapping['Note']] if 'Note' in mapping else pd.Series([""] * len(df))
                    
                    # Clean up data
                    export_df['Date'] = export_df['Date'].fillna("").astype(str).apply(lambda x: x.split(" ")[0] if " " in x else x)
                    export_df['Name'] = export_df['Name'].fillna("Khuyết danh")
                    export_df['Amount'] = pd.to_numeric(export_df['Amount'].fillna(0), errors='coerce').fillna(0).astype(int)
                    export_df['Note'] = export_df['Note'].fillna("")
                    
                    # Sort by Date descending if present
                    if 'Date' in mapping:
                        export_df = export_df.sort_values(by='Date', ascending=False)
                        
                    # Save to output csv
                    os.makedirs(DATA_DIR, exist_ok=True)
                    export_df.to_csv(OUTPUT_CSV, index=False, encoding='utf-8')
                    print(f"✓ Successfully converted and saved to: {OUTPUT_CSV} ({len(export_df)} records)")
                    return True
                
        except Exception as e:
            print(f"Error reading {file_path}: {e}")
            
    print("Could not find a donation-like sheet in the scanned Excel files.")
    return False

if __name__ == "__main__":
    convert_excel_to_donations_csv()
