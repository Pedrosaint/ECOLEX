import { useResultStatusChart } from "../hooks/use-result-status-chart";

const RADIUS = 72;
const STROKE = 20;
const CX = 100;
const CY = 100;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const SEGMENTS = [
  { key: "published", label: "Approved", color: "#22c55e" },
  { key: "rejected",  label: "Rejected",  color: "#ef4444" },
  { key: "pending",   label: "Pending",   color: "#f59e0b" },
] as const;

export default function ResultStatusChart() {
  const { published, rejected, pending, isLoading } = useResultStatusChart();

  const total = published + rejected + pending;
  const counts = { published, rejected, pending };

  const segments = SEGMENTS.map((s) => ({
    ...s,
    count: counts[s.key],
    ratio: total > 0 ? counts[s.key] / total : 0,
  }));

  // Build SVG arcs with strokeDasharray + strokeDashoffset
  let offset = 0;
  const arcs = segments.map((s) => {
    const len = s.ratio * CIRCUMFERENCE;
    const arc = { ...s, len, offset };
    offset += len;
    return arc;
  });

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 px-4 py-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-semibold text-gray-900">Results Overview</h2>
        <span className="text-sm font-bold text-[#8000BD]">{total}</span>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center flex-1 gap-3">
          <div className="w-8 h-8 border-4 border-[#8000BD] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-400">Loading...</p>
        </div>
      ) : (
        <>
          {/* Donut */}
          <div className="flex items-center justify-center flex-1">
            <div className="relative">
              <svg width="200" height="200" className="transform -rotate-90">
                {/* Track */}
                <circle
                  cx={CX} cy={CY} r={RADIUS}
                  fill="none" stroke="#f3f4f6" strokeWidth={STROKE}
                />
                {total === 0 ? (
                  <circle
                    cx={CX} cy={CY} r={RADIUS}
                    fill="none" stroke="#e5e7eb" strokeWidth={STROKE}
                  />
                ) : (
                  arcs.map((arc) => (
                    <circle
                      key={arc.key}
                      cx={CX} cy={CY} r={RADIUS}
                      fill="none"
                      stroke={arc.color}
                      strokeWidth={STROKE}
                      strokeDasharray={`${arc.len} ${CIRCUMFERENCE - arc.len}`}
                      strokeDashoffset={-arc.offset}
                      strokeLinecap="butt"
                      className="transition-all duration-1000 ease-in-out"
                    />
                  ))
                )}
              </svg>

              {/* Centre label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-gray-800">{total}</span>
                <span className="text-xs text-gray-400">Total</span>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-col gap-2 mt-4">
            {segments.map((s) => (
              <div key={s.key} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: s.color }} />
                  <span className="text-sm text-gray-600">{s.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-800">{s.count}</span>
                  <span className="text-xs text-gray-400 w-10 text-right">
                    {total > 0 ? `${Math.round(s.ratio * 100)}%` : "0%"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
