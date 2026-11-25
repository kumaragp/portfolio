# Task: Refactor Project Information UI by Project Category

Refactor the existing project detail information components to provide different UI layouts for Web Development and Machine Learning projects.

The goal is to create category-specific project detail experiences while preserving the existing visual identity, styling conventions, and reusable project layout.

## 1. Component Architecture

Use the following structure:

```text
components/
└── projects/
    ├── ProjectInformation.tsx
    ├── WebDeveloper.tsx
    └── MachineLearning.tsx
```

Responsibilities:

- `ProjectInformation.tsx`: Acts as a category-based dispatcher.
- `WebDeveloper.tsx`: Renders project information for Web Development projects.
- `MachineLearning.tsx`: Renders project information for Machine Learning projects.

Use the existing `project.category` property to determine which component should be rendered.

Do not duplicate the sidebar or modify its existing layout unless necessary for navigation compatibility.

## Mandatory Component Separation

The existing project information UI has already been separated into three components:

- `ProjectInformation.tsx`
- `MachineLearning.tsx`
- `WebDeveloper.tsx`

**Preserve and continue using this component separation. Do not merge these components into a single file.**

Responsibilities:

1. `ProjectInformation.tsx`
   - Acts only as a category-based dispatcher.
   - Determines which UI component to render based on `project.category`.
   - Must not contain the actual project information layouts or rendering logic.

2. `MachineLearning.tsx`
   - Owns the complete Machine Learning project information UI.
   - Implements Data Overview, Feature Description, Problem, Solutions, and Results.

3. `WebDeveloper.tsx`
   - Owns the complete Web Development project information UI.
   - Implements Problem, Solution, and Results with a horizontally scrollable screenshot gallery.

Modify the existing `MachineLearning.tsx` and `WebDeveloper.tsx` components rather than creating alternative components or moving their rendering logic into `ProjectInformation.tsx`.

Keep the components independently maintainable and use the shared `Project` type where appropriate.

## 2. Web Development UI

Simplify the Web Development project information into three main sections:

### A. Problem
- Explain the original problem or situation that motivated the project.
- Display the description as readable editorial-style text.
- Avoid excessive cards or unnecessary visual elements.

### B. Solution
- Explain how the application addresses the identified problem.
- Support descriptive paragraphs or structured bullet points.
- Highlight important system functionality where appropriate.

### C. Results
- Display important application screenshots or UI previews.
- Present the screenshots in a horizontally scrollable gallery or carousel.
- Each screenshot must have:
  - An image preview.
  - A title describing the page or feature.
  - A short description explaining its purpose and functionality.
- Allow users to scroll horizontally to explore additional application screens.
- Use responsive image dimensions and preserve image aspect ratios.
- Provide a clean visual indicator that more screenshots are available horizontally.

The Results section should focus on actual application interfaces rather than numerical performance metrics.

## 3. Machine Learning UI

The Machine Learning project detail page should contain the following sections:

### A. Data Overview

Display a dataset preview in a structured table.

Requirements:
- Display dataset records and column headers.
- Support horizontal scrolling for tables with many columns.
- Include pagination or a reasonable row limit to prevent excessively large tables.
- Provide a CSV download action when dataset data is available.
- Do not expose private datasets or confidential records.
- If no dataset is provided, do not render an empty or fabricated table.
- Instead, display a clear private-data notification explaining that the dataset is unavailable for public viewing or download.
- Never fabricate dataset records, column names, or statistical values.

### B. Feature Description

Display a table containing:

| Feature Name | Description |
|---|---|
| feature_name | Explanation of the feature and its role in the analysis |

Requirements:
- Feature names and descriptions must come from project data.
- Support horizontal scrolling on smaller screens.
- Use readable typography and subtle table styling.
- Do not expose confidential or sensitive feature information.

### C. Problem

Explain the research problem or analytical challenge addressed by the project.

Use editorial-style text rather than excessive cards.

### D. Solutions

Explain the analytical approach and methods used.

For Machine Learning projects, this section may include:
- Data preparation.
- Feature engineering.
- Model selection.
- Model training.
- Hyperparameter optimization.

Only display information that is actually available in the project data.

### E. Results

Present model evaluation results using two main visualizations:

1. **Model Accuracy / Performance**
   - Display relevant model metrics, such as Accuracy, Precision, Recall, F1-score, or ROC-AUC.
   - Use numerical highlights or compact metric cards.
   - Only display metrics available in the project data.
   - Clearly identify which model each metric belongs to.

2. **Data Distribution**
   - Display class distribution using an appropriate chart, such as a pie chart or bar chart.
   - Show class labels, counts, and percentages when available.
   - Support comparisons between target classes when relevant.
   - Never generate or assume statistical values that are not supplied.

## 4. Project Data Structure

Review the existing `Project` type and project data before implementation.

Extend the existing type only where necessary to support the new UI.

Consider using optional properties such as:

```tsx
type Project = {
  // Existing properties

  problemStatement?: string;
  solution?: string[];

  // Web Development
  resultsGallery?: {
    title: string;
    description: string;
    image: string;
  }[];

  // Machine Learning
  dataset?: {
    columns: string[];
    rows: Record<string, string | number | boolean | null>[];
    isPrivate?: boolean;
  };

  features?: {
    name: string;
    description: string;
  }[];

  modelMetrics?: {
    modelName: string;
    accuracy?: number;
    precision?: number;
    recall?: number;
    f1Score?: number;
    rocAuc?: number;
  }[];

  dataDistribution?: {
    label: string;
    count: number;
    percentage?: number;
  }[];
};
```

This is a proposed structure, not a requirement to replace the existing project type entirely. Adapt it to the current architecture and naming conventions.

Important:
- Do not put actual confidential datasets into public project files.
- A private dataset should be represented through metadata indicating its availability status.
- Do not create fake data to populate visualizations.
- Keep optional properties optional so projects without certain information can still render correctly.

## 5. Sidebar Compatibility

Keep the existing `ProjectSidebar` design.

However, update its navigation items according to the project category:

**Web Development**
- Problem
- Solution
- Results

**Machine Learning**
- Data Overview
- Feature Description
- Problem
- Solutions
- Results

Ensure that navigation IDs match the actual section IDs in each component.

## 6. UI / UX Guidelines

Maintain the existing portfolio design language:

- Use Tailwind CSS and existing theme variables.
- Preserve existing colors, typography, borders, and spacing conventions.
- Prefer editorial layouts over excessive card-based layouts.
- Use subtle dividers and section numbering where appropriate.
- Keep the sidebar visually unchanged.
- Ensure responsive behavior on desktop, tablet, and mobile.
- Use accessible semantic HTML and meaningful ARIA labels.
- Provide empty states for unavailable information.
- Avoid unnecessary dependencies.

For the horizontally scrollable Results gallery:
- Use CSS overflow scrolling or an existing carousel component if available.
- Avoid introducing a new library unless necessary.
- Ensure images do not stretch or distort.

For dataset tables:
- Implement CSV export safely.
- Properly escape CSV values, including commas, quotes, and line breaks.
- Do not allow CSV export when the dataset is private or unavailable.

## 7. Implementation Instructions

Before modifying files:

1. Inspect the existing project components, project types, category definitions, and project data.
2. Identify the current sidebar navigation implementation.
3. Reuse existing components and utilities wherever possible.
4. Avoid unnecessary changes to unrelated pages or layouts.

After implementation:

1. Verify that both project categories render correctly.
2. Verify that sidebar navigation targets the correct sections.
3. Verify horizontal scrolling of the Web Development results gallery.
4. Verify CSV export and the private dataset notification.
5. Verify that Machine Learning metrics and distribution charts only render when valid data exists.
6. Check TypeScript errors and responsive layout behavior.

Do not replace existing project content with fabricated examples. Preserve existing project data and make the new properties optional where information has not yet been supplied.

The final result should provide two distinct project presentation experiences while maintaining a consistent portfolio design system.