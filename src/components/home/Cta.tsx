import './styles/cta.css';
import Link from 'next/link';

export default function Cta() {
  return (
    <section id="cta" className="cta">
      <div className="heading">
        <h2>Let’s Build Something Amazing</h2>
        <div>
          <p>
            Ready to elevate your online presence? Reach out, and let’s discuss how I can help turn
            your ideas into impactful, high-performing web solutions.
          </p>
          <Link href="#contact">
            <button>Let’s Connect</button>
          </Link>
        </div>
      </div>
    </section>
  );
}
