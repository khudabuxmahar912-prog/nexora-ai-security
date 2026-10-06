import type { Metadata } from "next";
import ServicePage from "@/components/sections/ServicePage";

export const metadata: Metadata = {
  title: "AI Security Services | NEXORA AI SECURITY",
  description:
    "AI security audits, LLM security testing, AI agent security, prompt-injection and data-leakage testing for authorized AI systems.",
};

export default function AiSecurityPage() {
  return (
    <ServicePage
      eyebrow="Division 01 · AI Security"
      title="Identify and reduce security risks in AI-powered systems."
      intro="All security testing is authorized, controlled, ethical and documented."
      problem="AI applications, LLM features and AI agents introduce new risks: manipulated prompts, unintended behavior, exposed information and over-permissioned tools. Many teams ship them without testing for these weaknesses."
      solution="We assess your AI systems with scoped, written-authorization testing and give you a clear, prioritized view of the risks and how to reduce them."
      how={[
        "Scope: agree what is tested, what is off limits and the rules of engagement in writing.",
        "Assess: review the architecture, permissions, data flows and connected tools.",
        "Test: run controlled tests against the authorized system.",
        "Report: document findings with severity and clear fixes.",
        "Support: review fixes and retest where agreed.",
      ]}
      capabilities={[
        { title: "AI Security Audits", text: "Evaluate AI systems for security weaknesses and risks." },
        { title: "LLM Security Testing", text: "Test authorized LLM applications for prompt manipulation, unintended behavior and information exposure." },
        { title: "AI-Agent Security", text: "Assess agents, tools, workflows, permissions and connected systems." },
        { title: "Prompt-Injection Testing", text: "Check whether malicious instructions can manipulate an application or bypass its intended controls." },
        { title: "Data-Leakage Testing", text: "Assess whether sensitive information can be unintentionally exposed through AI interactions." },
        { title: "AI Vulnerability Assessment", text: "Identify and prioritize weaknesses across AI applications and infrastructure." },
        { title: "AI Monitoring", text: "Monitor configured AI systems for suspicious activity, failures and security events.", soon: true },
        { title: "Security Automation", text: "Automate alert processing, reporting and repetitive security workflows.", soon: true },
      ]}
      security={[
        "Testing only starts with written authorization from the system owner.",
        "No intrusive or out-of-scope testing, ever.",
        "Findings and client data are handled confidentially.",
      ]}
      technology={[
        "Python-based testing and automation",
        "Structured test cases for LLM and agent behavior",
        "Human review of every finding before it is reported",
      ]}
      deliverables={[
        "Scoped assessment plan",
        "Documented findings with severity ratings",
        "Prioritized remediation guidance",
        "Final security report",
      ]}
    />
  );
}