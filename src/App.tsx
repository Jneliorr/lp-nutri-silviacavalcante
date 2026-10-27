import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  ChevronDown,
  CircleCheck,
  Heart,
  Instagram,
  Leaf,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  MoveUpRight,
  Phone,
  Quote,
  Sprout,
  Target,
  X,
  Youtube,
} from "lucide-react";
import { business, protocol, whatsapp } from "./config/business";
import { theme } from "./config/theme";
import Atmosphere from "./components/Atmosphere";
import { Brand, Cta, Label } from "./components/UI";
import Gallery from "./components/Gallery";

const nav = [
  { href: "#sobre", label: "A Silvia" },
  { href: "#cuidado", label: "O cuidado" },
  { href: "#protocolo", label: "Protocolo 90" },
  { href: "#contato", label: "Onde encontrar" },
];

function Loader() {
  const [show, setShow] = useState(() => {
    try {
      return (
        !sessionStorage.getItem("silvia-visited") &&
        !matchMedia("(prefers-reduced-motion: reduce)").matches
      );
    } catch {
      return false;
    }
  });
  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      try {
        sessionStorage.setItem("silvia-visited", "1");
      } catch {
        /* Storage may be disabled. */
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div
      className={`loader ${show ? "" : "loader-complete"}`}
      aria-hidden="true"
    >
      <Brand />
      <span>UM TEMPO PARA CUIDAR DE VOCÊ</span>
      <div className="loader-line" />
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const progress = useRef<HTMLDivElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      const distance =
        document.documentElement.scrollHeight - window.innerHeight;
      const percent =
        distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 0;
      if (progress.current)
        progress.current.style.transform = `scaleX(${percent})`;
      setScrolled(window.scrollY > 40);
      document.documentElement.style.setProperty(
        "--parallax",
        `${Math.min(window.scrollY * 0.045, 24)}px`,
      );
      frame = 0;
    };
    const request = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const observer = new ResizeObserver(request);
    observer.observe(document.body);
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    update();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
    };
  }, []);
  useEffect(() => {
    function escape(event: KeyboardEvent) {
      if (event.key === "Escape" && open) {
        setOpen(false);
        menuButton.current?.focus();
      }
    }
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, [open]);
  return (
    <header className={`header ${scrolled ? "header-scrolled" : ""}`}>
      <div className="container header-inner">
        <a
          href="#inicio"
          className="brand-link"
          aria-label="Silvia Cavalcante — início"
        >
          <Brand />
        </a>
        <nav
          id="main-navigation"
          aria-label="Navegação principal"
          className={open ? "navigation navigation-open" : "navigation"}
        >
          {nav.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
        </nav>
        <Cta className="header-cta">Vamos conversar</Cta>
        <button
          ref={menuButton}
          className="menu-button icon-button"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <div className="scroll-track" aria-hidden="true">
        <div ref={progress} className="scroll-progress" />
      </div>
    </header>
  );
}

function Privacy() {
  const ref = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  return (
    <>
      <button
        ref={trigger}
        className="privacy-link"
        onClick={() => ref.current?.showModal()}
      >
        Privacidade
      </button>
      <dialog
        ref={ref}
        className="privacy-dialog"
        onClose={() => trigger.current?.focus()}
        aria-labelledby="privacy-title"
        onClick={(event) => {
          if (event.target === event.currentTarget) ref.current?.close();
        }}
      >
        <div className="privacy-content">
          <button
            className="icon-button"
            aria-label="Fechar política de privacidade"
            onClick={() => ref.current?.close()}
          >
            <X />
          </button>
          <Label>TRANSPARÊNCIA</Label>
          <h2 id="privacy-title">Sua privacidade.</h2>
          <p>
            Esta página apresenta o trabalho de Silvia Cavalcante e direciona o
            contato para o WhatsApp, e-mail e redes sociais. Não há formulário
            de cadastro ou ferramenta de análise de audiência adicionada ao
            site.
          </p>
          <p>
            O navegador pode guardar uma preferência temporária para exibir a
            abertura animada apenas uma vez por sessão. As fontes são carregadas
            pelo Google Fonts. O mapa do Google só é carregado quando você
            seleciona “Carregar mapa”.
          </p>
          <p>
            Ao acessar WhatsApp, redes sociais, Google Maps ou vídeos externos,
            aplicam-se as políticas dessas plataformas. O serviço de hospedagem
            também pode registrar dados técnicos de acesso para operar a página.
          </p>
          <p>
            Evite enviar informações sensíveis de saúde antes de combinar o
            canal adequado com a profissional. Para dúvidas sobre seus dados,
            escreva para{" "}
            <a href={`mailto:${business.email}`}>{business.email}</a>.
          </p>
          <small>Atualização: 27 de outubro de 2026.</small>
        </div>
      </dialog>
    </>
  );
}

function Location() {
  const [showMap, setShowMap] = useState(false);
  return (
    <section id="contato" className="section location-section">
      <div className="container location-grid">
        <div data-reveal>
          <Label number="07">ONDE ENCONTRAR</Label>
          <h2>
            Um espaço para
            <br />
            <em>o seu cuidado.</em>
          </h2>
          <p>
            Seu próximo passo pode começar com uma conversa. Entre em contato
            para saber mais e consultar os horários disponíveis.
          </p>
          <div className="address-block">
            <MapPin size={22} strokeWidth={1.4} aria-hidden="true" />
            <div>
              <h3>{business.space}</h3>
              <p>
                {business.address}
                <br />
                {business.area}
                <br />
                CEP {business.postalCode}
              </p>
            </div>
          </div>
          <a
            className="text-link"
            href={business.maps}
            target="_blank"
            rel="noopener noreferrer"
          >
            Traçar minha rota <ArrowUpRight size={18} aria-hidden="true" />
          </a>
          <div className="contact-hours">
            <span>ATENDIMENTO</span>
            <p>Consulte os horários pelo WhatsApp.</p>
          </div>
        </div>
        <div className="map-panel" data-reveal>
          {showMap ? (
            <iframe
              title="Localização do Espaço Sinutri em Boa Vista"
              src="https://maps.google.com/maps?q=Rua%20Cec%C3%ADlia%20Brasil%20891%20Centro%20Boa%20Vista%20RR&z=16&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          ) : (
            <div className="map-placeholder">
              <div className="map-grid" aria-hidden="true" />
              <div className="map-pin">
                <MapPin size={28} strokeWidth={1.3} aria-hidden="true" />
              </div>
              <span>BOA VISTA · RORAIMA</span>
              <h3>Nos vemos por aqui.</h3>
              <p>Rua Cecília Brasil, 891 · Centro</p>
              <button className="button" onClick={() => setShowMap(true)}>
                Carregar mapa <ArrowUpRight size={18} aria-hidden="true" />
              </button>
              <small>Ao carregar, você se conecta ao Google Maps.</small>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default function App() {
  useEffect(() => {
    const root = document.documentElement;
    Object.entries(theme.colors).forEach(([name, value]) =>
      root.style.setProperty(`--${name}`, value),
    );
    root.style.setProperty("--font-heading", theme.fonts.heading);
    root.style.setProperty("--font-body", theme.fonts.body);
    if (
      matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    )
      return;
    root.classList.add("reveal-enabled");
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.08 },
    );
    document
      .querySelectorAll("[data-reveal]")
      .forEach((element) => observer.observe(element));
    return () => {
      observer.disconnect();
      root.classList.remove("reveal-enabled");
    };
  }, []);
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <Loader />
      <Header />
      <main id="conteudo">
        <section className="hero" id="inicio">
          <Atmosphere />
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="eyebrow">
                <span className="fine-line" />
                NUTRIÇÃO COM CIÊNCIA E ACOLHIMENTO
              </div>
              <h1>
                Nutrição que
                <br />
                respeita a<br />
                <em>sua história.</em>
              </h1>
              <p>
                Cuidar da alimentação é cuidar de você.
                <br className="desktop-break" /> Um caminho individualizado, com
                equilíbrio
                <br className="desktop-break" /> e escolhas que cabem na sua
                vida.
              </p>
              <div className="hero-actions">
                <Cta />
                <a className="hero-secondary" href="#protocolo">
                  Conheça o Protocolo 90{" "}
                  <ArrowDown size={15} aria-hidden="true" />
                </a>
              </div>
              <div className="hero-location">
                <MapPin size={15} strokeWidth={1.4} aria-hidden="true" />
                <span>BOA VISTA, RORAIMA</span>
                <span className="tiny-dot" />
                <span>ESPAÇO SINUTRI</span>
              </div>
            </div>
            <div className="hero-visual">
              <div className="portrait-frame">
                <div className="portrait-crop">
                  <img
                    className="hero-portrait"
                    src="/images/protocolo-90.jpg"
                    alt="Silvia Cavalcante, nutricionista, em imagem da divulgação do Protocolo 90"
                    width="1122"
                    height="1402"
                    fetchPriority="high"
                  />
                </div>
              </div>
              <div className="portrait-caption">
                <span>SILVIA CAVALCANTE</span>
                <span>Nutricionista</span>
              </div>
              <div className="hero-seal">
                <Leaf size={26} strokeWidth={1.1} aria-hidden="true" />
                <span>
                  Ciência,
                  <br />
                  acolhimento
                  <br />
                  <em>e respeito.</em>
                </span>
              </div>
              <span className="portrait-side-label">
                CADA HISTÓRIA, UM CUIDADO.
              </span>
            </div>
          </div>
          <div className="container hero-bottom">
            <a href="#sobre">
              <span>CONHEÇA ESSE CAMINHO</span>
              <ArrowDown size={15} aria-hidden="true" />
            </a>
            <span>O cuidado começa na escuta.</span>
          </div>
        </section>

        <section id="sobre" className="section about-section">
          <div className="container about-grid">
            <div className="about-visual" data-reveal>
              <img
                src="/images/silvia-conversa.jpg"
                alt="Silvia Cavalcante em conversa sobre seu trabalho com nutrição"
                width="360"
                height="640"
                loading="lazy"
              />
              <div className="about-note">
                <span>ALÉM DE UM PLANO ALIMENTAR.</span>
                <span>Um olhar para você.</span>
              </div>
              <a
                href="https://www.instagram.com/reel/DePhRO0vYQJ/"
                target="_blank"
                rel="noopener noreferrer"
                className="portrait-source"
              >
                Assista à conversa <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
            <div className="about-copy" data-reveal>
              <Label number="01">MUITO PRAZER, SILVIA</Label>
              <h2>
                Antes de falar
                <br />
                de alimentação,
                <br />
                <em>vamos falar de você.</em>
              </h2>
              <p>
                Sou Silvia Cavalcante, nutricionista. Acredito em um cuidado que
                parte da sua realidade: seus hábitos, sua rotina e os objetivos
                que fazem sentido para você.
              </p>
              <p>
                Meu trabalho tem foco em emagrecimento, obesidade e nutrição
                esportiva, com atenção também à mulher 40+ e à menopausa.
                Individualidade, ciência e acolhimento orientam esse caminho.
              </p>
              <div className="about-principles">
                <span>
                  <Check size={16} aria-hidden="true" /> Respeito à sua rotina
                </span>
                <span>
                  <Check size={16} aria-hidden="true" /> Cuidado individualizado
                </span>
              </div>
              <a
                className="text-link"
                href={whatsapp()}
                target="_blank"
                rel="noopener noreferrer"
              >
                Vamos conversar sobre você{" "}
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        <section id="cuidado" className="section care-section">
          <div className="container">
            <div className="section-heading" data-reveal>
              <div>
                <Label number="02">COMO POSSO TE ACOMPANHAR</Label>
                <h2>
                  Caminhos diferentes.
                  <br />
                  <em>O mesmo cuidado.</em>
                </h2>
              </div>
              <p>
                Uma consulta nutricional para olhar para suas necessidades, com
                orientação e um plano construído para a sua vida.
              </p>
            </div>
            <div className="care-grid">
              {[
                {
                  icon: Sprout,
                  title: "Emagrecimento e obesidade",
                  text: "Acompanhamento nutricional individualizado, com atenção aos hábitos e à construção de uma rotina possível.",
                  n: "01",
                },
                {
                  icon: Target,
                  title: "Nutrição esportiva",
                  text: "Alimentação alinhada à sua rotina de treinos, aos seus objetivos e ao cuidado com a composição corporal.",
                  n: "02",
                },
                {
                  icon: Heart,
                  title: "Mulher 40+ e menopausa",
                  text: "Um olhar para as necessidades da mulher e para o cuidado nutricional nessa fase da vida.",
                  n: "03",
                },
              ].map(({ icon: Icon, title, text, n }) => (
                <article className="care-card" key={n} data-reveal>
                  <div className="care-card-top">
                    <Icon size={31} strokeWidth={1.1} aria-hidden="true" />
                    <span>{n}</span>
                  </div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <a
                    href={whatsapp(
                      `Olá, Silvia! Gostaria de saber sobre o atendimento em ${title.toLowerCase()}.`,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Conversar sobre ${title.toLowerCase()}`}
                  >
                    <span>Conversar sobre meu cuidado</span>
                    <ArrowUpRight size={19} aria-hidden="true" />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="protocolo" className="section protocol-section">
          <div className="container">
            <div className="protocol-intro">
              <div className="protocol-title" data-reveal>
                <Label number="03">PROTOCOLO 90</Label>
                <h2>
                  Três meses.
                  <br />
                  Um compromisso
                  <br />
                  <em>com você.</em>
                </h2>
                <p>
                  Um acompanhamento para cuidar da alimentação e construir
                  hábitos com orientação, individualidade e constância.
                </p>
                <Cta
                  light
                  subject="Olá, Silvia! Gostaria de conhecer o Protocolo 90 e saber como funciona o acompanhamento de três meses."
                >
                  Quero conhecer o Protocolo 90
                </Cta>
              </div>
              <div className="protocol-number" data-reveal>
                <span>90</span>
                <div>
                  <span>DIAS DE CUIDADO</span>
                  <span>Um passo de cada vez.</span>
                </div>
              </div>
            </div>
            <div className="protocol-list">
              {protocol.map((item, i) => (
                <article key={item.title} data-reveal>
                  <span className="protocol-index">0{i + 1}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                  <CircleCheck size={19} strokeWidth={1.2} aria-hidden="true" />
                </article>
              ))}
            </div>
            <div className="protocol-footnote">
              <p>
                Cada acompanhamento é individual. Estratégias e evolução
                dependem da avaliação e das necessidades de cada pessoa.
              </p>
              <a
                href={business.protocolPost}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver publicação do protocolo{" "}
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        <section id="avaliacoes" className="section reviews-section">
          <div className="container" data-reveal>
            <Label number="04">EXPERIÊNCIAS DE CUIDADO</Label>
            <div className="reviews-grid">
              <h2>
                Confiança se constrói
                <br />
                <em>em cada encontro.</em>
              </h2>
              <div className="review-empty">
                <Quote size={28} strokeWidth={1} aria-hidden="true" />
                <p>Este espaço está reservado para avaliações verificadas.</p>
                <span>
                  Enquanto isso, conheça o trabalho da Silvia e tire suas
                  dúvidas diretamente com ela.
                </span>
                <a
                  className="text-link"
                  href={business.maps}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Consultar perfil no Google{" "}
                  <ArrowUpRight size={17} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="galeria" className="section gallery-section">
          <div className="container">
            <div className="section-heading" data-reveal>
              <div>
                <Label number="05">UM POUCO MAIS DE PERTO</Label>
                <h2>
                  Cuidado que também
                  <br />
                  <em>vira conversa.</em>
                </h2>
              </div>
              <a
                className="text-link"
                href={business.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram size={19} strokeWidth={1.5} aria-hidden="true" />{" "}
                Acompanhe no Instagram{" "}
                <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            </div>
            <Gallery />
          </div>
        </section>

        <section className="section faq-section">
          <div className="container faq-grid">
            <div data-reveal>
              <Label number="06">ANTES DO PRIMEIRO PASSO</Label>
              <h2>
                Vamos tirar
                <br />
                <em>suas dúvidas?</em>
              </h2>
              <a
                className="text-link"
                href={whatsapp(
                  "Olá, Silvia! Tenho uma dúvida sobre o acompanhamento nutricional.",
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                Fale comigo <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            </div>
            <div className="faq-list" data-reveal>
              {[
                [
                  "Como funciona o Protocolo 90?",
                  "É um acompanhamento nutricional de três meses que inclui dieta personalizada, avaliação da composição corporal por bioimpedância, material de apoio, orientações práticas e ajustes no plano alimentar conforme a evolução. Converse com a Silvia para conhecer o formato e as condições.",
                ],
                [
                  "O plano alimentar é individualizado?",
                  "Sim. A proposta divulgada pela Silvia considera as necessidades, a rotina e os objetivos de cada pessoa. O plano é adaptado ao longo do acompanhamento.",
                ],
                [
                  "Onde é o atendimento?",
                  "O endereço divulgado é o Espaço Sinutri, na Rua Cecília Brasil, 891, Centro, em Boa Vista, Roraima. Confirme os detalhes do atendimento ao agendar.",
                ],
                [
                  "Como consultar valores e horários?",
                  "Entre em contato pelo WhatsApp (95) 99134-8232. Por lá você pode consultar disponibilidade, valores e detalhes da consulta e do Protocolo 90.",
                ],
              ].map(([question, answer]) => (
                <details key={question}>
                  <summary>
                    {question}
                    <ChevronDown size={19} aria-hidden="true" />
                  </summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <Location />
        <section className="closing-section">
          <div className="container" data-reveal>
            <span className="eyebrow">VOCÊ NÃO PRECISA COMEÇAR SOZINHA.</span>
            <h2>
              Seu próximo capítulo
              <br />
              pode começar com <em>cuidado.</em>
            </h2>
            <Cta>Vamos dar o primeiro passo?</Cta>
            <span className="closing-signature">Com carinho, Silvia.</span>
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <Brand />
              <p>
                Ciência, acolhimento e respeito.
                <br />
                Um cuidado que parte de você.
              </p>
            </div>
            <div>
              <span className="footer-label">EXPLORE</span>
              <nav aria-label="Navegação do rodapé">
                {nav.map((item) => (
                  <a key={item.href} href={item.href}>
                    {item.label}
                  </a>
                ))}
                <a href="#galeria">Fotos e conversas</a>
              </nav>
            </div>
            <div>
              <span className="footer-label">VAMOS CONVERSAR</span>
              <a href={whatsapp()} target="_blank" rel="noopener noreferrer">
                <MessageCircle size={16} aria-hidden="true" /> {business.phone}
              </a>
              <a href={`mailto:${business.email}`}>
                <Mail size={16} aria-hidden="true" /> {business.email}
              </a>
              <a href={`tel:+5595991348232`}>
                <Phone size={16} aria-hidden="true" /> Ligar para o consultório
              </a>
              <p className="footer-address">
                {business.address}
                <br />
                {business.area}
              </p>
            </div>
            <div>
              <span className="footer-label">POR PERTO, TAMBÉM AQUI</span>
              <a
                href={business.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram size={16} aria-hidden="true" /> Instagram{" "}
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
              <a
                href={business.youtube}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Youtube size={16} aria-hidden="true" /> YouTube{" "}
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
              <a
                href={business.facebook}
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook <ArrowUpRight size={14} aria-hidden="true" />
              </a>
              <a
                href={business.tiktok}
                target="_blank"
                rel="noopener noreferrer"
              >
                TikTok <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className="footer-bottom">
            <span>
              © {new Date().getFullYear()} Silvia Cavalcante. Todos os direitos
              reservados.
            </span>
            <span>Registro profissional: informação a confirmar.</span>
            <Privacy />
            <a
              href="#inicio"
              className="back-top"
              aria-label="Voltar ao início"
            >
              <MoveUpRight size={18} aria-hidden="true" />
            </a>
          </div>
        </div>
      </footer>
      <a
        className="floating-contact"
        href={whatsapp()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Conversar com Silvia Cavalcante pelo WhatsApp"
      >
        <MessageCircle size={25} strokeWidth={1.5} aria-hidden="true" />
      </a>
    </>
  );
}
