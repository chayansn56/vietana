import urllib.request
import urllib.parse
import time
import re
import json

dishes = [
  # Viet Veg
  ('v-veg-1', 'Pho'),
  ('v-veg-2', 'Bánh_mì'),
  ('v-veg-3', 'Rice_vermicelli'),
  ('v-veg-4', 'Mì_Quảng'),
  ('v-veg-5', 'Gỏi_cuốn'),
  ('v-veg-6', 'Cơm_tấm'),
  ('v-veg-7', 'Tofu'),
  ('v-veg-8', 'Hot_pot'),
  ('v-veg-9', 'Lotus_root'),
  ('v-veg-10', 'Congee'),
  
  # Viet Non-Veg
  ('v-nveg-1', 'Pho'),
  ('v-nveg-2', 'Bun_cha'),
  ('v-nveg-3', 'Mì_Quảng'),
  ('v-nveg-4', 'Cơm_tấm'),
  ('v-nveg-5', 'Bánh_mì'),
  ('v-nveg-6', 'Cao_lầu'),
  ('v-nveg-7', 'Bún_thịt_nướng'),
  ('v-nveg-8', 'Chả_giò'),
  ('v-nveg-9', 'Clay_pot_cooking'),
  ('v-nveg-10', 'Lẩu'),

  # Indian Veg
  ('i-veg-1', 'Paneer_makhani'),
  ('i-veg-2', 'Dal_makhani'),
  ('i-veg-3', 'Chole_bhature'),
  ('i-veg-4', 'Palak_paneer'),
  ('i-veg-5', 'Biryani'),
  ('i-veg-6', 'Aloo_gobi'),
  ('i-veg-7', 'Rajma'),
  ('i-veg-8', 'Masala_dosa'),
  ('i-veg-9', 'Idli'),
  ('i-veg-10', 'Kofta'),

  # Indian Non-Veg
  ('i-nveg-1', 'Butter_chicken'),
  ('i-nveg-2', 'Chicken_tikka_masala'),
  ('i-nveg-3', 'Biryani'),
  ('i-nveg-4', 'Tandoori_chicken'),
  ('i-nveg-5', 'Korma'),
  ('i-nveg-6', 'Rogan_josh'),
  ('i-nveg-7', 'Malabar_matthi_curry'),
  ('i-nveg-8', 'Chettinad_cuisine'),
  ('i-nveg-9', 'Seekh_kebab'),
  ('i-nveg-10', 'Fish_curry'),
]

FALLBACK = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/800px-Good_Food_Display_-_NCI_Visuals_Online.jpg'

headers = {
    'User-Agent': 'VietanaBot/1.0 (chayan@example.com) urllib'
}

mapping = {}
for id_, q in dishes:
    url = f"https://en.wikipedia.org/w/api.php?action=query&titles={urllib.parse.quote(q)}&prop=pageimages&format=json&pithumbsize=800"
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as response:
            res = json.loads(response.read().decode())
        pages = res.get('query', {}).get('pages', {})
        page = list(pages.values())[0]
        thumb = page.get('thumbnail', {}).get('source')
        if thumb:
            mapping[id_] = thumb
        else:
            mapping[id_] = FALLBACK
    except Exception as e:
        print(f"Error on {q}: {e}")
        mapping[id_] = FALLBACK
    time.sleep(2.0)

with open('src/data/food.ts', 'r') as f:
    content = f.read()

def replace_img(match):
    full_match = match.group(0)
    # The regex matches from "id: '...'" up to "img: '...'"
    id_match = re.search(r"id:\s*'([^']+)'", full_match)
    if id_match and id_match.group(1) in mapping:
        img_url = mapping[id_match.group(1)]
        return re.sub(r"img:\s*'[^']+'", f"img: '{img_url}'", full_match)
    return full_match

# We need to replace the img: '...' fields in food.ts
# Since I previously wrote 'https://...' into it, I will replace those.
content = re.sub(r"id:\s*'[^']+'.*?img:\s*'[^']+'", replace_img, content, flags=re.DOTALL)

with open('src/data/food.ts', 'w') as f:
    f.write(content)

print("Finished python script")
