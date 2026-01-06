"use client";

import React, { useState } from "react";
import { supabase } from "@/utils/supabase";
import Image from "next/image";

// Image Modal Component
const ImageModal = ({ src, alt, isOpen, onClose }: { src: string; alt: string; isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.9)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10000,
        cursor: "pointer",
      }}
      onClick={onClose}
    >
      <div
        style={{
          position: "relative",
          maxWidth: "90%",
          maxHeight: "90%",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "-40px",
            right: "0",
            background: "#fff",
            border: "none",
            borderRadius: "50%",
            width: "30px",
            height: "30px",
            cursor: "pointer",
            fontSize: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#333",
          }}
        >
          ×
        </button>
        <img
          src={src}
          alt={alt}
          style={{
            maxWidth: "100%",
            maxHeight: "90vh",
            objectFit: "contain",
          }}
        />
      </div>
    </div>
  );
};

// Helper component for images with view button
const VendorImageWithView = ({ src, alt, width = 50, height = 50 }: { src: string; alt: string; width?: number; height?: number }) => {
  const [imgError, setImgError] = useState(false);
  const [showModal, setShowModal] = useState(false);

  if (imgError || !src) {
    return <span style={{ color: "#999" }}>No photo</span>;
  }

  // Use unoptimized for external URLs to avoid hostname configuration issues
  const isExternalUrl = src.startsWith("http://") || src.startsWith("https://");

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "5px" }}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          style={{ objectFit: "cover", borderRadius: "4px", cursor: "pointer" }}
          unoptimized={isExternalUrl}
          onError={() => setImgError(true)}
          onClick={() => setShowModal(true)}
        />
        <button
          onClick={() => setShowModal(true)}
          style={{
            padding: "4px 8px",
            fontSize: "12px",
            background: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          View
        </button>
      </div>
      <ImageModal src={src} alt={alt} isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};

interface Vendor {
  id: number;
  name: string;
  photo?: string;
  aadhar_card_photo?: string;
  address?: string;
  bank_details_photo?: string;
  phone_number?: string;
  police_verification?: string;
  expertise_category?: string;
  nick_name?: string;
  availability?: string;
  physical_form_photo?: string;
}

interface VendorsViewProps {
  initialVendors: Vendor[];
}

const VendorsView: React.FC<VendorsViewProps> = ({ initialVendors }) => {
  const [vendors, setVendors] = useState(initialVendors);
  const [showForm, setShowForm] = useState(false);
  const [editingVendor, setEditingVendor] = useState<Vendor | null>(null);
  
  // Form state
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [aadharCardPhoto, setAadharCardPhoto] = useState("");
  const [address, setAddress] = useState("");
  const [bankDetailsPhoto, setBankDetailsPhoto] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [policeVerification, setPoliceVerification] = useState("");
  const [expertiseCategory, setExpertiseCategory] = useState("");
  const [nickName, setNickName] = useState("");
  const [availability, setAvailability] = useState("");
  const [physicalFormPhoto, setPhysicalFormPhoto] = useState("");
  
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const resetForm = () => {
    setName("");
    setPhoto("");
    setAadharCardPhoto("");
    setAddress("");
    setBankDetailsPhoto("");
    setPhoneNumber("");
    setPoliceVerification("");
    setExpertiseCategory("");
    setNickName("");
    setAvailability("");
    setPhysicalFormPhoto("");
    setEditingVendor(null);
    setShowForm(false);
  };

  const handleEdit = (vendor: Vendor) => {
    setEditingVendor(vendor);
    setName(vendor.name || "");
    setPhoto(vendor.photo || "");
    setAadharCardPhoto(vendor.aadhar_card_photo || "");
    setAddress(vendor.address || "");
    setBankDetailsPhoto(vendor.bank_details_photo || "");
    setPhoneNumber(vendor.phone_number || "");
    setPoliceVerification(vendor.police_verification || "");
    setExpertiseCategory(vendor.expertise_category || "");
    setNickName(vendor.nick_name || "");
    setAvailability(vendor.availability || "");
    setPhysicalFormPhoto(vendor.physical_form_photo || "");
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    const vendorData = {
      name,
      photo: photo || null,
      aadhar_card_photo: aadharCardPhoto || null,
      address: address || null,
      bank_details_photo: bankDetailsPhoto || null,
      phone_number: phoneNumber || null,
      police_verification: policeVerification || null,
      expertise_category: expertiseCategory || null,
      nick_name: nickName || null,
      availability: availability || null,
      physical_form_photo: physicalFormPhoto || null,
    };

    try {
      if (editingVendor) {
        // Update existing vendor
        const { data, error } = await supabase
          .from("hc_vendors")
          .update(vendorData)
          .eq("id", editingVendor.id)
          .select();

        if (error) {
          setErrorMessage("Error updating vendor: " + error.message);
        } else if (data) {
          setSuccessMessage("Vendor updated successfully!");
          setVendors(
            vendors.map((v) => (v.id === editingVendor.id ? data[0] : v))
          );
          resetForm();
        }
      } else {
        // Create new vendor
        const { data, error } = await supabase
          .from("hc_vendors")
          .insert([vendorData])
          .select();

        if (error) {
          setErrorMessage("Error adding vendor: " + error.message);
        } else if (data) {
          setSuccessMessage("Vendor added successfully!");
          setVendors([...vendors, data[0]]);
          resetForm();
        }
      }
    } catch (err: any) {
      setErrorMessage("Error: " + err.message);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this vendor?")) {
      const { error } = await supabase
        .from("hc_vendors")
        .delete()
        .eq("id", id);
      
      if (error) {
        alert("Error deleting vendor: " + error.message);
      } else {
        setVendors(vendors.filter((v) => v.id !== id));
      }
    }
  };

  return (
    <div id="vendors-section" className="dashboard-section active">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2 className="section-title">Manage Vendors</h2>
        <button
          onClick={() => {
            resetForm();
            setShowForm(!showForm);
          }}
          className="btn-add-service"
          style={{ marginBottom: 0 }}
        >
          {showForm ? "Cancel" : "Add New Vendor"}
        </button>
      </div>

      {showForm && (
        <section className="add-service-section" style={{ marginBottom: "20px" }}>
          <h3 className="section-title" style={{ fontSize: "20px" }}>
            {editingVendor ? "Edit Vendor" : "Add New Vendor"}
          </h3>
          <form onSubmit={handleSubmit} className="add-service-form">
            <div className="form-group">
              <label htmlFor="name">Name *</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter vendor name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="nickName">Nick Name</label>
              <input
                id="nickName"
                type="text"
                value={nickName}
                onChange={(e) => setNickName(e.target.value)}
                placeholder="Enter nick name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number *</label>
              <input
                id="phoneNumber"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter phone number"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Address</label>
              <textarea
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter address"
                rows={3}
              />
            </div>

            <div className="form-group">
              <label htmlFor="expertiseCategory">Expertise Category *</label>
              <select
                id="expertiseCategory"
                value={expertiseCategory}
                onChange={(e) => setExpertiseCategory(e.target.value)}
                required
              >
                <option value="">Select category</option>
                <option value="plumber">Plumber</option>
                <option value="electrician">Electrician</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="availability">Availability *</label>
              <select
                id="availability"
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                required
              >
                <option value="">Select availability</option>
                <option value="full time">Full Time</option>
                <option value="part time">Part Time</option>
                <option value="on call">On Call</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="photo">Photo URL</label>
              <input
                id="photo"
                type="text"
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
                placeholder="Enter photo URL"
              />
            </div>

            <div className="form-group">
              <label htmlFor="aadharCardPhoto">Aadhar Card Photo URL</label>
              <input
                id="aadharCardPhoto"
                type="text"
                value={aadharCardPhoto}
                onChange={(e) => setAadharCardPhoto(e.target.value)}
                placeholder="Enter Aadhar card photo URL"
              />
            </div>

            <div className="form-group">
              <label htmlFor="bankDetailsPhoto">Bank Details (Passbook) Photo URL</label>
              <input
                id="bankDetailsPhoto"
                type="text"
                value={bankDetailsPhoto}
                onChange={(e) => setBankDetailsPhoto(e.target.value)}
                placeholder="Enter bank passbook photo URL"
              />
            </div>

            <div className="form-group">
              <label htmlFor="policeVerification">Police Verification (Photo/Document) URL</label>
              <input
                id="policeVerification"
                type="text"
                value={policeVerification}
                onChange={(e) => setPoliceVerification(e.target.value)}
                placeholder="Enter police verification document URL (optional)"
              />
            </div>

            <div className="form-group">
              <label htmlFor="physicalFormPhoto">Physical Form Photo URL</label>
              <input
                id="physicalFormPhoto"
                type="text"
                value={physicalFormPhoto}
                onChange={(e) => setPhysicalFormPhoto(e.target.value)}
                placeholder="Enter physical form photo URL"
              />
            </div>

            <button type="submit" className="btn-add-service">
              {editingVendor ? "Update Vendor" : "Add Vendor"}
            </button>
          </form>
          {successMessage && (
            <div className="success-message">{successMessage}</div>
          )}
          {errorMessage && <div className="error-message">{errorMessage}</div>}
        </section>
      )}

      <section className="table-section">
        <div style={{ overflowX: "auto" }}>
          <table>
            <thead>
              <tr>
                <th>Photo</th>
                <th>Aadhar Card</th>
                <th>Name</th>
                <th>Nick Name</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Bank Details</th>
                <th>Police Verification</th>
                <th>Expertise</th>
                <th>Availability</th>
                <th>Physical Form</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {vendors.length === 0 ? (
                <tr>
                  <td colSpan={12} style={{ textAlign: "center", padding: "20px" }}>
                    No vendors found. Add a new vendor to get started.
                  </td>
                </tr>
              ) : (
                vendors.map((vendor) => (
                  <tr key={vendor.id}>
                    <td>
                      {vendor.photo ? (
                        <VendorImageWithView src={vendor.photo} alt={vendor.name} />
                      ) : (
                        <span style={{ color: "#999" }}>No photo</span>
                      )}
                    </td>
                    <td>
                      {vendor.aadhar_card_photo ? (
                        <VendorImageWithView src={vendor.aadhar_card_photo} alt="Aadhar Card" />
                      ) : (
                        <span style={{ color: "#999" }}>No photo</span>
                      )}
                    </td>
                    <td>{vendor.name}</td>
                    <td>{vendor.nick_name || "-"}</td>
                    <td>{vendor.phone_number || "-"}</td>
                    <td style={{ maxWidth: "200px", wordWrap: "break-word" }}>
                      {vendor.address || "-"}
                    </td>
                    <td>
                      {vendor.bank_details_photo ? (
                        <VendorImageWithView src={vendor.bank_details_photo} alt="Bank Details" />
                      ) : (
                        <span style={{ color: "#999" }}>No photo</span>
                      )}
                    </td>
                    <td>
                      {vendor.police_verification ? (
                        <VendorImageWithView src={vendor.police_verification} alt="Police Verification" />
                      ) : (
                        <span style={{ color: "#999" }}>Not provided</span>
                      )}
                    </td>
                    <td>{vendor.expertise_category || "-"}</td>
                    <td>{vendor.availability || "-"}</td>
                    <td>
                      {vendor.physical_form_photo ? (
                        <VendorImageWithView src={vendor.physical_form_photo} alt="Physical Form" />
                      ) : (
                        <span style={{ color: "#999" }}>No photo</span>
                      )}
                    </td>
                    <td>
                      <button
                        onClick={() => handleEdit(vendor)}
                        className="btn-update"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(vendor.id)}
                        className="btn-delete"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default VendorsView;

