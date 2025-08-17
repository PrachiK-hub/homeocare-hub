import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { X, Shield, ExternalLink } from 'lucide-react';

const ConsentBanner = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already given consent
    const hasConsent = localStorage.getItem('privacy-consent');
    if (!hasConsent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('privacy-consent', 'true');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('privacy-consent', 'false');
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] bg-white border-t border-gray-200 shadow-lg p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex items-start gap-3 flex-1">
            <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-gray-700">
              <p className="font-medium mb-1">
                We use cookies and external services to provide you with the best experience
              </p>
              <p className="text-gray-600">
                This website uses EmailJS for contact forms, payment gateways for transactions, and WhatsApp for communication. 
                By continuing to use this site, you consent to our use of these services. 
                <a 
                  href="/privacy" 
                  className="text-blue-600 hover:text-blue-800 underline inline-flex items-center gap-1 ml-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn more
                  <ExternalLink className="w-3 h-3" />
                </a>
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 flex-shrink-0">
            <Button
              onClick={handleDecline}
              variant="outline"
              size="sm"
              className="text-sm"
            >
              Decline
            </Button>
            <Button
              onClick={handleAccept}
              size="sm"
              className="text-sm"
            >
              Accept
            </Button>
            <Button
              onClick={handleDecline}
              variant="ghost"
              size="sm"
              className="p-1 h-8 w-8"
              aria-label="Close consent banner"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsentBanner;
