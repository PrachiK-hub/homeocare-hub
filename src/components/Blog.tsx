import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight, BookOpen } from "lucide-react";

const Blog = () => {
  const { t } = useTranslation();

  const blogPosts = [
    {
      id: 1,
      title: {
        en: "Understanding Homeopathy: A Complete Guide",
        hi: "होम्योपैथी को समझना: एक पूर्ण गाइड",
        gu: "હોમિયોપેથીને સમજવી: એક સંપૂર્ણ માર્ગદર્શિકા"
      },
      excerpt: {
        en: "Learn about the principles of homeopathy, how it works, and why it's an effective alternative to conventional medicine.",
        hi: "होम्योपैथी के सिद्धांतों, इसके काम करने के तरीके और यह पारंपरिक चिकित्सा का प्रभावी विकल्प क्यों है, के बारे में जानें।",
        gu: "હોમિયોપેથીના સિદ્ધાંતો, તે કેવી રીતે કામ કરે છે અને તે પરંપરાગત દવાનો અસરકારક વિકલ્પ કેમ છે, તે વિશે જાણો."
      },
      date: "2024-12-01",
      readTime: "5 min read",
      category: "Education"
    },
    {
      id: 2,
      title: {
        en: "Natural Remedies for Common Cold and Flu",
        hi: "सर्दी और फ्लू के लिए प्राकृतिक उपचार",
        gu: "સામાન્ય સરદી અને ફ્લૂ માટે કુદરતી ઉપાયો"
      },
      excerpt: {
        en: "Discover effective homeopathic remedies for treating cold and flu symptoms naturally without side effects.",
        hi: "दुष्प्रभावों के बिना सर्दी और फ्लू के लक्षणों का प्राकृतिक रूप से इलाज करने के लिए प्रभावी होम्योपैथिक उपचार खोजें।",
        gu: "દુષ્પ્રભાવો વગર સરદી અને ફ્લૂના લક્ષણોની કુદરતી સારવાર માટે અસરકારક હોમિયોપેથિક ઉપાયો શોધો."
      },
      date: "2024-11-25",
      readTime: "4 min read",
      category: "Health Tips"
    },
    {
      id: 3,
      title: {
        en: "Managing Stress and Anxiety with Homeopathy",
        hi: "होम्योपैथी के साथ तनाव और चिंता का प्रबंधन",
        gu: "હોમિયોપેથી સાથે તણાવ અને ચિંતાનું સંચાલન"
      },
      excerpt: {
        en: "Explore how homeopathic remedies can help manage stress, anxiety, and improve mental well-being naturally.",
        hi: "जानें कि होम्योपैथिक उपचार कैसे तनाव, चिंता को प्रबंधित करने और मानसिक कल्याण को प्राकृतिक रूप से बेहतर बनाने में मदद कर सकते हैं।",
        gu: "જાણો કે હોમિયોપેથિક ઉપાયો કેવી રીતે તણાવ, ચિંતાને સંચાલિત કરવામાં અને માનસિક સુખાકારીને કુદરતી રીતે સુધારવામાં મદદ કરી શકે છે."
      },
      date: "2024-11-18",
      readTime: "6 min read",
      category: "Mental Health"
    },
    {
      id: 4,
      title: {
        en: "Child Health: Homeopathic Approach to Common Childhood Ailments",
        hi: "बाल स्वास्थ्य: बचपन की सामान्य बीमारियों के लिए होम्योपैथिक दृष्टिकोण",
        gu: "બાળ આરોગ્ય: બાળપણની સામાન્ય બીમારીઓ માટે હોમિયોપેથિક અભિગમ"
      },
      excerpt: {
        en: "Learn about safe and effective homeopathic treatments for common childhood illnesses and how to boost your child's immunity.",
        hi: "बचपन की सामान्य बीमारियों के लिए सुरक्षित और प्रभावी होम्योपैथिक उपचार और अपने बच्चे की प्रतिरक्षा को कैसे बढ़ाएं, के बारे में जानें।",
        gu: "બાળપણની સામાન્ય બીમારીઓ માટે સલામત અને અસરકારક હોમિયોપેથિક સારવાર અને તમારા બાળકની રોગપ્રતિકારક શક્તિને કેવી રીતે વધારવી, તે વિશે જાણો."
      },
      date: "2024-11-10",
      readTime: "7 min read",
      category: "Child Health"
    },
    {
      id: 5,
      title: {
        en: "Digestive Health: Natural Solutions for Common Digestive Issues",
        hi: "पाचन स्वास्थ्य: पाचन संबंधी सामान्य समस्याओं के लिए प्राकृतिक समाधान",
        gu: "પાચન આરોગ્ય: પાચન સંબંધિત સામાન્ય સમસ્યાઓ માટે કુદરતી ઉકેલો"
      },
      excerpt: {
        en: "Discover homeopathic remedies for digestive problems like acidity, bloating, and irritable bowel syndrome.",
        hi: "अम्लता, सूजन और चिड़चिड़ा आंत्र सिंड्रोम जैसी पाचन समस्याओं के लिए होम्योपैथिक उपचार खोजें।",
        gu: "એસિડિટી, સોજો અને ચીડચીડા આંતરડાના સિન્ડ્રોમ જેવી પાચન સમસ્યાઓ માટે હોમિયોપેથિક ઉપાયો શોધો."
      },
      date: "2024-11-05",
      readTime: "5 min read",
      category: "Digestive Health"
    },
    {
      id: 6,
      title: {
        en: "Skin Health: Homeopathic Treatments for Common Skin Conditions",
        hi: "त्वचा स्वास्थ्य: सामान्य त्वचा की स्थितियों के लिए होम्योपैथिक उपचार",
        gu: "ત્વચા આરોગ્ય: સામાન્ય ત્વચા સ્થિતિઓ માટે હોમિયોપેથિક સારવાર"
      },
      excerpt: {
        en: "Explore natural homeopathic solutions for acne, eczema, psoriasis, and other common skin conditions.",
        hi: "मुंहासे, एक्जिमा, सोरायसिस और अन्य सामान्य त्वचा की स्थितियों के लिए प्राकृतिक होम्योपैथिक समाधान खोजें।",
        gu: "ખીલ, એક્ઝિમા, સોરાયસિસ અને અન્ય સામાન્ય ત્વચા સ્થિતિઓ માટે કુદરતી હોમિયોપેથિક ઉકેલો શોધો."
      },
      date: "2024-10-28",
      readTime: "6 min read",
      category: "Skin Health"
    }
  ];

  const currentLang = t('common.language') || 'en';

  // Helper functions to get localized content
  const getLocalizedTitle = (post: typeof blogPosts[0]) => {
    return post.title[currentLang as keyof typeof post.title] || post.title.en;
  };

  const getLocalizedExcerpt = (post: typeof blogPosts[0]) => {
    return post.excerpt[currentLang as keyof typeof post.excerpt] || post.excerpt.en;
  };

  return (
    <section id="blog" className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-professional mb-4">
            Health Tips & Blog
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Expert insights and natural health solutions from Dr. Jay Bhatt
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="shadow-soft border-0 hover:shadow-lg transition-all duration-300 group">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-healing bg-healing/10 px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 mr-1" />
                    {post.readTime}
                  </div>
                </div>
                <CardTitle className="text-xl font-semibold text-professional group-hover:text-healing transition-colors">
                  {getLocalizedTitle(post)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {getLocalizedExcerpt(post)}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(post.date).toLocaleDateString()}
                  </div>
                  <Button variant="ghost" size="sm" className="group-hover:text-healing">
                    Read More
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="group">
            <BookOpen className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
            View All Articles
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Blog;
