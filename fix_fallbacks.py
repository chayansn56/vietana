import re
import random

FALLBACKS = {
    "market": "https://upload.wikimedia.org/wikipedia/commons/2/29/Ben_Thanh_Market_2012.jpg",
    "lake": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/H%E1%BB%93_Ho%C3%A0n_Ki%E1%BA%BFm.jpg/1280px-H%E1%BB%93_Ho%C3%A0n_Ki%E1%BA%BFm.jpg",
    "pagoda": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Tran_Quoc_Pagoda_-_Hanoi_-_Vietnam_%2834015690382%29.jpg/1280px-Tran_Quoc_Pagoda_-_Hanoi_-_Vietnam_%2834015690382%29.jpg",
    "temple": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Tran_Quoc_Pagoda_-_Hanoi_-_Vietnam_%2834015690382%29.jpg/1280px-Tran_Quoc_Pagoda_-_Hanoi_-_Vietnam_%2834015690382%29.jpg",
    "cave": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Phong_Nha_cave_2016_01.jpg/1280px-Phong_Nha_cave_2016_01.jpg",
    "mountain": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Hanoi_skyline_with_Ba_Vi_Mountain.jpg/1280px-Hanoi_skyline_with_Ba_Vi_Mountain.jpg",
    "bridge": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2024_H%E1%BB%99i_An_-_Japanese_Covered_Bridge_%28Ch%C3%B9a_C%E1%BA%A7u%29_after_renovation_-_img_11.jpg/1280px-2024_H%E1%BB%99i_An_-_Japanese_Covered_Bridge_%28Ch%C3%B9a_C%E1%BA%A7u%29_after_renovation_-_img_11.jpg",
    "beach": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Bang_Saen_Beach_at_sunset_2.jpg/1280px-Bang_Saen_Beach_at_sunset_2.jpg",
    "waterfall": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Ban_Gioc_waterfall.jpg/1280px-Ban_Gioc_waterfall.jpg",
    "village": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/H%E1%BB%99i_An%2C_Ancient_Town%2C_2020-01_CN-06.jpg/1280px-H%E1%BB%99i_An%2C_Ancient_Town%2C_2020-01_CN-06.jpg",
    "bay": "https://upload.wikimedia.org/wikipedia/commons/7/79/Ha_Long_Bay_in_2019.jpg",
    "island": "https://upload.wikimedia.org/wikipedia/commons/e/e0/Phu_Quoc_island_coast.jpg",
    "city": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Hanoi_skyline_with_Ba_Vi_Mountain.jpg/1280px-Hanoi_skyline_with_Ba_Vi_Mountain.jpg",
    "default_1": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/10549-Hoi-An_%2837621348460%29.jpg/1280px-10549-Hoi-An_%2837621348460%29.jpg",
    "default_2": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/%C4%90%E1%BA%A1i_n%E1%BB%99i.jpg/1280px-%C4%90%E1%BA%A1i_n%E1%BB%99i.jpg",
    "default_3": "https://upload.wikimedia.org/wikipedia/commons/7/7e/Tay_sa_pa.jpg"
}

with open('src/data/destinations.ts', 'r') as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if "https://upload.wikimedia.org/wikipedia/commons/e/e0/Phu_Quoc_island_coast.jpg" in line:
        # Check context
        lower_line = line.lower()
        new_img = None
        for key, img in FALLBACKS.items():
            if key in lower_line and not key.startswith("default"):
                new_img = img
                break
        
        if not new_img:
            new_img = random.choice([FALLBACKS["default_1"], FALLBACKS["default_2"], FALLBACKS["default_3"]])
            
        lines[i] = line.replace("https://upload.wikimedia.org/wikipedia/commons/e/e0/Phu_Quoc_island_coast.jpg", new_img)

with open('src/data/destinations.ts', 'w') as f:
    f.writelines(lines)
    
print("Fixed fallbacks!")
