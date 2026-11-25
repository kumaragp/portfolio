export type SkillItem = {
  name?: string;
  icon?: string;
  devicon?: string;
};

export type SkillCategory = {
  title?: string;
  items?: SkillItem[];
};

export const skillCategories: SkillCategory[] = [
  {
    title: "Data Analytics",
    items: [
      { name: "Microsoft Excel", icon: "thesvg-color:microsoft-excel" },
      { name: "Power BI", icon:"logos:microsoft-power-bi" },
      { name: "Pandas", icon:"devicon:pandas" },
      { name: "Numpy", icon:"devicon:numpy" },
    ],
  },
  {
    title: "Programming",
    items: [
      { name: "Python", icon: "logos:python" },
      { name: "PHP", icon: "vscode-icons:file-type-php"},
      { name: "JavaScript", icon: "devicon:javascript" },
      { name: "HTML", icon: "vscode-icons:file-type-html" },
      { name: "CSS", icon: "devicon:css" },
    ],
  },
  {
    title: "Machine Learning",
    items: [
      { name: "Scikit-learn"},
      { name: "Gradient Boosting"},
      { name: "Random Forest"},
      { name: "KNN"},
      { name: "HDBScan"},
    ],
  },
  {
    title: "Framework",
    items: [
      { name: "Laravel", icon:"logos:laravel"},
      { name: "Streamlit", icon: "logos:streamlit" },
    ],
  },
  {
    title: "Database",
    items: [
      { name: "MySQL", icon: "logos:mysql" },
      { name: "Supabase", icon: "devicon:supabase" },
    ],
  },
  {
    title: "Tools & Platforms",
    items: [
      { name: "PySpark", devicon: "devicon-apachespark-original colored" },
      { name: "Databricks", icon: "devicon:databricks" },
      { name: "Docker", icon: "logos:docker-icon" },
      { name: "Git", devicon: "devicon-git-plain colored" },
      { name: "GitHub", devicon: "devicon-github-original" },
      { name: "VS Code", icon: "selfhst:visual-studio-code" },
    ],
  },
];
