// EquipmentStatus.jsx - React Functional Component to render a table of equipment metrics
// Displays temperature, voltage, and status for each piece of equipment, with conditional styling.

import React from 'react';
import '../App.css'; // Import styles

function EquipmentStatus({ data }) {
  // Show a message if there is no data
  if (!data || data.length === 0) return <p>No equipment data available.</p>;

  // Determine CSS class based on status
  const getStatusClass = (status) => {
    if (status === 'OK') return 'status-ok';
    if (status === 'Warning') return 'status-warning';
    if (status === 'Fault') return 'status-fault';
    return '';
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Equipment ID</th>
          <th>Temperature (°C)</th>
          <th>Voltage (V)</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {/* Render each row of equipment data */}
        {data.map((eq) => (
          <tr key={eq.id}>
            <td>{eq.id}</td>
            <td>{eq.temperature}</td>
            <td>{eq.voltage}</td>
            <td className={getStatusClass(eq.status)}>{eq.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default EquipmentStatus;
