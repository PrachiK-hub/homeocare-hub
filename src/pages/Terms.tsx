import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileText, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEO from '@/components/SEO';

const Terms = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Terms of Service - Dr. Jay Bhatt"
        description="Terms of service for Dr. Jay Bhatt's homeopathy practice. Learn about our service terms, patient responsibilities, and practice policies."
        type="website"
      />
      
      <div className="container mx-auto px-4 py-8">
        <Button
          onClick={() => navigate(-1)}
          variant="ghost"
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <FileText className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-3xl md:text-4xl font-bold text-professional mb-4">
              Terms of Service
            </h1>
            <p className="text-lg text-muted-foreground">
              Terms and conditions for using our homeopathy services
            </p>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Service Description
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Dr. Jay Bhatt provides homeopathic medical consultations through online video calls and in-person clinic visits. 
                  Our services include diagnosis, treatment planning, and follow-up care using homeopathic principles.
                </p>
                
                <div>
                  <h3 className="font-semibold text-professional mb-2">Available Services</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Online video consultations</li>
                    <li>In-person clinic visits</li>
                    <li>Child health packages</li>
                    <li>Chronic disease management</li>
                    <li>Follow-up consultations</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  Appointment Policies
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-professional mb-2">Booking and Cancellation</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Appointments must be booked at least 24 hours in advance</li>
                    <li>Cancellations require 24-hour notice</li>
                    <li>Late cancellations may incur a fee</li>
                    <li>No-shows will be charged the full consultation fee</li>
                    <li>Rescheduling is allowed with adequate notice</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-professional mb-2">Consultation Duration</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Initial consultations: 45-60 minutes</li>
                    <li>Follow-up consultations: 20-30 minutes</li>
                    <li>Child health packages: 30-45 minutes</li>
                    <li>Chronic disease management: 45-60 minutes</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                  Patient Responsibilities
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-professional mb-2">During Consultations</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Provide accurate medical history and symptoms</li>
                    <li>Be on time for scheduled appointments</li>
                    <li>Ensure stable internet connection for online consultations</li>
                    <li>Find a quiet, private space for video calls</li>
                    <li>Have necessary documents ready</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-professional mb-2">Treatment Compliance</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Follow prescribed homeopathic remedies as directed</li>
                    <li>Attend scheduled follow-up appointments</li>
                    <li>Report any adverse reactions or side effects</li>
                    <li>Inform about any changes in symptoms</li>
                    <li>Maintain communication about treatment progress</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Terms</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-professional mb-2">Payment Methods</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Online payment through secure gateways</li>
                    <li>Cash payment at clinic</li>
                    <li>UPI transfers</li>
                    <li>All payments must be completed before consultation</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-professional mb-2">Refund Policy</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Full refund for cancellations with 24-hour notice</li>
                    <li>50% refund for cancellations with 12-hour notice</li>
                    <li>No refund for no-shows or late cancellations</li>
                    <li>Refunds processed within 5-7 business days</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Medical Disclaimer</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                  <h3 className="font-semibold text-orange-800 mb-2">Important Notice</h3>
                  <p className="text-orange-700">
                    Homeopathic treatment is complementary and should not replace emergency medical care. 
                    In case of medical emergencies, please contact emergency services immediately.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-professional mb-2">Limitations</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Homeopathy is not a substitute for emergency medical care</li>
                    <li>Results may vary between individuals</li>
                    <li>Treatment duration depends on individual response</li>
                    <li>Some conditions may require conventional medical intervention</li>
                    <li>We do not guarantee specific outcomes</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Privacy and Confidentiality</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  We are committed to maintaining the confidentiality of your medical information. 
                  All consultations and medical records are kept strictly confidential in accordance 
                  with medical privacy laws and our privacy policy.
                </p>
                <p className="text-muted-foreground">
                  For detailed information about how we handle your data, please refer to our{' '}
                  <a href="/privacy" className="text-blue-600 hover:text-blue-800 underline">
                    Privacy Policy
                  </a>.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact and Support</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">Get in Touch</h3>
                  <p className="text-blue-700 mb-2">
                    For questions about these terms or our services, contact us:
                  </p>
                  <ul className="text-blue-700 space-y-1">
                    <li>Email: <a href="mailto:dr.jaybhatt@homeocare.com" className="underline">dr.jaybhatt@homeocare.com</a></li>
                                    <li>Phone: <a href="tel:+916353750262" className="underline">+91 63537 50262</a></li>
                <li>WhatsApp: <a href="https://wa.me/+916353750262" className="underline">+91 63537 50262</a></li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Updates to Terms</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  These terms of service may be updated periodically. We will notify you of any significant changes 
                  through our website or email. Continued use of our services after changes constitutes acceptance 
                  of the updated terms.
                </p>
                <p className="text-sm text-muted-foreground mt-4">
                  <strong>Last updated:</strong> December 2024
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
