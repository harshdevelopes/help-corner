import { supabase } from "@/utils/supabase";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import ServiceCardContent from "@/components/ServiceCardContent";

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
          id="services"
          className="services-section"
          style={{ paddingTop: "120px" }}
        >
          <h2 className="section-title">All Our Services</h2>
          <div className="container">
            <div
              className="services-grid"
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "40px",
                justifyContent: "center",
              }}
            >
              {services.length > 0 ? (
                services.map((service) => (
                  <div
                    className="service-card"
                    key={service.id}
                    style={{ flex: "1 1 300px", maxWidth: "320px" }}
                  >
                    <ServiceCardContent service={service} />
                  </div>
                ))
              ) : (
                <p>No services found.</p>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
