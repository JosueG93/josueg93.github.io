/* ===================================================================
   Josue Gamez — Portafolio
   Este archivo NO se necesita editar nunca. Lee todo desde /data/*.json
   Para actualizar el sitio (nuevo certificado, nuevo proyecto, cambiar
   la bio, etc.) solo se editan los archivos dentro de /data.
   =================================================================== */

const ICON_BASE = 'https://cdn.simpleicons.org';

async function loadJSON(path){
  const res = await fetch(path, { cache: 'no-store' });
  if(!res.ok) throw new Error(`No se pudo cargar ${path}`);
  return res.json();
}

function iconMarkup(icono, color, fallbackText){
  if(icono){
    return `<img src="${ICON_BASE}/${icono}" alt="" loading="lazy" onerror="this.replaceWith(Object.assign(document.createElement('span'),{textContent:'${(fallbackText||'').slice(0,2)}',style:'font-family:IBM Plex Mono,monospace;font-size:11px;font-weight:600;color:#fff'}))">`;
  }
  return `<span style="font-family:'IBM Plex Mono',monospace;font-size:11px;font-weight:600;color:#fff">${fallbackText || '·'}</span>`;
}

function hexSoft(hex){
  return `${hex}22`; // color con transparencia para el fondo del icono
}

/* ---------- PERFIL / HERO ---------- */
function renderPerfil(p){
  const initials = p.nombre.split(' ').filter(Boolean).slice(0,2).map(w=>w[0]).join('').toUpperCase();
  document.getElementById('brand-initials').textContent = initials;
  document.title = `${p.nombre} · ${p.titulo.split('·')[0].trim()}`;

  document.getElementById('hero-status').textContent = p.disponible ? 'Disponible para nuevas oportunidades' : 'No disponible actualmente';
  document.getElementById('hero-kicker-dot').style.color = p.disponible ? 'var(--accent)' : 'var(--ink-faint)';
  document.getElementById('hero-name').textContent = p.nombre;
  document.getElementById('hero-title').textContent = p.titulo;
  document.getElementById('hero-bio').textContent = p.bio;

  document.getElementById('hero-meta').innerHTML = `
    <span class="meta-item">📍 ${p.ubicacion}</span>
  `;

  document.getElementById('hero-cta').innerHTML = `
    <a href="mailto:${p.contacto.email}" class="btn btn-primary">Escríbeme →</a>
    <a href="${p.contacto.linkedin_url}" target="_blank" rel="noopener" class="btn btn-ghost">LinkedIn</a>
  `;

  document.getElementById('sidebar-foot').innerHTML = `
    <div class="status-pill"><span class="dot"></span>${p.disponible ? 'Disponible' : 'Ocupado'}</div>
    ${p.ubicacion}
  `;

  const contactGrid = document.getElementById('contact-grid');
  contactGrid.innerHTML = `
    <a href="mailto:${p.contacto.email}" class="contact-card">
      <div class="contact-icon" style="background:#FCE8E6;">✉</div>
      <div><div class="contact-label">EMAIL</div><div class="contact-value">${p.contacto.email}</div></div>
    </a>
    <a href="tel:${p.contacto.telefono}" class="contact-card">
      <div class="contact-icon" style="background:var(--accent-soft);">📞</div>
      <div><div class="contact-label">TELÉFONO</div><div class="contact-value">${p.contacto.telefono_visible}</div></div>
    </a>
    <a href="${p.contacto.linkedin_url}" target="_blank" rel="noopener" class="contact-card">
      <div class="contact-icon" style="background:#E8F0FE;">${iconMarkup('linkedin', '0A66C2', 'in').replace('#fff','#0A66C2')}</div>
      <div><div class="contact-label">LINKEDIN</div><div class="contact-value">${p.contacto.linkedin_usuario}</div></div>
    </a>
    <div class="contact-card">
      <div class="contact-icon" style="background:var(--gold-soft);">📍</div>
      <div><div class="contact-label">UBICACIÓN</div><div class="contact-value">${p.ubicacion}</div></div>
    </div>
  `;

  document.getElementById('footer').innerHTML = `
    <p>${p.nombre} · ${p.titulo.split('·')[0].trim()} · ${new Date().getFullYear()}</p>
  `;

  return { anios: p.anios_experiencia, reduccion: p.reduccion_tiempo };
}

/* ---------- STATS ---------- */
function renderStats({ anios, reduccion, certsCount, projectsCount }){
  document.getElementById('stat-strip').innerHTML = `
    <div class="stat"><div class="stat-num mono">${anios}</div><div class="stat-label">Años de experiencia</div></div>
    <div class="stat"><div class="stat-num mono">${reduccion}</div><div class="stat-label">Reducción tiempo de análisis</div></div>
    <div class="stat"><div class="stat-num mono">${certsCount}</div><div class="stat-label">Certificaciones</div></div>
  `;
}

/* ---------- HABILIDADES ---------- */
function renderHabilidades(list){
  const el = document.getElementById('skills-table');
  el.innerHTML = list.map(s => `
    <div class="skill-row">
      <div class="skill-icon" style="background:${s.color ? hexSoft('#'+s.color) : 'var(--accent-soft)'};">
        ${s.icono ? iconMarkup(s.icono, s.color, s.nombre) : `<span style="font-size:15px;">${s.emoji || '•'}</span>`}
      </div>
      <div class="skill-main">
        <div class="skill-name">${s.nombre}</div>
        <div class="skill-track"><div class="skill-fill" style="width:${s.nivel}%; background:${s.color ? '#'+s.color : 'var(--accent)'};"></div></div>
      </div>
      <div class="skill-pct">${s.etiqueta} · ${s.nivel}%</div>
    </div>
  `).join('');
}

/* ---------- EXPERIENCIA ---------- */
function renderExperiencia(list){
  const el = document.getElementById('timeline');
  el.innerHTML = list.map(e => `
    <div class="tl-item">
      <div class="tl-dot ${e.actual ? 'current' : ''}"></div>
      <div class="tl-head">
        <span class="tl-company">${e.empresa}</span>
        <span class="tl-date mono">${e.fecha}</span>
      </div>
      <div class="tl-role">${e.rol}</div>
      <div class="tl-desc">${e.descripcion}</div>
      ${e.insignia ? `<span class="tl-badge ${e.actual ? 'live' : ''}">${e.insignia}</span>` : ''}
    </div>
  `).join('');
}

/* ---------- CERTIFICACIONES ---------- */
function renderCertificados(list){
  const el = document.getElementById('certs-list');
  if(!list.length){
    el.innerHTML = `<div class="empty-state"><div class="empty-kicker mono">SIN REGISTROS</div><p>Aún no se han cargado certificaciones en <code>data/certificados.json</code>.</p></div>`;
    return;
  }
  el.innerHTML = list.map(c => {
    const tag = c.archivo ? 'a' : 'div';
    const href = c.archivo ? `href="${c.archivo}" target="_blank" rel="noopener"` : '';
    return `
    <${tag} class="cert-row ${c.archivo ? 'has-file' : ''}" ${href}>
      <div class="cert-icon" style="background:${c.color ? hexSoft('#'+c.color) : 'var(--accent-soft)'};">
        ${c.icono ? iconMarkup(c.icono, c.color, c.iniciales) : iconMarkup(null, c.color, c.iniciales)}
      </div>
      <div class="cert-info">
        <div class="cert-name">${c.nombre}</div>
        <div class="cert-source">${c.fuente}${c.id ? ' · ID: ' + c.id : ''}</div>
      </div>
      <div class="cert-right">
        <span class="cert-date mono">${c.fecha}</span>
        ${c.archivo ? '<span class="cert-view mono">Ver diploma</span>' : '<span class="cert-pending mono">Sin archivo</span>'}
      </div>
    </${tag}>
  `;}).join('');
}

/* ---------- PROYECTOS ---------- */
function renderProyectos(list){
  const el = document.getElementById('projects-grid');
  if(!list.length){
    el.innerHTML = `
      <div class="empty-state">
        <div class="empty-kicker mono">EN CONSTRUCCIÓN</div>
        <p>Todavía no hay proyectos publicados. En cuanto termine el primero, se agrega editando <code>data/proyectos.json</code> — no requiere tocar el diseño de la página.</p>
      </div>`;
    return;
  }
  const statusMap = { live: ['status-live','En producción'], wip: ['status-wip','En desarrollo'], soon: ['status-soon','Próximamente'] };
  el.innerHTML = list.map(p => {
    const [cls, label] = statusMap[p.estado] || statusMap.soon;
    return `
    <div class="project-card">
      <div class="project-head">
        <span class="project-title">${p.titulo}</span>
        <span class="project-status ${cls} mono">${label}</span>
      </div>
      <div class="project-desc">${p.descripcion}</div>
      <div class="project-tags">${(p.tags||[]).map(t=>`<span class="project-tag mono">${t}</span>`).join('')}</div>
      ${p.link ? `<a href="${p.link}" target="_blank" rel="noopener" class="project-link">Ver proyecto →</a>` : ''}
    </div>
  `;}).join('');
}

/* ---------- nav activo al hacer scroll ---------- */
function setupScrollSpy(){
  const links = [...document.querySelectorAll('#sidenav a')];
  const sections = links.map(l => document.querySelector(l.getAttribute('href')));
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        links.forEach(l => l.classList.remove('active'));
        const idx = sections.indexOf(entry.target);
        if(idx > -1) links[idx].classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  sections.forEach(s => s && obs.observe(s));
}

/* ---------- init ---------- */
(async function init(){
  try{
    const [perfil, habilidades, experiencia, certificados, proyectos] = await Promise.all([
      loadJSON('data/perfil.json'),
      loadJSON('data/habilidades.json'),
      loadJSON('data/experiencia.json'),
      loadJSON('data/certificados.json'),
      loadJSON('data/proyectos.json'),
    ]);

    const { anios, reduccion } = renderPerfil(perfil);
    renderStats({ anios, reduccion, certsCount: certificados.length, projectsCount: proyectos.length });
    renderHabilidades(habilidades);
    renderExperiencia(experiencia);
    renderCertificados(certificados);
    renderProyectos(proyectos);
    setupScrollSpy();

    document.querySelectorAll('main > section, .stat-strip').forEach((el,i)=>{
      el.classList.add('reveal');
      el.style.animationDelay = `${i * 0.05}s`;
    });
  }catch(err){
    console.error(err);
    document.querySelector('main').innerHTML = `
      <div style="padding:3rem 1.5rem;font-family:'IBM Plex Mono',monospace;">
        <p><strong>No se pudieron cargar los datos.</strong></p>
        <p style="color:var(--ink-soft);margin-top:8px;">Si estás viendo este archivo directamente desde tu computadora (doble clic), los navegadores bloquean la carga de los JSON por seguridad. Usa un servidor local (ver README.md) o revisa la página ya publicada en GitHub Pages.</p>
      </div>`;
  }
})();
