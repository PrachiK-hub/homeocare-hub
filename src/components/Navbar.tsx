import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Globe } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState("EN");

  const languages = [
    { code: "EN", label: "English", name: "English" },
    { code: "HI", label: "हिंदी", name: "Hindi" },
    { code: "GU", label: "ગુજરાતી", name: "Gujarati" },
  ];

  const toggleLanguage = () => {
    const currentIndex = languages.findIndex(lang => lang.code === language);
    const nextIndex = (currentIndex + 1) % languages.length;
    setLanguage(languages[nextIndex].code);
  };

  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 border-b border-border shadow-soft">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-healing">Dr. HomeoWellness</h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a
                href="#home"
                className="text-professional hover:text-healing transition-smooth px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </a>
              <a
                href="#about"
                className="text-professional hover:text-healing transition-smooth px-3 py-2 rounded-md text-sm font-medium"
              >
                About
              </a>
              <a
                href="#services"
                className="text-professional hover:text-healing transition-smooth px-3 py-2 rounded-md text-sm font-medium"
              >
                Services
              </a>
              <a
                href="#contact"
                className="text-professional hover:text-healing transition-smooth px-3 py-2 rounded-md text-sm font-medium"
              >
                Contact
              </a>
            </div>
          </div>

          {/* Language Switcher & CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="text-professional hover:text-healing"
            >
              <Globe className="w-4 h-4 mr-1" />
              {languages.find(lang => lang.code === language)?.label}
            </Button>
            <Button variant="appointment" size="lg">
              <Phone className="w-4 h-4 mr-2" />
              Book Consultation
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-professional hover:text-healing"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-calm rounded-lg mt-2 shadow-soft">
              <a
                href="#home"
                className="text-professional hover:text-healing block px-3 py-2 rounded-md text-base font-medium transition-smooth"
                onClick={() => setIsOpen(false)}
              >
                Home
              </a>
              <a
                href="#about"
                className="text-professional hover:text-healing block px-3 py-2 rounded-md text-base font-medium transition-smooth"
                onClick={() => setIsOpen(false)}
              >
                About
              </a>
              <a
                href="#services"
                className="text-professional hover:text-healing block px-3 py-2 rounded-md text-base font-medium transition-smooth"
                onClick={() => setIsOpen(false)}
              >
                Services
              </a>
              <a
                href="#contact"
                className="text-professional hover:text-healing block px-3 py-2 rounded-md text-base font-medium transition-smooth"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </a>
              <div className="pt-4 pb-2 border-t border-border">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleLanguage}
                  className="text-professional hover:text-healing mb-2 w-full justify-start"
                >
                  <Globe className="w-4 h-4 mr-2" />
                  {languages.find(lang => lang.code === language)?.name}
                </Button>
                <Button variant="appointment" size="lg" className="w-full">
                  <Phone className="w-4 h-4 mr-2" />
                  Book Consultation
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;