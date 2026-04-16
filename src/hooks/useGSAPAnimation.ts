import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const useGSAPAnimation = () => {
  const createParallax = (element: HTMLElement, speed: number = 0.5) => {
    gsap.to(element, {
      y: () => -window.innerHeight * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  };

  const createHoverAnimation = (element: HTMLElement) => {
    gsap.to(element, {
      scale: 1.05,
      duration: 0.3,
      ease: 'power2.out',
      paused: true
    });

    element.addEventListener('mouseenter', () => {
      gsap.to(element, { scale: 1.05, duration: 0.3 });
    });

    element.addEventListener('mouseleave', () => {
      gsap.to(element, { scale: 1, duration: 0.3 });
    });
  };

  const createTextReveal = (element: HTMLElement) => {
    const text = element.textContent || '';
    element.innerHTML = '';

    text.split('').forEach((char, i) => {
      const span = document.createElement('span');
      span.textContent = char;
      span.style.display = 'inline-block';
      span.style.opacity = '0';
      element.appendChild(span);

      gsap.to(span, {
        opacity: 1,
        duration: 0.1,
        delay: i * 0.03,
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
    });
  };

  return {
    createParallax,
    createHoverAnimation,
    createTextReveal
  };
};
