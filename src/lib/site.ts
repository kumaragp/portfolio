export const siteName = "Kumara Galan Pramana";
export const siteTitle = `${siteName} | Portfolio`;
export const siteDescription =
  "Explore the portfolio of Kumara Galan Pramana, an Information Systems graduate interested in Data Analytics, Machine Learning, and Software Development.";

const configuredSiteUrl = process.env.SITE_URL?.trim();

if (configuredSiteUrl) {
  const parsedSiteUrl = new URL(configuredSiteUrl);

  if (
    !["http:", "https:"].includes(parsedSiteUrl.protocol) ||
    parsedSiteUrl.pathname !== "/" ||
    parsedSiteUrl.search ||
    parsedSiteUrl.hash ||
    parsedSiteUrl.username ||
    parsedSiteUrl.password
  ) {
    throw new Error("SITE_URL must be an absolute site origin without a path, query, or credentials.");
  }
}

export const siteUrl = configuredSiteUrl ? new URL(configuredSiteUrl) : undefined;
