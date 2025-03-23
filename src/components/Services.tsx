
import React, { useEffect, useRef } from 'react';
import { 
  Palette, 
  LayoutPlaneTakeoff, 
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
    icon: LayoutPlaneTakeoff,
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
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all service-card reveal-on-scroll"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-skal-orange/10 text-skal-orange mb-6">
                <service.icon size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-muted-foreground">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
