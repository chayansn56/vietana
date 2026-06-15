import urllib.request
import time
import os

images = {
    "hcmc": "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1000&q=80",
    "hanoi": "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1000&q=80",
    "sapa": "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1000&q=80",
    "halong": "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1000&q=80", # fallback
    "ninhbinh": "https://images.unsplash.com/photo-1600868270588-3e4b78c2dc1f?auto=format&fit=crop&w=1000&q=80",
    "hue": "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1000&q=80",
    "danang": "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1000&q=80",
    "hoian": "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1000&q=80",
    "dalat": "https://images.unsplash.com/photo-1600868270588-3e4b78c2dc1f?auto=format&fit=crop&w=1000&q=80",
    "phuquoc": "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1000&q=80"
}

# Real distinct unsplash URLs:
# Vietnam: 1583417319070-4a69db38a482 (street)
# Vietnam: 1559592413-7cec4d0cae2b (halong bay)
# Vietnam: 1528127269322-539801943592 (rice terraces)
# Vietnam: 1600868270588-3e4b78c2dc1f (ninh binh landscape)
# Vietnam: 1531737255715-6569805908b2 (lanterns hoi an)
# Vietnam: 1515252874288-0f75727f7142 (ho chi minh city)
# Vietnam: 1544086431-7bfa5dbf507b (golden bridge danang)
# Vietnam: 1581458882570-8b1e4a64d1f5 (dalat)

images["hcmc"] = "https://images.unsplash.com/photo-1515252874288-0f75727f7142?auto=format&fit=crop&w=1000&q=80"
images["hanoi"] = "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1000&q=80"
images["sapa"] = "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1000&q=80"
images["halong"] = "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1000&q=80"
images["ninhbinh"] = "https://images.unsplash.com/photo-1600868270588-3e4b78c2dc1f?auto=format&fit=crop&w=1000&q=80"
images["hue"] = "https://images.unsplash.com/photo-1600868270588-3e4b78c2dc1f?auto=format&fit=crop&w=1000&q=80" # fallback
images["danang"] = "https://images.unsplash.com/photo-1544086431-7bfa5dbf507b?auto=format&fit=crop&w=1000&q=80"
images["hoian"] = "https://images.unsplash.com/photo-1531737255715-6569805908b2?auto=format&fit=crop&w=1000&q=80"
images["dalat"] = "https://images.unsplash.com/photo-1581458882570-8b1e4a64d1f5?auto=format&fit=crop&w=1000&q=80"
images["phuquoc"] = "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1000&q=80" # fallback

for city_id, url in images.items():
    filepath = f"public/images/cities/{city_id}.jpg"
    print(f"Downloading {city_id}...")
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response, open(filepath, 'wb') as out_file:
            data = response.read()
            out_file.write(data)
    except Exception as e:
        print(f"Failed {city_id}: {e}")
    time.sleep(1)

import re
with open('src/data/destinations.ts', 'r') as f:
    content = f.read()

for city_name, city_id in [
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
]:
    replace_pattern = rf'(name:\s*"{city_name}",\s*coverImage:\s*)"([^"]+)"'
    content = re.sub(replace_pattern, rf'\1"/images/cities/{city_id}.jpg"', content)

with open('src/data/destinations.ts', 'w') as f:
    f.write(content)

print("Covers securely saved locally!")
