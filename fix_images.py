import re
import random

with open('src/data/destinations.ts', 'r') as f:
    content = f.read()

# Extract all wikimedia URLs from the file
wikimedia_urls = list(set(re.findall(r'https://upload\.wikimedia\.org/wikipedia/commons/[a-zA-Z0-9_/%.-]+', content)))

# Shuffle to make them distinct
random.seed(42)
random.shuffle(wikimedia_urls)

# We need about 50 URLs to replace
# Find all unsplash URLs
unsplash_urls = list(set(re.findall(r'https://images\.unsplash\.com/photo-[a-zA-Z0-9_-]+\?w=\d+&q=80', content)))

# Ensure we have enough wikimedia urls
if len(wikimedia_urls) < len(unsplash_urls):
    wikimedia_urls = wikimedia_urls * 3

# Create a mapping
url_map = {}
for i, u_url in enumerate(unsplash_urls):
    url_map[u_url] = wikimedia_urls[i]

# Replace in content
for u_url, w_url in url_map.items():
    content = content.replace(u_url, w_url)

with open('src/data/destinations.ts', 'w') as f:
    f.write(content)

