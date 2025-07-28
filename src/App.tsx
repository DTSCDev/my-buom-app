// Simple test App component
const App = () => {
  console.log('App component is rendering...');
  
  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f0f8ff',
      minHeight: '100vh'
    }}>
      <h1 style={{ color: '#333', marginBottom: '20px' }}>
        🎉 React App is Working!
      </h1>
      <p style={{ color: '#666', fontSize: '18px' }}>
        If you can see this message, React is loading successfully.
      </p>
      <div style={{ 
        marginTop: '20px', 
        padding: '15px', 
        backgroundColor: '#e8f5e8', 
        borderRadius: '5px' 
      }}>
        <p><strong>Next steps:</strong></p>
        <ul>
          <li>The React development server is working</li>
          <li>We can now add back the full application components</li>
          <li>Navigate to different routes to test functionality</li>
        </ul>
      </div>
      
      <div style={{ marginTop: '20px' }}>
        <a href="/calculator" style={{ 
          display: 'inline-block',
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '5px',
          marginRight: '10px'
        }}>
          Test Calculator Route
        </a>
        <a href="/auth" style={{ 
          display: 'inline-block',
          padding: '10px 20px',
          backgroundColor: '#28a745',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '5px'
        }}>
          Test Auth Route
        </a>
      </div>
    </div>
  );
};

export default App;
