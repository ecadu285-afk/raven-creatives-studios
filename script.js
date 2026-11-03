
document.addEventListener("DOMContentLoaded", () => {
  const elementos = document.querySelectorAll(
    ".section-title, .service-card, .project, .about > div, .contact-content"
  );

  // Respeita quem prefere menos animações.
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  if (!("IntersectionObserver" in window)) {
    return;
  }

  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add("is-visible");
        observador.unobserve(entrada.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: "0px 0px -30px 0px"
  });

  elementos.forEach((elemento) => {
    elemento.classList.add("reveal");
    observador.observe(elemento);
  });
});
