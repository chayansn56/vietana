import urllib.request
import re
import os

cities = [
    ("Ho Chi Minh City", "hcmc"),
    ("Hanoi", "hanoi"),
    ("Sa Pa", "sapa"),
    ("Ha Long Bay", "halong"),
    ("Ninh Binh", "ninhbinh"),
    ("Hue", "hue"),
    ("Da Nang", "danang"),
    ("Hoi An", "hoian"),
    ("Da Lat", "dalat"),
    ("Phu Quoc", "phuquoc")
]

with open('src/data/destinations.ts', 'r') as f:
    content = f.read()

# We will find the coverImage for each city, download it, and rewrite the ts file.
for city_name, city_id in cities:
    # Find the block for this city to extract its first sight's image as the new cover
    pattern = rf'name:\s*"{city_name}".*?image:\s*"([^"]+)"'
    match = re.search(pattern, content, flags=re.DOTALL)
    if match:
        url = match.group(1)
        filepath = f"public/images/cities/{city_id}.jpg"
        print(f"Downloading {city_name} from {url}...")
        
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req) as response, open(filepath, 'wb') as out_file:
                data = response.read()
                out_file.write(data)
                
            # Replace coverImage in the TS file
            replace_pattern = rf'(name:\s*"{city_name}",\s*coverImage:\s*)"([^"]+)"'
            content = re.sub(replace_pattern, rf'\1"/images/cities/{city_id}.jpg"', content)
        except Exception as e:
            print(f"Failed to download {city_name}: {e}")

with open('src/data/destinations.ts', 'w') as f:
    f.write(content)

print("Finished downloading covers!")
