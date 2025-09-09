import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

const navItems = [
    { 
      name: "Portfolio", 
      href: "#portfolio",
      dropdown: [
        { name: "Design Work", href: "#design" },
        { name: "AI/ML", href: "#AIML" },
        { name: "Case Studies", href: "#case-studies" },
        { name: "Web Development", href: "#webDevelopment" }
      ],
      description: "A showcase of my portfolio including design work, AI/ML projects, case studies, and web development."
    },
    { name: "About Me", 
      href: "#about",
      dropdown: [],
      description: "Learn more about me, my background, skills, and interests."
    },
    { 
      name: "Projects", 
      href: "#projects",
      dropdown: [
        { name: "Website Development", href: "#web-dev" },
        { name: "Mobile Apps", href: "#mobile" },
        { name: "AI/ML Projects", href: "#ai-ml" },
        { name: "Open Source Contributions", href: "#opensource" }
      ],
      description: "A collection of my recent projects showcasing my skills in web development, mobile applications, AI/ML, and contributions to open source."
    },
    
    { name: "Resume/CV", 
      ref: "#resume",
      dropdown: [],  // empty
      description: "View my resume/CV including education, experience, and achievements." 
    },
    { name: "Contact", 
      href: "#contact",
      dropdown: [{name : "+91 79090 69340"},
                 {name : "kavyanhembrom@gmail.com"},
                 {name : "linkedin.com/in/kavyan-hembrom/"},
                 {name : "github.com/kavyan256"},
      ],
      description: "Get in touch with me via email, social media, or contact form." 
    },
  ];

const Navbar = () => {
  const [hoverIndex, setHoverIndex] = useState(null);
  const [showWhiteRect, setShowWhiteRect] = useState(false);

  const handleMouseEnter = (index) => {
    
    gsap.to(navItems[index].ref, {
      scale: 1.1,
      duration: 0.001,
      ease: "power2.out",
    })
  };

  const handleMouseClick = (index) => {
    setHoverIndex(index);

    if (index === 0 || index === 2 || index === 1 || index === 4) {
      setShowWhiteRect(true);
    }
  }

  const handleMouseLeave = (index) => {
    //setHoverIndex(null);
    
    gsap.to(navItems[index].ref, {
      scale: 1.0,
      duration: 0.1,
      ease: "power2.out",
    })
  };

  const handleContainerMouseLeave = () => {
    setShowWhiteRect(false);
  };

  const handleDropdownMouseEnter = (parentIndex, index) => {
    const el = navItems[parentIndex].dropdown[index].ref;
    if (el) {
      const underline = el.querySelector("span");
      if (underline) gsap.to(underline, { width: "100%", duration: 0.1 });
    }
  };

  const handleDropdownMouseLeave = (parentIndex, index) => {
    const el = navItems[parentIndex].dropdown[index].ref;
    if (el) {
      const underline = el.querySelector("span");
      if (underline) gsap.to(underline, { width: "0%", duration: 0.3 });
    }
  };


  return (
    <div className="relative" onMouseLeave={handleContainerMouseLeave}>
      {/* White rectangle - only visible when Projects or Portfolio are hovered */}
      <div 
        className={`absolute top-0 left-0 w-full h-[60vh] bg-white transition-opacity duration-300 z-10 ${
          showWhiteRect ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="flex h-full pt-16">
          {/* Left Area */}
          <div className="w-1/2 flex flex-col items-start justify-start border border-gray-300 pb-8 pl-72 pr-8 pt-12">
            {hoverIndex !== null && navItems[hoverIndex].dropdown ? (
              <>
                <p className="text-xs font-normal text-gray-800 mb-1">
                  {navItems[hoverIndex].name}
                </p>
                <ul className="space-y-2">
                  {navItems[hoverIndex].dropdown.map((dropItem, dropIndex) => (
                    <li key={dropIndex}>
                      <a
                        href={dropItem.href}
                        ref={(el) => (navItems[hoverIndex].dropdown[dropIndex].ref = el)}
                        className="text-black hover:text-blue-600 text-xl font-semibold transition-colors duration-200 text-left relative"
                        onMouseEnter={() => handleDropdownMouseEnter(hoverIndex, dropIndex)}
                        onMouseLeave={() => handleDropdownMouseLeave(hoverIndex, dropIndex)}
                      >
                        {dropItem.name}
                        <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-black transition-all duration-500"></span>
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p className="text-gray-400">No menu available</p>
            )}
          </div>

          {/* Right Area */}
          <div className="w-1/2 flex items-start justify-start pr-56 pt-12 pl-16 border border-gray-300">
            {hoverIndex !== null && navItems[hoverIndex].description ? (
              <p className="font-normal text-black">
                {navItems[hoverIndex].description}
              </p>
            ) : (
              <p className="text-gray-400">No description available</p>
            )}
          </div>
        </div>
      </div>

      {/* Navbar */}
      <nav className="flex justify-center items-center h-16 w-full bg-transparent relative z-20">
        <div className="flex flex-1 justify-center">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              ref={(el) => (navItems[index].ref = el)}
              className={`px-8 text-base cursor-pointer transition-colors group duration-300 relative outline-none ${
                showWhiteRect ? 'text-black hover:text-gray-900' : 'text-white hover:text-gray-200'
              }`}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
              onClick={() => handleMouseClick(index)}
            >
              <span className="relative">
                {item.name}
                <span className={`absolute left-0 bottom-0 w-0 h-[1px] transition-all duration-500 ease-out group-hover:w-full ${
                  showWhiteRect ? 'bg-black' : 'bg-white'
                }`}></span>
              </span>
            </a>
          ))}
        </div>
      </nav>
    </div>

  );
};

export default Navbar; 

