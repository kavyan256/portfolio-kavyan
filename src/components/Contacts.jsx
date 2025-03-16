import { motion } from "framer-motion";

const Contacts = () => {
  return (
    <section id="contact" className="min-h-screen flex flex-col justify-center items-center bg-black text-white">
      <div className="container mx-auto px-6 translate-y-[-4dvh] max-w-5xl text-center">
        {/* Contact Heading */}
        <motion.h2
          className="text-[14.8vh] font-bold mb-0"
          style={{ fontFamily: "Amidone", fontWeight: 400 }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Contact Me
        </motion.h2>

        {/* Contact Description */}
        <motion.p
          className="w-full text-lg text-gray-400 leading-relaxed mb-8 text-center mx-auto px-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          <span className="inline-block max-w-2xl">
            Want to collaborate or just say hi?&nbsp; Feel free to reach out through any of the platforms below!
          </span>
        </motion.p>


        {/* Contact Links */}
        <motion.div
          className="flex gap-12 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        >
          {[
            { name: "Email", link: "mailto:kavyanhembrom@example.com" },
            { name: "GitHub", link: "https://github.com/yourgithub" },
            { name: "LinkedIn", link: "https://linkedin.com/in/yourlinkedin" }
          ].map((item, index) => (
            <motion.a
              key={index}
              href={item.link}
              className="text-lg text-blue-400 hover:no-underline"
              whileHover={{ y: -4, scale: 1.1 }}
              transition={{ duration: 0.1, ease: "easeOut" }}
            >
              {item.name}
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Contacts;
