import React, { useState } from "react";
import "./Register.css";
import { registerCompany } from "../services/registerCompany";
// import { registerCompany } from '../services/registerCompany';

const Register = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    adminName: "",
    position: "",
    email: "",
    password: "",
    logo: null,
  });
  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Corrected the typo

    const { companyName, adminName, position, email, password } = formData;

    try {
      await registerCompany(formData);
      console.log("Company registered successfully!");
    } catch (error) {
      console.error("Error registering company:", error.message);
    }
  };

  return (
    <div className="register-container">
      <h2>Register New Company</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <label>
          Company Name:
          <input
            type="text"
            name="company"
            onChange={(e) =>
              setFormData({ ...formData, companyName: e.target.value })
            }
            required
          />
        </label>

        <label>
          Administrator Name:
          <input
            type="text"
            name="adminName"
            value={formData.adminName}
            onChange={(e) =>
              setFormData({ ...formData, adminName: e.target.value })
            }
            required
          />
        </label>

        <label>
          Position:
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={(e) =>
              setFormData({ ...formData, position: e.target.value })
            }
            required
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />
        </label>

        <label>Company Logo</label>
        <input
          className="file-input"
          type="file"
          accept="image/*"
          onChange={(e) =>
            setFormData({ ...formData, logo: e.target.files[0] })
          }
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
