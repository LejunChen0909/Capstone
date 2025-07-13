// src/api.js

import axios from 'axios';

// Set the base URL for the backend Flask API.
const API_BASE_URL = 'http://localhost:5001/api';


// src/api.js

/*
export const loginUser = async ({ username, password }) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/login`,
      { username, password },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        validateStatus: (status) => status < 500, // Treat 401/403 responses as resolved rather than throwing an error.
      }
    );

    return response.data;
  } catch (error) {
    console.error('Login request failed:', error);
    return { success: false };
  }
};
*/
export async function loginUser(credentials) {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  try {
    return await response.json();
  } catch (err) {
    const text = await response.text();
    console.error('⚠️ 后端未返回有效JSON:', text);
    throw new Error('Invalid JSON from backend');
  }
}


export const fetchEquipmentData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/equipment`);
    return response.data;
  } catch (error) {
    console.error('Fetching equipment data failed:', error);
    return [];
  }
};

/**
 * Fetch the to-do list from the Flask backend.
 * @returns {Array} - An array of to-do items, each containing: { id, title, completed }
 */
export const fetchTodos = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/todos`);
    return response.data;
  } catch (error) {
    console.error('Fetching todos failed:', error);
    return [];
  }
};
