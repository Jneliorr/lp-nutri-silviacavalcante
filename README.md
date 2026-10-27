# Silvia Cavalcante · Nutrição & Cuidado

Landing page em português, direção **Editorial Luxury**, construída com React, TypeScript, Vite, Tailwind CSS, Lucide React e WebGL nativo. Modo A: sem painel administrativo.

## Executar

Requisitos: Node.js 20.19+ ou 22.12+ e npm.

```sh
npm ci
npm run dev
```

Produção:

```sh
npm run build
npm run preview
```

O resultado está em `dist/`. O manifesto `.openai/hosting.json` identifica o site privado criado no Sites. Não trocar seu `project_id` para atualizações.

## Conteúdo e identidade

- `src/config/business.ts`: contatos, serviços, Protocolo 90 e galeria.
- `src/config/theme.ts`: tokens principais de identidade e desempenho.
- `src/styles/index.css`: composição editorial, responsividade e movimento reduzido.
- `src/components/Atmosphere.tsx` e `src/shaders/atmosphere.ts`: névoa dourada GLSL, compilação/linkagem, resolução, limite de DPR, renderização pausada fora da tela ou em aba oculta, liberação de recursos e fallback estático.
- `src/components/Gallery.tsx`: lightbox com teclado e retorno de foco.

O mapa é carregado sob demanda. Os vídeos abrem a publicação original. O site não inclui formulário, pixel ou analytics. O número de registro profissional não foi fornecido e aparece como informação a confirmar; não foram inventadas avaliações ou horários.

## Fontes verificadas em 27/10/2026

- [Perfil da Silvia no Instagram](https://www.instagram.com/nutri_silviacavalcante/): obesidade, emagrecimento, nutrição esportiva, mulher 40+ e menopausa; ciência, acolhimento e respeito.
- [Publicação do Protocolo 90, de 26/10/2026](https://www.instagram.com/p/De90y9dGu9m/): três meses de acompanhamento, dieta personalizada, bioimpedância, estratégias para preservar massa muscular, material de apoio e ajustes no plano. Texto consultado no navegador. Não foram acrescentadas promessas de resultado, preços ou frequência de consultas.
- [Guia Saúde Folha BV](https://www.guiasaude.folhabv.com.br/post/nutricionistas-nutricionista-funcional-dr-silvia-cavalcante): apresentação da profissional, Espaço Sinutri, WhatsApp, e-mail e endereço.
- [Sesc RR, Rede Sesc de Vantagens de abril/2026, página 4](https://www.sescrr.com.br/wp-content/uploads/2026/04/REDE-SESC-DE-VANTAGEM.pdf): consulta nutricional, telefone e endereço.

Fotos e publicações locais vieram dos links da profissional fornecidos pelo usuário. A foto do hero é um enquadramento CSS da imagem de divulgação do protocolo; não foi gerado um retrato da profissional. A galeria identifica as publicações originais. Não se afirma que a ambientação das peças publicitárias representa o consultório real.

## Logo

Arquivo final: `public/images/logo-silvia-transparent.png` (PNG RGBA, 1630 × 965, com alfa real).

Editada com a ferramenta embutida **ImageGen** a partir da imagem enviada pelo usuário. A saída selecionada preserva o monograma SC, o nome e o subtítulo e remove o fundo oliva. O arquivo original enviado não foi sobrescrito. Por se tratar de uma edição generativa de um raster pequeno, não é um arquivo vetorial original da marca.

Prompt final utilizado:

> Background extraction ONLY. Keep the ORIGINAL FLAT artwork from this exact input image: the intertwined SC thin gold monogram, the thin serif SILVIA CAVALCANTE, small widely spaced NUTRICIONISTA, and short horizontal gold line. Remove all olive background and ghosted ornaments. Output a clean true-alpha transparent PNG. ABSOLUTELY NO bevel, 3D, emboss, outlines, glow, shadow, texture, rough edges, speckles, yellow or red fringe. Lettering must remain elegant thin flat strokes as in the original, solid muted champagne-gold #C6AA65, no dimensional rendering. Preserve exact character shapes and relative sizes and layout. Text exact: SILVIA CAVALCANTE / NUTRICIONISTA. Smooth vector-like clean edges with proper transparent antialiasing. Landscape aspect matching original. Do not redesign.

## Verificação

Compilação TypeScript e build Vite aprovados. Revisão no navegador nas larguras 360, 390, 768, 1024, 1440 e 1920 px, sem overflow horizontal ou imagens quebradas. WebGL observado no estado `ready`. Verificados menu móvel, âncoras, galeria (abrir, avançar com teclado, fechar por Escape e retornar foco), FAQ, carregamento do mapa e política de privacidade. Nenhum erro ou aviso de console foi observado durante a revisão. Não é uma certificação formal WCAG nem uma medição de Core Web Vitals em campo.

O diretório ignorado `qa/` é usado apenas durante o desenvolvimento. A instrumentação de diagnóstico `src/qa.ts` só é importada em modo de desenvolvimento e não entra no build de produção.
