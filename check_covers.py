import re
import urllib.request

with open('src/data/destinations.ts', 'r') as f:
    content = f.read()

urls = re.findall(r'coverImage:\s*"([^"]+)"', content)

for url in urls:
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        res = urllib.request.urlopen(req)
        if res.getcode() != 200:
            print(f"FAILED: {url}")
    except Exception as e:
        print(f"FAILED EXCEPTION: {url} {e}")

print("Done checking covers!")
