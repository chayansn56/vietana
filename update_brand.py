import os
import re

files_to_update = [
    'src/components/Hero.tsx',
    'src/components/About.tsx',
    'src/components/Contact.tsx',
    'src/components/Services.tsx',
    'src/components/CustomTripBuilder.tsx',
    'src/components/MagicMode.tsx',
    'src/components/Footer.tsx',
    'src/components/Food.tsx',
]

def process_file(filepath):
    if not os.path.exists(filepath):
        return
        
    with open(filepath, 'r') as f:
        content = f.read()

    # Skip if BrandName is already imported
    if 'BrandName' in content:
        return

    # Add import
    import_stmt = "import BrandName from './ui/BrandName';\n"
    if filepath == 'src/components/Services.tsx' or filepath == 'src/components/CustomTripBuilder.tsx' or filepath == 'src/components/MagicMode.tsx' or filepath == 'src/components/Food.tsx':
        pass # Handle separately if needed, but they are all in src/components/
    
    # Let's just find the last import and insert it there
    last_import_idx = content.rfind('import ')
    if last_import_idx != -1:
        newline_idx = content.find('\n', last_import_idx)
        content = content[:newline_idx+1] + "import BrandName from './ui/BrandName';\n" + content[newline_idx+1:]
    else:
        content = "import BrandName from './ui/BrandName';\n" + content

    # Replace occurrences of VIETANA with <BrandName /> carefully.
    # In JSX text, "VIETANA" -> <BrandName />
    # In string literals, we can't just put <BrandName />.
    # So we should be careful.
    
    with open(filepath, 'w') as f:
        f.write(content)

for f in files_to_update:
    process_file(f)

print("Imports added")
