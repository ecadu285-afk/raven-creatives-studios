
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



/* ==========================================
   RAVEN ORÇAMENTOS 1.0
   Envio de solicitações pelo WhatsApp
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("formOrcamento");

  if (!formulario) return;

  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    if (!formulario.reportValidity()) return;

    const nome = document.getElementById("orcNome").value.trim();
    const servico = document.getElementById("orcServico").value;
    const prazo = document.getElementById("orcPrazo").value;
    const descricao = document.getElementById("orcDescricao").value.trim();

    if (!nome || !servico || !prazo || !descricao) {
      alert("Preencha todos os campos do orçamento.");
      return;
    }

    // Substitua pelo WhatsApp comercial da Raven.
    // Formato: 55 + DDD + número, somente dígitos.
    const telefone = "55DDDNUMERO";

    const mensagem = [
      "Olá, Raven Creatives Studios!",
      "",
      "Gostaria de solicitar um orçamento.",
      "",
      `Nome: ${nome}`,
      `Serviço: ${servico}`,
      `Prazo: ${prazo}`,
      `Descrição: ${descricao}`
    ].join("\n");

    const url = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;

    window.location.href = url;
  });
});
