
import React, { useEffect, useRef } from 'react';
import { ArrowDownCircle } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1,
    });

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  return (
    <section 
      id="home" 
      className="relative pt-28 pb-20 md:pt-36 md:pb-32 min-h-screen flex items-center overflow-hidden"
      ref={heroRef}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden hero-mask opacity-5">
        <div className="grid grid-cols-10 w-full h-full">
          {Array.from({ length: 200 }).map((_, index) => (
            <div 
              key={index} 
              className="border-[0.5px] border-skal-black/20"
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto opacity-0 animate-fade-in" style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}>
          <div className="inline-block mb-4 px-4 py-1 rounded-full bg-skal-lightgray text-sm font-medium tracking-wide">
            EXPERTISE & INNOVATION
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6">
            <span className="block">Services de conception et d'expertise</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-skal-black to-skal-orange">
              à la hauteur de vos ambitions
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10">
            Une équipe de professionnels à votre service pour tous vos besoins en conception graphique,
            géomètre-expert, cartographie et consultation IA.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <a 
              href="#services"
              className="px-6 py-3 rounded-lg bg-skal-orange text-white font-medium transition-all hover:shadow-lg hover:shadow-skal-orange/20 active:translate-y-0.5"
            >
              Découvrir nos services
            </a>
            <a 
              href="#contact"
              className="px-6 py-3 rounded-lg border border-skal-black/10 bg-white hover:bg-skal-lightgray transition-colors font-medium"
            >
              Nous contacter
            </a>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
          <a href="#services" className="text-muted-foreground/80 hover:text-skal-orange transition-colors">
            <ArrowDownCircle size={36} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
