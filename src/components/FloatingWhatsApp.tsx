import { useTranslation } from 'react-i18next';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const FloatingWhatsApp = () => {
  const { t } = useTranslation();
  const { toast } = useToast();

  const handleWhatsAppClick = () => {
    const currentLang = t('common.language') || 'en';
    
    // Multilingual pre-filled messages
    const messages = {
      en: "Hello Dr. Jay Bhatt, I would like to book an appointment.",
      hi: "नमस्ते डॉ. जय भट्ट, मैं परामर्श लेना चाहता/चाहती हूँ।",
      gu: "નમસ્તે ડૉ. જય ભટ્ટ, હું પરામર્શ લેવા માગું છું."
    };
    
    const message = messages[currentLang as keyof typeof messages] || messages.en;
    const encodedMessage = encodeURIComponent(message);
    
    // Show confirmation toast
    toast({
      title: "Opening WhatsApp",
      description: "Opening WhatsApp to chat with Dr. Jay Bhatt...",
      duration: 2000,
    });
    
    // Track the click (optional - for analytics)
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'whatsapp_click', {
        event_category: 'engagement',
        event_label: 'floating_whatsapp_button',
        language: currentLang
      });
    }
    
    // Try multiple methods to ensure WhatsApp opens with the message
    try {
      // Method 1: Official wa.me with enhanced parameters
      const whatsappUrl1 = `https://wa.me/916353750262?text=${encodedMessage}&app_absent=0`;
      
      // Method 2: Alternative format that often works better
      const whatsappUrl2 = `https://api.whatsapp.com/send?phone=916353750262&text=${encodedMessage}`;
      
      // Method 3: Direct wa.me without parameters
      const whatsappUrl3 = `https://wa.me/916353750262?text=${encodedMessage}`;
      
      // Show success message first
      toast({
        title: "Opening WhatsApp",
        description: "WhatsApp is opening with your message ready to send!",
        duration: 3000,
      });
      
      // Try to open WhatsApp
      const newWindow = window.open(whatsappUrl1, '_blank');
      
      // If first method fails, try alternatives
      if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
        setTimeout(() => {
          window.open(whatsappUrl2, '_blank');
        }, 500);
        
        setTimeout(() => {
          window.open(whatsappUrl3, '_blank');
        }, 1000);
      }
      
      // Show instructions after a delay
      setTimeout(() => {
        toast({
          title: "Message Ready! 📱",
          description: "If WhatsApp opened, just tap SEND. If not, the message is copied to your clipboard.",
          duration: 5000,
        });
        
        // Copy message to clipboard as backup
        navigator.clipboard.writeText(message).then(() => {
          console.log('Message copied to clipboard as backup');
        }).catch(() => {
          console.log('Clipboard copy failed');
        });
      }, 2000);
      
    } catch (error) {
      // Fallback: Copy to clipboard and show instructions
      navigator.clipboard.writeText(message).then(() => {
        toast({
          title: "Message Copied! 📋",
          description: "Message copied to clipboard. Open WhatsApp and paste it to +91 63537 50262",
          duration: 6000,
        });
      }).catch(() => {
        toast({
          title: "Contact Dr. Jay Bhatt",
          description: `Open WhatsApp and send this message to +91 63537 50262: "${message}"`,
          variant: "destructive",
          duration: 6000,
        });
      });
    }
  };

  return (
    <div className="fixed bottom-20 right-4 z-50 md:bottom-6 md:right-6">
      <Button
        onClick={handleWhatsAppClick}
        size="lg"
        className="h-14 w-14 rounded-full bg-green-500 hover:bg-green-600 shadow-lg hover:shadow-xl transition-all duration-300 group"
        aria-label={`${t('common.whatsappUs')} - Chat with Dr. Jay Bhatt`}
      >
        <MessageCircle className="h-7 w-7 text-white" />
        
        {/* Tooltip for desktop */}
        <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none hidden md:block">
          <div className="bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap">
            {t('common.whatsappUs')}
          </div>
          <div className="absolute left-full top-1/2 transform -translate-y-1/2 -translate-x-1 w-0 h-0 border-l-4 border-l-gray-900 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
        </div>
      </Button>
      
      {/* Pulse animation */}
      <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-20"></div>
    </div>
  );
};

export default FloatingWhatsApp;
