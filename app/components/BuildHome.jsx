import {useEffect, useState} from 'react';

const categories = {
  Bathroom: [
    'Vanities',
    'Basins',
    'Tapware',
    'Showers',
    'Baths',
    'Smart toilets',
  ],
  Kitchen: ['Kitchen mixers', 'Kitchen sinks', 'Cabinetry hardware'],
  'Doors & Windows': [
    'Entry doors',
    'Interior doors',
    'Sliding doors',
    'Aluminium windows',
  ],
  'Stone & Surfaces': [
    'Stone slabs',
    'Countertops',
    'Vanity tops',
    'Wall cladding',
  ],
  Outdoor: ['Decking', 'Screening', 'Fencing', 'Outdoor panels'],
  Lighting: ['Pendant lights', 'Wall lights', 'Outdoor lighting'],
};
const searchLink = (term) => '/search?q=' + encodeURIComponent(term);
const logo = (
  <img
    src="/materials/orwes-logo-transparent.png"
    alt="ORWES"
    width="150"
    height="31"
  />
);
export function BuildHeader() {
  const [open, setOpen] = useState(null),
    [mobile, setMobile] = useState(false);
  const close = () => {
    setOpen(null);
    setMobile(false);
  };
  useEffect(() => {
    const escape = (event) => {
      if (event.key === 'Escape') close();
    };
    document.addEventListener('keydown', escape);
    return () => document.removeEventListener('keydown', escape);
  }, []);
  return (
    <header
      className="build-header"
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) close();
      }}
    >
      <a className="skip-build" href="#MainContent">
        Skip to content
      </a>
      <div className="build-strip">
        <span>Building materials for Australian projects</span>
        <div>
          <a href="#about">About ORWES</a>
          <a href="#solutions">Projects</a>
          <a href="#project-brief">Order samples ↗</a>
        </div>
      </div>
      <div className="build-brand">
        <a className="build-logo" href="/">
          {logo}
          <small>BUILD</small>
        </a>
        <div>
          <a href="#home-product-search">Search</a>
          <a href="/cart">Cart</a>
          <a className="build-cta" href="#project-brief">
            Request a project quote ↗
          </a>
          <button
            className="build-menu"
            aria-expanded={mobile}
            onClick={() => setMobile(!mobile)}
          >
            Menu ☰
          </button>
        </div>
      </div>
      <nav
        className={'build-nav ' + (mobile ? 'is-open' : '')}
        aria-label="Main navigation"
      >
        {Object.entries(categories).map(([label, items]) => (
          <div key={label}>
            <button
              aria-expanded={open === label}
              onClick={() => setOpen(open === label ? null : label)}
            >
              {label} ⌄
            </button>
            {open === label && (
              <div className="build-drop">
                <a href={searchLink(label)}>Explore {label} ↗</a>
                {items.map((item) => (
                  <a key={item} href={searchLink(item)}>
                    {item}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
        <a href="#solutions" onClick={close}>
          Solutions ⌄
        </a>
        <a href="#resources" onClick={close}>
          Resources ⌄
        </a>
      </nav>
    </header>
  );
}
const storageKey = 'orwes.project-brief.v1';
function formatBrief(data) {
  return data.map(([name, value]) => name + ' — ' + value).join('\n');
}
export function ProjectBrief() {
  const [saved, setSaved] = useState(''),
    [review, setReview] = useState('');
  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem(storageKey) || '[]');
      for (const [name, value] of data) {
        const controls = document.getElementsByName(name);
        for (const c of controls) {
          if (c.form?.id !== 'build-brief') continue;
          if (c.type === 'checkbox') {
            if (c.value === value) c.checked = true;
          } else c.value = value;
        }
      }
    } catch {
      /* Storage may be unavailable. */
    }
  }, []);
  function handle(e) {
    e.preventDefault();
    const data = [...new FormData(e.currentTarget)].filter(([, v]) =>
      String(v).trim(),
    );
    if (!data.length) {
      setSaved('Add a project detail to prepare your brief.');
      return;
    }
    if (e.nativeEvent.submitter?.value === 'save') {
      try {
        localStorage.setItem(storageKey, JSON.stringify(data));
        setSaved('Project brief saved in this browser.');
      } catch {
        setSaved('Storage unavailable. Review your brief to download it.');
      }
    } else {
      setSaved('');
      setReview(formatBrief(data));
    }
  }
  return (
    <section className="build-brief" id="project-brief">
      <div>
        <p className="build-eyebrow">Your next step</p>
        <h2>
          A clearer brief.
          <br />A useful first conversation.
        </h2>
        <p>Bring your material needs together before you speak with us.</p>
        <ol>
          <li>Outline your project and materials.</li>
          <li>Review or download your brief.</li>
          <li>Send it with your drawings by email.</li>
        </ol>
      </div>
      <form
        id="build-brief"
        onSubmit={handle}
        onChange={() => {
          setReview('');
          setSaved('');
        }}
      >
        <label>
          I am a
          <select name="Role">
            <option value="">Choose a role (optional)</option>
            {[
              'Builder',
              'Developer',
              'Architect or designer',
              'Hospitality',
              'Homeowner',
            ].map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
        </label>
        <label>
          Project location
          <input name="Location" placeholder="City or postcode" />
        </label>
        <label>
          Project stage
          <select name="Stage">
            <option value="">Choose a stage (optional)</option>
            {[
              'Early planning',
              'Design and specification',
              'Comparing quotations',
              'Ready to order',
              'Under construction',
            ].map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
        </label>
        <label>
          Preferred site delivery
          <input name="Delivery" placeholder="Month or timeframe" />
        </label>
        <fieldset>
          <legend>Which materials are you considering?</legend>
          {Object.keys(categories).map((v) => (
            <label key={v}>
              <input type="checkbox" name="Materials" value={v} />
              {v}
            </label>
          ))}
        </fieldset>
        <label className="brief-wide">
          Project details / questions
          <textarea name="Details" rows="4" />
        </label>
        <button value="review">Review project brief</button>
        <button value="save">Save project brief</button>
        <p className="brief-wide" role="status">
          {saved}
        </p>
        {review && (
          <div className="brief-wide">
            <pre>{review}</pre>
            <a
              download="project-brief.txt"
              href={
                'data:text/plain;charset=utf-8,' + encodeURIComponent(review)
              }
            >
              Download brief ↧
            </a>
          </div>
        )}
      </form>
    </section>
  );
}
export function BuildFooter() {
  return (
    <footer className="build-footer">
      <div>
        {logo}
        <p>
          Building Better Projects.
          <br />
          Together.
        </p>
      </div>
      <div>
        <h3>Products</h3>
        {Object.keys(categories).map((v) => (
          <a key={v} href={searchLink(v)}>
            {v}
          </a>
        ))}
      </div>
      <div>
        <h3>Resources</h3>
        <a href="#home-journal">Project notes</a>
        <a href="#resources">Project tools</a>
        <a href="#project-brief">Project brief</a>
      </div>
      <div>
        <h3>Contact</h3>
        <a href="#project-brief">Prepare an enquiry ↗</a>
      </div>
      <a className="build-contact" href="#project-brief">
        Contact ORWES ↗
      </a>
    </footer>
  );
}
