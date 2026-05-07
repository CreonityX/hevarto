import { useLocation, useOutlet } from "react-router";
import { AnimatePresence, motion } from "motion/react";

export function Layout() {
  const location = useLocation();
  const element = useOutlet();

  return (
    <div className="min-h-screen w-full bg-white dark:bg-black font-sans text-black dark:text-white transition-colors duration-300">
      <div className="mx-auto w-full max-w-[1600px] min-h-screen flex flex-col relative overflow-hidden bg-white dark:bg-black shadow-none md:shadow-xl shadow-gray-100/50 dark:shadow-none transition-colors duration-300">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col min-h-screen w-full"
          >
            {element}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}