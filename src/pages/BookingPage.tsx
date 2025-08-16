import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Calendar, Clock, User, CreditCard, CheckCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { toast } from '@/hooks/use-toast';

const BookingPage = () => {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingData, setBookingData] = useState({
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
    paymentMethod: 'online'
  });

  const services = [
    { id: 'video', name: t('services.videoConsultation.title'), price: '₹500' },
    { id: 'phone', name: t('services.phoneConsultation.title'), price: '₹300' },
    { id: 'chat', name: t('services.chatConsultation.title'), price: '₹200' },
    { id: 'clinic', name: t('services.clinicVisit.title'), price: '₹400' }
  ];

  const timeSlots = {
    morning: ['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM'],
    afternoon: ['02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'],
    evening: ['05:00 PM', '05:30 PM', '06:00 PM']
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    const templateParams = {
      to_name: 'Dr. Jay Bhatt',
      patient_name: bookingData.name,
      patient_email: bookingData.email,
      patient_phone: bookingData.phone,
      service_type: bookingData.service,
      appointment_date: bookingData.date,
      appointment_time: bookingData.time,
      patient_age: bookingData.age,
      patient_gender: bookingData.gender,
      symptoms: bookingData.symptoms,
      payment_method: bookingData.paymentMethod,
      message: `New appointment booking from ${bookingData.name}`
    };

    try {
      // Send email to doctor (you'll need to configure EmailJS)
      await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        templateParams,
        'YOUR_PUBLIC_KEY'
      );
      
      setStep(5); // Show confirmation
      toast({
        title: t('booking.confirmation.title'),
        description: t('booking.confirmation.message'),
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to book appointment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center text-primary">
              {t('booking.title')}
            </CardTitle>
            <p className="text-center text-muted-foreground">{t('booking.subtitle')}</p>
          </CardHeader>
          <CardContent>
            {step === 1 && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <User className="h-5 w-5" />
                  {t('booking.step1')}
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {services.map((service) => (
                    <Card 
                      key={service.id}
                      className={`cursor-pointer transition-all ${
                        bookingData.service === service.id ? 'ring-2 ring-primary' : ''
                      }`}
                      onClick={() => setBookingData({...bookingData, service: service.id})}
                    >
                      <CardContent className="p-4">
                        <h4 className="font-semibold">{service.name}</h4>
                        <p className="text-lg font-bold text-primary">{service.price}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <Button 
                  onClick={() => setStep(2)}
                  disabled={!bookingData.service}
                  className="w-full"
                >
                  Next
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  {t('booking.step2')}
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label>{t('booking.date')}</Label>
                    <Input 
                      type="date" 
                      value={bookingData.date}
                      onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div>
                    <Label>{t('booking.time')}</Label>
                    <Select value={bookingData.time} onValueChange={(value) => setBookingData({...bookingData, time: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder={t('booking.selectTime')} />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(timeSlots).map(([period, slots]) => (
                          slots.map(slot => (
                            <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                          ))
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                  <Button 
                    onClick={() => setStep(3)}
                    disabled={!bookingData.date || !bookingData.time}
                    className="flex-1"
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold">{t('booking.step3')}</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>{t('booking.fullName')} *</Label>
                    <Input 
                      value={bookingData.name}
                      onChange={(e) => setBookingData({...bookingData, name: e.target.value})}
                      placeholder="Enter full name"
                    />
                  </div>
                  <div>
                    <Label>{t('booking.age')} *</Label>
                    <Input 
                      type="number"
                      value={bookingData.age}
                      onChange={(e) => setBookingData({...bookingData, age: e.target.value})}
                      placeholder="Age"
                    />
                  </div>
                  <div>
                    <Label>{t('booking.gender')} *</Label>
                    <RadioGroup 
                      value={bookingData.gender} 
                      onValueChange={(value) => setBookingData({...bookingData, gender: value})}
                      className="flex gap-6 mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="male" id="male" />
                        <Label htmlFor="male">{t('booking.male')}</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="female" id="female" />
                        <Label htmlFor="female">{t('booking.female')}</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div>
                    <Label>{t('booking.phone')} *</Label>
                    <Input 
                      value={bookingData.phone}
                      onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label>{t('booking.email')} *</Label>
                    <Input 
                      type="email"
                      value={bookingData.email}
                      onChange={(e) => setBookingData({...bookingData, email: e.target.value})}
                      placeholder="email@example.com"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label>{t('booking.symptoms')} *</Label>
                    <Textarea 
                      value={bookingData.symptoms}
                      onChange={(e) => setBookingData({...bookingData, symptoms: e.target.value})}
                      placeholder={t('booking.symptomsPlaceholder')}
                      rows={4}
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
                  <Button 
                    onClick={() => setStep(4)}
                    disabled={!bookingData.name || !bookingData.email || !bookingData.phone || !bookingData.symptoms}
                    className="flex-1"
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  {t('booking.step4')}
                </h3>
                <RadioGroup 
                  value={bookingData.paymentMethod} 
                  onValueChange={(value) => setBookingData({...bookingData, paymentMethod: value})}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="online" id="online" />
                    <Label htmlFor="online">{t('booking.payOnline')}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="person" id="person" />
                    <Label htmlFor="person">{t('booking.payInPerson')}</Label>
                  </div>
                </RadioGroup>
                
                <div className="bg-accent/20 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Booking Summary</h4>
                  <p>Service: {services.find(s => s.id === bookingData.service)?.name}</p>
                  <p>Date: {bookingData.date}</p>
                  <p>Time: {bookingData.time}</p>
                  <p>Patient: {bookingData.name}</p>
                  <p className="font-bold">Amount: {services.find(s => s.id === bookingData.service)?.price}</p>
                </div>
                
                <div className="flex gap-4">
                  <Button variant="outline" onClick={() => setStep(3)}>Back</Button>
                  <Button 
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex-1"
                  >
                    {isSubmitting ? t('booking.submitting') : t('booking.bookAppointment')}
                  </Button>
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="text-center space-y-6">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
                <h3 className="text-2xl font-bold text-green-600">{t('booking.confirmation.title')}</h3>
                <p className="text-muted-foreground">{t('booking.confirmation.message')}</p>
                <Button onClick={() => window.location.href = '/'} className="w-full">
                  Back to Home
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BookingPage;