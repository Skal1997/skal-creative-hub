
import React, { useEffect, useRef, useState } from 'react';
import { 
  Palette, 
  PlaneTakeoff, 
  Globe2, 
  BrainCircuit, 
  MapPin, 
  LineChart
} from 'lucide-react';

const services = [
  {
    title: 'Conception graphique et identitaire',
    description: 'Créez une identité visuelle forte et mémorable pour votre entreprise.',
    icon: Palette,
  },
  {
    title: 'Stratégie de création de marque',
    description: 'Développez une stratégie cohérente et efficace pour votre marque.',
    icon: LineChart,
  },
  {
    title: 'Conception et développement de site web',
    description: 'Bénéficiez d\'un site web sur mesure, responsive et optimisé.',
    icon: PlaneTakeoff,
  },
  {
    title: 'Création de cartes précises',
    description: 'Obtenez des cartes détaillées et précises pour vos projets.',
    icon: Globe2,
  },
  {
    title: 'Spécialiste en relevés topographiques',
    description: 'Profitez de relevés topographiques précis pour vos projets d\'aménagement.',
    icon: MapPin,
  },
  {
    title: 'Consultant IA',
    description: 'Intégrez l\'intelligence artificielle dans vos projets et optimisez vos processus.',
    icon: BrainCircuit,
  },
];

const Services = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px',
    });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      cardRefs.current.forEach((card) => {
        if (card) observer.unobserve(card);
      });
    };
  }, []);

  // Fonction pour gérer l'effet 3D au survol
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    if (!cardRefs.current[index]) return;
    
    const card = cardRefs.current[index];
    const rect = card?.getBoundingClientRect();
    
    if (rect) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      if (card) {
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
      }
    }
  };

  // Fonction pour réinitialiser la rotation
  const handleMouseLeave = (index: number) => {
    if (cardRefs.current[index]) {
      cardRefs.current[index]!.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    }
    setActiveCard(null);
  };

  // Fonction pour le clic sur une carte
  const handleCardClick = (index: number) => {
    setActiveCard(activeCard === index ? null : index);
  };

  return (
    <section 
      id="services" 
      className="py-20 md:py-32 bg-skal-gray"
      ref={sectionRef}
    >
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 reveal-on-scroll">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Nos Services</h2>
          <p className="text-lg text-muted-foreground">
            SKAL SERVICE propose une large gamme de services professionnels pour répondre à tous vos besoins
            en matière de conception, cartographie et consultation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              ref={(el) => (cardRefs.current[index] = el)}
              className={`bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all service-card reveal-on-scroll ${activeCard === index ? 'card-active' : ''}`}
              style={{ 
                transitionDelay: `${index * 100}ms`,
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                transform: 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)'
              }}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={() => handleMouseLeave(index)}
              onClick={() => handleCardClick(index)}
            >
              <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-skal-orange/10 text-skal-orange mb-6">
                <service.icon size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-muted-foreground">{service.description}</p>
              
              {activeCard === index && (
                <div className="mt-6 pt-4 border-t border-gray-100 animate-fade-in">
                  <button className="px-4 py-2 bg-skal-orange text-white rounded-lg shadow-md hover:bg-skal-orange/90 transition-colors">
                    En savoir plus
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
