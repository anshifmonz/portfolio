import './styles/cta.css';
import { ActionButton } from 'components/shared/ActionButtons';

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
          <ActionButton
            name="Let’s Connect"
            href="#contact"
            variant="talk"
            className="px-3.5 py-3 h-"
          />
        </div>
      </div>
    </section>
  );
}
