"use client";

import { useEffect, useState } from "react";
import type { Project } from "@/data/projects";
import { Icon } from "@iconify/react";
import { icons } from "@/data/icon";

type MachineLearningProps = {
  project: Project;
};

type DatasetRow = Record<string, string | number | boolean | null>;

function MlSectionHeading({ number, label, title, id }: { number: string; label: string; title: string; id: string }) {
  return (
    <div className="mb-5">
      <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
        {number} / {label}
      </p>

      <h2 id={id} className="text-xl font-semibold tracking-[-0.04em] text-foreground sm:text-2xl">
        {title}
      </h2>
    </div>
  );
}

export function MachineLearning({ project }: MachineLearningProps) {
  const [page, setPage] = useState(0);
  const [datasetColumns, setDatasetColumns] = useState<string[]>([]);
  const [datasetRows, setDatasetRows] = useState<DatasetRow[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [datasetError, setDatasetError] = useState<string | null>(null);

  const pageSize = 5;
  const dataset = project.dataset;

  // Load JSON preview dataset
  useEffect(() => {
    const fileUrl = project.dataset?.previewUrl;

    if (!fileUrl || project.dataset?.isPrivate) {
      setDatasetColumns([]);
      setDatasetRows([]);
      setIsLoading(false);
      return;
    }

    let cancelled = false;

    const loadDataset = async (url: string) => {
      try {
        setIsLoading(true);
        setDatasetError(null);

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Gagal mengambil dataset: ${response.status}`);
        }

        const data: unknown = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Format dataset JSON tidak valid.");
        }

        const rows = data as DatasetRow[];
        const columns = rows.length > 0 ? Object.keys(rows[0]) : [];

        if (cancelled) return;

        setDatasetColumns(columns);
        setDatasetRows(rows);
        setPage(0);
      } catch (error) {
        if (cancelled) return;

        setDatasetError(error instanceof Error ? error.message : "Terjadi kesalahan saat membaca dataset.");
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    loadDataset(fileUrl);

    return () => {
      cancelled = true;
    };
  }, [project.dataset?.previewUrl, project.dataset?.isPrivate]);

  const canPreviewDataset = !dataset?.isPrivate && datasetRows.length > 0 && datasetColumns.length > 0;

  const pageCount = canPreviewDataset ? Math.ceil(datasetRows.length / pageSize) : 0;

  const visibleRows = canPreviewDataset ? datasetRows.slice(page * pageSize, (page + 1) * pageSize) : [];

  // Download original CSV dataset
  const downloadCsv = () => {
    const downloadUrl = project.dataset?.downloadUrl;

    if (!downloadUrl || project.dataset?.isPrivate) return;

    const anchor = document.createElement("a");

    anchor.href = downloadUrl;
    anchor.download = `${project.slug}-dataset.csv`;

    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  function formatMetric(value: number) {
    const percentage = value <= 1 ? value * 100 : value;
    return `${percentage.toFixed(2)}%`;
  }

  function getMetricPercentage(value: number) {
    const percentage = value <= 1 ? value * 100 : value;
    return Math.min(100, Math.max(0, percentage));
  }

  // Solutions fallback
  const solutions = project.solution ?? [...(project.approach ?? []), ...(project.implementation ?? [])];

  // Result Source State
  const [activeResultSource, setActiveResultSource] = useState<"evaluation" | "latest">("evaluation");

  // Available Result Sources
  const availableSources = Array.from(new Set(project.dataDistribution?.map((item) => item.source).filter((source): source is "evaluation" | "latest" => source === "evaluation" || source === "latest") ?? []));

  // Effective Active Source
  const effectiveSource = availableSources.includes(activeResultSource) ? activeResultSource : availableSources[0];

  // Source Distribution
  const sourceDistribution = project.dataDistribution?.filter((item) => item.source === effectiveSource) ?? [];

  const [activeModelName, setActiveModelName] = useState(project.modelMetrics?.[0]?.modelName ?? "");

  // Available Models
  const availableModels = (project.modelMetrics ?? []).filter((model) => model.source === effectiveSource);

  // Active Model
  const activeModel = availableModels.find((model) => model.modelName === activeModelName) ?? availableModels[0];

  // Safe Active Model Index
  const safeModelIndex = activeModel ? availableModels.findIndex((model) => model.modelName === activeModel.modelName) : 0;

  // Filtered Distribution
  const filteredDistribution = sourceDistribution.filter((item) => item.modelName === activeModel?.modelName);

  return (
    <div className="space-y-14 sm:space-y-12">
      
      {/* 01. DATA OVERVIEW */}
      <section id="data-overview" aria-labelledby="data-overview-title" className="scroll-mt-24">
        <MlSectionHeading number="01" label="Dataset" title="Data Overview" id="data-overview-title" />

        {dataset?.isPrivate ? (
          <p className="border-l-2 border-border pl-4 text-sm leading-7 text-muted">The dataset is private and cannot be displayed or downloaded due to privacy or publication restrictions.</p>
        ) : !dataset?.previewUrl ? (
          <p className="border-l-2 border-border pl-4 text-sm leading-7 text-muted">Dataset preview is not available for this project.</p>
        ) : isLoading ? (
          <p className="text-sm text-muted">Loading dataset...</p>
        ) : datasetError ? (
          <p className="border-l-2 border-border pl-4 text-sm leading-7 text-muted">Unable to display the dataset. {datasetError}</p>
        ) : canPreviewDataset ? (
          <>
            {/* Dataset Preview Table */}
            <div>
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-foreground">Dataset Preview</h4>
                <p className="mt-1 text-xs text-muted">Preview of the dataset records and their corresponding feature values.</p>
              </div>

              <div className="flex justify-end mb-2">
                {dataset.downloadUrl && (
                  <button type="button" onClick={downloadCsv} className="rounded-md border border-border px-3 py-2 text-xs font-medium text-foreground transition-colors hover:border-accent">
                    Download CSV
                  </button>
                )}
              </div>

              <div className="overflow-x-auto rounded-sm border border-border bg-card">
                <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                  <thead>
                    <tr>
                      <th className="border border-border bg-surface-secondary px-4 py-3 text-left text-xs font-medium text-muted">No.</th>

                      {datasetColumns.map((column) => (
                        <th key={column} className="border border-border bg-surface-secondary px-4 py-3 text-left text-xs font-medium text-foreground">
                          {column}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {visibleRows.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        <td className="border border-border bg-surface-secondary px-4 py-3 text-center text-xs font-medium text-muted">{page * pageSize + rowIndex + 1}</td>

                        {datasetColumns.map((column) => (
                          <td key={column} className="border border-border bg-card px-4 py-3 text-muted transition-colors duration-200 hover:bg-surface-secondary">
                            {row[column] === null || row[column] === undefined || row[column] === "" ? "-" : String(row[column])}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-xs text-muted mt-2">
              {datasetRows.length.toLocaleString()} sample records
              <span className="mx-1">·</span>
              {datasetColumns.length} variables
            </p>
          </>
        ) : (
          <p className="border-l-2 border-border pl-4 text-sm leading-7 text-muted">The dataset does not contain any records to preview.</p>
        )}
      </section>

      {/* 02. FEATURE DESCRIPTION */}
      <section id="feature-description" aria-labelledby="feature-description-title" className="scroll-mt-24">
        <MlSectionHeading number="02" label="Variables" title="Feature Description" id="feature-description-title" />

        {project.features && project.features.length > 0 ? (
          <div className="overflow-x-auto rounded-lg border border-border bg-card">
            <table className="w-full min-w-[520px] border-collapse text-left text-sm">
              <thead>
                <tr className="bg-surface-secondary">
                  <th scope="col" className="border-b border-border px-4 py-3 font-medium text-foreground">
                    Feature Name
                  </th>

                  <th scope="col" className="border-b border-border px-4 py-3 font-medium text-foreground">
                    Description
                  </th>
                </tr>
              </thead>

              <tbody>
                {project.features.map((feature) => (
                  <tr key={feature.name} className="border-b border-border last:border-0">
                    <td className="bg-surface-secondary px-4 py-3 font-medium text-foreground">{feature.name}</td>

                    <td className="bg-card px-4 py-3 text-muted">{feature.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-sm text-muted">Feature descriptions are not publicly available.</p>
        )}
      </section>

      {/* 03. PROBLEM */}
      {project.problemStatement && (
        <section id="problem" aria-labelledby="problem-title" className="scroll-mt-24">
          <MlSectionHeading number="03" label="The challenge" title="Problem" id="problem-title" />

          <p className="max-w-2xl text-base leading-8 text-muted">
            {(() => {
              const highlights = project.problemHighlights ?? [];

              if (highlights.length === 0) {
                return project.problemStatement;
              }

              const escapeRegex = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

              const pattern = new RegExp(`(${highlights.filter(Boolean).map(escapeRegex).join("|")})`, "gi");

              return project.problemStatement.split(pattern).map((part, index) => {
                const isHighlighted = highlights.some((phrase) => phrase.toLowerCase() === part.toLowerCase());

                return isHighlighted ? (
                  <span key={index} className="font-medium text-foreground underline decoration-accent decoration-2 underline-offset-[5px]">
                    {part}
                  </span>
                ) : (
                  part
                );
              });
            })()}
          </p>
        </section>
      )}

      {/* 04. SOLUTIONS */}
      {solutions.length > 0 && (
        <section id="solutions" aria-labelledby="solutions-title" className="scroll-mt-24">
          <MlSectionHeading number="04" label="Analytical approach" title="Solutions" id="solutions-title" />

          <div className="max-w-3xl space-y-3">
            {solutions.map((item, index) => (
              <p key={`${item}-${index}`} className="border-l-2 border-border pl-4 text-sm leading-7 text-muted">
                {item}
              </p>
            ))}
          </div>
        </section>
      )}

      {/* 05. RESULTS */}
      <section id="results" aria-labelledby="results-title" className="scroll-mt-24">
        <MlSectionHeading number="05" label="Evaluation" title="Results" id="results-title" />

        {/* Result Source Tabs */}
        {availableSources.length > 1 && (
          <div role="tablist" aria-label="Select data source" className="mb-5 grid grid-cols-2 gap-2 rounded-lg bg-muted/40 p-1">
            {availableSources.map((source) => (
              <button
                key={source}
                type="button"
                role="tab"
                aria-selected={effectiveSource === source}
                onClick={() => setActiveResultSource(source)}
                className={`rounded-md px-3 py-2.5 text-sm font-medium transition-all duration-200 ${effectiveSource === source ? "bg-background text-foreground shadow-sm" : "text-muted hover:text-foreground"}`}
              >
                {source === "evaluation" ? "Evaluation Dataset" : "Latest Dataset"}
              </button>
            ))}
          </div>
        )}

        {/* Model Tabs */}
        {availableModels.length > 1 ? (
          <div role="tablist" aria-label="Select classification model" className="mb-4 flex gap-2 overflow-x-auto border-b border-border">
            {availableModels.map((model, index) => (
              <button
                key={model.modelName}
                id={`model-tab-${index}`}
                type="button"
                role="tab"
                aria-selected={activeModel?.modelName === model.modelName}
                aria-controls="model-panel"
                onClick={() => setActiveModelName(model.modelName)}
                className={`relative shrink-0 px-4 py-3 text-sm font-medium transition-colors duration-300 ${activeModel?.modelName === model.modelName ? "text-foreground" : "text-muted hover:text-foreground"}`}
              >
                {model.modelName}

                <span className={`absolute bottom-0 left-0 h-0.5 w-full origin-left rounded-full bg-accent transition-transform duration-300 ease-in-out ${activeModel?.modelName === model.modelName ? "scale-x-100" : "scale-x-0"}`} />
              </button>
            ))}
          </div>
        ) : availableModels.length === 1 ? (
          <div className="mb-4 border-b border-border pb-3">
            <p className="text-sm font-semibold text-foreground">{availableModels[0].modelName}</p>
          </div>
        ) : null}

        {/* Data Distribution */}
        {filteredDistribution && filteredDistribution.length > 0 && (
          <div className="mt-5 mb-8 space-y-5">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Data Distribution</h3>

              <p className="mt-1 text-xs text-muted">Distribution of classification results across different categories.</p>
            </div>

            <div className="space-y-5">
              {filteredDistribution.map((item) => (
                <div key={`bar-${item.modelName}-${item.label}`}>
                  <div className="mb-2 flex items-center justify-between gap-4">
                    <span className="text-sm font-medium text-muted">{item.label}</span>

                    <span className="shrink-0 text-xs tabular-nums text-foreground">
                      {item.count.toLocaleString("en-US")} records ({(item.percentage ?? 0).toFixed(2)}%)
                    </span>
                  </div>

                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-border">
                    <div
                      className="h-full rounded-full bg-accent transition-all duration-300"
                      style={{
                        width: `${Math.min(100, Math.max(0, item.percentage ?? 0))}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeModel ? (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Model Performance</h3>
              <p className="mt-1 text-sm leading-6 text-muted">Evaluation results across different classification models.</p>
            </div>

            {/* Active Model Content */}
            {activeModel && (
              <div key={activeModel.modelName} id="model-panel" role="tabpanel" aria-labelledby={availableModels.length > 1 ? `model-tab-${safeModelIndex}` : undefined} className="space-y-6 tab-content-enter">
                <div className="rounded-xl border border-border bg-card p-5">
                  <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted">Overall Performance</h4>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {activeModel.accuracy !== undefined && (
                      <div className="rounded-lg border border-border bg-background-alt p-4">
                        <span className="text-xs font-medium text-muted">Accuracy</span>

                        <p className="mt-2 text-2xl font-semibold text-foreground tabular-nums">{formatMetric(activeModel.accuracy)}</p>

                        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-border">
                          <div
                            className="h-full rounded-full bg-accent"
                            style={{
                              width: `${getMetricPercentage(activeModel.accuracy)}%`,
                            }}
                          />
                        </div>
                      </div>
                    )}

                    {activeModel.rocAuc !== undefined && (
                      <div className="rounded-lg border border-border p-4">
                        <span className="text-xs font-medium text-muted">ROC-AUC</span>

                        <p className="mt-2 text-2xl font-semibold text-foreground tabular-nums">{formatMetric(activeModel.rocAuc)}</p>

                        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-border">
                          <div
                            className="h-full rounded-full bg-accent-highlight"
                            style={{
                              width: `${getMetricPercentage(activeModel.rocAuc)}%`,
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Class Performance */}
                {activeModel.classMetrics && activeModel.classMetrics.length > 0 && (
                  <div className="space-y-4">
                    <div>
                      <p className="mt-1 text-sm text-muted">Evaluation metrics for each classification class.</p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      {activeModel.classMetrics.map((classMetric) => {
                        const classValues = [
                          ["Precision", classMetric.precision],
                          ["Recall", classMetric.recall],
                          ["F1-score", classMetric.f1Score],
                        ].filter((item): item is [string, number] => item[1] !== undefined);

                        return (
                          <div key={classMetric.classLabel} className="rounded-xl border border-border bg-card p-5">
                            <div className="mb-4 flex items-start justify-between gap-3">
                              <div>
                                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">{classMetric.classLabel}</p>

                                <h5 className="mt-1 text-sm font-semibold text-foreground">{classMetric.className}</h5>
                              </div>

                              {classMetric.support !== undefined && <span className="shrink-0 rounded-md bg-surface-secondary px-2 py-1 text-[10px] font-medium text-muted">{classMetric.support.toLocaleString()} samples</span>}
                            </div>

                            <div className="space-y-4">
                              {classValues.map(([label, value]) => (
                                <div key={label}>
                                  <div className="mb-1.5 flex items-center justify-between gap-3">
                                    <span className="text-xs text-muted">{label}</span>

                                    <span className="text-xs font-semibold text-foreground tabular-nums">{formatMetric(value)}</span>
                                  </div>

                                  <div className="h-1.5 overflow-hidden rounded-full bg-border">
                                    <div
                                      className="h-full rounded-full bg-accent"
                                      style={{
                                        width: `${getMetricPercentage(value)}%`,
                                      }}
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Confusion Matrix */}
                {activeModel.confusionMatrix && (
                  <div className="rounded-xl border border-border bg-card p-5">
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-foreground">Confusion Matrix</h4>
                      <p className="mt-1 text-xs text-muted">Comparison between actual and predicted classifications.</p>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[500px] text-left text-sm">
                        <thead>
                          <tr>
                            <th className="border border-border bg-surface-secondary p-3 text-left text-xs font-medium text-muted">Actual / Predicted</th>
                            <th className="border border-border bg-surface-secondary p-3 text-center text-xs font-medium text-foreground">Class 0</th>
                            <th className="border border-border bg-surface-secondary p-3 text-center text-xs font-medium text-foreground">Class 1</th>
                          </tr>
                        </thead>

                        <tbody>
                          <tr>
                            <th className="border border-border bg-surface-secondary p-3 text-left text-xs font-medium text-foreground">Class 0</th>
                            <td className="border border-border p-4 text-center font-semibold tabular-nums text-foreground">{activeModel.confusionMatrix.trueNegative.toLocaleString()}</td>
                            <td className="border border-border p-4 text-center font-semibold tabular-nums text-foreground">{activeModel.confusionMatrix.falsePositive.toLocaleString()}</td>
                          </tr>

                          <tr>
                            <th className="border border-border bg-surface-secondary p-3 text-left text-xs font-medium text-foreground">Class 1</th>
                            <td className="border border-border p-4 text-center font-semibold tabular-nums text-foreground">{activeModel.confusionMatrix.falseNegative.toLocaleString()}</td>
                            <td className="border border-border p-4 text-center font-semibold tabular-nums text-foreground">{activeModel.confusionMatrix.truePositive.toLocaleString()}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted">
                      <span>TN: True Negative</span>
                      <span>FP: False Positive</span>
                      <span>FN: False Negative</span>
                      <span>TP: True Positive</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <p className="rounded-lg border border-border px-4 py-5 text-sm text-muted">Published model evaluation results are not available.</p>
        )}
      </section>

      {/* 06. INSIGHTS & RECOMMENDATIONS */}
      {(project.insight || project.recommendation) && (
        <section id="insights-recommendations" aria-labelledby="insights-title" className="scroll-mt-24">
          <MlSectionHeading number="06" label="Analytical findings" title="Insights & Recommendations" id="insights-title" />

          <div className="grid gap-4 lg:grid-cols-2">
            {project.insight && (
              <article className="flex flex-col rounded-xl border border-border bg-card p-5 sm:p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    <Icon icon={icons.lightbulb} className="size-5" />
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-foreground">Key Insights</h3>
                    <p className="mt-0.5 text-xs text-muted">Main analytical findings</p>
                  </div>
                </div>

                <p className="text-sm leading-7 text-muted">{project.insight}</p>
              </article>
            )}

            {project.recommendation && (
              <article className="flex flex-col rounded-xl border border-border bg-card p-5 sm:p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    <Icon icon={icons.target} className="size-5" />
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-foreground">Recommendations</h3>
                    <p className="mt-0.5 text-xs text-muted">Suggested actions and considerations</p>
                  </div>
                </div>

                <p className="text-sm leading-7 text-muted">{project.recommendation}</p>
              </article>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
