import { geoPath } from "d3-geo";
import { feature } from "topojson-client";
import usAtlas from "us-atlas/states-albers-10m.json";
import { ProgressData, StateInfo } from "@/types/game";

const pathGenerator = geoPath();
const atlasData = usAtlas as any;
const statesFeatureCollection = feature(atlasData, atlasData.objects.states) as unknown as {
  features: Array<{
    id: string;
    properties: { name: string };
    geometry: unknown;
  }>;
};

const stateNameToCode = new Map([
  ["Alabama", "AL"], ["Alaska", "AK"], ["Arizona", "AZ"], ["Arkansas", "AR"], ["California", "CA"],
  ["Colorado", "CO"], ["Connecticut", "CT"], ["Delaware", "DE"], ["Florida", "FL"], ["Georgia", "GA"],
  ["Hawaii", "HI"], ["Idaho", "ID"], ["Illinois", "IL"], ["Indiana", "IN"], ["Iowa", "IA"],
  ["Kansas", "KS"], ["Kentucky", "KY"], ["Louisiana", "LA"], ["Maine", "ME"], ["Maryland", "MD"],
  ["Massachusetts", "MA"], ["Michigan", "MI"], ["Minnesota", "MN"], ["Mississippi", "MS"], ["Missouri", "MO"],
  ["Montana", "MT"], ["Nebraska", "NE"], ["Nevada", "NV"], ["New Hampshire", "NH"], ["New Jersey", "NJ"],
  ["New Mexico", "NM"], ["New York", "NY"], ["North Carolina", "NC"], ["North Dakota", "ND"], ["Ohio", "OH"],
  ["Oklahoma", "OK"], ["Oregon", "OR"], ["Pennsylvania", "PA"], ["Rhode Island", "RI"], ["South Carolina", "SC"],
  ["South Dakota", "SD"], ["Tennessee", "TN"], ["Texas", "TX"], ["Utah", "UT"], ["Vermont", "VT"],
  ["Virginia", "VA"], ["Washington", "WA"], ["West Virginia", "WV"], ["Wisconsin", "WI"], ["Wyoming", "WY"]
]);

export function InteractiveUSMap({
  states,
  targetState,
  highlightedRegion,
  progress,
  onSelect
}: {
  states: StateInfo[];
  targetState?: string;
  highlightedRegion?: string | null;
  progress: ProgressData;
  onSelect: (code: string) => void;
}) {
  const stateLookup = new Map(states.map((state) => [state.abbreviation, state]));

  return (
    <section className="rounded-[28px] border border-white/10 bg-slate-900/60 p-4">
      <div className="mb-3 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">
            U.S. Map
          </p>
          <h3 className="mt-1 text-xl font-black">Tap the correct state</h3>
        </div>
        <p className="max-w-xs text-right text-xs text-slate-400">
          Use the real U.S. map. After two misses, the target state glows.
        </p>
      </div>
      <svg
        viewBox="0 0 975 610"
        className="h-[420px] w-full rounded-2xl bg-[#0f1630] lg:h-[500px]"
        role="img"
        aria-label="United States map"
      >
        {statesFeatureCollection.features.map((featureItem) => {
          const code = stateNameToCode.get(featureItem.properties.name);

          if (!code) {
            return null;
          }

          const state = stateLookup.get(code);

          if (!state) {
            return null;
          }

          const mastery = progress.byState[code].masteryScore;
          const isTarget = targetState === code;
          const isHighlightedRegion = highlightedRegion ? state.region === highlightedRegion : false;
          const fill = isTarget ? "#2dd4bf" : mastery >= 85 ? "#2563eb" : mastery >= 60 ? "#334155" : "#1f2937";

          return (
            <path
              key={featureItem.id}
              d={pathGenerator(featureItem as never) ?? ""}
              onClick={() => onSelect(code)}
              className="cursor-pointer transition hover:fill-[#facc15]"
              fill={fill}
              stroke={isHighlightedRegion ? "#facc15" : "#94a3b8"}
              strokeWidth={isTarget || isHighlightedRegion ? 2.25 : 1}
            />
          );
        })}
      </svg>
    </section>
  );
}
