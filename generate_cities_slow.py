import urllib.request
import urllib.parse
import json
import re
import time

with open('src/data/destinations.ts', 'r') as f:
    content = f.read()

# We need to extract the Sights and update them
def fetch_wikipedia_image(query):
    search_url = f"https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch={urllib.parse.quote(query)}&utf8=&format=json&srlimit=1"
    try:
        req = urllib.request.Request(search_url, headers={'User-Agent': 'Vietana/1.0 (Contact: dev@vietana.com)'})
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode())
            if 'query' in data and 'search' in data['query'] and len(data['query']['search']) > 0:
                title = data['query']['search'][0]['title']
                
                # Fetch image
                img_url = f"https://en.wikipedia.org/w/api.php?action=query&titles={urllib.parse.quote(title)}&prop=pageimages&format=json&pithumbsize=1000"
                time.sleep(1.0) # Polite delay
                img_req = urllib.request.Request(img_url, headers={'User-Agent': 'Vietana/1.0'})
                with urllib.request.urlopen(img_req) as img_resp:
                    img_data = json.loads(img_resp.read().decode())
                    pages = img_data['query']['pages']
                    for page_id in pages:
                        if 'thumbnail' in pages[page_id]:
                            url = pages[page_id]['thumbnail']['source']
                            if '.svg' not in url.lower():
                                return url
    except Exception as e:
        pass
    return None

import ast
# We'll just regex replace each `{ id: "...", name: "...", image: "...", description: "..." }`
matches = re.finditer(r'\{ id: "([^"]+)", name: "([^"]+)", image: "([^"]+)", description: "([^"]+)" \}', content)

new_content = content
print("Fetching exact Wikipedia images politely...")
count = 0
for match in matches:
    sight_id = match.group(1)
    sight_name = match.group(2)
    old_img = match.group(3)
    desc = match.group(4)
    
    # We only fetch if it's currently a placeholder or if it failed before
    if True: # Let's just fetch everything to be 100% sure we have respective pictures
        img = fetch_wikipedia_image(sight_name)
        time.sleep(1.0)
        
        if img:
            new_sight = f'{{ id: "{sight_id}", name: "{sight_name}", image: "{img}", description: "{desc}" }}'
            new_content = new_content.replace(match.group(0), new_sight)
            print(f"✅ {sight_name} -> {img}")
        else:
            print(f"❌ {sight_name} (Using old img: {old_img})")
    count += 1

with open('src/data/destinations.ts', 'w') as f:
    f.write(new_content)

print("Done generating respective pictures!")
