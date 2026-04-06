import { User, MapPin, Briefcase, GraduationCap, Trophy, Award, Target } from 'lucide-react';
import { profileData, educationData, achievementsData } from '../../../constants/portfolioData';

const getAchievementIcon = (type) => {
  switch (type) {
    case 'award':
      return Award;
    case 'participation':
      return Target;
    case 'internship':
      return Briefcase;
    default:
      return Award;
  }
};

export default function ProfileWindow() {
  return (
    <div className="text-[#1d1d1f] font-[-apple-system,BlinkMacSystemFont,'SF_Pro_Display',sans-serif]" style={{ padding: 20 }}>
      <div className="flex items-center gap-3 mb-5" >
        <div className="w-11 h-11 flex items-center justify-center bg-gradient-to-br from-[rgba(102,126,234,0.15)] to-[rgba(118,75,162,0.15)] rounded-xl text-[#667eea] shadow-[0_2px_8px_rgba(102,126,234,0.2)]" style={{ marginBottom: 20 }}>
          <User size={24} strokeWidth={2} />
        </div>
        <p className="text-2xl font-bold text-[#1d1d1f] tracking-tight mb-5">About Me</p>
      </div>
      
      <div>
        <div className="bg-gradient-to-br from-[rgba(102,126,234,0.12)] to-[rgba(118,75,162,0.12)] backdrop-blur-[20px] p-8 py-8 px-6 rounded-2xl mb-5 text-center shadow-[0_4px_16px_rgba(0,0,0,0.08)] border border-white/40 relative overflow-hidden before:content-[''] before:absolute before:-top-1/2 before:-right-1/4 before:w-[200px] before:h-[200px] before:bg-[radial-gradient(circle,rgba(102,126,234,0.15)_0%,transparent_70%)] before:rounded-full before:blur-2xl before:pointer-events-none" style={{ padding: '32px 24px', marginBottom: 20 }}>
          <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-full shadow-[0_8px_24px_rgba(102,126,234,0.4),inset_0_2px_4px_rgba(255,255,255,0.3)] text-white relative z-[1]" style={{ marginBottom: 16 }}>
            <User size={48} strokeWidth={1.5} />
          </div>
          <h3 className="m-0 mb-3 text-[28px] font-bold text-[#1d1d1f] tracking-tight leading-tight relative z-[1]" style={{ marginBottom: 12 }}>{profileData.name}</h3>
          <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-[10px] px-4 py-2 rounded-full text-xs font-semibold text-[#667eea] shadow-[0_2px_8px_rgba(0,0,0,0.08)] mb-2 relative z-[1]" style={{ padding: '8px 16px', marginBottom: 8 }}>
            <Briefcase size={14} strokeWidth={2} />
            <span>{profileData.title}</span>
          </div>
          <div className="inline-flex items-center gap-1.5 bg-white/50 backdrop-blur-[10px] px-3 py-1.5 rounded-full text-xs text-[#3d3d3d]/80 relative z-[1]" style={{ padding: '6px 12px' }}>
            <MapPin size={14} strokeWidth={2} />
            <span>{profileData.location}</span>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-[10px] p-5 rounded-2xl mb-4 shadow-[0_4px_16px_rgba(0,0,0,0.08)] border border-white/40 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] hover:border-[rgba(102,126,234,0.2)]" style={{ padding: 20, marginBottom: 16 }}>
          <div className="flex items-center gap-2.5 mb-4" style={{ marginBottom: 16 }}>
            <div className="w-9 h-9 flex items-center justify-center bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-xl text-white shadow-[0_4px_12px_rgba(102,126,234,0.3)]">
              <Briefcase size={18} strokeWidth={2} />
            </div>
            <h4 className="m-0 text-lg font-bold text-[#1d1d1f] tracking-tight">Professional Summary</h4>
          </div>
          <div className="text-[#1d1d1f] leading-[1.7] [&_p]:my-3 [&_p]:text-sm [&_p]:text-[#3d3d3d] [&_p:first-child]:mt-0 [&_p:last-child]:mb-0">
            {profileData.summary.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-[10px] p-5 rounded-2xl mb-4 shadow-[0_4px_16px_rgba(0,0,0,0.08)] border border-white/40 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] hover:border-[rgba(102,126,234,0.2)]" style={{ padding: 20, marginBottom: 16 }}>
          <div className="flex items-center gap-2.5 mb-4" style={{ marginBottom: 16 }}>
            <div className="w-9 h-9 flex items-center justify-center bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-xl text-white shadow-[0_4px_12px_rgba(102,126,234,0.3)]">
              <GraduationCap size={18} strokeWidth={2} />
            </div>
            <h4 className="m-0 text-lg font-bold text-[#1d1d1f] tracking-tight">Education</h4>
          </div>
          <div className="text-[#1d1d1f] leading-[1.7] [&_p]:my-3 [&_p]:text-sm [&_p]:text-[#3d3d3d] [&_p:first-child]:mt-0 [&_p:last-child]:mb-0">
            <p className="text-base font-semibold text-[#1d1d1f] m-1 my-0" style={{ margin: 0 }}>
              <strong>{educationData.degree}</strong> in {educationData.field}
            </p>
            <p className="text-sm text-[#667eea] font-medium my-1" style={{ marginTop: 4, marginBottom: 4 }}>{educationData.college}</p>
            <p className="text-xs text-[#86868b] my-1" style={{ marginTop: 4, marginBottom: 4 }}>
              {educationData.university} • CGPA: {educationData.cgpa} • {educationData.year}
            </p>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-[10px] p-5 rounded-2xl mb-4 shadow-[0_4px_16px_rgba(0,0,0,0.08)] border border-white/40 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] hover:border-[rgba(102,126,234,0.2)]" style={{ padding: 20, marginBottom: 16 }}>
          <div className="flex items-center gap-2.5 mb-4" style={{ marginBottom: 16 }}>
            <div className="w-9 h-9 flex items-center justify-center bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-xl text-white shadow-[0_4px_12px_rgba(102,126,234,0.3)]">
              <Trophy size={18} strokeWidth={2} />
            </div>
            <h4 className="m-0 text-lg font-bold text-[#1d1d1f] tracking-tight">Achievements</h4>
          </div>
          <div className="text-[#1d1d1f] leading-[1.7] [&_p]:my-3 [&_p]:text-sm [&_p]:text-[#3d3d3d] [&_p:first-child]:mt-0 [&_p:last-child]:mb-0">
            <ul className="list-none p-0 m-0 flex flex-col gap-3" style={{ padding: 0, margin: 0 }}>
              {achievementsData.map((achievement) => {
                const IconComponent = getAchievementIcon(achievement.type);
                return (
                  <li key={achievement.id} className="flex items-center gap-3 p-3 rounded-xl bg-white/60 border border-white/60 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] text-[#667eea] hover:bg-[rgba(102,126,234,0.1)] hover:translate-x-1 hover:border-[rgba(102,126,234,0.2)] [&_svg]:shrink-0 [&_svg]:text-[#667eea] [&_span]:text-[#3d3d3d] [&_span]:text-sm [&_span]:leading-[1.5]" style={{ padding: 12 }}>
                    <IconComponent size={16} strokeWidth={2} />
                    <span>{achievement.title}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
