import { Button } from "@/components/ui/button";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube,
  Heart,
  Shield,
  Clock
} from "lucide-react";

const Footer = () => {
  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "About Doctor", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Contact", href: "#contact" },
  ];

  const services = [
    "Online Consultation",
    "Video Call Treatment",
    "Emergency Support",
    "Chronic Disease Care",
    "Child Health",
    "Women's Health",
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", color: "text-blue-600" },
    { icon: Instagram, href: "#", color: "text-pink-600" },
    { icon: Twitter, href: "#", color: "text-blue-400" },
    { icon: Youtube, href: "#", color: "text-red-600" },
  ];

  return (
    <footer className="bg-professional text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-healing mb-4">Dr. HomeoWellness</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Dedicated to providing safe, effective, and natural healing through homeopathy. 
              With 15+ years of experience, we offer personalized treatment for all age groups 
              with a focus on holistic wellness.
            </p>
            <div className="flex items-center space-x-6 mb-6">
              <div className="flex items-center">
                <Shield className="w-5 h-5 text-healing mr-2" />
                <span className="text-sm">100% Safe Treatment</span>
              </div>
              <div className="flex items-center">
                <Heart className="w-5 h-5 text-red-400 mr-2" />
                <span className="text-sm">Patient-Centered Care</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-trust mr-2" />
                <span className="text-sm">24/7 Emergency Support</span>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <Button
                    key={index}
                    variant="ghost"
                    size="icon"
                    className={`hover:bg-white/10 ${social.color}`}
                  >
                    <Icon className="w-5 h-5" />
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-healing mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-healing transition-smooth"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-trust mb-4">Our Services</h4>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index} className="text-gray-300">
                  {service}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center">
              <Phone className="w-5 h-5 text-healing mr-3" />
              <div>
                <div className="text-sm text-gray-400">Emergency Helpline</div>
                <div className="font-medium">+91 98765 43210</div>
              </div>
            </div>
            <div className="flex items-center">
              <Mail className="w-5 h-5 text-trust mr-3" />
              <div>
                <div className="text-sm text-gray-400">Email Us</div>
                <div className="font-medium">dr.wellness@homeocare.com</div>
              </div>
            </div>
            <div className="flex items-center">
              <MapPin className="w-5 h-5 text-accent mr-3" />
              <div>
                <div className="text-sm text-gray-400">Clinic Address</div>
                <div className="font-medium">Ahmedabad, Gujarat</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-black/20 border-t border-gray-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400 mb-2 md:mb-0">
              © 2024 Dr. HomeoWellness. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-healing transition-smooth">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-healing transition-smooth">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-healing transition-smooth">
                Medical Disclaimer
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;