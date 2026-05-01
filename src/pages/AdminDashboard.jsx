import React from 'react';

const AdminDashboard = () => {
  return (
    <div className="container">
      <h1 style={{ margin: '2rem 0' }}>Admin Dashboard</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
        <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', color: 'var(--primary-color)' }}>24</h2>
          <p style={{ color: 'var(--text-muted)' }}>Products</p>
        </div>
        <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', color: 'var(--success-color)' }}>156</h2>
          <p style={{ color: 'var(--text-muted)' }}>Orders</p>
        </div>
        <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', color: 'var(--accent-color)' }}>$12,450</h2>
          <p style={{ color: 'var(--text-muted)' }}>Revenue</p>
        </div>
      </div>
      
      <div className="card" style={{ padding: '2rem' }}>
        <h2 style={{ marginBottom: '1.5rem' }}>Recent Orders</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>
                <th style={{ padding: '1rem' }}>ID</th>
                <th style={{ padding: '1rem' }}>USER</th>
                <th style={{ padding: '1rem' }}>DATE</th>
                <th style={{ padding: '1rem' }}>TOTAL</th>
                <th style={{ padding: '1rem' }}>PAID</th>
                <th style={{ padding: '1rem' }}>DELIVERED</th>
              </tr>
            </thead>
            <tbody>
              {/* Dummy data */}
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '1rem' }}>#ORD-101</td>
                <td style={{ padding: '1rem' }}>John Doe</td>
                <td style={{ padding: '1rem' }}>2024-04-20</td>
                <td style={{ padding: '1rem' }}>$129.99</td>
                <td style={{ padding: '1rem', color: 'var(--success-color)' }}>Yes</td>
                <td style={{ padding: '1rem', color: 'var(--danger-color)' }}>No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
