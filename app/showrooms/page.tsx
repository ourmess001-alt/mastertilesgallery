import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';

const showroomAddress = 'Three Brothers Tiles Market, Nolapara, Bhabaniupur, Gazipur Sadar, Gazipur';

export default function ShowroomsPage() {
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(showroomAddress)}`;

  return (
    <main className="subpage showroom-page">
      <Header />

      <section className="showroom-hero">
        <div className="showroom-breadcrumbs">
          <Link href="/">Home</Link>
          <span>/</span>
          <span>Showroom</span>
        </div>
        <div className="showroom-hero-copy">
          <p className="showroom-kicker">TILE SHOWROOM · GAZIPUR</p>
          <h1>Find the right tile, in person.</h1>
          <p>
            Step inside Master Tiles Gallery to explore tile designs, compare finishes, and get
            inspiration for your next project.
          </p>
          <div className="showroom-hero-actions">
            <a className="showroom-button showroom-button-dark" href="tel:+8801911776657">
              <Phone size={17} />
              Call the showroom
            </a>
            <a
              className="showroom-button showroom-button-light"
              href={directionsUrl}
              target="_blank"
              rel="noreferrer"
            >
              Get directions
              <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
      </section>

      <section className="showroom-gallery-section" aria-label="Showroom photos">
        <div className="showroom-gallery">
          <figure className="showroom-photo showroom-photo-main">
            <img
              src="/showrooms/showroom-interior.png"
              alt="View through the tile displays towards the entrance of Master Tiles Gallery"
            />
            <figcaption>Explore our tile displays</figcaption>
          </figure>
          <figure className="showroom-photo showroom-photo-secondary">
            <img
              src="/showrooms/showroom-inside.jpg"
              alt="Inside the showroom, with tile samples displayed along the walls and floor"
            />
            <figcaption>See finishes up close</figcaption>
          </figure>
        </div>
      </section>

      <section className="showroom-details-section">
        <div className="showroom-details-heading">
          <p className="showroom-kicker">PLAN YOUR VISIT</p>
          <h2>We look forward to welcoming you.</h2>
          <p>Visit us at Three Brothers Tiles Market in Gazipur or get in touch before you arrive.</p>
        </div>

        <div className="showroom-detail-grid">
          <article className="showroom-detail-card">
            <span className="showroom-detail-icon"><MapPin size={21} /></span>
            <p className="showroom-detail-label">VISIT US</p>
            <h3>Master Tiles Gallery</h3>
            <p>{showroomAddress}</p>
            <a className="showroom-text-link" href={directionsUrl} target="_blank" rel="noreferrer">
              Open in Google Maps <ArrowUpRight size={15} />
            </a>
          </article>

          <article className="showroom-detail-card">
            <span className="showroom-detail-icon"><Phone size={21} /></span>
            <p className="showroom-detail-label">CALL OR EMAIL</p>
            <h3>We&apos;re here to help</h3>
            <a href="tel:+8801911776657">+880 1911-776657 <span>Showroom</span></a>
            <a href="tel:+8801615970588">+880 1615-970588 <span>Showroom</span></a>
            <a href="tel:+8801743381500">+880 1743-381500 <span>Abir Hossain, owner</span></a>
            <a className="showroom-contact-email" href="mailto:abirhossain7741@gmail.com">
              <Mail size={15} />
              abirhossain7741@gmail.com
            </a>
          </article>
        </div>
      </section>

      <Footer />
    </main>
  );
}
