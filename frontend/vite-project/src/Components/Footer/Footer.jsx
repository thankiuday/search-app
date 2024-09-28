import React from 'react';

const Footer = () => {
  return (
    <div className="container mt-5">
      <footer id="footer" className="bg-light text-dark fw-bold text-center text-lg-start ">
        <div className="container p-4">
          <div className="row">
            <div className="col-md-4 mb-4">
              <h5 className="text-uppercase text-success" id='AboutMe'>About Me</h5>
              <p>
                Uday Thanki - Web Developer and passionate learner.
              </p>
            </div>
            <div className="col-md-4 mb-4">
              <h5 className="text-uppercase text-danger">Contact</h5>
              <p>
                Email: <a href="mailto:udaythanki2@gmail.com" className="text-dark">udaythanki2@gmail.com</a>
              </p>
            </div>
            <div className="col-md-4 mb-4">
              <h5 className="text-uppercase text-primary">Follow Me</h5>
              <a href="https://www.linkedin.com/in/uday-thanki-b1491a272" target="_blank" rel="noopener noreferrer" className="text-dark">
                LinkedIn Profile
              </a>
            </div>
          </div>
        </div>
        <div className="text-center p-3" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
          © {new Date().getFullYear()} Uday Thanki. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Footer;
