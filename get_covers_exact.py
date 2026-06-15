import urllib.request
import os
import re
import time

urls = {
    "hcmc": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/%28VNM-Ho_Chi_Minh_City%29_HCMC_Metro_Line_1_Hitachi_Rolling_Stock_L1005_%40_Van_Thanh_Park_2025-10-06.jpg/1280px-%28VNM-Ho_Chi_Minh_City%29_HCMC_Metro_Line_1_Hitachi_Rolling_Stock_L1005_%40_Van_Thanh_Park_2025-10-06.jpg",
    "hanoi": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Hanoi_skyline_with_Ba_Vi_Mountain.jpg/1280px-Hanoi_skyline_with_Ba_Vi_Mountain.jpg",
    "sapa": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Tay_sa_pa.jpg/1280px-Tay_sa_pa.jpg",
    "halong": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Ha_Long_Bay_in_2019.jpg/1280px-Ha_Long_Bay_in_2019.jpg",
    "ninhbinh": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Tam_Coc_by_Tuan_Mai_%22007%22_%288888350545%29.jpg/1280px-Tam_Coc_by_Tuan_Mai_%22007%22_%288888350545%29.jpg",
    "hue": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Hue_Imperial_City_2.jpg/1280px-Hue_Imperial_City_2.jpg",
    "danang": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Dragon_Bridge%2C_Da_Nang_during_day_-_20230819_%28cropped%29.jpg/1280px-Dragon_Bridge%2C_Da_Nang_during_day_-_20230819_%28cropped%29.jpg",
    "hoian": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/10549-Hoi-An_%2837621348460%29.jpg/1280px-10549-Hoi-An_%2837621348460%29.jpg",
    "dalat": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Xuan_Huong_Lake_11.jpg/1280px-Xuan_Huong_Lake_11.jpg",
    "phuquoc": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Bai-sao-phu-quoc-tuonglamphotos.jpg/1280px-Bai-sao-phu-quoc-tuonglamphotos.jpg"
}

mapping = {
    "Ho Chi Minh City": "hcmc",
    "Hanoi": "hanoi",
    "Sa Pa": "sapa",
    "Ha Long Bay": "halong",
    "Ninh Binh": "ninhbinh",
    "Hue": "hue",
    "Da Nang": "danang",
    "Hoi An": "hoian",
    "Da Lat": "dalat",
    "Phu Quoc": "phuquoc"
}

with open('src/data/destinations.ts', 'r') as f:
    content = f.read()

for city, url in urls.items():
    print(f"Downloading {city}...")
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'VietanaApp/1.0 (Mozilla)'})
        with urllib.request.urlopen(req) as res, open(f"public/images/cities/{city}.jpg", 'wb') as f_out:
            f_out.write(res.read())
            
    except Exception as e:
        print(f"Failed {city}: {e}")
    time.sleep(1)

for display_name, file_id in mapping.items():
    replace_pattern = rf'(name:\s*"{display_name}",\s*coverImage:\s*)"([^"]+)"'
    content = re.sub(replace_pattern, rf'\1"/images/cities/{file_id}.jpg"', content)

with open('src/data/destinations.ts', 'w') as f:
    f.write(content)

print("Exact covers downloaded!")
