
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Plus, ChevronRight, Hash, Edit2, Trash2, FolderTree } from "lucide-react";

import { useState, useEffect } from "react";
import axios from "axios";
import AddFamilyModal, { NewCategory } from "./addcategory";

type Category = {
  _id: string;
  name: string;
  parentId?: string | null;
  code?: string;
  description?: string;
  status: "active" | "inactive";
  children?: Category[];
  specimens?: number;
  slug?: string;
};

function StatusBadge({ status }: { status: "active" | "inactive" }) {
  return status === "active" ? (
    <span className="inline-flex items-center px-2.5 py-0.5 text-[11px] font-semibold tracking-wide border rounded-sm bg-green-50 text-green-700 border-green-300">
      Active
    </span>
  ) : (
    <span className="inline-flex items-center px-2.5 py-0.5 text-[11px] font-semibold tracking-wide border rounded-sm bg-red-50 text-red-600 border-red-300">
      Inactive
    </span>
  );
}

export default function CategoryManagementPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editingData, setEditingData] = useState<Partial<Category> | null>(null);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/categories");
      const data = res.data;
      setCategories(Array.isArray(data) ? data : data.categories || data.data || []);
    } catch (err) {
      console.error("fetchCategories error:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const toggleExpand = (id: string) =>
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/categories/${id}`);
      await fetchCategories();
    } catch (error) {
      console.error("handleDelete error:", error);
    }
  };

  const openAddMain = () => {
    setEditingData(null);
    setIsModalOpen(true);
  };

  const openAddSub = (parentId: string) => {
    setEditingData({ parentId });
    setIsModalOpen(true);
  };

  const openEditMain = (category: Category) => {
    setEditingData({
      _id: category._id,
      name: category.name,
      status: category.status,
      code: category.code || "",
      description: category.description || "",
      parentId: null,
    });
    setIsModalOpen(true);
  };

  const openEditSub = (child: Category, parentId: string) => {
    setEditingData({
      _id: child._id,
      name: child.name,
      status: child.status,
      code: child.code || "",
      description: child.description || "",
      parentId, 
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingData(null);
  };

  
  const handleSaveFamily = async (data: NewCategory) => {
    const formData = new FormData();

formData.append("name", data.name);
formData.append("type", data.type === "sub" ? "Sub" : "Main");

if (data.code && data.type === "main") {
  formData.append("categoryCode", data.code);
}

if (data.description) {
  formData.append("description", data.description);
}

if (data.status) {
  formData.append("status", data.status);
}

if (data.parentId) {
  formData.append("parentId", data.parentId);
}

if (data.image) {
  formData.append("image", data.image);
}
    if (editingData?._id) {
      await axios.put(
        `http://localhost:5000/categories/${editingData._id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
    } else {
      await axios.post("http://localhost:5000/categories", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    }
  
  };

  
  const handleSaveComplete = async () => {
    await fetchCategories();
    closeModal();
  };

  return (
    <div className="min-h-full bg-[#E3E0D8] p-8 lg:p-12 font-sans selection:bg-[#00C725] selection:text-[#0D140B]">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6"
      >
        <div>
          <p className="text-[#00C725] font-mono text-xs uppercase tracking-[0.2em] mb-2 font-semibold">
            Storefront Organization
          </p>
          <h1 className="text-4xl md:text-5xl font-editorial-serif text-[#0D140B] tracking-tight leading-tight">
            Taxonomy & Categories
          </h1>
          <p className="text-[#3B5238] mt-2 text-sm md:text-base max-w-xl">
            Build the botanical family tree. Organize specimens into shoppable families and genera.
          </p>
        </div>

        <button
          onClick={openAddMain}
          className="group relative inline-flex items-center justify-center px-6 py-3 bg-[#0D140B] text-[#E3E0D8] overflow-hidden shadow-[4px_4px_0px_#3B5238] hover:shadow-[2px_2px_0px_#3B5238] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-300"
        >
          <div className="absolute inset-0 w-0 bg-[#00C725] transition-all duration-300 ease-out group-hover:w-full" />
          <span className="relative flex items-center gap-2 font-medium text-sm tracking-wide group-hover:text-[#0D140B] transition-colors duration-300">
            <Plus size={16} strokeWidth={2.5} />
            Add Family
          </span>
        </button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="lg:col-span-8 bg-[#F2F0EA] border border-[#0D140B] p-6 md:p-10"
        >
          <div className="flex items-center gap-3 mb-8 border-b border-[#0D140B] pb-4">
            <FolderTree className="text-[#00C725]" size={20} />
            <h2 className="text-xl font-semibold text-[#0D140B]">Botanical Hierarchy</h2>
          </div>

          <div className="space-y-4">
            {categories.length === 0 && (
              <p className="text-sm text-[#3B5238] text-center py-8">
                No categories yet. Click <strong>Add Family</strong> to get started.
              </p>
            )}

            {categories.map((category) => (
              <div key={category._id} className="border border-[#0D140B] bg-[#E3E0D8] overflow-hidden">
                {/* Parent row */}
                <div
                  className="flex items-center justify-between p-4 cursor-pointer hover:bg-[#00C725]/10 transition-colors"
                  onClick={() => toggleExpand(category._id)}
                >
                  <div className="flex items-center gap-4">
                    <motion.div
                      animate={{ rotate: expanded[category._id] ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="w-6 h-6 flex items-center justify-center text-[#3B5238]"
                    >
                      <ChevronRight size={18} />
                    </motion.div>
                    <div>
                      <h3 className="text-base font-semibold text-[#0D140B] leading-none mb-1">
                        {category.name}
                      </h3>
                      <p className="text-[11px] font-mono text-[#00C725]">
                        /{category.slug || category.name.toLowerCase().replace(/\s+/g, "-")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-xs text-[#3B5238] font-medium hidden sm:block">
                      {category.specimens || 0} Specimens
                    </span>
                    <StatusBadge status={category.status} />
                    <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => openEditMain(category)}
                        className="p-2 text-[#3B5238] hover:text-[#0D140B] hover:bg-[#00C725]/30 rounded-full transition-colors"
                        title="Edit Family"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(category._id)}
                        className="p-2 text-[#e55c5c] hover:bg-red-50 rounded-full transition-colors"
                        title="Delete Family"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {expanded[category._id] && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden bg-[#F2F0EA] border-t border-[#0D140B] relative"
                    >
                      <div className="absolute left-7 top-0 bottom-6 w-px bg-[#00C725]" />

                      <div className="pl-14 pr-4 py-2 space-y-1">
                        {(category.children || []).map((child) => (
                          <div
                            key={child._id}
                            className="group flex items-center justify-between py-3 border-b border-[#0D140B]/20 last:border-0 relative"
                          >
                            <div className="absolute -left-7 top-1/2 w-6 h-px bg-[#00C725]" />
                            <div className="flex items-center gap-3">
                              <Hash size={14} className="text-[#00C725]/60" />
                              <span className="text-sm font-medium text-[#3B5238] group-hover:text-[#0D140B] transition-colors">
                                {child.name}
                              </span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-[11px] font-mono text-[#3B5238] bg-[#E3E0D8] border border-[#0D140B] px-2 py-0.5 hidden sm:block">
                                {child.specimens ?? 0} items
                              </span>
                              <StatusBadge status={child.status} />
                              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                  onClick={() => openEditSub(child, category._id)}
                                  className="p-1.5 text-[#3B5238] hover:text-[#0D140B] rounded-full transition-colors"
                                  title="Edit Genus"
                                >
                                  <Edit2 size={12} />
                                </button>
                                <button
                                  onClick={() => handleDelete(child._id)}
                                  className="p-1.5 text-[#e55c5c] hover:bg-red-50 rounded-full transition-colors"
                                  title="Delete Genus"
                                >
                                  <Trash2 size={12} />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}

                        <div className="py-3 relative mt-1">
                          <div className="absolute -left-7 top-1/2 w-6 h-px bg-[#00C725]" />
                          <button
                            onClick={() => openAddSub(category._id)}
                            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#00C725] hover:text-[#0D140B] transition-colors"
                          >
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

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="lg:col-span-4 space-y-6"
        >
          <div className="bg-[#00C725]/10 border border-[#0D140B] p-6 text-[#0D140B]">
            <h3 className="font-semibold text-xl mb-3">Taxonomy Rules</h3>
            <p className="text-sm text-[#3B5238] leading-relaxed mb-4">
              Carefully categorize specimens. A strict hierarchy ensures clients can browse the shop naturally.
            </p>
            <ul className="text-[13px] space-y-3">
              <li className="flex gap-2">
                <span className="text-[#00C725] font-bold">01.</span>
                <span>Families (e.g., Aroids) should encompass broad, recognizable groups.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#00C725] font-bold">02.</span>
                <span>Genera (e.g., Monstera) fall underneath and define specific plant lineages.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#00C725] font-bold">03.</span>
                <span>Set status to Inactive to temporarily hide from the storefront without deleting.</span>
              </li>
            </ul>
          </div>

          <div className="border border-[#0D140B] bg-[#F2F0EA] p-6">
            <h3 className="font-semibold text-[#0D140B] mb-4 text-sm uppercase tracking-widest font-mono">
              Overview
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-[#0D140B]/20">
                <span className="text-sm text-[#3B5238]">Total Families</span>
                <span className="font-mono font-bold text-[#0D140B]">{categories.length}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-[#0D140B]/20">
                <span className="text-sm text-[#3B5238]">Active Families</span>
                <span className="font-mono font-bold text-green-700">
                  {categories.filter((c) => c.status === "active").length}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-[#0D140B]/20">
                <span className="text-sm text-[#3B5238]">Total Genera</span>
                <span className="font-mono font-bold text-[#0D140B]">
                  {categories.reduce((acc, c) => acc + (c.children?.length ?? 0), 0)}
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-[#3B5238]">Total Specimens</span>
                <span className="font-mono font-bold text-[#0D140B]">
                  {categories.reduce((acc, c) => acc + (c.specimens ?? 0), 0)}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <AddFamilyModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSaveFamily}
        onSaveComplete={handleSaveComplete}
        editingData={editingData}
        mainCategories={categories}
      />
    </div>
  );
}
