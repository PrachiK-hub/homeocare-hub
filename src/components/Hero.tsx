import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Phone, Video, MessageCircle, Calendar } from "lucide-react";
import doctorProfile from "@/assets/doctor-profile.jpeg";
import { useCTA } from "@/utils/cta";

const Hero = () => {
  const { t } = useTranslation();
  const { handleBookAppointment, handleConsultOnline, handleCall } = useCTA();

  return (
    <section id="home" className="gradient-calm py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-professional mb-6 leading-tight">
              {t('hero.title')}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              {t('hero.description')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Button variant="appointment" size="xl" onClick={() => handleBookAppointment()}>
                <Calendar className="w-5 h-5 mr-2" />
                {t('common.bookAppointment')}
              </Button>
              <Button variant="trust" size="xl" onClick={handleConsultOnline}>
                <Video className="w-5 h-5 mr-2" />
                {t('common.consultOnline')}
              </Button>
              <Button 
                variant="outline" 
                size="xl" 
                onClick={() => {
                  const currentLang = t('common.language') || 'en';
                  let message = '';
                  
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
                  
                  const encodedMessage = encodeURIComponent(message);
                  
                  // Try multiple methods to ensure WhatsApp opens with the message
                  try {
                    // Method 1: Official wa.me with enhanced parameters
                    const whatsappUrl1 = `https://wa.me/916353750262?text=${encodedMessage}&app_absent=0`;
                    
                    // Method 2: Alternative format that often works better
                    const whatsappUrl2 = `https://api.whatsapp.com/send?phone=916353750262&text=${encodedMessage}`;
                    
                    // Method 3: Direct wa.me without parameters
                    const whatsappUrl3 = `https://wa.me/916353750262?text=${encodedMessage}`;
                    
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
                }}
                className="bg-green-600 hover:bg-green-700 text-white border-green-600"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Quick Book on WhatsApp
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0">
                              <div className="text-center">
                  <div className="text-2xl font-bold text-healing">3+</div>
                  <div className="text-sm text-muted-foreground">{t('common.experience')}</div>
                </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-trust">500+</div>
                <div className="text-sm text-muted-foreground">Patients Treated</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-healing">95%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
            </div>
          </div>

          {/* Right Content - Doctor Image & Contact Cards */}
          <div className="flex flex-col items-center">
            <div className="relative mb-8">
              <img
                src={doctorProfile}
                alt="Dr. Jay Bhatt - Homeopathy Specialist"
                className="w-80 h-80 object-cover rounded-full shadow-healing border-4 border-primary-light"
              />

            </div>

            {/* Doctor Info Card */}
            <Card className="p-6 max-w-sm w-full shadow-soft">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-professional mb-2">
                  Dr. Jay Bhatt
                </h3>
                <p className="text-healing font-medium mb-2">
                  {t('hero.title')}
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  {t('hero.subtitle')} - {t('common.experience')}
                </p>
                
                {/* Quick Contact Options */}
                <div className="grid grid-cols-3 gap-2">
                  <Button variant="calm" size="sm" onClick={handleCall}>
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button variant="calm" size="sm" onClick={() => handleBookAppointment()}>
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                  <Button variant="calm" size="sm" onClick={handleConsultOnline}>
                    <Video className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;