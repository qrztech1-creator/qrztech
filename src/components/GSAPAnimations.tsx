import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registrar plugin ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface GSAPAnimationsProps {
  children: React.ReactNode;
  animationType?: 'fadeUp' | 'fadeIn' | 'scaleIn' | 'slideInLeft' | 'slideInRight' | 'staggerChildren';
  delay?: number;
  duration?: number;
  className?: string;
}

const GSAPAnimations: React.FC<GSAPAnimationsProps> = ({
  children,
  animationType = 'fadeUp',
  delay = 0,
  duration = 0.5,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const element = containerRef.current;

    // Configurar animação baseada no tipo
    switch (animationType) {
      case 'fadeUp':
        gsap.fromTo(
          element,
          {
            opacity: 0,
            y: 50
          },
          {
            opacity: 1,
            y: 0,
            duration,
            delay,
            scrollTrigger: {
              trigger: element,
              start: 'top 80%',
              toggleActions: 'play none none none'
            }
          }
        );
        break;

      case 'fadeIn':
        gsap.fromTo(
          element,
          {
            opacity: 0
          },
          {
            opacity: 1,
            duration,
            delay,
            scrollTrigger: {
              trigger: element,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        );
        break;

      case 'scaleIn':
        gsap.fromTo(
          element,
          {
            opacity: 0,
            scale: 0.8
          },
          {
            opacity: 1,
            scale: 1,
            duration,
            delay,
            scrollTrigger: {
              trigger: element,
              start: 'top 80%',
              toggleActions: 'play none none none'
            }
          }
        );
        break;

      case 'slideInLeft':
        gsap.fromTo(
          element,
          {
            opacity: 0,
            x: -100
          },
          {
            opacity: 1,
            x: 0,
            duration,
            delay,
            scrollTrigger: {
              trigger: element,
              start: 'top 80%',
              toggleActions: 'play none none none'
            }
          }
        );
        break;

      case 'slideInRight':
        gsap.fromTo(
          element,
          {
            opacity: 0,
            x: 100
          },
          {
            opacity: 1,
            x: 0,
            duration,
            delay,
            scrollTrigger: {
              trigger: element,
              start: 'top 80%',
              toggleActions: 'play none none none'
            }
          }
        );
        break;

      case 'staggerChildren': {
        const children = element.children;
        gsap.fromTo(
          children,
          {
            opacity: 0,
            y: 30
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.2,
            delay,
            scrollTrigger: {
              trigger: element,
              start: 'top 80%',
              toggleActions: 'play none none none'
            }
          }
        );
        break;
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [animationType, delay, duration]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};

export default GSAPAnimations;