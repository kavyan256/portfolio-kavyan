import { motion } from "framer-motion";

const projects = [
  {
    title: "Wing-in-Ground Effect Vehicle",
    description: "An innovative ground-effect vehicle prototype.",
    link: "#",
  },
  {
    title: "AI-Powered Virtual World",
    description: "A real-time interactive 2D metaverse with AI integrations.",
    link: "#",
  },
  {
    title: "2-DOF Turret System",
    description: "A precision turret system with optimized control.",
    link: "#",
  },
  {
    title: "Miniature Drone",
    description: "A compact, custom-programmable drone with flight tuning.",
    link: "#",
  },
  {
    title: "3D Portfolio Website",
    description: "A dynamic portfolio featuring animations and 3D elements.",
    link: "#",
  },
];

const Projects = () => {
  return (
    <section id="projects" className="min-h-screen flex flex-col justify-center items-center bg-black text-white">
      <div className="container mx-auto px-6 translate-y-[-4dvh]">
        <h2 className="text-[14.8vh] font-bold text-center mb-12 flex items-start" style={{ fontFamily: "Amidone", fontWeight: 400}}>Projects</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10, scale: 1.05 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="p-6 bg-gray-800 rounded-xl shadow-lg"
            >
              <h3 className="text-xl font-semibold">{project.title}</h3>
              <p className="text-gray-400 mt-2">{project.description}</p>
              <a
                href={project.link}
                className="text-blue-400 mt-4 inline-block hover:underline"
              >
                View Project →
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
