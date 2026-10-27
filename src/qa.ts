// Development-only observations for the local responsive review harness.
export function installAudit() {
  function audit() {
    const root = document.documentElement;
    const broken = Array.from(document.images)
      .filter((image) => image.complete && image.naturalWidth === 0)
      .map((image) => image.getAttribute("src"));
    window.parent.postMessage(
      {
        type: "silvia-audit",
        width: innerWidth,
        scrollWidth: root.scrollWidth,
        overflow: root.scrollWidth > innerWidth,
        h1: document.querySelectorAll("h1").length,
        webgl: document.querySelector("canvas")?.dataset.state,
        broken,
      },
      location.origin,
    );
  }
  let timer: ReturnType<typeof setTimeout>;
  const observer = new ResizeObserver(() => {
    clearTimeout(timer);
    timer = setTimeout(audit, 200);
  });
  observer.observe(document.body);
  window.addEventListener("resize", audit);
  document.fonts.ready.then(audit);
  setTimeout(audit, 1500);
}
