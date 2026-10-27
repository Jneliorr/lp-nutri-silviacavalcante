export const business = {
  name: "Silvia Cavalcante",
  profession: "Nutricionista",
  space: "Espaço Sinutri",
  phone: "(95) 99134-8232",
  email: "espacosinutrii@gmail.com",
  address: "Rua Cecília Brasil, 891",
  area: "Centro · Boa Vista, RR",
  postalCode: "69301-080",
  maps: "https://maps.app.goo.gl/5S7J6BD4ta3Ba77GA",
  instagram: "https://www.instagram.com/nutri_silviacavalcante/",
  facebook:
    "https://www.facebook.com/people/Nutri-Silvia-Cavalcante/61580582974407/",
  youtube: "https://www.youtube.com/@NutriSilviaCavalcante",
  tiktok: "https://www.tiktok.com/@nutri.silviacavalcante",
  protocolPost: "https://www.instagram.com/p/De90y9dGu9m/",
};

export function whatsapp(
  subject = "Olá, Silvia! Gostaria de saber mais sobre a consulta nutricional.",
) {
  return `https://wa.me/5595991348232?text=${encodeURIComponent(subject)}`;
}

export const protocol = [
  {
    title: "Plano feito para você",
    text: "Dieta personalizada para suas necessidades, preferências e rotina.",
  },
  {
    title: "Três meses de acompanhamento",
    text: "Cuidado nutricional ao longo do processo, com orientação e continuidade.",
  },
  {
    title: "Bioimpedância",
    text: "Avaliação da composição corporal para apoiar o acompanhamento nutricional.",
  },
  {
    title: "Olhar para a massa muscular",
    text: "Estratégias voltadas à preservação da massa muscular durante o emagrecimento.",
  },
  {
    title: "Orientação no dia a dia",
    text: "Material de apoio e orientações práticas para levar o cuidado à sua rotina.",
  },
  {
    title: "Ajustes ao longo do caminho",
    text: "Adaptações no plano alimentar conforme sua evolução e suas necessidades.",
  },
];

export const gallery = [
  {
    src: "/images/protocolo-90.jpg",
    alt: "Publicação original do Protocolo 90 com Silvia Cavalcante",
    label: "Protocolo 90",
    category: "ACOMPANHAMENTO",
    source: business.protocolPost,
  },
  {
    src: "/images/silvia-conversa.jpg",
    alt: "Silvia Cavalcante em uma conversa sobre nutrição",
    label: "Conheça a Silvia",
    category: "CONVERSAS SOBRE NUTRIÇÃO",
    source: "https://www.instagram.com/reel/DePhRO0vYQJ/",
    video: true,
  },
  {
    src: "/images/protocolo-90-detalhes.jpg",
    alt: "Material original com informações do Protocolo 90",
    label: "Cuidado em cada etapa",
    category: "POR DENTRO DO PROTOCOLO",
    source: business.protocolPost,
  },
];
