export type FoodHygieneData = {
  businessName: string;
  ratingValue: string;
  ratingDate: string;
  localAuthority: string;
  schemeType: "FHRS" | "FHIS";
};

let cache: { data: FoodHygieneData; fetchedAt: number } | null = null;
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

export async function getFoodHygieneData(fhrsId: string): Promise<FoodHygieneData | null> {
  if (!fhrsId || fhrsId === "") return null;

  if (cache && Date.now() - cache.fetchedAt < CACHE_TTL) {
    return cache.data;
  }

  try {
    const res = await fetch(
      `http://api.ratings.food.gov.uk/establishments/${fhrsId}`,
      {
        headers: { "x-api-version": "2" },
        next: { revalidate: 86400 }, // 24 hours
      }
    );

    if (!res.ok) return null;

    const json = await res.json();

    const data: FoodHygieneData = {
      businessName: json.BusinessName ?? "",
      ratingValue: json.RatingValue ?? "",
      ratingDate: json.RatingDate ?? "",
      localAuthority: json.LocalAuthorityName ?? "",
      schemeType: json.SchemeType ?? "FHRS",
    };

    cache = { data, fetchedAt: Date.now() };
    return data;
  } catch {
    return null;
  }
}
