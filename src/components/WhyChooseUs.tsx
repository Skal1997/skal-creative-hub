
import React, { useEffect, useRef } from 'react';
import { Check, Award, Target, BarChart } from 'lucide-react';

const features = [
  {
    title: 'Expertise et Certification',
    description: 'Notre équipe est composée de professionnels certifiés, garantissant un travail de qualité dans tous nos domaines d\'expertise.',
    icon: Award,
  },
  {
    title: 'Passion et précision',
    description: 'Nous mettons un point d\'honneur à fournir un travail précis et minutieux, poussés par notre passion pour l\'excellence.',
    icon: Target,
  },
  {
    title: 'Transparence et efficience',
    description: 'Nous valorisons la communication transparente et l\'efficacité dans tous nos projets pour garantir votre satisfaction.',
    icon: Check,
  },
  {
    title: 'Innovation au service de vos projets',
    description: 'Nous utilisons les technologies les plus récentes pour vous offrir des solutions innovantes et adaptées à vos besoins.',
    icon: BarChart,
  },
];

const WhyChooseUs = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);

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

    featureRefs.current.forEach((feature) => {
      if (feature) observer.observe(feature);
    });

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      featureRefs.current.forEach((feature) => {
        if (feature) observer.unobserve(feature);
      });
    };
  }, []);

  return (
    <section 
      id="why-us" 
      className="py-20 md:py-32"
      ref={sectionRef}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="reveal-on-scroll">
            <div className="relative">
              <div className="w-full h-[500px] bg-gradient-to-br from-skal-orange/80 to-skal-orange rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80')] bg-cover bg-center mix-blend-multiply opacity-30" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="absolute bottom-10 left-10 right-10 text-white z-10">
                <h3 className="text-2xl md:text-3xl font-bold mb-3">Un partenaire de confiance</h3>
                <p className="text-white/90">
                  Chez SKAL SERVICE, nous nous engageons à fournir des services de la plus haute qualité, 
                  en mettant l'accent sur la précision, l'innovation et la satisfaction client.
                </p>
              </div>
            </div>
          </div>

          <div>
            <div className="mb-12 reveal-on-scroll">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Pourquoi nous choisir?</h2>
              <p className="text-lg text-muted-foreground">
                Nous nous distinguons par notre approche centrée sur le client, notre expertise technique 
                et notre engagement envers l'excellence et l'innovation.
              </p>
            </div>

            <div className="space-y-8">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  ref={(el) => (featureRefs.current[index] = el)}
                  className="flex items-start gap-4 reveal-on-scroll"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="mt-1 flex-shrink-0 w-10 h-10 rounded-lg bg-skal-orange/10 flex items-center justify-center text-skal-orange">
                    <feature.icon size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
