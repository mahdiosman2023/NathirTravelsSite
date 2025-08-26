import React from 'react';
import { Mail, MapPin, Plane } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Plane className="text-emerald-400 w-8 h-8" />
              <span className="text-2xl font-bold">Nathir Travels</span>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed">
              Your trusted partner for exploring the beauty of East Africa. 
              We create unforgettable travel experiences with personalized service and expert guidance.
            </p>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-emerald-400 mb-4">Contact Information</h3>
            
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" />
              <div>
                <p className="font-medium">Email</p>
                <a 
                  href="mailto:info@nathirtravels.com" 
                  className="text-gray-300 hover:text-emerald-400 transition-colors duration-200"
                >
                  info@nathirtravels.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" />
              <div>
                <p className="font-medium">Address</p>
                <p className="text-gray-300 leading-relaxed">
                  Town House, 3rd floor room 1A,<br />
                  Kaunda Street, Nairobi, Kenya
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Nathir Travels. All rights reserved. | Explore East Africa with confidence.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;