import re
import urllib.request
import concurrent.futures

with open('src/data/destinations.ts', 'r') as f:
    content = f.read()

urls = re.findall(r'image:\s*"(https://upload\.wikimedia\.org/[^"]+)"', content)

urls_to_check = list(set(urls))
failed = []
working = []

def check_url(url):
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        response = urllib.request.urlopen(req, timeout=5)
        if response.getcode() != 200:
            return url, False
    except Exception as e:
        return url, False
    return url, True

with concurrent.futures.ThreadPoolExecutor(max_workers=10) as executor:
    results = executor.map(check_url, urls_to_check)
    for url, is_working in results:
        if not is_working:
            failed.append(url)

print(f"Failed URLs: {len(failed)}")

replacements = {}
for url in failed:
    # If it's a thumb url, un-thumb it
    if '/thumb/' in url:
        # e.g. https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Bai_Tu_Long_Bay.jpeg/960px-Bai_Tu_Long_Bay.jpeg
        base_url = re.sub(r'/thumb(/.*)/[^/]+$', r'\1', url)
        replacements[url] = base_url
        print(f"Thumb match: {url} -> {base_url}")
    else:
        print(f"Non-thumb failed: {url}")
        
# Test the replacements
with concurrent.futures.ThreadPoolExecutor(max_workers=10) as executor:
    results = executor.map(check_url, list(replacements.values()))
    for url, is_working in results:
        if not is_working:
            print(f"Replacement ALSO failed: {url}")
        else:
            print(f"Replacement worked: {url}")

for old, new in replacements.items():
    content = content.replace(old, new)

with open('src/data/destinations.ts', 'w') as f:
    f.write(content)

print("Updated destinations.ts with fixed URLs!")
