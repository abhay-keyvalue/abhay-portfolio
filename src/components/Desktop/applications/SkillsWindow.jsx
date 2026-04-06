import { Zap, Code2, Smartphone, Database, GitBranch, Palette, Users } from 'lucide-react';
import { skillsData } from '../../../constants/portfolioData';

const getCategoryIcon = (category) => {
  const iconMap = {
    'Frontend Technologies': Code2,
    'Mobile Development': Smartphone,
    'State Management': Database,
    'Version Control & CI/CD': GitBranch,
    'Backend & Integrations': Database,
    'UI/UX & Performance': Palette,
    'Collaboration & PM': Users
  };
  return iconMap[category] || Code2;
};

export default function SkillsWindow() {
  return (
    <div className="text-[#1d1d1f] font-[-apple-system,BlinkMacSystemFont,'SF_Pro_Display',sans-serif]" style={{ padding: 20 }}>
      <div className="flex items-center gap-3 mb-5" style={{ marginBottom: 20 }}>
        <div className="w-11 h-11 flex items-center justify-center bg-gradient-to-br from-[rgba(102,126,234,0.15)] to-[rgba(118,75,162,0.15)] rounded-xl text-[#667eea] shadow-[0_2px_8px_rgba(102,126,234,0.2)]">
          <Zap size={24} strokeWidth={2} />
        </div>
        <p className="text-2xl font-bold text-[#1d1d1f] tracking-tight mb-5">Technical Skills</p>
      </div>
      
      <div>
        {Object.entries(skillsData).map(([category, items]) => {
          const IconComponent = getCategoryIcon(category);
          return (
            <div key={category} className="bg-white/70 backdrop-blur-[10px] p-5 rounded-2xl mb-4 shadow-[0_4px_16px_rgba(0,0,0,0.08)] border border-white/40 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] hover:border-[rgba(102,126,234,0.2)]" style={{ padding: 20, marginBottom: 16 }}>
              <div className="flex items-center gap-2.5 mb-4" style={{ marginBottom: 16 }}>
                <div className="w-8 h-8 flex items-center justify-center bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-xl text-white shadow-[0_4px_12px_rgba(102,126,234,0.3)]">
                  <IconComponent size={16} strokeWidth={2} />
                </div>
                <h3 className="m-0 text-base font-bold text-[#1d1d1f] tracking-tight">{category}</h3>
              </div>
              <div className="flex flex-wrap gap-2 mt-3" style={{ marginTop: 12 }}>
                {items.map(skill => (
                  <span key={skill} className="bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white py-2 px-4 rounded-lg text-xs font-semibold shadow-[0_2px_8px_rgba(102,126,234,0.3)] transition-all duration-200 ease-linear hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(102,126,234,0.4)]" style={{ padding: '8px 16px' }}>{skill}</span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
