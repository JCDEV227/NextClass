/* ==========================================
   NEXTCLASS - JAVASCRIPT
   Funcionalidades principais
   ========================================== */

// ==========================================
// 1. CONFIGURAÇÃO INICIAL
// ==========================================

// Espera o DOM carregar completamente
document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  initSmoothScroll();
  initCTAButtons();
  initMobileMenu();
  initBackToTop();
});

// ==========================================
// 2. ANIMAÇÕES AO SCROLL (Intersection Observer)
// ==========================================

/**
 * Inicializa animações quando elementos entram no viewport
 * Usa Intersection Observer API para performance otimizada
 */
function initScrollAnimations() {
  // Seleciona todos os elementos que devem animar
  const animatedElements = document.querySelectorAll(
    '.hero-content, .benefit-card, .feature-stat, .case-card, .system-box, .comparison-box, .about-content, .guarantee-box'
  );

  // Configurações do observer
  const observerOptions = {
    threshold: 0.1, // Ativa quando 10% do elemento está visível
    rootMargin: '0px 0px -50px 0px' // Margem inferior para ativar antes
  };

  // Callback quando elemento entra/sai do viewport
  const observerCallback = (entries, observer) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Adiciona delay progressivo para criar efeito cascata
        setTimeout(() => {
          entry.target.classList.add('is-visible');
        }, index * 100);

        // Para de observar após animar (performance)
        observer.unobserve(entry.target);
      }
    });
  };

  // Cria o observer
  const observer = new IntersectionObserver(observerCallback, observerOptions);

  // Adiciona classe inicial e começa a observar
  animatedElements.forEach(element => {
    element.classList.add('animate-on-scroll');
    observer.observe(element);
  });
}

// ==========================================
// 3. NAVEGAÇÃO SUAVE
// ==========================================

/**
 * Implementa scroll suave para links de âncora
 * Melhora a experiência de navegação interna
 */
function initSmoothScroll() {
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = targetSection.offsetTop - navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // Fecha menu mobile se estiver aberto
        closeMobileMenu();
      }
    });
  });
}

// ==========================================
// 4. BOTÕES CTA (Call-to-Action)
// ==========================================

/**
 * Função global para agendar diagnóstico
 * Pode ser chamada de onclick no HTML ou via addEventListener
 */
function agendarDiagnostico() {
  // Número do WhatsApp (ALTERE AQUI para o número real)
  const whatsappNumber = '244900000000'; // Formato: código do país + número

  // Mensagem pré-formatada
  const message = encodeURIComponent(
    'Olá! Gostaria de agendar um diagnóstico gratuito para acelerar as matrículas da minha formação. 🎓'
  );

  // URL do WhatsApp
  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${message}`;

  // Abre em nova aba
  window.open(whatsappURL, '_blank');

  // Analytics tracking (opcional - descomente se usar Google Analytics)
  // gtag('event', 'click', {
  //   'event_category': 'CTA',
  //   'event_label': 'Agendar Diagnóstico'
  // });
}

/**
 * Inicializa todos os botões CTA da página
 */
function initCTAButtons() {
  const ctaButtons = document.querySelectorAll('.cta-button');

  ctaButtons.forEach(button => {
    // Adiciona efeito de ripple ao clicar
    button.addEventListener('click', (e) => {
      createRippleEffect(e, button);
    });
  });
}

/**
 * Cria efeito ripple (ondulação) nos botões
 */
function createRippleEffect(event, button) {
  const ripple = document.createElement('span');
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;

  ripple.style.width = ripple.style.height = `${size}px`;
  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;
  ripple.classList.add('ripple');

  button.appendChild(ripple);

  // Remove o ripple após a animação
  setTimeout(() => ripple.remove(), 600);
}

// ==========================================
// 5. MENU MOBILE (Hamburger)
// ==========================================

/**
 * Inicializa funcionalidade do menu mobile
 */
/*function initMobileMenu() {
  // Cria botão hamburger se não existir
  const navbar = document.querySelector('.navbar .container');

  if (!document.querySelector('.menu-toggle')) {
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.setAttribute('aria-label', 'Toggle menu');
    menuToggle.innerHTML = `
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
    `;

    navbar.appendChild(menuToggle);

    // Event listener para toggle
    menuToggle.addEventListener('click', toggleMobileMenu);
  }*/

  // Fecha menu ao clicar fora
  document.addEventListener('click', (e) => {
    const navMenu = document.querySelector('.nav-menu');
    const menuToggle = document.querySelector('.menu-toggle');

    if (navMenu.classList.contains('is-active') &&
      !navMenu.contains(e.target) &&
      !menuToggle.contains(e.target)) {
      closeMobileMenu();
    }
  });
}

/**
 * Alterna o estado do menu mobile
 */
function toggleMobileMenu() {
  const navMenu = document.querySelector('.nav-menu');
  const menuToggle = document.querySelector('.menu-toggle');
  const body = document.body;

  navMenu.classList.toggle('is-active');
  menuToggle.classList.toggle('is-active');
  body.classList.toggle('menu-open');
}

/**
 * Fecha o menu mobile
 */
function closeMobileMenu() {
  const navMenu = document.querySelector('.nav-menu');
  const menuToggle = document.querySelector('.menu-toggle');
  const body = document.body;

  navMenu.classList.remove('is-active');
  menuToggle.classList.remove('is-active');
  body.classList.remove('menu-open');
}

// ==========================================
// 6. BOTÃO VOLTAR AO TOPO
// ==========================================

/**
 * Cria e gerencia botão "Voltar ao Topo"
 */
function initBackToTop() {
  // Cria o botão
  const backToTopButton = document.createElement('button');
  backToTopButton.className = 'back-to-top';
  backToTopButton.setAttribute('aria-label', 'Voltar ao topo');
  backToTopButton.innerHTML = '↑';
  document.body.appendChild(backToTopButton);

  // Mostra/oculta baseado no scroll
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add('is-visible');
    } else {
      backToTopButton.classList.remove('is-visible');
    }
  });

  // Scroll suave ao topo
  backToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ==========================================
// 7. UTILITÁRIOS E HELPERS
// ==========================================

/**
 * Debounce - Limita a frequência de execução de uma função
 * Útil para eventos de scroll/resize
 */
function debounce(func, wait = 20) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Detecta se o usuário está em dispositivo móvel
 */
function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

/**
 * Adiciona classe quando elemento está visível no viewport
 * Alternativa mais simples ao Intersection Observer
 */
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// ==========================================
// 8. EVENTOS GLOBAIS
// ==========================================

// Previne comportamento padrão de form (se houver)
document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // Adicione lógica de submit aqui se necessário
  });
});

// Log para debug (remova em produção)
console.log('NextClass - Website carregado com sucesso! 🚀');

// ==========================================
// 9. PERFORMANCE - Lazy Loading de Imagens
// ==========================================

/**
 * Implementa lazy loading para imagens
 * Carrega imagens apenas quando necessário
 */
function initLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
}

// Inicializa lazy loading se houver imagens com data-src
if (document.querySelectorAll('img[data-src]').length > 0) {
  initLazyLoading();
}

