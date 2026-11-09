import {useLoaderData} from 'react-router';
import {Image} from '@shopify/hydrogen';
import {BuildHeader, ProjectBrief, BuildFooter} from '~/components/BuildHome';
import styles from '~/styles/build-home.css?url';
export const links = () => [{rel: 'stylesheet', href: styles}];
export const meta = () => [
  {title: 'Building Materials Australia | ORWES BUILD'},
];
export async function loader({context}) {
  if (!context.env.PUBLIC_STORE_DOMAIN) return {products: []};
  const data = await context.storefront.query(
    `#graphql
    query HomepageProducts { products(first: 6) { nodes { id handle title vendor featuredImage { url altText width height } } } }
  `,
    {cache: context.storefront.CacheShort()},
  );
  return {products: data.products.nodes};
}
function FeaturedProducts() {
  const {products} = useLoaderData();
  if (!products.length) return null;
  return (
    <section className="featured-build">
      <p className="build-eyebrow">Selected for your project</p>
      <h2>Explore product details.</h2>
      <div>
        {products.map((p) => (
          <a key={p.id} href={'/products/' + p.handle}>
            {p.featuredImage && (
              <Image
                data={p.featuredImage}
                sizes="(max-width: 600px) 48vw, 30vw"
              />
            )}
            <small>{p.vendor}</small>
            <h3>{p.title}</h3>View product ↗
          </a>
        ))}
      </div>
    </section>
  );
}
export default function Homepage() {
  return (
    <div className="orwes-reference orwes-ui ui-context-build">
      <BuildHeader />
      <main id="MainContent" className="build-home">
        <section className="build-home-hero">
          <img
            loading="eager"
            src="/materials/home-hero-1280.jpg"
            alt="Architectural home with stone finishes and timber detailing"
            width="1280"
            height="720"
            decoding="async"
          />
          <div className="build-home-hero-shade"></div>
          <div className="build-home-hero-copy">
            <p className="build-eyebrow">
              ORWES BUILD / BUILDING MATERIALS &amp; ARCHITECTURAL SOLUTIONS
            </p>
            <h1>
              Building Materials &amp; Bathroom Supplies for Australian Projects
            </h1>
            <p>
              Explore materials, compare specifications and prepare your
              Australian project selection.
            </p>
            <div className="build-home-actions">
              <a href="#build-materials">Browse materials ↗</a>
              <a href="#project-brief">Prepare a project brief ↗</a>
            </div>
            <form
              className="home-hero-search"
              action="/search"
              method="get"
              role="search"
            >
              <label htmlFor="home-product-search">
                Search products or SKU
              </label>
              <div>
                <input
                  id="home-product-search"
                  name="q"
                  type="search"
                  placeholder="Search products or SKU"
                  required
                />
                <button type="submit">Search ↗</button>
              </div>
            </form>
          </div>
          <div className="build-home-hero-foot">
            <span>For builders, developers &amp; architects</span>
            <span>Specification · Sourcing · Project coordination</span>
          </div>
        </section>
        <section
          className="build-home-products"
          id="build-materials"
          aria-labelledby="home-categories-title"
        >
          <header>
            <div>
              <p className="build-eyebrow">THE BUILD COLLECTION</p>
              <h2 id="home-categories-title">
                Shop building materials by category.
              </h2>
            </div>
            <p>
              Explore six categories of building materials and fixed
              architectural finishes, selected around the needs of your space.
              Use the notes below to start your material schedule.
            </p>
            <a className="home-all-materials" href="/collections">
              View all building materials ↗
            </a>
          </header>
          <div className="build-home-category-grid">
            <a href="/search?q=bathroom">
              <div>
                <img
                  loading="lazy"
                  width="1280"
                  height="720"
                  src="/materials/bathroom-1280.jpg"
                  alt="Bathroom materials and architectural finishes"
                  decoding="async"
                />
              </div>
              <span>
                <small>01</small>
                <h3>Bathroom</h3>
                <b aria-hidden="true">↗</b>
              </span>
              <p className="build-category-preparation">
                Fixture schedule, finishes &amp; plumbing details
              </p>
            </a>
            <a href="/search?q=kitchen">
              <div>
                <img
                  loading="lazy"
                  width="1280"
                  height="720"
                  src="/materials/kitchen-1280.jpg"
                  alt="Kitchen materials and architectural finishes"
                  decoding="async"
                />
              </div>
              <span>
                <small>02</small>
                <h3>Kitchen</h3>
                <b aria-hidden="true">↗</b>
              </span>
              <p className="build-category-preparation">
                Cabinet layouts, surfaces &amp; hardware
              </p>
            </a>
            <a href="/search?q=doors%20and%20windows">
              <div>
                <img
                  loading="lazy"
                  width="1280"
                  height="720"
                  src="/materials/doors-windows-1280.jpg"
                  alt="Doors &amp; Windows materials and architectural finishes"
                  decoding="async"
                />
              </div>
              <span>
                <small>03</small>
                <h3>Doors &amp; Windows</h3>
                <b aria-hidden="true">↗</b>
              </span>
              <p className="build-category-preparation">
                Opening sizes, configurations &amp; site details
              </p>
            </a>
            <a href="/search?q=stone">
              <div>
                <img
                  loading="lazy"
                  width="1280"
                  height="720"
                  src="/materials/stone-1280.jpg"
                  alt="Stone materials and architectural finishes"
                  decoding="async"
                />
              </div>
              <span>
                <small>04</small>
                <h3>Stone</h3>
                <b aria-hidden="true">↗</b>
              </span>
              <p className="build-category-preparation">
                Applications, dimensions &amp; finish preferences
              </p>
            </a>
            <a href="/search?q=outdoor">
              <div>
                <img
                  loading="lazy"
                  width="1280"
                  height="720"
                  src="/materials/outdoor-1280.jpg"
                  alt="Outdoor materials and architectural finishes"
                  decoding="async"
                />
              </div>
              <span>
                <small>05</small>
                <h3>Outdoor</h3>
                <b aria-hidden="true">↗</b>
              </span>
              <p className="build-category-preparation">
                Outdoor areas, quantities &amp; exposure
              </p>
            </a>
            <a href="/search?q=lighting">
              <div>
                <img
                  loading="lazy"
                  width="1280"
                  height="720"
                  src="/materials/lighting-1280.jpg"
                  alt="Lighting materials and architectural finishes"
                  decoding="async"
                />
              </div>
              <span>
                <small>06</small>
                <h3>Lighting</h3>
                <b aria-hidden="true">↗</b>
              </span>
              <p className="build-category-preparation">
                Lighting schedule, locations &amp; controls
              </p>
            </a>
          </div>
          <nav
            className="home-popular"
            aria-label="Popular product collections"
          >
            <span>Popular:</span>
            <a href="/search?q=bathroom%20tapware">Bathroom tapware</a>
            <a href="/search?q=bathroom%20vanities">Vanities</a>
            <a href="/search?q=smart%20toilets">Smart toilets</a>
            <a href="/search?q=bathroom%20showers">Showers</a>
          </nav>
        </section>
        <FeaturedProducts />
        <section
          className="home-finish-panel"
          aria-labelledby="home-finish-title"
        >
          <div>
            <p className="build-eyebrow">MATERIALS &amp; FINISHES</p>
            <h2 id="home-finish-title">Explore brushed brass.</h2>
            <p>
              Explore ABI Interiors kitchen mixers, sinks and hardware. Finish
              names can vary across materials, lighting and batches; review
              samples and confirm the exact product before ordering.
            </p>
            <nav aria-label="Finish planning">
              <a href="https://www.orwes.com/finishes/brushed-brass">
                Explore the finish guide ↗
              </a>
              <a href="https://www.orwes.com/pages/samples">
                Browse sample categories ↗
              </a>
              <a href="https://www.orwes.com/pages/resources-downloads">
                Product specifications ↗
              </a>
              <a href="/cart">Your project selection ↗</a>
            </nav>
          </div>
          <img
            src="/materials/kitchen-1280.jpg"
            alt="Kitchen finishes in natural light"
            loading="lazy"
          />
        </section>
        <section
          id="about"
          className="build-home-introduction"
          aria-labelledby="home-intro-title"
        >
          <p className="build-eyebrow">
            ONE PROJECT. A CONNECTED MATERIAL PLAN.
          </p>
          <h2 id="home-intro-title">
            Considered materials.
            <br />
            Clearer project decisions.
          </h2>
          <div>
            <p>
              ORWES helps builders, developers and designers explore building
              materials and architectural finishes for Australian projects. From
              bathroom fixtures and kitchen fittings to stone surfaces, doors,
              windows and lighting, we connect product selection with the
              details needed for a useful quotation.
            </p>
            <p>
              Start with your drawings, quantities, finishes and preferred
              delivery stages. We help bring the open questions into view: which
              dimensions need checking, which documents are available, what the
              supply scope includes and what still needs to be confirmed. For
              plumbing products, ask about WaterMark and WELS documentation for
              the exact model and configuration before you order.
            </p>
            <p>
              Whether your project is in Melbourne, Sydney or elsewhere in
              Australia, a clear material schedule makes it easier to compare
              options. Samples, specifications and project guidance help your
              team work towards a coordinated selection, with suitability and
              delivery arrangements confirmed for each quotation.
            </p>
            <a href="https://www.orwes.com/pages/about-our-process">
              Explore our sourcing process ↗
            </a>
          </div>
        </section>
        <section className="build-home-feature">
          <img
            src="/materials/visual-hero-1200.jpg"
            alt="ORWES smart toilet in a stone bathroom"
            loading="lazy"
            width="1200"
            height="1086"
          />
          <div>
            <p className="build-eyebrow">BATHROOM / SMART TOILETS</p>
            <h2>
              A smarter detail.
              <br />A considered bathroom.
            </h2>
            <p>
              Explore 11 smart toilet models. Compare dimensions, installation
              requirements and configurations, then request a quote for your
              project.
            </p>
            <a href="/search?q=smart%20toilets">Explore smart toilets ↗</a>
          </div>
        </section>
        <section id="solutions" className="build-home-solutions">
          <p className="build-eyebrow">SOLUTIONS FOR PEOPLE WHO BUILD</p>
          <h2>One supplier, built around how you work.</h2>
          <div>
            <a href="https://www.orwes.com/solutions/builders">
              <h3>
                Builders <span>↗</span>
              </h3>
              <p>
                Coordinate materials, site requirements and supply for your
                build.
              </p>
            </a>
            <a href="https://www.orwes.com/solutions/developers">
              <h3>
                Developers <span>↗</span>
              </h3>
              <p>
                Plan specifications and procurement across residential and
                commercial projects.
              </p>
            </a>
            <a href="https://www.orwes.com/solutions/architects">
              <h3>
                Architects <span>↗</span>
              </h3>
              <p>
                Explore finishes, dimensions and product details for your
                design.
              </p>
            </a>
            <a href="https://www.orwes.com/solutions/hospitality">
              <h3>
                Hospitality <span>↗</span>
              </h3>
              <p>
                Discuss materials and specifications for hotels and commercial
                interiors.
              </p>
            </a>
          </div>
        </section>
        <section
          className="home-plan-section home-process"
          aria-labelledby="home-process-title"
        >
          <p className="build-eyebrow">HOW IT WORKS</p>
          <h2 id="home-process-title">
            From your first drawing
            <br />
            to the delivery plan.
          </h2>
          <ol>
            <li>
              <span>01</span>
              <h3>Send your brief</h3>
              <p>
                Share drawings, quantities, preferred finishes and the questions
                still open.
              </p>
            </li>
            <li>
              <span>02</span>
              <h3>Review specifications &amp; samples</h3>
              <p>
                Check dimensions, material choices and sample availability
                before deciding.
              </p>
            </li>
            <li>
              <span>03</span>
              <h3>Compare the quotation</h3>
              <p>
                Review unit prices, inclusions, documentation and proposed
                delivery arrangements.
              </p>
            </li>
            <li>
              <span>04</span>
              <h3>Confirm production &amp; quality checks</h3>
              <p>
                Agree the specification and any inspection requirements for your
                order.
              </p>
            </li>
            <li>
              <span>05</span>
              <h3>Plan delivery to site</h3>
              <p>
                Confirm delivery location, access, staging and responsibilities
                before dispatch.
              </p>
            </li>
          </ol>
          <a href="https://www.orwes.com/pages/about-our-process">
            Understand the procurement process ↗
          </a>
        </section>
        <section
          id="resources"
          className="home-plan-section home-tools"
          aria-labelledby="home-tools-title"
        >
          <p className="build-eyebrow">PROJECT TOOLS</p>
          <h2 id="home-tools-title">Plan, compare and specify.</h2>
          <div>
            <a href="https://www.orwes.com/pages/bathroom-renovation-calculator">
              <h3>Bathroom renovation calculator ↗</h3>
              <p>Compare indicative renovation budgets in AUD.</p>
            </a>
            <a href="https://www.orwes.com/pages/tile-calculator">
              <h3>Tile calculator ↗</h3>
              <p>Estimate square metres, waste allowance and full boxes.</p>
            </a>
            <a href="https://www.orwes.com/pages/samples">
              <h3>Product samples ↗</h3>
              <p>Explore available samples before selecting a finish.</p>
            </a>
            <a href="#project-brief">
              <h3>Project consultation ↗</h3>
              <p>Discuss your material schedule and next decisions.</p>
            </a>
          </div>
        </section>
        <section
          className="home-plan-section home-standards"
          aria-labelledby="home-standards-title"
        >
          <div>
            <p className="build-eyebrow">AUSTRALIAN PROJECT REQUIREMENTS</p>
            <h2 id="home-standards-title">
              Check the specification.
              <br />
              Ask for the evidence.
            </h2>
            <p>
              Documentation depends on the product and supplied configuration.
              Confirm requirements with your project professionals before
              ordering.
            </p>
            <a href="https://www.orwes.com/pages/resources-australian-standards">
              Explore Australian standards guidance ↗
            </a>
          </div>
          <dl>
            <div>
              <dt>Product identity</dt>
              <dd>
                Match the model and configuration to the documents supplied.
              </dd>
            </div>
            <div>
              <dt>WaterMark &amp; WELS</dt>
              <dd>
                Ask which certification and registration records apply to your
                plumbing selection.
              </dd>
            </div>
            <div>
              <dt>Installation details</dt>
              <dd>
                Review dimensions, connections and site requirements with your
                installer.
              </dd>
            </div>
            <div>
              <dt>Quality &amp; warranty</dt>
              <dd>
                Confirm inspection scope, warranty terms and support for your
                order.
              </dd>
            </div>
          </dl>
        </section>
        <section className="build-home-brand">
          <div>
            <p className="build-eyebrow">THE THINKING BEHIND ORWES</p>
            <h2>
              A drawing becomes a project.
              <br />
              People bring it together.
            </h2>
          </div>
          <div>
            <p>
              A material needs approval. A dimension changes. A delivery depends
              on a decision made somewhere else. ORWES helps connect these
              details, bringing project teams and Chinese manufacturing
              resources into a clearer conversation.
            </p>
            <p>
              We begin with what you are trying to build, then work through the
              requirements together. Trust grows in the way each next step is
              handled.
            </p>
            <a href="https://www.orwes.com/pages/about-who-we-are">
              Discover our story ↗
            </a>
          </div>
        </section>
        <section
          id="home-journal"
          className="home-journal"
          aria-labelledby="home-journal-title"
        >
          <header className="home-journal-heading">
            <div>
              <p className="build-eyebrow">ORWES / PROJECT NOTES</p>
              <h2 id="home-journal-title">Ideas for your next build.</h2>
              <p>
                Practical guides for planning, comparing and specifying building
                materials.
              </p>
            </div>
            <a
              className="home-journal-all"
              href="https://www.orwes.com/blogs/news"
            >
              View all articles <span aria-hidden="true">↗</span>
            </a>
          </header>
          <div className="home-journal-grid">
            <article className="home-journal-card">
              <a
                className="home-journal-card-link"
                href="https://www.orwes.com/blog/building-materials-order-checklist"
              >
                <div className="home-journal-image">
                  <img
                    src="/materials/building-materials-order-checklist-photo-thumb.jpg"
                    alt="Architectural drawings organised into clipped document sets on a white table."
                    width="600"
                    height="375"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <p className="home-journal-category">Confirm the order</p>
                <h3>
                  What to Confirm Before Placing a Building Materials Order
                </h3>
              </a>
              <p className="home-journal-excerpt">
                Bring specifications, quantities, finishes and supporting
                documents together before committing to an order.
              </p>
              <a
                className="home-journal-read"
                href="https://www.orwes.com/blog/building-materials-order-checklist"
              >
                Read article <span aria-hidden="true">↗</span>
              </a>
            </article>
            <article className="home-journal-card">
              <a
                className="home-journal-card-link"
                href="https://www.orwes.com/blog/coordinate-material-finishes-residential-projects"
              >
                <div className="home-journal-image">
                  <img
                    src="/materials/coordinate-material-finishes-residential-projects-photo-thumb.jpg"
                    alt="Neutral fabric and surface samples arranged on a tray on a wooden desk."
                    width="600"
                    height="375"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <p className="home-journal-category">Coordinate finishes</p>
                <h3>
                  Coordinating Material Finishes Across a Residential Project
                </h3>
              </a>
              <p className="home-journal-excerpt">
                Carry appearance decisions from material selection into a clear,
                usable finish and sample register.
              </p>
              <a
                className="home-journal-read"
                href="https://www.orwes.com/blog/coordinate-material-finishes-residential-projects"
              >
                Read article <span aria-hidden="true">↗</span>
              </a>
            </article>
            <article className="home-journal-card">
              <a
                className="home-journal-card-link"
                href="https://www.orwes.com/blog/compare-building-material-quotes"
              >
                <div className="home-journal-image">
                  <img
                    src="/materials/compare-building-material-quotes-photo-thumb.jpg"
                    alt="Two people reviewing a printed architectural floor plan together."
                    width="600"
                    height="375"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <p className="home-journal-category">Compare the scope</p>
                <h3>
                  How to Compare Building Material Quotes Beyond Unit Price
                </h3>
              </a>
              <p className="home-journal-excerpt">
                Make differences in specifications, quantities and delivery
                assumptions visible before choosing a quotation.
              </p>
              <a
                className="home-journal-read"
                href="https://www.orwes.com/blog/compare-building-material-quotes"
              >
                Read article <span aria-hidden="true">↗</span>
              </a>
            </article>
            <article className="home-journal-card">
              <a
                className="home-journal-card-link"
                href="https://www.orwes.com/blog/building-materials-rfq-checklist"
              >
                <div className="home-journal-image">
                  <img
                    src="/materials/building-materials-rfq-checklist-photo-thumb.jpg"
                    alt="House plans, a spirit level, keys and a white hard hat laid out on a work surface."
                    width="600"
                    height="375"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <p className="home-journal-category">Prepare your enquiry</p>
                <h3>
                  How to Prepare a Building Materials RFQ for an Australian
                  Project
                </h3>
              </a>
              <p className="home-journal-excerpt">
                A practical starting point for requesting a useful quotation,
                even when some project decisions are still open.
              </p>
              <a
                className="home-journal-read"
                href="https://www.orwes.com/blog/building-materials-rfq-checklist"
              >
                Read article <span aria-hidden="true">↗</span>
              </a>
            </article>
          </div>
        </section>
        <section
          className="home-plan-section home-questions"
          aria-labelledby="home-questions-title"
        >
          <p className="build-eyebrow">BEFORE YOU START</p>
          <h2 id="home-questions-title">Questions about your project.</h2>
          <div>
            <details>
              <summary>
                Can I buy products online or request a project quote?
                <span aria-hidden="true">+</span>
              </summary>
              <p>
                Products with a confirmed selling price can be added to your
                shopping cart. Enquiry products go into a separate quote list.
                Use a project brief for a broader material schedule.
              </p>
            </details>
            <details>
              <summary>
                What should I include in my project enquiry?
                <span aria-hidden="true">+</span>
              </summary>
              <p>
                Include the project location, material categories, quantities,
                dimensions, preferred finishes and timing. Mark any assumptions
                and attach current drawings when you send your brief.
              </p>
            </details>
            <details>
              <summary>
                Can I compare samples before ordering?
                <span aria-hidden="true">+</span>
              </summary>
              <p>
                Explore the samples directory and ask about availability for
                your chosen product. Confirm colour and finish compatibility
                across the specific products you intend to use.
              </p>
            </details>
            <details>
              <summary>
                Are certification documents available for every product?
                <span aria-hidden="true">+</span>
              </summary>
              <p>
                Availability varies by model and configuration. Ask us to check
                the relevant documentation for your selection, and confirm
                project requirements with your installer or building
                professional.
              </p>
            </details>
            <details>
              <summary>
                How do I confirm price, minimum quantities and lead time?
                <span aria-hidden="true">+</span>
              </summary>
              <p>
                These depend on the product and order scope. Ask for a quotation
                that identifies price, currency, GST treatment, quantities,
                exclusions and delivery arrangements.
              </p>
            </details>
            <details>
              <summary>
                Does preparing a brief send an enquiry automatically?
                <span aria-hidden="true">+</span>
              </summary>
              <p>
                No. The brief below helps organise your requirements. Review it,
                then copy or download it and send it by email with your
                drawings.
              </p>
            </details>
          </div>
        </section>
        <ProjectBrief />
      </main>
      <section className="footer-tools" aria-labelledby="footer-tools-heading">
        <div className="footer-tools-inner">
          <header>
            <p className="footer-tools-eyebrow">
              Australia · Trade, DTC brands &amp; retail
            </p>
            <h2 id="footer-tools-heading">Project tools &amp; planning</h2>
            <p>
              Measure, budget and compare your selections for an Australian home
              or building project.
            </p>
            <p>
              ORWES supplies the Australian market (AU), serving businesses and
              individual buyers. Builders, developers and trade teams can source
              for B2B projects; direct-to-consumer (DTC) brands can purchase for
              their own businesses; homeowners and renovators can buy for
              personal projects.
            </p>
            <p>
              Browse products for individual purchases, or share your
              quantities, specifications and Australian delivery postcode for a
              business or project enquiry.
            </p>
          </header>
          <nav aria-label="Project tools and planning">
            <ul>
              <li>
                <a href="https://www.orwes.com/pages/bathroom-renovation-calculator">
                  <svg
                    viewBox="0 0 32 32"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <rect x="7" y="3" width="18" height="26" rx="1"></rect>
                    <path d="M11 7h10v6H11zM11 18h2m6 0h2m-10 5h2m6 0h2"></path>
                  </svg>
                  <h3>Bathroom renovation calculator</h3>
                  <p>
                    Explore an Australian bathroom renovation budget, with
                    fixtures, materials and labour allowances in AUD.
                  </p>
                  <span className="footer-tools-action">
                    Estimate your budget<span aria-hidden="true">↗</span>
                  </span>
                </a>
              </li>
              <li>
                <a href="https://www.orwes.com/pages/tile-calculator">
                  <svg
                    viewBox="0 0 32 32"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path d="M4 4h10v10H4zM18 4h10v10H18zM4 18h10v10H4zM18 18h10v10H18z"></path>
                  </svg>
                  <h3>Tile calculator</h3>
                  <p>
                    Measure floors and walls, allow for cuts and waste, and work
                    out your tile coverage and box quantities.
                  </p>
                  <span className="footer-tools-action">
                    Calculate tile coverage<span aria-hidden="true">↗</span>
                  </span>
                </a>
              </li>
              <li>
                <a href="https://www.orwes.com/pages/samples">
                  <svg
                    viewBox="0 0 32 32"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path d="m4 20 9 9 15-15-9-9ZM4 20V5h13M8 18V9h8"></path>
                    <circle cx="13" cy="23" r="1.5"></circle>
                  </svg>
                  <h3>Product samples</h3>
                  <p>
                    Explore available finish and material samples to help
                    compare selections for your project.
                  </p>
                  <span className="footer-tools-action">
                    Explore samples<span aria-hidden="true">↗</span>
                  </span>
                </a>
              </li>
              <li>
                <a href="#project-brief">
                  <svg
                    viewBox="0 0 32 32"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <rect x="4" y="6" width="24" height="22" rx="1"></rect>
                    <path d="M4 13h24M10 3v6M22 3v6m-12 11 4 4 8-8"></path>
                  </svg>
                  <h3>Book a project consultation</h3>
                  <p>
                    Discuss your plans, product requirements and material
                    selections with the ORWES team.
                  </p>
                  <span className="footer-tools-action">
                    Plan your consultation<span aria-hidden="true">↗</span>
                  </span>
                </a>
              </li>
            </ul>
          </nav>
          <nav
            className="footer-resource-links"
            aria-label="Australian project resources"
          >
            <a href="https://www.orwes.com/project-resources">
              Project resource library
            </a>
            <a href="https://www.orwes.com/tools/boq-template">BOQ template</a>
            <a href="https://www.orwes.com/tools/project-schedule">
              Lead-time planner
            </a>
            <a href="https://www.orwes.com/guides/bathroom-care-guide">
              Product care
            </a>
            <a href="https://www.orwes.com/locations/melbourne">
              Melbourne projects
            </a>
            <a href="https://www.orwes.com/locations/sydney">Sydney projects</a>
          </nav>
        </div>
      </section>
      <BuildFooter />
    </div>
  );
}
