import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Shield, Eye, Lock, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEO from '@/components/SEO';

const Privacy = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Privacy Policy - Dr. Jay Bhatt"
        description="Privacy policy for Dr. Jay Bhatt's homeopathy practice. Learn how we protect your personal information and use external services."
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
            <Shield className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-3xl md:text-4xl font-bold text-professional mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-muted-foreground">
              How we protect and handle your personal information
            </p>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-blue-600" />
                  Information We Collect
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-professional mb-2">Personal Information</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Name, age, and gender for medical consultation</li>
                    <li>Email address for appointment confirmations</li>
                    <li>Phone number for communication</li>
                    <li>Address (optional) for clinic visits</li>
                    <li>Medical symptoms and concerns</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-professional mb-2">Technical Information</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>IP address and browser information</li>
                    <li>Device type and screen resolution</li>
                    <li>Language preferences</li>
                    <li>Usage analytics (anonymized)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-green-600" />
                  How We Use Your Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-professional mb-2">Primary Uses</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Schedule and manage appointments</li>
                    <li>Provide medical consultations</li>
                    <li>Send appointment confirmations and reminders</li>
                    <li>Process payments for services</li>
                    <li>Respond to your inquiries</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-professional mb-2">External Services</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li><strong>EmailJS:</strong> Send emails for appointment confirmations</li>
                    <li><strong>Payment Gateways:</strong> Process online payments (Stripe, Razorpay, PayPal)</li>
                    <li><strong>WhatsApp:</strong> Communication and appointment scheduling</li>
                    <li><strong>Google Maps:</strong> Display clinic location</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-600" />
                  Data Protection
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-professional mb-2">Security Measures</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>All data is encrypted in transit (HTTPS)</li>
                    <li>Personal information is stored locally in your browser</li>
                    <li>No sensitive data is stored on our servers</li>
                    <li>External services use industry-standard security</li>
                    <li>Regular security audits and updates</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-professional mb-2">Data Retention</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Booking data is stored locally until appointment completion</li>
                    <li>Email confirmations are sent but not stored</li>
                    <li>Payment information is handled by secure third-party processors</li>
                    <li>Analytics data is anonymized and retained for 2 years</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your Rights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-professional mb-2">You have the right to:</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Access your personal information</li>
                    <li>Correct inaccurate data</li>
                    <li>Request deletion of your data</li>
                    <li>Withdraw consent for data processing</li>
                    <li>Lodge a complaint with data protection authorities</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">Contact Information</h3>
                  <p className="text-blue-700">
                    For privacy-related inquiries, contact Dr. Jay Bhatt at{' '}
                    <a href="mailto:dr.jaybhatt@homeocare.com" className="underline">
                      dr.jaybhatt@homeocare.com
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Updates to This Policy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  This privacy policy may be updated periodically. We will notify you of any significant changes 
                  through our website or email. Continued use of our services after changes constitutes acceptance 
                  of the updated policy.
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

export default Privacy;
