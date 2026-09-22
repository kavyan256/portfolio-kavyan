import React from "react";
import {
  ProjectPage,
  Section,
  StatRow,
  StatTile,
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

const ACCENT = NEON.cyan;

const architecture = [
  {
    title: "Boot & SBI",
    file: "kernel.c, kernel.ld",
    blurb: "Boots bare-metal via OpenSBI, which provides the hardware-abstraction layer.",
  },
  {
    title: "Trap & Syscall Handling",
    file: "kernel.c",
    blurb: "Saves registers on trap entry and dispatches system calls by number.",
  },
  {
    title: "Memory Management (SV32)",
    file: "kernel.c, kernel.h",
    blurb: "Two-level SV32 page tables, 4KB pages, one address space per process.",
  },
  {
    title: "Process Management",
    file: "kernel.c, kernel.h",
    blurb: "Process table (UNUSED/RUNNABLE/EXITED) and cooperative context switching.",
  },
  {
    title: "VirtIO Disk Driver",
    file: "kernel.c",
    blurb: "Virtqueue-based block I/O to the VirtIO device, synchronous and busy-waiting.",
  },
  {
    title: "TAR File System",
    file: "kernel.c",
    blurb: "Read/write access to a TAR-formatted disk image, cached in memory.",
  },
  {
    title: "Shared Utilities",
    file: "common.c, common.h",
    blurb: "Shared helper functions and macros used across kernel and user space.",
  },
  {
    title: "User Shell",
    file: "shell.c, user.c, user.ld",
    blurb: "The user-space shell and its syscall wrapper library.",
  },
];

const syscalls = [
  { name: "SYS_PUTCHAR", number: 1, description: "Output a character to console" },
  { name: "SYS_GETCHAR", number: 2, description: "Read a character from console" },
  { name: "SYS_EXIT", number: 3, description: "Terminate the current process" },
  { name: "SYS_READFILE", number: 4, description: "Read data from a file" },
  { name: "SYS_WRITEFILE", number: 5, description: "Write data to a file" },
];

const platformTags = ["RISC-V (32-bit)", "C", "SV32 Paging", "OpenSBI", "Single-core"];

const statTiles = [
  { label: "System calls", value: 5, suffix: "", format: "int" },
  { label: "Max processes", value: 8, suffix: "", format: "int" },
  { label: "Page table levels (SV32)", value: 2, suffix: "", format: "int" },
  { label: "File system size", value: 1, suffix: " MB", format: "int" },
];

const memoryRegions = [
  { label: "Kernel space", detail: "identity-mapped", start: 0, width: 34, color: ACCENT },
  { label: "User space", detail: "0x1000000", start: 34, width: 38, color: GREEN },
  { label: "User stack", detail: "0x1100000", start: 72, width: 16, color: AMBER },
  { label: "VirtIO MMIO", detail: "0x10001000", start: 88, width: 12, color: RED },
];

const processStates = [
  { label: "UNUSED", detail: "empty process-table slot" },
  { label: "RUNNABLE", detail: "holds the CPU until exit or yield" },
  { label: "EXITED", detail: "SYS_EXIT — slot reclaimed" },
];

const FLOW_COLORS = {
  io: GREEN,
  exit: AMBER,
  panic: RED,
};

function MemoryMap() {
  return (
    <div className="rounded-[2px] border border-paper/10 bg-carbon p-6">
      <div className="flex h-10 w-full overflow-hidden rounded-[2px] border border-paper/10">
        {memoryRegions.map((r) => (
          <div
            key={r.label}
            style={{ width: `${r.width}%`, backgroundColor: r.color }}
            className="h-full"
            title={`${r.label} — ${r.detail}`}
          />
        ))}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {memoryRegions.map((r) => (
          <div key={r.label} className="flex items-start gap-2">
            <span
              className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: r.color }}
            />
            <div>
              <p className="text-xs font-semibold text-bone">{r.label}</p>
              <code className="text-[11px] text-bone/80">{r.detail}</code>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProcessStateDiagram() {
  return (
    <div className="rounded-[2px] border border-paper/10 bg-carbon p-6">
      <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-2">
        {processStates.map((s, i) => (
          <React.Fragment key={s.label}>
            <div className="flex-1 rounded-[2px] border border-paper/10 bg-paper/[0.04] px-4 py-3 text-center">
              <p className="text-sm font-medium tracking-tight">{s.label}</p>
              <p className="mt-1 text-xs leading-5 text-bone/80">{s.detail}</p>
            </div>
            {i !== processStates.length - 1 && (
              <span className="mx-auto text-dust sm:mx-0">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  className="rotate-90 sm:rotate-0"
                >
                  <line x1="2" y1="10" x2="16" y2="10" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M12,5 L18,10 L12,15" fill="none" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

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

function FlowArrow({ x1, y1, x2, y2 }) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={BASELINE}
      strokeWidth="1.5"
      markerEnd="url(#kaos-flow-arrowhead)"
    />
  );
}

function FlowArrowHeadDef() {
  return (
    <defs>
      <marker
        id="kaos-flow-arrowhead"
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
    { color: FLOW_COLORS.io, label: "I/O & file syscalls" },
    { color: FLOW_COLORS.exit, label: "Exit → scheduler" },
    { color: FLOW_COLORS.panic, label: "Panic / exception" },
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

function TrapFlowchartDesktop() {
  const midY = 150;
  const trapX = 400,
    trapW = 150;
  const fanX = 610,
    fanW = 160,
    fanH = 70;
  const fanYs = [16, 115, 214];
  const returnX = 820,
    returnW = 130;

  const boundary = {
    x1: 165,
    y1: fanYs[0] - 14,
    x2: returnX + returnW + 12,
    y2: fanYs[2] + fanH + 14,
  };

  return (
    <svg
      viewBox="0 0 980 330"
      className="hidden h-auto w-full sm:block"
      role="img"
      aria-label="Trap flow: a user process traps into the kernel via ecall or a fault; trap entry saves registers and dispatches by syscall number to I/O and file syscalls, to SYS_EXIT which hands off to the cooperative scheduler, or to the panic/exception handler; execution returns to user mode via sret"
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
        KERNEL (S-MODE)
      </text>

      <FlowArrow x1={130} y1={midY} x2={165} y2={midY} />
      <FlowArrow x1={325} y1={midY} x2={trapX} y2={midY} />

      {fanYs.map((y) => (
        <path
          key={`out-${y}`}
          d={`M${trapX + trapW},${midY} L${trapX + trapW + 45},${y + fanH / 2} L${fanX},${y + fanH / 2}`}
          fill="none"
          stroke={BASELINE}
          strokeWidth="1.5"
          markerEnd="url(#kaos-flow-arrowhead)"
        />
      ))}

      {fanYs.slice(0, 2).map((y) => (
        <path
          key={`in-${y}`}
          d={`M${fanX + fanW},${y + fanH / 2} L${returnX - 45},${midY} L${returnX},${midY}`}
          fill="none"
          stroke={BASELINE}
          strokeWidth="1.5"
          markerEnd="url(#kaos-flow-arrowhead)"
        />
      ))}

      <path
        d={`M${fanX + fanW / 2},${fanYs[2] + fanH} L${fanX + fanW / 2},${fanYs[2] + fanH + 20}`}
        fill="none"
        stroke={FLOW_COLORS.panic}
        strokeWidth="1.5"
        markerEnd="url(#kaos-flow-arrowhead)"
      />

      <path
        d={`M${returnX + returnW / 2},${midY + 28} L${returnX + returnW / 2},308 L65,308 L65,${midY + 28}`}
        fill="none"
        stroke={BASELINE}
        strokeWidth="1.5"
        strokeDasharray="4 3"
        markerEnd="url(#kaos-flow-arrowhead)"
      />
      <text x={(65 + returnX + returnW / 2) / 2} y="322" textAnchor="middle" fontSize="9.5" fontStyle="italic" fill={TEXT} opacity="0.45">
        sret — back to user mode
      </text>

      <FlowNode x={10} y={122} w={120} h={56} title="User Process" sub="shell.c / user.c · U-mode" variant="outline" />
      <FlowNode x={165} y={122} w={160} h={56} title="RISC-V Trap" sub="ecall or fault" />
      <FlowNode x={trapX} y={122} w={trapW} h={56} title="kernel_entry → handle_trap" sub="kernel.c · a3=syscall #" variant="accent" />

      <FlowNode x={fanX} y={fanYs[0]} w={fanW} h={fanH} title="I/O & File Syscalls" sub="kernel.c" condition="PUTCHAR / GETCHAR / READFILE / WRITEFILE" dot={FLOW_COLORS.io} />
      <FlowNode x={fanX} y={fanYs[1]} w={fanW} h={fanH} title="Exit & Scheduler" sub="kernel.c" condition="SYS_EXIT — cooperative reschedule" dot={FLOW_COLORS.exit} />
      <FlowNode x={fanX} y={fanYs[2]} w={fanW} h={fanH} title="Panic / Exception" sub="kernel.c" condition="fault or illegal instruction" dot={FLOW_COLORS.panic} />
      <FlowNode x={fanX + fanW / 2 - 55} y={fanYs[2] + fanH + 20} w={110} h={22} title="System halts" sub="while (1) {}" variant="outline" />

      <FlowNode x={returnX} y={122} w={returnW} h={56} title="Return to User Mode" sub="kernel.c" />
    </svg>
  );
}

function TrapFlowchartMobile() {
  const boxW = 290,
    x0 = 20;
  const fanBoxW = 92,
    fanGap = 8;
  const fanY = 316;
  const fanH = 84;
  const returnY = 472;
  const boundary = { x1: 8, y1: 78, x2: 322, y2: fanY + fanH + 14 };
  const fanTitles = ["I/O & File", "Exit", "Panic"];
  const fanSubs = ["kernel.c", "kernel.c", "kernel.c"];
  const fanConditions = ["PUTCHAR / GETCHAR / READ / WRITE", "SYS_EXIT → reschedule", "fault / illegal instr."];
  const fanDots = [FLOW_COLORS.io, FLOW_COLORS.exit, FLOW_COLORS.panic];

  return (
    <svg
      viewBox="0 0 340 540"
      className="h-auto w-full sm:hidden"
      role="img"
      aria-label="Trap flow: a user process traps into the kernel via ecall or a fault; kernel_entry saves registers, then handle_trap dispatches by syscall number to I/O and file syscalls, to SYS_EXIT which hands off to the cooperative scheduler, or to the panic/exception handler which halts the kernel forever; only the first two paths return to user mode via sret"
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
        KERNEL (S-MODE)
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
            markerEnd="url(#kaos-flow-arrowhead)"
          />
        );
      })}

      {[0, 1].map((i) => {
        const fx = x0 + i * (fanBoxW + fanGap);
        return (
          <path
            key={`in-${i}`}
            d={`M${fx + fanBoxW / 2},${fanY + fanH} L${fx + fanBoxW / 2},${fanY + fanH + 12} L170,${fanY + fanH + 12} L170,${returnY}`}
            fill="none"
            stroke={BASELINE}
            strokeWidth="1.5"
            markerEnd="url(#kaos-flow-arrowhead)"
          />
        );
      })}

      <path
        d={`M${x0 + 2 * (fanBoxW + fanGap) + fanBoxW / 2},${fanY + fanH} L${x0 + 2 * (fanBoxW + fanGap) + fanBoxW / 2},${fanY + fanH + 22}`}
        fill="none"
        stroke={FLOW_COLORS.panic}
        strokeWidth="1.5"
        markerEnd="url(#kaos-flow-arrowhead)"
      />

      <path
        d={`M${x0 + boxW},${returnY + 25} L326,${returnY + 25} L326,55 L${x0 + boxW},55`}
        fill="none"
        stroke={BASELINE}
        strokeWidth="1.5"
        strokeDasharray="4 3"
        markerEnd="url(#kaos-flow-arrowhead)"
      />

      <FlowNode x={x0} y={16} w={boxW} h={50} title="User Process" sub="shell.c / user.c · U-mode" variant="outline" />
      <FlowNode x={x0} y={90} w={boxW} h={50} title="RISC-V Trap" sub="ecall or fault" />
      <FlowNode x={x0} y={164} w={boxW} h={50} title="kernel_entry → handle_trap" sub="kernel.c · a3=syscall #" variant="accent" />

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
      <FlowNode
        x={x0 + 2 * (fanBoxW + fanGap) + fanBoxW / 2 - 46}
        y={fanY + fanH + 22}
        w={92}
        h={22}
        title="System halts"
        sub="while (1) {}"
        variant="outline"
      />

      <FlowNode x={x0} y={returnY} w={boxW} h={50} title="Return to User Mode" sub="kernel.c" />
    </svg>
  );
}

export default function Kaos() {
  return (
    <ProjectPage
      slug="kaos"
      tagline="A small operating system in C for 32-bit RISC-V: SV32 virtual memory, cooperative processes and a TAR file system on a VirtIO disk."
      tags={platformTags}
    >

        <Section label="Overview" className="max-w-3xl">
          <p className="max-w-[64ch] text-lg leading-8 text-bone [&+p]:mt-5">
            Internally named{" "}
            <Code>kavrynOS</Code>
            , KaOS is a from-scratch RISC-V 32-bit kernel written in C that
            boots bare-metal on top of OpenSBI. It demonstrates the core
            pieces of a real operating system at a small, readable scale:
            trap-based system calls, SV32 page tables giving each process
            its own address space, cooperative (non-preemptive) process
            scheduling, a VirtIO block-device driver, and a TAR-based file
            system built on top of it.
          </p>
        </Section>

        <Section>
          <StatRow>
            {statTiles.map((tile) => (
              <StatTile key={tile.label} {...tile} />
            ))}
          </StatRow>
        </Section>

        <Section label="How a trap is handled">
          <p className="mb-8 max-w-[62ch] text-lg leading-8 text-bone">
            Every user-process request into the kernel — a system call or a
            fault — arrives through the same trap entry point. The glowing
            box is where that dispatch decision happens.
          </p>
          <div className="mt-6 rounded-[2px] border border-paper/10 bg-carbon p-6">
            <TrapFlowchartDesktop />
            <TrapFlowchartMobile />
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

        <Section label="Under the hood">
          <p className="mb-8 max-w-[62ch] text-lg leading-8 text-bone">
            Fixed memory layout and a small, explicit process lifecycle —
            the two things that make the kernel easy to reason about at
            this scale.
          </p>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <MemoryMap />
            <ProcessStateDiagram />
          </div>
        </Section>

        <Section className="max-w-3xl">
          <BulletList>
            <Bullet>Scheduling is cooperative, not preemptive — there's no timer
              interrupt driving context switches. A process holds the CPU
              until it exits or yields, and the kernel is single-core only.</Bullet>
            <Bullet>System calls follow a fixed register convention: the syscall
              number is passed in{" "}
              <Code>a3</Code>,
              arguments in{" "}
              <Code>a0–a2</Code>,
              the return value comes back in{" "}
              <Code>a0</Code>,
              and the PC is advanced by 4 past the{" "}
              <Code>ecall</Code>{" "}
              on return.</Bullet>
            <Bullet>The VirtIO block driver talks to the disk through virtqueues —
              a 3-descriptor chain per request — and does synchronous,
              busy-wait I/O rather than interrupt-driven I/O.</Bullet>
            <Bullet>The file system is just a TAR archive: up to 8 files, a 1MB
              disk image, 512-byte sectors, cached in memory and flushed to
              disk on writes.</Bullet>
          </BulletList>
        </Section>

        <Section label="System calls">
          <div className="overflow-x-auto rounded-[2px] border border-paper/10 bg-carbon">
            <table className="w-full min-w-[420px] text-left text-sm">
              <thead>
                <tr className="border-b border-paper/10 text-xs uppercase tracking-[0.25em] text-dust">
                  <th className="px-6 py-4 font-medium">Syscall</th>
                  <th className="px-4 py-4 font-medium">#</th>
                  <th className="px-4 py-4 font-medium">Description</th>
                </tr>
              </thead>
              <tbody>
                {syscalls.map((s, i) => (
                  <tr
                    key={s.name}
                    className={i !== syscalls.length - 1 ? "border-b border-paper/5" : ""}
                  >
                    <td className="px-6 py-3">
                      <code className="text-xs">{s.name}</code>
                    </td>
                    <td className="px-4 py-3 text-bone/80">{s.number}</td>
                    <td className="px-4 py-3 text-bone">{s.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section label="Roadmap & limitations" className="max-w-3xl">
          <BulletList>
            <Bullet>Maximum 8 processes and a single CPU core — no preemptive
              scheduling, cooperative only.</Bullet>
            <Bullet>No dynamic memory allocation in userspace.</Bullet>
            <Bullet>Fixed-size, 1MB file system with no runtime file creation or
              deletion — files are pre-created via the TAR disk image.</Bullet>
          </BulletList>
        </Section>

    </ProjectPage>
  );
}
