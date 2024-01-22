import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './vendorlist.css';
import EditVendorForm from './EditVendorForm';

function VendorList() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editVendorId, setEditVendorId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/vendors');
        console.log('Response Data:', response.data);
        setVendors(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (vendorId) => {
    console.log('Editing vendor with ID:', vendorId);
    setEditVendorId(vendorId);
  };

  const handleCloseEditForm = () => {
    console.log('Closing edit form');
    setEditVendorId(null);
  };

  if (loading) {
    return <p className="loading">Loading...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className='list'>
      <h2>List of Vendors</h2>
      {vendors.length > 0 ? (
        <ul className='list'>
          {vendors.map((vendor) => (
            <li key={vendor.vendor_id}>
              <strong>{vendor.vendor_name}</strong>
              <p>Vendor ID: {vendor.vendor_id}</p>
              <p>Bank Account No.: {vendor.bank_account_no}</p>
              <p>Bank Name: {vendor.bank_name}</p>
              <p>Address Line 1: {vendor.address_line1}</p>
              <p>Address Line 2: {vendor.address_line2}</p>
              <p>City: {vendor.city}</p>
              <p>Country: {vendor.country}</p>
              <p>Zip Code: {vendor.zip_code}</p>
              <button  className='edit' onClick={() => handleEdit(vendor.vendor_id)}>Edit</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No vendors available</p>
      )}

      {editVendorId !== null && (
        <EditVendorForm
          vendorId={editVendorId}
          onClose={handleCloseEditForm}
        />
      )}
    </div>
  );
}

export default VendorList;
