import './ApplicationWindow.css';

export default function ContactWindow() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Contact form submitted! (This is a demo - integrate with your backend)');
  };

  return (
    <div className="application-window">
      <h2>📧 Get In Touch</h2>
      <div className="app-content">
        <div className="contact-info">
          <div className="contact-item">
            <span className="contact-icon">📧</span>
            <a href="mailto:abhaybalan200@gmail.com" className="contact-link">
              abhaybalan200@gmail.com
            </a>
          </div>
          <div className="contact-item">
            <span className="contact-icon">📱</span>
            <a href="tel:+919142426264" className="contact-link">
              +91 9142426264
            </a>
          </div>
          <div className="contact-item">
            <span className="contact-icon">💼</span>
            <a 
              href="https://linkedin.com/in/abhay-balan-b7705a15b" 
              target="_blank" 
              rel="noopener noreferrer"
              className="contact-link"
            >
              LinkedIn Profile
            </a>
          </div>
          <div className="contact-item">
            <span className="contact-icon">📍</span>
            <span>Ernakulam, India</span>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" rows="4" required></textarea>
          <button type="submit">Send Message</button>
        </form>

        <p className="contact-note">
          Open to new opportunities, collaborations, and exciting projects. 
          Let's build something amazing together!
        </p>
      </div>
    </div>
  );
}
