import React from "react";
import {
  ProjectPage,
  Section,
  Code,
  Bullet,
  BulletList,
  CARD,
  CardTrim,
} from "../../../components/project/ProjectKit";
import {
  TEXT,
  SURFACE,
  ON_ACCENT,
  SUBTLE,
  BOUNDARY,
  BASELINE,
  OUTLINE,
  GREEN,
  AMBER,
  RED,
  NEON,
} from "../../../theme/palette";

const ACCENT = NEON.lime;

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

const FLOW_COLORS = {
  builtin: GREEN,
  external: AMBER,
  notFound: RED,
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
        rx="2"
        fill={isAccent ? ACCENT : isOutline ? "none" : SURFACE}
        stroke={isAccent ? ACCENT : isOutline ? OUTLINE : SUBTLE}
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
        fill={isAccent ? ON_ACCENT : TEXT}
      >
        {title}
      </text>

      {sub && (
        <text
          x={x + w / 2}
          y={textY + 15}
          textAnchor="middle"
          fontFamily="JetBrains Mono, ui-monospace, monospace"
          fontSize="9.5"
          fill={isAccent ? ON_ACCENT : TEXT}
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
          fill={dot || TEXT}
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
    <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-bone/80">
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
        rx="3"
        fill="none"
        stroke={BOUNDARY}
        strokeWidth="1"
        strokeDasharray="5 4"
      />
      <text x={boundary.x1 + 14} y={boundary.y1 + 18} fontSize="9.5" letterSpacing="1.5" fill={TEXT} opacity="0.4">
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
      <text x={(45 + outputX + outputW / 2) / 2} y="322" textAnchor="middle" fontSize="9.5" fontStyle="italic" fill={TEXT} opacity="0.45">
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
        rx="3"
        fill="none"
        stroke={BOUNDARY}
        strokeWidth="1"
        strokeDasharray="5 4"
      />
      <text x={boundary.x1 + 12} y={boundary.y1 + 16} fontSize="9" letterSpacing="1.5" fill={TEXT} opacity="0.4">
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
  return (
    <ProjectPage
      slug="bmos-shell"
      tagline="An interactive Unix-like shell written in Rust, with builtin commands, PATH resolution and completion that knows your executables."
      tags={["Rust", "Shell", "REPL", "PATH resolution", "Completion"]}
    >

        <Section label="Overview" className="max-w-3xl">
          <p className="max-w-[64ch] text-lg leading-8 text-bone [&+p]:mt-5">
            BMOS ("Basic Multi-purpose Operating System" shell) is a Rust
            REPL that implements the everyday shell experience from scratch:
            a command prompt, a set of builtin utilities (
            <Code>cd</Code>,{" "}
            <Code>echo</Code>,{" "}
            <Code>pwd</Code>,{" "}
            <Code>exit</Code>,{" "}
            <Code>type</Code>,{" "}
            <Code>jobs</Code>
            ), PATH-based resolution for everything else, and intelligent
            command/path completion. It carries exactly one external
            dependency —{" "}
            <Code>rustyline</Code>{" "}
            — for line editing and history.
          </p>
        </Section>

        <Section label="How a command flows">
          <p className="mb-8 max-w-[62ch] text-lg leading-8 text-bone">
            One line of input, start to finish — the glowing box is the
            routing decision: is this a known builtin, something resolvable
            on PATH, or nothing the shell recognizes at all?
          </p>
          <div className="mt-6 rounded-[2px] border border-paper/10 bg-carbon p-6">
            <CommandFlowchartDesktop />
            <CommandFlowchartMobile />
            <FlowLegend />
          </div>
        </Section>

        <Section label="Architecture">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {architecture.map((item) => (
              <div
                key={item.title}
                className={CARD}
              >
<CardTrim />
                <h3 className="text-sm font-medium tracking-tight">
                  {item.title}
                </h3>
                <code className="mt-1 block text-xs text-dust">
                  {item.file}
                </code>
                <p className="mt-3 text-sm leading-6 text-bone">
                  {item.blurb}
                </p>
              </div>
            ))}
          </div>
        </Section>

        <Section label="Under the hood" className="max-w-3xl">
          <BulletList>
            <Bullet>
                <Code>check_builtin.rs</Code>{" "}
                decides builtin vs. PATH-resolved external command before
                anything is executed.
              </Bullet>
            <Bullet>Background execution (<Code>&amp;</Code>)
              is tracked and surfaced through the{" "}
              <Code>jobs</Code>{" "}
              builtin.</Bullet>
            <Bullet>I/O redirection is configured in{" "}
              <Code>output_config.rs</Code>{" "}
              before a command's output is written.</Bullet>
            <Bullet>Command and path completion are powered by{" "}
              <Code>rustyline</Code>
              , which also provides line editing and history.</Bullet>
          </BulletList>
        </Section>

        <Section label="Supported commands & features">
          <div className="grid gap-6 sm:grid-cols-2">
            {featureGroups.map((group) => (
              <div key={group.label}>
                <p className="text-xs uppercase tracking-[0.3em] text-dust">
                  {group.label}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {group.commands.map((cmd) => (
                    <code
                      key={cmd}
                      className="rounded-[2px] border border-paper/10 bg-paper/[0.04] px-3 py-1 text-xs text-bone transition hover:border-paper/20 hover:bg-paper/10 hover:text-paper"
                    >
                      {cmd}
                    </code>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

    </ProjectPage>
  );
}
