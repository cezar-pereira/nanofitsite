// Navbar scroll effect
window.addEventListener('scroll', function () {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 50) {
    navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.12)';
  } else {
    navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.08)';
  }
});

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', function () {
  navLinks.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', function () {
    navLinks.classList.remove('active');
  });
});

// Carousel para seção "Em Breve"
(function () {
  const carousel = document.getElementById('comingSoonCarousel');
  const dotsContainer = document.querySelector('.carousel-dots');

  if (!carousel || !dotsContainer) return;

  const slides = carousel.querySelectorAll('.carousel-slide');
  let currentIndex = 0;

  // Criar dots
  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.className = 'carousel-dot' + (index === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Ir para slide ${index + 1}`);
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll('.carousel-dot');

  function updateCarousel() {
    const offset = -currentIndex * 100;
    carousel.style.transform = `translateX(${offset}%)`;

    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }

  function goToSlide(index) {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    currentIndex = index;
    updateCarousel();
  }

  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  // Suporte a swipe touch
  let startX = 0;
  let isDragging = false;

  carousel.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
  });

  carousel.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
  });

  carousel.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }

    isDragging = false;
  });

  // Auto-play opcional (descomente se quiser)
  // setInterval(nextSlide, 5000);
})();

// Accordion para funcionalidades no mobile
(function () {
  const featuresSection = document.getElementById('funcionalidades');
  if (!featuresSection) return;

  const featureCards = featuresSection.querySelectorAll('.feature-card');
  const isMobile = window.innerWidth <= 768;

  function toggleCard(card) {
    // No mobile, funciona como accordion (apenas um aberto por vez)
    if (isMobile) {
      const wasExpanded = card.classList.contains('expanded');

      // Fecha todos os cards
      featureCards.forEach(c => c.classList.remove('expanded'));

      // Abre apenas o card clicado se ele não estava aberto
      if (!wasExpanded) {
        card.classList.add('expanded');
      }
    }
  }

  featureCards.forEach(card => {
    card.addEventListener('click', function (e) {
      // Previne o comportamento padrão se não for um link
      if (!e.target.closest('a')) {
        toggleCard(card);
      }
    });
  });

  // Ajusta o comportamento quando a tela é redimensionada
  let resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      const newIsMobile = window.innerWidth <= 768;
      if (newIsMobile !== isMobile) {
        // Recarrega a página se mudou entre mobile e desktop
        // ou remove as classes expanded no desktop
        if (!newIsMobile) {
          featureCards.forEach(c => c.classList.remove('expanded'));
        }
      }
    }, 250);
  });
})();
