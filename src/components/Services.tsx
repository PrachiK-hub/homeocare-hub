import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Video, 
  Stethoscope, 
  Phone, 
  MessageCircle, 
  Clock, 
  Shield,
  Heart,
  Baby,
  User,
  Users
} from "lucide-react";

const Services = () => {
  const consultationTypes = [
    {
      icon: Video,
      title: "Video Consultation",
      description: "Face-to-face consultation from home comfort",
      duration: "30-45 mins",
      price: "₹800",
      variant: "trust" as const,
    },
    {
      icon: Phone,
      title: "Phone Consultation",
      description: "Professional consultation over phone call",
      duration: "20-30 mins", 
      price: "₹600",
      variant: "consultation" as const,
    },
    {
      icon: MessageCircle,
      title: "Chat Consultation",
      description: "Quick consultation via secure messaging",
      duration: "24 hrs response",
      price: "₹400",
      variant: "calm" as const,
    },
    {
      icon: Stethoscope,
      title: "Clinic Visit",
      description: "In-person detailed examination & treatment",
      duration: "45-60 mins",
      price: "₹1000",
      variant: "default" as const,
    },
  ];

  const specializations = [
    {
      icon: Heart,
      title: "Chronic Diseases",
      description: "Diabetes, Hypertension, Arthritis, Thyroid disorders",
      color: "text-red-500",
    },
    {
      icon: User,
      title: "Skin & Allergies", 
      description: "Eczema, Psoriasis, Allergic reactions, Acne",
      color: "text-healing",
    },
    {
      icon: Baby,
      title: "Child Health",
      description: "Immunity building, Growth issues, Behavioral problems",
      color: "text-trust",
    },
    {
      icon: Users,
      title: "Women's Health",
      description: "PCOS, Menstrual disorders, Pregnancy care",
      color: "text-purple-500",
    },
  ];

  return (
    <section id="services" className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-professional mb-4">
            Our <span className="text-healing">Services</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose from multiple consultation options designed for your convenience and comfort
          </p>
        </div>

        {/* Consultation Types */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {consultationTypes.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card key={index} className="shadow-soft hover:shadow-healing transition-smooth border-0">
                <CardHeader className="text-center pb-2">
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary-light rounded-full flex items-center justify-center">
                    <Icon className="w-8 h-8 text-healing" />
                  </div>
                  <CardTitle className="text-lg text-professional">{service.title}</CardTitle>
                  <CardDescription className="text-sm">{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="flex items-center justify-center mb-3 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 mr-1" />
                    {service.duration}
                  </div>
                  <div className="text-2xl font-bold text-healing mb-4">{service.price}</div>
                  <Button variant={service.variant} className="w-full">
                    Book Now
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Specializations */}
        <div className="text-center mb-8">
          <h3 className="text-2xl md:text-3xl font-bold text-professional mb-4">
            <span className="text-trust">Specializations</span>
          </h3>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Expert treatment for various health conditions with personalized homeopathic care
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {specializations.map((spec, index) => {
            const Icon = spec.icon;
            return (
              <Card key={index} className="shadow-soft hover:shadow-trust transition-smooth border-0 text-center p-6">
                <Icon className={`w-12 h-12 mx-auto mb-4 ${spec.color}`} />
                <h4 className="text-lg font-semibold text-professional mb-2">{spec.title}</h4>
                <p className="text-sm text-muted-foreground">{spec.description}</p>
              </Card>
            );
          })}
        </div>

        {/* Trust Indicators */}
        <Card className="bg-gradient-calm border-0 shadow-soft p-8 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center justify-center">
              <Shield className="w-8 h-8 text-healing mr-3" />
              <div className="text-left">
                <div className="text-lg font-semibold text-professional">100% Safe</div>
                <div className="text-sm text-muted-foreground">No side effects</div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Clock className="w-8 h-8 text-trust mr-3" />
              <div className="text-left">
                <div className="text-lg font-semibold text-professional">Quick Response</div>
                <div className="text-sm text-muted-foreground">Same day booking</div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Heart className="w-8 h-8 text-red-500 mr-3" />
              <div className="text-left">
                <div className="text-lg font-semibold text-professional">Caring Approach</div>
                <div className="text-sm text-muted-foreground">Patient-focused care</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default Services;