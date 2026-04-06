import { Mail, Phone, Linkedin, MapPin, Send } from 'lucide-react';
import { contactData } from '../../../constants/portfolioData';

export default function ContactWindow() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Contact form submitted! (This is a demo - integrate with your backend)');
  };

  return (
    <div className="text-[#1d1d1f] font-[-apple-system,BlinkMacSystemFont,'SF_Pro_Display',sans-serif]" style={{ padding: 20 }}>
      <div className="flex items-center gap-3 mb-5" style={{ marginBottom: 20 }}>
        <div className="w-11 h-11 flex items-center justify-center bg-gradient-to-br from-[rgba(102,126,234,0.15)] to-[rgba(118,75,162,0.15)] rounded-xl text-[#667eea] shadow-[0_2px_8px_rgba(102,126,234,0.2)]">
          <Mail size={24} strokeWidth={2} />
        </div>
        <p className="text-2xl font-bold text-[#1d1d1f] tracking-tight mb-5">Get In Touch</p>
      </div>
      
      <div>
        <div className="mb-8" style={{ marginBottom: 32 }}>
          <div className="flex items-center gap-4 p-4 mb-3 bg-white/70 backdrop-blur-[10px] rounded-xl border border-white/40 shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-all duration-200 ease-linear hover:translate-x-1 hover:shadow-[0_2px_12px_rgba(0,0,0,0.08)]" style={{ padding: 16, marginBottom: 12 }}>
            <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-xl text-white shadow-[0_4px_12px_rgba(102,126,234,0.3)] shrink-0">
              <Mail size={20} strokeWidth={2} />
            </div>
            <a href={`mailto:${contactData.email}`} className="text-[#667eea] no-underline font-medium transition-colors duration-200 hover:text-[#764ba2] hover:underline">
              {contactData.email}
            </a>
          </div>
          <div className="flex items-center gap-4 p-4 mb-3 bg-white/70 backdrop-blur-[10px] rounded-xl border border-white/40 shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-all duration-200 ease-linear hover:translate-x-1 hover:shadow-[0_2px_12px_rgba(0,0,0,0.08)]" style={{ padding: 16, marginBottom: 12 }}>
            <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-xl text-white shadow-[0_4px_12px_rgba(102,126,234,0.3)] shrink-0">
              <Phone size={20} strokeWidth={2} />
            </div>
            <a href={`tel:${contactData.phone}`} className="text-[#667eea] no-underline font-medium transition-colors duration-200 hover:text-[#764ba2] hover:underline">
              {contactData.phone}
            </a>
          </div>
          <div className="flex items-center gap-4 p-4 mb-3 bg-white/70 backdrop-blur-[10px] rounded-xl border border-white/40 shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-all duration-200 ease-linear hover:translate-x-1 hover:shadow-[0_2px_12px_rgba(0,0,0,0.08)]" style={{ padding: 16, marginBottom: 12 }}>
            <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-xl text-white shadow-[0_4px_12px_rgba(102,126,234,0.3)] shrink-0">
              <Linkedin size={20} strokeWidth={2} />
            </div>
            <a 
              href={contactData.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#667eea] no-underline font-medium transition-colors duration-200 hover:text-[#764ba2] hover:underline"
            >
              LinkedIn Profile
            </a>
          </div>
          <div className="flex items-center gap-4 p-4 mb-3 bg-white/70 backdrop-blur-[10px] rounded-xl border border-white/40 shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-all duration-200 ease-linear hover:translate-x-1 hover:shadow-[0_2px_12px_rgba(0,0,0,0.08)]" style={{ padding: 16, marginBottom: 12 }}>
            <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-xl text-white shadow-[0_4px_12px_rgba(102,126,234,0.3)] shrink-0">
              <MapPin size={20} strokeWidth={2} />
            </div>
            <span>{contactData.location}</span>
          </div>
        </div>

        <form className="flex flex-col gap-3.5 mb-6" style={{ marginBottom: 24 }} onSubmit={handleSubmit}>
          <input type="text" placeholder="Your Name" required className="py-3.5 px-4 border border-black/10 rounded-[10px] bg-white/80 backdrop-blur-[10px] text-sm text-[#1d1d1f] transition-all duration-200 placeholder:text-[#86868b] focus:outline-none focus:border-[#667eea] focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1)] focus:bg-white" style={{ padding: '14px 16px' }} />
          <input type="email" placeholder="Your Email" required className="py-3.5 px-4 border border-black/10 rounded-[10px] bg-white/80 backdrop-blur-[10px] text-sm text-[#1d1d1f] transition-all duration-200 placeholder:text-[#86868b] focus:outline-none focus:border-[#667eea] focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1)] focus:bg-white" style={{ padding: '14px 16px' }} />
          <textarea placeholder="Your Message" rows="4" required className="py-3.5 px-4 border border-black/10 rounded-[10px] bg-white/80 backdrop-blur-[10px] text-sm text-[#1d1d1f] transition-all duration-200 placeholder:text-[#86868b] resize-none focus:outline-none focus:border-[#667eea] focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1)] focus:bg-white" style={{ padding: '14px 16px' }}></textarea>
          <button type="submit" className="py-3.5 px-5 bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white border-none rounded-xl text-sm font-semibold shadow-[0_4px_12px_rgba(102,126,234,0.3)] cursor-pointer transition-all duration-200 ease-linear flex items-center justify-center gap-2 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(102,126,234,0.4)] active:translate-y-0" style={{ padding: '14px 20px' }}>
            <Send size={16} strokeWidth={2} />
            <span>Send Message</span>
          </button>
        </form>

        <p className="text-[13px] text-[#86868b] leading-[1.5] text-center mt-5" style={{ marginTop: 20 }}>
          {contactData.message}
        </p>
      </div>
    </div>
  );
}
