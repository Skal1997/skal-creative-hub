
import React, { useEffect, useRef, Suspense } from 'react';
import { ArrowDownCircle } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Composant pour les particules 3D
const Particles = () => {
  const particlesRef = useRef<THREE.Points>(null);
  const particlesGeometryRef = useRef<THREE.BufferGeometry>(null);

  // Nombre de particules
  const particleCount = 5000;
  
  // Créer les positions des particules
  useEffect(() => {
    if (!particlesGeometryRef.current) return;
    
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      // Position aléatoire dans un espace 3D
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 10;
      positions[i3 + 1] = (Math.random() - 0.5) * 10;
      positions[i3 + 2] = (Math.random() - 0.5) * 10;
      
      // Couleurs orange et noir (couleurs de SKAL)
      const colorChoice = Math.random();
      if (colorChoice > 0.6) {
        // Orange
        colors[i3] = 1.0;     // R
        colors[i3 + 1] = 0.56; // G (pour FF8E41)
        colors[i3 + 2] = 0.25; // B
      } else {
        // Noir/Gris foncé
        const shade = 0.1 + Math.random() * 0.1;
        colors[i3] = shade;
        colors[i3 + 1] = shade;
        colors[i3 + 2] = shade;
      }
    }
    
    particlesGeometryRef.current.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometryRef.current.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  }, []);
  
  // Animation des particules
  useFrame((state) => {
    if (!particlesRef.current) return;
    
    particlesRef.current.rotation.x = state.clock.getElapsedTime() * 0.05;
    particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.075;
  });
  
  return (
    <points ref={particlesRef}>
      <bufferGeometry ref={particlesGeometryRef} />
      <pointsMaterial 
        size={0.03} 
        vertexColors 
        transparent 
        depthWrite={false} 
        blending={THREE.AdditiveBlending} 
        sizeAttenuation 
      />
    </points>
  );
};

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
      {/* Fond 3D */}
      <div className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
        <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
          <Suspense fallback={null}>
            <Particles />
            <OrbitControls 
              enableZoom={false} 
              enablePan={false} 
              autoRotate 
              autoRotateSpeed={0.5} 
              enableDamping 
              dampingFactor={0.05}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden hero-mask opacity-5" style={{ zIndex: 2 }}>
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
          <div className="inline-block mb-4 px-4 py-1 rounded-full bg-skal-lightgray text-sm font-medium tracking-wide backdrop-blur-sm bg-white/30">
            EXPERTISE & INNOVATION
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6 text-skal-black">
            <span className="block">Services de conception et d'expertise</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-skal-black to-skal-orange">
              à la hauteur de vos ambitions
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 backdrop-blur-sm bg-white/30 p-3 rounded-lg">
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
              className="px-6 py-3 rounded-lg border border-skal-black/10 bg-white/80 backdrop-blur-sm hover:bg-skal-lightgray transition-colors font-medium"
            >
              Nous contacter
            </a>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block" style={{ zIndex: 20 }}>
          <a href="#services" className="text-muted-foreground/80 hover:text-skal-orange transition-colors">
            <ArrowDownCircle size={36} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
