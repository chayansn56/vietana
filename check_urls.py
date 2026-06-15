import re
import urllib.request
import time

with open('src/data/destinations.ts', 'r') as f:
    content = f.read()

urls = re.findall(r'image:\s*"(https://[^"]+)"', content)

urls_to_check = list(set(urls))
failed = []

for url in urls_to_check:
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        response = urllib.request.urlopen(req, timeout=5)
        if response.getcode() != 200:
            failed.append(url)
    except Exception as e:
        if "429" not in str(e): # Ignore rate limits, we just want to know if it's 404
            failed.append(url)
    time.sleep(0.1)

print(f"Total unique images: {len(urls_to_check)}")
print(f"Failed URLs (excluding 429s): {len(failed)}")
if failed:
    for f in failed:
        print(f)
