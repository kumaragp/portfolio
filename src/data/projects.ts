export type ProjectCategory = "Data Analytics & Machine Learning" | "Web Development" | "Data Engineering";

export type ProjectVisibility = "public" | "private";

export type ProjectDataset = {
  previewUrl?: string;
  downloadUrl?: string;
  isPrivate?: boolean;
};

export type ProjectFeature = {
  name: string;
  description: string;
};

export type ProjectClassMetric = {
  classLabel: string;
  className: string;
  precision?: number;
  recall?: number;
  f1Score?: number;
  support?: number;
};

export type ProjectConfusionMatrix = {
  trueNegative: number;
  falsePositive: number;
  falseNegative: number;
  truePositive: number;
};

export type ProjectModelMetric = {
  source?: string;
  modelName: string;
  accuracy?: number;
  precision?: number;
  recall?: number;
  f1Score?: number;
  rocAuc?: number;
  classMetrics?: ProjectClassMetric[];
  confusionMatrix?: ProjectConfusionMatrix;
};

export type ProjectDataDistribution = {
  source?: string;
  modelName: string;
  label: string;
  count: number;
  percentage?: number;
};

export type ProjectGalleryItem = {
  title: string;
  description: string;
  image: string;
};

export type ProjectResultsTable = {
  headers: string[];
  rows: string[][];
};

export type Project = {
  // Project Information
  slug: string;
  title: string;
  shortDescription: string;
  category: ProjectCategory;
  projectType?: string;
  technologies: string[];
  image?: string;
  visibility: ProjectVisibility;
  githubUrl?: string;
  liveUrl?: string;

  // Project Details
  overview?: string;
  problemStatement?: string;
  objectives?: string[];
  problemHighlights?: string[];
  approach?: string[];
  implementation?: string[];
  solution?: string[];
  keyContributions?: string[];
  results?: string[];
  insight?: string;
  recommendation?: string;

  // Data & Machine Learning
  dataset?: ProjectDataset;
  dataVariables?: string[];
  features?: ProjectFeature[];
  modelMetrics?: ProjectModelMetric[];
  dataDistribution?: ProjectDataDistribution[];

  // Results & Documentation
  resultsGallery?: ProjectGalleryItem[];
  resultsLayout?: "image-table" | "reserved";
  resultsTable?: ProjectResultsTable;

  // Architecture
  architectureRequirements?: ProjectFeature[];
  architectureDiagram?: string;
};

export const projects: Project[] = [
  // Data Analytics & Machine Learning

  // Material Classification
  {
    slug: "material-classification",
    title: "Material Classification",
    shortDescription: "A machine learning project focused on classifying material in a manufacturing inventory.",

    category: "Data Analytics & Machine Learning",
    projectType: "Final Year Project",

    technologies: ["Python", "Pandas", "Scikit-learn", "XGBoost", "Bayesian Optimization", "Randomized Search", "SHAP", "Streamlit"],

    dataVariables: [
      "carry_over_qty",
      "incoming_total",
      "return_total",
      "delivery_total",
      "theory_stock",
      "total_stock_raw_mat",
      "rm_ng",
      "ng_repair",
      "total_stock_fg",
      "rm_warehouse_main",
      "rm_sa",
      "rm_warehouse_material_slow_move",
      "candidate_dispose",
    ],

    overview:
      "This project applies machine learning to analyze material characteristics and classify potential overstock and material damage risks in a manufacturing inventory environment. The models are designed as analytical decision-support tools based on historical inventory data.",

    problemStatement:
      "Inventory discrepancies between recorded and actual stock, along with material damage, can create operational challenges in manufacturing. These conditions may result in excess inventory, material waste, and difficulties in maintaining accurate stock records.",

    problemHighlights: ["recorded and actual stock", "operational challenges in manufacturing", "excess inventory", "material waste", "difficulties in maintaining"],

    dataDistribution: [
      {
        source: "evaluation",
        modelName: "Overstock Classification",
        label: "Non-Overstock",
        count: 1252,
        percentage: 26.65,
      },
      {
        source: "evaluation",
        modelName: "Overstock Classification",
        label: "Overstock",
        count: 3446,
        percentage: 73.35,
      },
      {
        source: "evaluation",
        modelName: "Defect Classification",
        label: "Non-Defect",
        count: 2515,
        percentage: 53.53,
      },
      {
        source: "evaluation",
        modelName: "Defect Classification",
        label: "Defect",
        count: 2183,
        percentage: 46.47,
      },

      // Latest Dataset
      {
        source: "latest",
        modelName: "Overstock Classification",
        label: "Non-Overstock",
        count: 1265,
        percentage: 26.86,
      },
      {
        source: "latest",
        modelName: "Overstock Classification",
        label: "Overstock",
        count: 3444,
        percentage: 73.13,
      },
      {
        source: "latest",
        modelName: "Defect Classification",
        label: "Non-Defect",
        count: 2761,
        percentage: 58.63,
      },
      {
        source: "latest",
        modelName: "Defect Classification",
        label: "Defect",
        count: 1948,
        percentage: 41.36,
      },
    ],

    modelMetrics: [
      {
        source: "evaluation",
        modelName: "Overstock Classification",
        accuracy: 98.08,
        rocAuc: 0.9952,

        classMetrics: [
          {
            classLabel: "Class 0",
            className: "Non-Fraud",
            precision: 0.98,
            recall: 0.95,
            f1Score: 0.96,
            support: 251,
          },
          {
            classLabel: "Class 1",
            className: "Fraud",
            precision: 0.98,
            recall: 0.99,
            f1Score: 0.99,
            support: 689,
          },
        ],

        confusionMatrix: {
          trueNegative: 238,
          falsePositive: 13,
          falseNegative: 5,
          truePositive: 685,
        },
      },
      {
        source: "evaluation",
        modelName: "Defect Classification",
        accuracy: 0.8372,
        rocAuc: 0.9161,

        classMetrics: [
          {
            classLabel: "Class 0",
            className: "Non-Fraud",
            precision: 0.89,
            recall: 0.8,
            f1Score: 0.84,
            support: 5008,
          },
          {
            classLabel: "Class 1",
            className: "Fraud",
            precision: 0.79,
            recall: 0.88,
            f1Score: 0.83,
            support: 432,
          },
        ],

        confusionMatrix: {
          trueNegative: 407,
          falsePositive: 101,
          falseNegative: 52,
          truePositive: 380,
        },
      },
      {
        source: "latest",
        modelName: "Overstock Classification",
        accuracy: 96.7,
        rocAuc: 0.9898,

        classMetrics: [
          {
            classLabel: "Class 0",
            className: "Non-Fraud",
            precision: 0.97,
            recall: 0.91,
            f1Score: 0.94,
            support: 253,
          },
          {
            classLabel: "Class 1",
            className: "Fraud",
            precision: 0.97,
            recall: 0.99,
            f1Score: 0.98,
            support: 689,
          },
        ],

        confusionMatrix: {
          trueNegative: 230,
          falsePositive: 23,
          falseNegative: 8,
          truePositive: 681,
        },
      },
      {
        source: "latest",
        modelName: "Defect Classification",
        accuracy: 0.9171,
        rocAuc: 0.9672,

        classMetrics: [
          {
            classLabel: "Class 0",
            className: "Non-Defect",
            precision: 0.94,
            recall: 0.91,
            f1Score: 0.93,
            support: 548,
          },
          {
            classLabel: "Class 1",
            className: "Defect",
            precision: 0.88,
            recall: 0.92,
            f1Score: 0.9,
            support: 394,
          },
        ],

        confusionMatrix: {
          trueNegative: 500,
          falsePositive: 48,
          falseNegative: 30,
          truePositive: 364,
        },
      },
    ],

    approach: [
      "Perform data cleaning and preprocessing on historical inventory data.",
      "Conduct Exploratory Data Analysis (EDA) to understand material characteristics.",
      "Perform feature selection and categorical encoding.",
      "Construct separate target labels for overstock and defects classification.",
      "Develop XGBoost classification models.",
      "Optimize hyperparameters using Bayesian Optimization and Randomized Search.",
      "Evaluated model performance using classification metrics and confusion matrices.",
      "Apply SHAP to interpret model predictions and feature contributions.",
      "Developed a Streamlit dashboard for data exploration, model evaluation, and risk analysis.",
    ],

    visibility: "private",
  },

  // Fraud Detection Dashboard
  {
    slug: "fraud-detection-dashboard",
    title: "Fraud Detection Dashboard",
    shortDescription: "An interactive dashboard for analyzing and identifying fraudulent transactions.",

    category: "Data Analytics & Machine Learning",
    projectType: "Personal Project",
    technologies: ["Python", "Pandas", "Scikit-learn", "Random Forest", "Streamlit"],

    githubUrl: "https://github.com/kumaragp/fraud-detection",
    liveUrl: "https://fraud-detects.streamlit.app/",

    dataset: {
      previewUrl: "/dataset/dummy_dataset/synthetic_fraud_dataset.json",
      downloadUrl: "/dataset/real_dataset/synthetic_fraud_dataset.csv",
      isPrivate: false,
    },

    overview:
      "This project explores transaction data to identify patterns associated with fraudulent financial activities. A Random Forest classification model is integrated into an interactive dashboard to support transaction analysis and fraud monitoring.",

    features: [
      {
        name: "Transaction_ID",
        description: "Unique identifier assigned to each transaction.",
      },
      {
        name: "User_ID",
        description: "Unique identifier assigned to each user.",
      },
      {
        name: "Transaction_Amount",
        description: "Monetary value of the transaction.",
      },
      {
        name: "Transaction_Type",
        description: "Type or category of the transaction.",
      },
      {
        name: "Timestamp",
        description: "Date and time when the transaction occurred.",
      },
      {
        name: "Account_Balance",
        description: "User's account balance at the time of transaction.",
      },
      {
        name: "Device_Type",
        description: "Device used to perform the transaction.",
      },
      {
        name: "Location",
        description: "Geographical location associated with the transaction.",
      },
      {
        name: "Merchant_Category",
        description: "Category of the merchant involved in the transaction.",
      },
      {
        name: "IP_Address_Flag",
        description: "Indicates whether the IP address has been flagged as suspicious.",
      },
      {
        name: "Previous_Fraudulent_Activity",
        description: "Indicates previous fraudulent activity associated with the user.",
      },
      {
        name: "Daily_Transaction_Count",
        description: "Total number of transactions performed by the user in one day.",
      },
      {
        name: "Avg_Transaction_Amount_7d",
        description: "Average transaction amount over the previous seven days.",
      },
      {
        name: "Failed_Transaction_Count_7d",
        description: "Number of failed transactions within the previous seven days.",
      },
      {
        name: "Card_Type",
        description: "Type of payment card used for the transaction.",
      },
      {
        name: "Card_Age",
        description: "Age of the payment card.",
      },
      {
        name: "Transaction_Distance",
        description: "Distance between the transaction location and the user's usual location.",
      },
      {
        name: "Authentication_Method",
        description: "Authentication method used to authorize the transaction.",
      },
      {
        name: "Risk_Score",
        description: "Risk score associated with the transaction.",
      },
      {
        name: "Is_Weekend",
        description: "Indicates whether the transaction occurred on a weekend.",
      },
      {
        name: "Fraud_Label",
        description: "Target variable indicating whether the transaction is fraudulent.",
      },
    ],

    problemStatement:
      "Financial transactions may exhibit patterns and characteristics that are difficult to identify through manual review, especially when they involve a large number of transactions and interrelated variables. This situation calls for an approach that can analyze transaction characteristics, classify activities as potentially fraudulent or legitimate, and help direct further analysis toward relevant patterns.",

    problemHighlights: ["difficult to identify through manual review", "a large number of transactions and interrelated variables", "classify activities as potentially fraudulent or legitimate"],

    solution: [
      "Perform data exploration and preprocessing.",
      "Analyze transaction distributions and patterns.",
      "Prepare features for machine learning classification.",
      "Develop a Random Forest classification model.",
      "Evaluate model performance using classification metrics.",
      "Implemented transaction analysis and visualization using Streamlit.",
      "Presented fraud distribution and transaction-related insights through dashboard components.",
    ],

    dataDistribution: [
      {
        modelName: "Frauds Classification",
        label: "Non-Fraud",
        count: 33933,
        percentage: 67.87,
      },
      {
        modelName: "Frauds Classification",
        label: "Fraud",
        count: 16067,
        percentage: 32.13,
      },
    ],

    modelMetrics: [
      {
        modelName: "Frauds Classification",
        accuracy: 1.0,
        rocAuc: 1.0,

        classMetrics: [
          {
            classLabel: "Class 0",
            className: "Non-Fraud",
            precision: 1.0,
            recall: 1.0,
            f1Score: 1.0,
            support: 6800,
          },
          {
            classLabel: "Class 1",
            className: "Fraud",
            precision: 1.0,
            recall: 1.0,
            f1Score: 1.0,
            support: 3200,
          },
        ],

        confusionMatrix: {
          trueNegative: 5547,
          falsePositive: 0,
          falseNegative: 0,
          truePositive: 2624,
        },
      },
    ],

    insight:
      "The “Restaurants” merchant category showed a fraud rate of 33.89% between 3:00 p.m. and 7:00 p.m., with an average total value of frauds transactions of approximately US$15,000 per hour. These findings indicate a high level of fraud activity during that period.",

    recommendation:
      "Prioritize monitoring of transactions in the “Restaurants” category between 3:00 p.m. and 7:00 p.m. by analyzing fraud patterns and potential losses. Since the data used is synthetic, the findings must be validated using actual transaction data before being implemented.",

    visibility: "public",
  },

  // Data Engineering

  // Automated News Data Scrapping
  {
    slug: "automated-news-scraping",
    title: "Automated News Scraping",
    shortDescription: "An automated news data collection pipeline that gathers news articles from multiple sources.",

    architectureDiagram: "/images/assets/data-architecture.png",
    githubUrl: "https://github.com/kumaragp/automated-news-data-scraping",

    category: "Data Engineering",
    projectType: "Personal Project",

    technologies: ["Python", "Supabase", "Databricks", "Apache Spark", "Docker"],

    overview: "This project implements an automated news collection pipeline that retrieves articles from multiple Indonesian news platforms. The collected data is processed and stored for further exploration and analysis.",

    problemStatement:
      "Collecting news articles from multiple sources manually can be time-consuming and inefficient, especially when data needs to be gathered regularly from different news platforms. This creates a need for an automated pipeline that periodically retrieves news articles, consolidates data from multiple sources, and stores them in a centralized location.",

    architectureRequirements: [
      {
        name: "Data Integration",
        description: "Integrate data from multiple sources into a centralized data repository.",
      },
      {
        name: "Data Storage",
        description: "Provide structured storage to organize and maintain processed data.",
      },
      {
        name: "Data Processing",
        description: "Support data transformation and preparation before loading into the data warehouse.",
      },
      {
        name: "Data Accessibility",
        description: "Enable users to access structured data for reporting and analytical purposes.",
      },
    ],

    resultsLayout: "image-table",

    resultsGallery: [
      {
        title: "Output Implementation",
        description: "The results of the implementation.",
        image: "/images/assets/workcloud.png",
      },
    ],

    resultsTable: {
      headers: ["Word", "Frequency", "Proportion", "Percentage"],
      rows: [
        ["Rp", "41", "0.008579", "0.86"],
        ["Tahun", "37", "0.007742", "0.77"],
        ["Jakarta", "35", "0.007324", "0.73"],
        ["Hari", "32", "0.006696", "0.67"],
        ["Rumah", "27", "0.005650", "0.56"],
      ],
    },

    visibility: "public",
  },

  // Web Development

  // Warga Simpel
  {
    slug: "warga-simpel",
    title: "Warga Simpel",
    image: "/images/card_logo/WargaSimpel.png",
    shortDescription: "A web-based application designed to simplify administrative letter services.",

    category: "Web Development",
    projectType: "Academic Project",

    technologies: ["Laravel", "Tailwind CSS", "JavaScript", "jsPDF", "MySQL"],

    overview: "Warga Simpel is a web-based application designed to support village administrative services by providing an online platform for residents to request administrative documents.",

    problemStatement: "Traditional village administrative services often require residents to visit the village office directly to submit document requests. This process can create additional time and administrative workload.",

    objectives: [
      "Digitize selected village administrative services.",
      "Simplify the document request process for residents.",
      "Provide an organized system for managing administrative requests.",
      "Generate administrative documents digitally.",
    ],

    approach: ["Identify administrative service requirements.", "Design application workflows for residents and administrators.", "Develop a web-based application using Laravel.", "Integrate database management and document generation."],

    implementation: [
      "Developed the application using Laravel and Blade.",
      "Implemented the user interface using Tailwind CSS.",
      "Integrated MySQL for data management.",
      "Implemented PDF document generation using jsPDF.",
      "Developed administrative request workflows.",
    ],

    resultsGallery: [
      {
        title: "Beranda",
        description: "Halaman utama yang menampilkan ringkasan informasi dan akses layanan administrasi.",
        image: "/images/assets/warga_simpel/beranda.png",
      },
      {
        title: "Pengajuan Surat",
        description: "Halaman untuk mengajukan surat administrasi secara online.",
        image: "/images/assets/warga_simpel/pengajuan-surat.png",
      },
      {
        title: "Status Pengajuan",
        description: "Halaman untuk memantau status pengajuan surat.",
        image: "/images/assets/warga_simpel/status-surat.png",
      },
      {
        title: "Dashboard Admin",
        description: "Fitur untuk memantau pengajuan surat.",
        image: "/images/assets/warga_simpel/dashboard-admin.png",
      },
    ],

    githubUrl: "https://github.com/kumaragp/warga-simpel",

    visibility: "public",
  },

  // Manis
  {
    image: "/images/card_logo/Manis.png",
    slug: "manis",
    title: "MANIS",
    shortDescription: "A web-based inventory management to support inventory data management.",

    category: "Web Development",
    projectType: "Academic Project",

    technologies: ["Laravel", "Livewire", "Tailwind CSS", "JavaScript", "MySQL"],

    overview: "MANIS is a web-based inventory management application developed to support inventory administration and stock management processes.",

    problemStatement: "Inventory administration requires organized data management to maintain stock information and support operational activities. A centralized application can help organize inventory-related information.",

    solution: [
      "Identify inventory management requirements for centralized administration.",
      "Design application workflows for inventory management and administration.",
      "Develop a web-based inventory management application using Laravel and Livewire.",
      "Implement the user interface using Blade and Tailwind CSS.",
      "Integrate MySQL for centralized inventory data management.",
      "Implement interactive application functionality using JavaScript.",
    ],

    resultsGallery: [
      {
        title: "Daftar Alat Karyawan",
        description: "Halaman utama karyawan yang menampilkan ringkasan jenis alat yang bisa dipinjam.",
        image: "/images/assets/manis/daftar-alat-karyawan.png",
      },
      {
        title: "Riwayat Peminjaman Karyawan",
        description: "Halaman yang menampilkan riwayat peminjaman alat yang dilakukan oleh karyawan.",
        image: "/images/assets/manis/riwayat-peminjaman-alat-karyawan.png",
      },
      {
        title: "Daftar Alat Admin",
        description: "Halaman utama admin yang digunakan untuk menambahkan alat.",
        image: "/images/assets/manis/daftar-alat-admin.png",
      },
    ],

    githubUrl: "https://github.com/kumaragp/manis",

    visibility: "public",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
