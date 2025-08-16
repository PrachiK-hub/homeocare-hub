import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  GraduationCap, 
  Award, 
  Users, 
  Calendar,
  Star,
  BookOpen,
  Heart
} from "lucide-react";

const About = () => {
  const qualifications = [
    "BHMS - Bachelor of Homeopathic Medicine & Surgery",
    "MD (Homeopathy) - Post Graduate Degree",
    "Certified in Advanced Homeopathic Therapeutics",
    "Member of Central Council of Homeopathy (CCH)"
  ];

  const achievements = [
    { year: "2023", title: "Excellence in Homeopathic Treatment", organization: "Indian Medical Association" },
    { year: "2022", title: "Best Homeopath Award", organization: "Gujarat Medical Council" },
    { year: "2021", title: "Community Service Recognition", organization: "Health Ministry" },
  ];

  const experience = [
    { years: "2010-2015", role: "Junior Consultant", place: "City Homeopathic Hospital" },
    { years: "2015-2020", role: "Senior Consultant", place: "Wellness Homeopathy Clinic" },
    { years: "2020-Present", role: "Chief Consultant", place: "Private Practice & Online Consultations" },
  ];

  return (
    <section id="about" className="py-16 lg:py-24 gradient-calm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-professional mb-4">
            About <span className="text-healing">Dr. Rajesh Wellness</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Dedicated to providing safe, effective, and natural healing through the science of homeopathy. 
            Bringing modern approach to traditional healing with patient-centered care.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left Column - Personal Story & Philosophy */}
          <div>
            <Card className="shadow-soft border-0 mb-8">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Heart className="w-8 h-8 text-healing mr-3" />
                  <h3 className="text-2xl font-semibold text-professional">My Journey</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  My passion for homeopathy began during my medical studies when I witnessed the gentle yet 
                  powerful healing effects of natural remedies. After completing my BHMS and MD in Homeopathy, 
                  I dedicated my career to helping patients find relief from chronic conditions without side effects.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Over the past 15 years, I have treated thousands of patients with conditions ranging from 
                  acute infections to chronic diseases, always focusing on treating the person as a whole, 
                  not just the symptoms.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-soft border-0">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <BookOpen className="w-8 h-8 text-trust mr-3" />
                  <h3 className="text-2xl font-semibold text-professional">Treatment Philosophy</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-healing rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p className="text-muted-foreground">Individualized treatment based on unique symptoms and constitution</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-healing rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p className="text-muted-foreground">Focus on root cause healing rather than symptom suppression</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-healing rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p className="text-muted-foreground">Safe, natural remedies with no adverse side effects</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-healing rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p className="text-muted-foreground">Patient education and lifestyle guidance for holistic wellness</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Qualifications & Experience */}
          <div>
            {/* Qualifications */}
            <Card className="shadow-soft border-0 mb-8">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <GraduationCap className="w-8 h-8 text-trust mr-3" />
                  <h3 className="text-2xl font-semibold text-professional">Education & Qualifications</h3>
                </div>
                <div className="space-y-3">
                  {qualifications.map((qual, index) => (
                    <div key={index} className="flex items-center">
                      <Badge variant="secondary" className="mr-3">✓</Badge>
                      <p className="text-muted-foreground">{qual}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Experience Timeline */}
            <Card className="shadow-soft border-0 mb-8">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Calendar className="w-8 h-8 text-healing mr-3" />
                  <h3 className="text-2xl font-semibold text-professional">Professional Experience</h3>
                </div>
                <div className="space-y-4">
                  {experience.map((exp, index) => (
                    <div key={index} className="border-l-2 border-primary-light pl-4">
                      <div className="text-sm font-medium text-healing">{exp.years}</div>
                      <div className="text-lg font-semibold text-professional">{exp.role}</div>
                      <div className="text-muted-foreground">{exp.place}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Awards */}
            <Card className="shadow-soft border-0">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Award className="w-8 h-8 text-accent mr-3" />
                  <h3 className="text-2xl font-semibold text-professional">Recognition & Awards</h3>
                </div>
                <div className="space-y-4">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="flex items-start">
                      <Star className="w-5 h-5 text-accent mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-professional">{achievement.title}</div>
                        <div className="text-sm text-muted-foreground">{achievement.organization} • {achievement.year}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Stats Section */}
        <Card className="shadow-soft border-0 bg-gradient-trust text-secondary-foreground">
          <CardContent className="p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">15+</div>
                <div className="text-sm opacity-90">Years Practice</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">5000+</div>
                <div className="text-sm opacity-90">Patients Treated</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">98%</div>
                <div className="text-sm opacity-90">Success Rate</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">24/7</div>
                <div className="text-sm opacity-90">Emergency Support</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default About;