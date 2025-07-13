// This component fetches equipment data from an API and displays it using the EquipmentStatus component.
// Dashboard.jsx - React Functional Component for real-time equipment monitoring + Todo List

import React, { useEffect, useState } from 'react';
import EquipmentStatus from './EquipmentStatus';
import { fetchEquipmentData } from '../api';
import '../App.css';

function Dashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const result = await fetchEquipmentData();
      setData(result);
      setLoading(false);
    }
    loadData();
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Real-Time Monitoring Dashboard</h1>
      {loading ? <p>Loading...</p> : <EquipmentStatus data={data} />}
    </div>
  );
}

export default Dashboard;
