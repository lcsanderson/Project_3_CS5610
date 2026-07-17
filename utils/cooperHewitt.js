export const COOPER_HEWITT_ENDPOINT = "https://api.cooperhewitt.org/";

export async function queryCooperHewitt(query, variables = {}) {
  const response = await fetch(COOPER_HEWITT_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });
  const json = await response.json();
  if (json.errors || !json.data || !json.data.object) {
    throw new Error(
      `Cooper Hewitt did not return usable data: ${JSON.stringify(json)}`,
    );
  }
  return {
    objects: json.data.object,
    pagination: json.extensions.pagination,
  };
}

// flattens out cooper hewitt record to accompadte Tile component design
export function reshapeObject(obj) {
  return {
    id: obj.id,
    title: obj.summary.title,
    designer: obj.maker?.[0]?.summary?.title ?? "Unknown designer",
    country: obj.geography?.country?.value ?? "Unknown origin",
    year: obj.date?.[0]?.value ?? "Unknown date",
    imageUrl: obj.multimedia?.[0]?.preview?.url ?? null,
  };
}
