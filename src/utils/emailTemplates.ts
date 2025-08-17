// Multilingual Email Templates for EmailJS
// These templates use the same variables across all languages

export const emailTemplates = {
  // Doctor Booking Notification Templates
  doctor: {
    en: {
      subject: 'New Appointment Booking - Dr. Jay Bhatt',
      body: `
Dear Dr. Jay Bhatt,

A new appointment has been booked with the following details:

PATIENT INFORMATION:
Name: {{name}}
Age: {{age}}
Gender: {{gender}}
Email: {{email}}
Phone: {{phone}}
Address: {{address}}

APPOINTMENT DETAILS:
Service: {{service}}
Date: {{date}}
Time: {{time}}
Payment Method: {{paymentMethod}}

SYMPTOMS/CONCERNS:
{{symptoms}}

{{#if onlineJoinLink}}
ONLINE CONSULTATION:
Video Platform: {{videoPlatform}}
Meeting Link: {{onlineJoinLink}}
{{/if}}

{{#if clinicAddress}}
CLINIC VISIT:
Address: {{clinicAddress}}
{{/if}}

Please review the booking and prepare for the consultation.

Best regards,
Homeocare System
      `.trim()
    },
    hi: {
      subject: 'नया अपॉइंटमेंट बुकिंग - डॉ. जय भट्ट',
      body: `
प्रिय डॉ. जय भट्ट,

एक नया अपॉइंटमेंट निम्नलिखित विवरणों के साथ बुक किया गया है:

रोगी की जानकारी:
नाम: {{name}}
आयु: {{age}}
लिंग: {{gender}}
ईमेल: {{email}}
फोन: {{phone}}
पता: {{address}}

अपॉइंटमेंट विवरण:
सेवा: {{service}}
तारीख: {{date}}
समय: {{time}}
भुगतान विधि: {{paymentMethod}}

लक्षण/चिंताएँ:
{{symptoms}}

{{#if onlineJoinLink}}
ऑनलाइन परामर्श:
वीडियो प्लेटफॉर्म: {{videoPlatform}}
मीटिंग लिंक: {{onlineJoinLink}}
{{/if}}

{{#if clinicAddress}}
क्लिनिक विजिट:
पता: {{clinicAddress}}
{{/if}}

कृपया बुकिंग की समीक्षा करें और परामर्श के लिए तैयार हों।

सादर,
होमोकेयर सिस्टम
      `.trim()
    },
    gu: {
      subject: 'નવું એપોઇન્ટમેન્ટ બુકિંગ - ડૉ. જય ભટ્ટ',
      body: `
પ્રિય ડૉ. જય ભટ્ટ,

નીચેના વિગતો સાથે એક નવું એપોઇન્ટમેન્ટ બુક કરવામાં આવ્યું છે:

રોગીની માહિતી:
નામ: {{name}}
ઉંમર: {{age}}
લિંગ: {{gender}}
ઈમેલ: {{email}}
ફોન: {{phone}}
સરનામું: {{address}}

એપોઇન્ટમેન્ટ વિગતો:
સેવા: {{service}}
તારીખ: {{date}}
સમય: {{time}}
ચુકવણી રીત: {{paymentMethod}}

લક્ષણો/ચિંતા:
{{symptoms}}

{{#if onlineJoinLink}}
ઓનલાઇન સલાહ:
વિડિયો પ્લેટફોર્મ: {{videoPlatform}}
મીટિંગ લિંક: {{onlineJoinLink}}
{{/if}}

{{#if clinicAddress}}
ક્લિનિક મુલાકાત:
સરનામું: {{clinicAddress}}
{{/if}}

કૃપા કરી બુકિંગની સમીક્ષા કરો અને સલાહ માટે તૈયાર થાઓ.

આદર સાથે,
હોમોકેર સિસ્ટમ
      `.trim()
    }
  },

  // Patient Booking Confirmation Templates
  patient: {
    en: {
      subject: 'Appointment Confirmation - Dr. Jay Bhatt',
      body: `
Dear {{name}},

Your appointment with Dr. Jay Bhatt has been confirmed successfully.

APPOINTMENT DETAILS:
Service: {{service}}
Date: {{date}}
Time: {{time}}
Payment Method: {{paymentMethod}}

{{#if onlineJoinLink}}
ONLINE CONSULTATION:
Video Platform: {{videoPlatform}}
Meeting Link: {{onlineJoinLink}}

Please ensure you have:
- Stable internet connection
- Quiet, private space for consultation
- Any relevant medical reports ready
{{/if}}

{{#if clinicAddress}}
CLINIC VISIT:
Address: {{clinicAddress}}

Please arrive 10 minutes before your appointment time.
{{/if}}

PREPARATION:
- Please note down your symptoms in detail
- Bring any previous medical reports if available
- Have your questions ready

If you need to reschedule or cancel, please contact us at least 24 hours in advance.

        For emergencies, call: +91 63537 50262

We look forward to serving you.

Best regards,
Dr. Jay Bhatt
Homeopathy Clinic
      `.trim()
    },
    hi: {
      subject: 'अपॉइंटमेंट पुष्टि - डॉ. जय भट्ट',
      body: `
प्रिय {{name}},

आपका डॉ. जय भट्ट के साथ अपॉइंटमेंट सफलतापूर्वक पुष्टि हो गया है।

अपॉइंटमेंट विवरण:
सेवा: {{service}}
तारीख: {{date}}
समय: {{time}}
भुगतान विधि: {{paymentMethod}}

{{#if onlineJoinLink}}
ऑनलाइन परामर्श:
वीडियो प्लेटफॉर्म: {{videoPlatform}}
मीटिंग लिंक: {{onlineJoinLink}}

कृपया सुनिश्चित करें कि आपके पास है:
- स्थिर इंटरनेट कनेक्शन
- परामर्श के लिए शांत, निजी स्थान
- कोई भी प्रासंगिक चिकित्सा रिपोर्ट तैयार
{{/if}}

{{#if clinicAddress}}
क्लिनिक विजिट:
पता: {{clinicAddress}}

कृपया अपने अपॉइंटमेंट समय से 10 मिनट पहले पहुंचें।
{{/if}}

तैयारी:
- कृपया अपने लक्षणों को विस्तार से नोट करें
- यदि उपलब्ध हो तो कोई भी पिछली चिकित्सा रिपोर्ट लाएं
- अपने प्रश्न तैयार रखें

यदि आपको पुनर्निर्धारण या रद्द करने की आवश्यकता है, तो कृपया कम से कम 24 घंटे पहले हमसे संपर्क करें।

        आपातकाल के लिए कॉल करें: +91 63537 50262

हम आपकी सेवा के लिए तत्पर हैं।

सादर,
डॉ. जय भट्ट
होम्योपैथी क्लिनिक
      `.trim()
    },
    gu: {
      subject: 'એપોઇન્ટમેન્ટ પુષ્ટિ - ડૉ. જય ભટ્ટ',
      body: `
પ્રિય {{name}},

તમારું ડૉ. જય ભટ્ટ સાથેનું એપોઇન્ટમેન્ટ સફળતાપૂર્વક પુષ્ટિ થયું છે.

એપોઇન્ટમેન્ટ વિગતો:
સેવા: {{service}}
તારીખ: {{date}}
સમય: {{time}}
ચુકવણી રીત: {{paymentMethod}}

{{#if onlineJoinLink}}
ઓનલાઇન સલાહ:
વિડિયો પ્લેટફોર્મ: {{videoPlatform}}
મીટિંગ લિંક: {{onlineJoinLink}}

કૃપા કરી સુનિશ્ચિત કરો કે તમારી પાસે છે:
- સ્થિર ઇન્ટરનેક્શન
- સલાહ માટે શાંત, ખાનગી જગ્યા
- કોઈપણ સંબંધિત તબીબી રિપોર્ટ તૈયાર
{{/if}}

{{#if clinicAddress}}
ક્લિનિક મુલાકાત:
સરનામું: {{clinicAddress}}

કૃપા કરી તમારા એપોઇન્ટમેન્ટ સમયથી 10 મિનિટ પહેલા પહોંચો.
{{/if}}

તૈયારી:
- કૃપા કરી તમારા લક્ષણોને વિગતવાર નોંધ કરો
- જો ઉપલબ્ધ હોય તો કોઈપણ પહેલાની તબીબી રિપોર્ટ લાવો
- તમારા પ્રશ્નો તૈયાર રાખો

જો તમારે પુનઃનિર્ધારણ અથવા રદ કરવાની જરૂર હોય, તો કૃપા કરી ઓછામાં ઓછા 24 કલાક પહેલા અમારો સંપર્ક કરો.

        તાત્કાલિક મદદ માટે કૉલ કરો: +91 63537 50262

અમે તમારી સેવા માટે તત્પર છીએ.

આદર સાથે,
ડૉ. જય ભટ્ટ
હોમિયોપેથી ક્લિનિક
      `.trim()
    }
  },

  // Contact Form Templates
  contact: {
    en: {
      subject: 'New Contact Form Submission - Dr. Jay Bhatt',
      body: `
Dear Dr. Jay Bhatt,

A new contact form has been submitted with the following details:

CONTACT INFORMATION:
Name: {{name}}
Email: {{email}}
Phone: {{phone}}
Subject: {{subject}}

MESSAGE:
{{message}}

Please respond to this inquiry at your earliest convenience.

Best regards,
Homeocare System
      `.trim()
    },
    hi: {
      subject: 'नया संपर्क फॉर्म प्रस्तुत - डॉ. जय भट्ट',
      body: `
प्रिय डॉ. जय भट्ट,

निम्नलिखित विवरणों के साथ एक नया संपर्क फॉर्म प्रस्तुत किया गया है:

संपर्क जानकारी:
नाम: {{name}}
ईमेल: {{email}}
फोन: {{phone}}
विषय: {{subject}}

संदेश:
{{message}}

कृपया इस पूछताछ का जवाब अपनी सुविधा के अनुसार दें।

सादर,
होमोकेयर सिस्टम
      `.trim()
    },
    gu: {
      subject: 'નવું સંપર્ક ફોર્મ સબમિશન - ડૉ. જય ભટ્ટ',
      body: `
પ્રિય ડૉ. જય ભટ્ટ,

નીચેના વિગતો સાથે એક નવું સંપર્ક ફોર્મ સબમિટ કરવામાં આવ્યું છે:

સંપર્ક માહિતી:
નામ: {{name}}
ઈમેલ: {{email}}
ફોન: {{phone}}
વિષય: {{subject}}

સંદેશ:
{{message}}

કૃપા કરી તમારી સુવિધા મુજબ આ પૂછપરછનો જવાબ આપો.

આદર સાથે,
હોમોકેર સિસ્ટમ
      `.trim()
    }
  }
};

// Helper function to get template based on language and type
export const getEmailTemplate = (type: 'doctor' | 'patient' | 'contact', language: string) => {
  const templates = emailTemplates[type];
  return templates[language as keyof typeof templates] || templates.en;
};

// Template variables mapping
export const templateVariables = {
  // Booking variables
  service: '{{service}}',
  date: '{{date}}',
  time: '{{time}}',
  name: '{{name}}',
  age: '{{age}}',
  gender: '{{gender}}',
  email: '{{email}}',
  phone: '{{phone}}',
  address: '{{address}}',
  symptoms: '{{symptoms}}',
  paymentMethod: '{{paymentMethod}}',
  videoPlatform: '{{videoPlatform}}',
  onlineJoinLink: '{{onlineJoinLink}}',
  clinicAddress: '{{clinicAddress}}',
  
  // Contact form variables
  subject: '{{subject}}',
  message: '{{message}}'
};
