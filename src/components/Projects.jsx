export default function Projects() {
  const projects = [
    {
      id: 1,
      title: 'E-Commerce Mobile App',
      description: 'Full-featured React Native e-commerce application with seamless payment integration, real-time inventory, and optimized performance.',
      technologies: ['React Native', 'TypeScript', 'Redux', 'Firebase'],
    },
    {
      id: 2,
      title: 'Enterprise Dashboard',
      description: 'Complex data visualization dashboard built with React and D3.js, handling real-time analytics for thousands of concurrent users.',
      technologies: ['React', 'D3.js', 'WebSocket', 'Node.js'],
    },
    {
      id: 3,
      title: 'Cross-Platform Design System',
      description: 'Comprehensive component library and design system used across web and mobile applications, ensuring consistent UX and reducing development time.',
      technologies: ['React', 'React Native', 'Styled Components', 'Storybook'],
    },
  ];

  return (
    <section className="projects-section" id="projects">
      <div className="container">
        <h2 className="section-title">Featured Projects</h2>
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <div className="project-tech">
                {project.technologies.map((tech) => (
                  <span key={tech} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
