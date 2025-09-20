"use client";

import React, { useState } from "react";
import { supabase } from "@/utils/supabase";

interface Service {
  id: number;
  name: string;
  description: string;
  photo: string;
  link: string;
}

interface ServicesViewProps {
  initialServices: Service[];
}

const ServicesView: React.FC<ServicesViewProps> = ({ initialServices }) => {
  const [services, setServices] = useState(initialServices);
  const [serviceName, setServiceName] = useState("");
  const [serviceDesc, setServiceDesc] = useState("");
  const [servicePhoto, setServicePhoto] = useState("");
  const [serviceLink, setServiceLink] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleAddService = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    const { data, error } = await supabase
      .from("hc_services")
      .insert([
        {
          name: serviceName,
          description: serviceDesc,
          photo: servicePhoto,
          link: serviceLink,
        },
      ])
      .select();

    if (error) {
      setErrorMessage("Error adding service: " + error.message);
    } else if (data) {
      setSuccessMessage("Service added successfully!");
      setServices([...services, data[0]]);
      setServiceName("");
      setServiceDesc("");
      setServicePhoto("");
      setServiceLink("");
    }
  };

  const handleDeleteService = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      const { error } = await supabase
        .from("hc_services")
        .delete()
        .eq("id", id);
      if (error) {
        alert("Error deleting service: " + error.message);
      } else {
        setServices(services.filter((s) => s.id !== id));
      }
    }
  };

  return (
    <div id="services-section" className="dashboard-section active">
      <h2 className="section-title">Manage Services</h2>
      <section className="table-section">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id}>
                <td>{service.id}</td>
                <td>{service.name}</td>
                <td>{service.description}</td>
                <td>
                  <button className="btn-update">Update</button>
                  <button
                    onClick={() => handleDeleteService(service.id)}
                    className="btn-delete"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section id="add-service-form-section" className="add-service-section">
        <h2 className="section-title">Add New Service</h2>
        <form onSubmit={handleAddService} className="add-service-form">
          <div className="form-group">
            <label htmlFor="serviceName">Service Name</label>
            <input
              id="serviceName"
              type="text"
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
              placeholder="e.g., Plumbing"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="serviceDesc">Description</label>
            <textarea
              id="serviceDesc"
              value={serviceDesc}
              onChange={(e) => setServiceDesc(e.target.value)}
              placeholder="e.g., Professional plumbing services for residential and commercial properties."
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="servicePhoto">Image URL</label>
            <input
              id="servicePhoto"
              type="text"
              value={servicePhoto}
              onChange={(e) => setServicePhoto(e.target.value)}
              placeholder="e.g., https://example.com/plumbing.jpg"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="serviceLink">Booking Link</label>
            <input
              id="serviceLink"
              type="text"
              value={serviceLink}
              onChange={(e) => setServiceLink(e.target.value)}
              placeholder="e.g., https://example.com/book-plumbing"
              required
            />
          </div>
          <button type="submit" className="btn-add-service">
            Add Service
          </button>
        </form>
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </section>
    </div>
  );
};

export default ServicesView;
