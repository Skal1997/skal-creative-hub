import React from 'react';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-skal-black text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <img 
              src="/lovable-uploads/3feda140-7807-4197-b20f-3c9541c6cbf8.png" 
              alt="SKAL SERVICE" 
              className="h-16 mb-6"
            />
            <p className="text-gray-400 max-w-xs">
              SKAL SERVICE est votre partenaire privilégié pour tous vos besoins en conception graphique, 
              géomètre-expert, cartographie et consultation IA.
            </p>
            <div className="flex mt-6 space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-skal-orange transition-colors"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-skal-orange transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-skal-orange transition-colors"
              >
                <Twitter size={18} />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-skal-orange transition-colors"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Liens rapides</h3>
            <ul className="space-y-3">
              <li>
                <a href="#home" className="text-gray-400 hover:text-skal-orange transition-colors">Accueil</a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-skal-orange transition-colors">Nos services</a>
              </li>
              <li>
                <a href="#why-us" className="text-gray-400 hover:text-skal-orange transition-colors">Pourquoi nous choisir</a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-skal-orange transition-colors">Contact</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-skal-orange mr-3">Téléphone:</span>
                <span className="text-gray-400">+229 01 90315546</span>
              </li>
              <li className="flex items-start">
                <span className="text-skal-orange mr-3">Email:</span>
                <span className="text-gray-400">skalservice.0@gmail.com</span>
              </li>
              <li className="flex items-start">
                <span className="text-skal-orange mr-3">Adresse:</span>
                <span className="text-gray-400">Abomey-Calavi, Tokan, von EPP Tokan</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {currentYear} SKAL SERVICE. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
