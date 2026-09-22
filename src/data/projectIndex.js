import { NEON } from "../theme/palette";

// Every project page reads from here: the category listings, the hero facts
// and the "next project" link at the foot of each detail page.

export const categories = {
  "low-level-systems-lab": {
    title: "Low-Level Systems Lab",
    lines: ["Low-Level", "Systems Lab"],
    crumb: "Systems lab",
    path: "/projects/low-level-systems-lab",
    intro:
      "Software written close to the machine. A key-value store, a shell and a kernel, each built from scratch to understand the thing it copies.",
  },
  "devops-experiments": {
    title: "DevOps Experiments",
    lines: ["DevOps", "Experiments"],
    crumb: "DevOps",
    path: "/projects/devops-experiments",
    intro:
      "Infrastructure I run and the software that runs on it: a serverless timetable app, a home Kubernetes cluster and a developer portal.",
  },
};

export const projects = [
  {
    slug: "redix",
    name: "Redix",
    category: "low-level-systems-lab",
    neon: NEON.magenta,
    kind: "Personal project",
    summary:
      "A Redis-compatible key-value store in Go. Speaks real RESP, so redis-cli works against it unmodified.",
    stack: ["Go", "RESP", "AOF", "Pub/Sub"],
    repo: "https://github.com/kavyan256/MiniRedis",
  },
  {
    slug: "bmos-shell",
    name: "BMOS",
    category: "low-level-systems-lab",
    neon: NEON.lime,
    kind: "Personal project",
    summary:
      "A Unix-like shell in Rust with builtins, PATH resolution, piping and tab completion.",
    stack: ["Rust", "REPL", "PATH", "Completion"],
    repo: "https://github.com/kavyan256/BMOS---Shell",
  },
  {
    slug: "kaos",
    name: "KaOS",
    category: "low-level-systems-lab",
    neon: NEON.cyan,
    kind: "Personal project",
    summary:
      "A RISC-V operating system in C with SV32 paging, cooperative processes and a TAR file system.",
    stack: ["C", "RISC-V", "SV32", "VirtIO"],
    repo: "https://github.com/kavyan256/ka-OS",
  },
  {
    slug: "slate",
    name: "Slate",
    category: "devops-experiments",
    neon: NEON.ember,
    kind: "Hackathon project, team of three",
    summary:
      "The real timetable of 1,801 IIIT Allahabad students on serverless AWS, with class changes guarded by a Cedar policy.",
    stack: ["AWS Amplify", "Lambda", "DynamoDB", "Cedar"],
    repo: "https://github.com/kavyan256/slate",
    live: "https://main.dosqfo1xoqa7l.amplifyapp.com",
  },
];

// Work described on a category page without a page of its own.
export const notes = {
  "devops-experiments": [
    {
      id: "homelab",
      name: "k3s homelab",
      summary:
        "A three-node k3s cluster on repurposed laptops, used as a proving ground before anything is deployed for real.",
      detail:
        "k3s rather than full Kubernetes, to keep overhead low on 4 GB, 4 GB and 8 GB machines with 256, 256 and 128 GB of storage. Services run as containers, and I own the cluster's networking, storage and workload scheduling end to end.",
      stack: ["k3s", "Docker", "Linux"],
    },
    {
      id: "idp",
      name: "Developer portal",
      summary:
        "A Backstage portal for scaffolding new services from templates, browsing a service catalog and reading generated docs.",
      detail:
        "Backstage runs on Kubernetes and is provisioned with Terraform. New services start from shared templates, existing ones are discoverable in one catalog, and their documentation is generated alongside them, which removes most of the manual setup for a new project.",
      stack: ["Backstage", "Kubernetes", "Terraform"],
      repo: "https://github.com/kavyan256/Internal-Developer-Platform",
      live: "https://backstage.kavyan.dev",
    },
  ],
};

export const projectBySlug = (slug) => projects.find((p) => p.slug === slug);

export const projectsIn = (category) => projects.filter((p) => p.category === category);

// The next project in the same category, wrapping around.
export function nextProject(slug) {
  const current = projectBySlug(slug);
  const siblings = projectsIn(current.category);
  if (siblings.length < 2) return null;
  return siblings[(siblings.indexOf(current) + 1) % siblings.length];
}
