import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const INK = "#1d1a16";
const BASELINE = "rgba(29, 26, 22, 0.28)";
const SERIES_1 = "#2a78d6";

const architecture = [
  {
    title: "REPL & Input",
    file: "main.rs, shell.rs",
    blurb: "Entry point, the REPL loop, and core shell input processing.",
  },
  {
    title: "Parsing & Tokenization",
    file: "input.rs, argument_parser.rs",
    blurb: "Tokenizes raw input and parses it into arguments.",
  },
  {
    title: "Command Routing",
    file: "runner.rs, check_builtin.rs, order.rs",
    blurb: "Detects builtin vs. external commands and drives execution order.",
  },
  {
    title: "Builtin Commands",
    file: "builtin_command.rs",
    blurb: "cd, echo, pwd, exit, type, and jobs.",
  },
  {
    title: "PATH Resolution",
    file: "path_finder.rs",
    blurb: "Resolves external commands through the PATH environment variable.",
  },
  {
    title: "Output & Redirection",
    file: "output.rs, output_config.rs",
    blurb: "Output formatting and I/O redirection configuration.",
  },
  {
    title: "Completion Engine",
    file: "completion.rs, command_completer.rs, path_completer.rs",
    blurb: "Command-name and path auto-completion, via rustyline.",
  },
  {
    title: "Error Handling",
    file: "error/mod.rs, error/not_found.rs",
    blurb: "Command-not-found and other error definitions.",
  },
];

const featureGroups = [
  { label: "Builtins", commands: ["cd", "echo", "pwd", "exit", "type", "jobs"] },
  {
    label: "Shell features",
    commands: [
      "Interactive REPL",
      "Command completion",
      "Path completion",
      "Background execution",
      "I/O redirection",
      "PATH resolution",
    ],
  },
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

const FLOW_COLORS = {
  builtin: "#1baf7a",
  external: "#eda100",
  notFound: "#d03b3b",
};

function FlowNode({ x, y, w, h, title, sub, condition, variant = "solid", dot }) {
  const isAccent = variant === "accent";
  const isOutline = variant === "outline";
  const textY = condition ? y + 22 : sub ? y + h / 2 - 4 : y + h / 2 + 4;

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

function FlowArrow({ x1, y1, x2, y2, dashed = false }) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={BASELINE}
      strokeWidth="1.5"
      strokeDasharray={dashed ? "4 3" : undefined}
      markerEnd="url(#bmos-flow-arrowhead)"
    />
  );
}

function FlowArrowHeadDef() {
  return (
    <defs>
      <marker
        id="bmos-flow-arrowhead"
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

function FlowLegend() {
  const items = [
    { color: FLOW_COLORS.builtin, label: "Builtin handler" },
    { color: FLOW_COLORS.external, label: "External process" },
    { color: FLOW_COLORS.notFound, label: "Command not found" },
  ];
  return (
    <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-black/55">
      {items.map((item) => (
        <span key={item.label} className="inline-flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
          {item.label}
        </span>
      ))}
    </div>
  );
}

function CommandFlowchartDesktop() {
  const midY = 150;
  const routerX = 400,
    routerW = 140;
  const fanX = 600,
    fanW = 160,
    fanH = 70;
  const fanYs = [16, 115, 214];
  const outputX = 810,
    outputW = 130;

  const boundary = {
    x1: 8,
    y1: fanYs[0] - 14,
    x2: outputX + outputW + 12,
    y2: fanYs[2] + fanH + 14,
  };

  return (
    <svg
      viewBox="0 0 960 330"
      className="hidden h-auto w-full sm:block"
      role="img"
      aria-label="Command flow: user input is tokenized and parsed, then the command router checks whether it's a builtin, an external command resolvable via PATH, or not found; each outcome converges on output handling, which writes back to the prompt"
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
        SHELL PROCESS
      </text>

      <FlowArrow x1={130} y1={midY} x2={165} y2={midY} />
      <FlowArrow x1={295} y1={midY} x2={routerX} y2={midY} />

      {fanYs.map((y) => (
        <path
          key={`out-${y}`}
          d={`M${routerX + routerW},${midY} L${routerX + routerW + 45},${y + fanH / 2} L${fanX},${y + fanH / 2}`}
          fill="none"
          stroke={BASELINE}
          strokeWidth="1.5"
          markerEnd="url(#bmos-flow-arrowhead)"
        />
      ))}

      {fanYs.map((y) => (
        <path
          key={`in-${y}`}
          d={`M${fanX + fanW},${y + fanH / 2} L${outputX - 45},${midY} L${outputX},${midY}`}
          fill="none"
          stroke={BASELINE}
          strokeWidth="1.5"
          markerEnd="url(#bmos-flow-arrowhead)"
        />
      ))}

      <path
        d={`M${outputX + outputW / 2},${midY + 28} L${outputX + outputW / 2},308 L45,308 L45,${midY + 28}`}
        fill="none"
        stroke={BASELINE}
        strokeWidth="1.5"
        strokeDasharray="4 3"
        markerEnd="url(#bmos-flow-arrowhead)"
      />
      <text x={(45 + outputX + outputW / 2) / 2} y="322" textAnchor="middle" fontSize="9.5" fontStyle="italic" fill={INK} opacity="0.45">
        REPL loop back to the $ prompt
      </text>

      <FlowNode x={10} y={122} w={120} h={56} title="User Input" sub="$ prompt" variant="outline" />
      <FlowNode x={165} y={122} w={130} h={56} title="Tokenizer" sub="input.rs" />
      <FlowNode x={routerX} y={122} w={routerW} h={56} title="Command Router" sub="check_builtin.rs" variant="accent" />

      <FlowNode x={fanX} y={fanYs[0]} w={fanW} h={fanH} title="Builtin Handler" sub="builtin_command.rs" condition="cd, echo, pwd, exit, type, jobs" dot={FLOW_COLORS.builtin} />
      <FlowNode x={fanX} y={fanYs[1]} w={fanW} h={fanH} title="External Process" sub="path_finder.rs · runner.rs" condition="resolved via PATH" dot={FLOW_COLORS.external} />
      <FlowNode x={fanX} y={fanYs[2]} w={fanW} h={fanH} title="Command Not Found" sub="error/not_found.rs" condition="not builtin, not in PATH" dot={FLOW_COLORS.notFound} />

      <FlowNode x={outputX} y={122} w={outputW} h={56} title="Output Handling" sub="output.rs" />
    </svg>
  );
}

function CommandFlowchartMobile() {
  const boxW = 290,
    x0 = 20;
  const fanBoxW = 92,
    fanGap = 8;
  const fanY = 316;
  const fanH = 84;
  const outputY = 432;
  const boundary = { x1: 8, y1: 78, x2: 322, y2: fanY + fanH + 14 };
  const fanTitles = ["Builtin", "External", "Not found"];
  const fanSubs = ["builtin_command.rs", "path_finder.rs", "error/not_found.rs"];
  const fanConditions = ["cd / echo / pwd / exit / type / jobs", "resolved via PATH", "not builtin, not in PATH"];
  const fanDots = [FLOW_COLORS.builtin, FLOW_COLORS.external, FLOW_COLORS.notFound];

  return (
    <svg
      viewBox="0 0 340 500"
      className="h-auto w-full sm:hidden"
      role="img"
      aria-label="Command flow: user input is tokenized and parsed, then the command router checks whether it's a builtin, an external command resolvable via PATH, or not found; each outcome converges on output handling, which writes back to the prompt"
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
        SHELL PROCESS
      </text>

      <FlowArrow x1={170} y1={66} x2={170} y2={90} />
      <FlowArrow x1={170} y1={140} x2={170} y2={164} />

      {[0, 1, 2].map((i) => {
        const fx = x0 + i * (fanBoxW + fanGap);
        return (
          <path
            key={`out-${i}`}
            d={`M170,214 L170,226 L${fx + fanBoxW / 2},226 L${fx + fanBoxW / 2},${fanY}`}
            fill="none"
            stroke={BASELINE}
            strokeWidth="1.5"
            markerEnd="url(#bmos-flow-arrowhead)"
          />
        );
      })}

      {[0, 1, 2].map((i) => {
        const fx = x0 + i * (fanBoxW + fanGap);
        return (
          <path
            key={`in-${i}`}
            d={`M${fx + fanBoxW / 2},${fanY + fanH} L${fx + fanBoxW / 2},${fanY + fanH + 12} L170,${fanY + fanH + 12} L170,${outputY}`}
            fill="none"
            stroke={BASELINE}
            strokeWidth="1.5"
            markerEnd="url(#bmos-flow-arrowhead)"
          />
        );
      })}

      <path
        d={`M${x0 + boxW},${outputY + 25} L326,${outputY + 25} L326,55 L${x0 + boxW},55`}
        fill="none"
        stroke={BASELINE}
        strokeWidth="1.5"
        strokeDasharray="4 3"
        markerEnd="url(#bmos-flow-arrowhead)"
      />

      <FlowNode x={x0} y={16} w={boxW} h={50} title="User Input" sub="$ prompt" variant="outline" />
      <FlowNode x={x0} y={90} w={boxW} h={50} title="Tokenizer" sub="input.rs" />
      <FlowNode x={x0} y={164} w={boxW} h={50} title="Command Router" sub="check_builtin.rs" variant="accent" />

      {[0, 1, 2].map((i) => (
        <FlowNode
          key={i}
          x={x0 + i * (fanBoxW + fanGap)}
          y={fanY}
          w={fanBoxW}
          h={fanH}
          title={fanTitles[i]}
          sub={fanSubs[i]}
          condition={fanConditions[i]}
          dot={fanDots[i]}
        />
      ))}

      <FlowNode x={x0} y={outputY} w={boxW} h={50} title="Output Handling" sub="output.rs" />
    </svg>
  );
}

export default function Bmos() {
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
              BMOS Shell
            </h1>
            <p className="max-w-2xl text-base leading-8 text-black/65 sm:text-lg">
              A lightweight, interactive Unix-like shell written in Rust —
              builtin commands, PATH resolution, and intelligent completion.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Rust", "Shell", "REPL", "PATH Resolution", "Completion"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-black/10 bg-white/50 px-3 py-1 text-xs uppercase tracking-[0.28em] text-black/55"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal className="max-w-3xl pb-14">
          <SectionHeading number="01">Overview</SectionHeading>
          <p className="mt-4 text-base leading-8 text-black/65 sm:text-lg">
            BMOS ("Basic Multi-purpose Operating System" shell) is a Rust
            REPL that implements the everyday shell experience from scratch:
            a command prompt, a set of builtin utilities (
            <code className="rounded bg-black/5 px-1.5 py-0.5 text-sm">cd</code>,{" "}
            <code className="rounded bg-black/5 px-1.5 py-0.5 text-sm">echo</code>,{" "}
            <code className="rounded bg-black/5 px-1.5 py-0.5 text-sm">pwd</code>,{" "}
            <code className="rounded bg-black/5 px-1.5 py-0.5 text-sm">exit</code>,{" "}
            <code className="rounded bg-black/5 px-1.5 py-0.5 text-sm">type</code>,{" "}
            <code className="rounded bg-black/5 px-1.5 py-0.5 text-sm">jobs</code>
            ), PATH-based resolution for everything else, and intelligent
            command/path completion. It carries exactly one external
            dependency —{" "}
            <code className="rounded bg-black/5 px-1.5 py-0.5 text-sm">rustyline</code>{" "}
            — for line editing and history.
          </p>
        </Reveal>

        <Reveal className="pb-14">
          <SectionHeading number="02">How a command flows</SectionHeading>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-black/50">
            One line of input, start to finish — the accent box is the
            routing decision: is this a known builtin, something resolvable
            on PATH, or nothing the shell recognizes at all?
          </p>
          <div className="mt-6 rounded-[1.5rem] border border-black/10 bg-[#f5eddd] p-6">
            <CommandFlowchartDesktop />
            <CommandFlowchartMobile />
            <FlowLegend />
          </div>
        </Reveal>

        <Reveal className="pb-14">
          <SectionHeading number="03">Architecture</SectionHeading>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {architecture.map((item) => (
              <div
                key={item.title}
                className="rounded-[1.5rem] border border-black/10 bg-[#f5eddd] p-6 transition hover:-translate-y-1 hover:border-black/15 hover:bg-[#efe3cc]"
              >
                <h3 className="text-sm font-semibold tracking-tight">
                  {item.title}
                </h3>
                <code className="mt-1 block text-xs text-black/40">
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
          <SectionHeading number="04">Under the hood</SectionHeading>
          <ul className="mt-6 space-y-4 text-base leading-7 text-black/65">
            <li className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-black/40" />
              <span>
                <code className="rounded bg-black/5 px-1.5 py-0.5 text-sm">
                  check_builtin.rs
                </code>{" "}
                decides builtin vs. PATH-resolved external command before
                anything is executed.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-black/40" />
              Background execution (<code className="rounded bg-black/5 px-1.5 py-0.5 text-sm">&amp;</code>)
              is tracked and surfaced through the{" "}
              <code className="rounded bg-black/5 px-1.5 py-0.5 text-sm">jobs</code>{" "}
              builtin.
            </li>
            <li className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-black/40" />
              I/O redirection is configured in{" "}
              <code className="rounded bg-black/5 px-1.5 py-0.5 text-sm">
                output_config.rs
              </code>{" "}
              before a command's output is written.
            </li>
            <li className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-black/40" />
              Command and path completion are powered by{" "}
              <code className="rounded bg-black/5 px-1.5 py-0.5 text-sm">
                rustyline
              </code>
              , which also provides line editing and history.
            </li>
          </ul>
        </Reveal>

        <Reveal className="pb-20">
          <SectionHeading number="05">Supported commands &amp; features</SectionHeading>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {featureGroups.map((group) => (
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
