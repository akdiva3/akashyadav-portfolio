/** Existing profile content. Featured-work entries were supplied as unverified examples in an earlier version; keep them explicitly labeled until confirmed. */
export const portfolio = {
  name: "Akash Yadav",
  initials: "AY",
  pronouns: "He/Him",
  location: "Gurugram, Haryana, India",
  role: "Payment Specialist at RBL Bank",
  headline: "Payment Specialist @ RBL Bank | Finacle, VisionPLUS, CTS",
  email: "akdiva3@gmail.com",
  linkedin: "https://www.linkedin.com/in/akashdiva",
  about: [
    "Currently serving as a Payment Specialist at RBL Bank. Focused on credit card operations, the role involves managing manual payment applications and channel-specific reconciliations. Proficient in tools such as Finacle, VisionPLUS, and CTS, bringing a robust technical foundation to streamline payment processes.",
    "At RBL Bank, I work collaboratively with teams to enhance operational efficiency in the Payments Department — ensuring accurate reconciliation and seamless payment workflows with a detail-oriented mindset.",
  ],
  skills: [
    { category: "Core systems", items: ["Finacle", "VisionPLUS", "CTS"] },
    { category: "Operations", items: ["Payment reconciliation", "PG & manual channels", "Credit card operations"] },
    { category: "Analysis", items: ["Financial reporting", "Microsoft Excel"] },
    { category: "Domain", items: ["Banking"] },
  ],
  experience: [{
    role: "Payment Specialist",
    organization: "RBL Bank",
    detail: "Full-time · On-site",
    period: "Sep 2021 — Present",
    description: "Working in the Payments Department of Credit Card Operations. Handling all manual payment applications and channel-wise (PG & Manual) reconciliation.",
  }],
  education: [{
    qualification: "B.Sc. Mathematics · Grade A",
    organization: "Kalinga University, Raipur",
    period: "2017 — 2020",
  }],
  /** These were previously invented as examples, not verified real projects. Do not imply ownership or link them to fabricated pages. */
  workPlaceholders: [
    { title: "PG vs Manual Reconciliation Tracker", category: "Excel / Reconciliation", description: "Example concept: a daily view of gateway and manual payment matching." },
    { title: "Manual Payment Posting Playbook", category: "VisionPLUS / Process", description: "Example concept: a reference guide for manual card payment posting." },
    { title: "Payments MIS Dashboard", category: "Reporting / MIS", description: "Example concept: a summary of payment channels and pending items." },
  ],
} as const;
