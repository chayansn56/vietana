import urllib.request
import json
import time
import os
import re

CITIES = [
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

os.makedirs("public/images/cities", exist_ok=True)

with open('src/data/destinations.ts', 'r') as f:
    content = f.read()

for city, city_id in CITIES:
    print(f"Fetching for {city}...")
    city_encoded = urllib.parse.quote(city)
    url = f"https://en.wikipedia.org/w/api.php?action=query&titles={city_encoded}&prop=pageimages&format=json&pithumbsize=1000"
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'VietanaApp/1.0'})
        res = urllib.request.urlopen(req)
        data = json.loads(res.read().decode('utf-8'))
        
        pages = data['query']['pages']
        page_id = list(pages.keys())[0]
        img_url = pages[page_id]['thumbnail']['source']
        
        print(f"Downloading {img_url}...")
        img_req = urllib.request.Request(img_url, headers={'User-Agent': 'Mozilla/5.0'})
        img_res = urllib.request.urlopen(img_req)
        
        with open(f"public/images/cities/{city_id}.jpg", 'wb') as out_file:
            out_file.write(img_res.read())
        
        # update destinations.ts
        replace_pattern = rf'(name:\s*"{city}",\s*coverImage:\s*)"([^"]+)"'
        content = re.sub(replace_pattern, rf'\1"/images/cities/{city_id}.jpg"', content)
        
    except Exception as e:
        print(f"Failed {city}: {e}")
    
    time.sleep(2)

with open('src/data/destinations.ts', 'w') as f:
    f.write(content)

print("All covers downloaded and updated!")
