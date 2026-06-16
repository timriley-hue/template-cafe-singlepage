import { getFoodHygieneData } from "@/lib/food-hygiene";
import site from "@/content/site.json";

const ratingColours: Record<string, string> = {
  "5": "bg-green-600",
  "4": "bg-green-500",
  "3": "bg-yellow-500",
  "2": "bg-orange-500",
  "1": "bg-red-500",
  "0": "bg-red-700",
};

export default async function FoodHygieneBadge() {
  const data = await getFoodHygieneData((site as any).fhrsId ?? "");
  if (!data) return null;

  const colour = ratingColours[data.ratingValue] ?? "bg-gray-500";
  const date = data.ratingDate
    ? new Date(data.ratingDate).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
    : null;

  return (
    <a
      href={`https://ratings.food.gov.uk/business/en-GB/${(site as any).fhrsId}`}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 transition-colors rounded-xl px-4 py-3"
      title="Food Hygiene Rating"
    >
      <div className={`${colour} text-white rounded-lg w-10 h-10 flex items-center justify-center font-bold text-lg shrink-0`}>
        {data.ratingValue}
      </div>
      <div>
        <p className="text-xs font-semibold leading-tight">Food Hygiene Rating</p>
        <p className="text-xs opacity-60 leading-tight">Rated by {data.localAuthority}{date ? ` · ${date}` : ""}</p>
      </div>
    </a>
  );
}
