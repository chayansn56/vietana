import urllib.request
import urllib.parse
import json
import re
import time

CITIES_DATA = [
    {
        "id": "hcmc",
        "name": "Ho Chi Minh City",
        "shortDesc": "The vibrant heart of the south.",
        "fullDesc": "A high-octane city of commerce and culture that drives the country forward. Sleek skyscrapers stand shoulder-to-shoulder with ornate temples and colonial relics.",
        "sights": [
            {"name": "Ben Thanh Market", "desc": "The bustling central market perfect for souvenirs and street food."},
            {"name": "War Remnants Museum", "desc": "A powerful, sobering look at the Vietnam War from the local perspective."},
            {"name": "Independence Palace", "desc": "The historic former home of the president of South Vietnam."},
            {"name": "Notre-Dame Cathedral Basilica of Saigon", "desc": "A striking 19th-century basilica built entirely with materials from France."},
            {"name": "Saigon Central Post Office", "desc": "A stunning colonial post office designed by Gustave Eiffel."},
            {"name": "Cu Chi Tunnels", "desc": "Crawl through the immense network of connecting underground tunnels."},
            {"name": "Bui Vien", "desc": "The energetic, neon-lit epicenter of Saigon's nightlife."},
            {"name": "Bitexco Financial Tower", "desc": "A modern skyscraper offering panoramic views from its skydeck."},
            {"name": "Jade Emperor Pagoda", "desc": "An atmospheric, incense-filled Taoist and Buddhist temple."},
            {"name": "Binh Tay Market", "desc": "The massive, bustling wholesale market in the heart of Cholon (Chinatown)."}
        ]
    },
    {
        "id": "hanoi",
        "name": "Hanoi",
        "shortDesc": "The 1000-year-old capital of culture.",
        "fullDesc": "Hanoi blends Parisian grace with Asian pace. A city where ancient temples sit beside bustling street food stalls, and serene lakes offer refuge from the vibrant motorbike-filled streets.",
        "sights": [
            {"name": "Hoan Kiem Lake", "desc": "The historical heart of Hanoi, featuring the iconic red Huc Bridge and Ngoc Son Temple."},
            {"name": "Old Quarter, Hanoi", "desc": "36 historic streets, each traditionally dedicated to a specific trade."},
            {"name": "Temple of Literature, Hanoi", "desc": "Vietnam's first national university, a tranquil temple dedicated to Confucius."},
            {"name": "Ho Chi Minh Mausoleum", "desc": "The monumental marble resting place of the revolutionary leader."},
            {"name": "Imperial Citadel of Thang Long", "desc": "A UNESCO World Heritage site showcasing centuries of Vietnamese history."},
            {"name": "Hoa Lo Prison", "desc": "A thought-provoking museum revealing the history of the 'Hanoi Hilton'."},
            {"name": "Hanoi Street Train", "desc": "A narrow residential street where a massive train passes inches from homes."},
            {"name": "Tran Quoc Pagoda", "desc": "The oldest Buddhist temple in Hanoi, beautifully situated on West Lake."},
            {"name": "Dong Xuan Market", "desc": "The largest indoor market in Hanoi offering endless local goods."},
            {"name": "Thang Long Water Puppet Theatre", "desc": "Experience the traditional art of Vietnamese water puppetry."}
        ]
    },
    {
        "id": "sapa",
        "name": "Sa Pa",
        "shortDesc": "Misty mountains and terraced rice fields.",
        "fullDesc": "Perched high in the Hoang Lien Son Mountains, Sapa is famous for its dramatic terraced rice fields, misty peaks, and the rich cultural tapestry of local hill tribes.",
        "sights": [
            {"name": "Fansipan", "desc": "The 'Roof of Indochina', accessible via a breathtaking cable car ride or strenuous trek."},
            {"name": "Cat Cat Village", "desc": "A traditional H'mong village featuring waterfalls and traditional crafts."},
            {"name": "Muong Hoa Valley", "desc": "Home to the most spectacular sweeping rice terraces in all of Vietnam."},
            {"name": "Silver Waterfall", "desc": "A stunning 200m cascading waterfall surrounded by lush pine forests."},
            {"name": "Love Waterfall", "desc": "A romantic, secluded waterfall located deep within the forest."},
            {"name": "Ta Phin Village", "desc": "A peaceful village famous for the traditional red Dao herbal baths."},
            {"name": "Sapa Stone Church", "desc": "A beautiful French Gothic church located in the center of town."},
            {"name": "Ham Rong Mountain", "desc": "Climb through orchid gardens for a panoramic view over Sapa town."}
        ]
    },
    {
        "id": "halong",
        "name": "Ha Long Bay",
        "shortDesc": "Emerald waters and limestone islands.",
        "fullDesc": "A UNESCO World Heritage site featuring thousands of towering limestone karsts emerging gracefully from emerald-green waters. Best experienced on an overnight luxury junk boat.",
        "sights": [
            {"name": "Sung Sot Cave", "desc": "The 'Surprise Cave', the largest and most magnificent grotto in the bay."},
            {"name": "Ti Top Island", "desc": "Climb to the top for a spectacular 360-degree panoramic view of the bay."},
            {"name": "Bai Tu Long Bay", "desc": "A quieter, more pristine alternative located just east of Ha Long Bay."},
            {"name": "Lan Ha Bay", "desc": "Stunning karst formations south of Ha Long, offering kayaking and swimming."},
            {"name": "Cat Ba Island", "desc": "The largest island in the bay, featuring a massive national park and beaches."},
            {"name": "Thien Cung Cave", "desc": "The 'Heavenly Palace Cave', renowned for its intricate stalactites."},
            {"name": "Luon Cave", "desc": "A tranquil flooded cave accessible only by small bamboo boats or kayaks."},
            {"name": "Cua Van Floating Village", "desc": "One of the largest traditional floating fishing villages in the area."}
        ]
    },
    {
        "id": "ninhbinh",
        "name": "Ninh Binh",
        "shortDesc": "Ha Long Bay on land.",
        "fullDesc": "A surreal landscape of river-carved limestone mountains rising from vibrant green rice paddies. A peaceful retreat into Vietnam's most cinematic natural scenery.",
        "sights": [
            {"name": "Trang An Scenic Landscape Complex", "desc": "A spectacular waterway network through caves and sheer cliffs."},
            {"name": "Tam Coc-Bich Dong", "desc": "Drift down the Ngo Dong river through three magnificent caves."},
            {"name": "Hang Mua", "desc": "Climb 500 stone steps to the famous dragon statue and a breathtaking valley view."},
            {"name": "Bai Dinh Pagoda", "desc": "The largest and most impressive complex of Buddhist temples in Vietnam."},
            {"name": "Hoa Lu", "desc": "The ancient 10th-century capital of Vietnam, nestled between limestone mountains."},
            {"name": "Bich Dong Pagoda", "desc": "An ancient, multi-tiered pagoda built directly into a limestone cave."},
            {"name": "Thung Nham Bird Park", "desc": "A serene ecological park home to thousands of wild birds and storks."},
            {"name": "Van Long Nature Reserve", "desc": "A tranquil, mirror-like wetland reserve perfect for peaceful boat rides."}
        ]
    },
    {
        "id": "hue",
        "name": "Hue",
        "shortDesc": "The ancient imperial capital.",
        "fullDesc": "Step back in time in Hue, the former seat of the Nguyen Dynasty. Famous for its sprawling Imperial Citadel, majestic royal tombs, and the poetic Perfume River.",
        "sights": [
            {"name": "Imperial City, Hue", "desc": "The vast, moat-surrounded fortress and palace complex of the former emperors."},
            {"name": "Tomb of Khai Dinh", "desc": "A dramatic and intricate fusion of traditional Vietnamese and European architecture."},
            {"name": "Tomb of Tu Duc", "desc": "A sprawling, poetic royal tomb set amidst a beautiful pine forest and lake."},
            {"name": "Tomb of Minh Mang", "desc": "A majestic and highly symmetrical royal tomb complex."},
            {"name": "Thien Mu Pagoda", "desc": "An iconic seven-story pagoda sitting gracefully on the bank of the river."},
            {"name": "Perfume River", "desc": "Take a dragon boat ride at sunset for a truly romantic experience."},
            {"name": "Dong Ba Market", "desc": "The oldest and largest commercial hub in Hue, perfect for local food."},
            {"name": "Thanh Toan Bridge", "desc": "A beautiful, ancient tile-roofed wooden bridge located in a quiet village."}
        ]
    },
    {
        "id": "danang",
        "name": "Da Nang",
        "shortDesc": "Where the city meets the sea.",
        "fullDesc": "A modern, vibrant coastal city known for its sandy beaches, iconic bridges, and the majestic Marble Mountains. The perfect blend of urban energy and coastal relaxation.",
        "sights": [
            {"name": "Ba Na Hills", "desc": "A massive mountaintop resort featuring the iconic Golden Bridge held by stone hands."},
            {"name": "Marble Mountains (Vietnam)", "desc": "Five marble and limestone hills filled with caves and Buddhist sanctuaries."},
            {"name": "Dragon Bridge (Da Nang)", "desc": "A spectacular bridge that literally breathes fire and water on weekends."},
            {"name": "My Khe Beach", "desc": "Miles of pristine white sand, perfect for surfing and sunbathing."},
            {"name": "Son Tra Mountain", "desc": "Lush jungles offering sweeping ocean views and the towering Lady Buddha statue."},
            {"name": "Museum of Cham Sculpture", "desc": "Houses the world's largest collection of ancient Cham artifacts."},
            {"name": "Han Market", "desc": "A bustling multi-level market offering local food, spices, and clothing."},
            {"name": "Hai Van Pass", "desc": "One of the most scenic coastal mountain passes in the world."}
        ]
    },
    {
        "id": "hoian",
        "name": "Hoi An",
        "shortDesc": "Lantern-lit ancient streets.",
        "fullDesc": "The most charming town in Vietnam. A remarkably preserved trading port where yellow heritage buildings, silk lanterns, and world-class tailors create a magical atmosphere.",
        "sights": [
            {"name": "Japanese Covered Bridge", "desc": "A beautifully ornate 18th-century bridge and temple, the symbol of the town."},
            {"name": "Hoi An Ancient Town", "desc": "Wander through exceptionally preserved streets illuminated by silk lanterns."},
            {"name": "An Bang Beach", "desc": "A laid-back, beautiful beach just a quick bicycle ride from the ancient town."},
            {"name": "Tra Que Vegetable Village", "desc": "A peaceful farming village where you can learn traditional Vietnamese agriculture."},
            {"name": "Thu Bon River", "desc": "Take a wooden rowboat at sunset and release a paper lantern for good luck."},
            {"name": "Phuc Kien Assembly Hall", "desc": "A stunning, highly decorated temple built by Chinese merchants."},
            {"name": "Hoi An Night Market", "desc": "A bustling market selling endless lanterns, souvenirs, and street food."},
            {"name": "Bay Mau Coconut Forest", "desc": "Spin through the water coconut groves in a traditional circular basket boat."}
        ]
    },
    {
        "id": "dalat",
        "name": "Da Lat",
        "shortDesc": "The city of eternal spring.",
        "fullDesc": "Nestled in the Central Highlands, Da Lat offers a cool climate, French colonial architecture, pine forests, and sprawling flower gardens. A romantic mountain escape.",
        "sights": [
            {"name": "Hang Nga guesthouse", "desc": "The 'Crazy House', a wildly surreal architectural masterpiece resembling a giant tree."},
            {"name": "Xuan Huong Lake", "desc": "The picturesque crescent-moon shaped lake at the very center of the city."},
            {"name": "Datanla Waterfall", "desc": "Ride a thrilling alpine coaster through the pine forest down to the falls."},
            {"name": "Truc Lam Zen Monastery", "desc": "A peaceful monastery accessible via a scenic cable car ride over the pines."},
            {"name": "Pongour Waterfall", "desc": "A massive, magnificent terraced waterfall located just outside the city."},
            {"name": "Langbiang Mountain", "desc": "Hike or take a jeep to the peak for spectacular views of the highlands."},
            {"name": "Valley of Love", "desc": "A highly manicured, romantic park featuring flower gardens and pedal boats."},
            {"name": "Da Lat Railway Station", "desc": "A beautifully preserved Art Deco railway station from the French colonial era."},
            {"name": "Linh Phuoc Pagoda", "desc": "An incredible temple intricately decorated with millions of broken glass pieces."}
        ]
    },
    {
        "id": "phuquoc",
        "name": "Phu Quoc",
        "shortDesc": "White sands and pristine sunsets.",
        "fullDesc": "Vietnam's premier island getaway. Framed by white-sand beaches and dense tropical jungle, it is the ultimate destination for luxury resorts and spectacular seafood.",
        "sights": [
            {"name": "Bai Sao", "desc": "Famous for its stunning powder-white sand and crystalline turquoise waters."},
            {"name": "Phu Quoc Night Market", "desc": "A paradise for seafood lovers with endless fresh catches grilled to order."},
            {"name": "Hon Thom Cable Car", "desc": "The world's longest over-sea cable car offering breathtaking aerial island views."},
            {"name": "VinWonders Phu Quoc", "desc": "Vietnam's largest theme park featuring thrilling rides and a massive aquarium."},
            {"name": "Grand World Phu Quoc", "desc": "An entertainment complex dubbed 'The sleepless city' with Venetian canals."},
            {"name": "Phu Quoc Prison", "desc": "A sobering historical site detailing the island's dark history during the war."},
            {"name": "Vinpearl Safari Phu Quoc", "desc": "Vietnam's largest semi-wildlife conservation park."},
            {"name": "Suoi Tranh Waterfall", "desc": "A gentle, picturesque waterfall surrounded by lush jungle and walking trails."}
        ]
    }
]

import urllib.request, urllib.parse, json
import time

def fetch_wikipedia_image(query):
    # Search for the page first
    search_url = f"https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch={urllib.parse.quote(query)}&utf8=&format=json&srlimit=1"
    try:
        req = urllib.request.Request(search_url, headers={'User-Agent': 'Vietana/1.0'})
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode())
            if 'query' in data and 'search' in data['query'] and len(data['query']['search']) > 0:
                title = data['query']['search'][0]['title']
                
                # Now fetch the image for this page
                img_url = f"https://en.wikipedia.org/w/api.php?action=query&titles={urllib.parse.quote(title)}&prop=pageimages&format=json&pithumbsize=1000"
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
    
    # Try just generic images based on keywords
    return None

import random
FALLBACKS = [
    "https://upload.wikimedia.org/wikipedia/commons/2/29/Ben_Thanh_Market_2012.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/H%E1%BB%93_Ho%C3%A0n_Ki%E1%BA%BFm.jpg/1280px-H%E1%BB%93_Ho%C3%A0n_Ki%E1%BA%BFm.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Tran_Quoc_Pagoda_-_Hanoi_-_Vietnam_%2834015690382%29.jpg/1280px-Tran_Quoc_Pagoda_-_Hanoi_-_Vietnam_%2834015690382%29.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Phong_Nha_cave_2016_01.jpg/1280px-Phong_Nha_cave_2016_01.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Hanoi_skyline_with_Ba_Vi_Mountain.jpg/1280px-Hanoi_skyline_with_Ba_Vi_Mountain.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2024_H%E1%BB%99i_An_-_Japanese_Covered_Bridge_%28Ch%C3%B9a_C%E1%BA%A7u%29_after_renovation_-_img_11.jpg/1280px-2024_H%E1%BB%99i_An_-_Japanese_Covered_Bridge_%28Ch%C3%B9a_C%E1%BA%A7u%29_after_renovation_-_img_11.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Bang_Saen_Beach_at_sunset_2.jpg/1280px-Bang_Saen_Beach_at_sunset_2.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Ban_Gioc_waterfall.jpg/1280px-Ban_Gioc_waterfall.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/H%E1%BB%99i_An%2C_Ancient_Town%2C_2020-01_CN-06.jpg/1280px-H%E1%BB%99i_An%2C_Ancient_Town%2C_2020-01_CN-06.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/7/79/Ha_Long_Bay_in_2019.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/e/e0/Phu_Quoc_island_coast.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/%C4%90%E1%BA%A1i_n%E1%BB%99i.jpg/1280px-%C4%90%E1%BA%A1i_n%E1%BB%99i.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/7/7e/Tay_sa_pa.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Ha_Long_Bay_-_Vietnam.jpg/1280px-Ha_Long_Bay_-_Vietnam.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Da_Nang_Skyline_2017.jpg/1280px-Da_Nang_Skyline_2017.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Hue_Imperial_City_2.jpg/1280px-Hue_Imperial_City_2.jpg"
]
random.shuffle(FALLBACKS)
fallback_index = 0

def get_fallback():
    global fallback_index
    img = FALLBACKS[fallback_index % len(FALLBACKS)]
    fallback_index += 1
    return img

print("Fetching images via Wikipedia Search API...")
for city in CITIES_DATA:
    city['coverImage'] = fetch_wikipedia_image(city['name'] + ' city') or get_fallback()
    for i, sight in enumerate(city['sights']):
        img = fetch_wikipedia_image(sight['name'])
        if not img:
            img = get_fallback()
            
        sight['id'] = f"{city['id']}{i+1}"
        sight['image'] = img
        time.sleep(0.1)

# Now generate the TS code
ts_code = "export const CITIES: CityDestination[] = [\n"
for city in CITIES_DATA:
    ts_code += "  {\n"
    ts_code += f"    id: \"{city['id']}\",\n"
    ts_code += f"    name: \"{city['name']}\",\n"
    ts_code += f"    coverImage: \"{city['coverImage']}\",\n"
    ts_code += f"    shortDesc: \"{city['shortDesc']}\",\n"
    ts_code += f"    fullDesc: \"{city['fullDesc']}\",\n"
    ts_code += "    sights: [\n"
    for sight in city['sights']:
        desc = sight['desc'].replace('"', '\\"')
        name = sight['name'].replace('"', '\\"')
        ts_code += f"      {{ id: \"{sight['id']}\", name: \"{name}\", image: \"{sight['image']}\", description: \"{desc}\" }},\n"
    ts_code += "    ]\n"
    ts_code += "  },\n"
ts_code += "];\n"

with open('src/data/destinations.ts', 'r') as f:
    content = f.read()

import re
new_content = re.sub(r'export const CITIES: CityDestination\[\] = \[.*\];', ts_code, content, flags=re.DOTALL)

with open('src/data/destinations.ts', 'w') as f:
    f.write(new_content)

print("Successfully generated src/data/destinations.ts with unique images!")

