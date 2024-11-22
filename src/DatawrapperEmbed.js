import React from 'react';

const Datawrapper = () => {
  return (
    <div className="datawrapper-chart-container" style={{ margin: '20px' }}>
      <h3>My Datawrapper Chart 2023</h3>
      <iframe
        src="https://datawrapper.dwcdn.net/pqJ5A/8/"  
        style={{ border: 'none', width: '100%', height: '500px' }}
        title="Datawrapper Chart"
      ></iframe>
    </div>
  );
};

export default Datawrapper;

