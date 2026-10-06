import type { Metadata } from "next";
import ServicePage from "@/components/sections/ServicePage";

export const metadata: Metadata = {
  title: "AI & Software Development | NEXORA AI SECURITY",
  description:
    "AI agents, AI automation, RAG applications, chatbots, APIs, SaaS and custom AI/ML solutions built with security in mind.",
};

export default function AiSoftwarePage() {
  return (
    <ServicePage
      eyebrow="Division 02 · AI & Software"
      title="Intelligent software and automation, built to be secure."
      intro="We design, build, test, secure and maintain AI-powered software for real business workflows."
      problem="Businesses want to use AI but struggle to turn it into reliable software: unclear requirements, fragile prototypes and no security or maintenance plan."
      solution="We deliver complete software, from discovery to deployment, following one process: Discover, Design, Build, Test, Secure, Deploy, Maintain."
      how={[
        "Discover: understand the workflow, users and goals.",
        "Design: plan the architecture, data and interfaces.",
        "Build: develop in small, reviewable steps.",
        "Test and Secure: functional, quality and security checks.",
        "Deploy and Maintain: release and keep it running reliably.",
      ]}
      capabilities={[
        { title: "AI Agents", text: "Agents that perform defined business workflows with human approval where it matters." },
        { title: "AI Automation", text: "Automate repetitive business processes." },
        { title: "RAG Applications", text: "Knowledge-based AI applications using company-approved data sources." },
        { title: "AI Chatbots", text: "Customer-support, internal and knowledge chatbots." },
        { title: "Full-Stack Applications", text: "Frontend, backend, databases, authentication, APIs, dashboards and integrations." },
        { title: "APIs", text: "Design and integration of secure APIs." },
        { title: "SaaS Products", text: "Scalable software-as-a-service platforms." },
        { title: "Custom AI/ML Solutions", text: "Machine-learning and AI solutions based on your requirements." },
      ]}
      security={[
        "Secrets and API keys are kept server-side, never in frontend code.",
        "Authentication, role-based access and input validation by default.",
        "Production code is reviewed and tested before release.",
      ]}
      technology={[
        "Next.js, TypeScript and Tailwind CSS on the frontend",
        "Python and FastAPI on the backend, PostgreSQL for data",
        "Provider-independent AI layer so models can be changed without a rewrite",
      ]}
      deliverables={[
        "Agreed scope and milestones",
        "Working, tested software",
        "Documentation",
        "Deployment and handover",
      ]}
    />
  );
}