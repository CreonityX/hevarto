import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

export function Footer() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  // Close the mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {/* Footer Nav */}
      <footer className="flex flex-row items-center justify-between md:justify-start px-[48px] md:px-[86px] pb-[43px] gap-8 md:gap-32 mt-auto relative z-[60]">
        <Link to="/" className="text-[#ed1f27] text-[40px] md:text-[50px] font-medium font-sans hover:opacity-80 transition-opacity z-[60]">
          Hevarto
        </Link>
        
        {/* Desktop Nav - Centered with logo baseline */}
        <nav className="hidden md:flex flex-wrap items-center gap-8 md:gap-16 text-[#8e8e8e] text-[18px] md:text-[25px] font-normal font-sans">
          <Link to="#" className="hover:text-black dark:hover:text-white transition-colors">About</Link>
          <Link to="#" className="hover:text-black dark:hover:text-white transition-colors">Investors</Link>
          <Link to="#" className="hover:text-black dark:hover:text-white transition-colors">Privacy</Link>
          <Link to="#" className="hover:text-black dark:hover:text-white transition-colors">Terms</Link>
          
          <button 
            onClick={toggleTheme} 
            className="hover:text-black dark:hover:text-white transition-colors ml-4 md:ml-0"
            aria-label="Toggle dark mode"
          >
            {theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </nav>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden flex items-center z-[60]">
          <button 
            className="relative w-8 h-[20px] text-[#8e8e8e] hover:text-black dark:hover:text-white transition-colors focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={isOpen}
          >
            <span className={`absolute left-0 w-full h-[2px] bg-current transition-all duration-300 ${isOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'}`} />
            <span className={`absolute left-0 w-full h-[2px] bg-current transition-all duration-300 ${isOpen ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-0'}`} />
          </button>
        </div>
      </footer>

      {/* Mobile Full Screen Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: "10%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "10%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-white dark:bg-black z-[55] flex flex-col justify-center px-[48px] md:hidden"
          >
            <div className="absolute top-[43px] left-[48px]">
              <button 
                onClick={toggleTheme} 
                className="text-[#8e8e8e] hover:text-black dark:hover:text-white transition-colors focus:outline-none"
                aria-label="Toggle dark mode"
              >
                {theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
              </button>
            </div>
            <nav className="flex flex-col items-start gap-10 text-[#8e8e8e] text-[25px] font-normal font-sans">
              <Link to="#" onClick={() => setIsOpen(false)} className="hover:text-black dark:hover:text-white transition-colors">About</Link>
              <Link to="#" onClick={() => setIsOpen(false)} className="hover:text-black dark:hover:text-white transition-colors">Investors</Link>
              <Link to="#" onClick={() => setIsOpen(false)} className="hover:text-black dark:hover:text-white transition-colors">Privacy</Link>
              <Link to="#" onClick={() => setIsOpen(false)} className="hover:text-black dark:hover:text-white transition-colors">Terms</Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}