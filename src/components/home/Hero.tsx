import './styles/hero.css';
import Link from 'next/link';
import { ActionButtonsGroup } from '../shared/ActionButtons';

const Hero: React.FC = () => {
  return (
    <section id="hero">
      <div className="left">
        <div className="text">
          <span>Hey, I am</span>
          <h1 id="name">Muhammed Anshif</h1>
          <h3 id="role">Full Stack Developer</h3>
          <p id="desc" className="mb-8">
            I am passionate about crafting innovative web solutions that empower businesses and
            elevate user experiences.
          </p>
        </div>
        <ActionButtonsGroup
          buttons={[
            {
              name: 'View Projects',
              href: '#portfolio',
              variant: 'hire'
            },
            {
              name: "Let's Talk",
              href: '#contact',
              variant: 'talk'
            }
          ]}
        />
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
