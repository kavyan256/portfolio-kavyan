import redisImage from "../assets/images/redis_mockup.png";
import orangeRedis from "../assets/images/orange_redis.png";
import project3 from "../assets/images/project3.png";
import project4 from "../assets/images/project4.png";

const projects = [
  {
    image: redisImage,
    title: "Low-Level Systems Lab",
    subtitle: "Memory, performance, and internals",
    description:
      "Benchmarks, runtime experiments, and tools that make the invisible parts of software easier to understand.",
    tags: ["C++", "Profiling", "Systems"],
    path: "/projects/low-level-systems-lab",
  },
  {
    image: orangeRedis,
    title: "DevOps Experiments",
    subtitle: "Deployment, automation, and workflows",
    description:
      "Small, iterative studies around deployment workflows, automation, and practical infrastructure.",
    tags: ["DevOps", "Automation", "Infrastructure"],
    path: "/projects/devops-experiments",
  },
  {
    image: project3,
    title: "Creative Web",
    subtitle: "Motion, interaction, and feel",
    description:
      "Browser-led work focused on motion design, transitions, and interfaces that feel alive.",
    tags: ["React", "Motion", "UI"],
    path: "/projects/creative-web",
  },
  {
    image: project4,
    title: "Experimental Projects",
    subtitle: "Ideas, prototypes, and research",
    description:
      "Early-stage concepts and visual experiments that test new ideas before they become full projects.",
    tags: ["Prototype", "Design", "Exploration"],
    path: "/projects/experimental-projects",
  },
];

export default projects;
