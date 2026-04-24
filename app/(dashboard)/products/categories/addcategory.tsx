
"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Loader2 } from "lucide-react";

export type Status = "active" | "inactive";

export interface CategoryRef {
  _id: string;
  name: string;
}

export interface NewCategory {
  name: string;
  code: string;
  description: string;
  status: Status;
  type: "main" | "sub";
  parentId?: string;
  image: File | null;
  specimens?: number;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: NewCategory) => Promise<void>;
  onSaveComplete: () => Promise<void>;
  mainCategories: CategoryRef[];
  
  editingData?: Partial<{
    _id: string;
    name: string;
    code: string;
    description: string;
    status: Status;
    parentId: string | null;
  }> | null;
}


const inputBase =
  "w-full bg-transparent border-0 border-b-2 border-[#0D140B] pb-1.5 pt-1 text-[#0D140B] outline-none focus:border-[#00C725] transition-colors placeholder:text-[#3B5238]/50 text-sm";
const labelBase =
  "text-[10px] font-bold uppercase tracking-[0.18em] text-[#3B5238]";


export default function AddFamilyModal({
  isOpen,
  onClose,
  onSave,
  onSaveComplete,
  mainCategories,
  editingData,
}: Props) {
  
  const isEditing = Boolean(editingData?._id);

  const defaultType: "main" | "sub" =
    editingData?.parentId ? "sub" : "main";

  const [type, setType] = useState<"main" | "sub">(defaultType);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<Status>("active");
  const [parentId, setParentId] = useState("");
  const [image, setImage] = useState<File | null>(null);
  // const [subcategories, setSubcategories] = useState<string[]>([""]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [specimens, setSpecimens] = useState<number>(0);

  useEffect(() => {
    if (!isOpen) return;
    setError(null);

    if (editingData) {
      setName(editingData.name || "");
      setCode(editingData.code || "");
      setDescription(editingData.description || "");
      setStatus(editingData.status || "active");
      setImage(null);
      // setSubcategories([""]);

      if (editingData.parentId) {
        setType("sub");
        setParentId(editingData.parentId);
      } else {
        setType("main");
        setParentId("");
      }
    } else {
      resetForm();
    }
  }, [editingData, isOpen]);

  const resetForm = () => {
    setType("main");
    setName("");
    setCode("");
    setDescription("");
    setStatus("active");
    setParentId("");
    setImage(null);
    // setSubcategories([""]);
    setSaving(false);
    setError(null);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const validate = (): string | null => {
    if (!name.trim()) return "Name is required.";
    if (type === "sub" && !parentId)
      return "Please select a parent family.";
    return null;
  };

 
  const handleSave = async () => {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setSaving(true);
    setError(null);

    try {
        await onSave({
          name: name.trim(),
          code,
          description,
          status,
          type,
          parentId: type === "sub" ? parentId : undefined,
          image,
          specimens,
        });
      

      await onSaveComplete();
      handleClose();
    } catch (err: any) {
      console.error("Save error:", err);
      setError(err?.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // const updateGenus = (index: number, value: string) => {
  //   setSubcategories((prev) => {
  //     const updated = [...prev];
  //     updated[index] = value;
  //     return updated;
  //   });
  // };

  // const removeGenus = (index: number) => {
  //   setSubcategories((prev) => prev.filter((_, i) => i !== index));
  // };

  // const addGenus = () => setSubcategories((prev) => [...prev, ""]);

  const modalTitle = isEditing
    ? editingData?.parentId
      ? "Edit Genus"
      : "Edit Family"
    : editingData?.parentId
    ? "Add Genus"
    : "Add Category";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => e.target === e.currentTarget && handleClose()}
        >
         
          <div className="absolute inset-0 bg-[#0D140B]/40 backdrop-blur-[2px]" />

        
          <motion.div
            className="relative z-10 bg-[#F2F0EA] border border-[#0D140B] w-full max-w-xl flex flex-col shadow-[8px_8px_0px_#0D140B] max-h-[90vh]"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            
            <div className="flex items-center justify-between px-8 pt-8 pb-5 border-b border-[#0D140B]/20">
              <div>
                <p className="text-[#00C725] font-mono text-[10px] uppercase tracking-[0.2em] font-semibold mb-1">
                  Storefront Organization
                </p>
                <h2 className="text-2xl font-editorial-serif text-[#0D140B]">{modalTitle}</h2>
              </div>
              <button
                onClick={handleClose}
                className="p-2 border border-[#0D140B] text-[#3B5238] hover:bg-[#00C725]/20 hover:text-[#0D140B] transition-colors"
              >
                <X size={16} />
              </button>
            </div>

           
            <div className="px-8 py-6 space-y-6 overflow-y-auto flex-1">

              
              {error && (
                <div className="bg-red-50 border border-red-300 text-red-700 text-xs px-4 py-2.5 font-medium">
                  {error}
                </div>
              )}

              {!isEditing && !editingData?.parentId && (
                <div className="flex flex-col gap-2">
                  <span className={labelBase}>Category Type</span>
                  <div className="flex border border-[#0D140B] overflow-hidden mt-1">
                    {(["main", "sub"] as const).map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setType(opt)}
                        className={`flex-1 py-2 text-[11px] font-bold uppercase tracking-wider transition-colors ${
                          type === opt
                            ? "bg-[#0D140B] text-[#E3E0D8]"
                            : "bg-transparent text-[#3B5238] hover:text-[#0D140B]"
                        }`}
                      >
                        {opt === "main" ? "Main (Family)" : "Sub (Genus)"}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-1.5">
              <label className={labelBase}>
                {type === "sub" ? "Genus Name" : "Family Name"}
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={type === "sub" ? "e.g. Monstera" : "e.g. Aroids"}
                className={inputBase}
                autoFocus
              />
            </div>

              {type === "sub" && (
                <div className="flex flex-col gap-1.5">
                  <label className={labelBase}>Parent Family</label>
                  <select
                    value={parentId}
                    onChange={(e) => setParentId(e.target.value)}
                    className={`${inputBase} cursor-pointer appearance-none`}
                  >
                    <option value="">Select family…</option>
                    {mainCategories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {type === "sub" && (
              <div className="flex flex-col gap-1.5">
                <label className={labelBase}>Total Items (Specimens)</label>
                <input
                  type="number"
                  value={specimens}
                  onChange={(e) => setSpecimens(Number(e.target.value))}
                  placeholder="e.g. 10"
                  className={inputBase}
                  min={0}
                />
              </div>
            )}

              {/* {type === "sub" && !isEditing && (
                <div className="flex flex-col gap-3">
                  <label className={labelBase}>Genus Names</label>
                  {subcategories.map((sub, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <input
                        value={sub}
                        onChange={(e) => updateGenus(index, e.target.value)}
                        placeholder={`e.g. Monstera`}
                        className={inputBase}
                        autoFocus={index === 0}
                      />
                      {subcategories.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeGenus(index)}
                          className="text-[#e55c5c] hover:text-red-700 transition-colors shrink-0"
                        >
                          <X size={14} />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addGenus}
                    className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-[#00C725] hover:text-[#0D140B] transition-colors mt-1 w-fit"
                  >
                    <Plus size={13} /> Add another genus
                  </button>
                </div>
              )} */}

              {/* Category Code */}
              <div className="flex flex-col gap-1.5">
                <label className={labelBase}>Category Code</label>
                <input
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="e.g. AROID-001"
                  className={`${inputBase} font-mono`}
                />
              </div>
              

              {/* Description */}
              <div className="flex flex-col gap-1.5">
                <label className={labelBase}>Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  placeholder="Describe this category…"
                  className="w-full bg-[#E3E0D8] border border-[#0D140B] p-3 text-sm text-[#0D140B] outline-none focus:border-[#00C725] transition-colors placeholder:text-[#3B5238]/50 resize-none"
                />
              </div>

              {/* Image upload */}
              <div className="flex flex-col gap-1.5">
                <label className={labelBase}>Upload Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files?.[0] || null)}
                  className="text-sm text-[#3B5238] file:mr-3 file:py-1.5 file:px-4 file:border file:border-[#0D140B] file:bg-transparent file:text-xs file:font-bold file:uppercase file:tracking-widest file:text-[#0D140B] hover:file:bg-[#00C725]/20 file:transition-colors file:cursor-pointer"
                />
                {image && (
                  <p className="text-[11px] font-mono text-[#3B5238] mt-1">
                    Selected: {image.name}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <span className={labelBase}>Status</span>
                <div className="flex border border-[#0D140B] overflow-hidden">
                  {(["active", "inactive"] as Status[]).map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setStatus(opt)}
                      className={`flex-1 py-2 text-[11px] font-bold uppercase tracking-wider transition-colors ${
                        status === opt
                          ? opt === "active"
                            ? "bg-[#00C725] text-[#0D140B]"
                            : "bg-[#e55c5c] text-white"
                          : "bg-transparent text-[#3B5238] hover:text-[#0D140B]"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-[#3B5238]">
                  {status === "active"
                    ? "Visible on storefront immediately."
                    : "Hidden from storefront until activated."}
                </p>
              </div>
            </div>

            <div className="px-8 py-5 border-t border-[#0D140B]/20 flex justify-end gap-3">
              <button
                onClick={handleClose}
                className="px-6 py-2.5 text-[#3B5238] text-sm font-bold uppercase tracking-widest hover:text-[#0D140B] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="group relative inline-flex items-center justify-center px-8 py-2.5 bg-[#0D140B] text-[#E3E0D8] overflow-hidden shadow-[4px_4px_0px_#0D140B] hover:shadow-[2px_2px_0px_#0D140B] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-[4px_4px_0px_#0D140B] disabled:hover:translate-x-0 disabled:hover:translate-y-0"
              >
                <div className="absolute inset-0 w-0 bg-[#00C725] transition-all duration-300 ease-out group-hover:w-full" />
                <span className="relative flex items-center gap-2 font-bold text-sm tracking-widest uppercase group-hover:text-[#0D140B] transition-colors duration-300">
                  {saving && <Loader2 size={14} className="animate-spin" />}
                  {saving ? "Saving…" : "Save"}
                </span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}