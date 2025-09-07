import Link from 'next/link';
import Image from 'next/image';
import './styles/portfolio.css';

export default function Portfolio() {
  return (
    <section id="portfolio" className="portfolio">
      <div className="heading">
        <span>PORTFOLIO</span>
        <h2>My Work</h2>
        <p>A Showcase of Projects Focused on Functionality, Aesthetics, and Performance</p>
      </div>
      <div className="container">
        <div className="project">
          <div className="card">
            <Image src="/assets/img/portfolio/opendevlo.png" alt="" width={100} height={100} />
          </div>
          <div className="details">
            <div className="text">
              <div className="heading">
                <h3>Open Devlo</h3>
                <p>
                  OpenDevLo, an interactive learning platform for programming languages, featuring
                  engaging exercises and resources designed to enhance understanding and foster a
                  hands-on learning experience.
                </p>
              </div>
              <div className="tags">
                <span>learning</span>
                <span>programming</span>
                <span>react</span>
              </div>
            </div>
            <div className="links">
              <Link href="https://github.com/anshifmonz/open-devlo" target="_blank">
                <i className="fa-brands fa-github"></i>
              </Link>
              <Link href="https://www.opendevlo.com" className="live" target="_blank">
                Live Site
              </Link>
            </div>
          </div>
        </div>
        <div className="project">
          <div className="details">
            <div className="text">
              <div className="heading">
                <h3>Commercial Allotments</h3>
                <p>
                  Developed a comprehensive website for Techno Line, showcasing their advertising
                  services and enhancing their brand presence through modern design and
                  user-friendly navigation.
                </p>
              </div>
              <div className="tags">
                <span>figma to web</span>
                <span>frontend</span>
                <span>responsive</span>
                <span>branding</span>
              </div>
            </div>
            <div className="links">
              <Link href="https://www.commercial-allotments.com" className="live" target="_blank">
                Live Site
              </Link>
            </div>
          </div>
          <div className="card">
            <Image
              src="/assets/img/portfolio/commercial-alootments.png"
              alt=""
              width={100}
              height={100}
            />
          </div>
        </div>
        <div className="project">
          <div className="card">
            <Image src="/assets/img/portfolio/bazaar-bloom.jpg" alt="" width={100} height={100} />
          </div>
          <div className="details">
            <div className="text">
              <div className="heading">
                <h3>Bazaar-Bloom (Backend)</h3>
                <p>
                  Developed a robust backend for an eCommerce application using Node.js, Express,
                  and PostgreSQL, focusing on security measures to safeguard against vulnerabilities
                  and ensure a seamless shopping experience.
                </p>
              </div>
              <div className="tags">
                <span>backend</span>
                <span>api</span>
                <span>postgres</span>
                <span>secure</span>
              </div>
            </div>
            <div className="links">
              <Link href="https://github.com/anshifmonz/bazaar-bloom" target="_blank">
                <i className="fa-brands fa-github"></i>
              </Link>
            </div>
          </div>
        </div>
        <div className="project">
          <div className="details">
            <div className="text">
              <div className="heading">
                <h3>Travlog</h3>
                <p>
                  Developed a responsive frontend project inspired by a
                  <Link
                    href="https://youtu.be/6-pzw7HXimg?si=6Z5l84VtYXB72K70"
                    target="_blank"
                    rel="noreferrer nofollow noopener"
                  >
                    YouTuber&apos;s
                  </Link>
                  design, focusing on modern aesthetics and seamless user experience across devices.
                </p>
              </div>
              <div className="tags">
                <span>figma to web</span>
                <span>frontend</span>
                <span>modern</span>
                <span>responsive</span>
              </div>
            </div>
            <div className="links">
              <Link href="https://github.com/anshifmonz/travlog" target="_blank">
                <i className="fa-brands fa-github"></i>
              </Link>
              <Link href="https://travlog-psi.vercel.app/" className="live" target="_blank">
                Live Site
              </Link>
            </div>
          </div>
          <div className="card">
            <Image src="/assets/img/portfolio/travlog.png" alt="" width={100} height={100} />
          </div>
        </div>
      </div>
    </section>
  );
}
