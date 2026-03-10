import csv
import json

csv_path = r"c:\Users\USER\Downloads\triveniworld-com-2026-03-10-3 (1).csv"
json_path = r"C:\Users\USER\.gemini\antigravity\scratch\triveni-store\src\data\products.json"

data = []
with open(csv_path, 'r', encoding='utf-8-sig') as f:
    reader = csv.DictReader(f)
    for row in reader:
        # Include only valid rows with title/price
        if row.get('data') and row.get('price'):
            data.append(row)

with open(json_path, 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2)

print(f"Parsed {len(data)} products successfully!")
