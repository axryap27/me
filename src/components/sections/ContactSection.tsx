import { Button } from '@/components/ui/button';
import { Mail, Github, Linkedin, ExternalLink } from 'lucide-react';

export function ContactSection() {
  return (
    <section id="contact" className="py-24 bg-black text-white">
      <div className="container mx-auto px-8">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Header */}
          <div className="mb-16">
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              LET'S CONNECT
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Always interested in new opportunities and collaborations. 
              Feel free to reach out, always willing to chat!
            </p>
          </div>

          {/* Contact Method */}
          <div className="max-w-md mx-auto mb-16">
            <div className="p-8 bg-gray-900/50 rounded-2xl border border-gray-800 hover:border-gray-700 transition-colors">
              <div className="flex justify-center gap-4 mb-4">
                <Mail className="h-8 w-8 text-white" />
                <Linkedin className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">Get In Touch</h3>
              <p className="text-gray-400 mb-6 text-center">Reach out via email or connect on LinkedIn</p>
              
              <div className="flex gap-3">
                <a href="mailto:aarya27@gmail.com" className="flex-1">
                  <Button 
                    className="w-full bg-white text-black hover:bg-gray-200"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </Button>
                </a>
                <Button 
                  variant="outline"
                  className="flex-1 border-gray-600 text-white hover:bg-white hover:text-black"
                  onClick={() => window.open('https://linkedin.com/in/aarya-p9')}
                >
                  <Linkedin className="h-4 w-4 mr-2" />
                  LinkedIn
                </Button>
              </div>
            </div>
          </div>


          {/* Footer Note */}
          <div className="text-gray-500 text-sm">
            <p>Open to new opportunities worldwide</p>
          </div>

        </div>
      </div>
    </section>
  );
}