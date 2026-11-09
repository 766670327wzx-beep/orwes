import {Link, useLoaderData} from 'react-router';
import {printGroups, photo} from '~/lib/print-catalog';
import {ProductItem} from '~/components/ProductItem';
import {SheetPlanner} from '~/components/SheetPlanner';
export async function loader({params, context}) {
  const group = printGroups.find((g) =>
    g.items.some(([id]) => id === params.format),
  );
  if (!group) throw new Response('Print format not found', {status: 404});
  const [id, name] = group.items.find(([id]) => id === params.format);
  const term = id.startsWith('uv-')
    ? 'UV DTF'
    : id.startsWith('dtf-')
      ? 'DTF'
      : name.split(' ').slice(-2).join(' ');
  const data = await context.storefront.query(
    `#graphql
 query MatchingPrintProducts($query:String!) {products(first:8,query:$query){nodes{id handle title featuredImage{id url altText width height} priceRange{minVariantPrice{amount currencyCode}}}}}
 `,
    {variables: {query: term}, cache: context.storefront.CacheShort()},
  );
  return {group, id, name, products: data.products.nodes};
}
export const meta = ({data}) => [
  {title: (data?.name || 'Print formats') + ' | ORWES Print'},
];
export default function PrintFormat() {
  const {group, id, name, products} = useLoaderData();
  return (
    <article className="print-detail">
      <Link to={'/#' + group.id}>← {group.name}</Link>
      <div className="print-detail-grid">
        <img src={photo(id)} alt={name} />
        <div>
          <h1>{name}</h1>
          <p>{group.intro}</p>
          {id.endsWith('builder') ? (
            <SheetPlanner />
          ) : (
            <a className="print-btn" href="#available">
              View available products ↓
            </a>
          )}
        </div>
      </div>
      <section id="available">
        <h2>Available products</h2>
        {products.length ? (
          <div className="products-grid">
            {products.map((p) => (
              <ProductItem key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <p>
            No matching products are currently listed.{' '}
            <Link to="/collections/all">Browse the store catalogue →</Link>
          </p>
        )}
      </section>
    </article>
  );
}
