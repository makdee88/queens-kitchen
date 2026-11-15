// Generates a clean, zero-dependency SVG culinary illustration per Bengali course
// Automatically overridden whenever a real dish photo is uploaded in Pages CMS (`dish.photo`)

interface CourseTheme {
  bg: string;
  accent: string;
  secondary: string;
  label: string;
  icon: string;
}

const COURSE_THEMES: Record<string, CourseTheme> = {
  Starters: {
    bg: '#fef3c7',
    accent: '#d97706',
    secondary: '#92400e',
    label: 'Kolkata Starter',
    icon: `<ellipse cx="200" cy="155" rx="68" ry="34" fill="#f59e0b" opacity="0.25"/>
           <path d="M150 155 Q175 115 200 155 Q225 115 250 155 Z" fill="#d97706"/>
           <circle cx="180" cy="152" r="14" fill="#b45309"/>
           <circle cx="220" cy="152" r="14" fill="#b45309"/>`,
  },
  'Biryani & Polao': {
    bg: '#ffedd5',
    accent: '#ea580c',
    secondary: '#9a3412',
    label: 'Royal Rice & Biryani',
    icon: `<path d="M135 155 C135 190, 265 190, 265 155 Z" fill="#9a3412"/>
           <path d="M142 155 Q200 105 258 155 Z" fill="#f59e0b"/>
           <circle cx="190" cy="142" r="7" fill="#fef3c7"/>
           <circle cx="215" cy="146" r="5" fill="#dc2626"/>`,
  },
  'Chicken & Mutton': {
    bg: '#fee2e2',
    accent: '#b91c1c',
    secondary: '#7f1d1d',
    label: 'Slow-Cooked Curry',
    icon: `<path d="M140 150 C140 192, 260 192, 260 150 Z" fill="#7f1d1d"/>
           <ellipse cx="200" cy="150" rx="56" ry="14" fill="#dc2626"/>
           <circle cx="185" cy="148" r="9" fill="#fca5a5" opacity="0.6"/>
           <circle cx="215" cy="149" r="7" fill="#fde047" opacity="0.7"/>`,
  },
  'Bengali Fish': {
    bg: '#e0f2fe',
    accent: '#0284c7',
    secondary: '#075985',
    label: 'Bengal Fish Delicacy',
    icon: `<path d="M150 150 Q200 112 245 150 Q200 188 150 150 Z" fill="#0284c7"/>
           <polygon points="242,150 265,132 265,168" fill="#0369a1"/>
           <circle cx="172" cy="146" r="4" fill="#ffffff"/>`,
  },
  'Vegetarian Mains': {
    bg: '#dcfce7',
    accent: '#15803d',
    secondary: '#14532d',
    label: 'Pure Bengali Veg',
    icon: `<path d="M145 155 C145 190, 255 190, 255 155 Z" fill="#15803d"/>
           <path d="M200 148 C182 122, 165 135, 200 152 C235 135, 218 122, 200 148 Z" fill="#22c55e"/>`,
  },
  'Sides & Breads': {
    bg: '#fef9c3',
    accent: '#ca8a04',
    secondary: '#854d0e',
    label: 'Luchi & Accompaniments',
    icon: `<ellipse cx="188" cy="154" rx="42" ry="22" fill="#eab308"/>
           <ellipse cx="214" cy="146" rx="40" ry="20" fill="#facc15" stroke="#ca8a04" stroke-width="2"/>`,
  },
  'Bengali Desserts': {
    bg: '#fce7f3',
    accent: '#be185d',
    secondary: '#831843',
    label: 'Kolkata Mishti',
    icon: `<path d="M148 158 C148 188, 252 188, 252 158 Z" fill="#be185d"/>
           <circle cx="182" cy="150" r="16" fill="#fff1f2" stroke="#f43f5e" stroke-width="2"/>
           <circle cx="218" cy="150" r="16" fill="#fff1f2" stroke="#f43f5e" stroke-width="2"/>`,
  },
};

function buildCourseSvg(theme: CourseTheme, dishName: string): string {
  // Strip apostrophes/quotes so data URI never breaks HTML attribute parsing
  const safeTitle = dishName.replace(/['"&<>]/g, '').slice(0, 28);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 400 300">
    <rect width="400" height="300" fill="${theme.bg}"/>
    <circle cx="200" cy="150" r="96" fill="#ffffff" stroke="${theme.accent}" stroke-width="5"/>
    <circle cx="200" cy="150" r="80" fill="none" stroke="${theme.accent}" stroke-width="1.5" stroke-dasharray="5 5" opacity="0.6"/>
    ${theme.icon}
    <text x="200" y="212" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="700" font-size="13" fill="${theme.secondary}">${safeTitle}</text>
    <text x="200" y="268" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="600" font-size="11" letter-spacing="1.5" fill="${theme.accent}">${theme.label.toUpperCase()}</text>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const DEFAULT_BENGALI_PLATE = buildCourseSvg(
  {
    bg: '#fef3c7',
    accent: '#d97706',
    secondary: '#92400e',
    label: "Queens Kitchen Stockholm",
    icon: `<circle cx="200" cy="150" r="36" fill="#f59e0b" opacity="0.3"/>`,
  },
  'Authentic Bengali Cuisine'
);

export function getDishImage(dish: { name: string; category: string; photo?: string }): string {
  if (dish.photo && dish.photo.trim() !== '') {
    return dish.photo;
  }
  const theme = COURSE_THEMES[dish.category] || {
    bg: '#fef3c7',
    accent: '#d97706',
    secondary: '#92400e',
    label: 'Bengali Specialty',
    icon: `<circle cx="200" cy="150" r="34" fill="#f59e0b" opacity="0.3"/>`,
  };
  return buildCourseSvg(theme, dish.name);
}