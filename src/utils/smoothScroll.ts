/**
 * Smooth scroll to an element with consistent timing
 */
export const smoothScrollToElement = (elementId: string, offset: number = 0) => {
  const element = document.getElementById(elementId);
  if (!element) return;

  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
};

/**
 * Smooth scroll to top of page
 */
export const smoothScrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

/**
 * Handle navigation to a section (handles both same-page and cross-page navigation)
 */
export const navigateToSection = (href: string, isHomePage: boolean, navigate: (path: string) => void) => {
  if (href.includes('#')) {
    const elementId = href.split('#')[1];

    if (!isHomePage) {
      // Navigate to home first, then scroll to section
      navigate('/');
      // Wait for page transition to complete before scrolling
      setTimeout(() => {
        const element = document.getElementById(elementId);
        if (element) {
          smoothScrollToElement(elementId, 80); // 80px offset for navbar
        }
      }, 400); // Match page transition duration
    } else {
      // Already on home page, just scroll
      smoothScrollToElement(elementId, 80);
    }
  } else {
    // Regular route navigation
    navigate(href);
  }
};