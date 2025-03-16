import { motion } from "framer-motion";

const AboutMe = () => {
  return (
    <section
      id="about"
      className="min-h-screen flex flex-col justify-center items-center 
  bg-gradient-to-b from-black to-gray-800 text-white px-6"
    
    >
      <div className="container mx-auto text-center max-w-5xl">
        {/* About Me Heading */}
        <motion.h2
          className="text-[14vh] font-bold mb-8"
          style={{ fontFamily: "Amidone", fontWeight: 400 }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          About Me
        </motion.h2>

        {/* About Me Description */}
        <motion.p
          className="text-xl text-white max-w-3xl leading-relaxed mx-auto px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          I'm <span className="text-blue-400 font-semibold">Kavyan Hembrom</span>, a passionate engineer exploring the world of{" "}
          <span className="text-blue-400 font-semibold">robotics, aeronautics, and AI</span>. <br /><br />
          Currently, I'm a <span className="text-blue-400 font-semibold">B.Tech student at IIIT Allahabad</span>, 
          working on innovative projects like <span className="text-blue-400 font-semibold">WIG vehicles, AI-powered virtual worlds, and custom drones</span>. <br /><br />
          Beyond engineering, I love <span className="text-blue-400 font-semibold">design, music, and filming</span>, 
          which fuel my creativity and drive my passion for innovation.
        </motion.p>
      </div>
    </section>
  );
};

export default AboutMe;
