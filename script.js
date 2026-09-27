document.addEventListener('DOMContentLoaded', () => {
      
  // Atualizar Ano no Rodapé
  document.getElementById('year').textContent = new Date().getFullYear();

  // ==========================================================================
  // GERENCIAMENTO DE TEMA (CLARO / ESCURO)
  // ==========================================================================
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const themeText = document.getElementById('theme-text');
  const htmlEl = document.documentElement;
  let currentLang = localStorage.getItem('lang') || 'pt';

  const savedTheme = localStorage.getItem('theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  
  setTheme(savedTheme);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlEl.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  });

  function setTheme(theme) {
    htmlEl.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    themeIcon.textContent = theme === 'light' ? '☀️' : '🌙';
    if (currentLang === 'pt') {
        themeText.textContent = theme === 'light' ? 'Claro' : 'Escuro';
    } else {
        themeText.textContent = theme === 'light' ? 'Light' : 'Dark';
    }
  }

  // ==========================================================================
  // INTERNACIONALIZAÇÃO COM BANDEIRAS (🇧🇷 PT / 🇺🇸 EN)
  // ==========================================================================
  const langToggleBtn = document.getElementById('lang-toggle');
  const langFlag = document.getElementById('lang-flag');
  const langLabel = document.getElementById('lang-label');

  updateLanguage(currentLang);

  langToggleBtn.addEventListener('click', () => {
    currentLang = currentLang === 'pt' ? 'en' : 'pt';
    updateLanguage(currentLang);
  });

  function updateLanguage(lang) {
    localStorage.setItem('lang', lang);
    
    // Atualiza a bandeira e o rótulo do idioma
    if (lang === 'pt') {
      langFlag.textContent = '🇧🇷';
      langLabel.textContent = 'PT';
    } else {
      langFlag.textContent = '🇺🇸';
      langLabel.textContent = 'EN';
    }

    // Atualiza todos os elementos com a classe .i18n e atributo data-pt/data-en
    const elements = document.querySelectorAll('.i18n, [data-pt]');
    elements.forEach(el => {
      const text = el.getAttribute(`data-${lang}`);
      if (text) {
        el.textContent = text;
      }
    });
  }

  // ==========================================================================
  // FILTRAGEM DE PROJETOS POR TEMA
  // ==========================================================================
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

});