import './footer.css';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer>
      <div className="top">
        <div className="logo">
          <span>Anshifmonz</span>
        </div>
        <div className="navigations">
          <Link href="#hero">Home</Link>
          <Link href="#about">About</Link>
          <Link href="#services">Services</Link>
          <Link href="#portfolio">Portfolio</Link>
          <Link href="#testimonials">Testimonials</Link>
          <Link href="#contact">Contact</Link>
        </div>
        <div className="social-icons">
          <Link
            href="https://www.linkedin.com/in/muhammed-anshif"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-linkedin-in"></i>
          </Link>
          <Link
            href="https://www.instagram.com/anshifmonz_/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-instagram"></i>
          </Link>
          <Link href="https://twitter.com/anshifmonz__" target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-twitter"></i>
          </Link>
          <Link href="https://t.me/anshifmonz" target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-telegram"></i>
          </Link>
        </div>
      </div>
      <div className="bottom">
        <span>© {new Date().getFullYear()} Anshifmonz. All rights reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;
