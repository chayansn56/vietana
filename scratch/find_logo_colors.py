from PIL import Image
from collections import Counter

# Load image
img = Image.open('/Users/chayansoni/.gemini/antigravity/scratch/vietana/public/vietana_logo.png')
img = img.convert('RGBA')

width, height = img.size
colors = []

for x in range(width):
    for y in range(height):
        r, g, b, a = img.getpixel((x, y))
        if a > 10:  # visible
            # Calculate standard deviation manually
            mean = (r + g + b) / 3
            variance = ((r - mean)**2 + (g - mean)**2 + (b - mean)**2) / 3
            std = variance ** 0.5
            if std > 25:
                # Target blue/cyan hues
                if b > r and g > r:
                    colors.append((r, g, b))

counter = Counter(colors)
most_common = counter.most_common(10)

print("Most common blue/cyan colors in logo:")
for color, count in most_common:
    r, g, b = color
    hex_color = f"#{r:02x}{g:02x}{b:02x}"
    print(f"RGB: ({r}, {g}, {b}) - HEX: {hex_color} - Count: {count}")
