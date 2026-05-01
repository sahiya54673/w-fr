import React from 'react';

const PremiumBackground = ({ light = true, children }) => {
  return (
    <div className="premium-bg-container" style={{ width: '100%', height: '100%', minHeight: 'inherit' }}>
      <div className={light ? "premium-bg-mesh-light" : "premium-bg-mesh"} />
      <div className="premium-bg-grain" />
      <div style={{ position: 'relative', zIndex: 2 }}>
        {children}
      </div>
    </div>
  );
};

export default PremiumBackground;
