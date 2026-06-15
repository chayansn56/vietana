import urllib.request
import re
import json

req = urllib.request.Request('https://unsplash.com/s/photos/vietnam', headers={'User-Agent': 'Mozilla/5.0'})
html = urllib.request.urlopen(req).read().decode('utf-8')

# Find photo IDs
ids = re.findall(r'\"id\":\"([a-zA-Z0-9_-]{11})\"', html)
# filter unique
ids = list(set(ids))

print(json.dumps(ids[:50]))
