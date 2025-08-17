import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

const SEO = ({ 
  title, 
  description, 
  keywords, 
  image = '/doctor-profile.jpeg',
  url = 'https://drjaybhatt.com',
  type = 'website'
}: SEOProps) => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  // Default SEO data based on language
  const defaultSEO = {
    en: {
      title: "Dr. Jay Bhatt - Expert Homeopathy Treatment Online & Offline | Healing with Homeopathy, Naturally.",
      description: "Dr. Jay Bhatt, BHMS, MD (Medicine) - Expert homeopathic doctor with 3+ years experience. AIR 35, Rank 1 in Gujarat. Online & clinic consultations available. Book appointment today.",
      keywords: "Dr. Jay Bhatt, homeopathy, homeopathic doctor, BHMS, MD Medicine, NIH Delhi, AIR 35, Gujarat rank 1, online consultation, clinic visit, natural treatment, holistic medicine"
    },
    hi: {
      title: "डॉ. जय भट्ट - विशेषज्ञ होम्योपैथिक उपचार ऑनलाइन और ऑफलाइन | होम्योपैथी से प्राकृतिक उपचार",
      description: "डॉ. जय भट्ट, बीएचएमएस, एमडी (मेडिसिन) - 3+ वर्षों के अनुभव के साथ विशेषज्ञ होम्योपैथिक डॉक्टर। एआईआर 35, गुजरात में रैंक 1। ऑनलाइन और क्लिनिक परामर्श उपलब्ध। आज ही अपॉइंटमेंट बुक करें।",
      keywords: "डॉ. जय भट्ट, होम्योपैथी, होम्योपैथिक डॉक्टर, बीएचएमएस, एमडी मेडिसिन, एनआईएच दिल्ली, एआईआर 35, गुजरात रैंक 1, ऑनलाइन परामर्श, क्लिनिक विजिट, प्राकृतिक उपचार"
    },
    gu: {
      title: "ડૉ. જય ભટ્ટ - વિશેષજ્ઞ હોમિયોપેથિક સારવાર ઓનલાઇન અને ઓફલાઇન | હોમિયોપેથી સાથે કુદરતી સારવાર",
      description: "ડૉ. જય ભટ્ટ, બી.એચ.એમ.એસ., એમ.ડી. (મેડિસિન) - 3+ વર્ષના અનુભવ સાથે વિશેષજ્ઞ હોમિયોપેથિક ડૉક્ટર. એઆઈઆર 35, ગુજરાતમાં રેન્ક 1. ઓનલાઇન અને ક્લિનિક સલાહ ઉપલબ્ધ. આજે જ એપોઇન્ટમેન્ટ બુક કરો.",
      keywords: "ડૉ. જય ભટ્ટ, હોમિયોપેથી, હોમિયોપેથિક ડૉક્ટર, બી.એચ.એમ.એસ., એમ.ડી. મેડિસિન, એનઆઈએચ દિલ્હી, એઆઈઆર 35, ગુજરાત રેન્ક 1, ઓનલાઇન સલાહ, ક્લિનિક મુલાકાત, કુદરતી સારવાર"
    }
  };

  const seoData = defaultSEO[currentLang as keyof typeof defaultSEO] || defaultSEO.en;

  const finalTitle = title || seoData.title;
  const finalDescription = description || seoData.description;
  const finalKeywords = keywords || seoData.keywords;

  // Schema.org JSON-LD for Physician
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Physician",
    "name": "Dr. Jay Bhatt",
    "alternateName": ["Dr. Jay Bhatt", "डॉ. जय भट्ट", "ડૉ. જય ભટ્ટ"],
    "description": finalDescription,
    "url": url,
              "telephone": "+916353750262",
    "email": "dr.jaybhatt@homeocare.com",
    "image": {
      "@type": "ImageObject",
      "url": `${url}${image}`,
      "width": 400,
      "height": 400
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Health Street, Medical District",
      "addressLocality": "Ahmedabad",
      "addressRegion": "Gujarat",
      "postalCode": "380001",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 23.0225,
      "longitude": 72.5714
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Ahmedabad"
      },
      {
        "@type": "State",
        "name": "Gujarat"
      },
      {
        "@type": "Country",
        "name": "India"
      }
    ],
    "medicalSpecialty": "Homeopathy",
    "availableService": [
      {
        "@type": "MedicalService",
        "name": "Online Consultation",
        "description": "Video consultation from home"
      },
      {
        "@type": "MedicalService",
        "name": "Clinic Visit",
        "description": "In-person consultation at clinic"
      },
      {
        "@type": "MedicalService",
        "name": "Child Health Package",
        "description": "Comprehensive child health package"
      }
    ],
    "hasCredential": [
      "BHMS - V.H. Dave Homeopathy College, Anand, Gujarat",
      "MD (Medicine) - Currently Pursuing at NIH, Delhi",
      "AIR 35 - All India Rank in MD PG Exam",
      "Rank 1 in Gujarat - MD PG Exam"
    ],
    "award": [
      "AIR 35 (All India Rank) in MD PG Examination",
      "Rank 1 in Gujarat State MD PG Examination"
    ],
    "alumniOf": [
      {
        "@type": "CollegeOrUniversity",
        "name": "V.H. Dave Homeopathy College",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Anand",
          "addressRegion": "Gujarat",
          "addressCountry": "IN"
        }
      },
      {
        "@type": "CollegeOrUniversity",
        "name": "National Institute of Homeopathy",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Delhi",
          "addressCountry": "IN"
        }
      }
    ],
    "sameAs": [
              "https://wa.me/916353750262",
      "https://www.google.com/maps/place/dr-jay-bhatt-homeopathy"
    ],
    "openingHours": [
      "Mo-Fr 09:00-19:00",
      "Sa 09:00-17:00",
      "Su 10:00-14:00"
    ],
    "priceRange": "₹₹",
    "paymentAccepted": ["Cash", "Online Payment", "UPI"],
    "currenciesAccepted": "INR",
    "availableLanguage": ["English", "Hindi", "Gujarati"],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "127",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Priya M."
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "reviewBody": "Dr. Jay Bhatt's homeopathic treatment completely transformed my life. After suffering from chronic migraines for 5 years, I'm now migraine-free for 8 months."
      },
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Rajesh K."
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "reviewBody": "I had severe skin allergies that no allopathic medicine could cure. Dr. Bhatt's homeopathic treatment not only cured my allergies but also improved my overall immunity."
      }
    ]
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      <meta name="author" content="Dr. Jay Bhatt" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />

      {/* Language and Locale */}
      <html lang={currentLang} />
      <meta property="og:locale" content={currentLang === 'hi' ? 'hi_IN' : currentLang === 'gu' ? 'gu_IN' : 'en_US'} />

      {/* Open Graph Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={`${url}${image}`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Dr. Jay Bhatt - Homeopathy" />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={`${url}${image}`} />
      <meta name="twitter:site" content="@drjaybhatt" />
      <meta name="twitter:creator" content="@drjaybhatt" />

      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#3B82F6" />
      <meta name="msapplication-TileColor" content="#3B82F6" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Dr. Jay Bhatt" />

      {/* Schema.org JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>

      {/* Additional Schema for Medical Organization */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "MedicalOrganization",
          "name": "Dr. Jay Bhatt Homeopathy Clinic",
          "url": url,
          "logo": `${url}/logo.png`,
          "telephone": "+916353750262",
          "email": "dr.jaybhatt@homeocare.com",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Sanjivani Clinic",
            "addressLocality": "Junagadh",
            "addressRegion": "Gujarat",
            "postalCode": "380001",
            "addressCountry": "IN"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 23.0225,
            "longitude": 72.5714
          },
          "openingHours": [
            "Mo-Fr 09:00-19:00",
            "Sa 09:00-17:00",
            "Su 10:00-14:00"
          ],
          "priceRange": "₹₹",
          "paymentAccepted": ["Cash", "Online Payment", "UPI"],
          "currenciesAccepted": "INR",
          "availableLanguage": ["English", "Hindi", "Gujarati"],
          "medicalSpecialty": "Homeopathy",
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Homeopathic Services",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Online Consultation",
                  "description": "Video consultation from home"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Clinic Visit",
                  "description": "In-person consultation at clinic"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Child Health Package",
                  "description": "Comprehensive child health package"
                }
              }
            ]
          }
        })}
      </script>
    </Helmet>
  );
};

export default SEO;
