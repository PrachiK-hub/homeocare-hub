import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { getEmailTemplate } from '@/utils/emailTemplates';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Calendar, Clock, User, CreditCard, CheckCircle, ArrowLeft, ArrowRight, Upload, FileText, Download, Mail, MapPin, Video, MessageCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import emailjs from '@emailjs/browser';

interface BookingFormData {
  service: string;
  date: string;
  time: string;
  name: string;
  age: string;
  gender: string;
  email: string;
  phone: string;
  address: string;
  symptoms: string;
  paymentMethod: string;
  videoPlatform?: string;
  uploadedFile?: File;
}

const BookingPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<BookingFormData>>({});
  const [fieldErrors, setFieldErrors] = useState<{[key: string]: string}>({});
  
  const [bookingData, setBookingData] = useState<BookingFormData>({
    service: '',
    date: '',
    time: '',
    name: '',
    age: '',
    gender: '',
    email: '',
    phone: '',
    address: '',
    symptoms: '',
    paymentMethod: 'online',
    videoPlatform: 'google-meet'
  });

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('bookingDraft');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setBookingData(prev => ({ ...prev, ...parsedData }));
      } catch (error) {
        console.error('Error parsing saved booking data:', error);
      }
    }
  }, []);

  // Save data to localStorage whenever bookingData changes
  useEffect(() => {
    localStorage.setItem('bookingDraft', JSON.stringify(bookingData));
  }, [bookingData]);

  // Handle URL parameters for service selection
  useEffect(() => {
    const serviceParam = searchParams.get('service');
    if (serviceParam) {
      let serviceId = '';
      switch (serviceParam) {
        case 'online-consultation':
          serviceId = 'online';
          break;
        case 'clinic-visit':
          serviceId = 'clinic';
          break;
        default:
          serviceId = serviceParam;
      }
      setBookingData(prev => ({ ...prev, service: serviceId }));
    }
  }, [searchParams]);

  const services = [
    { 
      id: 'online', 
      name: t('common.onlineConsultation'), 
      price: '₹500',
      description: 'Video consultation from home'
    },
    { 
      id: 'clinic', 
      name: t('common.clinicVisit'), 
      price: '₹800',
      description: 'In-person consultation at clinic'
    },
    { 
      id: 'package', 
      name: t('common.childHealthPackage'), 
      price: '₹800',
      description: 'Comprehensive child health package'
    }
  ];

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
    '05:00 PM', '05:30 PM', '06:00 PM'
  ];

  // Payment configuration
  const paymentConfig = {
    stripe: 'https://buy.stripe.com/drjaybhatt_consultation',
    razorpay: 'https://rzp.io/l/drjaybhatt_consultation',
    paypal: 'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=DRJAYBHATT123',
  };

  // Video platforms for online consultation
  const videoPlatforms = [
    { id: 'google-meet', name: 'Google Meet', link: 'https://meet.google.com/abc-defg-hij' },
    { id: 'zoom', name: 'Zoom', link: 'https://zoom.us/j/123456789' },
    { id: 'whatsapp', name: 'WhatsApp Video', link: 'https://wa.me/916353750262' },
  ];

  // Clinic information
  const clinicInfo = {
    address: 'Sanjivani Clinic, Junagadh, Gujarat, India',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.123456789!2d72.123456789!3d23.123456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDA3JzM0LjQiTiA3MsKwMDcnMzQuNCJF!5e0!3m2!1sen!2sin!4v1234567890',
  };

  // EmailJS Configuration
  const emailConfig = {
    serviceId: 'service_drjaybhatt',
    doctorTemplateId: 'template_doctor_booking',
    patientTemplateId: 'template_patient_booking',
    publicKey: 'YOUR_EMAILJS_PUBLIC_KEY',
    doctorEmail: 'dr.jaybhatt@homeocare.com',
  };

  // Calendar utility functions
  const generateICS = (bookingData: BookingFormData, services: any[], videoPlatforms: any[]) => {
    const service = services.find(s => s.id === bookingData.service);
    const videoPlatform = videoPlatforms.find(p => p.id === bookingData.videoPlatform);
    
    // Parse date and time
    const [year, month, day] = bookingData.date.split('-').map(Number);
    const timeMatch = bookingData.time.match(/(\d+):(\d+)\s*(AM|PM)/);
    let hour = parseInt(timeMatch![1]);
    const minute = parseInt(timeMatch![2]);
    const period = timeMatch![3];
    
    if (period === 'PM' && hour !== 12) hour += 12;
    if (period === 'AM' && hour === 12) hour = 0;
    
    const startDate = new Date(year, month - 1, day, hour, minute);
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // 1 hour duration
    
    const formatDate = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };
    
    const description = bookingData.service === 'online' 
      ? `Online consultation with Dr. Jay Bhatt\n\nVideo Platform: ${videoPlatform?.name}\nMeeting Link: ${videoPlatform?.link}\n\nPatient: ${bookingData.name}\nPhone: ${bookingData.phone}\nEmail: ${bookingData.email}\n\nSymptoms: ${bookingData.symptoms}`
      : `In-person consultation with Dr. Jay Bhatt\n\nLocation: ${clinicInfo.address}\n\nPatient: ${bookingData.name}\nPhone: ${bookingData.phone}\nEmail: ${bookingData.email}\n\nSymptoms: ${bookingData.symptoms}`;
    
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Dr. Jay Bhatt//Homeopathy Consultation//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:REQUEST',
      'BEGIN:VEVENT',
      `UID:${Date.now()}@homeocare.com`,
      `DTSTAMP:${formatDate(new Date())}`,
      `DTSTART:${formatDate(startDate)}`,
      `DTEND:${formatDate(endDate)}`,
      `SUMMARY:Consultation with Dr. Jay Bhatt - ${service?.name}`,
      `DESCRIPTION:${description.replace(/\n/g, '\\n')}`,
      `LOCATION:${bookingData.service === 'online' ? videoPlatform?.name || 'Online' : clinicInfo.address}`,
      'STATUS:CONFIRMED',
      'SEQUENCE:0',
      'BEGIN:VALARM',
      'TRIGGER:-PT15M',
      'ACTION:DISPLAY',
      'DESCRIPTION:Reminder: Consultation with Dr. Jay Bhatt in 15 minutes',
      'END:VALARM',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');
    
    return icsContent;
  };

  const downloadICS = (bookingData: BookingFormData) => {
    const icsContent = generateICS(bookingData, services, videoPlatforms);
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `consultation-${bookingData.date}-${bookingData.time.replace(/[:\s]/g, '-')}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Calendar Invite Downloaded",
      description: "The appointment has been added to your calendar.",
    });
  };

  // Enhanced validation functions with accessibility
  const validateStep1 = () => {
    const newErrors: Partial<BookingFormData> = {};
    const newFieldErrors: {[key: string]: string} = {};
    
    if (!bookingData.service) {
      newErrors.service = 'Please select a service';
      newFieldErrors.service = 'Service selection is required';
    }
    if (!bookingData.date) {
      newErrors.date = 'Please select a date';
      newFieldErrors.date = 'Date selection is required';
    }
    if (!bookingData.time) {
      newErrors.time = 'Please select a time';
      newFieldErrors.time = 'Time selection is required';
    }
    
    setErrors(newErrors);
    setFieldErrors(newFieldErrors);
    
    // Announce errors to screen readers
    if (Object.keys(newFieldErrors).length > 0) {
      const errorMessage = Object.values(newFieldErrors).join('. ');
      const announcement = document.createElement('div');
      announcement.setAttribute('aria-live', 'polite');
      announcement.setAttribute('aria-atomic', 'true');
      announcement.className = 'sr-only';
      announcement.textContent = `Validation errors: ${errorMessage}`;
      document.body.appendChild(announcement);
      setTimeout(() => document.body.removeChild(announcement), 1000);
    }
    
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Partial<BookingFormData> = {};
    const newFieldErrors: {[key: string]: string} = {};
    
    if (!bookingData.name.trim()) {
      newErrors.name = 'Name is required';
      newFieldErrors.name = 'Full name is required';
    }
    if (!bookingData.age) {
      newErrors.age = 'Age is required';
      newFieldErrors.age = 'Age is required';
    }
    if (!bookingData.gender) {
      newErrors.gender = 'Gender is required';
      newFieldErrors.gender = 'Gender selection is required';
    }
    if (!bookingData.email) {
      newErrors.email = 'Email is required';
      newFieldErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(bookingData.email)) {
      newErrors.email = 'Please enter a valid email';
      newFieldErrors.email = 'Please enter a valid email address';
    }
    if (!bookingData.phone) {
      newErrors.phone = 'Phone number is required';
      newFieldErrors.phone = 'Phone number is required';
    } else if (!/^[0-9+\-\s()]{10,}$/.test(bookingData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
      newFieldErrors.phone = 'Please enter a valid phone number';
    }
    if (!bookingData.symptoms.trim()) {
      newErrors.symptoms = 'Symptoms/concerns are required';
      newFieldErrors.symptoms = 'Symptoms or concerns are required';
    } else if (bookingData.symptoms.length < 50) {
      newErrors.symptoms = 'Please provide more details (minimum 50 characters)';
      newFieldErrors.symptoms = 'Please provide more details about your symptoms (minimum 50 characters)';
    } else if (bookingData.symptoms.length > 1000) {
      newErrors.symptoms = 'Please keep within 1000 characters';
      newFieldErrors.symptoms = 'Please keep your description within 1000 characters';
    }
    
    setErrors(newErrors);
    setFieldErrors(newFieldErrors);
    
    // Announce errors to screen readers
    if (Object.keys(newFieldErrors).length > 0) {
      const errorMessage = Object.values(newFieldErrors).join('. ');
      const announcement = document.createElement('div');
      announcement.setAttribute('aria-live', 'polite');
      announcement.setAttribute('aria-atomic', 'true');
      announcement.className = 'sr-only';
      announcement.textContent = `Form validation errors: ${errorMessage}`;
      document.body.appendChild(announcement);
      setTimeout(() => document.body.removeChild(announcement), 1000);
    }
    
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors: Partial<BookingFormData> = {};
    const newFieldErrors: {[key: string]: string} = {};
    
    if (!bookingData.paymentMethod) {
      newErrors.paymentMethod = 'Please select a payment method';
      newFieldErrors.paymentMethod = 'Payment method selection is required';
    }
    
    setErrors(newErrors);
    setFieldErrors(newFieldErrors);
    
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    let isValid = false;
    switch (step) {
      case 1:
        isValid = validateStep1();
        break;
      case 2:
        isValid = validateStep2();
        break;
      case 3:
        isValid = validateStep3();
        break;
    }
    
    if (isValid) {
      setStep(step + 1);
      setErrors({});
    }
  };

  const handleBack = () => {
    setStep(step - 1);
    setErrors({});
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
      const maxSize = 5 * 1024 * 1024; // 5MB
      
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: "Please upload PDF, JPG, or PNG files only",
          variant: "destructive"
        });
        return;
      }
      
      if (file.size > maxSize) {
        toast({
          title: "File too large",
          description: "Please upload files smaller than 5MB",
          variant: "destructive"
        });
        return;
      }
      
      setBookingData(prev => ({ ...prev, uploadedFile: file }));
      toast({
        title: "File uploaded",
        description: `${file.name} uploaded successfully`,
      });
    }
  };

  const handlePayment = (paymentType: string) => {
    if (paymentType === 'person') {
      // Skip payment gateway for in-person payment
      handleSubmit();
      return;
    }

    // Open payment gateway in new tab
    let paymentUrl = '';
    switch (paymentType) {
      case 'stripe':
        paymentUrl = paymentConfig.stripe;
        break;
      case 'razorpay':
        paymentUrl = paymentConfig.razorpay;
        break;
      case 'paypal':
        paymentUrl = paymentConfig.paypal;
        break;
      default:
        paymentUrl = paymentConfig.stripe;
    }

    // Update payment method in booking data
    setBookingData(prev => ({ ...prev, paymentMethod: paymentType }));
    
    // Open payment gateway
    window.open(paymentUrl, '_blank');
    
    // Show success message
    toast({
      title: "Payment Gateway Opened",
      description: "Please complete payment in the new tab. You'll receive confirmation once payment is successful.",
    });
  };

  const sendEmailNotifications = async (bookingData: BookingFormData) => {
    try {
      const service = services.find(s => s.id === bookingData.service);
      const videoPlatform = videoPlatforms.find(p => p.id === bookingData.videoPlatform);
      const currentLang = t('common.language') || 'en';
      
      // Get language-specific email templates
      const doctorTemplate = getEmailTemplate('doctor', currentLang);
      const patientTemplate = getEmailTemplate('patient', currentLang);
      
      // Doctor email template parameters
      const doctorParams = {
        to_email: emailConfig.doctorEmail,
        to_name: 'Dr. Jay Bhatt',
        name: bookingData.name,
        age: bookingData.age,
        gender: bookingData.gender,
        email: bookingData.email,
        phone: bookingData.phone,
        address: bookingData.address || 'Not provided',
        service: service?.name || bookingData.service,
        date: bookingData.date,
        time: bookingData.time,
        symptoms: bookingData.symptoms,
        paymentMethod: bookingData.paymentMethod === 'person' ? 'Pay in Person' : 'Online Payment',
        videoPlatform: videoPlatform?.name || '',
        onlineJoinLink: videoPlatform?.link || '',
        clinicAddress: clinicInfo.address,
        booking_id: `BK${Date.now()}`,
        calendar_link: `data:text/calendar;charset=utf-8,${encodeURIComponent(generateICS(bookingData, services, videoPlatforms))}`,
      };

      // Patient email template parameters
      const patientParams = {
        to_email: bookingData.email,
        to_name: bookingData.name,
        name: bookingData.name,
        service: service?.name || bookingData.service,
        date: bookingData.date,
        time: bookingData.time,
        paymentMethod: bookingData.paymentMethod === 'person' ? 'Pay in Person' : 'Online Payment',
        videoPlatform: videoPlatform?.name || '',
        onlineJoinLink: videoPlatform?.link || '',
        clinicAddress: clinicInfo.address,
        booking_id: `BK${Date.now()}`,
      };

      // Send doctor email
      await emailjs.send(
        emailConfig.serviceId,
        emailConfig.doctorTemplateId,
        doctorParams,
        emailConfig.publicKey
      );

      // Send patient email
      await emailjs.send(
        emailConfig.serviceId,
        emailConfig.patientTemplateId,
        patientParams,
        emailConfig.publicKey
      );

      toast({
        title: "Emails Sent Successfully",
        description: "Confirmation emails have been sent to you and the doctor.",
      });

    } catch (error) {
      console.error('Email sending failed:', error);
      toast({
        title: "Email Notification Failed",
        description: "Booking confirmed but email notifications could not be sent.",
        variant: "destructive"
      });
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Send email notifications
      await sendEmailNotifications(bookingData);
      
      // Clear localStorage after successful submission
      localStorage.removeItem('bookingDraft');
      
      setStep(4); // Show confirmation
      setIsSubmitting(false);
      
      toast({
        title: t('common.bookingSuccessful'),
        description: t('common.confirmationSent'),
      });
    } catch (error) {
      setIsSubmitting(false);
      toast({
        title: "Booking Failed",
        description: "Please try again or contact support.",
        variant: "destructive"
      });
    }
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30); // 30 days from now
    return maxDate.toISOString().split('T')[0];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-16 pb-20">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t('common.bookAppointment')}
          </h1>
          <p className="text-gray-600">
            {t('booking.subtitle')}
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= stepNumber 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div className={`w-16 h-1 mx-2 ${
                    step > stepNumber ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <Card className="shadow-lg">
          <CardContent className="p-6">
            {/* Step 1: Service Selection */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="text-center">
                  <Calendar className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h2 className="text-2xl font-semibold mb-2">Choose Service & Schedule</h2>
                  <p className="text-gray-600">Select your preferred service and appointment time</p>
                </div>

                                 {/* Service Selection */}
                 <div className="space-y-4">
                   <Label className="text-base font-medium">Select Service</Label>
                   <div className="grid gap-3">
                  {services.map((service) => (
                    <Card 
                      key={service.id}
                         className={`cursor-pointer transition-all border-2 ${
                           bookingData.service === service.id 
                             ? 'border-blue-600 bg-blue-50' 
                             : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setBookingData({...bookingData, service: service.id})}
                    >
                      <CardContent className="p-4">
                           <div className="flex justify-between items-start">
                             <div>
                               <h3 className="font-semibold text-lg">{service.name}</h3>
                               <p className="text-gray-600 text-sm">{service.description}</p>
                             </div>
                             <div className="text-right">
                               <p className="text-2xl font-bold text-blue-600">{service.price}</p>
                             </div>
                           </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                   {errors.service && <p className="text-red-500 text-sm">{errors.service}</p>}
                 </div>

                 {/* Service-Specific Fields */}
                 {bookingData.service === 'online' && (
                   <div className="space-y-4">
                     <Label className="text-base font-medium">Video Platform</Label>
                     <RadioGroup 
                       value={bookingData.videoPlatform || 'google-meet'} 
                       onValueChange={(value) => setBookingData({...bookingData, videoPlatform: value})}
                     >
                       {videoPlatforms.map((platform) => (
                         <div key={platform.id} className="flex items-center space-x-2">
                           <RadioGroupItem value={platform.id} id={platform.id} />
                           <Label htmlFor={platform.id} className="cursor-pointer">
                             {platform.name}
                           </Label>
                         </div>
                       ))}
                     </RadioGroup>
                     <div className="bg-blue-50 p-3 rounded-lg">
                       <p className="text-sm text-blue-700">
                         <strong>Meeting Link:</strong> {videoPlatforms.find(p => p.id === bookingData.videoPlatform)?.link}
                       </p>
                     </div>
              </div>
            )}

                 {bookingData.service === 'clinic' && (
                   <div className="space-y-4">
                     <Label className="text-base font-medium">Clinic Information</Label>
                     <Card className="bg-gray-50">
                       <CardContent className="p-4">
                         <div className="space-y-3">
                           <div>
                             <h4 className="font-semibold text-gray-900">Clinic Address</h4>
                             <p className="text-gray-600">{clinicInfo.address}</p>
                           </div>
                  <div>
                             <h4 className="font-semibold text-gray-900 mb-2">Location</h4>
                             <div className="w-full h-48 rounded-lg overflow-hidden">
                               <iframe
                                 src={clinicInfo.mapUrl}
                                 width="100%"
                                 height="100%"
                                 style={{ border: 0 }}
                                 allowFullScreen
                                 loading="lazy"
                                 referrerPolicy="no-referrer-when-downgrade"
                                 title="Clinic Location"
                               />
                             </div>
                           </div>
                         </div>
                       </CardContent>
                     </Card>
                   </div>
                 )}

                {/* Date Selection */}
                <div className="space-y-2">
                  <Label className="text-base font-medium">Select Date</Label>
                    <Input 
                      type="date" 
                      value={bookingData.date}
                      onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                    min={getMinDate()}
                    max={getMaxDate()}
                    className="h-12"
                    />
                  {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
                  </div>

                {/* Time Selection */}
                <div className="space-y-2">
                  <Label className="text-base font-medium">Select Time</Label>
                    <Select value={bookingData.time} onValueChange={(value) => setBookingData({...bookingData, time: value})}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Choose appointment time" />
                      </SelectTrigger>
                      <SelectContent>
                      {timeSlots.map(slot => (
                            <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  {errors.time && <p className="text-red-500 text-sm">{errors.time}</p>}
                </div>

                  <Button 
                  onClick={handleNext}
                  className="w-full h-12 text-lg"
                  disabled={!bookingData.service || !bookingData.date || !bookingData.time}
                >
                  Next Step
                  <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
              </div>
            )}

            {/* Step 2: Patient Details */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="text-center">
                  <User className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h2 className="text-2xl font-semibold mb-2">Patient Information</h2>
                  <p className="text-gray-600">Please provide your details and health concerns</p>
                </div>

                <div className="grid gap-4">
                  {/* Name and Age */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-base font-medium">Full Name *</Label>
                    <Input 
                      value={bookingData.name}
                      onChange={(e) => setBookingData({...bookingData, name: e.target.value})}
                        placeholder="Enter your full name"
                        className="h-12"
                    />
                      {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                  </div>
                    <div className="space-y-2">
                      <Label className="text-base font-medium">Age *</Label>
                    <Input 
                      type="number"
                      value={bookingData.age}
                      onChange={(e) => setBookingData({...bookingData, age: e.target.value})}
                      placeholder="Age"
                        min="1"
                        max="120"
                        className="h-12"
                    />
                      {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
                    </div>
                  </div>

                  {/* Gender */}
                  <div className="space-y-2">
                    <Label className="text-base font-medium">Gender *</Label>
                    <RadioGroup 
                      value={bookingData.gender} 
                      onValueChange={(value) => setBookingData({...bookingData, gender: value})}
                      className="flex gap-6"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="male" id="male" />
                        <Label htmlFor="male">Male</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="female" id="female" />
                        <Label htmlFor="female">Female</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="other" id="other" />
                        <Label htmlFor="other">Other</Label>
                      </div>
                    </RadioGroup>
                    {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
                  </div>

                  {/* Email and Phone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-base font-medium">Email *</Label>
                      <Input 
                        type="email"
                        value={bookingData.email}
                        onChange={(e) => setBookingData({...bookingData, email: e.target.value})}
                        placeholder="your@email.com"
                        className="h-12"
                      />
                      {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label className="text-base font-medium">Phone *</Label>
                    <Input 
                      value={bookingData.phone}
                      onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
                      placeholder="+91 63537 50262"
                        className="h-12"
                    />
                      {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                    </div>
                  </div>

                  {/* Address */}
                  <div className="space-y-2">
                    <Label className="text-base font-medium">Address (Optional)</Label>
                    <Input 
                      value={bookingData.address}
                      onChange={(e) => setBookingData({...bookingData, address: e.target.value})}
                      placeholder="Your address"
                      className="h-12"
                    />
                  </div>

                  {/* Symptoms */}
                  <div className="space-y-2">
                    <Label className="text-base font-medium">
                      Symptoms/Health Concerns * 
                      <span className="text-sm text-gray-500 ml-2">
                        ({bookingData.symptoms.length}/1000 characters)
                      </span>
                    </Label>
                    <Textarea 
                      value={bookingData.symptoms}
                      onChange={(e) => setBookingData({...bookingData, symptoms: e.target.value})}
                      placeholder="Please describe your symptoms, health concerns, or reason for consultation in detail..."
                      className="min-h-32 resize-none"
                      maxLength={1000}
                    />
                    {errors.symptoms && <p className="text-red-500 text-sm">{errors.symptoms}</p>}
                  </div>

                  {/* File Upload */}
                  <div className="space-y-2">
                    <Label className="text-base font-medium">Upload Documents (Optional)</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                      />
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">
                          Click to upload PDF, JPG, or PNG files (max 5MB)
                        </p>
                        {bookingData.uploadedFile && (
                          <p className="text-sm text-blue-600 mt-2">
                            ✓ {bookingData.uploadedFile.name}
                          </p>
                        )}
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button variant="outline" onClick={handleBack} className="flex-1 h-12">
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back
                  </Button>
                  <Button onClick={handleNext} className="flex-1 h-12">
                    Next Step
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Payment Method */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="text-center">
                  <CreditCard className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h2 className="text-2xl font-semibold mb-2">Payment Method</h2>
                  <p className="text-gray-600">Choose how you'd like to pay for your consultation</p>
                </div>

                                 {/* Payment Options */}
                 <div className="space-y-4">
                <RadioGroup 
                  value={bookingData.paymentMethod} 
                  onValueChange={(value) => setBookingData({...bookingData, paymentMethod: value})}
                >
                     <Card className={`cursor-pointer transition-all border-2 ${
                       bookingData.paymentMethod === 'online' 
                         ? 'border-blue-600 bg-blue-50' 
                         : 'border-gray-200'
                     }`}>
                       <CardContent className="p-4">
                         <div className="flex items-center space-x-3">
                    <RadioGroupItem value="online" id="online" />
                           <div className="flex-1">
                             <Label htmlFor="online" className="text-lg font-medium cursor-pointer">
                               {t('common.payOnline')}
                             </Label>
                             <p className="text-gray-600 text-sm">Pay securely online with card or UPI</p>
                           </div>
                  </div>
                       </CardContent>
                     </Card>

                     <Card className={`cursor-pointer transition-all border-2 ${
                       bookingData.paymentMethod === 'person' 
                         ? 'border-blue-600 bg-blue-50' 
                         : 'border-gray-200'
                     }`}>
                       <CardContent className="p-4">
                         <div className="flex items-center space-x-3">
                    <RadioGroupItem value="person" id="person" />
                           <div className="flex-1">
                             <Label htmlFor="person" className="text-lg font-medium cursor-pointer">
                               {t('common.payInPerson')}
                             </Label>
                             <p className="text-gray-600 text-sm">Pay at the clinic during your visit</p>
                           </div>
                  </div>
                       </CardContent>
                     </Card>
                </RadioGroup>
                   {errors.paymentMethod && <p className="text-red-500 text-sm">{errors.paymentMethod}</p>}
                </div>

                 {/* Online Payment Gateways */}
                 {bookingData.paymentMethod === 'online' && (
                   <div className="space-y-4">
                     <Label className="text-base font-medium">Choose Payment Gateway</Label>
                     <div className="grid gap-3">
                       <Button 
                         onClick={() => handlePayment('stripe')}
                         variant="outline"
                         className="h-12 justify-start"
                       >
                         <CreditCard className="w-5 h-5 mr-3" />
                         Pay with Stripe (Card/UPI)
                       </Button>
                       <Button 
                         onClick={() => handlePayment('razorpay')}
                         variant="outline"
                         className="h-12 justify-start"
                       >
                         <CreditCard className="w-5 h-5 mr-3" />
                         Pay with Razorpay (Card/UPI/Net Banking)
                       </Button>
                       <Button 
                         onClick={() => handlePayment('paypal')}
                         variant="outline"
                         className="h-12 justify-start"
                       >
                         <CreditCard className="w-5 h-5 mr-3" />
                         Pay with PayPal
                       </Button>
                     </div>
                   </div>
                 )}

                                 {/* Booking Summary */}
                 <Card className="bg-gray-50">
                   <CardContent className="p-4">
                     <h3 className="font-semibold mb-3">Booking Summary</h3>
                     <div className="space-y-2 text-sm">
                       <div className="flex justify-between">
                         <span>Service:</span>
                         <span className="font-medium">
                           {services.find(s => s.id === bookingData.service)?.name}
                         </span>
                       </div>
                       <div className="flex justify-between">
                         <span>Date & Time:</span>
                         <span className="font-medium">
                           {bookingData.date} at {bookingData.time}
                         </span>
                       </div>
                       {bookingData.service === 'online' && bookingData.videoPlatform && (
                         <div className="flex justify-between">
                           <span>Platform:</span>
                           <span className="font-medium">
                             {videoPlatforms.find(p => p.id === bookingData.videoPlatform)?.name}
                           </span>
                         </div>
                       )}
                       {bookingData.service === 'clinic' && (
                         <div className="flex justify-between">
                           <span>Location:</span>
                           <span className="font-medium">Clinic Visit</span>
                         </div>
                       )}
                       <div className="flex justify-between">
                         <span>Patient:</span>
                         <span className="font-medium">{bookingData.name}</span>
                       </div>
                       <div className="flex justify-between">
                         <span>Payment:</span>
                         <span className="font-medium">
                           {bookingData.paymentMethod === 'online' 
                             ? 'Online Payment'
                             : 'In Person'}
                         </span>
                       </div>
                       <div className="border-t pt-2 mt-2">
                         <div className="flex justify-between font-semibold">
                           <span>Total Amount:</span>
                           <span className="text-blue-600">
                             {services.find(s => s.id === bookingData.service)?.price}
                           </span>
                         </div>
                       </div>
                     </div>
                   </CardContent>
                 </Card>
                
                <div className="flex gap-4">
                   <Button variant="outline" onClick={handleBack} className="flex-1 h-12">
                     <ArrowLeft className="w-5 h-5 mr-2" />
                     Back
                   </Button>
                   {bookingData.paymentMethod === 'person' ? (
                  <Button 
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                       className="flex-1 h-12"
                  >
                       {isSubmitting ? 'Processing...' : t('common.confirmBooking')}
                  </Button>
                   ) : (
                     <div className="flex-1 text-center">
                       <p className="text-sm text-gray-600 mb-2">
                         Click a payment gateway above to proceed
                       </p>
                     </div>
                   )}
                </div>
              </div>
            )}

                         {/* Step 4: Confirmation */}
             {step === 4 && (
               <div className="space-y-6">
                 <div className="text-center">
                   <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                   <h2 className="text-2xl font-bold text-green-600">{t('common.bookingSuccessful')}</h2>
                   <p className="text-gray-600">
                     {t('common.confirmationSent')} {bookingData.email}
                   </p>
                 </div>

                 {/* Booking Summary */}
                 <Card className="bg-gray-50">
                   <CardContent className="p-6">
                     <h3 className="text-xl font-semibold mb-4 text-center">Appointment Details</h3>
                     <div className="grid gap-4">
                       <div className="flex items-center space-x-3">
                         <Calendar className="w-5 h-5 text-blue-600" />
                         <div>
                           <p className="font-medium">Date & Time</p>
                           <p className="text-gray-600">{bookingData.date} at {bookingData.time}</p>
                         </div>
                       </div>
                       
                       <div className="flex items-center space-x-3">
                         <User className="w-5 h-5 text-blue-600" />
                         <div>
                           <p className="font-medium">Service</p>
                           <p className="text-gray-600">{services.find(s => s.id === bookingData.service)?.name}</p>
                         </div>
                       </div>

                       {bookingData.service === 'online' && bookingData.videoPlatform && (
                         <div className="flex items-center space-x-3">
                           <Video className="w-5 h-5 text-blue-600" />
                           <div>
                             <p className="font-medium">Video Platform</p>
                             <p className="text-gray-600">{videoPlatforms.find(p => p.id === bookingData.videoPlatform)?.name}</p>
                             <p className="text-sm text-blue-600">{videoPlatforms.find(p => p.id === bookingData.videoPlatform)?.link}</p>
                           </div>
                         </div>
                       )}

                       {bookingData.service === 'clinic' && (
                         <div className="flex items-center space-x-3">
                           <MapPin className="w-5 h-5 text-blue-600" />
                           <div>
                             <p className="font-medium">Location</p>
                             <p className="text-gray-600">{clinicInfo.address}</p>
                           </div>
                         </div>
                       )}

                       <div className="flex items-center space-x-3">
                         <CreditCard className="w-5 h-5 text-blue-600" />
                         <div>
                           <p className="font-medium">Payment Method</p>
                           <p className="text-gray-600">
                             {bookingData.paymentMethod === 'person' ? 'Pay in Person' : 
                              bookingData.paymentMethod === 'stripe' ? 'Stripe' :
                              bookingData.paymentMethod === 'razorpay' ? 'Razorpay' :
                              bookingData.paymentMethod === 'paypal' ? 'PayPal' : 'Online Payment'}
                           </p>
                         </div>
                       </div>

                       <div className="border-t pt-4">
                         <div className="flex justify-between items-center">
                           <span className="font-semibold">Total Amount</span>
                           <span className="text-xl font-bold text-blue-600">
                             {services.find(s => s.id === bookingData.service)?.price}
                           </span>
                         </div>
                       </div>
                     </div>
                   </CardContent>
                 </Card>

                 {/* Action Buttons */}
                 <div className="grid gap-3">
                   <Button 
                     onClick={() => downloadICS(bookingData)}
                     className="w-full h-12 bg-blue-600 hover:bg-blue-700"
                   >
                     <Download className="w-5 h-5 mr-2" />
                     Download Calendar Invite (.ics)
                   </Button>
                   
                   <Button 
                     onClick={() => {
                       const currentLang = t('common.language') || 'en';
                       let message = '';
                       
                       const serviceName = bookingData.service === 'online' ? 'online consultation' : 
                                          bookingData.service === 'clinic' ? 'clinic visit' : 
                                          bookingData.service === 'package' ? 'child health package' : 'consultation';
                       
                       switch (currentLang) {
                         case 'hi':
                           message = `नमस्ते डॉ. जय भट्ट, मैं ${serviceName} बुक करना चाहता/चाहती हूं। तारीख: ${bookingData.date}, समय: ${bookingData.time}। मेरा नाम ${bookingData.name} है। कृपया मुझे अपॉइंटमेंट की पुष्टि करें।`;
                           break;
                         case 'gu':
                           message = `નમસ્તે ડૉ. જય ભટ્ટ, હું ${serviceName} બુક કરવા માંગુ છું. તારીખ: ${bookingData.date}, સમય: ${bookingData.time}. મારું નામ ${bookingData.name} છે. કૃપા કરી મને એપોઇન્ટમેન્ટની પુષ્ટિ કરો.`;
                           break;
                         default:
                           message = `Hello Dr. Jay Bhatt, I want to book a ${serviceName} on ${bookingData.date} at ${bookingData.time}. My name is ${bookingData.name}. Please confirm my appointment.`;
                       }
                       
                                               const encodedMessage = encodeURIComponent(message);
                        
                        // Try multiple methods to ensure WhatsApp opens with the message
                        try {
                                                  // Method 1: Official wa.me with enhanced parameters
                        const whatsappUrl1 = `https://wa.me/916353750262?text=${encodedMessage}&app_absent=0`;
                        
                        // Method 2: Alternative format that often works better
                        const whatsappUrl2 = `https://api.whatsapp.com/send?phone=916353750262&text=${encodedMessage}`;
                        
                        // Method 3: Direct wa.me without parameters
                        const whatsappUrl3 = `https://wa.me/916353750262?text=${encodedMessage}`;
                          
                          // Try to open WhatsApp
                          const newWindow = window.open(whatsappUrl1, '_blank');
                          
                          // If first method fails, try alternatives
                          if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
                            setTimeout(() => {
                              window.open(whatsappUrl2, '_blank');
                            }, 500);
                            
                            setTimeout(() => {
                              window.open(whatsappUrl3, '_blank');
                            }, 1000);
                          }
                          
                          // Copy message to clipboard as backup
                          setTimeout(() => {
                            navigator.clipboard.writeText(message).then(() => {
                              console.log('Message copied to clipboard as backup');
                            }).catch(() => {
                              console.log('Clipboard copy failed');
                            });
                          }, 2000);
                          
                        } catch (error) {
                          // Fallback: Copy to clipboard and show instructions
                          navigator.clipboard.writeText(message).then(() => {
                            alert(`✅ Message copied to clipboard!\n\n📱 How to contact Dr. Jay Bhatt:\n\n1. Open WhatsApp on your phone\n2. Tap "New Chat" (+)\n3. Enter: +91 63537 50262\n4. Paste the copied message\n5. Send!\n\nYour message is ready to paste! 📋`);
                          }).catch(() => {
                                                          alert(`📱 Contact Dr. Jay Bhatt:\n\nPlease open WhatsApp and send this message to +91 63537 50262:\n\n"${message}"`);
                          });
                        }
                     }}
                     className="w-full h-12 bg-green-600 hover:bg-green-700"
                   >
                     <MessageCircle className="w-5 h-5 mr-2" />
                     Quick Book on WhatsApp
                   </Button>
                   
                   <Button 
                     onClick={() => navigate('/')}
                     variant="outline"
                     className="w-full h-12"
                   >
                  Back to Home
                </Button>
                 </div>

                 <div className="bg-blue-50 p-4 rounded-lg">
                   <p className="text-sm text-blue-700">
                     <strong>Next Steps:</strong><br/>
                     • Check your email for detailed confirmation<br/>
                     • Download the calendar invite to add to your calendar<br/>
                     • For online consultations, join the meeting link 5 minutes before<br/>
                     • For clinic visits, arrive 10 minutes before your appointment
                   </p>
                 </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BookingPage;