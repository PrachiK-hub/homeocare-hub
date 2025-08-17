import { useTranslation } from "react-i18next";
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
import { useCTA } from "@/utils/cta";

const Services = () => {
  const { t } = useTranslation();
  const { handleBookAppointment, handleClinicVisit } = useCTA();

  const consultationTypes = [
    {
      icon: Video,
      title: t('common.onlineConsultation'),
      description: t('services.videoConsultation.description'),
      duration: t('services.videoConsultation.duration'),
      price: t('services.videoConsultation.price'),
      variant: "trust" as const,
    },
    {
      icon: Phone,
      title: t('services.phoneConsultation.title'),
      description: t('services.phoneConsultation.description'),
      duration: t('services.phoneConsultation.duration'), 
      price: t('services.phoneConsultation.price'),
      variant: "consultation" as const,
    },
    {
      icon: MessageCircle,
      title: t('services.chatConsultation.title'),
      description: t('services.chatConsultation.description'),
      duration: t('services.chatConsultation.duration'),
      price: t('services.chatConsultation.price'),
      variant: "calm" as const,
    },
    {
      icon: Stethoscope,
      title: t('common.clinicVisit'),
      description: t('services.clinicVisit.description'),
      duration: t('services.clinicVisit.duration'),
      price: t('services.clinicVisit.price'),
      variant: "default" as const,
    },
  ];

  const specializations = [
    {
      icon: Heart,
      title: t('common.chronicDiseaseManagement'),
      description: t('services.chronicDiseases.description'),
      color: "text-red-500",
    },
    {
      icon: User,
      title: t('services.skinAllergies.title'), 
      description: t('services.skinAllergies.description'),
      color: "text-healing",
    },
    {
      icon: Baby,
      title: t('common.childHealthPackage'),
      description: t('services.childHealth.description'),
      color: "text-trust",
    },
    {
      icon: Users,
      title: t('services.womensHealth.title'),
      description: t('services.womensHealth.description'),
      color: "text-purple-500",
    },
  ];

  return (
    <section id="services" className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-professional mb-4">
            {t('services.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('services.subtitle')}
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
                  <Button 
                    variant={service.variant} 
                    className="w-full"
                    onClick={() => {
                      if (service.title === t('common.onlineConsultation')) {
                        handleBookAppointment('online-consultation');
                      } else if (service.title === t('common.clinicVisit')) {
                        handleClinicVisit();
                      } else {
                        handleBookAppointment();
                      }
                    }}
                  >
                    {t('common.bookAppointment')}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Specializations */}
        <div className="text-center mb-8">
          <h3 className="text-2xl md:text-3xl font-bold text-professional mb-4">
            {t('services.specializations')}
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
                <div className="text-lg font-semibold text-professional">{t('services.safety.title')}</div>
                <div className="text-sm text-muted-foreground">{t('services.safety.description')}</div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Clock className="w-8 h-8 text-trust mr-3" />
              <div className="text-left">
                <div className="text-lg font-semibold text-professional">{t('services.response.title')}</div>
                <div className="text-sm text-muted-foreground">{t('services.response.description')}</div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Heart className="w-8 h-8 text-red-500 mr-3" />
              <div className="text-left">
                <div className="text-lg font-semibold text-professional">{t('services.care.title')}</div>
                <div className="text-sm text-muted-foreground">{t('services.care.description')}</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default Services;