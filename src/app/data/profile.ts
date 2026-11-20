export const LANGS = ['es', 'en'] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = 'es';
export const isLang = (value: unknown): value is Lang => LANGS.includes(value as Lang);

export const SITE = {
  url: 'https://leandroblandi.me',
  name: 'Leandro Blandi',
  email: 'leandronblandi@gmail.com',
  github: 'https://github.com/leandroblandi/',
  linkedin: null as string | null,
  cv: {
    es: '/cv/leandro-blandi-cv-es.pdf',
    en: '/cv/leandro-blandi-cv-en.pdf',
  } satisfies Record<Lang, string>,
};

export const ROLES = ['Backend Engineer', 'Java & Spring', 'AWS Cloud'];

export const SECTIONS = ['about', 'experience', 'education', 'skills', 'contact'] as const;
export type SectionId = (typeof SECTIONS)[number];

export interface Experience {
  id: string;
  start: string;
  end: string | null;
  stack: string[];
}

export const EXPERIENCE: Experience[] = [
  {
    id: 'certant',
    start: '2024-01',
    end: null,
    stack: ['Java', 'Spring Framework', 'Spring Security', 'AWS', 'Microservices'],
  },
  {
    id: 'internship',
    start: '2023-06',
    end: '2023-09',
    stack: ['Angular', 'TypeScript', 'HTML', 'Sass', 'Nest.js'],
  },
];

export const EDUCATION = {
  institution: 'Universidad Nacional de Lanús',
  currentYear: 4,
  totalYears: 5,
  gpa: 8,
  topics: ['algorithms', 'dataStructures', 'oop', 'agile'],
  stack: ['C', 'Java', 'Spring', 'Hibernate', 'MySQL'],
};

export interface SkillGroup {
  id: string;
  items: string[];
  featured?: boolean;
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: 'aws',
    featured: true,
    items: [
      'IAM',
      'Cognito',
      'SQS',
      'SNS',
      'S3',
      'DynamoDB',
      'RDS',
      'Secrets Manager',
      'Parameter Store',
      'Lambda',
      'API Gateway',
      'SES',
      'AWS SDK',
    ],
  },
  { id: 'backend', items: ['Spring Framework', 'Spring Security', 'Hibernate'] },
  { id: 'languages', items: ['Java', 'Python', 'TypeScript', 'JavaScript', 'C'] },
  { id: 'databases', items: ['MySQL', 'MongoDB', 'DynamoDB'] },
  { id: 'frontend', items: ['Angular', 'HTML', 'CSS', 'Sass'] },
];
