import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Phone, Video, MessageCircle, Calendar } from "lucide-react";
import doctorProfile from "@/assets/doctor-profile.jpg";

const Hero = () => {
  return (
    <section id="home" className="gradient-calm py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-professional mb-6 leading-tight">
              Heal Naturally with{" "}
              <span className="text-healing">Homeopathy</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              Experience safe, effective, and personalized homeopathic treatment. 
              Dr. Wellness brings 15+ years of expertise in treating chronic conditions naturally.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Button variant="appointment" size="xl">
                <Calendar className="w-5 h-5 mr-2" />
                Book Appointment
              </Button>
              <Button variant="trust" size="xl">
                <Video className="w-5 h-5 mr-2" />
                Online Consultation
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0">
              <div className="text-center">
                <div className="text-2xl font-bold text-healing">15+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-trust">5000+</div>
                <div className="text-sm text-muted-foreground">Patients Treated</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-healing">98%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
            </div>
          </div>

          {/* Right Content - Doctor Image & Contact Cards */}
          <div className="flex flex-col items-center">
            <div className="relative mb-8">
              <img
                src={doctorProfile}
                alt="Dr. Wellness - Homeopathy Specialist"
                className="w-80 h-80 object-cover rounded-full shadow-healing border-4 border-primary-light"
              />
              <div className="absolute -bottom-4 -right-4 bg-healing text-primary-foreground rounded-full p-3 shadow-lg">
                <Phone className="w-6 h-6" />
              </div>
            </div>

            {/* Doctor Info Card */}
            <Card className="p-6 max-w-sm w-full shadow-soft">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-professional mb-2">
                  Dr. Rajesh Wellness
                </h3>
                <p className="text-healing font-medium mb-2">
                  Homeopathy Specialist
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  BHMS, MD (Hom), 15+ Years Experience
                </p>
                
                {/* Quick Contact Options */}
                <div className="grid grid-cols-3 gap-2">
                  <Button variant="calm" size="sm">
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button variant="calm" size="sm">
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                  <Button variant="calm" size="sm">
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