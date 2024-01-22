// VendorForm.jsx

import React, { useState } from 'react';
import axios from 'axios';
import './vendorform.css';
import VendorList from './VendorList';


function VendorForm({ userData }) {
  const [formData, setFormData] = useState({
    vendorName: userData?.name || '',
    bankAccountNo: userData?.bankAccountNo || '',
    bankName: userData?.bankName || '',
    addressLine1: userData?.addressLine1 || '',
    addressLine2: userData?.addressLine2 || '',
    city: userData?.city || '',
    country: userData?.country || '',
    zipCode: userData?.zipCode || '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    setErrors({});
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/vendors', formData);
      console.log('Vendor created:', response.data);

      setFormSubmitted(true);
    } catch (error) {
      console.error('Error creating vendor:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateForm = (data) => {
    const errors = {};
    if (!data.vendorName) errors.vendorName = 'Required';
    if (!data.bankAccountNo) errors.bankAccountNo = 'Required';
    // Add more validation rules for other fields
    return errors;
  };

  const countryOptions = [
    'India',
    'United States',
    'Australia',
    'China',
    'Russia',
    'Canada',
    'United Kingdom',
    // ... add more countries as needed
  ];

  if (formSubmitted) {
    return <VendorList />;
  }

  return (
    <div className='form'>
      <div className='.headline'>
        <img src='/formbg.png' className='left-img1' alt='Background'></img>
        <h1>Vendor signup</h1>
      </div>
      <img src='../public/img3.png' className='left-img2' alt='Image 2'></img>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="vendorName">
            Vendor Name (required):
            {errors.vendorName && <span className="error">{errors.vendorName}</span>}
          </label>
          <input
            type="text"
            id="vendorName"
            name="vendorName"
            value={formData.vendorName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="bankAccountNo">
            Bank Account No. (required):
            {errors.bankAccountNo && <span className="error">{errors.bankAccountNo}</span>}
          </label>
          <input
            type="text"
            id="bankAccountNo"
            name="bankAccountNo"
            value={formData.bankAccountNo}
            onChange={handleChange}
            required
            pattern="\d{10,16}" // Assuming 10-16 digit account number
          />
        </div>
        <div>
          <label htmlFor="bankName">Bank Name (required):</label>
          <input
            type="text"
            id="bankName"
            name="bankName"
            value={formData.bankName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="addressLine1">Address Line 1:</label>
          <input
            type="text"
            id="addressLine1"
            name="addressLine1"
            value={formData.addressLine1}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="addressLine2">Address Line 2:</label>
          <input
            type="text"
            id="addressLine2"
            name="addressLine2"
            value={formData.addressLine2}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="city">City (required):</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="country">Country (required):</label>
          <select id="country" name="country" value={formData.country} onChange={handleChange} required>
            <option value="" disabled>Select a country</option>
            {countryOptions.map((country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="zipCode">Zip Code (required):</label>
          <input
            type="text"
            id="zipCode"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
      <img src='../public/img2.png' className='left-img3' alt='Image 3'></img>
      <img src='../public/img4.png' className='left-img4' alt='Image 4'></img>
    </div>
  );
}

export default VendorForm;
