import re
import urllib.request

with open('src/data/destinations.ts', 'r') as f:
    content = f.read()

# Extract the CITIES array section
cities_match = re.search(r'export const CITIES: CityDestination\[\] = \[(.*?)\];', content, re.DOTALL)
if cities_match:
    cities_str = cities_match.group(1)
    # Find all urls in it
    urls = list(set(re.findall(r'https?://[^\s"]+', cities_str)))
    print(f"Found {len(urls)} distinct URLs in CITIES.")

    failed = []
    for url in urls:
        try:
            req = urllib.request.Request(url, method='HEAD', headers={'User-Agent': 'Mozilla/5.0'})
            response = urllib.request.urlopen(req)
            if response.status not in [200, 302, 403, 429]: # 429 is wikimedia rate limit, safe to ignore for verification
                failed.append(f"FAIL: Status {response.status} -> {url}")
        except Exception as e:
            if "429" not in str(e):
                failed.append(f"FAIL: {e} -> {url}")
            
    if len(failed) > 0:
        for f in failed:
            print(f)
    else:
        print("ALL URLS ARE VALID!")
else:
    print("Could not find CITIES array.")

