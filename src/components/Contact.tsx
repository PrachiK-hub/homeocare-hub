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

const Contact = () => {
  const contactMethods = [
    {
      icon: Phone,
      title: "Emergency Call",
      description: "24/7 Emergency Support",
      contact: "+91 98765 43210",
      action: "Call Now",
      variant: "destructive" as const,
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      description: "Quick consultation & booking",
      contact: "+91 98765 43210",
      action: "Chat on WhatsApp",
      variant: "consultation" as const,
    },
    {
      icon: Mail,
      title: "Email",
      description: "For detailed queries",
      contact: "dr.wellness@homeocare.com",
      action: "Send Email",
      variant: "trust" as const,
    },
    {
      icon: Globe,
      title: "Online Booking",
      description: "Schedule appointment online",
      contact: "Available 24/7",
      action: "Book Online",
      variant: "appointment" as const,
    },
  ];

  const clinicHours = [
    { day: "Monday - Friday", time: "9:00 AM - 7:00 PM" },
    { day: "Saturday", time: "9:00 AM - 5:00 PM" },
    { day: "Sunday", time: "10:00 AM - 2:00 PM" },
    { day: "Emergency", time: "24/7 Available" },
  ];

  return (
    <section id="contact" className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-professional mb-4">
            Get in <span className="text-healing">Touch</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to start your healing journey? Contact us through any of these convenient methods
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Methods */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {contactMethods.map((method, index) => {
                const Icon = method.icon;
                return (
                  <Card key={index} className="shadow-soft border-0 hover:shadow-healing transition-smooth">
                    <CardHeader className="pb-3">
                      <div className="flex items-center mb-2">
                        <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center mr-4">
                          <Icon className="w-6 h-6 text-healing" />
                        </div>
                        <div>
                          <CardTitle className="text-lg text-professional">{method.title}</CardTitle>
                          <p className="text-sm text-muted-foreground">{method.description}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-professional font-medium mb-3">{method.contact}</p>
                      <Button variant={method.variant} className="w-full">
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
                  Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input placeholder="Your Name" className="medical-focus" />
                    <Input placeholder="Phone Number" className="medical-focus" />
                  </div>
                  <Input placeholder="Email Address" className="medical-focus" />
                  <Input placeholder="Symptoms/Condition" className="medical-focus" />
                  <Textarea 
                    placeholder="Describe your health concerns in detail..."
                    className="min-h-32 medical-focus"
                  />
                  <Button variant="appointment" size="lg" className="w-full">
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
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
                  Clinic Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-professional font-medium">
                    Wellness Homeopathy Center
                  </p>
                  <p className="text-muted-foreground">
                    123 Health Street, Medical District<br />
                    Ahmedabad, Gujarat 380001<br />
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
                  Clinic Hours
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
                  Languages Spoken
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
          <CardContent className="p-8 text-center">
            <Phone className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">24/7 Emergency Support</h3>
            <p className="mb-4 opacity-90">
              For urgent medical concerns, call us immediately. We're here to help anytime.
            </p>
            <Button variant="secondary" size="xl">
              <Phone className="w-5 h-5 mr-2" />
              Call Emergency Line: +91 98765 43210
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Contact;