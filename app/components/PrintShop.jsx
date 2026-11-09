import {Link} from 'react-router';
import {printGroups, photo, printPath} from '~/lib/print-catalog';

export function PrintHeader() {
  return (
    <>
      <div className="print-strip">
        Custom stickers · Heat transfers · Printed labels
      </div>
      <header className="print-head">
        <Link
          to="/"
          className="print-wordmark"
          aria-label="ORWES Print homepage"
        >
          orwes<span>print</span>
        </Link>
        <nav aria-label="Shop by category">
          {printGroups.map((g) => (
            <Link key={g.id} to={'/#' + g.id}>
              {g.name}
            </Link>
          ))}
        </nav>
        <div className="print-tools">
          <Link to="/search" aria-label="Search products">
            <svg viewBox="0 0 24 24">
              <circle cx="10.5" cy="10.5" r="6.5" />
              <path d="m16 16 5 5" />
            </svg>
          </Link>
          <Link to="/cart" aria-label="Shopping bag">
            <svg viewBox="0 0 24 24">
              <path d="M4 8h16l1 13H3L4 8ZM8 9V6a4 4 0 0 1 8 0v3" />
            </svg>
          </Link>
        </div>
      </header>
    </>
  );
}
export function PrintFooter() {
  return (
    <footer className="print-foot">
      <Link className="print-wordmark" to="/">
        orwes<span>print</span>
      </Link>
      <nav>
        <Link to="/collections/all">Shop all products</Link>
        <Link to="/account">My account</Link>
        <Link to="/policies">Store policies</Link>
      </nav>
    </footer>
  );
}
export function PrintGroup({group}) {
  return (
    <section id={group.id} className="print-group">
      <div className="print-section-title">
        <div>
          <h2>{group.name}</h2>
          <p>{group.intro}</p>
        </div>
      </div>
      <div className="print-grid">
        {group.items.map(([id, name]) => (
          <Link key={id} to={printPath(id)}>
            <img loading="lazy" src={photo(id)} alt={name} />
            <strong>{name}</strong>
            <span aria-hidden="true">↗</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
