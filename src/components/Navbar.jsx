import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navRefs = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < lastScrollY) {
        setIsVisible(true); // Scrolling up → Show navbar
      } else if (window.scrollY > lastScrollY) {
        setIsVisible(false); // Scrolling down → Hide navbar
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const handleMouseEnter = (index) => {
    gsap.to(navRefs.current[index], { scale: 1.2, duration: 0.001, ease: "power2.in" });
  };

  const handleMouseLeave = (index) => {
    gsap.to(navRefs.current[index], { scale: 1, duration: 0.01, ease: "power2.in" });
  };

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About Me", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Resume/CV", href: "#resume" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-[900ms] ease-in-out ${
        isVisible ? "translate-y-5 shadow-lg" : "-translate-y-full"
      }`}
    >
  

      <nav className="flex w-full screen-max-width justify-center">
        <div className="flex flex-1 justify-center max-sm:hidden">
          {navItems.map((nav, i) => (
            <a
              key={i}
              href={nav.href}
              ref={(el) => (navRefs.current[i] = el)}
              className="px-8 text-base cursor-pointer text-gray hover:text-white transition-transform duration-300"
              onMouseEnter={() => handleMouseEnter(i)}
              onMouseLeave={() => handleMouseLeave(i)}
            >
              {nav.name}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Navbar; 