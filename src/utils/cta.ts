import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export const useCTA = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const PHONE_NUMBER = '+916353750262';
  const WHATSAPP_NUMBER = '916353750262';

  const handleBookAppointment = (service?: string) => {
    if (service) {
      navigate(`/book?service=${service}`);
    } else {
      navigate('/book');
    }
  };

  const handleConsultOnline = () => {
    navigate('/book?service=online-consultation');
  };

  const handleClinicVisit = () => {
    navigate('/book?service=clinic-visit');
  };

  const handleWhatsApp = () => {
    const currentLang = i18n.language;
    let message = '';
    
    switch (currentLang) {
      case 'hi':
        message = 'नमस्ते डॉ. जय भट्ट, मुझे होम्योपैथिक परामर्श की आवश्यकता है। कृपया मुझे अपॉइंटमेंट के बारे में जानकारी दें।';
        break;
      case 'gu':
        message = 'નમસ્તે ડૉ. જય ભટ્ટ, મને હોમિયોપેથિક સલાહની જરૂર છે. કૃપા કરી મને એપોઇન્ટમેન્ટ વિશે માહિતી આપો.';
        break;
      default:
        message = 'Hello Dr. Jay Bhatt, I need homeopathic consultation. Please provide me information about appointment.';
    }
    
    const encodedMessage = encodeURIComponent(message);
    
    // Try multiple methods to ensure WhatsApp opens with the message
    try {
      // Method 1: Official wa.me with enhanced parameters
      const whatsappUrl1 = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}&app_absent=0`;
      
      // Method 2: Alternative format that often works better
      const whatsappUrl2 = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodedMessage}`;
      
      // Method 3: Direct wa.me without parameters
      const whatsappUrl3 = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
      
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
      
      // Copy message to clipboard as backup
      setTimeout(() => {
        navigator.clipboard.writeText(message).then(() => {
          console.log('Message copied to clipboard as backup');
        }).catch(() => {
          console.log('Clipboard copy failed');
        });
      }, 2000);
      
    } catch (error) {
      // Fallback: Copy to clipboard and show instructions
      navigator.clipboard.writeText(message).then(() => {
        alert(`✅ Message copied to clipboard!\n\n📱 How to contact Dr. Jay Bhatt:\n\n1. Open WhatsApp on your phone\n2. Tap "New Chat" (+)\n3. Enter: +91 63537 50262\n4. Paste the copied message\n5. Send!\n\nYour message is ready to paste! 📋`);
      }).catch(() => {
        alert(`📱 Contact Dr. Jay Bhatt:\n\nPlease open WhatsApp and send this message to +91 63537 50262:\n\n"${message}"`);
      });
    }
  };

  const handleWhatsAppQuickBook = (bookingData?: any) => {
    const currentLang = i18n.language;
    let message = '';
    
    if (bookingData && bookingData.service && bookingData.date && bookingData.time && bookingData.name) {
      // Pre-filled message with booking details
      const serviceName = bookingData.service === 'online' ? 'online consultation' : 
                         bookingData.service === 'clinic' ? 'clinic visit' : 
                         bookingData.service === 'package' ? 'child health package' : 'consultation';
      
      switch (currentLang) {
        case 'hi':
          message = `नमस्ते डॉ. जय भट्ट, मैं ${serviceName} बुक करना चाहता/चाहती हूं। तारीख: ${bookingData.date}, समय: ${bookingData.time}। मेरा नाम ${bookingData.name} है। कृपया मुझे अपॉइंटमेंट की पुष्टि करें।`;
          break;
        case 'gu':
          message = `નમસ્તે ડૉ. જય ભટ્ટ, હું ${serviceName} બુક કરવા માંગુ છું. તારીખ: ${bookingData.date}, સમય: ${bookingData.time}. મારું નામ ${bookingData.name} છે. કૃપા કરી મને એપોઇન્ટમેન્ટની પુષ્ટિ કરો.`;
          break;
        default:
          message = `Hello Dr. Jay Bhatt, I want to book a ${serviceName} on ${bookingData.date} at ${bookingData.time}. My name is ${bookingData.name}. Please confirm my appointment.`;
      }
    } else {
      // Generic booking message
      switch (currentLang) {
        case 'hi':
          message = 'नमस्ते डॉ. जय भट्ट, मैं अपॉइंटमेंट बुक करना चाहता/चाहती हूं। कृपया मुझे उपलब्ध समय के बारे में बताएं।';
          break;
        case 'gu':
          message = 'નમસ્તે ડૉ. જય ભટ્ટ, હું એપોઇન્ટમેન્ટ બુક કરવા માંગુ છું. કૃપા કરી મને ઉપલબ્ધ સમય વિશે જણાવો.';
          break;
        default:
          message = 'Hello Dr. Jay Bhatt, I want to book an appointment. Please let me know about available timings.';
      }
    }
    
    const encodedMessage = encodeURIComponent(message);
    
    // Try multiple methods to ensure WhatsApp opens with the message
    try {
      // Method 1: Official wa.me with enhanced parameters
      const whatsappUrl1 = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}&app_absent=0`;
      
      // Method 2: Alternative format that often works better
      const whatsappUrl2 = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodedMessage}`;
      
      // Method 3: Direct wa.me without parameters
      const whatsappUrl3 = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
      
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
      
      // Copy message to clipboard as backup
      setTimeout(() => {
        navigator.clipboard.writeText(message).then(() => {
          console.log('Message copied to clipboard as backup');
        }).catch(() => {
          console.log('Clipboard copy failed');
        });
      }, 2000);
      
    } catch (error) {
      // Fallback: Copy to clipboard and show instructions
      navigator.clipboard.writeText(message).then(() => {
        alert(`✅ Message copied to clipboard!\n\n📱 How to contact Dr. Jay Bhatt:\n\n1. Open WhatsApp on your phone\n2. Tap "New Chat" (+)\n3. Enter: +91 63537 50262\n4. Paste the copied message\n5. Send!\n\nYour message is ready to paste! 📋`);
      }).catch(() => {
        alert(`📱 Contact Dr. Jay Bhatt:\n\nPlease open WhatsApp and send this message to +91 63537 50262:\n\n"${message}"`);
      });
    }
  };

  const handleCall = () => {
    window.open(`tel:${PHONE_NUMBER}`, '_self');
  };

  return {
    handleBookAppointment,
    handleConsultOnline,
    handleClinicVisit,
    handleWhatsApp,
    handleWhatsAppQuickBook,
    handleCall,
    PHONE_NUMBER,
    WHATSAPP_NUMBER
  };
};
