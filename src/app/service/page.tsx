import { supabase } from "@/utils/supabase";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiceCardContent from "@/components/ServiceCardContent";
import Image from "next/image";

interface Service {
  id: number;
  name: string;
  description: string;
  photo: string;
  link: string;
}

async function getServices(): Promise<Service[]> {
  const { data, error } = await supabase.from("hc_services").select("*");
  if (error) {
    console.error("Error fetching services:", error);
    return [];
  }
  return data || [];
}

export default async function ServicePage() {
  const services = await getServices();

  return (
    <>
      <Header />
      <main>
        <section
          id="home"
          className="hero-section"
          style={{ minHeight: "50vh" }}
        >
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">Book Our Service</h1>
            </div>
            <div className="hero-logo">
              <Image
                src="/images/logo.png"
                alt="Help Cornner Logo"
                width={400}
                height={400}
                className="hero-logo-img"
              />
            </div>
          </div>
        </section>
        <section id="services" className="services-section">
          <div className="container">
            <div className="services-grid">
              <div className="services-row">
                {services.length > 0 ? (
                  services.map((service) => (
                    <div className="service-card" key={service.id}>
                      <ServiceCardContent service={service} />
                    </div>
                  ))
                ) : (
                  <p>No services found.</p>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
