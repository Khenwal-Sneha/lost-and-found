import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import DisplayPersonalItems from './DisplayPersonalItems';
const Base_URL = "https://lostandfoundbackend-y9qs.onrender.com";
// const Base_URL = "http://localhost:5000";

const PersonalItems = (props) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('No authentication token found.');
      return;
    }

    const config = {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    };

    const res = await axios.get(`${Base_URL}/item/user/`, config);
    console.log(res);
    setItems(res.data.gotItems);
  } catch (error) {
    console.error('Error fetching items:', error);
  }
};


  const renderItem = (item) => {
    return <DisplayPersonalItems key={item._id} item={item} />;
  };

  return (
    <>
      <Navbar />
      <div>
        <h1>My Items {props.req}:</h1>
        <h3>*If your items ain't visible, make sure you raise a concern before.*</h3>
        {items.length === 0 ? (
          <p>No lost or found items found</p>
        ) : (
          items.map((item) => renderItem(item))
        )}
      </div>
    </>
  );
};

export default PersonalItems;
