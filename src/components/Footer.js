import React from 'react'
import './Footer.css'
const Footer = () => {
  return (
    <>
      <footer className="footer" style={{ paddingTop: '2em' }}>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h3>About Us</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sodales lacus nec arcu sagittis, id consectetur leo tincidunt. Donec congue semper massa.</p>
            </div>
            <div className="col-md-3">
              <h3>Quick Links</h3>
              <ul className="footer-links">
                <li><a href="/products">Products</a></li>
                <li><a href="/ecommerce-whole/about">About</a></li>
                <li><a href="/contact">Contact</a></li>
                <li><a href="/faq">FAQ</a></li>
              </ul>
            </div>
            <div className="col-md-3">
              <h3>Contact Us</h3>
              <p>123 Main Street, City, Country</p>
              <p>Phone: +1 123-456-7890</p>
              <p>Email: info@example.com</p>
            </div>
          </div>
        </div>
      </footer>
      <div className="footer-bottom">
        <div className="container">
          <p className="footer-text">&copy; 2023 ShoppingHub. All rights reserved.</p>
        </div>
      </div>
    </>
  );
};

export default Footer;  