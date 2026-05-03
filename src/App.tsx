/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, 
  Plane, 
  ShieldCheck, 
  Clock, 
  Utensils, 
  Hotel, 
  MessageCircle, 
  Menu, 
  X, 
  ChevronRight,
  Star,
  Camera,
  Coffee,
  Heart,
  Globe
} from 'lucide-react';

const WHATSAPP_INDIA = "https://wa.me/91XXXXXXXXXX?text=Hi Vietana, I'm interested in planning a trip to Vietnam!";
const WHATSAPP_VIETNAM = "https://wa.me/84XXXXXXXXXX?text=Hi Vietana, I'm interested in planning a trip to Vietnam!";
const WHATSAPP_DEFAULT = WHATSAPP_INDIA;

// --- Animation Variants ---
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { staggerChildren: 0.1 }
};

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Packages', href: '#packages' },
    { name: 'Food', href: '#food' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md py-3 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex flex-col group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className={`text-2xl font-black tracking-tighter transition-colors ${scrolled ? 'text-brand-primary' : 'text-white'}`}>
            VIETANA
          </div>
          <div className="h-1 w-full bg-brand-accent rounded-full -mt-1 scale-x-110 origin-left opacity-90 group-hover:bg-brand-primary transition-colors" />
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className={`text-sm font-bold tracking-wide transition-colors ${scrolled ? 'text-brand-text hover:text-brand-primary' : 'text-white/90 hover:text-white'}`}
            >
              {link.name}
            </a>
          ))}
          <a 
            href={WHATSAPP_DEFAULT} 
            className="bg-brand-primary text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:scale-105 transition-all shadow-md active:scale-95 border-b-2 border-black/10"
          >
            Enquire Now
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className={`md:hidden ${scrolled ? 'text-brand-text' : 'text-white'}`} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 w-full bg-white shadow-xl py-8 px-6 md:hidden flex flex-col space-y-4"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-lg font-bold text-brand-text border-b border-brand-bg pb-2"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a 
              href={WHATSAPP_DEFAULT}
              className="w-full bg-brand-primary text-white py-4 rounded-xl text-center font-bold text-lg"
            >
              WhatsApp Inquiry
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [
    "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=2000",
    "https://images.unsplash.com/photo-1555661515-8bb18624b13d?auto=format&fit=crop&q=80&w=2000",
    "https://images.unsplash.com/photo-1598967534947-f2731783303d?auto=format&fit=crop&q=80&w=2000"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-brand-text">
      {/* Background Slider */}
      {images.map((img, idx) => (
        <motion.div 
          key={idx}
          initial={{ opacity: 0 }}
          animate={{ opacity: currentSlide === idx ? 1 : 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
        >
          <img src={img} alt="Vietnam" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-black/45" />
        </motion.div>
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="flex flex-col items-center mb-6">
            <span className="text-white font-bold tracking-[0.5em] text-sm mb-2 block uppercase opacity-80 italic">Vietana Premium</span>
          </div>
          
          <div className="relative inline-block mb-4">
            <h1 className="text-7xl md:text-9xl font-black text-white leading-none tracking-tighter">
              VIETANA
            </h1>
            <div className="h-2 w-full bg-brand-accent rounded-full mt-1 scale-x-110" />
          </div>

          <div className="mb-14">
            <span className="text-4xl md:text-6xl text-brand-accent font-script drop-shadow-lg block">
              Feel Vietnam, Your Way
            </span>
          </div>

          <p className="text-lg md:text-xl text-white/95 mb-14 max-w-2xl mx-auto font-medium leading-relaxed">
            Seamless travel from India to Vietnam with premium support, curated tours, and legitimate local heritage.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a 
              href={WHATSAPP_DEFAULT}
              className="w-full sm:w-auto bg-brand-primary text-white px-12 py-5 rounded-xl font-bold text-lg hover:scale-110 transition-all shadow-2xl border-b-4 border-black/10"
            >
              Plan My Trip
            </a>
            <a 
              href="#packages"
              className="w-full sm:w-auto px-12 py-5 rounded-xl font-bold text-lg text-white border-2 border-white/40 hover:bg-white/10 transition-all backdrop-blur-sm"
            >
              Explore Packages
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const TrustStrip = () => {
  const items = [
    { icon: <Globe size={24} />, text: "Dual Presence: India & Vietnam" },
    { icon: <ShieldCheck size={24} />, text: "Fast Visa Support" },
    { icon: <Star size={24} />, text: "Verified Local Experts" },
  ];

  return (
    <div className="bg-white border-b border-brand-bg py-6">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center justify-center space-x-3 text-brand-text">
            <div className="text-brand-accent">{item.icon}</div>
            <span className="font-semibold text-sm tracking-wide">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const Services = () => {
  const services = [
    { icon: <ShieldCheck size={32} />, title: "Visa Assistance", desc: "Smooth and reliable processing" },
    { icon: <MapPin size={32} />, title: "Vietnam Tours", desc: "Crafted itineraries north to south" },
    { icon: <Plane size={32} />, title: "Airport Pickup", desc: "Comfort from the moment you land" },
    { icon: <Hotel size={32} />, title: "Hotel Booking", desc: "Handpicked premium stays" },
    { icon: <Utensils size={32} />, title: "Food Experiences", desc: "Taste the heart of Vietnam" },
  ];

  return (
    <section id="services" className="py-24 bg-brand-bg">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16">Customized Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {services.map((item, idx) => (
            <motion.div 
              key={idx}
              {...fadeIn}
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-xl shadow-sm border border-transparent hover:border-brand-primary/20 hover:shadow-xl transition-all text-center"
            >
              <div className="text-brand-accent mb-6 flex justify-center">{item.icon}</div>
              <h3 className="text-lg font-bold mb-3">{item.title}</h3>
              <p className="text-brand-muted text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Packages = () => {
  const packages = [
    {
      title: "Vietnam 5 Days Starter",
      tagline: "City • Culture • Easy",
      image: "https://images.unsplash.com/photo-1598967534947-f2731783303d?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Heritage Explorer",
      tagline: "History • Scenery • Slow",
      image: "https://images.unsplash.com/photo-1555661515-8bb18624b13d?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Luxury Northern Escape",
      tagline: "Bay • Mountains • Premium",
      image: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <section id="packages" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16 font-serif underline decoration-brand-accent decoration-4 underline-offset-8">Curated Packages</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, idx) => (
            <motion.div 
              key={idx}
              {...fadeIn}
              whileHover={{ scale: 1.02 }}
              className="group relative h-[500px] rounded-2xl overflow-hidden shadow-lg cursor-pointer"
            >
              <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <h3 className="text-2xl font-bold text-white mb-2">{pkg.title}</h3>
                <p className="text-white/80 mb-6 font-medium">{pkg.tagline}</p>
                <a 
                  href={WHATSAPP_DEFAULT}
                  className="inline-block border border-white rounded-full px-6 py-2 text-white text-sm font-bold hover:bg-white hover:text-brand-text transition-colors"
                >
                  Enquire Now
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FoodExperience = () => {
  return (
    <section id="food" className="py-24 bg-brand-bg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeIn}>
            <img 
              src="https://images.unsplash.com/photo-1617062168141-75081c2bbd36?auto=format&fit=crop&q=80&w=1000" 
              alt="Vietnamese Food" 
              className="rounded-2xl shadow-2xl border-b-8 border-brand-accent/50"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <motion.div {...fadeIn}>
            <h2 className="text-5xl font-bold mb-8 leading-tight">Eat Like a Local</h2>
            <p className="text-lg text-brand-muted mb-10 leading-relaxed font-medium">
              Vietnam's soul is in its streets and kitchens. We take you beyond tourist traps to experience legitimate culinary heritage.
            </p>
            <div className="space-y-6 mb-12">
              <div className="flex items-center space-x-4 border-l-4 border-brand-accent pl-6">
                <div>
                  <h4 className="text-xl font-bold text-brand-primary">Mi Quảng Cô Viên</h4>
                  <p className="text-brand-muted">The definitive taste of Central Vietnam</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 border-l-4 border-brand-accent pl-6">
                <div>
                  <h4 className="text-xl font-bold text-brand-primary">The Spicy Spoon</h4>
                  <p className="text-brand-muted">Modern twist on traditional heat</p>
                </div>
              </div>
            </div>
            <a 
              href={WHATSAPP_DEFAULT}
              className="inline-block bg-brand-primary text-white px-10 py-5 rounded-xl font-bold hover:scale-105 transition-all shadow-lg"
            >
              Ask About Food Tours
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 bg-brand-text text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeIn} className="order-2 lg:order-1">
            <span className="text-brand-accent font-bold uppercase tracking-widest text-sm mb-6 block underline decoration-2 underline-offset-4">Our Story</span>
            <h2 className="text-5xl font-bold mb-8 leading-tight">Built Between India & Vietnam</h2>
            <div className="space-y-6 text-white/80 text-lg leading-relaxed font-serif italic">
              <p>We understand the specific needs of Indian travelers—from dietary preferences to the desire for authentic cultural immersion.</p>
              <p>With a robust local network and active involvement in Vietnamese businesses, we provide a bridge that ensures safety, comfort, and real experiences.</p>
            </div>
          </motion.div>
          <motion.div {...fadeIn} className="order-1 lg:order-2">
            <img 
              src="https://images.unsplash.com/photo-1509030450996-93f2e1d78682?auto=format&fit=crop&q=80&w=1000" 
              alt="India Vietnam Bridge" 
              className="rounded-2xl opacity-70 border-r-8 border-brand-accent/30"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-32 bg-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div {...fadeIn}>
          <h2 className="text-5xl md:text-6xl font-bold mb-10 text-brand-primary">Let’s Plan Your Trip</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
            <a 
              href={WHATSAPP_INDIA}
              className="bg-brand-primary text-white py-6 rounded-xl font-bold text-lg hover:scale-105 transition-all shadow-xl flex items-center justify-center space-x-3"
            >
              <MessageCircle size={24} />
              <span>WhatsApp India</span>
            </a>
            <a 
              href={WHATSAPP_VIETNAM}
              className="bg-brand-primary text-white py-6 rounded-xl font-bold text-lg hover:scale-105 transition-all shadow-xl flex items-center justify-center space-x-3 border-2 border-brand-accent/20"
            >
              <MessageCircle size={24} />
              <span>WhatsApp Vietnam</span>
            </a>
          </div>
          <div className="space-y-4 text-brand-muted">
            <p className="font-bold text-brand-primary text-xl">hello@vietana.com</p>
            <p className="text-sm font-semibold tracking-widest uppercase">Hanoi • Ho Chi Minh City • New Delhi</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 bg-brand-bg border-t border-brand-primary/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center text-brand-muted text-sm font-medium">
          <div className="flex flex-col mb-6 md:mb-0">
            <span className="font-black text-xl text-brand-primary tracking-tighter">VIETANA</span>
            <div className="h-0.5 w-full bg-brand-accent/50 rounded-full" />
          </div>
          <div className="flex space-x-8 mb-6 md:mb-0">
            <a href="#services" className="hover:text-brand-primary transition-colors">Services</a>
            <a href="#packages" className="hover:text-brand-primary transition-colors">Packages</a>
            <a href="#about" className="hover:text-brand-primary transition-colors">About</a>
          </div>
          <div>© {new Date().getFullYear()} Vietana Travel. Designed for Indian Travelers.</div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen selection:bg-brand-accent selection:text-brand-primary">
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <Services />
        <Packages />
        <FoodExperience />
        <About />
        <Contact />
      </main>
      <Footer />
      
      {/* Scroll to Top / Floating WhatsApp */}
      <a 
        href={WHATSAPP_DEFAULT}
        className="fixed bottom-8 right-8 z-[60] bg-brand-primary text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform border-4 border-brand-accent/20"
      >
        <MessageCircle size={32} />
      </a>
    </div>
  );
}
