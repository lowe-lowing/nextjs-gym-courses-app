import React from "react";
import { motion } from "framer-motion";

const Motion = ({ children, variant }) => {
  return (
    <motion.div
      variants={variant} // Pass the variant object into Framer Motion
      initial="hidden" // Set the initial state to variants.hidden
      animate="enter" // Animated state to variants.enter
      exit="exit" // Exit state (used later) to variants.exit
      transition={{ type: "linear" }} //
    >
      {children}
    </motion.div>
  );
};

export default Motion;
