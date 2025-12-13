import { useState, useRef } from "react";
import NavItem from "./NavItem";
import DropdownPanel from "./DropdownPanel";

const navItems = [
  { name: "Home", href: "#hero" },

  {
    name: "Projects",
    href: "#projects",
    dropdown: [
      { name: "Design Work", href: "#design" },
      { name: "AI/ML", href: "#AIML" },
      { name: "System Design", href: "#system-design" },
      { name: "Web Development", href: "#webDevelopment" },
    ],
    description:
      "A showcase of my portfolio including design work, AI/ML projects, case studies, and web development.",
  },

  {
    name: "About",
    href: "#about",
    dropdown: [
      { name: "Background", href: "#background" },
      { name: "Skills", href: "#skills" },
      { name: "Experience", href: "#experience" },
      { name: "Interests", href: "#interests" },
    ],
    description: "Learn more about me, my background, skills, and interests. I specialize in low-level systems, AI/ML, and creating innovative web experiences.",
  },

  {
    name: "Contact",
    href: "#contact",
    dropdown: [
      { name: "+91 79090 69340", href: "tel:+917909069340" },
      { name: "kavyanhembrom@gmail.com", href: "mailto:kavyanhembrom@gmail.com" },
      {
        name: "linkedin.com/in/kavyan-hembrom/",
        href: "https://linkedin.com/in/kavyan-hembrom/",
      },
      { name: "github.com/kavyan256", href: "https://github.com/kavyan256" },
    ],
    description:
      "Get in touch with me via email, social media, or contact form.",
  },
];

export default function Navbar() {
  const [hoverIndex, setHoverIndex] = useState(null);
  const [showWhiteRect, setShowWhiteRect] = useState(false);

  const itemRefs = useRef([]);
  const dropdownRefs = useRef(navItems.map(() => []));

  const handleContainerMouseLeave = () => setShowWhiteRect(false);

  const handleItemClick = (index) => {
    // Only show dropdown if the item has dropdown items
    if (navItems[index].dropdown && navItems[index].dropdown.length > 0) {
      setHoverIndex(index);
      setShowWhiteRect(true);
    }
  };

  return (
    <div
      className="absolute top-0 left-0 w-full"
      onMouseLeave={handleContainerMouseLeave}
    >
      {/* Dropdown */}
      {showWhiteRect && (
        <DropdownPanel
          showWhiteRect={showWhiteRect}
          hoverIndex={hoverIndex}
          navItems={navItems}
          dropdownRefs={dropdownRefs}
        />
      )}

      {/* Navbar */}
      <nav className="relative z-20 flex items-center justify-center w-full h-16 bg-transparent">
        <div className="flex justify-center flex-1">
          {navItems.map((item, index) => (
            <NavItem
              key={index}
              item={item}
              index={index}
              showWhiteRect={showWhiteRect}
              onMouseEnter={setHoverIndex}
              onMouseLeave={() => {}}
              onClick={handleItemClick}
              registerRef={itemRefs}
            />
          ))}
        </div>
      </nav>
    </div>
  );
}
