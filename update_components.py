import re

files = [
    'src/components/Hero.tsx',
    'src/components/Contact.tsx',
    'src/components/About.tsx',
    'src/components/Food.tsx',
    'src/components/CustomTripBuilder.tsx',
    'src/components/MagicMode.tsx',
    'src/components/Footer.tsx'
]

for filepath in files:
    with open(filepath, 'r') as f:
        content = f.read()

    # Simple text replacements in JSX
    # We will just replace `VIETANA™` and `VIETANA` in text nodes with `<BrandName />`
    
    # In About.tsx
    content = content.replace("VIETANA wasn't just born", "<BrandName /> wasn't just born")
    content = content.replace("That's exactly how VIETANA was created", "That's exactly how <BrandName /> was created")
    content = content.replace("The VIETANA Team", "The <BrandName /> Team")
    content = content.replace("The VIETANA Story", "The <BrandName /> Story")

    # In Contact, Hero, Food, CustomTripBuilder
    content = content.replace("Travel Gets Better with VIETANA™", "Travel Gets Better with <BrandName />")
    content = content.replace("Travel Gets Better with VIETANA", "Travel Gets Better with <BrandName />")
    
    content = content.replace("VIETANA™ REAL-TIME ESTIMATE ENGINE V4", "<BrandName /> REAL-TIME ESTIMATE ENGINE V4")
    content = content.replace("🤖 Ask VIETANA AI", "🤖 Ask <BrandName /> AI")
    
    content = content.replace("Let VIETANA™ understand you", "Let <BrandName /> understand you")
    content = content.replace("exclusive VIETANA curated food tours", "exclusive <BrandName /> curated food tours")
    
    content = content.replace(">VIETANA<", "><BrandName /><")
    content = content.replace("© {currentYear} Vietana Travel.", "© {currentYear} <BrandName /> Travel.")
    
    with open(filepath, 'w') as f:
        f.write(content)

print("Updated text nodes")
