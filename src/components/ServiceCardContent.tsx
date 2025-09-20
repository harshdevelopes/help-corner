"use client";

import Image from "next/image";

interface Service {
  id: number;
  name: string;
  description: string;
  photo: string;
  link: string;
}

export default function ServiceCardContent({ service }: { service: Service }) {
  return (
    <>
      <div className="service-icon">
        <Image
          src={service.photo}
          alt={service.name}
          width={160}
          height={160}
          className="service-img"
        />
      </div>
      <h3>{service.name}</h3>
      <p>{service.description}</p>
      <button
        className="book-btn"
        onClick={() => {
          if (service.link) window.location.href = service.link;
        }}
      >
        Book Now
      </button>
    </>
  );
}
