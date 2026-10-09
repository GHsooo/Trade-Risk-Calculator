(() => {
  function applyLayout() {
    if (document.getElementById('compact-layout-fix')) return;
    const style = document.createElement('style');
    style.id = 'compact-layout-fix';
    style.textContent = `
      main > h1 { text-align: center; width: 100%; margin: 4px 0 10px; }
      #app > header { display: none; }
      #accountFooter { display: flex; align-items: center; justify-content: space-between;
        gap: 12px; margin: 18px 0 8px; padding: 14px 4px 4px;
        border-top: 1px solid #ddd; }
      #accountFooter #account { font-size: 13px; color: #626262;
        max-width: calc(100% - 100px); overflow: hidden;
        text-overflow: ellipsis; white-space: nowrap; }
      #accountFooter #logout { font-size: 14px; padding: 8px 12px; min-height: 40px; }
      #fields > details { background: #fff; border-radius: 4px;
        margin: 8px 0; border: 1px solid #e6e6e6; }
      #fields > details > summary { cursor: pointer; display: flex;
        justify-content: space-between; align-items: center; gap: 12px;
        padding: 12px; min-height: 44px; font-size: 14px;
        font-weight: 600; color: #444; list-style: none; }
      #fields > details > summary::-webkit-details-marker { display: none; }
      #fields > details > summary::after { content: '+'; font-size: 20px; font-weight: 400; }
      #fields > details[open] > summary::after { content: '−'; }
      #fields > details > summary:focus-visible { outline: 2px solid #37474f; outline-offset: -2px; }
      #fields > details > section { margin: 0; padding: 0 12px 12px;
        border: 0; background: transparent; border-radius: 0; }
      #fields > details > section > h2 { display: none; }
      #fields > details > section .row { margin: 5px 0; }
    `;
    document.head.appendChild(style);
    const app = document.getElementById('app');
    const header = app?.querySelector(':scope > header');
    if (header) {
      header.id = 'accountFooter';
      app.appendChild(header);
    }
    const fields = document.getElementById('fields');
    if (!fields) return;
    Array.from(fields.children).slice(2).forEach(section => {
      if (section.tagName !== 'SECTION') return;
      const details = document.createElement('details');
      const summary = document.createElement('summary');
      const heading = section.querySelector('h2');
      const labels = {
        'TARGET COMPARISON': 'Target comparison',
        'OPTIONAL TRADE RESULT': 'Optional trade result',
        'PORTFOLIO SETTINGS': 'Portfolio settings'
      };
      summary.textContent = labels[heading?.textContent.trim()] || heading?.textContent || 'More';
      section.replaceWith(details);
      details.append(summary, section);
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyLayout, { once: true });
  } else {
    applyLayout();
  }
})();
