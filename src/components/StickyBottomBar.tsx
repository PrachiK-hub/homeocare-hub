import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, MessageCircle, Phone } from 'lucide-react';
import { useCTA } from '@/utils/cta';

const StickyBottomBar = () => {
  const { t } = useTranslation();
  const { handleBookAppointment, handleWhatsApp, handleCall } = useCTA();
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  // Detect keyboard open/close on mobile
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 768;
      if (isMobile) {
        // On mobile, if viewport height is significantly reduced, keyboard is likely open
        const heightRatio = window.innerHeight / window.outerHeight;
        setIsKeyboardOpen(heightRatio < 0.7);
      }
    };

    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        setIsKeyboardOpen(true);
      }
    };

    const handleFocusOut = () => {
      // Small delay to allow for keyboard animation
      setTimeout(() => setIsKeyboardOpen(false), 300);
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('focusin', handleFocusIn);
    document.addEventListener('focusout', handleFocusOut);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('focusin', handleFocusIn);
      document.removeEventListener('focusout', handleFocusOut);
    };
  }, []);

  // Hide bottom bar when keyboard is open
  if (isKeyboardOpen) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="bg-white border-t border-gray-200 shadow-lg pb-safe">
        <div className="flex items-center justify-around p-4 min-h-[64px]">
          <Button
            onClick={() => handleBookAppointment()}
            variant="default"
            size="sm"
            className="flex-1 mx-1 min-h-[44px] flex flex-col items-center justify-center gap-1 text-base font-semibold"
            aria-label={`${t('common.bookAppointment')} - Book an appointment with Dr. Jay Bhatt`}
          >
            <Calendar className="w-5 h-5" />
            <span className="text-sm font-medium">{t('common.bookAppointment')}</span>
          </Button>
          
          <Button
            onClick={handleWhatsApp}
            variant="outline"
            size="sm"
            className="flex-1 mx-1 min-h-[44px] flex flex-col items-center justify-center gap-1 bg-green-50 border-green-200 text-green-700 hover:bg-green-100 text-base font-semibold"
            aria-label={`${t('common.whatsappUs')} - Contact Dr. Jay Bhatt on WhatsApp`}
          >
            <MessageCircle className="w-5 h-5" />
            <span className="text-sm font-medium">{t('common.whatsappUs')}</span>
          </Button>
          
          <Button
            onClick={handleCall}
            variant="outline"
            size="sm"
            className="flex-1 mx-1 min-h-[44px] flex flex-col items-center justify-center gap-1 bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 text-base font-semibold"
            aria-label={`${t('common.call')} - Call Dr. Jay Bhatt`}
          >
            <Phone className="w-5 h-5" />
            <span className="text-sm font-medium">{t('common.call')}</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StickyBottomBar;
