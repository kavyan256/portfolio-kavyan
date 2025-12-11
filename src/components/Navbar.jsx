import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

const navItems = [
    { name: "Home",
      href: "#landingpage",
    },
    { 
      name: "Projects", 
      href: "#projects",
      dropdown: [
        { name: "Design Work", href: "#design" },
        { name: "AI/ML", href: "#AIML" },
        { name: "System Design", href: "#system-design" },
        { name: "Web Development", href: "#webDevelopment" }
      ],
      description: "A showcase of my portfolio including design work, AI/ML projects, case studies, and web development."
    },
    { name: "About", 
      href: "#about",
      dropdown: [],
      description: "Learn more about me, my background, skills, and interests."
    },
    { name: "Contact", 
      href: "#contact",
      dropdown: [
        { name: "+91 79090 69340", href: "tel:+917909069340" },
        { name: "kavyanhembrom@gmail.com", href: "mailto:kavyanhembrom@gmail.com"},
        { name: "linkedin.com/in/kavyan-hembrom/", href: "https://linkedin.com/in/kavyan-hembrom/" },
        { name: "github.com/kavyan256", href: "https://github.com/kavyan256" },
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
    <div className="absolute top-0 left-0 w-full" onMouseLeave={handleContainerMouseLeave}>
      {/* White rectangle - only visible when Projects or Portfolio are hovered */}
      <div 
        className={`absolute top-0 left-0 w-full h-[60vh] bg-[#fcfaf0] transition-opacity duration-300 z-10 ${
          showWhiteRect ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="flex h-full pt-16">
          {/* Left Area */}
          <div className="flex flex-col items-start justify-start w-1/2 pt-12 pb-8 pr-8 border border-gray-300 pl-72">
            {hoverIndex !== null && navItems[hoverIndex].dropdown ? (
              <>
                <p className="mb-1 text-xs font-normal text-gray-800">
                  {navItems[hoverIndex].name}
                </p>
                <ul className="space-y-2">
                  {navItems[hoverIndex].dropdown.map((dropItem, dropIndex) => (
                    <li key={dropIndex}>
                      <a
                        href={dropItem.href}
                        ref={(el) => (navItems[hoverIndex].dropdown[dropIndex].ref = el)}
                        className="relative text-xl font-semibold text-left text-black transition-colors duration-200 hover:text-blue-600"
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
          <div className="flex items-start justify-start w-1/2 pt-12 pl-16 pr-56 border border-gray-300">
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
      <nav className="relative z-20 flex items-center justify-center w-full h-16 bg-transparent ">
        <div className="flex justify-center flex-1">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              ref={(el) => (navItems[index].ref = el)}
              className={`px-8 text-base cursor-pointer transition-colors group duration-300 relative outline-none ${
                showWhiteRect ? 'text-black hover:text-gray-900' : 'text-gray hover:text-gray-200'
              }`}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
              onClick={() => handleMouseClick(index)}
            >
              <span className="relative">
                {item.name}
                <span className={`absolute left-0 bottom-0 w-0 h-[1px] transition-all duration-500 ease-out group-hover:w-full ${
                  showWhiteRect ? 'bg-black' : 'bg-[#fcfaf0]'
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

