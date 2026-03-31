"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Leaf, Droplets, Sun, Wind, Box } from "lucide-react";

// Mock Data for Product Types
const TYPES = [
  {
    id: "TYP-001",
    name: "Rare Aroids",
    description: "Highly sought-after collector plants with complex variegation patterns.",
    count: 42,
    icon: <Leaf strokeWidth={1.5} />,
    color: "#254222",
    bgColor: "#cae4c5/20",
  },
  {
    id: "TYP-002",
    name: "Interior Trees",
    description: "Large structural plants designed to anchor a room's aesthetic.",
    count: 18,
    icon: <Box strokeWidth={1.5} />,
    color: "#4F684C",
    bgColor: "#4F684C/10",
  },
  {
    id: "TYP-003",
    name: "Succulents & Cacti",
    description: "Drought-tolerant specimens originating from arid environments.",
    count: 105,
    icon: <Sun strokeWidth={1.5} />,
    color: "#d95c5c",
    bgColor: "#d95c5c/10",
  },
  {
    id: "TYP-004",
    name: "Aquatic Botanicals",
    description: "Water-rooted flora requiring specialized submerged environments.",
    count: 12,
    icon: <Droplets strokeWidth={1.5} />,
    color: "#82B34B",
    bgColor: "#82B34B/10",
  },
  {
    id: "TYP-005",
    name: "Air Plants (Tillandsia)",
    description: "Epiphytic specimens that grow without traditional soil.",
    count: 34,
    icon: <Wind strokeWidth={1.5} />,
    color: "#8c3535",
    bgColor: "#8c3535/10",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function ProductTypesPage() {
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-full bg-[#fcfdfa] p-8 lg:p-12 font-sans selection:bg-[#cae4c5] selection:text-[#254222]">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6"
      >
        <div>
          <p className="text-[#82B34B] font-mono text-xs uppercase tracking-[0.2em] mb-2 font-semibold">
            Taxonomy Management
          </p>
          <h1 className="text-4xl md:text-5xl font-editorial-serif text-[#254222] tracking-tight leading-tight">
            Specimen Classifications
          </h1>
          <p className="text-[#4F684C] mt-2 text-sm md:text-base max-w-xl pr-4">
            Define and organize the primary biological types used to categorize your inventory.
          </p>
        </div>

        <button className="group relative inline-flex items-center justify-center px-6 py-3 bg-[#254222] text-[#fcfdfa] overflow-hidden rounded-none shadow-[4px_4px_0px_#cae4c5] hover:shadow-[2px_2px_0px_#cae4c5] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-300">
          <div className="absolute inset-0 w-0 bg-[#82B34B] transition-all duration-300 ease-out group-hover:w-full"></div>
          <span className="relative flex items-center gap-2 font-medium text-sm tracking-wide">
            <Plus size={16} strokeWidth={2.5} />
            New Classification
          </span>
        </button>
      </motion.div>

      {/* Grid Display */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {TYPES.map((type) => (
          <motion.div
            key={type.id}
            variants={cardVariants}
            className="group block relative bg-white border border-[#cae4c5]/60 hover:border-[#cae4c5] p-8 transition-all duration-300 hover:shadow-[0_10px_40px_rgba(37,66,34,0.06)] overflow-hidden cursor-pointer flex flex-col min-h-[300px]"
          >
            {/* Decorative Background Elements */}
            <div className="absolute -right-6 -top-6 w-32 h-32 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-500" style={{ backgroundColor: type.color }} />
            
            <div className="relative z-10 flex flex-col h-full flex-1">
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-white border border-[#cae4c5]/50 shadow-sm rounded-sm text-[#254222]">
                  {type.icon}
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#4F684C]">
                  {type.id}
                </span>
              </div>
              
              <h3 className="text-2xl font-editorial-serif text-[#254222] mb-3 group-hover:text-[#82B34B] transition-colors">
                {type.name}
              </h3>
              
              <p className="text-[#4F684C] text-sm leading-relaxed mb-8 grow">
                {type.description}
              </p>
              
              <div className="pt-4 border-t border-[#cae4c5]/40 flex items-center justify-between mt-auto">
                <span className="text-xs font-bold uppercase tracking-widest text-[#254222]">
                  Inventory
                </span>
                <span className="text-sm font-mono text-[#82B34B] bg-[#82B34B]/10 px-2 py-1">
                  {type.count} specimens
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
