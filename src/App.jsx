import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, ArrowUp, X, List, Plus, Minus, EnvelopeSimple, Phone, WhatsappLogo, LinkedinLogo, GithubLogo, MapPin, PaintBrush, Compass, ChartLineUp, SquaresFour, Check, Copy, CaretDown } from '@phosphor-icons/react';
import { books, credentials, email, phone, services, studies, whatsapp } from './content';

const nav = [['Home','home'],['Work','work'],['About','about'],['Services','services'],['Books','books'],['Contact','contact']];
const toolGroups = [
  {label:'Design', note:'Brand and interface', tools:[
    {name:'Photoshop',role:'Image editing and visual finishing',tone:'photoshop'},
    {name:'Illustrator',role:'Logos, marks and vector artwork',tone:'illustrator'},
    {name:'Figma',role:'Interface and layout design',tone:'figma'},
  ]},
  {label:'Data', note:'Reporting and platform', tools:[
    {name:'Power BI',role:'Dashboards and data storytelling',tone:'powerbi'},
    {name:'Microsoft Fabric',role:'Analytics and data platform',tone:'fabric'},
    {name:'Microsoft Security',role:'Security and compliance foundations',tone:'security'},
  ]},
];

const adobeTile=(bg,text,letters)=>(<svg viewBox="0 0 40 40"><rect width="40" height="40" rx="8" fill={bg}/><text x="20" y="27" textAnchor="middle" fontFamily="Arial,Helvetica,sans-serif" fontWeight="700" fontSize="18" fill={text}>{letters}</text></svg>);
const toolIcons = {
  photoshop: adobeTile('#001E36','#31A8FF','Ps'),
  illustrator: adobeTile('#330000','#FF9A00','Ai'),
  figma: (<svg viewBox="0 0 38 57"><path fill="#1ABCFE" d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z"/><path fill="#0ACF83" d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z"/><path fill="#FF7262" d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z"/><path fill="#F24E1E" d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z"/><path fill="#A259FF" d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z"/></svg>),
  powerbi: (<svg viewBox="0 0 24 24"><rect x="3" y="11" width="4.5" height="10" rx="1.2" fill="#E8A500"/><rect x="9.75" y="6.5" width="4.5" height="14.5" rx="1.2" fill="#F2C811"/><rect x="16.5" y="2" width="4.5" height="19" rx="1.2" fill="#F2C811"/><rect x="16.5" y="11" width="4.5" height="10" rx="1.2" fill="#E8A500"/></svg>),
  fabric: (<svg viewBox="0 0 24 24"><path fill="#117865" d="M12 2 4 6.5v11L12 22z"/><path fill="#37C6A0" d="M12 2l8 4.5v11L12 22z"/><path fill="#0B5A4B" d="M12 8.5 4 6.5 12 2l8 4.500z" opacity=".55"/><path fill="#fff" fillOpacity=".85" d="M12 9.5 8.5 11.5v3L12 16.500l3.500-2v-3z"/></svg>),
  security: (<svg viewBox="0 0 24 24"><path fill="#0078D4" d="M12 2 4 5v6c0 5 3.400 9.200 8 11 4.600-1.800 8-6 8-11V5z"/><path fill="#fff" d="M8.500 8.500h3.300v3.300H8.500zM12.200 8.500h3.300v3.300h-3.300zM8.500 12.200h3.300v3.300H8.500zM12.200 12.200h3.300v3.300h-3.300z"/></svg>),
};

function OrbitPattern({tone='light', side='left', hero=false}) {
  const ref=useRef(null);
  useEffect(()=>{
    const node=ref.current;
    if(!node)return;
    if(!('IntersectionObserver' in window)){node.dataset.active='true';return;}
    const observer=new IntersectionObserver(([entry])=>{node.dataset.active=String(entry.isIntersecting);},{rootMargin:'120px',threshold:0});
    observer.observe(node);return ()=>observer.disconnect();
  },[]);
  return <div ref={ref} className={`orbit-pattern ${hero?'hero-orbits':''} orbit-pattern-${tone} orbit-pattern-${side}`} aria-hidden="true" data-active="false">
    {['one','two','three','four','five','six'].map(orbit=><div className={`hero-orbit hero-orbit-${orbit}`} key={orbit}><span className="orbit-traveller"/></div>)}
  </div>;
}

function Label({children, light=false}) { return <p className={`eyebrow ${light ? 'eyebrow-light' : ''}`}>{children}</p>; }
function SectionLabel({children, light=false}) { return <p className={`section-label ${light?'section-label-light':''}`}>{children}</p>; }
function Mark() { return <a className="wordmark" href="#home" aria-label="Alfred, back to home">ALFRED<span>.</span></a>; }

function Reveal({children, className=''}) {
  const ref=useRef(null);
  useEffect(()=>{
    const element=ref.current;
    if(!element || matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
    const observer=new IntersectionObserver(([entry])=>{if(entry.isIntersecting){element.classList.add('revealed');observer.unobserve(element);}},{threshold:.08});
    element.classList.add('reveal-ready');observer.observe(element);
    return ()=>observer.disconnect();
  },[]);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

function Header() {
  const [open,setOpen]=useState(false), [scrolled,setScrolled]=useState(false), [active,setActive]=useState('');
  const header=useRef(null), toggle=useRef(null);
  useEffect(()=>{
    let frame;
    const update=()=>{
      frame=undefined;setScrolled(window.scrollY>50);
      let current=''; for(const [,id] of nav){if(document.getElementById(id)?.getBoundingClientRect().top<=170) current=id;}if(window.scrollY+innerHeight>=document.documentElement.scrollHeight-4)current='contact';setActive(current);
    };
    const schedule=()=>{if(frame===undefined)frame=requestAnimationFrame(update);};
    update();window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule);
    return ()=>{window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule);if(frame!==undefined)cancelAnimationFrame(frame);};
  },[]);
  useEffect(()=>{
    if(!open)return;
    const key=(event)=>{if(event.key==='Escape'){setOpen(false);toggle.current?.focus();}};
    const outside=(event)=>{if(!header.current?.contains(event.target))setOpen(false);};
    window.addEventListener('keydown',key);window.addEventListener('pointerdown',outside);
    return ()=>{window.removeEventListener('keydown',key);window.removeEventListener('pointerdown',outside);};
  },[open]);
  return <header ref={header} className={`site-header ${scrolled || open ? 'header-solid' : ''}`}>
    <div className="container header-inner"><Mark /><a className="mobile-home" href="#home" aria-current={active==='home'?'location':undefined} onClick={()=>setOpen(false)}>Home</a><button ref={toggle} className="menu-toggle icon-button" aria-label={open?'Close menu':'Open menu'} aria-expanded={open} aria-controls="primary-nav" onClick={()=>setOpen(!open)}>{open?<X size={24}/>:<List size={24}/>}</button>
      <nav id="primary-nav" className={open?'nav-open':''} aria-label="Main navigation">{nav.map(([label,id])=><a key={id} href={`#${id}`} aria-current={active===id?'location':undefined} onClick={()=>setOpen(false)}>{label}</a>)}</nav>
      <a className="button button-small header-cta" href="#contact">Let’s talk <ArrowRight size={18}/></a>
    </div>
  </header>;
}

function Portrait({hero=false}) {
  const [colour,setColour]=useState(false);
  return <button className={`portrait ${hero?'hero-profile-portrait':'about-portrait'} ${colour?'portrait-colour':''}`} onClick={()=>setColour(!colour)} aria-label="Keep portrait in colour" aria-pressed={colour}>
    <img src="/images/alfred-portrait.png" alt="Alfred Tackie-Quaye" width="1586" height="1544" loading={hero?'eager':'lazy'} fetchPriority={hero?'high':'auto'}/><span className="portrait-light" aria-hidden="true"/>
    {!hero&&<span className="portrait-caption"><strong>Alfred Tackie-Quaye</strong><span>Designer + data professional</span></span>}
  </button>;
}

function StudyModal({study,onClose,onInquire}) {
  const ref=useRef(null);
  useEffect(()=>{
    if(!study)return;
    const previous=document.activeElement;ref.current?.showModal();
    const old=document.body.style.overflow;document.body.style.overflow='hidden';
    return ()=>{document.body.style.overflow=old;ref.current?.close();previous?.focus?.();};
  },[study]);
  return <dialog ref={ref} className="study-dialog" aria-labelledby="study-title" onCancel={onClose} onClick={e=>{if(e.target===e.currentTarget)onClose();}}>
    {study&&<>
      <div className="study-toolbar"><span>Project overview</span><button className="modal-close icon-button" aria-label="Close project" onClick={onClose}><X size={24}/></button></div>
      <div className="study-modal">
        <img className="modal-image" src={study.image} alt={study.title}/>
        <div className="modal-copy">
          <Label>Concept study / {study.category}</Label><h2 id="study-title">{study.title}</h2>
          <p className="study-format">{study.format}</p>
          <div className="study-question"><h3>The brief</h3><p>{study.brief}</p></div>
          <div className="modal-columns">
            <div><h3>Design decisions</h3><ol className="study-decisions">{study.decisions.map(decision=><li key={decision.title}><h4>{decision.title}</h4><p>{decision.detail}</p></li>)}</ol></div>
            <div><h3>What’s shown</h3><ul>{study.presentation.map(item=><li key={item}>{item}</li>)}</ul><h3>Scope of the study</h3><p>{study.scope}</p></div>
          </div>
          <p className="concept-disclosure">{study.note}</p>
          <a className="button button-blue" href="#contact" onClick={()=>onInquire(study)}>Discuss something similar <ArrowUpRight size={18}/></a>
        </div>
      </div>
    </>}
  </dialog>;
}

function Contact({selectedService,setSelectedService,projectContext,onClearProject}) {
  const [notice,setNotice]=useState(''),[draft,setDraft]=useState(''),[copied,setCopied]=useState(false),[fallback,setFallback]=useState('');
  useEffect(()=>{setNotice('');setDraft('');setFallback('');},[selectedService,projectContext]);
  const fallbackRef=useRef(null);
  useEffect(()=>{if(fallback){fallbackRef.current?.focus();fallbackRef.current?.select();}},[fallback]);
  function inquiry(form){
    const data=new FormData(form);
    const service=data.get('service') || 'Project inquiry';
    const project=data.get('project');
    const subject=project ? `${service} — ${project}` : service;
    const body=`Hello Alfred,\n\nName: ${data.get('name')}\nEmail: ${data.get('email')}\nArea of interest: ${service}\n${project ? `Reference concept: ${project}\n` : ''}\n${data.get('message')}\n`;
    return {subject,body};
  }
  function submit(e){
    e.preventDefault();const form=e.currentTarget;if(!form.reportValidity())return;
    const {subject,body}=inquiry(form);
    const url=`mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setDraft(url);setFallback('');setNotice('Your email draft is ready. Review and send it in your email app. If it does not open, use Copy inquiry.');window.location.href=url;
  }
  async function copyInquiry(e){
    const form=e.currentTarget.form;if(!form.reportValidity())return;
    const {subject,body}=inquiry(form);
    const text=`To: ${email}\nSubject: ${subject}\n\n${body}`;
    try{await navigator.clipboard.writeText(text);setFallback('');setNotice('Inquiry copied. Paste it into your email or messaging app and send it to Alfred.');}
    catch{setFallback(text);setNotice('Select and copy your inquiry below, then paste it into your email or messaging app.');}
  }
  async function copy(){try{await navigator.clipboard.writeText(email);setCopied(true);setTimeout(()=>setCopied(false),2200);}catch{setNotice('You can email me directly at '+email);}}
  return <section className="contact-section orbit-surface" id="contact" aria-labelledby="contact-heading"><OrbitPattern tone="light" side="right"/><div className="container contact-grid"><Reveal className="contact-intro"><SectionLabel light>Contact</SectionLabel><h2 id="contact-heading">Good things start<br/>with a <em>conversation.</em></h2><p>A brand to build. An experience to improve. A story hiding in your data. Tell me what you have in mind.</p><div className="contact-links"><div><EnvelopeSimple size={22}/><a href={`mailto:${email}`}>{email}</a><button className="icon-button" onClick={copy} aria-label="Copy email">{copied?<Check size={18}/>:<Copy size={18}/>}</button></div><div><Phone size={22}/><a href="tel:+233240791866">{phone}</a></div><div><MapPin size={22}/><span>Accra, Ghana · Available worldwide</span></div></div><p role="status" className="copy-status">{copied?'Email copied.':''}</p><a className="whatsapp-link" href={whatsapp} target="_blank" rel="noreferrer"><WhatsappLogo size={20}/>Prefer WhatsApp? Let’s chat <ArrowUpRight size={17}/></a></Reveal>
    <Reveal><form className="contact-form" onSubmit={submit} aria-describedby="contact-instructions" onChange={()=>{setNotice('');setDraft('');setFallback('');}}><div className="form-heading"><span>YOUR NEXT PROJECT</span><h3>What are we creating?</h3><p id="contact-instructions">Complete the fields to prepare an email draft. You’ll review and send it in your email app.</p></div>{projectContext&&<div className="inquiry-context"><div><span>Inspired by</span><strong>{projectContext.title}</strong></div><button type="button" className="icon-button" aria-label="Clear project reference" onClick={onClearProject}><X size={18}/></button><input type="hidden" name="project" value={projectContext.title}/></div>}<div className="form-row"><label>Your name<input name="name" required autoComplete="name" maxLength={120} placeholder="Full name"/></label><label>Email address<input name="email" type="email" required autoComplete="email" maxLength={200} placeholder="you@company.com"/></label></div><label>I’m interested in<select name="service" required value={selectedService} onChange={e=>setSelectedService(e.target.value)}><option value="" disabled>Select an area</option>{services.map(s=><option key={s.number}>{s.title}</option>)}<option>Books & writing</option><option>Other collaboration</option><option>Help me choose</option></select></label><label>A little about your project<textarea name="message" rows={4} required minLength={10} maxLength={5000} placeholder="Your idea, your challenge, or what you’d like to achieve…"/></label><div className="form-footer"><p>You choose when to send.<br/>No email app? Copy your inquiry instead.</p><div className="inquiry-actions"><button className="button button-blue" type="submit">Prepare email <ArrowUpRight size={18}/></button><button className="text-link copy-inquiry" type="button" onClick={copyInquiry}>Copy inquiry <Copy size={17}/></button></div></div><div role="status" className="form-status">{notice}{draft&&<> <a href={draft}>Open email draft again</a></>}</div>{fallback&&<label className="inquiry-fallback">Your inquiry text<textarea ref={fallbackRef} readOnly value={fallback} rows={8}/></label>}</form></Reveal></div></section>;
}

export function App() {
  const [study,setStudy]=useState(null),[selectedService,setSelectedService]=useState(''),[selectedBook,setSelectedBook]=useState(null);
  const [projectContext,setProjectContext]=useState(null);
  const bookDialog=useRef(null);
  useEffect(()=>{
    if(!selectedBook)return;const previous=document.activeElement;bookDialog.current?.showModal();const old=document.body.style.overflow;document.body.style.overflow='hidden';
    return ()=>{document.body.style.overflow=old;bookDialog.current?.close();previous?.focus?.();};
  },[selectedBook]);
  function inquire(service){setProjectContext(null);setSelectedService(service);document.getElementById('contact')?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});history.replaceState(null,'','#contact');}
  return <>
    <a className="skip-link" href="#main">Skip to content</a><Header/>
    <main id="main">
    <section className="hero" id="home" aria-labelledby="hero-title">
      <OrbitPattern hero/>
      <div className="hero-scene">
        <div className="hero-art-frame"><img className="hero-art" src="/images/cobalt-hero-colour.png" alt="Laptop, blue brand stationery, and a dashboard concept" fetchPriority="high"/></div>
        <div className="hero-portrait-frame"><Portrait hero/></div>
      </div>
      <div className="container hero-content">
        <p className="hero-kicker">Alfred Tackie-Quaye · Design + Data</p>
        <h1 id="hero-title">Good design.<br/>Clear thinking.<br/>Useful outcomes.</h1>
        <div className="hero-intro">
          <p>I help organisations build recognisable brands, useful digital experiences, and Power BI dashboards that make information easier to act on.</p>
          <div className="hero-actions"><a className="button" href="#work">Explore selected work <ArrowRight size={19}/></a><a className="text-link hero-contact-link" href="#contact">Discuss your project <ArrowUpRight size={16}/></a></div>
          <p className="hero-location">Based in Ghana · Working worldwide</p>
        </div>
      </div>
    </section>

    <section className="work-section orbit-surface" id="work" aria-labelledby="work-heading"><OrbitPattern tone="ink" side="right"/><div className="container"><Reveal className="section-heading"><div><SectionLabel>Selected Work</SectionLabel><h2 id="work-heading">Ideas into<br/>things that work.</h2></div><p>A small selection of concept work that shows how brand and data can work together to create clarity, credibility, and momentum.</p></Reveal><div className="work-gallery">{studies.map((item,i)=><Reveal key={item.id} className={`work-row ${i%2?'work-row-reverse':''}`}><button className="project-image" onClick={()=>setStudy(item)} aria-label={`View ${item.title}`}><img src={item.image} alt={i?'Silver laptop displaying a blue and white dashboard concept':'Cobalt-blue brand book, stationery, and business cards on stone'} width="1600" height="900" loading="lazy"/><span className="image-action"><ArrowUpRight size={24}/></span></button><div className="project-copy"><Label>Concept study</Label><h3>{item.name}<span className="project-kind">{item.kind}</span></h3><p>{item.description}</p><button className="text-link" onClick={()=>setStudy(item)}>View project <ArrowRight size={18}/></button></div></Reveal>)}</div></div></section>

    <section className="about-section orbit-surface" id="about" aria-labelledby="about-heading"><OrbitPattern tone="ink" side="left"/><div className="container"><SectionLabel>About Me</SectionLabel><div className="about-grid"><Reveal className="about-visual"><Portrait/></Reveal><Reveal className="about-copy"><h2 id="about-heading">Creative thinking.<br/>Analytical depth.<br/><em>Clear business purpose.</em></h2><p className="lead">I’m Alfred Tackie-Quaye, a Ghana-based designer and data professional. I connect brand, digital experience, and data to help organisations communicate clearly and make information useful.</p><ul className="about-benefits" aria-label="How I can help your business"><li><span className="about-benefit-number" aria-hidden="true">01</span><div><h3>A brand people recognise</h3><p>A consistent visual identity that gives your business a clear, distinctive presence.</p></div></li><li><span className="about-benefit-number" aria-hidden="true">02</span><div><h3>Digital experiences that guide</h3><p>Clear interfaces and journeys that help people find what they need and take the next step.</p></div></li><li><span className="about-benefit-number" aria-hidden="true">03</span><div><h3>Data you can act on</h3><p>Power BI dashboards that bring key information into focus and support better-informed decisions.</p></div></li></ul><p className="about-approach">Your goals and your audience come first. They guide the decisions, from the first conversation to the final detail.</p><div className="about-actions"><a className="button button-blue" href="#contact">Let’s discuss your project <ArrowUpRight size={18}/></a><a className="text-link" href="#work">View selected work <ArrowRight size={18}/></a></div></Reveal><Reveal className="about-toolkit"><div className="toolkit-heading"><div><p>Creative + analytical</p><h3 id="toolkit-heading">My everyday toolkit</h3></div><SquaresFour size={26} weight="light" aria-hidden="true"/></div><div className="toolkit-groups" role="group" aria-labelledby="toolkit-heading">{toolGroups.map((group,g)=><section className="toolkit-group" key={group.label} aria-label={group.label}><div className="toolkit-group-head"><span>{group.label}</span><small>{group.note}</small></div><ul className="toolkit-list">{group.tools.map((tool,i)=><li className={`toolkit-item toolkit-${tool.tone}`} style={{'--i':g*3+i}} key={tool.name}><span className="toolkit-mark" aria-hidden="true">{toolIcons[tool.tone]}</span><span className="toolkit-text"><span className="toolkit-name">{tool.name}</span><span className="toolkit-role">{tool.role}</span></span></li>)}</ul></section>)}</div></Reveal></div></div></section>

    <section className="services-section orbit-surface" id="services" aria-labelledby="services-heading"><OrbitPattern tone="ink" side="right"/><div className="container"><Reveal className="section-heading"><div><SectionLabel>Services</SectionLabel><h2 id="services-heading">Different disciplines.<br/><em>One clear purpose.</em></h2></div><p>Bring one challenge or connect the dots across your brand, digital experience, and data.</p></Reveal><div className="service-list">{services.map((s,i)=>{const Icon=[PaintBrush,SquaresFour,Compass,ChartLineUp][i];return <Reveal key={s.number}><details className="service"><summary><span className="service-number">{s.number}</span><Icon className="service-icon" size={30} weight="light"/><div><h3>{s.title}</h3><p>{s.short}</p><span className="service-preview">{s.preview}</span></div><Plus className="expand-icon" size={24}/><Minus className="collapse-icon" size={24}/></summary><div className="service-body"><p>{s.description} {s.details}</p><div className="service-deliverables"><h4>What you receive</h4><ul>{s.deliverables.split(' · ').map(item=><li key={item}>{item}</li>)}</ul></div><button className="text-link" onClick={()=>inquire(s.title)}>Discuss this service <ArrowUpRight size={18}/></button></div></details></Reveal>;})}</div><Reveal className="service-guidance"><div><h3>Not sure where to start?</h3><p>Tell me what you want to improve. We can identify the right starting point together.</p></div><button className="text-link" onClick={()=>inquire('Help me choose')}>Help me choose a service <ArrowUpRight size={18}/></button></Reveal></div></section>

    <section className="process-section orbit-surface" id="process" aria-labelledby="process-heading"><OrbitPattern tone="light" side="left"/><div className="container"><Reveal><SectionLabel light>My Process</SectionLabel><h2 id="process-heading">Thought through.<br/><em>Made with intention.</em></h2></Reveal><div className="process-grid">{[['Clarify','We discuss your goals, audience, and current challenge, then agree on a brief that defines the problem and what the project needs to achieve.'],['Plan','We agree on the scope, priorities, deliverables, and review points, so you know what is included and how the work will progress.'],['Design','I develop the visual direction, interface, or dashboard around the agreed brief, and share the thinking behind the key decisions for your review.'],['Refine','We review the work together. I use your feedback and relevant checks to improve clarity, consistency, and usability within the agreed scope.'],['Deliver','I prepare the agreed files or report, explain how to use them, and confirm any remaining handover steps so you know what comes next.']].map(([title,text],i)=><Reveal key={title}><span className="process-number">0{i+1}</span><h3>{title}</h3><p>{text}</p></Reveal>)}</div><div className="process-next"><p>Have a project in mind? Let’s start with what you want to achieve.</p><a className="text-link" href="#contact">Let’s discuss your project <ArrowUpRight size={18}/></a></div><div className="learning-row" aria-labelledby="credentials-heading"><div className="credentials-heading"><div><p>Knowledge behind the work</p><h3 id="credentials-heading">Certifications &amp; professional learning</h3></div></div><ul className="credentials-grid">{credentials.map(([code,title])=><li className="credential-card" key={code}><div className="credential-provider">{code==='ITIL'?<SquaresFour size={24} weight="light" aria-hidden="true"/>:<svg className="microsoft-mark" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path fill="#f25022" d="M0 0h11v11H0z"/><path fill="#7fba00" d="M13 0h11v11H13z"/><path fill="#00a4ef" d="M0 13h11v11H0z"/><path fill="#ffb900" d="M13 13h11v11H13z"/></svg>}<span>{code==='ITIL'?'ITIL':'Microsoft'}</span></div><h4>{code}</h4><p>{title}</p></li>)}</ul></div></div></section>

    <section className="books-section orbit-surface" id="books" aria-labelledby="books-heading"><OrbitPattern tone="ink" side="right"/><div className="container"><Reveal className="section-heading"><div><SectionLabel>Books</SectionLabel><h2 id="books-heading">Ideas worth<br/><em>turning a page for.</em></h2></div><p>Practical guides and personal reflections on AI, productivity, and purpose. Written by Alfred Tackie-Quaye.</p></Reveal><div className="books-grid">{books.map((book,i)=><Reveal key={book.title}><div className="book" role="button" tabIndex={0} onClick={()=>setSelectedBook(book)} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();setSelectedBook(book);}}} aria-label={`Read about ${book.title}`}><div className={`book-stage book-stage-${i}`}><img src={book.image} alt={`${book.title} cover`} width="400" height="600" loading="lazy"/></div><div className="book-copy"><span>{book.topic} · {book.platform}</span><h3>{book.title}</h3><p className="book-description">{book.description}</p><div className="book-card-actions"><a className="button button-blue book-buy-btn" href={book.url} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()}>Get on {book.platform} <ArrowUpRight size={14}/></a><span className="book-action">Details <ArrowRight size={14}/></span></div></div></div></Reveal>)}</div></div></section>

    <Contact selectedService={selectedService} setSelectedService={setSelectedService} projectContext={projectContext} onClearProject={()=>setProjectContext(null)}/>
    </main>
    <footer className="site-footer"><div className="container"><Mark/><p>© {new Date().getFullYear()} Alfred Tackie-Quaye</p><div><a href="https://www.linkedin.com/in/alfred-tackie-quaye-93b28314b" target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedinLogo size={21}/></a><a href="https://github.com/AlfredTQ" target="_blank" rel="noreferrer" aria-label="GitHub"><GithubLogo size={21}/></a><a href="#home" className="back-top">Back to top <ArrowUp size={17}/></a></div></div></footer>
    <StudyModal study={study} onClose={()=>setStudy(null)} onInquire={item=>{setSelectedService(item.service);setProjectContext({title:item.title});setStudy(null);}}/>
    <dialog ref={bookDialog} className="book-dialog" aria-labelledby="book-title" onCancel={()=>setSelectedBook(null)} onClick={e=>{if(e.target===e.currentTarget)setSelectedBook(null);}}>{selectedBook&&<div className="book-modal"><button className="modal-close icon-button" aria-label="Close book details" onClick={()=>setSelectedBook(null)}><X size={24}/></button><img src={selectedBook.image} alt={`${selectedBook.title} cover`}/><div><Label>Books & writing</Label><h2 id="book-title">{selectedBook.title}</h2><p>{selectedBook.description}</p><p className="book-author">Written by Alfred Tackie-Quaye</p><div className="book-modal-actions">{selectedBook.url&&<a className="button button-blue" href={selectedBook.url} target="_blank" rel="noopener noreferrer">Get on {selectedBook.platform} <ArrowUpRight size={18}/></a>}<a className="text-link" href={`mailto:${email}?subject=${encodeURIComponent('Book inquiry: '+selectedBook.title)}`}>Ask about availability <ArrowUpRight size={18}/></a></div></div></div>}</dialog>
  </>;
}
