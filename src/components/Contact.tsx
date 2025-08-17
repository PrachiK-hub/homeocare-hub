import { useState } from "react";
import { useTranslation } from "react-i18next";
import { getEmailTemplate } from '@/utils/emailTemplates';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle,
  Send,
  Globe
} from "lucide-react";
import { useCTA } from "@/utils/cta";
import { toast } from "@/hooks/use-toast";
import emailjs from '@emailjs/browser';

const Contact = () => {
  const { t } = useTranslation();
  const { handleBookAppointment, handleWhatsApp, handleCall } = useCTA();
  
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    honeypot: '' // Spam protection
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // EmailJS Configuration
  const emailConfig = {
    serviceId: 'service_drjaybhatt',
    contactTemplateId: 'template_contact_form',
    publicKey: 'YOUR_EMAILJS_PUBLIC_KEY',
    doctorEmail: 'dr.jaybhatt@homeocare.com',
  };

  const contactMethods = [
    {
      icon: Phone,
      title: t('common.call'),
      description: t('contact.phone.description'),
      contact: t('contact.phone.number'),
      action: t('common.call'),
      variant: "destructive" as const,
      handler: handleCall,
    },
    {
      icon: MessageCircle,
      title: t('common.whatsappUs'),
      description: t('contact.whatsapp.description'),
      contact: t('contact.whatsapp.number'),
      action: t('common.whatsappUs'),
      variant: "consultation" as const,
      handler: handleWhatsApp,
    },
    {
      icon: Mail,
      title: t('common.email'),
      description: t('contact.email.description'),
      contact: t('contact.email.address'),
      action: t('common.sendMessage'),
      variant: "trust" as const,
      handler: () => window.open(`mailto:${t('contact.email.address')}`, '_self'),
    },
    {
      icon: Globe,
      title: t('common.bookAppointment'),
      description: t('contact.booking.description'),
      contact: "Available 24/7",
      action: t('common.bookAppointment'),
      variant: "appointment" as const,
      handler: () => handleBookAppointment(),
    },
  ];

  const clinicHours = [
    { day: "Monday - Friday", time: "9:00 AM - 7:00 PM" },
    { day: "Saturday", time: "9:00 AM - 5:00 PM" },
    { day: "Sunday", time: "10:00 AM - 2:00 PM" },
    { day: "Emergency", time: "24/7 Available" },
  ];

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Spam protection - if honeypot field is filled, it's likely spam
    if (contactForm.honeypot) {
      toast({
        title: "Message Blocked",
        description: "Your message appears to be spam and has been blocked.",
        variant: "destructive"
      });
      return;
    }

    // Validation
    if (!contactForm.name.trim() || !contactForm.email.trim() || !contactForm.message.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactForm.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const currentLang = t('common.language') || 'en';
      const contactTemplate = getEmailTemplate('contact', currentLang);
      
      const templateParams = {
        to_email: emailConfig.doctorEmail,
        to_name: 'Dr. Jay Bhatt',
        name: contactForm.name,
        email: contactForm.email,
        phone: contactForm.phone || 'Not provided',
        subject: contactForm.subject || 'Contact Form Message',
        message: contactForm.message,
        language: currentLang,
      };

      await emailjs.send(
        emailConfig.serviceId,
        emailConfig.contactTemplateId,
        templateParams,
        emailConfig.publicKey
      );

      // Reset form
      setContactForm({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        honeypot: ''
      });

      toast({
        title: "Message Sent Successfully",
        description: "Thank you for your message. Dr. Jay Bhatt will get back to you soon.",
      });

    } catch (error) {
      console.error('Contact form submission failed:', error);
      toast({
        title: "Message Failed to Send",
        description: "Please try again or contact us directly via phone/WhatsApp.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 lg:py-24 bg-background pb-24 md:pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-professional mb-4">
            {t('contact.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
          {/* Contact Methods */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8">
              {contactMethods.map((method, index) => {
                const Icon = method.icon;
                return (
                  <Card key={index} className="shadow-soft border-0 hover:shadow-healing transition-smooth">
                    <CardHeader className="pb-3">
                      <div className="flex items-center mb-2">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-primary-light rounded-full flex items-center justify-center mr-3 md:mr-4">
                          <Icon className="w-5 h-5 md:w-6 md:h-6 text-healing" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-base md:text-lg text-professional truncate">{method.title}</CardTitle>
                          <p className="text-xs md:text-sm text-muted-foreground">{method.description}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-professional font-medium mb-3 text-sm md:text-base break-words">{method.contact}</p>
                      <Button variant={method.variant} className="w-full text-sm md:text-base" onClick={method.handler}>
                        {method.action}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Contact Form */}
            <Card className="shadow-soft border-0">
              <CardHeader>
                <CardTitle className="text-xl text-professional flex items-center">
                  <Send className="w-5 h-5 mr-2 text-healing" />
                  {t('common.sendMessage')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input 
                      placeholder={t('common.name')} 
                      className="medical-focus"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                      required
                    />
                    <Input 
                      placeholder={t('common.phone')} 
                      className="medical-focus"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                    />
                  </div>
                  <Input 
                    placeholder={t('common.email')} 
                    type="email"
                    className="medical-focus"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                    required
                  />
                  <Input 
                    placeholder="Subject (Optional)" 
                    className="medical-focus"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                  />
                  <Textarea 
                    placeholder={t('common.sendMessage')}
                    className="min-h-32 medical-focus"
                    value={contactForm.message}
                    onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                    required
                  />
                  
                  {/* Honeypot field for spam protection */}
                  <div className="hidden">
                    <Input 
                      placeholder="Leave this empty"
                      value={contactForm.honeypot}
                      onChange={(e) => setContactForm({...contactForm, honeypot: e.target.value})}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>
                  
                  <Button 
                    type="submit"
                    variant="appointment" 
                    size="lg" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    {isSubmitting ? 'Sending...' : t('common.sendMessage')}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Clinic Info & Hours */}
          <div className="space-y-6">
            {/* Clinic Location */}
            <Card className="shadow-soft border-0">
              <CardHeader>
                <CardTitle className="text-lg text-professional flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-healing" />
                  {t('contact.clinic.location')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-professional font-medium">
                    Sanjivani Clinic
                  </p>
                  <p className="text-muted-foreground">
                    Junagadh, Gujarat<br />
                    India
                  </p>
                  <Button variant="trust" className="w-full mt-4">
                    <MapPin className="w-4 h-4 mr-2" />
                    View on Google Maps
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Clinic Hours */}
            <Card className="shadow-soft border-0">
              <CardHeader>
                <CardTitle className="text-lg text-professional flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-trust" />
                  {t('contact.clinic.hours')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {clinicHours.map((schedule, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-professional font-medium">{schedule.day}</span>
                      <span className="text-muted-foreground">{schedule.time}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-calm rounded-lg">
                  <p className="text-sm text-professional">
                    <strong>Note:</strong> Emergency consultations available 24/7 via phone or WhatsApp
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Languages Spoken */}
            <Card className="shadow-soft border-0">
              <CardHeader>
                <CardTitle className="text-lg text-professional flex items-center">
                  <Globe className="w-5 h-5 mr-2 text-accent" />
                  {t('contact.languages.title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-primary-light text-healing rounded-full text-sm">English</span>
                  <span className="px-3 py-1 bg-primary-light text-healing rounded-full text-sm">हिंदी (Hindi)</span>
                  <span className="px-3 py-1 bg-primary-light text-healing rounded-full text-sm">ગુજરાતી (Gujarati)</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Emergency Banner */}
        <Card className="bg-gradient-trust text-secondary-foreground shadow-trust border-0">
          <CardContent className="p-6 md:p-8 text-center">
            <Phone className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-4" />
            <h3 className="text-xl md:text-2xl font-bold mb-2">{t('contact.emergency.title')}</h3>
            <p className="mb-4 opacity-90 text-sm md:text-base">
              {t('contact.emergency.description')}
            </p>
            <Button 
              variant="secondary" 
              size="lg" 
              onClick={handleCall} 
              className="w-full sm:w-auto text-sm md:text-base px-6 py-3"
            >
              <Phone className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              {t('contact.emergency.call')}: +91 63537 50262
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Contact;