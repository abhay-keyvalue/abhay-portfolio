import { Briefcase, Calendar, Building2 } from 'lucide-react';
import { experienceData } from '../../../constants/portfolioData';

export default function ProjectsWindow() {
  return (
    <div className="text-[#1d1d1f] font-[-apple-system,BlinkMacSystemFont,'SF_Pro_Display',sans-serif]" style={{ padding: 20 }}>
      <div className="flex items-center gap-3 mb-5" style={{ marginBottom: 20 }}>
        <div className="w-11 h-11 flex items-center justify-center bg-gradient-to-br from-[rgba(102,126,234,0.15)] to-[rgba(118,75,162,0.15)] rounded-xl text-[#667eea] shadow-[0_2px_8px_rgba(102,126,234,0.2)]">
          <Briefcase size={24} strokeWidth={2} />
        </div>
        <p className="text-2xl font-bold text-[#1d1d1f] tracking-tight mb-5" >Experience</p>
      </div>
      
      <div>
        {experienceData.map((experience) => (
          <div key={experience.id} className="bg-white/60 backdrop-blur-[10px] p-5 rounded-2xl mb-4 border border-white/40 shadow-[0_2px_8px_rgba(0,0,0,0.08)]" style={{ padding: 20, marginBottom: 16 }}>
            <div className="flex justify-between items-start mb-4 flex-wrap gap-3" style={{ marginBottom: 16 }}>
              <div>
                <h3 className="m-0 text-xl font-bold text-[#1d1d1f] tracking-tight leading-tight mb-2" style={{ marginBottom: 8 }}>{experience.position}</h3>
                <div className="inline-flex items-center gap-1.5 bg-white/60 backdrop-blur-[10px] px-3 py-1.5 rounded-full text-xs font-semibold text-[#667eea] shadow-[0_2px_4px_rgba(0,0,0,0.08)] mr-2 my-1" style={{ padding: '6px 12px', marginRight: 8, marginTop: 4, marginBottom: 4 }}>
                  <Building2 size={14} strokeWidth={2} />
                  <span>{experience.company}</span>
                </div>
              </div>
              <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[rgba(102,126,234,0.12)] to-[rgba(118,75,162,0.12)] px-3 py-1.5 text-xs text-[#667eea] font-semibold shadow-[0_2px_4px_rgba(102,126,234,0.1)] rounded-lg whitespace-nowrap" style={{ padding: '6px 12px' }}>
                <Calendar size={14} strokeWidth={2} />
                <span>{experience.duration}</span>
              </div>
            </div>
            
            <div className="[&_ul]:m-0 [&_ul]:pl-6 [&_li]:my-3 [&_li]:leading-[1.6] [&_li]:text-[#3d3d3d] [&_li]:text-sm">
              <ul>
                {experience.responsibilities.map((responsibility, index) => (
                  <li key={index} dangerouslySetInnerHTML={{ __html: responsibility }} />
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
