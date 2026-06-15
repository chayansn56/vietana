import re

covers = {
    "Ho Chi Minh City": "https://upload.wikimedia.org/wikipedia/commons/2/29/Ben_Thanh_Market_2012.jpg",
    "Hanoi": "https://upload.wikimedia.org/wikipedia/commons/8/8e/Hanoi_skyline_with_Ba_Vi_Mountain.jpg",
    "Sa Pa": "https://upload.wikimedia.org/wikipedia/commons/7/7e/Tay_sa_pa.jpg",
    "Ha Long Bay": "https://upload.wikimedia.org/wikipedia/commons/7/79/Ha_Long_Bay_in_2019.jpg",
    "Ninh Binh": "https://upload.wikimedia.org/wikipedia/commons/3/3c/Tam_Coc_by_Tuan_Mai_%22007%22_%288888350545%29.jpg",
    "Hue": "https://upload.wikimedia.org/wikipedia/commons/b/b9/%C4%90%E1%BA%A1i_n%E1%BB%99i.jpg",
    "Da Nang": "https://upload.wikimedia.org/wikipedia/commons/5/50/Da_Nang_Skyline_2017.jpg",
    "Hoi An": "https://upload.wikimedia.org/wikipedia/commons/2/27/10549-Hoi-An_%2837621348460%29.jpg",
    "Da Lat": "https://upload.wikimedia.org/wikipedia/commons/b/b4/Tr%E1%BA%A1m_T%E1%BA%A5u%2C_Y%C3%AAn_B%C3%A1i_road.jpg",
    "Phu Quoc": "https://upload.wikimedia.org/wikipedia/commons/e/e0/Phu_Quoc_island_coast.jpg"
}

with open('src/data/destinations.ts', 'r') as f:
    content = f.read()

# Replace each coverImage for the respective city
for city, img in covers.items():
    # Regex to match the block: name: "City", \n coverImage: "..."
    # We will replace the coverImage string for that city.
    pattern = rf'(name:\s*"{city}",\s*coverImage:\s*)"([^"]+)"'
    content = re.sub(pattern, rf'\1"{img}"', content)

with open('src/data/destinations.ts', 'w') as f:
    f.write(content)

print("Cover images fixed!")
