// Field definitions for the "Submit Your Startup" form, shared by the form page
// and the API route so the client and server validate against the same lists.
//
// The wording mirrors the Google Form this replaced, except for YALE_AFFILIATIONS,
// which is new: it backs the directory's "Yale Affiliation" filter (`team`).

export const STAGES = [
  'Idea',
  'Creation/Building',
  'Proof of Concept',
  'Launched: Pre-revenue',
  'Launched: Revenue',
  'Launched: Growth',
] as const;

export const SECTORS = [
  'Technology (Hardware, Software, AI)',
  'Financial Services & FinTech',
  'Healthcare & Biotechnology',
  'CleanTech & Sustainability',
  'Consumer Products & Services',
  'Real Estate & PropTech',
  'Education & EdTech',
  'Robotics & Automation',
  'Media & Entertainment',
  'Legal Technology',
  'Social Impact & Non-Profit',
] as const;

export const FUNDING_RAISED = [
  'Yes: Pre-seed',
  'Yes: Seed',
  'Yes: Series A',
  'Yes: Series B',
  'Not yet',
] as const;

export const FUNDING_TIMELINE = [
  'Immediately',
  'Next 6 months',
  '6-12 months',
  'More than a year',
] as const;

export const YALE_AFFILIATIONS = [
  'Yale College',
  'Yale School of Management',
  'Yale Law School',
  'Yale School of Medicine',
  'Yale School of Engineering & Applied Science',
  'Yale Graduate School of Arts & Sciences',
  'Yale School of the Environment',
  'Yale School of Public Health',
  'Yale School of Art',
  'Yale School of Architecture',
  'Yale School of Nursing',
  'Yale School of Drama',
  'Yale School of Music',
  'Yale Divinity School',
  'Yale Alumni',
  'Yale Faculty/Staff',
] as const;

export const PITCHBOOK_OPT_IN = ['Yes', 'No'] as const;

export interface StartupSubmission {
  email: string;
  name: string;
  stage: string;
  industry: string;
  description: string;
  problem: string;
  solution: string;
  website: string;
  founders: string;
  team: string;
  contact_person: string;
  funding_raised: string;
  funding_timeline: string;
  pitchbook_opt_in: string;
  display_founders: boolean;
}

export const EMPTY_SUBMISSION: StartupSubmission = {
  email: '',
  name: '',
  stage: '',
  industry: '',
  description: '',
  problem: '',
  solution: '',
  website: '',
  founders: '',
  team: '',
  contact_person: '',
  funding_raised: '',
  funding_timeline: '',
  pitchbook_opt_in: '',
  display_founders: false,
};

// Every field the form requires. `website` and `display_founders` are optional,
// matching the Google Form (the website question was the only optional one).
export const REQUIRED_FIELDS: (keyof StartupSubmission)[] = [
  'email',
  'name',
  'stage',
  'industry',
  'description',
  'problem',
  'solution',
  'founders',
  'team',
  'contact_person',
  'funding_raised',
  'funding_timeline',
  'pitchbook_opt_in',
];
