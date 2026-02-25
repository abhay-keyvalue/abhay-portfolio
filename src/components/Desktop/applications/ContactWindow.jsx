import { Mail, Phone, Linkedin, MapPin, Send } from 'lucide-react';
import { contactData } from '../../../constants/portfolioData';
import './ApplicationWindow.css';

export default function ContactWindow() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Contact form submitted! (This is a demo - integrate with your backend)');
  };

  return (
    <div className="application-window">
      <div className="window-header-section">
        <div className="window-header-icon">
          <Mail size={24} strokeWidth={2} />
        </div>
        <p>Get In Touch</p>
      </div>
      
      <div className="app-content">
        <div className="contact-info">
          <div className="contact-item">
            <div className="contact-icon-box">
              <Mail size={20} strokeWidth={2} />
            </div>
            <a href={`mailto:${contactData.email}`} className="contact-link">
              {contactData.email}
            </a>
          </div>
          <div className="contact-item">
            <div className="contact-icon-box">
              <Phone size={20} strokeWidth={2} />
            </div>
            <a href={`tel:${contactData.phone}`} className="contact-link">
              {contactData.phone}
            </a>
          </div>
          <div className="contact-item">
            <div className="contact-icon-box">
              <Linkedin size={20} strokeWidth={2} />
            </div>
            <a 
              href={contactData.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="contact-link"
            >
              LinkedIn Profile
            </a>
          </div>
          <div className="contact-item">
            <div className="contact-icon-box">
              <MapPin size={20} strokeWidth={2} />
            </div>
            <span>{contactData.location}</span>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" rows="4" required></textarea>
          <button type="submit">
            <Send size={16} strokeWidth={2} />
            <span>Send Message</span>
          </button>
        </form>

        <p className="contact-note">
          {contactData.message}
        </p>
      </div>
    </div>
  );
}
