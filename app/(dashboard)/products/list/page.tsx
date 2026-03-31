"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Plus,
  MoreHorizontal,
  Filter,
  ArrowUpDown,
  Edit2,
  Trash2,
  Eye,
  Box,
} from "lucide-react";
import Link from "next/link";

// Mock Data for the Editorial Botanical Aesthetic
const PRODUCTS = [
  {
    id: "PRD-001",
    name: "Monstera Albo Borsigiana",
    category: "Rare Aroids",
    image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&q=80&w=400&h=400",
    price: "₹12,500",
    stock: 12,
    status: "active",
    sku: "HT-MON-ALB",
  },
  {
    id: "PRD-002",
    name: "Ficus Lyrata 'Bambino'",
    category: "Interior Trees",
    image: "https://images.unsplash.com/photo-1600411833196-7c0f28db0c0a?auto=format&fit=crop&q=80&w=400&h=400",
    price: "₹1,850",
    stock: 45,
    status: "active",
    sku: "HT-FIC-BAM",
  },
  {
    id: "PRD-003",
    name: "Calathea Orbifolia",
    category: "Foliage Plants",
    image: "https://images.unsplash.com/photo-1620127807580-128a1ccaa2b2?auto=format&fit=crop&q=80&w=400&h=400",
    price: "₹950",
    stock: 8,
    status: "low_stock",
    sku: "HT-CAL-ORB",
  },
  {
    id: "PRD-004",
    name: "Philodendron Pink Princess",
    category: "Rare Aroids",
    image: "https://images.unsplash.com/photo-1653846665766-04283fc3c965?auto=format&fit=crop&q=80&w=400&h=400",
    price: "₹4,200",
    stock: 0,
    status: "out_of_stock",
    sku: "HT-PHI-PNK",
  },
  {
    id: "PRD-005",
    name: "Strelitzia Nicolai",
    category: "Interior Trees",
    image: "https://images.unsplash.com/photo-1602058428580-c0678f566494?auto=format&fit=crop&q=80&w=400&h=400",
    price: "₹3,100",
    stock: 24,
    status: "draft",
    sku: "HT-STR-NIC",
  },
  {
    id: "PRD-006",
    name: "Anthurium Clarinervium",
    category: "Collectibles",
    image: "https://images.unsplash.com/photo-1663162791404-54c7dca6bb21?auto=format&fit=crop&q=80&w=400&h=400",
    price: "₹5,500",
    stock: 18,
    status: "active",
    sku: "HT-ANT-CLA",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as any } },
};

export default function ProductListPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

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
            Inventory Management
          </p>
          <h1 className="text-4xl md:text-5xl font-editorial-serif text-[#254222] tracking-tight leading-tight">
            Curated Catalog
          </h1>
          <p className="text-[#4F684C] mt-2 text-sm md:text-base max-w-xl pr-4">
            Manage your botanical specimens, monitor inventory levels, and organize collections for the storefront.
          </p>
        </div>

        <Link href="/products/create" className="group relative inline-flex items-center justify-center px-6 py-3 bg-[#254222] text-[#fcfdfa] overflow-hidden rounded-none shadow-[4px_4px_0px_#cae4c5] hover:shadow-[2px_2px_0px_#cae4c5] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-300">
          <div className="absolute inset-0 w-0 bg-[#82B34B] transition-all duration-300 ease-out group-hover:w-full"></div>
          <span className="relative flex items-center gap-2 font-medium text-sm tracking-wide">
            <Plus size={16} strokeWidth={2.5} />
            Add Specimen
          </span>
        </Link>
      </motion.div>

      {/* Toolbar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex flex-col sm:flex-row gap-4 mb-8 items-center justify-between bg-white border border-[#cae4c5]/60 p-2 pl-4"
      >
        <div className="relative w-full sm:max-w-md flex items-center">
          <Search className="absolute left-0 text-[#4F684C]/60" size={18} />
          <input
            type="text"
            placeholder="Search by name or SKU..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent border-none pl-8 pr-4 py-2 text-sm text-[#254222] placeholder:text-[#4F684C]/40 focus:outline-none focus:ring-0"
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-[#cae4c5] text-[#4F684C] hover:text-[#254222] hover:bg-[#cae4c5]/20 text-xs font-semibold uppercase tracking-wider transition-colors">
            <Filter size={14} /> Filter
          </button>
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-[#cae4c5] text-[#4F684C] hover:text-[#254222] hover:bg-[#cae4c5]/20 text-xs font-semibold uppercase tracking-wider transition-colors">
            <ArrowUpDown size={14} /> Sort
          </button>
        </div>
      </motion.div>

      {/* Editorial Data Table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="border-b-2 border-[#254222]">
              <th className="py-4 px-4 text-[10px] font-bold tracking-[0.15em] text-[#254222] uppercase">Specimen</th>
              <th className="py-4 px-4 text-[10px] font-bold tracking-[0.15em] text-[#254222] uppercase">SKU</th>
              <th className="py-4 px-4 text-[10px] font-bold tracking-[0.15em] text-[#254222] uppercase">Inventory</th>
              <th className="py-4 px-4 text-[10px] font-bold tracking-[0.15em] text-[#254222] uppercase">Value</th>
              <th className="py-4 px-4 text-[10px] font-bold tracking-[0.15em] text-[#254222] uppercase">Status</th>
              <th className="py-4 px-4 text-[10px] font-bold tracking-[0.15em] text-[#254222] uppercase text-right">Actions</th>
            </tr>
          </thead>
          <motion.tbody
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="divide-y divide-[#cae4c5]/40"
          >
            {PRODUCTS.map((product) => (
              <motion.tr
                key={product.id}
                variants={itemVariants}
                className="group hover:bg-[#cae4c5]/10 transition-colors duration-200"
              >
                {/* Product Col */}
                <td className="py-5 px-4">
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 overflow-hidden rounded-sm bg-[#cae4c5]/20 border border-[#cae4c5]/40 shrink-0 relative">
                      {/* Using regular img for external URLs since next/image needs domain config */}
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                      />
                    </div>
                    <div>
                      <p className="text-[15px] font-editorial-serif font-medium text-[#254222] group-hover:text-[#82B34B] transition-colors">
                        {product.name}
                      </p>
                      <p className="text-[12px] text-[#4F684C] mt-0.5">{product.category}</p>
                    </div>
                  </div>
                </td>

                {/* SKU Col */}
                <td className="py-5 px-4 font-mono text-[11px] text-[#4F684C] tracking-wider">
                  {product.sku}
                </td>

                {/* Inventory Col */}
                <td className="py-5 px-4">
                  <div className="flex items-center gap-2">
                    <div className={`h-1.5 w-1.5 rounded-full ${
                      product.stock > 10 ? 'bg-[#82B34B]' : product.stock > 0 ? 'bg-[#e5a9a9]' : 'bg-red-500'
                    }`} />
                    <span className="text-[13px] font-medium text-[#254222]">
                      {product.stock} <span className="text-[#4F684C] font-normal text-[11px]">in stock</span>
                    </span>
                  </div>
                </td>

                {/* Price Col */}
                <td className="py-5 px-4 font-editorial-serif text-[15px] font-medium text-[#254222]">
                  {product.price}
                </td>

                {/* Status Col */}
                <td className="py-5 px-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest border ${
                      product.status === "active"
                        ? "bg-[#cae4c5]/30 border-[#cae4c5] text-[#254222]"
                        : product.status === "low_stock"
                        ? "bg-[#e5a9a9]/20 border-[#e5a9a9] text-[#8c3535]"
                        : product.status === "out_of_stock"
                        ? "bg-red-50 border-red-200 text-red-700"
                        : "bg-gray-50 border-gray-200 text-gray-500"
                    }`}
                  >
                    {product.status.replace("_", " ")}
                  </span>
                </td>

                {/* Actions Col */}
                <td className="py-5 px-4 text-right relative">
                  <button
                    onClick={() => setActiveMenu(activeMenu === product.id ? null : product.id)}
                    className="p-2 text-[#4F684C] hover:text-[#254222] hover:bg-[#cae4c5]/30 rounded-full transition-colors"
                  >
                    <MoreHorizontal size={18} />
                  </button>
                  
                  {/* Action Menu Popover */}
                  <AnimatePresence>
                    {activeMenu === product.id && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-8 top-10 w-40 bg-white border border-[#cae4c5] shadow-[0_10px_40px_rgba(37,66,34,0.1)] z-10 py-1 flex flex-col items-start"
                      >
                        <button className="w-full px-4 py-2 text-left text-xs text-[#254222] hover:bg-[#cae4c5]/20 flex items-center gap-2 transition-colors">
                          <Eye size={14} className="text-[#4F684C]" /> View Details
                        </button>
                        <button className="w-full px-4 py-2 text-left text-xs text-[#254222] hover:bg-[#cae4c5]/20 flex items-center gap-2 transition-colors">
                          <Edit2 size={14} className="text-[#4F684C]" /> Edit Specimen
                        </button>
                        <div className="w-full h-px bg-[#cae4c5]/40 my-1"></div>
                        <button className="w-full px-4 py-2 text-left text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors font-medium">
                          <Trash2 size={14} /> Delete
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </td>
              </motion.tr>
            ))}
          </motion.tbody>
        </table>
      </div>
      
      {/* Pagination Footer */}
      <div className="mt-8 pt-4 border-t border-[#cae4c5]/40 flex justify-between items-center text-xs text-[#4F684C]">
        <p>Showing 1-6 of 24 specimens</p>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 border border-[#cae4c5] hover:bg-[#cae4c5]/20 hover:text-[#254222] transition-colors disabled:opacity-50">Previous</button>
          <button className="px-3 py-1.5 border border-[#cae4c5] bg-[#254222] text-white">1</button>
          <button className="px-3 py-1.5 border border-[#cae4c5] hover:bg-[#cae4c5]/20 hover:text-[#254222] transition-colors">2</button>
          <button className="px-3 py-1.5 border border-[#cae4c5] hover:bg-[#cae4c5]/20 hover:text-[#254222] transition-colors">3</button>
          <button className="px-3 py-1.5 border border-[#cae4c5] hover:bg-[#cae4c5]/20 hover:text-[#254222] transition-colors">Next</button>
        </div>
      </div>
    </div>
  );
}

