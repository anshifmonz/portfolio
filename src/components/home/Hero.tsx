import './styles/hero.css';
import Link from 'next/link';

const Hero: React.FC = () => {
  return (
    <section id="hero">
      <div className="left">
        <div className="text">
          <span>Hey, I am</span>
          <h1 id="name">Muhammed Anshif</h1>
          <h3 id="role">Full Stack Developer</h3>
          <p id="desc">
            I am passionate about crafting innovative web solutions that empower businesses and
            elevate user experiences.
          </p>
        </div>
        <div id="btn-div">
          <Link href="#portfolio">
            <button className="hire">View Projects</button>
          </Link>
          <Link href="#contact">
            <button className="talk">Let&apos;s Talk</button>
          </Link>
        </div>
        <div className="social-icons">
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
          <Link href="https://t.me/anshifmoonz" target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-telegram"></i>
          </Link>
          <Link
            href="https://www.linkedin.com/in/muhammed-anshif"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-linkedin-in"></i>
          </Link>
        </div>
      </div>
      <div className="right">
        <div id="circle">
          <div className="circle circle-a">
            <div className="circle circle-b"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
