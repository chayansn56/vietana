import React from 'react';
import { 
  Leaf, 
  Plane, 
  Soup, 
  Sparkles, 
  Star, 
  MapPin, 
  Phone, 
  MessageCircle, 
  Mail, 
  Car, 
  Building, 
  Palmtree, 
  Mountain, 
  Sailboat, 
  Map, 
  Camera, 
  Flame,
  Check,
  Clock,
  Menu,
  X,
  ChevronRight,
  ChevronDown,
  ClipboardList,
  Wifi,
  Ticket,
  Globe,
  Settings,
  Train,
  Edit3,
  Castle,
  Users,
  Moon,
  Target,
  Mic,
  Ban,
  Fish,
  Drumstick,
  LeafyGreen,
  UtensilsCrossed,
  MessageSquare,
  ArrowRight,
  AlertTriangle,
  AlertCircle,
  HeartPulse,
  Flag,
  ShieldAlert,
  Download,
  FileText,
  Utensils,
  Heart
} from 'lucide-react';

export type IconName = 
  | 'Leaf' | 'Plane' | 'Soup' | 'Sparkles' | 'Star' 
  | 'MapPin' | 'Phone' | 'MessageCircle' | 'Mail' 
  | 'Car' | 'Building' | 'Palmtree' | 'Mountain' 
  | 'Sailboat' | 'Map' | 'Camera' | 'Flame'
  | 'Check' | 'Clock' | 'Menu' | 'X' | 'ChevronRight' | 'ChevronDown'
  | 'ClipboardList' | 'Wifi' | 'Ticket' | 'Globe'
  | 'Settings' | 'Train' | 'Edit3'
  | 'Castle' | 'Users' | 'Moon' | 'Target' | 'Mic'
  | 'Ban' | 'Fish' | 'Drumstick' | 'LeafyGreen' | 'UtensilsCrossed'
  | 'MessageSquare' | 'ArrowRight'
  | 'AlertTriangle' | 'AlertCircle' | 'HeartPulse' | 'Flag' | 'ShieldAlert' | 'Download'
  | 'FileText' | 'Utensils' | 'Heart';

const iconMap: Record<IconName, React.ElementType> = {
  Leaf, Plane, Soup, Sparkles, Star, MapPin, Phone, MessageCircle, Mail,
  Car, Building, Palmtree, Mountain, Sailboat, Map, Camera, Flame,
  Check, Clock, Menu, X, ChevronRight, ChevronDown,
  ClipboardList, Wifi, Ticket, Globe,
  Settings, Train, Edit3, Castle, Users, Moon, Target, Mic,
  Ban, Fish, Drumstick, LeafyGreen, UtensilsCrossed, MessageSquare, ArrowRight,
  AlertTriangle, AlertCircle, HeartPulse, Flag, ShieldAlert, Download,
  FileText, Utensils, Heart
};

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number | string;
  color?: string;
  className?: string;
}

const Icon: React.FC<IconProps> = ({ name, size = 24, color = 'currentColor', className = '', ...props }) => {
  const LucideIcon = iconMap[name];
  if (!LucideIcon) return null;
  
  return <LucideIcon size={size} color={color} className={className} {...props} />;
};

export default Icon;
