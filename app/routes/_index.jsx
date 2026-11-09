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
            Custom stickers,
            <br />
            transfers &amp; labels<span>.</span>
          </h1>
          <p>
            Explore print finishes for your packaging, apparel and merchandise.
          </p>
          <a href="#uv" className="print-btn">
            Browse print options ↗
          </a>
        </div>
        <div className="print-hero-art">
          <img src={photo('foil')} alt="Metallic label samples" />
          <img src={photo('wrap')} alt="Floral cup wrap designs" />
          <img src={photo('paper')} alt="Paper labels on packaging" />
        </div>
      </section>
      <div className="print-intro">
        <h2>Find your print format</h2>
        <nav>
          {printGroups.map((g) => (
            <a key={g.id} href={'#' + g.id}>
              {g.name} ↓
            </a>
          ))}
        </nav>
      </div>
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
