import re
from collections import Counter

with open('src/data/destinations.ts', 'r') as f:
    content = f.read()

urls = re.findall(r'image:\s*"(https://upload\.wikimedia\.org/[^"]+)"', content)

counter = Counter(urls)
for url, count in counter.most_common():
    if count > 1:
        print(f"URL used {count} times: {url}")
        
print(f"Total images: {len(urls)}, Unique images: {len(set(urls))}")
