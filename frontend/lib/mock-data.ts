export type ApplicationStatus =
  | "saved"
  | "applied"
  | "in_review"
  | "interviewing"
  | "technical_test"
  | "offer"
  | "rejected"
  | "withdrawn"
  | "ghosted"

export type Priority = "low" | "medium" | "high"
export type WorkplaceType = "remote" | "hybrid" | "onsite"

export type Company = {
  id: string
  name: string
  website: string
  location: string
  notes: string
  activeApplications: number
  lastActivity: string
}

export type JobApplication = {
  id: string
  title: string
  companyId: string
  companyName: string
  jobUrl: string
  location: string
  workplaceType: WorkplaceType
  status: ApplicationStatus
  priority: Priority
  currency: "EUR" | "USD"
  salaryMin: number | null
  salaryMax: number | null
  dateApplied: string
  deadline: string | null
  description: string
  notes: string
  active: boolean
  updatedAt: string
}

export const statusLabels: Record<ApplicationStatus, string> = {
  saved: "Saved",
  applied: "Applied",
  in_review: "In Review",
  interviewing: "Interviewing",
  technical_test: "Technical Test",
  offer: "Offer",
  rejected: "Rejected",
  withdrawn: "Withdrawn",
  ghosted: "Ghosted",
}

export const statusOrder: ApplicationStatus[] = [
  "saved",
  "applied",
  "in_review",
  "interviewing",
  "technical_test",
  "offer",
  "rejected",
  "ghosted",
]

export const companies: Company[] = [
  {
    id: "spotify",
    name: "Spotify",
    website: "https://spotify.com",
    location: "Berlin, Germany",
    notes: "Strong product culture. Ask about design system ownership and team structure.",
    activeApplications: 3,
    lastActivity: "Today",
  },
  {
    id: "linear",
    name: "Linear",
    website: "https://linear.app",
    location: "Remote",
    notes: "Small team, high product quality. Prepare examples around polished workflows.",
    activeApplications: 2,
    lastActivity: "Yesterday",
  },
  {
    id: "wise",
    name: "Wise",
    website: "https://wise.com",
    location: "London, UK",
    notes: "Offer-stage company. Compare salary, growth, and team fit before responding.",
    activeApplications: 1,
    lastActivity: "May 14",
  },
  {
    id: "gitlab",
    name: "GitLab",
    website: "https://gitlab.com",
    location: "Remote",
    notes: "Remote-first. Emphasize async collaboration and written communication.",
    activeApplications: 4,
    lastActivity: "May 13",
  },
  {
    id: "stripe",
    name: "Stripe",
    website: "https://stripe.com",
    location: "Dublin, Ireland",
    notes: "Prepare systems examples and strong product judgment stories.",
    activeApplications: 2,
    lastActivity: "May 12",
  },
  {
    id: "notion",
    name: "Notion",
    website: "https://notion.so",
    location: "Remote",
    notes: "Saved for later. Revisit once portfolio case study is updated.",
    activeApplications: 1,
    lastActivity: "May 10",
  },
]

export const applications: JobApplication[] = [
  {
    id: "spotify-senior-react-engineer",
    title: "Senior React Engineer",
    companyId: "spotify",
    companyName: "Spotify",
    jobUrl: "https://spotify.com/jobs",
    location: "Berlin, Germany",
    workplaceType: "hybrid",
    status: "interviewing",
    priority: "high",
    currency: "EUR",
    salaryMin: 90000,
    salaryMax: 110000,
    dateApplied: "2026-05-08",
    deadline: "2026-05-22",
    description:
      "Frontend role focused on React, design systems, and internal productivity workflows.",
    notes:
      "Prepare dashboard UX examples, accessibility tradeoffs, and API integration stories.",
    active: true,
    updatedAt: "Today",
  },
  {
    id: "linear-frontend-engineer",
    title: "Frontend Engineer",
    companyId: "linear",
    companyName: "Linear",
    jobUrl: "https://linear.app/careers",
    location: "Remote",
    workplaceType: "remote",
    status: "applied",
    priority: "medium",
    currency: "USD",
    salaryMin: 120000,
    salaryMax: 145000,
    dateApplied: "2026-05-12",
    deadline: null,
    description: "Product engineering role with a strong focus on interaction quality.",
    notes: "Follow up after one week if there is no response.",
    active: true,
    updatedAt: "Yesterday",
  },
  {
    id: "gitlab-full-stack-developer",
    title: "Full Stack Developer",
    companyId: "gitlab",
    companyName: "GitLab",
    jobUrl: "https://about.gitlab.com/jobs",
    location: "Remote",
    workplaceType: "remote",
    status: "in_review",
    priority: "high",
    currency: "EUR",
    salaryMin: 80000,
    salaryMax: 95000,
    dateApplied: "2026-05-09",
    deadline: "2026-05-20",
    description: "Full-stack role across Django APIs and React surfaces.",
    notes: "Highlight async collaboration and backend/frontend ownership.",
    active: true,
    updatedAt: "May 14",
  },
  {
    id: "wise-platform-engineer",
    title: "Platform Engineer",
    companyId: "wise",
    companyName: "Wise",
    jobUrl: "https://wise.jobs",
    location: "London, UK",
    workplaceType: "hybrid",
    status: "offer",
    priority: "high",
    currency: "EUR",
    salaryMin: 100000,
    salaryMax: 130000,
    dateApplied: "2026-04-25",
    deadline: "2026-05-22",
    description: "Platform role focused on internal tooling and developer experience.",
    notes: "Compare against other late-stage opportunities before accepting.",
    active: true,
    updatedAt: "Today",
  },
  {
    id: "notion-ux-researcher",
    title: "UX Researcher",
    companyId: "notion",
    companyName: "Notion",
    jobUrl: "https://notion.so/careers",
    location: "Remote",
    workplaceType: "remote",
    status: "saved",
    priority: "low",
    currency: "USD",
    salaryMin: null,
    salaryMax: null,
    dateApplied: "",
    deadline: null,
    description: "Saved opportunity for a later review.",
    notes: "Not a primary track, but worth revisiting.",
    active: true,
    updatedAt: "May 10",
  },
  {
    id: "stripe-backend-engineer",
    title: "Backend Engineer",
    companyId: "stripe",
    companyName: "Stripe",
    jobUrl: "https://stripe.com/jobs",
    location: "Dublin, Ireland",
    workplaceType: "onsite",
    status: "technical_test",
    priority: "medium",
    currency: "EUR",
    salaryMin: 95000,
    salaryMax: 115000,
    dateApplied: "2026-05-01",
    deadline: "2026-05-18",
    description: "Backend role with practical API design and reliability exercises.",
    notes: "Block focused prep time before the technical test.",
    active: true,
    updatedAt: "May 13",
  },
]

export const statusChartData = [
  { status: "Saved", count: 6 },
  { status: "Applied", count: 9 },
  { status: "Review", count: 4 },
  { status: "Interview", count: 5 },
  { status: "Offer", count: 2 },
]

export const trendChartData = [
  { week: "Apr 20", applications: 4, interviews: 1 },
  { week: "Apr 27", applications: 7, interviews: 2 },
  { week: "May 4", applications: 6, interviews: 3 },
  { week: "May 11", applications: 9, interviews: 5 },
]

export const formatSalary = (application: JobApplication) => {
  if (!application.salaryMin && !application.salaryMax) {
    return "Salary not listed"
  }

  const formatter = new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 0,
  })

  return `${application.currency} ${formatter.format(application.salaryMin ?? 0)}-${formatter.format(application.salaryMax ?? 0)}`
}
