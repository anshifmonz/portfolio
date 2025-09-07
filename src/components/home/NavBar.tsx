'use client';

import './styles/nav.css';
import Link from 'next/link';
import { useState } from 'react';

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav>
      {/* Overlay for mobile menu */}
      <div
        id="overlay"
        className={`${isMenuOpen ? 'active' : 'hidden'}`}
        onClick={toggleMenu}
      ></div>
      {/* Hamburger menu icon (mobile) */}
      <div className="menu" onClick={toggleMenu}>
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 49"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M32.38 4.5H15.62C8.34 4.5 4 8.84 4 16.12V32.86C4 40.16 8.34 44.5 15.62 44.5H32.36C39.64 44.5 43.98 40.16 43.98 32.88V16.12C44 8.84 39.66 4.5 32.38 4.5Z"
            fill="#5D50C6"
          />
          <path
            d="M34 35H14C13.18 35 12.5 34.32 12.5 33.5C12.5 32.68 13.18 32 14 32H34C34.82 32 35.5 32.68 35.5 33.5C35.5 34.32 34.82 35 34 35Z"
            fill="white"
          />
          <path
            d="M34 26H14C13.18 26 12.5 25.32 12.5 24.5C12.5 23.68 13.18 23 14 23H34C34.82 23 35.5 23.68 35.5 24.5C35.5 25.32 34.82 26 34 26Z"
            fill="white"
          />
          <path
            d="M34 17H14C13.18 17 12.5 16.32 12.5 15.5C12.5 14.68 13.18 14 14 14H34C34.82 14 35.5 14.68 35.5 15.5C35.5 16.32 34.82 17 34 17Z"
            fill="white"
          />
        </svg>
      </div>
      {/* Mobile dropdown menu */}
      <div className={`drop-down ${isMenuOpen ? 'active translate-x-0' : 'translate-x-full'}`}>
        <div className={`close ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <svg
            width="48"
            height="48"
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 122.881 122.88"
            enableBackground="new 0 0 122.881 122.88"
            xmlSpace="preserve"
          >
            <g>
              <path
                d="M61.44,0c16.966,0,32.326,6.877,43.445,17.996c11.119,11.118,17.996,26.479,17.996,43.444 c0,16.967-6.877,32.326-17.996,43.444C93.766,116.003,78.406,122.88,61.44,122.88c-16.966,0-32.326-6.877-43.444-17.996 C6.877,93.766,0,78.406,0,61.439c0-16.965,6.877-32.326,17.996-43.444C29.114,6.877,44.474,0,61.44,0L61.44,0z M80.16,37.369 c1.301-1.302,3.412-1.302,4.713,0c1.301,1.301,1.301,3.411,0,4.713L65.512,61.444l19.361,19.362c1.301,1.301,1.301,3.411,0,4.713 c-1.301,1.301-3.412,1.301-4.713,0L60.798,66.157L41.436,85.52c-1.301,1.301-3.412,1.301-4.713,0c-1.301-1.302-1.301-3.412,0-4.713 l19.363-19.362L36.723,42.082c-1.301-1.302-1.301-3.412,0-4.713c1.301-1.302,3.412-1.302,4.713,0l19.363,19.362L80.16,37.369 L80.16,37.369z M100.172,22.708C90.26,12.796,76.566,6.666,61.44,6.666c-15.126,0-28.819,6.13-38.731,16.042 C12.797,32.62,6.666,46.314,6.666,61.439c0,15.126,6.131,28.82,16.042,38.732c9.912,9.911,23.605,16.042,38.731,16.042 c15.126,0,28.82-6.131,38.732-16.042c9.912-9.912,16.043-23.606,16.043-38.732C116.215,46.314,110.084,32.62,100.172,22.708 L100.172,22.708z"
                fill="#5d50c6"
              />
            </g>
          </svg>
        </div>
        <div>
          <Link href="#hero" onClick={toggleMenu} className="nav-list">
            Home
          </Link>
          <Link href="#about" onClick={toggleMenu} className="nav-list">
            About
          </Link>
          <Link href="#portfolio" onClick={toggleMenu} className="nav-list">
            Portfolio
          </Link>
          <Link href="#services" onClick={toggleMenu} className="nav-list">
            Services
          </Link>
          <Link href="#contact" onClick={toggleMenu} className="nav-list">
            Contact
          </Link>
        </div>
      </div>
      {/* Brand name */}
      <Link href="/" className="">
        <span className="font-[Righteous]">Anshifmonz</span>
      </Link>
      {/* Desktop navigation links */}
      <div className="navigations">
        {' '}
        <Link href="#hero" className="nav-list">
          Home
        </Link>{' '}
        <Link href="#about" className="nav-list">
          About
        </Link>{' '}
        <Link href="#portfolio" className="nav-list">
          Portfolio
        </Link>{' '}
        <Link href="#services" className="nav-list">
          Services
        </Link>{' '}
        <Link href="#contact" className="nav-list">
          Contact
        </Link>
      </div>
    </nav>
  );
}
