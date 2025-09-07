'use client';

import './styles/faq.css';
import { useState } from 'react';

const faqs = [
  {
    question: 'What services do you offer as a full-stack developer?',
    answer:
      'I offer end-to-end web development services, including frontend and backend development, API integration, database management, and responsive design. Additionally, I can assist with deployment, maintenance, and hosting solutions to provide a complete project lifecycle.'
  },
  {
    question: 'What technologies do you specialize in?',
    answer:
      'I specialize in modern web technologies, including HTML, CSS, JavaScript, React, Node.js, Express.js, Go, and PostgreSQL. I’m also proficient in tools like Git for version control, Postman for API testing, and microservices architecture to build scalable applications. I can work with various cloud platforms for deployment and ensure seamless project management across full-stack applications.'
  },
  {
    question: 'How do you ensure the security of the applications you build?',
    answer:
      'Security is a top priority in my projects. With experience in and active involvement in ethical hacking, I ensure that applications are safeguarded against the OWASP Top 10 vulnerabilities and other common threats. I follow best practices such as implementing HTTPS, secure authentication, SQLi, SSRF, Race Condition, CSRF and XSS protection, and secure data handling. Additionally, I can incorporate advanced protection layers tailored to specific project requirements to achieve a high level of security.'
  },
  {
    question: 'What is your typical project workflow?',
    answer:
      'My workflow generally includes planning and design, development (frontend and backend), testing, and deployment. I can speak English but am not fluent, and I maintain open communication throughout the project, either via text or voice messages, to ensure alignment and adapt as needed.'
  },
  {
    question: 'Can you help with website maintenance and updates?',
    answer:
      'Yes, I provide ongoing maintenance services to keep your website up-to-date, fix bugs, and improve performance. Regular updates ensure your site remains secure, fully functional, and optimized for new devices and browsers.'
  },
  {
    question: 'Do you offer project support after the launch?',
    answer:
      'Absolutely! I offer post-launch support including bug fixes, minor updates, and monitoring to make sure your site or application continues to perform optimally. I also offer extended support packages for clients with ongoing needs.'
  },
  {
    question: 'What is your pricing model for freelance projects?',
    answer:
      'My pricing is flexible and based on the project scope and complexity. I offer both fixed-price packages for clearly defined projects and hourly rates for ongoing or flexible work. During our discussion we can discuss the best approach for your project.'
  }
];

export default function Faq() {
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const toggleFaq = (index: number) => {
    setOpenIndexes(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  return (
    <section className="faq">
      <div className="heading">
        <span>FREQUENTLY ASKED QUESTIONS</span>
        <h2>Get clarity on your doubts</h2>
        <p>
          Find answers to common questions about my full-stack development services and expertise.
        </p>
      </div>

      <div className="container">
        {faqs.map((faq, idx) => {
          const isOpen = openIndexes.includes(idx);
          return (
            <div key={idx} className="item">
              <p className="question" onClick={() => toggleFaq(idx)}>
                {faq.question}
              </p>
              <div className={`answer ${isOpen ? 'visible' : ''}`}>
                <p>{faq.answer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
