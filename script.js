/* =============================================
   RAJALAKSHMI ENGINEERING COLLEGE — JS v3
   ============================================= */

/* ── SCROLL PROGRESS ─── */
const prog = document.getElementById('scroll-progress');
if(prog) window.addEventListener('scroll', () => {
  prog.style.width = (window.scrollY/(document.documentElement.scrollHeight-window.innerHeight)*100)+'%';
});

/* ── NAVBAR ─── */
const navbar = document.getElementById('navbar');
if(navbar) window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', window.scrollY>60));

/* ── HAMBURGER ─── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');
if(hamburger){
  hamburger.addEventListener('click',()=>{ hamburger.classList.toggle('active'); navLinks.classList.toggle('open'); });
  navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{ hamburger.classList.remove('active'); navLinks.classList.remove('open'); }));
}

/* ── HERO SLIDESHOW ─── */
const heroSlides = document.querySelectorAll('.hero-slide');
const heroDots   = document.querySelectorAll('.dot');
let curHero = 0, heroTimer;
function goHero(n){
  heroSlides[curHero].classList.remove('active'); heroDots[curHero]?.classList.remove('active');
  curHero=(n+heroSlides.length)%heroSlides.length;
  heroSlides[curHero].classList.add('active'); heroDots[curHero]?.classList.add('active');
}
if(heroSlides.length){ heroTimer=setInterval(()=>goHero(curHero+1),5500); }
heroDots.forEach(d=>d.addEventListener('click',()=>{ clearInterval(heroTimer); goHero(+d.dataset.slide); heroTimer=setInterval(()=>goHero(curHero+1),5500); }));

/* ── IDEA FACTORY SLIDES ─── */
const ideaSlides = document.querySelectorAll('.idea-slide');
const ideaDots   = document.querySelectorAll('.idea-dot');
let curIdea=0;
function goIdea(n){
  ideaSlides[curIdea].classList.remove('active'); ideaDots[curIdea]?.classList.remove('active');
  curIdea=(n+ideaSlides.length)%ideaSlides.length;
  ideaSlides[curIdea].classList.add('active'); ideaDots[curIdea]?.classList.add('active');
}
if(ideaSlides.length){ setInterval(()=>goIdea(curIdea+1),4000); }
ideaDots.forEach(d=>d.addEventListener('click',()=>goIdea(+d.dataset.i)));

/* ── REVEAL ON SCROLL ─── */
const revealEls = document.querySelectorAll('.reveal-up,.reveal-left,.reveal-right');
const revObs = new IntersectionObserver(entries=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('visible'); revObs.unobserve(e.target); } });
},{ threshold:0.1 });
revealEls.forEach(el=>revObs.observe(el));

/* ── COUNTERS ─── */
const counters = document.querySelectorAll('.stat-number');
let countersDone = false;
function runCounters(){
  counters.forEach(el=>{
    const target=+el.dataset.target, suffix=el.dataset.suffix||'', dur=2200, step=target/(dur/16);
    let cur=0;
    const tick=()=>{ cur+=step; if(cur>=target){el.textContent=target+suffix;}else{el.textContent=Math.floor(cur)+suffix;requestAnimationFrame(tick);} };
    requestAnimationFrame(tick);
  });
}
const statsEl=document.querySelector('.stats-grid');
if(statsEl) new IntersectionObserver(entries=>{ if(entries[0].isIntersecting&&!countersDone){countersDone=true;runCounters();} },{threshold:.2}).observe(statsEl);

/* ── GALLERY FILTER ─── */
const filterBtns  = document.querySelectorAll('.filter-btn');
const galleryItems= document.querySelectorAll('.masonry-item');
filterBtns.forEach(btn=>{
  btn.addEventListener('click',()=>{
    filterBtns.forEach(b=>b.classList.remove('active')); btn.classList.add('active');
    const f=btn.dataset.filter;
    galleryItems.forEach(item=>item.classList.toggle('hide', f!=='all' && item.dataset.category!==f));
  });
});

/* ── LIGHTBOX ─── */
const lightbox=document.getElementById('lightbox');
const lbImg=document.getElementById('lb-img');
const lbClose=document.getElementById('lb-close');
const lbOverlay=document.getElementById('lb-overlay');
const lbPrev=document.getElementById('lb-prev');
const lbNext=document.getElementById('lb-next');
let lbImages=[], lbIdx=0;

if(lightbox){
  function openLb(item){ lbImages=Array.from(galleryItems).filter(i=>!i.classList.contains('hide')).map(i=>i.dataset.src); lbIdx=lbImages.indexOf(item.dataset.src); lbImg.src=lbImages[lbIdx]; lightbox.classList.add('active'); document.body.style.overflow='hidden'; }
  function closeLb(){ lightbox.classList.remove('active'); document.body.style.overflow=''; }
  function lbNav(dir){ lbIdx=(lbIdx+dir+lbImages.length)%lbImages.length; lbImg.style.opacity='0'; setTimeout(()=>{lbImg.src=lbImages[lbIdx];lbImg.style.opacity='1';},150); }
  lbImg.style.transition='opacity .15s';
  galleryItems.forEach(item=>item.addEventListener('click',()=>openLb(item)));
  lbClose?.addEventListener('click',closeLb);
  lbOverlay?.addEventListener('click',closeLb);
  lbPrev?.addEventListener('click',()=>lbNav(-1));
  lbNext?.addEventListener('click',()=>lbNav(1));
  document.addEventListener('keydown',e=>{ if(!lightbox.classList.contains('active'))return; if(e.key==='Escape')closeLb(); if(e.key==='ArrowLeft')lbNav(-1); if(e.key==='ArrowRight')lbNav(1); });
}

/* ── CONTACT FORM ─── */
const form=document.getElementById('contact-form');
if(form){
  form.addEventListener('submit',e=>{
    e.preventDefault();
    const name=document.getElementById('name'), email=document.getElementById('email'), msg=document.getElementById('message');
    const en=document.getElementById('err-name'), ee=document.getElementById('err-email'), em=document.getElementById('err-msg'), es=document.getElementById('form-success');
    [en,ee,em].forEach(el=>el&&(el.textContent='')); if(es)es.textContent='';
    let ok=true;
    if(!name?.value.trim()){if(en)en.textContent='Please enter your name.';ok=false;}
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email?.value.trim()||'')){if(ee)ee.textContent='Please enter a valid email.';ok=false;}
    if((msg?.value.trim()||'').length<10){if(em)em.textContent='Message must be at least 10 characters.';ok=false;}
    if(ok&&es){es.textContent='✓ Message sent successfully! We will respond within 24 hours.';form.reset();}
  });
}

/* ── RIPPLE ─── */
document.querySelectorAll('.btn-ripple').forEach(btn=>{
  btn.addEventListener('click',e=>{
    const r=btn.getBoundingClientRect(),s=Math.max(r.width,r.height);
    const sp=document.createElement('span');
    sp.classList.add('ripple-effect');
    sp.style.cssText=`width:${s}px;height:${s}px;left:${e.clientX-r.left-s/2}px;top:${e.clientY-r.top-s/2}px`;
    btn.appendChild(sp); sp.addEventListener('animationend',()=>sp.remove());
  });
});

/* ── BACK TO TOP ─── */
const btt=document.getElementById('back-to-top');
if(btt){ window.addEventListener('scroll',()=>btt.classList.toggle('visible',window.scrollY>400)); btt.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'})); }

/* ── SMOOTH SCROLL ─── */
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',function(e){
    const t=document.querySelector(this.getAttribute('href'));
    if(t){e.preventDefault();window.scrollTo({top:t.getBoundingClientRect().top+window.scrollY-(navbar?.offsetHeight||76)-10,behavior:'smooth'});}
  });
});

/* ── MASCOT TILT ─── */
const mascot=document.getElementById('mascot-img');
if(mascot) document.addEventListener('mousemove',e=>{ const dx=(e.clientX/window.innerWidth-.5)*6; mascot.style.transform=`rotate(${dx}deg)`; });

/* ── ACTIVE NAV ─── */
const sections=document.querySelectorAll('section[id]');
const allLinks=document.querySelectorAll('.nav-links a:not(.nav-cta)');
window.addEventListener('scroll',()=>{
  let cur='';
  sections.forEach(s=>{ if(window.scrollY>=s.offsetTop-130)cur=s.id; });
  allLinks.forEach(a=>{ a.style.color=a.getAttribute('href')==='#'+cur?'var(--gold-light)':''; });
});
