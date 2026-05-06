"use client";

import React, { useEffect, useState } from "react";
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
  
  const [products, setProducts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  useEffect(() => {
  fetch("http://localhost:5000/products")
    .then((res) => res.json())
    .then((resData) => {
      console.log("API FULL RESPONSE:", resData);
      console.log("PRODUCTS:", resData.data);
      setProducts(resData.data || []);
    })
    .catch((err) => console.error(err));
}, []);

  return (
    <div className="min-h-full bg-[#E3E0D8] p-8 lg:p-12 font-sans selection:bg-[#00C725] selection:text-[#0D140B]">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6"
      >
        <div>
          <p className="text-[#00C725] font-mono text-xs uppercase tracking-[0.2em] mb-2 font-semibold">
            Inventory Management
          </p>
          <h1 className="text-4xl md:text-5xl font-editorial-serif text-[#0D140B] tracking-tight leading-tight">
            Curated Catalog
          </h1>
          <p className="text-[#3B5238] mt-2 text-sm md:text-base max-w-xl pr-4">
            Manage your botanical specimens, monitor inventory levels, and organize collections for the storefront.
          </p>
        </div>

        <Link href="/products/create" className="group relative inline-flex items-center justify-center px-6 py-3 bg-[#0D140B] text-[#E3E0D8] overflow-hidden rounded-none shadow-[4px_4px_0px_#0D140B] hover:shadow-[2px_2px_0px_#0D140B] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-300">
          <div className="absolute inset-0 w-0 bg-[#00C725] transition-all duration-300 ease-out group-hover:w-full"></div>
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
        className="flex flex-col sm:flex-row gap-4 mb-8 items-center justify-between bg-[#F2F0EA] border border-[#0D140B] p-2 pl-4"
      >
        <div className="relative w-full sm:max-w-md flex items-center">
          <Search className="absolute left-0 text-[#3B5238]/60" size={18} />
          <input
            type="text"
            placeholder="Search by name or SKU..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent border-none pl-8 pr-4 py-2 text-sm text-[#0D140B] placeholder:text-[#3B5238]/40 focus:outline-none focus:ring-0"
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-[#0D140B] text-[#3B5238] hover:text-[#0D140B] hover:bg-[#00C725]/20 text-xs font-semibold uppercase tracking-wider transition-colors">
            <Filter size={14} /> Filter
          </button>
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-[#0D140B] text-[#3B5238] hover:text-[#0D140B] hover:bg-[#00C725]/20 text-xs font-semibold uppercase tracking-wider transition-colors">
            <ArrowUpDown size={14} /> Sort
          </button>
        </div>
      </motion.div>

      {/* Editorial Data Table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="border-b-2 border-[#0D140B]">
              <th className="py-4 px-4 text-[10px] font-bold tracking-[0.15em] text-[#0D140B] uppercase">Specimen</th>
              <th className="py-4 px-4 text-[10px] font-bold tracking-[0.15em] text-[#0D140B] uppercase">SKU</th>
              <th className="py-4 px-4 text-[10px] font-bold tracking-[0.15em] text-[#0D140B] uppercase">Inventory</th>
              <th className="py-4 px-4 text-[10px] font-bold tracking-[0.15em] text-[#0D140B] uppercase">Value</th>
              <th className="py-4 px-4 text-[10px] font-bold tracking-[0.15em] text-[#0D140B] uppercase">Status</th>
              <th className="py-4 px-4 text-[10px] font-bold tracking-[0.15em] text-[#0D140B] uppercase text-right">Actions</th>
            </tr>
          </thead>
          <motion.tbody
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="divide-y divide-[#00C725]/40"
          >
            {products.map((product) => (
              <motion.tr
                key={product._id}
                variants={itemVariants}
                className="group hover:bg-[#00C725]/10 transition-colors duration-200"
              >
                {/* Product Col */}
                <td className="py-5 px-4">
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 overflow-hidden rounded-sm bg-[#00C725]/20 border border-[#0D140B] shrink-0 relative">
                      {/* Using regular img for external URLs since next/image needs domain config */}
                      <img
                      src={`http://localhost:5000/uploads/${product.image}`}
                      alt={product.commonName}
                        className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                      />
                    </div>
                    <div>
                      <p className="text-[15px] font-editorial-serif font-medium text-[#0D140B] group-hover:text-[#00C725] transition-colors">
                        {product.commonName}
                      </p>
                      <p className="text-[12px] text-[#3B5238] mt-0.5">{product.category?.name}</p>
                    </div>
                  </div>
                </td>

                {/* SKU Col */}
                <td className="py-5 px-4 font-mono text-[11px] text-[#3B5238] tracking-wider">
                  {product.sku}
                </td>

                {/* Inventory Col */}
                <td className="py-5 px-4">
                  <div className="flex items-center gap-2">
                    <div className={`h-1.5 w-1.5 rounded-full ${
                      product.stockQty > 10 ? 'bg-[#00C725]' : product.stockQty > 0 ? 'bg-[#e5a9a9]' : 'bg-red-500'
                    }`} />
                    <span className="text-[13px] font-medium text-[#0D140B]">
                      {product.stockQty} <span className="text-[#3B5238] font-normal text-[11px]">in stock</span>
                    </span>
                  </div>
                </td>

                {/* Price Col */}
                <td className="py-5 px-4 font-editorial-serif text-[15px] font-medium text-[#0D140B]">
                  {product.price}
                </td>

                {/* Status Col */}
                <td className="py-5 px-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest border ${
                      product.status === "active"
                        ? "bg-[#00C725]/30 border-[#0D140B] text-[#0D140B]"
                        : product.status === "low_stock"
                        ? "bg-[#e5a9a9]/20 border-[#e5a9a9] text-[#8c3535]"
                        : product.status === "out_of_stock"
                        ? "bg-red-50 border-red-200 text-red-700"
                        : "bg-gray-50 border-gray-200 text-gray-500"
                    }`}
                  >
                    {product.status?.replace("_", " ") || "N/A"}
                  </span>
                </td>

                {/* Actions Col */}
                <td className="py-5 px-4 text-right relative">
                  <button
                    onClick={() => setActiveMenu(activeMenu === product._id ? null : product._id)}
                    className="p-2 text-[#3B5238] hover:text-[#0D140B] hover:bg-[#00C725]/30 rounded-full transition-colors"
                  >
                    <MoreHorizontal size={18} />
                  </button>
                  
                  {/* Action Menu Popover */}
                  <AnimatePresence>
                    {activeMenu === product._id && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-8 top-10 w-40 bg-[#F2F0EA] border border-[#0D140B] shadow-[0_10px_40px_rgba(37,66,34,0.1)] z-10 py-1 flex flex-col items-start"
                      >
                        <button className="w-full px-4 py-2 text-left text-xs text-[#0D140B] hover:bg-[#00C725]/20 flex items-center gap-2 transition-colors">
                          <Eye size={14} className="text-[#3B5238]" /> View Details
                        </button>
                        <button className="w-full px-4 py-2 text-left text-xs text-[#0D140B] hover:bg-[#00C725]/20 flex items-center gap-2 transition-colors">
                          <Edit2 size={14} className="text-[#3B5238]" /> Edit Specimen
                        </button>
                        <div className="w-full h-px bg-[#00C725]/40 my-1"></div>
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
      <div className="mt-8 pt-4 border-t border-[#0D140B] flex justify-between items-center text-xs text-[#3B5238]">
        <p>Showing 1-6 of 24 specimens</p>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 border border-[#0D140B] hover:bg-[#00C725]/20 hover:text-[#0D140B] transition-colors disabled:opacity-50">Previous</button>
          <button className="px-3 py-1.5 border border-[#0D140B] bg-[#0D140B] text-white">1</button>
          <button className="px-3 py-1.5 border border-[#0D140B] hover:bg-[#00C725]/20 hover:text-[#0D140B] transition-colors">2</button>
          <button className="px-3 py-1.5 border border-[#0D140B] hover:bg-[#00C725]/20 hover:text-[#0D140B] transition-colors">3</button>
          <button className="px-3 py-1.5 border border-[#0D140B] hover:bg-[#00C725]/20 hover:text-[#0D140B] transition-colors">Next</button>
        </div>
      </div>
    </div>
  );
}


// "use client";

// import React, { useState, useMemo } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Search,
//   Plus,
//   MoreHorizontal,
//   ArrowUpDown,
//   Edit2,
//   Trash2,
//   Eye,
//   Leaf,
//   AlertTriangle,
// } from "lucide-react";
// import Link from "next/link";

// // ─── Types ───────────────────────────────────────────────────────────────────

// type Status = "active" | "low_stock" | "out_of_stock" | "draft";

// interface Product {
//   id: string;
//   name: string;
//   category: string;
//   image: string;
//   price: string;
//   stock: number;
//   status: Status;
//   sku: string;
// }

// // ─── Mock Data ────────────────────────────────────────────────────────────────

// const PRODUCTS: Product[] = [
//   {
//     id: "PRD-001",
//     name: "Monstera Albo Borsigiana",
//     category: "Rare Aroids",
//     image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&q=80&w=400&h=400",
//     price: "₹12,500",
//     stock: 12,
//     status: "active",
//     sku: "HT-MON-ALB",
//   },
//   {
//     id: "PRD-002",
//     name: "Ficus Lyrata 'Bambino'",
//     category: "Interior Trees",
//     image: "https://images.unsplash.com/photo-1600411833196-7c0f28db0c0a?auto=format&fit=crop&q=80&w=400&h=400",
//     price: "₹1,850",
//     stock: 45,
//     status: "active",
//     sku: "HT-FIC-BAM",
//   },
//   {
//     id: "PRD-003",
//     name: "Calathea Orbifolia",
//     category: "Foliage Plants",
//     image: "https://images.unsplash.com/photo-1620127807580-128a1ccaa2b2?auto=format&fit=crop&q=80&w=400&h=400",
//     price: "₹950",
//     stock: 8,
//     status: "low_stock",
//     sku: "HT-CAL-ORB",
//   },
//   {
//     id: "PRD-004",
//     name: "Philodendron Pink Princess",
//     category: "Rare Aroids",
//     image: "https://images.unsplash.com/photo-1653846665766-04283fc3c965?auto=format&fit=crop&q=80&w=400&h=400",
//     price: "₹4,200",
//     stock: 0,
//     status: "out_of_stock",
//     sku: "HT-PHI-PNK",
//   },
//   {
//     id: "PRD-005",
//     name: "Strelitzia Nicolai",
//     category: "Interior Trees",
//     image: "https://images.unsplash.com/photo-1602058428580-c0678f566494?auto=format&fit=crop&q=80&w=400&h=400",
//     price: "₹3,100",
//     stock: 24,
//     status: "draft",
//     sku: "HT-STR-NIC",
//   },
//   {
//     id: "PRD-006",
//     name: "Anthurium Clarinervium",
//     category: "Collectibles",
//     image: "https://images.unsplash.com/photo-1663162791404-54c7dca6bb21?auto=format&fit=crop&q=80&w=400&h=400",
//     price: "₹5,500",
//     stock: 18,
//     status: "active",
//     sku: "HT-ANT-CLA",
//   },
// ];

// // ─── Helpers ──────────────────────────────────────────────────────────────────

// const STATUS_STYLES: Record<Status, string> = {
//   active: "bg-[#00C725]/30 border-[#00C725] text-[#0D4A0A]",
//   low_stock: "bg-amber-50 border-amber-300 text-amber-800",
//   out_of_stock: "bg-red-50 border-red-200 text-red-700",
//   draft: "bg-gray-100 border-gray-300 text-gray-500",
// };

// const STATUS_LABELS: Record<Status, string> = {
//   active: "Active",
//   low_stock: "Low Stock",
//   out_of_stock: "Out of Stock",
//   draft: "Draft",
// };

// const CATEGORIES = ["All", ...Array.from(new Set(PRODUCTS.map((p) => p.category)))];

// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
// };

// const itemVariants = {
//   hidden: { opacity: 0, y: 8 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
// };

// // ─── Component ────────────────────────────────────────────────────────────────

// export default function ProductListPage() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [activeCategory, setActiveCategory] = useState("All");
//   const [activeMenu, setActiveMenu] = useState<string | null>(null);
//   const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
//   const [sortField, setSortField] = useState<"name" | "stock" | "price" | null>(null);
//   const [sortAsc, setSortAsc] = useState(true);

//   // ── Filtering + Sorting ──
//   const filtered = useMemo(() => {
//     let list = [...PRODUCTS];

//     // Category filter
//     if (activeCategory !== "All") {
//       list = list.filter((p) => p.category === activeCategory);
//     }

//     // Search filter — name or SKU
//     const q = searchQuery.trim().toLowerCase();
//     if (q) {
//       list = list.filter(
//         (p) =>
//           p.name.toLowerCase().includes(q) ||
//           p.sku.toLowerCase().includes(q)
//       );
//     }

//     // Sort
//     if (sortField) {
//       list.sort((a, b) => {
//         let valA: string | number = "";
//         let valB: string | number = "";
//         if (sortField === "name") { valA = a.name; valB = b.name; }
//         if (sortField === "stock") { valA = a.stock; valB = b.stock; }
//         if (sortField === "price") {
//           valA = parseInt(a.price.replace(/[^\d]/g, ""));
//           valB = parseInt(b.price.replace(/[^\d]/g, ""));
//         }
//         if (valA < valB) return sortAsc ? -1 : 1;
//         if (valA > valB) return sortAsc ? 1 : -1;
//         return 0;
//       });
//     }

//     return list;
//   }, [searchQuery, activeCategory, sortField, sortAsc]);

//   // ── Bulk Select ──
//   const allSelected =
//     filtered.length > 0 && filtered.every((p) => selectedIds.has(p.id));

//   const toggleAll = () => {
//     if (allSelected) {
//       setSelectedIds(new Set());
//     } else {
//       setSelectedIds(new Set(filtered.map((p) => p.id)));
//     }
//   };

//   const toggleOne = (id: string) => {
//     setSelectedIds((prev) => {
//       const next = new Set(prev);
//       next.has(id) ? next.delete(id) : next.add(id);
//       return next;
//     });
//   };

//   // ── Sort toggle ──
//   const handleSort = (field: "name" | "stock" | "price") => {
//     if (sortField === field) {
//       setSortAsc((prev) => !prev);
//     } else {
//       setSortField(field);
//       setSortAsc(true);
//     }
//   };

//   const SortIcon = ({ field }: { field: "name" | "stock" | "price" }) => (
//     <ArrowUpDown
//       size={11}
//       className={`inline ml-1 transition-opacity ${
//         sortField === field ? "opacity-100 text-[#00C725]" : "opacity-30"
//       }`}
//     />
//   );

//   // ─── Render ───────────────────────────────────────────────────────────────

//   return (
//     <div
//       className="min-h-full bg-[#E3E0D8] p-8 lg:p-12 font-sans selection:bg-[#00C725] selection:text-[#0D140B]"
//       onClick={() => setActiveMenu(null)}
//     >

//       {/* ── Header ── */}
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
//         className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6"
//       >
//         <div>
//           <p className="text-[#00C725] font-mono text-xs uppercase tracking-[0.2em] mb-2 font-semibold">
//             Inventory Management
//           </p>
//           <h1 className="text-4xl md:text-5xl font-editorial-serif text-[#0D140B] tracking-tight leading-tight">
//             Curated Catalog
//           </h1>
//           <p className="text-[#3B5238] mt-2 text-sm md:text-base max-w-xl pr-4">
//             Manage your botanical specimens, monitor inventory levels, and organize collections for the storefront.
//           </p>
//         </div>
//         <Link
//           href="/products/create"
//           className="group relative inline-flex items-center justify-center px-6 py-3 bg-[#0D140B] text-[#E3E0D8] overflow-hidden rounded-none shadow-[4px_4px_0px_#0D140B] hover:shadow-[2px_2px_0px_#0D140B] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-300"
//         >
//           <div className="absolute inset-0 w-0 bg-[#00C725] transition-all duration-300 ease-out group-hover:w-full" />
//           <span className="relative flex items-center gap-2 font-medium text-sm tracking-wide">
//             <Plus size={16} strokeWidth={2.5} />
//             Add Specimen
//           </span>
//         </Link>
//       </motion.div>

//       {/* ── Category Filter Tabs ── */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.15, duration: 0.4 }}
//         className="flex gap-0 mb-6 overflow-x-auto"
//       >
//         {CATEGORIES.map((cat) => (
//           <button
//             key={cat}
//             onClick={() => setActiveCategory(cat)}
//             className={`px-4 py-2 text-xs font-bold uppercase tracking-widest border-b-2 whitespace-nowrap transition-all ${
//               activeCategory === cat
//                 ? "border-[#0D140B] text-[#0D140B]"
//                 : "border-transparent text-[#3B5238] hover:text-[#0D140B] hover:border-[#0D140B]/30"
//             }`}
//           >
//             {cat}
//             <span className="ml-1.5 text-[10px] font-mono opacity-60">
//               {cat === "All"
//                 ? PRODUCTS.length
//                 : PRODUCTS.filter((p) => p.category === cat).length}
//             </span>
//           </button>
//         ))}
//       </motion.div>

//       {/* ── Toolbar ── */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.2, duration: 0.5 }}
//         className="flex flex-col sm:flex-row gap-4 mb-6 items-center justify-between bg-[#F2F0EA] border border-[#0D140B] p-2 pl-4"
//       >
//         <div className="relative w-full sm:max-w-md flex items-center">
//           <Search className="absolute left-0 text-[#3B5238]/60" size={18} />
//           <input
//             type="text"
//             placeholder="Search by name or SKU..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full bg-transparent border-none pl-8 pr-4 py-2 text-sm text-[#0D140B] placeholder:text-[#3B5238]/40 focus:outline-none focus:ring-0"
//           />
//           {searchQuery && (
//             <button
//               onClick={() => setSearchQuery("")}
//               className="absolute right-2 text-[#3B5238] hover:text-[#0D140B] text-xs"
//             >
//               ✕
//             </button>
//           )}
//         </div>

//         <div className="flex items-center gap-3 w-full sm:w-auto">
//           {/* Bulk action bar */}
//           <AnimatePresence>
//             {selectedIds.size > 0 && (
//               <motion.div
//                 initial={{ opacity: 0, x: 10 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: 10 }}
//                 className="flex items-center gap-2"
//               >
//                 <span className="text-xs text-[#3B5238] font-mono">
//                   {selectedIds.size} selected
//                 </span>
//                 <button className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider border border-amber-400 text-amber-700 bg-amber-50 hover:bg-amber-100 transition-colors">
//                   Archive
//                 </button>
//                 <button className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider border border-red-300 text-red-600 bg-red-50 hover:bg-red-100 transition-colors">
//                   Delete
//                 </button>
//               </motion.div>
//             )}
//           </AnimatePresence>
//           <span className="text-xs text-[#3B5238] font-mono ml-auto sm:ml-0">
//             {filtered.length} of {PRODUCTS.length} specimens
//           </span>
//         </div>
//       </motion.div>

//       {/* ── Table ── */}
//       <div className="w-full overflow-x-auto">
//         <table className="w-full text-left border-collapse min-w-[800px]">
//           <thead>
//             <tr className="border-b-2 border-[#0D140B]">
//               {/* Bulk checkbox */}
//               <th className="py-4 px-3 w-10">
//                 <input
//                   type="checkbox"
//                   checked={allSelected}
//                   onChange={toggleAll}
//                   className="accent-[#00C725] w-3.5 h-3.5 cursor-pointer"
//                 />
//               </th>
//               <th
//                 className="py-4 px-4 text-[10px] font-bold tracking-[0.15em] text-[#0D140B] uppercase cursor-pointer select-none"
//                 onClick={() => handleSort("name")}
//               >
//                 Specimen <SortIcon field="name" />
//               </th>
//               <th className="py-4 px-4 text-[10px] font-bold tracking-[0.15em] text-[#0D140B] uppercase">
//                 SKU
//               </th>
//               <th
//                 className="py-4 px-4 text-[10px] font-bold tracking-[0.15em] text-[#0D140B] uppercase cursor-pointer select-none"
//                 onClick={() => handleSort("stock")}
//               >
//                 Inventory <SortIcon field="stock" />
//               </th>
//               <th
//                 className="py-4 px-4 text-[10px] font-bold tracking-[0.15em] text-[#0D140B] uppercase cursor-pointer select-none"
//                 onClick={() => handleSort("price")}
//               >
//                 Value <SortIcon field="price" />
//               </th>
//               <th className="py-4 px-4 text-[10px] font-bold tracking-[0.15em] text-[#0D140B] uppercase">
//                 Status
//               </th>
//               <th className="py-4 px-4 text-[10px] font-bold tracking-[0.15em] text-[#0D140B] uppercase text-right">
//                 Actions
//               </th>
//             </tr>
//           </thead>

//           <motion.tbody
//             variants={containerVariants}
//             initial="hidden"
//             animate="visible"
//             className="divide-y divide-[#00C725]/30"
//           >
//             {filtered.length > 0 ? (
//               filtered.map((product) => (
//                 <motion.tr
//                   key={product.id}
//                   variants={itemVariants}
//                   className={`group transition-colors duration-200 ${
//                     selectedIds.has(product.id)
//                       ? "bg-[#00C725]/10"
//                       : "hover:bg-[#00C725]/5"
//                   }`}
//                 >
//                   {/* Checkbox */}
//                   <td className="py-5 px-3">
//                     <input
//                       type="checkbox"
//                       checked={selectedIds.has(product.id)}
//                       onChange={() => toggleOne(product.id)}
//                       className="accent-[#00C725] w-3.5 h-3.5 cursor-pointer"
//                     />
//                   </td>

//                   {/* Specimen */}
//                   <td className="py-5 px-4">
//                     <div className="flex items-center gap-4">
//                       <div className="h-14 w-14 overflow-hidden bg-[#00C725]/20 border border-[#0D140B] shrink-0">
//                         <img
//                           src={product.image}
//                           alt={product.name}
//                           className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
//                         />
//                       </div>
//                       <div>
//                         <p className="text-[15px] font-editorial-serif font-medium text-[#0D140B] group-hover:text-[#1a6b00] transition-colors">
//                           {product.name}
//                         </p>
//                         <p className="text-[12px] text-[#3B5238] mt-0.5">
//                           {product.category}
//                         </p>
//                       </div>
//                     </div>
//                   </td>

//                   {/* SKU */}
//                   <td className="py-5 px-4 font-mono text-[11px] text-[#3B5238] tracking-wider">
//                     {product.sku}
//                   </td>

//                   {/* Inventory */}
//                   <td className="py-5 px-4">
//                     {product.stock === 0 ? (
//                       <span className="flex items-center gap-1.5 text-red-600 text-[13px] font-medium">
//                         <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
//                         Out of stock
//                       </span>
//                     ) : product.stock <= 10 ? (
//                       <span className="flex items-center gap-1.5 text-amber-700 text-[13px] font-medium">
//                         <AlertTriangle size={13} className="text-amber-500" />
//                         {product.stock} left
//                       </span>
//                     ) : (
//                       <span className="flex items-center gap-1.5 text-[#0D140B] text-[13px] font-medium">
//                         <span className="w-1.5 h-1.5 rounded-full bg-[#00C725] inline-block" />
//                         {product.stock}{" "}
//                         <span className="text-[#3B5238] font-normal text-[11px]">
//                           in stock
//                         </span>
//                       </span>
//                     )}
//                   </td>

//                   {/* Price */}
//                   <td className="py-5 px-4 font-editorial-serif text-[15px] font-medium text-[#0D140B]">
//                     {product.price}
//                   </td>

//                   {/* Status */}
//                   <td className="py-5 px-4">
//                     <span
//                       className={`inline-flex items-center px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest border ${
//                         STATUS_STYLES[product.status]
//                       }`}
//                     >
//                       {STATUS_LABELS[product.status]}
//                     </span>
//                   </td>

//                   {/* Actions */}
//                   <td className="py-5 px-4 text-right relative" onClick={(e) => e.stopPropagation()}>
//                     <button
//                       onClick={() =>
//                         setActiveMenu(
//                           activeMenu === product.id ? null : product.id
//                         )
//                       }
//                       className="p-2 text-[#3B5238] hover:text-[#0D140B] hover:bg-[#00C725]/30 rounded-full transition-colors"
//                     >
//                       <MoreHorizontal size={18} />
//                     </button>

//                     <AnimatePresence>
//                       {activeMenu === product.id && (
//                         <motion.div
//                           initial={{ opacity: 0, scale: 0.95, y: -8 }}
//                           animate={{ opacity: 1, scale: 1, y: 0 }}
//                           exit={{ opacity: 0, scale: 0.95, y: -8 }}
//                           transition={{ duration: 0.15 }}
//                           className="absolute right-8 top-10 w-44 bg-[#F2F0EA] border border-[#0D140B] shadow-[0_10px_40px_rgba(37,66,34,0.12)] z-10 py-1 flex flex-col items-start"
//                         >
//                           <button className="w-full px-4 py-2 text-left text-xs text-[#0D140B] hover:bg-[#00C725]/20 flex items-center gap-2 transition-colors">
//                             <Eye size={13} className="text-[#3B5238]" />
//                             View Details
//                           </button>
//                           <button className="w-full px-4 py-2 text-left text-xs text-[#0D140B] hover:bg-[#00C725]/20 flex items-center gap-2 transition-colors">
//                             <Edit2 size={13} className="text-[#3B5238]" />
//                             Edit Specimen
//                           </button>
//                           <button className="w-full px-4 py-2 text-left text-xs text-[#0D140B] hover:bg-[#00C725]/20 flex items-center gap-2 transition-colors">
//                             <Plus size={13} className="text-[#3B5238]" />
//                             Update Stock
//                           </button>
//                           <div className="w-full h-px bg-[#0D140B]/10 my-1" />
//                           <button className="w-full px-4 py-2 text-left text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors font-medium">
//                             <Trash2 size={13} />
//                             Delete
//                           </button>
//                         </motion.div>
//                       )}
//                     </AnimatePresence>
//                   </td>
//                 </motion.tr>
//               ))
//             ) : (
//               // ── Empty State ──
//               <tr>
//                 <td colSpan={7} className="py-24 text-center">
//                   <motion.div
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     className="flex flex-col items-center gap-4"
//                   >
//                     <div className="p-5 border border-dashed border-[#0D140B] bg-[#F2F0EA] -rotate-2">
//                       <Leaf size={28} className="text-[#3B5238]" />
//                     </div>
//                     <p className="font-editorial-serif text-xl text-[#0D140B]">
//                       No specimens found
//                     </p>
//                     <p className="text-sm text-[#3B5238]">
//                       {searchQuery
//                         ? `No results for "${searchQuery}"`
//                         : `No products in "${activeCategory}"`}
//                     </p>
//                     <button
//                       onClick={() => {
//                         setSearchQuery("");
//                         setActiveCategory("All");
//                       }}
//                       className="mt-2 px-4 py-2 border border-[#0D140B] text-xs font-bold uppercase tracking-widest text-[#0D140B] hover:bg-[#00C725]/20 transition-colors"
//                     >
//                       Clear filters
//                     </button>
//                   </motion.div>
//                 </td>
//               </tr>
//             )}
//           </motion.tbody>
//         </table>
//       </div>

//       {/* ── Pagination ── */}
//       <div className="mt-8 pt-4 border-t border-[#0D140B] flex justify-between items-center text-xs text-[#3B5238]">
//         <p>
//           Showing {filtered.length} of {PRODUCTS.length} specimens
//         </p>
//         <div className="flex gap-2">
//           <button className="px-3 py-1.5 border border-[#0D140B] hover:bg-[#00C725]/20 transition-colors opacity-50 cursor-not-allowed">
//             Previous
//           </button>
//           <button className="px-3 py-1.5 border border-[#0D140B] bg-[#0D140B] text-white">
//             1
//           </button>
//           <button className="px-3 py-1.5 border border-[#0D140B] hover:bg-[#00C725]/20 transition-colors">
//             2
//           </button>
//           <button className="px-3 py-1.5 border border-[#0D140B] hover:bg-[#00C725]/20 transition-colors">
//             3
//           </button>
//           <button className="px-3 py-1.5 border border-[#0D140B] hover:bg-[#00C725]/20 transition-colors">
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
