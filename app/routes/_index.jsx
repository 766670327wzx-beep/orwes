import {Link} from 'react-router';
import {PrintGroup} from '~/components/PrintShop';
import {printGroups, photo} from '~/lib/print-catalog';
export const meta = () => [
  {title: 'Custom Stickers, Heat Transfers & Labels | ORWES Print'},
];
export default function Homepage() {
  return (
    <div className="print-home">
      <section className="print-hero">
        <div className="print-copy">
          <h1>
            Custom stickers, transfers &amp; <em>labels.</em>
          </h1>
          <p>
            Choose UV DTF stickers for glass and packaging, or DTF transfers for
            apparel.
          </p>
          <a href="#print-formats" className="print-btn">
            Explore print formats ↓
          </a>
        </div>
        <Link className="print-hero-art" to="/print/foil">
          <img
            src={photo('foil')}
            alt="Sheet of holographic foil labels"
            fetchPriority="high"
          />
          <span>
            Metallic foil labels <b aria-hidden="true">↗</b>
          </span>
        </Link>
      </section>
      <section className="print-intro" id="print-formats">
        <h2>Shop by print format</h2>
        <nav aria-label="Jump to a print format">
          {printGroups.map((g) => (
            <a key={g.id} href={'#' + g.id}>
              <img src={photo(g.cover)} alt="" loading="lazy" />
              <span>{g.name}</span>
              <b aria-hidden="true">↓</b>
            </a>
          ))}
        </nav>
      </section>
      {printGroups.map((g) => (
        <PrintGroup group={g} key={g.id} />
      ))}
      <div className="print-end">
        <Link className="print-btn" to="/collections/all">
          View store catalogue →
        </Link>
      </div>
    </div>
  );
}
