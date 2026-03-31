"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, ChevronRight, Hash, Edit2, Trash2, FolderTree } from "lucide-react";

// Mock Data for Categories (Hierarchical Taxonomy)
const CATEGORIES = [
  {
    id: "CAT-1",
    name: "Aroids",
    slug: "aroids",
    specimens: 142,
    children: [
      { id: "CAT-1-1", name: "Monstera", slug: "monstera", specimens: 34 },
      { id: "CAT-1-2", name: "Philodendron", slug: "philodendron", specimens: 86 },
      { id: "CAT-1-3", name: "Anthurium", slug: "anthurium", specimens: 22 },
    ]
  },
  {
    id: "CAT-2",
    name: "Interior Foliage",
    slug: "interior-foliage",
    specimens: 89,
    children: [
      { id: "CAT-2-1", name: "Ficus", slug: "ficus", specimens: 45 },
      { id: "CAT-2-2", name: "Calathea", slug: "calathea", specimens: 44 },
    ]
  },
  {
    id: "CAT-3",
    name: "Succulents",
    slug: "succulents",
    specimens: 215,
    children: [
      { id: "CAT-3-1", name: "Echeveria", slug: "echeveria", specimens: 110 },
      { id: "CAT-3-2", name: "Haworthia", slug: "haworthia", specimens: 105 },
    ]
  }
];

export default function CategoryManagementPage() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    "CAT-1": true,
    "CAT-2": true
  });

  const toggleExpand = (id: string) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

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
            Storefront Organization
          </p>
          <h1 className="text-4xl md:text-5xl font-editorial-serif text-[#254222] tracking-tight leading-tight">
            Taxonomy & Categories
          </h1>
          <p className="text-[#4F684C] mt-2 text-sm md:text-base max-w-xl pr-4">
            Build the botanical family tree. Organize specimens into shoppable families and genera.
          </p>
        </div>

        <button className="group relative inline-flex items-center justify-center px-6 py-3 bg-[#254222] text-[#fcfdfa] overflow-hidden rounded-none shadow-[4px_4px_0px_#cae4c5] hover:shadow-[2px_2px_0px_#cae4c5] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-300">
          <div className="absolute inset-0 w-0 bg-[#82B34B] transition-all duration-300 ease-out group-hover:w-full"></div>
          <span className="relative flex items-center gap-2 font-medium text-sm tracking-wide">
            <Plus size={16} strokeWidth={2.5} />
            Add Family
          </span>
        </button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Taxonomy Tree */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="lg:col-span-8 bg-white border border-[#cae4c5]/60 p-6 md:p-10 shadow-[0_5px_30px_rgba(37,66,34,0.03)]"
        >
          <div className="flex items-center gap-3 mb-8 border-b border-[#cae4c5]/40 pb-4">
            <FolderTree className="text-[#82B34B]" size={20} />
            <h2 className="text-xl font-editorial-serif text-[#254222]">Botanical Hierarchy</h2>
          </div>

          <div className="space-y-4">
            {CATEGORIES.map((category) => (
              <div key={category.id} className="border border-[#cae4c5]/40 bg-[#fcfdfa] rounded-sm overflow-hidden">
                {/* Master Category Row */}
                <div 
                  className="flex items-center justify-between p-4 cursor-pointer hover:bg-[#cae4c5]/10 transition-colors"
                  onClick={() => toggleExpand(category.id)}
                >
                  <div className="flex items-center gap-4">
                    <motion.div 
                      animate={{ rotate: expanded[category.id] ? 90 : 0 }} 
                      className="w-6 h-6 flex items-center justify-center text-[#4F684C]"
                    >
                      <ChevronRight size={18} />
                    </motion.div>
                    <div>
                      <h3 className="text-lg font-editorial-serif text-[#254222] leading-none mb-1">
                        {category.name}
                      </h3>
                      <p className="text-[11px] font-mono text-[#82B34B]">/{category.slug}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="text-xs text-[#4F684C] font-medium hidden sm:block">
                      {category.specimens} Specimens
                    </span>
                    <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                      <button className="p-2 text-[#4F684C] hover:text-[#254222] hover:bg-[#cae4c5]/30 rounded-full transition-colors" title="Edit Family">
                        <Edit2 size={14} />
                      </button>
                      <button className="p-2 text-[#e55c5c] hover:bg-red-50 rounded-full transition-colors" title="Delete Family">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Subcategories (Children) */}
                <AnimatePresence>
                  {expanded[category.id] && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden bg-white border-t border-[#cae4c5]/30 relative"
                    >
                      {/* Left border line indicating hierarchy */}
                      <div className="absolute left-7 top-0 bottom-6 w-px bg-[#cae4c5]"></div>
                      
                      <div className="pl-14 pr-4 py-2 space-y-1">
                        {category.children.map((child) => (
                          <div key={child.id} className="group flex items-center justify-between py-3 border-b border-[#cae4c5]/20 last:border-0 relative">
                            {/* Horizontal line attaching to the vertical line */}
                            <div className="absolute -left-7 top-1/2 w-6 h-px bg-[#cae4c5]"></div>
                            
                            <div className="flex items-center gap-3">
                              <Hash size={14} className="text-[#82B34B]/60" />
                              <span className="text-sm font-medium text-[#4F684C] group-hover:text-[#254222] transition-colors">
                                {child.name}
                              </span>
                            </div>
                            
                            <div className="flex items-center gap-4">
                              <span className="text-[11px] font-mono text-[#4F684C] bg-[#fcfdfa] border border-[#cae4c5]/50 px-2 py-0.5 hidden sm:block">
                                {child.specimens} items
                              </span>
                              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="p-1.5 text-[#4F684C] hover:text-[#254222] rounded-full transition-colors">
                                  <Edit2 size={12} />
                                </button>
                                <button className="p-1.5 text-[#e55c5c] hover:bg-red-50 rounded-full transition-colors">
                                  <Trash2 size={12} />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                        
                        {/* Add child button */}
                        <div className="py-3 relative mt-1">
                           <div className="absolute -left-7 top-1/2 w-6 h-px bg-[#cae4c5]"></div>
                           <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#82B34B] hover:text-[#254222] transition-colors">
                             <Plus size={14} /> Add Genus
                           </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Metadata / Info Sidebar */}
        <motion.div
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ delay: 0.4, duration: 0.6 }}
           className="lg:col-span-4 space-y-6"
        >
          <div className="bg-[#cae4c5]/10 border border-[#cae4c5] p-6 text-[#254222]">
            <h3 className="font-editorial-serif text-xl mb-3">Taxonomy Rules</h3>
            <p className="text-sm text-[#4F684C] leading-relaxed mb-4">
              Carefully categorize specimens. A strict hierarchy ensures clients can browse the shop naturally. 
            </p>
            <ul className="text-[13px] space-y-3">
              <li className="flex gap-2">
                <span className="text-[#82B34B] font-bold">01.</span>
                <span>Families (e.g., Aroids) should encompass broad, recognizable groups.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#82B34B] font-bold">02.</span>
                <span>Genera (e.g., Monstera) fall underneath and define specific plant lineages.</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
