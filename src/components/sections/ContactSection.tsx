import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export function ContactSection() {
  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      value: "alex.chen@email.com",
      link: "mailto:alex.chen@email.com"
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Phone",
      value: "+1 (555) 123-4567",
      link: "tel:+15551234567"
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Location",
      value: "San Francisco, CA",
      link: "#"
    }
  ];

  return (
    <section id="contact" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-gradient-primary">
              Let's Work Together
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Ready to bring your ideas to life? I'm always excited to discuss new opportunities 
              and collaborate on innovative projects.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="glass">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-6 text-secondary">Send a Message</h3>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">First Name</label>
                      <Input placeholder="John" className="bg-background/50" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Last Name</label>
                      <Input placeholder="Doe" className="bg-background/50" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <Input type="email" placeholder="john@example.com" className="bg-background/50" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Subject</label>
                    <Input placeholder="Project Discussion" className="bg-background/50" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <Textarea 
                      placeholder="Tell me about your project..." 
                      rows={6}
                      className="bg-background/50"
                    />
                  </div>

                  <Button className="w-full gradient-primary text-primary-foreground glow-primary">
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold mb-6 text-secondary">Get In Touch</h3>
                <p className="text-muted-foreground mb-8">
                  Whether you have a project in mind, want to collaborate, or just want to say hello, 
                  I'd love to hear from you. Let's create something amazing together!
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <Card key={index} className="glass hover:glow-primary transition-smooth cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="text-primary">{info.icon}</div>
                        <div>
                          <div className="font-medium">{info.title}</div>
                          <div className="text-muted-foreground">{info.value}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="pt-8">
                <h4 className="text-lg font-semibold mb-4 text-secondary">Why Work With Me?</h4>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    5+ years of proven development experience
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Expertise in modern web technologies
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Strong focus on user experience and performance
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Clear communication and project management
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Commitment to delivering high-quality solutions
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}