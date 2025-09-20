import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/utils/supabase";
import ServiceCardContent from "@/components/ServiceCardContent";

interface Service {
  id: number;
  name: string;
  description: string;
  photo: string;
  link: string;
}

async function getServices(): Promise<Service[]> {
  const { data, error } = await supabase
    .from("hc_services")
    .select("*")
    .limit(3);
  if (error) {
    console.error("Error fetching services:", error);
    return [];
  }
  return data || [];
}

export default async function Home() {
  const services = await getServices();

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section id="home" className="hero-section">
          <div className="hero-content">
            <div className="hero-text">
              <h2 className="hero-title">Welcome to Help Cornner</h2>
              <p className="hero-subtitle">
                Your trusted partner for all your service needs
              </p>
              <Link href="/#services" className="hero-cta">
                Book Now
              </Link>
            </div>
            <div className="hero-logo">
              <Image
                src="/images/logo.png"
                alt="Help Cornner Logo"
                width={500}
                height={500}
                className="hero-logo-img"
              />
            </div>
          </div>
        </section>

        {/* Services Booking Section */}
        <section id="services" className="services-section">
          <h2 className="section-title">Book Our Service</h2>
          <div className="container">
            <div className="services-grid">
              <div className="services-row">
                {services.map((service) => (
                  <div className="service-card" key={service.id}>
                    <ServiceCardContent service={service} />
                  </div>
                ))}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "32px",
                }}
              >
                <Link href="/service" className="more-services-btn">
                  More Services
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Client Reviews Section */}
        <section id="reviews" className="reviews-section">
          <h2 className="section-title">What Our Clients Say</h2>
          <div className="container">
            <div className="reviews-grid" id="reviews-list">
              <div className="review-card">
                <div className="review-header">
                  <div className="reviewer-info">
                    <h4>John Smith</h4>
                    <div className="stars">⭐⭐⭐⭐⭐</div>
                  </div>
                </div>
                <p className="review-text">
                  &quot;Excellent service! The team was professional and fixed
                  my computer issues quickly. Highly recommended!&quot;
                </p>
              </div>
              <div className="review-card">
                <div className="review-header">
                  <div className="reviewer-info">
                    <h4>Sarah Johnson</h4>
                    <div className="stars">⭐⭐⭐⭐⭐</div>
                  </div>
                </div>
                <p className="review-text">
                  &quot;Amazing technical support. They helped me set up my home
                  network perfectly. Very knowledgeable team!&quot;
                </p>
              </div>
              <div className="review-card">
                <div className="review-header">
                  <div className="reviewer-info">
                    <h4>Mike Davis</h4>
                    <div className="stars">⭐⭐⭐⭐⭐</div>
                  </div>
                </div>
                <p className="review-text">
                  &quot;Fast and reliable service. They repaired my laptop in no
                  time. Great value for money!&quot;
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section id="about" className="about-modern-section">
          <div className="about-modern-container">
            <div className="about-modern-left">
              <h2 className="about-modern-title">Welcome to Help Cornner</h2>
              <p className="about-modern-desc">
                Your one-stop solution for booking trusted, local services—fast,
                easy, and reliable. We connect you with skilled professionals
                for everything from home cleaning to tech support, all through a
                single, user-friendly platform.
              </p>
              <p className="about-modern-desc">
                Our mission is to make your life simpler by bringing quality
                services to your doorstep. Whether you&apos;re a busy homeowner
                or a growing business, Help Cornner is here to help you save
                time and enjoy peace of mind.
              </p>
              <div className="about-modern-features">
                <div className="about-modern-feature">
                  <span className="about-modern-icon about-modern-icon1">
                    🛠️
                  </span>
                  <div>
                    <div className="about-modern-feature-title">
                      Skilled Experts
                    </div>
                    <div className="about-modern-feature-desc">
                      Vetted professionals for every job
                    </div>
                  </div>
                </div>
                <div className="about-modern-feature">
                  <span className="about-modern-icon about-modern-icon2">
                    ⏰
                  </span>
                  <div>
                    <div className="about-modern-feature-title">
                      Quick Booking
                    </div>
                    <div className="about-modern-feature-desc">
                      Book in seconds, anytime
                    </div>
                  </div>
                </div>
                <div className="about-modern-feature">
                  <span className="about-modern-icon about-modern-icon3">
                    ⚡
                  </span>
                  <div>
                    <div className="about-modern-feature-title">
                      Fast &amp; Accurate
                    </div>
                    <div className="about-modern-feature-desc">
                      Prompt service with attention to detail
                    </div>
                  </div>
                </div>
                <div className="about-modern-feature">
                  <span className="about-modern-icon about-modern-icon4">
                    💬
                  </span>
                  <div>
                    <div className="about-modern-feature-title">
                      Friendly Support
                    </div>
                    <div className="about-modern-feature-desc">
                      We&apos;re here for you, always
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="about-modern-right">
              <div className="about-modern-img-wrap">
                <Image
                  src="/images/icon.png"
                  alt="Help Cornner Team"
                  width={440}
                  height={440}
                  className="about-modern-img"
                />
                <div className="about-modern-img-caption">
                  <div className="about-modern-img-caption-title">
                    Trusted by Hundreds
                  </div>
                  <div className="about-modern-img-caption-desc">
                    Join our community of happy customers and service pros!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
