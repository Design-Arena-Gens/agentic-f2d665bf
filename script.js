(function(){
  const services = [
    {
      id: 'web-design',
      title: 'Web Design',
      description: 'Modern, accessible, conversion-focused websites.',
      long: 'We craft responsive web experiences with a focus on speed, accessibility, and your business goals. From landing pages to complex marketing sites, we deliver design systems that scale.',
      icon: '??',
      category: 'Design',
      tags: ['UI', 'UX', 'Branding']
    },
    {
      id: 'mobile-apps',
      title: 'Mobile App Development',
      description: 'iOS and Android apps built to last.',
      long: 'Native and cross-platform mobile solutions powered by robust architecture, thoughtful UX, and CI/CD pipelines for rapid iteration.',
      icon: '??',
      category: 'Engineering',
      tags: ['React Native', 'Swift', 'Kotlin']
    },
    {
      id: 'seo',
      title: 'SEO & Content',
      description: 'Get discovered and grow organic traffic.',
      long: 'Technical SEO audits, content strategy, and on-page optimization to improve rankings and drive qualified traffic.',
      icon: '??',
      category: 'Growth',
      tags: ['Search', 'Analytics', 'Content']
    },
    {
      id: 'cloud-migration',
      title: 'Cloud Migration',
      description: 'Move to the cloud with zero drama.',
      long: 'Assessment, architecture, and hands-on execution to migrate workloads to AWS, Azure, or GCP using best practices.',
      icon: '??',
      category: 'Cloud',
      tags: ['AWS', 'Azure', 'GCP']
    },
    {
      id: 'data-analytics',
      title: 'Data Analytics',
      description: 'From raw data to real decisions.',
      long: 'Data pipelines, warehousing, and BI dashboards that put insights at your fingertips. We prioritize governance and quality.',
      icon: '??',
      category: 'Data',
      tags: ['ETL', 'dbt', 'Snowflake']
    },
    {
      id: 'cybersecurity',
      title: 'Cybersecurity',
      description: 'Protect your business end-to-end.',
      long: 'Threat modeling, security reviews, and incident response readiness to keep your systems and data safe.',
      icon: '???',
      category: 'Security',
      tags: ['Zero Trust', 'SOC2', 'IAM']
    },
    {
      id: 'devops',
      title: 'DevOps Enablement',
      description: 'Ship faster with confidence.',
      long: 'We build CI/CD pipelines, IaC, and observability foundations so your teams can move quickly and safely.',
      icon: '??',
      category: 'Platform',
      tags: ['CI/CD', 'Terraform', 'Kubernetes']
    },
    {
      id: 'ui-ux',
      title: 'UI/UX Design',
      description: 'Delightful interfaces users love.',
      long: 'Research-driven product design, prototyping, and usability testing to de-risk bets and build the right thing.',
      icon: '??',
      category: 'Design',
      tags: ['Prototyping', 'Figma', 'Research']
    },
    {
      id: 'ecommerce',
      title: 'E-commerce Solutions',
      description: 'High-performance storefronts and checkout flows.',
      long: 'Headless commerce builds and platform implementations that scale to peak traffic while staying maintainable.',
      icon: '??',
      category: 'Growth',
      tags: ['Shopify', 'Headless', 'Payments']
    },
    {
      id: 'ai-ml',
      title: 'AI/ML Consulting',
      description: 'Practical AI that drives outcomes.',
      long: 'From opportunity discovery to model deployment, we help teams leverage machine learning responsibly and effectively.',
      icon: '??',
      category: 'AI',
      tags: ['LLMs', 'MLOps', 'NLP']
    }
  ];

  const servicesContainer = document.getElementById('servicesContainer');
  const searchInput = document.getElementById('searchInput');
  const resultsCount = document.getElementById('resultsCount');
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const modalEl = document.getElementById('serviceModal');
  const modal = modalEl ? new bootstrap.Modal(modalEl) : null;

  const modalTitle = document.getElementById('serviceModalLabel');
  const modalIcon = document.getElementById('serviceIcon');
  const modalDesc = document.getElementById('serviceDescription');
  const modalLong = document.getElementById('serviceLong');
  const modalTags = document.getElementById('serviceTags');
  const modalCTA = document.getElementById('serviceCTA');

  function escapeHtml(text){
    const span = document.createElement('span');
    span.innerText = text;
    return span.innerHTML;
  }

  function createBadge(text){
    const badge = document.createElement('span');
    badge.className = 'badge rounded-pill badge-soft me-1 mb-1';
    badge.textContent = text;
    return badge;
  }

  function renderCards(data){
    servicesContainer.innerHTML = '';
    if (!data.length){
      const col = document.createElement('div');
      col.className = 'col-12';
      col.innerHTML = `
        <div class="empty-state rounded-4 p-5 text-center">
          <div class="fs-1 mb-2">??</div>
          <h5 class="mb-1">No results</h5>
          <p class="text-body-secondary mb-0">Try different keywords like 'data', 'cloud', or 'design'.</p>
        </div>`;
      servicesContainer.appendChild(col);
      resultsCount.textContent = '0 services';
      return;
    }

    data.forEach((svc, index) => {
      const col = document.createElement('div');
      col.className = 'col-12 col-sm-6 col-lg-4 col-xl-3';

      const card = document.createElement('div');
      card.className = 'service-card card h-100 rounded-4';
      card.tabIndex = 0;
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', `${svc.title} details`);

      card.innerHTML = `
        <div class="card-body d-flex flex-column">
          <div class="d-flex align-items-center justify-content-between mb-3">
            <div class="service-icon">${escapeHtml(svc.icon)}</div>
            <span class="badge text-bg-light">${escapeHtml(svc.category)}</span>
          </div>
          <h5 class="card-title mb-1">${escapeHtml(svc.title)}</h5>
          <p class="card-text text-body-secondary mb-3">${escapeHtml(svc.description)}</p>
          <div class="mt-auto d-flex flex-wrap">${svc.tags.map(t => `<span class='badge rounded-pill badge-soft me-1 mb-1'>${escapeHtml(t)}</span>`).join('')}</div>
        </div>
        <div class="card-footer bg-transparent border-0 pt-0">
          <button class="btn btn-sm btn-primary w-100" data-action="open" data-id="${svc.id}">View details</button>
        </div>`;

      col.appendChild(card);
      servicesContainer.appendChild(col);
    });
    resultsCount.textContent = `${data.length} ${data.length === 1 ? 'service' : 'services'}`;
  }

  function openModalById(id){
    const svc = services.find(s => s.id === id);
    if (!svc || !modal) return;
    if (modalTitle) modalTitle.textContent = svc.title;
    if (modalIcon) modalIcon.textContent = svc.icon;
    if (modalDesc) modalDesc.textContent = svc.description;
    if (modalLong) modalLong.textContent = svc.long;
    if (modalTags){
      modalTags.innerHTML = '';
      [svc.category, ...svc.tags].forEach(t => modalTags.appendChild(createBadge(t)));
    }
    if (modalCTA) modalCTA.href = `mailto:sales@example.com?subject=${encodeURIComponent('Inquiry: '+svc.title)}`;
    modal.show();
  }

  function normalize(str){ return (str || '').toLowerCase(); }

  function matchesQuery(svc, q){
    if (!q) return true;
    const hay = [svc.title, svc.description, svc.long, svc.category, ...(svc.tags||[])].map(normalize).join(' ');
    return hay.includes(normalize(q));
  }

  function debounce(fn, wait){
    let t; return (...args)=>{ clearTimeout(t); t = setTimeout(()=>fn(...args), wait); };
  }

  function applySearch(q){
    const filtered = services.filter(s => matchesQuery(s, q));
    renderCards(filtered);
  }

  // Initial render
  renderCards(services);

  // Search handlers
  if (searchInput){
    const onInput = debounce((e)=>{
      applySearch(e.target.value);
    }, 120);
    searchInput.addEventListener('input', onInput);
    searchInput.addEventListener('keydown', (e)=>{
      if (e.key === 'Enter'){
        const firstBtn = servicesContainer.querySelector('[data-action="open"]');
        if (firstBtn){ firstBtn.click(); }
      }
    });
  }

  // Delegate clicks + keyboard on cards
  servicesContainer.addEventListener('click', (e)=>{
    const btn = e.target.closest('[data-action="open"]');
    if (btn){ openModalById(btn.getAttribute('data-id')); }
  });
  servicesContainer.addEventListener('keydown', (e)=>{
    const card = e.target.closest('.service-card');
    if (card && (e.key === 'Enter' || e.key === ' ')){
      e.preventDefault();
      const btn = card.querySelector('[data-action="open"]');
      if (btn){ btn.click(); }
    }
  });
})();
