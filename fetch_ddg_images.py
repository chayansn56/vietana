import urllib.request
import urllib.parse
import json
import re

cities = [
  "Sapa", "Hanoi", "Ha Long Bay", "Ninh Binh", "Phong Nha", 
  "Hue", "Da Nang", "Hoi An", "Mui Ne", "Ho Chi Minh City", 
  "Mekong Delta", "Phu Quoc", "Da Lat", "Nha Trang"
]

results = {}

def search_ddg(city):
    query = urllib.parse.quote(city + ' Vietnam landscape high quality')
    url = 'https://html.duckduckgo.com/html/?q=' + query
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        html = urllib.request.urlopen(req).read().decode('utf-8')
        # This is basic HTML search, DDG images require a token. 
        pass
    except:
        pass
    
# Let's use Wikipedia's API properly with the right categories or titles.
def fetch_wiki(city):
    q = urllib.parse.quote(city)
    url = f"https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch={q}&gsrlimit=10&prop=pageimages&piprop=original&format=json"
    req = urllib.request.Request(url, headers={'User-Agent': 'VietanaApp/1.0'})
    try:
        resp = urllib.request.urlopen(req).read()
        data = json.loads(resp)
        urls = []
        pages = data.get('query', {}).get('pages', {})
        for k, v in pages.items():
            if 'original' in v:
                u = v['original']['source']
                if u.lower().endswith(('.jpg', '.png', '.jpeg')):
                    urls.append(u)
        return urls[:5]
    except Exception as e:
        print(e)
        return []

for city in cities:
    res = fetch_wiki(city + " Vietnam")
    results[city] = res
    print(city, len(res))

with open('wiki_real_images.json', 'w') as f:
    json.dump(results, f, indent=2)

