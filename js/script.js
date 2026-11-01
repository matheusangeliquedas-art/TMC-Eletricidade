/* ==========================================================
   TMC ELETRICIDADE - script.js
   ========================================================== */

// >>> SUBSTITUA PELO NÚMERO REAL (código do país + DDD + número, só dígitos) <<<
const WHATSAPP_NUMBER = "5517991544287";

// Mensagem de cada página (chave = atributo data-page do <body>)
const WA_MESSAGES = {
  "home": "Olá! Acessei o site da TMC ELETRICIDADE e gostaria de conhecer melhor os serviços da empresa.",
  "eletrica-comercial": "Olá! Acessei o site da TMC ELETRICIDADE e gostaria de solicitar um orçamento para o serviço de Elétrica Comercial.",
  "eletrica-industrial": "Olá! Gostaria de solicitar um orçamento para Elétrica Industrial.",
  "eletrificacao-rural": "Olá! Gostaria de solicitar um orçamento para Eletrificação Rural.",
  "energia-solar": "Olá! Gostaria de solicitar um orçamento para Energia Solar.",
  "media-tensao": "Olá! Gostaria de solicitar um orçamento para serviços de Média Tensão."
};

function buildWhatsAppLink() {
  const page = document.body.dataset.page || "home";
  const msg = WA_MESSAGES[page] || WA_MESSAGES.home;
  return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(msg);
}

document.addEventListener("DOMContentLoaded", () => {
  // WhatsApp: botão flutuante + todos os elementos com [data-wa]
  const link = buildWhatsAppLink();
  document.querySelectorAll("[data-wa], #waFloat").forEach(el => {
    el.href = link; el.target = "_blank"; el.rel = "noopener";
  });

  // Menu mobile
  const burger = document.getElementById("burger"), menu = document.getElementById("menu");
  const toggle = open => {
    menu.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", open);
  };
  burger.addEventListener("click", () => toggle(!menu.classList.contains("open")));
  menu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => toggle(false)));

  // Sombra do cabeçalho ao rolar
  const header = document.querySelector(".header");
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 10);
  onScroll(); window.addEventListener("scroll", onScroll, { passive: true });

  // Animação de entrada dos cards
  const items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    }), { threshold: .15 });
    items.forEach(i => io.observe(i));
  } else items.forEach(i => i.classList.add("in"));

  // Ano no rodapé
  const y = document.getElementById("year"); if (y) y.textContent = new Date().getFullYear();
});
