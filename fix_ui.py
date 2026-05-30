import os
import re

# 1. Navbar.tsx - Add backdrop-blur to unscrolled state
with open('src/components/Navbar.tsx', 'r') as f:
    nav_content = f.read()

nav_content = nav_content.replace(
    "${scrolled ? (isLight ? 'py-3.5 glass shadow-soft' : 'py-3.5 glass-dark shadow-strong') : 'py-6'}",
    "${scrolled ? (isLight ? 'py-3.5 glass shadow-soft' : 'py-3.5 glass-dark shadow-strong') : 'py-5 backdrop-blur-md bg-white/10 shadow-sm border-b border-white/10'}"
)
with open('src/components/Navbar.tsx', 'w') as f:
    f.write(nav_content)


# 2. CustomTripBuilder.tsx - Remove glass-dark from right panel to prevent blurring images
with open('src/components/CustomTripBuilder.tsx', 'r') as f:
    ctb_content = f.read()

ctb_content = ctb_content.replace(
    'className="flex-1 md:flex-[0.5] p-10 glass-dark bg-black/40 flex flex-col shadow-inner border-l border-white/5 rounded-none border-t-0 border-r-0 border-b-0 overflow-y-auto"',
    'className="flex-1 md:flex-[0.5] p-10 bg-black/60 flex flex-col shadow-inner border-l border-white/5 rounded-none border-t-0 border-r-0 border-b-0 overflow-y-auto"'
)
with open('src/components/CustomTripBuilder.tsx', 'w') as f:
    f.write(ctb_content)


# 3. FAQ.tsx - Increase hierarchy of question
with open('src/components/FAQ.tsx', 'r') as f:
    faq_content = f.read()

faq_content = faq_content.replace(
    'text-[14px] md:text-[15px] font-semibold text-brand-green-dark',
    'text-[16px] md:text-[17px] font-bold text-black drop-shadow-sm'
)
with open('src/components/FAQ.tsx', 'w') as f:
    f.write(faq_content)

