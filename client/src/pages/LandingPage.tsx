import React from 'react';

const outerContainer: React.CSSProperties = {
  fontFamily: 'Arial, sans-serif',
  backgroundColor: '#f9f9f9',
  color: '#333',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  margin: 0,
};

const container: React.CSSProperties = {
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  width: '90%',
  maxWidth: '400px',
  padding: '40px 20px',
  textAlign: 'center',
};

const logo: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '30px',
};

const logoImage: React.CSSProperties = {
  height: '30px',
  width: '30px',
  marginRight: '10px',
};

const logoText: React.CSSProperties = {
  fontSize: '1.5rem',
  color: '#6B47DC', // Adjust brand color if needed
};

const illustration: React.CSSProperties = {
  width: '150px',
  height: 'auto',
  margin: '0 auto 20px',
};

const headline: React.CSSProperties = {
  fontSize: '1.4rem',
  marginBottom: '10px',
};

const tagline: React.CSSProperties = {
  fontSize: '0.9rem',
  color: '#555',
  marginBottom: '30px',
  lineHeight: 1.4,
};

const buttons: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
};

const btn: React.CSSProperties = {
  textDecoration: 'none',
  fontWeight: 600,
  padding: '15px',
  borderRadius: '5px',
  display: 'block',
  textAlign: 'center',
  transition: 'background-color 0.3s ease',
};

const btnLogin: React.CSSProperties = {
  backgroundColor: '#000',
  color: '#fff',
};

const btnRegister: React.CSSProperties = {
  backgroundColor: '#6B47DC',
  color: '#fff',
};

const LandingPage: React.FC = () => {
  return (
    <div style={outerContainer}>
      <div style={container}>
        {/* Logo/Brand Section */}
        <div style={logo}>
          <img src="logo.png" alt="Adopto Logo" style={logoImage} />
          <h1 style={logoText}>Adopto</h1>
        </div>

        {/* Main Illustration */}
        <img src="illustration.png" alt="Illustration" style={illustration} />

        {/* Headline and Description */}
        <h2 style={headline}>Hello World</h2>
        <p style={tagline}>
          Tagline goes here! Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Phasellus imperdiet, nulla et.
        </p>

        {/* CTA Buttons */}
        <div style={buttons}>
          <a href="#" style={{ ...btn, ...btnLogin }}>
            Login
          </a>
          <a href="#" style={{ ...btn, ...btnRegister }}>
            Register
          </a>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
