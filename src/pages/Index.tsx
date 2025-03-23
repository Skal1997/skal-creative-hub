
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import WhyChooseUs from '@/components/WhyChooseUs';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  useEffect(() => {
    // Fonction pour gérer le défilement et l'animation des éléments
    const handleScroll = () => {
      const revealElements = document.querySelectorAll('.reveal-on-scroll');
      revealElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add('revealed');
        }
      });
    };

    // Ajouter l'écouteur d'événement de défilement
    window.addEventListener('scroll', handleScroll);
    // Déclencher une fois au chargement de la page
    handleScroll();

    // Gérer le comportement de défilement fluide pour les liens d'ancrage
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.getBoundingClientRect().top + window.scrollY - 80,
            behavior: 'smooth'
          });
        }
      });
    });

    // Nettoyage des écouteurs d'événements
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Modification du titre de la page
  useEffect(() => {
    document.title = "SKAL SERVICE | Conception graphique & Expertise cartographique";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <WhyChooseUs />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
