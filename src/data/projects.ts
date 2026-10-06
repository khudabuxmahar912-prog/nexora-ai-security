export type Project = {
  name: string;
  description: string;
  tech: string;
  status: string;
  link: string;
};

const gh = "https://github.com/khudabuxmahar912-prog";

export const projects: Project[] = [
  {
    name: "NEXORA AI SECURITY website",
    description: "The company website and future CEO command center.",
    tech: "Next.js, TypeScript, Tailwind",
    status: "In progress",
    link: `${gh}/nexora-ai-security`,
  },
  {
    name: "SentinelAI",
    description:
      "Multi-agent cybersecurity incident pipeline built for a hackathon.",
    tech: "Python, FastAPI, React",
    status: "Hackathon project",
    link: `${gh}/SentinelAI`,
  },
  {
    name: "Developer Portfolio",
    description: "Personal developer portfolio website.",
    tech: "HTML, CSS, JavaScript",
    status: "Live",
    link: `${gh}/khuda-bux-portfolio`,
  },
  {
    name: "Portfolio (earlier version)",
    description: "Earlier portfolio repository.",
    tech: "To be added",
    status: "Repository",
    link: `${gh}/Portfolio`,
  },
  {
    name: "Solstice Website",
    description: "Website project.",
    tech: "To be added",
    status: "Repository",
    link: `${gh}/solstice-website`,
  },
  {
    name: "School Management",
    description: "School management project.",
    tech: "To be added",
    status: "Repository",
    link: `${gh}/School-Management-`,
  },
  {
    name: "Student API Project",
    description: "Student API project.",
    tech: "To be added",
    status: "Repository",
    link: `${gh}/student-api-project`,
  },
  {
    name: "DecodeLabs Internship",
    description: "Work from the DecodeLabs internship.",
    tech: "To be added",
    status: "Repository",
    link: `${gh}/DecodeLabs-Internship-`,
  },
  {
    name: "SIPA Signal",
    description: "Team project under the soulinpsyabstract organization.",
    tech: "To be added",
    status: "Team project",
    link: "https://github.com/soulinpsyabstract/sipa-signal",
  },
  {
    name: "SIPA OS Core",
    description: "Team project under the soulinpsyabstract organization.",
    tech: "To be added",
    status: "Team project",
    link: "https://github.com/soulinpsyabstract/sipa-os-core-psy",
  },
];