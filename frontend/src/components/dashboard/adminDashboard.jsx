import React from 'react';
import TrackManagement from '../track/trackManagement';
import './adminDashboard.css';

export default function AdminDashboard() {
    return (
        <div className="admin-dashboard">
            <h1>Admin Panel</h1>
            <TrackManagement />
        </div>
    );
};


