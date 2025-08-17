import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

const Testimonials = () => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Priya M.",
      condition: "Chronic Migraine",
      quote: {
        en: "Dr. Jay Bhatt's homeopathic treatment completely transformed my life. After suffering from chronic migraines for 5 years, I'm now migraine-free for 8 months. His approach is truly holistic and effective.",
        hi: "डॉ. जय भट्ट का होम्योपैथिक उपचार ने मेरी जिंदगी को पूरी तरह बदल दिया। 5 साल तक क्रोनिक माइग्रेन से पीड़ित होने के बाद, अब मैं 8 महीने से माइग्रेन-फ्री हूं। उनका दृष्टिकोण वास्तव में समग्र और प्रभावी है।",
        gu: "ડૉ. જય ભટ્ટની હોમિયોપેથિક સારવારે મારી જિંદગીને સંપૂર્ણપણે બદલી નાખી. 5 વર્ષ સુધી ક્રોનિક માઇગ્રેનથી પીડાતા રહ્યા પછી, હવે હું 8 મહિના માઇગ્રેન-ફ્રી છું. તેમનો અભિગમ ખરેખર સમગ્ર અને અસરકારક છે."
      },
      rating: 5,
      date: "2024-11-15"
    },
    {
      id: 2,
      name: "Rajesh K.",
      condition: "Skin Allergy",
      quote: {
        en: "I had severe skin allergies that no allopathic medicine could cure. Dr. Bhatt's homeopathic treatment not only cured my allergies but also improved my overall immunity. Highly recommended!",
        hi: "मुझे गंभीर त्वचा एलर्जी थी जिसे कोई एलोपैथिक दवा ठीक नहीं कर सकती थी। डॉ. भट्ट का होम्योपैथिक उपचार न केवल मेरी एलर्जी को ठीक किया बल्कि मेरी समग्र प्रतिरक्षा को भी बेहतर बनाया। अत्यधिक अनुशंसित!",
        gu: "મારે ગંભીર ત્વચા એલર્જી હતી જે કોઈ એલોપેથિક દવાથી ઠીક થઈ શકતી નહોતી. ડૉ. ભટ્ટની હોમિયોપેથિક સારવારે મારી એલર્જીને માત્ર ઠીક જ નહીં કરી, પણ મારી સમગ્ર રોગપ્રતિકારક શક્તિને પણ સુધારી. ખૂબ જ ભલામણ!",
      },
      rating: 5,
      date: "2024-11-10"
    },
    {
      id: 3,
      name: "Anita S.",
      condition: "Anxiety & Depression",
      quote: {
        en: "Dr. Jay Bhatt's gentle approach to treating my anxiety and depression was remarkable. The homeopathic remedies worked wonders, and I feel like a completely different person now. Thank you, Doctor!",
        hi: "डॉ. जय भट्ट का चिंता और अवसाद के इलाज के लिए कोमल दृष्टिकोण उल्लेखनीय था। होम्योपैथिक उपचार ने चमत्कार किया, और अब मैं पूरी तरह से अलग व्यक्ति की तरह महसूस करती हूं। धन्यवाद, डॉक्टर!",
        gu: "ડૉ. જય ભટ્ટનો મારી ચિંતા અને હતાશાના સારવાર માટેનો નરમ અભિગમ નોંધપાત્ર હતો. હોમિયોપેથિક ઉપાયોએ અજાયબી કરી, અને હવે હું સંપૂર્ણપણે અલગ વ્યક્તિ જેવી અનુભવું છું. આભાર, ડૉક્ટર!",
      },
      rating: 5,
      date: "2024-11-05"
    },
    {
      id: 4,
      name: "Vikram P.",
      condition: "Digestive Issues",
      quote: {
        en: "After struggling with digestive issues for years, Dr. Bhatt's homeopathic treatment provided lasting relief. His understanding of the root cause and personalized approach made all the difference.",
        hi: "वर्षों तक पाचन संबंधी समस्याओं से जूझने के बाद, डॉ. भट्ट का होम्योपैथिक उपचार स्थायी राहत प्रदान किया। मूल कारण की उनकी समझ और व्यक्तिगत दृष्टिकोण ने सभी फर्क पैदा किया।",
        gu: "વર્ષોથી પાચન સંબંધિત સમસ્યાઓથી સંઘર્ષ કર્યા પછી, ડૉ. ભટ્ટની હોમિયોપેથિક સારવારે સ્થાયી રાહત આપી. મૂળ કારણની તેમની સમજ અને વ્યક્તિગત અભિગમે બધો ફરક પાડ્યો.",
      },
      rating: 5,
      date: "2024-10-28"
    },
    {
      id: 5,
      name: "Meera R.",
      condition: "Child Health",
      quote: {
        en: "Dr. Bhatt treated my 8-year-old son's recurring infections with homeopathy. The results were amazing - no more antibiotics, and his immunity has improved significantly. We're so grateful!",
        hi: "डॉ. भट्ट ने मेरे 8 साल के बेटे के आवर्तक संक्रमण का होम्योपैथी से इलाज किया। परिणाम आश्चर्यजनक थे - अब कोई एंटीबायोटिक नहीं, और उनकी प्रतिरक्षा में काफी सुधार हुआ है। हम बहुत आभारी हैं!",
        gu: "ડૉ. ભટ્ટે મારા 8 વર્ષના દીકરાના આવર્તક ચેપની હોમિયોપેથી થી સારવાર કરી. પરિણામો આશ્ચર્યજનક હતા - હવે કોઈ એન્ટિબાયોટિક નહીં, અને તેની રોગપ્રતિકારક શક્તિમાં નોંધપાત્ર સુધારો થયો છે. અમે ખૂબ આભારી છીએ!",
      },
      rating: 5,
      date: "2024-10-20"
    },
    {
      id: 6,
      name: "Suresh D.",
      condition: "Joint Pain",
      quote: {
        en: "Dr. Jay Bhatt's homeopathic treatment for my chronic joint pain has been life-changing. I can now walk without pain and have resumed my daily activities. His expertise is truly remarkable.",
        hi: "डॉ. जय भट्ट का मेरे क्रोनिक जोड़ों के दर्द के लिए होम्योपैथिक उपचार जीवन बदलने वाला रहा है। अब मैं दर्द के बिना चल सकता हूं और अपनी दैनिक गतिविधियों को फिर से शुरू कर सकता हूं। उनकी विशेषज्ञता वास्तव में उल्लेखनीय है।",
        gu: "ડૉ. જય ભટ્ટની મારા ક્રોનિક જોડના દુખાવા માટેની હોમિયોપેથિક સારવાર જીવન બદલનારી રહી છે. હવે હું દુખાવા વગર ચાલી શકું છું અને મારી દૈનિક પ્રવૃત્તિઓ ફરીથી શરૂ કરી શકું છું. તેમની નિષ્ણાતતા ખરેખર નોંધપાત્ર છે.",
      },
      rating: 5,
      date: "2024-10-15"
    }
  ];

  const currentLang = t('common.language') || 'en';

  // Get the current testimonial quote in the selected language
  const getCurrentQuote = () => {
    const quote = testimonials[currentIndex].quote;
    return quote[currentLang as keyof typeof quote] || quote.en;
  };

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-advance testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="testimonials" className="py-16 lg:py-24 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-professional mb-4">
            Patient Testimonials
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real stories from patients who have experienced the healing power of homeopathy
          </p>
        </div>

        {/* Testimonials Slider */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="relative">
            {/* Navigation Buttons */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white"
              onClick={prevTestimonial}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white"
              onClick={nextTestimonial}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>

            {/* Testimonial Card */}
            <Card className="shadow-soft border-0 bg-white/90 backdrop-blur-sm">
              <CardContent className="p-8 md:p-12">
                <div className="text-center">
                  {/* Quote Icon */}
                  <Quote className="w-12 h-12 text-blue-600 mx-auto mb-6" />
                  
                  {/* Testimonial Text */}
                  <blockquote className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 italic">
                    "{getCurrentQuote()}"
                  </blockquote>
                  
                  {/* Patient Info */}
                  <div className="mb-6">
                    <h4 className="text-xl font-semibold text-professional mb-1">
                      {testimonials[currentIndex].name}
                    </h4>
                    {testimonials[currentIndex].condition && (
                      <p className="text-sm text-healing font-medium">
                        {testimonials[currentIndex].condition}
                      </p>
                    )}
                  </div>
                  
                  {/* Rating */}
                  <div className="flex justify-center items-center gap-1 mb-4">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  
                  {/* Date */}
                  <p className="text-sm text-muted-foreground">
                    {new Date(testimonials[currentIndex].date).toLocaleDateString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center items-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-blue-600 scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Google Reviews Embed */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-professional mb-4">
              Google Reviews
            </h3>
            <p className="text-muted-foreground">
              See what our patients say on Google
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-soft p-4">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.123456789!2d72.5714!3d23.0225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e84f5b5b5b5b5%3A0x1234567890abcdef!2sDr+Jay+Bhatt+Homeopathy+Clinic!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Reviews for Dr. Jay Bhatt"
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
