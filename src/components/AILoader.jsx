import React from "react";
import { motion } from "framer-motion";
import { Brain } from "lucide-react";

const AILoader = () => {
  return (
    <div className="flex items-center justify-center">
      <motion.div
        className="relative w-7 h-7 flex items-center justify-center"
        animate={{ scale: [0.9, 1.1, 0.9] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <Brain className="w-6 h-6 text-purple-300" />
      </motion.div>
    </div>
  );
};

export default AILoader;
