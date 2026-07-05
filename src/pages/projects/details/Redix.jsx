import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const INK = "#1d1a16";
const GRIDLINE = "rgba(29, 26, 22, 0.12)";
const BASELINE = "rgba(29, 26, 22, 0.28)";
const SERIES_1 = "#2a78d6";

const architecture = [
  {
    title: "Networking & Dispatch",
    file: "main.go",
    blurb:
      "TCP accept loop, one goroutine per connection, command dispatch, and the 10s expiration janitor.",
  },
  {
    title: "RESP Parser",
    file: "parser.go",
    blurb:
      "Reads one RESP array-of-bulk-strings command at a time off a buffered reader.",
  },
  {
    title: "Command Handlers",
    file: "commands.go",
    blurb:
      "The full command table plus every handler for strings, hashes, sorted sets, and pub/sub.",
  },
  {
    title: "Storage Engine",
    file: "store.go",
    blurb:
      "16 in-memory databases guarded by one global RWMutex, plus the sorted-set implementation.",
  },
  {
    title: "AOF Persistence",
    file: "aof.go",
    blurb:
      "Append-only write log, 1s background fsync, and full replay on startup.",
  },
  {
    title: "Pub/Sub",
    file: "pubsub.go",
    blurb:
      "Channel fan-out with per-connection write locks so pushes and replies never interleave.",
  },
  {
    title: "Connection Context",
    file: "conn_context.go",
    blurb:
      "Tracks which connection is calling right now, so handlers can reach it without threading it through every signature.",
  },
  {
    title: "RESP Helpers",
    file: "HelperFunctions.go",
    blurb:
      "RESP-encoding helpers and misc utilities shared by every command handler.",
  },
];

const commandGroups = [
  { label: "Strings", commands: ["GET", "SET", "DEL", "INCR", "DECR", "MGET", "MSET"] },
  { label: "Hashes", commands: ["HSET", "HGET", "HDEL", "HGETALL", "HEXISTS", "HLEN"] },
  {
    label: "Sorted Sets",
    commands: ["ZADD", "ZRANGE", "ZSCORE", "ZREM", "ZCARD", "ZRANGEBYSCORE"],
  },
  { label: "Pub/Sub", commands: ["SUBSCRIBE", "UNSUBSCRIBE", "PUBLISH"] },
  {
    label: "Server",
    commands: ["PING", "ECHO", "EXISTS", "EXPIRE", "PERSIST", "TTL", "FLUSHALL", "SELECT", "INFO"],
  },
];

const statTiles = [
  { label: "Peak throughput (GET)", value: 150830, suffix: " req/sec", format: "compact" },
  { label: "p99 latency (GET)", value: 0.311, suffix: " ms", format: "decimal" },
  { label: "External dependencies", value: 0, suffix: "", format: "int" },
  { label: "Logical databases", value: 16, suffix: "", format: "int" },
];

const throughputByCommand = [
  { label: "PING", value: 145138 },
  { label: "SET", value: 128700 },
  { label: "GET", value: 150830 },
  { label: "INCR", value: 133511 },
];

const concurrencyScaling = [
  { clients: 1, opsPerSec: 47664 },
  { clients: 5, opsPerSec: 116822 },
  { clients: 10, opsPerSec: 125000 },
  { clients: 25, opsPerSec: 131926 },
  { clients: 50, opsPerSec: 131926 },
  { clients: 100, opsPerSec: 132275 },
  { clients: 200, opsPerSec: 128866 },
  { clients: 400, opsPerSec: 118203 },
];

function SectionHeading({ number, children }) {
  return (
    <div className="flex items-baseline gap-3">
      <span className="font-mono text-xs text-black/30">{number}</span>
      <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
        {children}
      </h2>
    </div>
  );
}

function Reveal({ children, className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

function StatTile({ label, value, suffix, format }) {
  const valueRef = useRef(null);

  useEffect(() => {
    const el = valueRef.current;
    const proxy = { n: 0 };
    const ctx = gsap.context(() => {
      gsap.to(proxy, {
        n: value,
        duration: 1.4,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
        },
        onUpdate: () => {
          let text;
          if (format === "decimal") {
            text = proxy.n.toFixed(2);
          } else if (format === "compact") {
            text = Math.round(proxy.n).toLocaleString();
          } else {
            text = Math.round(proxy.n).toString();
          }
          el.textContent = text;
        },
      });
    });
    return () => ctx.revert();
  }, [value, format]);

  return (
    <div className="rounded-[1.5rem] border border-black/10 bg-[#f5eddd] p-6 transition hover:-translate-y-1 hover:border-black/15 hover:bg-[#efe3cc]">
      <p className="text-xs uppercase tracking-[0.3em] text-black/40">{label}</p>
      <p ref={valueRef} className="mt-3 whitespace-nowrap text-3xl font-semibold tracking-tight sm:text-4xl">
        0
      </p>
      {suffix && (
        <p className="mt-0.5 text-sm text-black/45">{suffix.trim()}</p>
      )}
    </div>
  );
}

function ThroughputBarChart() {
  const width = 560;
  const height = 260;
  const padding = { top: 16, right: 16, bottom: 36, left: 52 };
  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;
  const maxValue = 160000;
  const yTicks = [0, 40000, 80000, 120000, 160000];
  const barSlot = plotWidth / throughputByCommand.length;
  const barWidth = 24;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="h-auto w-full"
      role="img"
      aria-label="Throughput by command, measured with redis-benchmark at 50 concurrent clients: PING 145,138, SET 128,700, GET 150,830, INCR 133,511 requests per second"
    >
      {yTicks.map((tick) => {
        const y = padding.top + plotHeight - (tick / maxValue) * plotHeight;
        return (
          <g key={tick}>
            <line
              x1={padding.left}
              x2={width - padding.right}
              y1={y}
              y2={y}
              stroke={GRIDLINE}
              strokeWidth="1"
            />
            <text
              x={padding.left - 10}
              y={y + 4}
              textAnchor="end"
              fontSize="11"
              fill={INK}
              opacity="0.45"
            >
              {tick === 0 ? "0" : `${tick / 1000}k`}
            </text>
          </g>
        );
      })}
      <line
        x1={padding.left}
        x2={width - padding.right}
        y1={padding.top + plotHeight}
        y2={padding.top + plotHeight}
        stroke={BASELINE}
        strokeWidth="1"
      />

      {throughputByCommand.map((d, i) => {
        const barHeight = (d.value / maxValue) * plotHeight;
        const x = padding.left + i * barSlot + (barSlot - barWidth) / 2;
        const y = padding.top + plotHeight - barHeight;
        return (
          <g key={d.label}>
            <rect
              x={x}
              y={y}
              width={barWidth}
              height={barHeight}
              rx="4"
              fill={SERIES_1}
            />
            <text
              x={x + barWidth / 2}
              y={y - 8}
              textAnchor="middle"
              fontSize="12"
              fontWeight="600"
              fill={INK}
            >
              {d.value.toLocaleString()}
            </text>
            <text
              x={x + barWidth / 2}
              y={padding.top + plotHeight + 20}
              textAnchor="middle"
              fontSize="12"
              fill={INK}
              opacity="0.6"
            >
              {d.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

const FAN_COLORS = {
  storage: "#1baf7a",
  aof: "#eda100",
  pubsub: "#008300",
};

function FlowNode({ x, y, w, h, title, sub, condition, variant = "solid", dot }) {
  const isAccent = variant === "accent";
  const isOutline = variant === "outline";
  const textY = condition
    ? y + 22
    : sub
    ? y + h / 2 - 4
    : y + h / 2 + 4;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="10"
        fill={isAccent ? SERIES_1 : isOutline ? "none" : "#f5eddd"}
        stroke={isAccent ? SERIES_1 : isOutline ? "rgba(29, 26, 22, 0.35)" : "rgba(29, 26, 22, 0.15)"}
        strokeWidth="1"
        strokeDasharray={isOutline ? "4 3" : undefined}
      />

      {dot && <circle cx={x + 14} cy={textY - 4} r="4" fill={dot} />}

      <text
        x={dot ? x + 22 : x + w / 2}
        y={textY}
        textAnchor={dot ? "start" : "middle"}
        fontSize="12.5"
        fontWeight="600"
        fill={isAccent ? "#fcfaf0" : INK}
      >
        {title}
      </text>

      {sub && (
        <text
          x={x + w / 2}
          y={textY + 15}
          textAnchor="middle"
          fontFamily="monospace"
          fontSize="9.5"
          fill={isAccent ? "#fcfaf0" : INK}
          opacity={isAccent ? 0.85 : 0.5}
        >
          {sub}
        </text>
      )}

      {condition && (
        <text
          x={x + w / 2}
          y={textY + 30}
          textAnchor="middle"
          fontSize="9.5"
          fontStyle="italic"
          fill={dot || INK}
          opacity="0.75"
        >
          {condition}
        </text>
      )}
    </g>
  );
}

function FlowLegend() {
  const items = [
    { color: FAN_COLORS.storage, label: "Storage engine" },
    { color: FAN_COLORS.aof, label: "AOF log" },
    { color: FAN_COLORS.pubsub, label: "Pub/Sub" },
  ];
  return (
    <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-black/55">
      {items.map((item) => (
        <span key={item.label} className="inline-flex items-center gap-2">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: item.color }}
          />
          {item.label}
        </span>
      ))}
      <span className="inline-flex items-center gap-2">
        <svg width="20" height="8" className="shrink-0">
          <line x1="0" y1="4" x2="20" y2="4" stroke={BASELINE} strokeWidth="1.5" />
        </svg>
        always happens
      </span>
      <span className="inline-flex items-center gap-2">
        <svg width="20" height="8" className="shrink-0">
          <line x1="0" y1="4" x2="20" y2="4" stroke={BASELINE} strokeWidth="1.5" strokeDasharray="3 2" />
        </svg>
        conditional
      </span>
    </div>
  );
}

function FlowArrow({ x1, y1, x2, y2 }) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={BASELINE}
      strokeWidth="1.5"
      markerEnd="url(#flow-arrowhead)"
    />
  );
}

function FlowArrowHeadDef() {
  return (
    <defs>
      <marker
        id="flow-arrowhead"
        viewBox="0 0 10 10"
        refX="9"
        refY="5"
        markerWidth="7"
        markerHeight="7"
        orient="auto-start-reverse"
      >
        <path d="M0,0 L10,5 L0,10 z" fill={BASELINE} />
      </marker>
    </defs>
  );
}

function RequestFlowchartDesktop() {
  const midY = 150;
  const dispatchX = 465,
    dispatchW = 130;
  const fanX = 655,
    fanW = 150,
    fanH = 70;
  const fanYs = [16, 115, 214];
  const respX = 855,
    respW = 100;

  const boundary = {
    x1: 142,
    y1: fanYs[0] - 14,
    x2: respX + respW + 12,
    y2: fanYs[2] + fanH + 14,
  };

  return (
    <svg
      viewBox="0 0 980 330"
      className="hidden h-auto w-full sm:block"
      role="img"
      aria-label="Request flow: client connects through the TCP accept loop, RESP parser, and command dispatch inside the Go process; dispatch always routes to the storage engine, conditionally to the AOF log for writes, or to pub/sub fan-out for PUBLISH; the RESP response then returns to the client"
    >
      <FlowArrowHeadDef />

      <rect
        x={boundary.x1}
        y={boundary.y1}
        width={boundary.x2 - boundary.x1}
        height={boundary.y2 - boundary.y1}
        rx="14"
        fill="none"
        stroke="rgba(29, 26, 22, 0.18)"
        strokeWidth="1"
        strokeDasharray="5 4"
      />
      <text x={boundary.x1 + 14} y={boundary.y1 + 18} fontSize="9.5" letterSpacing="1.5" fill={INK} opacity="0.4">
        GO PROCESS
      </text>

      <FlowArrow x1={120} y1={midY} x2={155} y2={midY} />
      <FlowArrow x1={285} y1={midY} x2={320} y2={midY} />
      <FlowArrow x1={430} y1={midY} x2={465} y2={midY} />

      {fanYs.map((y) => (
        <path
          key={`out-${y}`}
          d={`M${dispatchX + dispatchW},${midY} L${dispatchX + dispatchW + 45},${y + fanH / 2} L${fanX},${y + fanH / 2}`}
          fill="none"
          stroke={BASELINE}
          strokeWidth="1.5"
          strokeDasharray={y === fanYs[0] ? undefined : "4 3"}
          markerEnd="url(#flow-arrowhead)"
        />
      ))}

      {fanYs.map((y) => (
        <path
          key={`in-${y}`}
          d={`M${fanX + fanW},${y + fanH / 2} L${respX - 45},${midY} L${respX},${midY}`}
          fill="none"
          stroke={BASELINE}
          strokeWidth="1.5"
          strokeDasharray={y === fanYs[0] ? undefined : "4 3"}
          markerEnd="url(#flow-arrowhead)"
        />
      ))}

      <path
        d={`M${respX + respW / 2},${midY + 28} L${respX + respW / 2},308 L65,308 L65,${midY + 28}`}
        fill="none"
        stroke={BASELINE}
        strokeWidth="1.5"
        strokeDasharray="4 3"
        markerEnd="url(#flow-arrowhead)"
      />
      <text x={(65 + respX + respW / 2) / 2} y="322" textAnchor="middle" fontSize="9.5" fontStyle="italic" fill={INK} opacity="0.45">
        response written back to the same connection
      </text>

      <FlowNode x={10} y={122} w={110} h={56} title="Client" sub="redis-cli / ioredis" variant="outline" />
      <FlowNode x={155} y={122} w={130} h={56} title="TCP Accept Loop" sub="main.go · 1 goroutine/conn" />
      <FlowNode x={320} y={122} w={110} h={56} title="RESP Parser" sub="parser.go" />
      <FlowNode x={dispatchX} y={122} w={dispatchW} h={56} title="Command Dispatch" sub="commands.go" variant="accent" />

      <FlowNode x={fanX} y={fanYs[0]} w={fanW} h={fanH} title="Storage Engine" sub="store.go" condition="every read/write" dot={FAN_COLORS.storage} />
      <FlowNode x={fanX} y={fanYs[1]} w={fanW} h={fanH} title="AOF Log" sub="aof.go" condition="write commands only" dot={FAN_COLORS.aof} />
      <FlowNode x={fanX} y={fanYs[2]} w={fanW} h={fanH} title="Pub/Sub Fan-out" sub="pubsub.go" condition="PUBLISH only" dot={FAN_COLORS.pubsub} />

      <FlowNode x={respX} y={122} w={respW} h={56} title="RESP Response" />
    </svg>
  );
}

function RequestFlowchartMobile() {
  const boxW = 290,
    x0 = 20;
  const fanBoxW = 92,
    fanGap = 8;
  const fanY = 316;
  const fanH = 76;
  const respY = 424;
  const boundary = { x1: 8, y1: 78, x2: 322, y2: fanY + fanH + 14 };
  const fanConditions = ["every read/write", "write commands only", "PUBLISH only"];
  const fanDots = [FAN_COLORS.storage, FAN_COLORS.aof, FAN_COLORS.pubsub];

  return (
    <svg
      viewBox="0 0 340 500"
      className="h-auto w-full sm:hidden"
      role="img"
      aria-label="Request flow: client connects through the TCP accept loop, RESP parser, and command dispatch inside the Go process; dispatch always routes to the storage engine, conditionally to the AOF log for writes, or to pub/sub fan-out for PUBLISH; the RESP response then returns to the client"
    >
      <FlowArrowHeadDef />

      <rect
        x={boundary.x1}
        y={boundary.y1}
        width={boundary.x2 - boundary.x1}
        height={boundary.y2 - boundary.y1}
        rx="14"
        fill="none"
        stroke="rgba(29, 26, 22, 0.18)"
        strokeWidth="1"
        strokeDasharray="5 4"
      />
      <text x={boundary.x1 + 12} y={boundary.y1 + 16} fontSize="9" letterSpacing="1.5" fill={INK} opacity="0.4">
        GO PROCESS
      </text>

      <FlowArrow x1={170} y1={66} x2={170} y2={90} />
      <FlowArrow x1={170} y1={140} x2={170} y2={164} />
      <FlowArrow x1={170} y1={214} x2={170} y2={238} />

      {[0, 1, 2].map((i) => {
        const fx = x0 + i * (fanBoxW + fanGap);
        return (
          <path
            key={`out-${i}`}
            d={`M170,288 L170,300 L${fx + fanBoxW / 2},300 L${fx + fanBoxW / 2},${fanY}`}
            fill="none"
            stroke={BASELINE}
            strokeWidth="1.5"
            strokeDasharray={i === 0 ? undefined : "4 3"}
            markerEnd="url(#flow-arrowhead)"
          />
        );
      })}

      {[0, 1, 2].map((i) => {
        const fx = x0 + i * (fanBoxW + fanGap);
        return (
          <path
            key={`in-${i}`}
            d={`M${fx + fanBoxW / 2},${fanY + fanH} L${fx + fanBoxW / 2},${fanY + fanH + 12} L170,${fanY + fanH + 12} L170,${respY}`}
            fill="none"
            stroke={BASELINE}
            strokeWidth="1.5"
            strokeDasharray={i === 0 ? undefined : "4 3"}
            markerEnd="url(#flow-arrowhead)"
          />
        );
      })}

      <path
        d={`M${x0 + boxW},${respY + 25} L326,${respY + 25} L326,55 L${x0 + boxW},55`}
        fill="none"
        stroke={BASELINE}
        strokeWidth="1.5"
        strokeDasharray="4 3"
        markerEnd="url(#flow-arrowhead)"
      />

      <FlowNode x={x0} y={16} w={boxW} h={50} title="Client" sub="redis-cli / ioredis" variant="outline" />
      <FlowNode x={x0} y={90} w={boxW} h={50} title="TCP Accept Loop" sub="main.go · 1 goroutine/conn" />
      <FlowNode x={x0} y={164} w={boxW} h={50} title="RESP Parser" sub="parser.go" />
      <FlowNode x={x0} y={238} w={boxW} h={50} title="Command Dispatch" sub="commands.go" variant="accent" />

      {[0, 1, 2].map((i) => (
        <FlowNode
          key={i}
          x={x0 + i * (fanBoxW + fanGap)}
          y={fanY}
          w={fanBoxW}
          h={fanH}
          title={["Storage", "AOF Log", "Pub/Sub"][i]}
          sub={["store.go", "aof.go", "pubsub.go"][i]}
          condition={fanConditions[i]}
          dot={fanDots[i]}
        />
      ))}

      <FlowNode x={x0} y={respY} w={boxW} h={50} title="RESP Response" />
    </svg>
  );
}

function ConcurrencyLineChart() {
  const width = 560;
  const height = 260;
  const padding = { top: 16, right: 24, bottom: 36, left: 52 };
  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;
  const maxValue = 160000;
  const yTicks = [0, 40000, 80000, 120000, 160000];
  const stepX = plotWidth / (concurrencyScaling.length - 1);

  const points = concurrencyScaling.map((d, i) => ({
    x: padding.left + i * stepX,
    y: padding.top + plotHeight - (d.opsPerSec / maxValue) * plotHeight,
    ...d,
  }));

  const peakIndex = points.reduce(
    (best, p, i) => (p.opsPerSec > points[best].opsPerSec ? i : best),
    0
  );
  const lastIndex = points.length - 1;

  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`)
    .join(" ");

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="h-auto w-full"
      role="img"
      aria-label="SET throughput vs concurrent clients, measured with redis-benchmark: rising from 47,664 req/sec at 1 client to a peak of 132,275 req/sec at 100 clients, then degrading to 118,203 req/sec at 400 clients as lock contention grows"
    >
      {yTicks.map((tick) => {
        const y = padding.top + plotHeight - (tick / maxValue) * plotHeight;
        return (
          <g key={tick}>
            <line
              x1={padding.left}
              x2={width - padding.right}
              y1={y}
              y2={y}
              stroke={GRIDLINE}
              strokeWidth="1"
            />
            <text
              x={padding.left - 10}
              y={y + 4}
              textAnchor="end"
              fontSize="11"
              fill={INK}
              opacity="0.45"
            >
              {tick === 0 ? "0" : `${tick / 1000}k`}
            </text>
          </g>
        );
      })}
      <line
        x1={padding.left}
        x2={width - padding.right}
        y1={padding.top + plotHeight}
        y2={padding.top + plotHeight}
        stroke={BASELINE}
        strokeWidth="1"
      />

      <path d={linePath} fill="none" stroke={SERIES_1} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

      {points.map((p, i) => (
        <g key={p.clients}>
          <circle cx={p.x} cy={p.y} r="4" fill={SERIES_1} stroke="#f5eddd" strokeWidth="2" />
          <text x={p.x} y={padding.top + plotHeight + 20} textAnchor="middle" fontSize="12" fill={INK} opacity="0.6">
            {p.clients}
          </text>
          {i === peakIndex && (
            <text x={p.x} y={p.y - 12} textAnchor="middle" fontSize="12" fontWeight="600" fill={INK}>
              peak {p.opsPerSec.toLocaleString()}
            </text>
          )}
          {i === lastIndex && i !== peakIndex && (
            <text x={p.x} y={p.y - 12} textAnchor="middle" fontSize="12" fontWeight="600" fill={INK}>
              {p.opsPerSec.toLocaleString()}
            </text>
          )}
        </g>
      ))}

      <text
        x={padding.left + plotWidth / 2}
        y={height - 4}
        textAnchor="middle"
        fontSize="11"
        fill={INK}
        opacity="0.45"
      >
        concurrent clients
      </text>
    </svg>
  );
}

export default function Redix() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(120,113,108,0.12),_transparent_26%),linear-gradient(180deg,#fcfaf0_0%,#f3ecdd_100%)] font-inter text-[#1d1a16]">
      <div className="relative mx-auto flex w-full max-w-6xl flex-col px-6 py-8 sm:px-10 lg:px-16">
        <header className="flex items-center justify-between gap-4 border-b border-black/10 pb-6">
          <Link
            to="/projects/low-level-systems-lab"
            className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.3em] text-black/60 transition hover:text-black"
          >
            <span className="text-lg leading-none">←</span>
            Back
          </Link>

          <span className="text-xs uppercase tracking-[0.35em] text-black/35">
            Low-level systems lab
          </span>
        </header>

        <Reveal className="grid gap-8 py-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div className="max-w-3xl space-y-6">
            <p className="text-sm uppercase tracking-[0.35em] text-black/40">
              Project file
            </p>
            <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
              Redix
            </h1>
            <p className="max-w-2xl text-base leading-8 text-black/65 sm:text-lg">
              A high-performance, Redis-compatible key-value store — written in
              Go, speaking real RESP over TCP, with zero dependencies outside
              the standard library.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Go", "RESP Protocol", "Concurrency", "AOF Persistence", "Pub/Sub"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-black/10 bg-white/50 px-3 py-1 text-xs uppercase tracking-[0.28em] text-black/55"
                  >
                    {tag}
                  </span>
                )
              )}
            </div>
          </div>
        </Reveal>

        <Reveal className="max-w-3xl pb-14">
          <SectionHeading number="01">Overview</SectionHeading>
          <p className="mt-4 text-base leading-8 text-black/65 sm:text-lg">
            Redix is a single-binary reimplementation of Redis's server
            protocol. It speaks the real RESP wire format on port 6379, so{" "}
            <code className="rounded bg-black/5 px-1.5 py-0.5 text-sm">
              redis-cli
            </code>
            , <code className="rounded bg-black/5 px-1.5 py-0.5 text-sm">ioredis</code>,
            and even raw <code className="rounded bg-black/5 px-1.5 py-0.5 text-sm">nc</code>{" "}
            all work against it unmodified — no client library ever needs to
            know it isn't talking to real Redis. The whole server is built on
            Go's standard library alone: no third-party dependencies, no code
            generation, one binary.
          </p>
        </Reveal>

        <Reveal className="pb-14">
          <SectionHeading number="02">Performance</SectionHeading>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-black/50">
            Measured locally with{" "}
            <code className="rounded bg-black/5 px-1 py-0.5 text-xs">
              redis-benchmark -n 100000 -c 50
            </code>{" "}
            unless noted. One quirk worth flagging: redis-benchmark's default
            ping/inline-command test doesn't work here — the RESP parser (
            <code className="rounded bg-black/5 px-1 py-0.5 text-xs">
              parser.go
            </code>
            ) only accepts RESP arrays, not the legacy inline protocol, so{" "}
            <code className="rounded bg-black/5 px-1 py-0.5 text-xs">
              ping_mbulk
            </code>{" "}
            was used instead.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {statTiles.map((tile) => (
              <StatTile key={tile.label} {...tile} />
            ))}
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <div className="rounded-[1.5rem] border border-black/10 bg-[#f5eddd] p-6">
              <h3 className="text-sm font-semibold tracking-tight">
                Throughput by command
              </h3>
              <p className="mt-1 text-xs text-black/45">50 concurrent clients</p>
              <div className="mt-4">
                <ThroughputBarChart />
              </div>
            </div>
            <div className="rounded-[1.5rem] border border-black/10 bg-[#f5eddd] p-6">
              <h3 className="text-sm font-semibold tracking-tight">
                SET throughput vs. concurrent clients
              </h3>
              <p className="mt-1 text-xs text-black/45">1–400 clients</p>
              <div className="mt-4">
                <ConcurrencyLineChart />
              </div>
              <p className="mt-2 text-xs leading-5 text-black/45">
                Throughput saturates around 25–100 clients (~130k req/sec),
                then degrades past 200 as latency grows — the single global{" "}
                <code className="rounded bg-black/5 px-1 py-0.5 text-xs">
                  mu sync.RWMutex
                </code>{" "}
                serializing all DB access rather than scaling horizontally.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal className="pb-14">
          <SectionHeading number="03">How a request flows</SectionHeading>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-black/50">
            One command, start to finish — the blue box is where routing
            decisions happen. Not every command touches all three subsystems
            downstream: only <code className="rounded bg-black/5 px-1 py-0.5 text-xs">PUBLISH</code>{" "}
            skips storage entirely, and only writes touch the AOF log.
          </p>
          <div className="mt-6 rounded-[1.5rem] border border-black/10 bg-[#f5eddd] p-6">
            <RequestFlowchartDesktop />
            <RequestFlowchartMobile />
            <FlowLegend />
          </div>
        </Reveal>

        <Reveal className="pb-14">
          <SectionHeading number="04">Architecture</SectionHeading>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {architecture.map((item) => (
              <div
                key={item.file}
                className="rounded-[1.5rem] border border-black/10 bg-[#f5eddd] p-6 transition hover:-translate-y-1 hover:border-black/15 hover:bg-[#efe3cc]"
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold tracking-tight">
                    {item.title}
                  </h3>
                </div>
                <code className="mt-1 block truncate text-xs text-black/40">
                  {item.file}
                </code>
                <p className="mt-3 text-sm leading-6 text-black/65">
                  {item.blurb}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="max-w-3xl pb-14">
          <SectionHeading number="05">Under the hood</SectionHeading>
          <ul className="mt-6 space-y-4 text-base leading-7 text-black/65">
            <li className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-black/40" />
              One goroutine per client connection; no per-key locking, just
              one global mutex guarding all 16 databases.
            </li>
            <li className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-black/40" />
              AOF-only persistence (no RDB) — every write is logged, flushed
              and fsynced once a second, and replayed in full on boot.
            </li>
            <li className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-black/40" />
              Expiration is lazy and swept: a 10-second janitor clears expired
              keys instead of checking on every read.
            </li>
            <li className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-black/40" />
              <span>
                <code className="rounded bg-black/5 px-1.5 py-0.5 text-sm">
                  SUBSCRIBE
                </code>{" "}
                locks a connection into pub/sub-only mode — matching real
                Redis behavior.
              </span>
            </li>
          </ul>
        </Reveal>

        <Reveal className="pb-14">
          <SectionHeading number="06">Supported commands</SectionHeading>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {commandGroups.map((group) => (
              <div key={group.label}>
                <p className="text-xs uppercase tracking-[0.3em] text-black/40">
                  {group.label}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {group.commands.map((cmd) => (
                    <code
                      key={cmd}
                      className="rounded-full border border-black/10 bg-white/50 px-3 py-1 text-xs text-black/60 transition hover:border-black/20 hover:bg-white hover:text-black"
                    >
                      {cmd}
                    </code>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="max-w-3xl pb-14">
          <SectionHeading number="07">Engineering notes</SectionHeading>
          <p className="mt-4 text-base leading-8 text-black/65">
            Adding a new write command means touching three places by hand:
            the command table in{" "}
            <code className="rounded bg-black/5 px-1.5 py-0.5 text-sm">
              commands.go
            </code>
            , the AOF-logging switch in{" "}
            <code className="rounded bg-black/5 px-1.5 py-0.5 text-sm">main.go</code>,
            and{" "}
            <code className="rounded bg-black/5 px-1.5 py-0.5 text-sm">
              replayCommand
            </code>{" "}
            in{" "}
            <code className="rounded bg-black/5 px-1.5 py-0.5 text-sm">aof.go</code>.
            They aren't auto-synced — a known rough edge, not a hidden bug.
          </p>
        </Reveal>

        <Reveal className="max-w-3xl pb-20">
          <SectionHeading number="08">Roadmap &amp; limitations</SectionHeading>
          <ul className="mt-6 space-y-4 text-base leading-7 text-black/65">
            <li className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-black/40" />
              No automated test suite yet — verified manually via{" "}
              <code className="rounded bg-black/5 px-1.5 py-0.5 text-sm">
                redis-cli
              </code>{" "}
              and <code className="rounded bg-black/5 px-1.5 py-0.5 text-sm">nc</code>.
            </li>
            <li className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-black/40" />
              One global mutex rather than per-key locking — the concurrency
              chart above shows exactly where that ceiling shows up.
            </li>
            <li className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-black/40" />
              List and Set are enum placeholders in the type system — not
              implemented yet.
            </li>
            <li className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-black/40" />
              AOF only — no RDB snapshotting.
            </li>
          </ul>
        </Reveal>

        <footer className="border-t border-black/10 py-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.3em] text-black/60 transition hover:text-black"
          >
            <span className="text-lg leading-none">←</span>
            Back home
          </Link>
        </footer>
      </div>
    </main>
  );
}
