import os
import re
import urllib.request
import time

# Create directories
os.makedirs('public/food', exist_ok=True)

with open('src/data/food.ts', 'r') as f:
    content = f.read()

# Pattern to find all img: '...'
# We'll use a regex to find all images, download them, and replace the URL
img_pattern = re.compile(r"img:\s*'([^']+)'")
urls = img_pattern.findall(content)

# We will keep a map of url -> local_path
url_map = {}

# Download all unique urls
headers = {'User-Agent': 'VietanaBot/1.0'}

count = 1
for url in set(urls):
    if url.startswith('/food/'):
        continue # Already local
    
    if not url.startswith('http'):
        continue

    # Create a simple safe filename
    filename = f"image_{count}.jpg"
    local_path = f"/food/{filename}"
    
    try:
        print(f"Downloading {url} ...")
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=10) as response, open(f'public/food/{filename}', 'wb') as out_file:
            data = response.read()
            out_file.write(data)
        url_map[url] = local_path
        count += 1
        time.sleep(0.5)
    except Exception as e:
        print(f"Error downloading {url}: {e}")
        # fallback to a generic placeholder if download fails
        url_map[url] = f"https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80" 

# Replace in content
def replacer(match):
    full = match.group(0)
    url = match.group(1)
    if url in url_map:
        return f"img: '{url_map[url]}'"
    return full

new_content = img_pattern.sub(replacer, content)

with open('src/data/food.ts', 'w') as f:
    f.write(new_content)

print("Finished downloading images and updating food.ts")
