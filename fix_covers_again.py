import re

with open('src/data/destinations.ts', 'r') as f:
    content = f.read()

# For each city block, find the first sight's image and set it as coverImage
city_blocks = content.split('name: "')

new_content = city_blocks[0]

for block in city_blocks[1:]:
    # find the first image: "..." in this block
    sight_image_match = re.search(r'image:\s*"([^"]+)"', block)
    if sight_image_match:
        sight_img = sight_image_match.group(1)
        # replace the coverImage
        block = re.sub(r'coverImage:\s*"[^"]+"', f'coverImage: "{sight_img}"', block)
    
    new_content += 'name: "' + block

with open('src/data/destinations.ts', 'w') as f:
    f.write(new_content)

print("Cover images fixed using sight[0]!")
