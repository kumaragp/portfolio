# AGENTS.md — Personal Portfolio Website

## 1. Project Overview

Build and maintain a modern, professional, minimalist personal portfolio website for **Kumara Galan Pramana**, an Information Systems graduate from Telkom University Purwokerto.

The primary purpose of this website is to present professional skills, academic background, technical projects, and practical experience to recruiters, hiring managers, and potential collaborators.

### Professional Positioning

Position the owner primarily as an aspiring **Data Analyst**, while also showcasing experience and interests in:

- Data Analytics
- Machine Learning
- Data Science
- Software Development

The website must communicate analytical thinking, technical capability, attention to detail, and professional credibility.

Do not position the owner as an experienced professional or senior specialist. Use realistic descriptions that reflect an early-career professional.

---

## 2. Mandatory Instructions for the AI Agent

These instructions must be followed throughout the project.

### 2.1 Requirement Priority

Follow this priority order when making implementation decisions:

1. Explicit requirements in this file.
2. Existing project architecture and dependencies.
3. Consistency with the established design system.
4. Maintainability, accessibility, and performance.
5. Reasonable implementation decisions when details are unspecified.

Do not silently ignore, replace, or simplify mandatory requirements.

If a requirement cannot be implemented because of missing information, assets, credentials, or technical limitations:

- Explain the limitation.
- Implement a reasonable fallback when possible.
- Clearly identify anything that remains incomplete.
- Do not pretend the feature is fully functional.

### 2.2 Do Not Invent Information

Never fabricate:

- Professional experience.
- Project results or performance metrics.
- Academic achievements.
- Graduation dates or years.
- Certifications.
- Contact information.
- GitHub repositories.
- Live demo URLs.
- Project screenshots.
- Company information or confidential business data.

Use only information provided in the project instructions or verified project assets.

If information is unavailable, omit it or use an explicitly identified development placeholder that is not presented as real information.

### 2.3 Preserve Existing Work

Before modifying the project:

- Inspect the existing directory structure.
- Read the existing `package.json`.
- Check installed dependencies and framework versions.
- Inspect existing components and styling conventions.
- Review existing `AGENTS.md` and project documentation.
- Identify existing functionality that must be preserved.

Do not recreate an existing project from scratch unless explicitly requested.

Do not overwrite configuration files unnecessarily.

---

## 3. Design System

### 3.1 Overall Design Direction

Use a **Dark Minimalist Monochrome Design**.

The website should feel:

- Modern.
- Professional.
- Clean.
- Minimalist.
- Editorial-inspired.
- Sophisticated but approachable.

The visual identity should rely on typography, spacing, contrast, layout composition, and subtle visual details rather than excessive decoration.

The primary website theme MUST be dark.

Do not use a predominantly white background.

### 3.2 Color Palette

Use the following palette consistently:

| Element              | Color     |
| -------------------- | --------- |
| Primary background   | `#111111` |
| Secondary background | `#1A1A1A` |
| Card background      | `#222222` |
| Primary text         | `#FFFFFF` |
| Secondary text       | `#A1A1AA` |
| Muted text           | `#71717A` |
| Borders and dividers | `#333333` |
| Accent               | `#E5E5E5` |

Requirements:

- Maintain sufficient contrast between text and backgrounds.
- Use accent colors sparingly.
- Avoid unnecessary colorful gradients.
- Avoid excessive shadows and decorative effects.
- Use consistent border colors and surface treatments.
- Light surfaces may be used only for specific content elements when there is a clear design reason. They must not change the overall dark identity.

Centralize reusable colors through CSS variables or the existing Tailwind configuration appropriate to the installed version.

Do not scatter inconsistent color values throughout components.

### 3.3 Typography and Layout

Use:

- Strong typography hierarchy.
- Clear section headings.
- Readable body text.
- Generous but controlled spacing.
- Consistent alignment.
- Responsive container widths.
- Subtle borders and separators.
- Restrained rounded corners.

Avoid:

- Oversized text that harms usability.
- Excessively empty sections.
- Dense blocks of text.
- Inconsistent spacing.
- Excessive rounded cards.
- Unnecessary decorative icons.

The website should not look like an unmodified generic portfolio template.

### 3.4 Animation and Interaction

Use restrained animations:

- Smooth scrolling.
- Subtle section entrance transitions.
- Gentle hover effects on project cards.
- Button hover transitions.
- Minimal navigation transitions.
- Small image scale effects when appropriate.

Avoid:

- Excessive parallax.
- Constant floating animations.
- Large animated backgrounds.
- Unnecessary loading animations.
- Excessive motion.
- Animations that interfere with reading or navigation.

Respect `prefers-reduced-motion`.

Use Framer Motion only when native CSS transitions or simple browser behavior are insufficient. Do not install additional animation libraries without a clear reason.

---

## 4. Technology Stack

Use the existing project configuration whenever possible.

Expected technology stack:

- Framework: Next.js.
- Language: TypeScript.
- Styling: Tailwind CSS.
- Icons: Lucide React.
- Animation: CSS transitions or Framer Motion when necessary.
- Deployment: Vercel.
- Version control: GitHub.

Technical requirements:

1. Use TypeScript consistently.
2. Prefer reusable components.
3. Keep components focused on a single responsibility.
4. Separate content data from presentation.
5. Avoid unnecessary dependencies.
6. Avoid duplicated code.
7. Use semantic HTML.
8. Keep the implementation maintainable and understandable.

Do not upgrade framework versions or replace dependencies without a valid reason.

---

## 5. Mandatory Component Architecture

Modularity is a mandatory requirement, not an optional preference.

### 5.1 Component Separation

Each major website section MUST have its own component file.

Do not implement the entire portfolio inside `app/page.tsx`.

The page file should primarily compose the existing section components.

Suggested architecture:

```text
portfolio/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── projects/
│       └── [slug]/
│           └── page.tsx
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   │
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx
│   │   ├── Certifications.tsx
│   │   └── Contact.tsx
│   │
│   ├── projects/
│   │   ├── ProjectCard.tsx
│   │   ├── ProjectDetail.tsx
│   │   └── ProjectGallery.tsx
│   │
│   └── ui/
│       ├── Button.tsx
│       ├── SectionHeading.tsx
│       └── Container.tsx
│
├── data/
│   ├── projects.ts
│   ├── skills.ts
│
├── public/
│   ├── images/
│   ├── projects/
│   └── documents/
│
└── README.md
```

This is the preferred structure. Adjust it only when the existing project architecture or a genuine technical requirement justifies a change.

### 5.2 Architecture Rules

- `app/page.tsx` must only compose the main page sections.
- Each major section must remain in its own component.
- Project cards must be reusable.
- Project information must be stored in centralized data files.
- Repeated UI elements should be extracted into reusable components when appropriate.
- Avoid oversized components with unrelated responsibilities.
- Keep styling consistent across components.
- Use clear and descriptive file names.

Do not create unnecessary abstractions for very small or one-time elements.

### 5.3 Data Separation

Project content, skills, and education information must be stored separately from UI components.

For example:

- `data/projects.ts` stores project descriptions, categories, technology tags, images, and available links.
- `data/skills.ts` stores skill categories and their items.

Components should consume these data structures instead of hardcoding the same information repeatedly.

Use appropriate TypeScript types or interfaces.

---

## 6. Website Structure and Content

The portfolio should be a single-page main website with dedicated project detail routes.

Main navigation:

- Home
- About
- Skills
- Projects
- Contact

### 6.1 Navbar

Create a clean and responsive navigation bar.

Requirements:

- Text-based personal brand: `KGP.`
- Sticky navigation.
- Smooth scrolling to main sections.
- Active section indication.
- Responsive mobile navigation.
- Subtle bottom border.
- Accessible keyboard interactions.

Ensure the navigation does not cover section headings when scrolling. Use appropriate scroll offset behavior.

### 6.2 Hero Section

Present a clear professional introduction.

**Name:**

Kumara Galan Pramana

**Professional Title:**

Aspiring Data Analyst | Information Systems Graduate

**Introduction:**

"An Information Systems graduate with an interest in data analytics, data processing, and developing data-driven solutions. Passionate about transforming data into meaningful insights through analytical thinking and technology."

Include:

- Prominent headline.
- Short professional introduction.
- Primary CTA: `Explore My Projects`.
- Secondary CTA: `Download CV`, only when an actual CV file is available.
- LinkedIn link, only when the real URL is provided.
- GitHub link, only when the real URL is provided.

Design decisions:

- Use a typography-focused hero layout.
- Do not require a profile photograph.
- Do not generate a fictional portrait or avatar.
- Keep the composition visually balanced.
- Avoid excessive text.

If the CV or social URLs are unavailable, hide the corresponding action instead of displaying broken links.

### 6.3 About Me

**Section title:**

About Me

**Content:**

"I am an Information Systems graduate from Telkom University Purwokerto with an interest in Data Analytics and technology-driven problem solving.

My experience includes working on data analysis, machine learning projects, database management, and web application development.

I enjoy exploring data, identifying patterns, and translating information into meaningful insights that support better decision-making.

I continuously develop my technical and analytical skills through practical projects and independent learning."

Present the information in a concise and readable layout.

Avoid repeating the entire hero introduction.

### 6.4 Skills & Technologies

**Section title:**

Skills & Technologies

Organize skills into these categories:

**Data Analytics**

- Microsoft Excel
- SQL
- Data Cleaning
- Exploratory Data Analysis
- Data Visualization

**Programming**

- Python
- PHP
- JavaScript

**Machine Learning**

- Scikit-learn
- XGBoost
- SHAP
- Pandas
- NumPy

**Database**

- MySQL
- Supabase

**Tools & Platforms**

- Git
- GitHub
- VS Code
- Streamlit
- Laravel
- Databricks

Requirements:

- Use clean category cards, simple lists, or monochrome icons.
- Keep the visual presentation consistent.
- Do not use percentage-based skill bars.
- Do not invent skill proficiency levels.
- Do not imply expertise beyond the owner's actual experience.

### 6.5 Projects

**Section title:**

Selected Projects

This is the most important section of the portfolio.

Display projects using a responsive card grid.

Each card should contain:

- Project thumbnail when available.
- Project name.
- Short description.
- Project category.
- Technology tags.
- View Details action.
- GitHub link when publicly available.
- Live Demo link when available.

Organize projects into the following categories.

#### Category A — Data Analytics & Machine Learning

**Project 1: Material Classification Using Machine Learning**

Description:

A machine learning project focused on classifying material characteristics to support the identification of overstock and defect risks in a manufacturing inventory context.

Technologies:

Python, Pandas, XGBoost, Optuna, Randomized Search, SHAP, Streamlit.

Confidentiality requirements:

- Do not expose the original company name unless explicitly approved.
- Do not expose original company datasets or internal records.
- Do not expose model files, confidential variables, or sensitive business information.
- Use anonymized descriptions.
- Only use approved visualizations and screenshots.
- Do not disclose confidential operational details.
- Do not describe the project as a real-time monitoring or early-warning system.
- Do not imply that the system replaces an ERP or inventory management system.

**Project 2: Fraud Detection Dashboard**

Description:

An interactive dashboard for analyzing and identifying fraudulent transactions using machine learning techniques.

Technologies:

Python, Pandas, Scikit-learn, Random Forest, Streamlit.

**Project 3: Data Analysis Projects**

Description:

A collection of data analysis projects demonstrating data cleaning, exploratory analysis, SQL querying, Excel analysis, and visualization.

Technologies:

Excel, SQL, Python, Power BI when applicable.

Important:

Do not create fictional case studies or placeholder projects presented as completed work.

If actual data analysis projects are not yet available, hide this project card until real project information and assets are provided.

#### Category B — Software Development & Automation

**Project 4: Warga Simpel — Village Administration System**

Description:

A web-based application designed to simplify administrative letter services and improve village administration workflows.

Technologies:

Laravel, PHP, MySQL, Blade, Tailwind CSS, JavaScript.

**Project 5: MANIS — Inventory Management System**

Description:

An inventory management application developed to support inventory data management and operational processes.

Technologies:

Laravel, Livewire, MySQL, Tailwind CSS, JavaScript.

**Project 6: Automated News Scraping**

Description:

An automated news data collection pipeline that gathers news articles from multiple sources and processes the collected data for further analysis.

Technologies:

Python, Supabase, Databricks, Apache Spark, Docker.

#### Project Presentation Rules

- Do not invent project results, metrics, or achievements.
- Do not fabricate repository URLs or demo links.
- Do not create fake screenshots.
- Do not use unrelated stock images as if they were actual project screenshots.
- Use neutral visual placeholders only during development.
- Projects without public links should use an appropriate label such as `Private Project`.
- Do not expose confidential information.

### 6.6 Project Detail Pages

Each project must have a dedicated detail page using a dynamic route:

`/projects/[slug]`

Use centralized project data to generate the corresponding detail pages.

Suggested content structure:

1. Project Overview.
2. Background and Problem Statement.
3. Project Objectives.
4. Methodology or Workflow.
5. Tools and Technologies.
6. Implementation.
7. Results and Key Findings.
8. Screenshots or Visualizations.
9. GitHub Repository or Live Demo, if available.

Requirements:

- Use a clean editorial layout.
- Maintain the dark monochrome design system.
- Provide clear section headings.
- Include a back-to-projects navigation link.
- Use actual project assets when available.
- Hide unavailable information rather than inventing content.
- Clearly label private projects.
- Ensure invalid project slugs have an appropriate not-found experience.

Do not implement project details as a modal. Use dedicated pages to support clearer navigation, better readability, and future expansion.

### 6.7 Certifications & Learning

This section is optional and should only be displayed when actual information is available.

Potential content:

- Professional certifications.
- Online courses.
- Technical training.
- Relevant workshops.

Do not create fake certification entries.

If no verified credentials are available, hide the section entirely rather than displaying empty cards or fictional placeholders.

### 6.8 Contact

**Section title:**

Let's Connect

**Introduction:**

"I'm open to opportunities, collaborations, and discussions related to data analytics and technology."

Include:

- Email.
- LinkedIn.
- GitHub.

Only display real contact information after it has been provided.

Contact form decision:

- Do not implement a non-functional contact form.
- Use direct contact links instead.
- A contact form may be introduced later when a real backend or email service is configured.
- Never claim that messages are being delivered without a working integration.

### 6.9 Footer

Include:

- Name or initials.
- Dynamic copyright year.
- LinkedIn, when available.
- GitHub, when available.
- Back-to-top link.

Keep the footer simple and consistent with the dark monochrome theme.

---

## 7. Responsive Design

The website must work across:

- Desktop.
- Laptop.
- Tablet.
- Mobile devices.

Requirements:

- No horizontal overflow.
- Responsive typography.
- Adaptive project card grids.
- Mobile-friendly navigation.
- Appropriate spacing on smaller screens.
- Optimized images.
- Accessible interactive elements.
- Consistent layout across screen sizes.

Do not simply shrink the desktop layout.

Review how each section behaves independently on smaller screens.

---

## 8. Accessibility and User Experience

Prioritize:

- Fast loading.
- Clear navigation.
- Readable typography.
- Consistent spacing.
- Accessible contrast.
- Semantic HTML.
- Keyboard navigation.
- Descriptive image alt text.
- Visible focus states.
- Accessible button and link labels.
- Reduced-motion support.

Every button and link must have a meaningful action.

Do not use decorative elements that appear interactive but do nothing.

The experience should be intuitive for recruiters who may only spend a short time reviewing the portfolio.

---

## 9. SEO and Performance

Implement:

- Appropriate page title.
- Meta description.
- Open Graph metadata.
- Favicon.
- Semantic HTML structure.
- Optimized images.
- Good Lighthouse performance practices.

Suggested page title:

`Kumara Galan Pramana | Data Analyst Portfolio`

Suggested meta description:

`Explore the portfolio of Kumara Galan Pramana, an Information Systems graduate interested in Data Analytics, Machine Learning, and Software Development.`

Additional requirements:

- Use meaningful page metadata.
- Avoid unnecessary client-side rendering.
- Use Next.js features appropriately.
- Optimize images using suitable Next.js image handling.
- Avoid loading unnecessary libraries.
- Keep the website lightweight.

---

## 10. Development Workflow

Do not attempt to implement the entire website carelessly in one step.

Work in the following phases.

### Phase 1 — Project Inspection and Planning

Before coding:

1. Inspect the project directory.
2. Read `package.json`.
3. Identify the installed Next.js and Tailwind CSS versions.
4. Review the existing application structure.
5. Check existing dependencies.
6. Identify existing assets.
7. Plan the component architecture.
8. Identify missing information and assets.

Do not modify files before understanding the existing project.

### Phase 2 — Foundation and Design System

Implement:

1. Global CSS.
2. Dark monochrome color system.
3. Typography.
4. Container and spacing conventions.
5. Reusable UI components.
6. Root layout.
7. Responsive foundation.

Verify that the dark theme is applied consistently before continuing.

### Phase 3 — Main Portfolio Sections

Implement each section as a separate component:

1. Navbar.
2. Hero.
3. About.
4. Skills.
5. Projects.
6. Certifications, if actual content exists.
7. Contact.
8. Footer.

Ensure `app/page.tsx` only composes these sections.

### Phase 4 — Project Detail Pages

Implement:

1. Centralized project data.
2. TypeScript project types.
3. Dynamic project routes.
4. Reusable project detail components.
5. Project image and gallery handling.
6. Navigation between project details and the main portfolio.

Verify that every available project route works.

### Phase 5 — Interaction and Refinement

Implement and verify:

- Smooth scrolling.
- Active navigation state.
- Mobile navigation.
- Hover interactions.
- Subtle animations.
- Reduced-motion behavior.
- Responsive layouts.

Do not add unnecessary animations simply to make the website appear more sophisticated.

### Phase 6 — SEO and Final Verification

Implement metadata, favicon, and performance improvements.

Then verify the complete website.

Do not claim completion before performing the checks.

---

## 11. Code Quality Rules

Follow these rules during implementation:

1. Use readable and consistent TypeScript.
2. Avoid unnecessary `any` types.
3. Use meaningful component and variable names.
4. Avoid duplicated logic.
5. Separate data from presentation.
6. Keep components focused.
7. Use reusable UI elements when appropriate.
8. Avoid unnecessary dependencies.
9. Avoid unused imports and variables.
10. Do not leave broken links or non-functional buttons.
11. Do not introduce unrelated features.
12. Preserve existing project functionality.

Do not sacrifice maintainability for a quick visual result.

---

## 12. Verification Checklist

After implementation, perform the following checks.

### Project and Build

- [ ] Project structure follows the modular architecture.
- [ ] Main sections use separate component files.
- [ ] `app/page.tsx` only composes the sections.
- [ ] Content is separated into data files.
- [ ] No unnecessary dependencies were introduced.
- [ ] TypeScript checks pass.
- [ ] Production build succeeds.

### Design

- [ ] Dark monochrome theme is applied consistently.
- [ ] Typography hierarchy is clear.
- [ ] Spacing is consistent.
- [ ] Cards and buttons follow the design system.
- [ ] No unnecessary visual effects exist.

### Functionality

- [ ] Navbar links work.
- [ ] Mobile navigation works.
- [ ] Section navigation works.
- [ ] Project cards open the correct detail pages.
- [ ] Back navigation works.
- [ ] External links point to valid destinations.
- [ ] No buttons are decorative without functionality.
- [ ] Missing assets do not create broken images.

### Responsiveness

- [ ] Desktop layout works.
- [ ] Laptop layout works.
- [ ] Tablet layout works.
- [ ] Mobile layout works.
- [ ] No horizontal overflow exists.

### Accessibility and Performance

- [ ] Semantic HTML is used.
- [ ] Keyboard navigation works.
- [ ] Focus states are visible.
- [ ] Image alt text is appropriate.
- [ ] Reduced-motion preference is respected.
- [ ] Images and assets are optimized.

### Content Integrity

- [ ] No fabricated achievements or metrics.
- [ ] No fabricated contact information.
- [ ] No fabricated project links.
- [ ] No confidential company information.
- [ ] Missing information is omitted or clearly identified.

If any checklist item cannot be completed, report it explicitly.

---

## 13. Documentation

Maintain a useful `README.md` for human developers.

The README should contain:

- Project overview.
- Technology stack.
- Main features.
- Installation instructions.
- Development commands.
- Build instructions.
- Deployment information.
- Project directory structure.

Keep implementation instructions in `AGENTS.md`, not duplicated throughout the README.

Update the README when the actual architecture or setup changes.

---

## 14. Final Design Objective

The final website should communicate:

- Professionalism.
- Analytical thinking.
- Technical capability.
- Attention to detail.
- Simplicity.
- Credibility.

The overall aesthetic should resemble a high-quality modern personal portfolio, combining:

- Dark editorial design.
- Strong typography.
- Minimal monochrome visuals.
- Structured project presentations.
- Clear navigation.
- Subtle interactions.
- Maintainable code architecture.

**Final instruction:**

Do not produce a generic portfolio template.

Create a distinctive and polished portfolio intentionally designed for an aspiring Data Analyst with an Information Systems background and additional experience in Machine Learning and Software Development.

Focus on content clarity, visual hierarchy, professional presentation, modular architecture, and reliable functionality rather than excessive animations or decorative effects.

When implementation is complete, provide a concise report describing:

1. What was implemented.
2. Which files were created or modified.
3. Which features were tested.
4. Whether the TypeScript checks and production build succeeded.
5. Any remaining limitations or missing information.

Never claim that a feature works unless it has been implemented and verified.