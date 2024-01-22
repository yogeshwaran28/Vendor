import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './editvendor.css'
const EditVendorForm = ({ vendorId, onClose }) => {
  const [formData, setFormData] = useState({
    vendor_name: '',
    bank_account_no: '', // Fix field name
    // Add other fields
  });

  useEffect(() => {
    const fetchVendorDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/vendors/${vendorId}`);
        const vendorData = response.data;
        setFormData(vendorData);
      } catch (error) {
        console.error('Error fetching vendor details:', error);
      }
    };

    fetchVendorDetails();
  }, [vendorId]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:3000/api/vendors/${vendorId}`, formData);
      console.log('Vendor details updated successfully');
      onClose();
    } catch (error) {
      console.error('Error updating vendor details:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
  <label>
    Vendor Name:
    <input type="text" name="vendor_name" value={formData.vendor_name} onChange={handleInputChange} />
  </label>
  <label>
    Bank Account No.:
    <input type="text" name="bank_account_no" value={formData.bank_account_no} onChange={handleInputChange} />
  </label>
  <label>
    Bank Name:
    <input type="text" name="bank_name" value={formData.bank_name} onChange={handleInputChange} />
  </label>
  <label>
    Address Line 1:
    <input type="text" name="address_line_1" value={formData.address_line_1} onChange={handleInputChange} />
  </label>
  <label>
    Address Line 2:
    <input type="text" name="address_line_2" value={formData.address_line_2} onChange={handleInputChange} />
  </label>
  <label>
    City:
    <input type="text" name="city" value={formData.city} onChange={handleInputChange} />
  </label>
  <label>
    Country:
    <input type="text" name="country" value={formData.country} onChange={handleInputChange} />
  </label>
  <label>
    Zip Code:
    <input type="text" name="zip_code" value={formData.zip_code} onChange={handleInputChange} />
  </label>
  <button className='edit' type="submit">Update Vendor</button>
</form>

  );
};

export default EditVendorForm;
