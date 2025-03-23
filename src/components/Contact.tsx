
import React, { useEffect, useRef } from 'react';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

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
    });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Votre message a été envoyé! Nous vous répondrons dans les plus brefs délais.");
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  return (
    <section 
      id="contact" 
      className="py-20 md:py-32 bg-skal-gray"
      ref={sectionRef}
    >
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 reveal-on-scroll">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Contactez-nous</h2>
          <p className="text-lg text-muted-foreground">
            Prenez contact avec notre équipe pour discuter de vos projets. Nous sommes là pour vous accompagner.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="bg-white rounded-2xl p-8 shadow-sm reveal-on-scroll">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Nom
                  </label>
                  <Input
                    id="name"
                    placeholder="Entrez votre nom"
                    required
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Entrez votre email"
                    required
                    className="w-full"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Sujet
                </label>
                <Input
                  id="subject"
                  placeholder="Entrez le sujet de votre message"
                  required
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Entrez votre message"
                  rows={5}
                  required
                  className="w-full resize-none"
                />
              </div>
              <Button type="submit" className="w-full bg-skal-orange hover:bg-skal-orange/90">
                <Send className="mr-2 h-4 w-4" /> Envoyer le message
              </Button>
            </form>
          </div>

          <div className="lg:pl-8 reveal-on-scroll" style={{ transitionDelay: "150ms" }}>
            <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
              <h3 className="text-xl font-semibold mb-6">Informations de contact</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Phone className="w-5 h-5 text-skal-orange mt-1" />
                  <div>
                    <h4 className="font-medium mb-1">Téléphone</h4>
                    <p className="text-muted-foreground">+229 01 90315546</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="w-5 h-5 text-skal-orange mt-1" />
                  <div>
                    <h4 className="font-medium mb-1">Email</h4>
                    <p className="text-muted-foreground">skalservice.0@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-skal-orange mt-1" />
                  <div>
                    <h4 className="font-medium mb-1">Adresse</h4>
                    <p className="text-muted-foreground">Abomey-Calavi, Tokan, von EPP Tokan</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden h-[300px] shadow-sm">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63392.967008963945!2d2.2936083707031243!3d6.500186299999991!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1025312b5dbf33b3%3A0xdc4b02b0d1fce11c!2sTokan!5e0!3m2!1sfr!2sbj!4v1652975337240!5m2!1sfr!2sbj" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
