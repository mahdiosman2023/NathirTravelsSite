import React from 'react';
import { Plane, Building, Camera } from 'lucide-react';

const packages = [
  {
    icon: Plane,
    title: 'Flights',
    description: 'Book flights to destinations across East Africa and beyond with competitive rates and flexible scheduling.',
    features: ['Direct routes', 'Best prices', 'Flexible dates'],
    backgroundImage: 'https://images.pexels.com/photos/912050/pexels-photo-912050.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
  },
  {
    icon: Building,
    title: 'Hotels',
    description: 'Stay at top-rated hotels and resorts with exceptional amenities and world-class service.',
    features: ['5-star properties', 'Prime locations', 'Special rates'],
    backgroundImage: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
  },
  {
    icon: Camera,
    title: 'Safari Tours',
    description: 'Experience the majesty of African wildlife with our expertly guided safari adventures.',
    features: ['Expert guides', 'Wildlife viewing', 'Cultural experiences'],
    backgroundImage: 'https://images.pexels.com/photos/631317/pexels-photo-631317.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
  },
];

const Packages: React.FC = () => {
  return (
    <section id="packages" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Packages
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose from our carefully curated selection of travel experiences designed to create lasting memories at an affordable price.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg, index) => {
            const IconComponent = pkg.icon;
            return (
              <div
                key={index}
                className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 group"
              >
                {/* Background Image */}
                <div className="absolute inset-0 opacity-40 group-hover:opacity-50 transition-opacity duration-300">
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${pkg.backgroundImage})` }}
                  />
                </div>
                
                {/* Content */}
                <div className="relative z-10 p-8">
                  <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-emerald-200 transition-colors duration-200">
                    <IconComponent className="w-8 h-8 text-emerald-600" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {pkg.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {pkg.description}
                  </p>
                  
                  <ul className="space-y-2">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-700">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Packages;