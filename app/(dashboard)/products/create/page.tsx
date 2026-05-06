
"use client";

import React, { useState, KeyboardEvent, useEffect } from "react";
import { motion } from "framer-motion";
import {
  UploadCloud,
  X,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";


interface FormState {
  commonName: string;
  scientificName: string;
  brand: string;
  sku: string;
  category: string;
  type: string;
  placement: "Indoor" | "Outdoor" | "Both";
  price: string;
  description: string;
  stockQty: string;
  lowStockAlert: string;
  potSize: string;
  plantHeight: string;
  weight: string;
  sunlight: string;
  watering: string;
  difficulty: "Beginner" | "Medium" | "Expert";
  season: string;
  tags: string[];
  featured: boolean;
  bestSeller: boolean;
  newArrival: boolean;
  metaTitle: string;
  urlSlug: string;
  metaDescription: string;
}


interface FieldProps {
  label: string;
  children: React.ReactNode;
}
function Field({ label, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#3B5238]">
        {label}
      </label>
      {children}
    </div>
  );
}

const inputBase =
  "w-full bg-transparent border-0 border-b-2 border-[#0D140B] pb-1.5 pt-1 text-[#0D140B] outline-none focus:border-[#00C725] transition-colors placeholder:text-[#3B5238]/60 px-0";

interface ToggleGroupProps<T extends string> {
  options: T[];
  value: T;
  onChange: (v: T) => void;
}
function ToggleGroup<T extends string>({
  options,
  value,
  onChange,
}: ToggleGroupProps<T>) {
  return (
    <div className="flex border border-[#0D140B] overflow-hidden mt-1.5">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-wider transition-colors ${
            value === opt
              ? "bg-[#0D140B] text-[#E3E0D8]"
              : "bg-transparent text-[#3B5238] hover:text-[#0D140B]"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

interface CareCardProps {
  label: string;
  children: React.ReactNode;
}
function CareCard({ label, children }: CareCardProps) {
  return (
    <div className="border border-[#0D140B] bg-[#F2F0EA] p-3">
      <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#3B5238] mb-2">
        {label}
      </p>
      {children}
    </div>
  );
}

const selectBase =
  "w-full bg-transparent border-0 border-b-[1.5px] border-[#0D140B] pb-1 text-[13px] text-[#0D140B] outline-none appearance-none cursor-pointer focus:border-[#00C725] transition-colors";


export default function CreateProductPage() {
  const router = useRouter();

  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [categories, setCategories] = useState<any[]>([]);
  const [form, setForm] = useState<FormState>({
    commonName: "",
    scientificName: "",
    brand: "",
    sku: "",
    category: "",
    type: "",
    placement: "Indoor",
    price: "",
    description: "",
    stockQty: "",
    lowStockAlert: "",
    potSize: "",
    plantHeight: "",
    weight: "",
    sunlight: "",
    watering: "",
    difficulty: "Beginner",
    season: "",
    tags: ["rare", "air-purifying"],
    featured: true,
    bestSeller: false,
    newArrival: false,
    metaTitle: "",
    urlSlug: "",
    metaDescription: "",
  });

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.length) {
      setFiles((prev) => [...prev, ...Array.from(e.dataTransfer.files)]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setFiles((prev) => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const handleTagKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!form.tags.includes(tagInput.trim())) {
        set("tags", [...form.tags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    set("tags", form.tags.filter((t) => t !== tag));
  };

const handleSubmit = async () => {
  try {
    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => formData.append(key, v));
      } else {
        formData.append(key, value as any);
      }
    });

    files.forEach((file) => {
      formData.append("images", file);
    });

    const res = await fetch("http://localhost:5000/products", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message);

    alert("Product created successfully!");

    router.push("/products/list");

  } catch (err: any) {
    console.error("ERROR:", err.message);
    alert("Failed to create product");
  }
};

useEffect(() => {
  fetch("http://localhost:5000/categories")
    .then((res) => res.json())
    .then((data) => {
      console.log("API RESPONSE:", data);

      if (Array.isArray(data)) {
        setCategories(data);
      } else {
        setCategories([]); // fallback
      }
    })
    .catch((err) => {
      console.error("FETCH ERROR:", err);
      setCategories([]);
    });
}, []);

  return (
    <div className="min-h-full bg-[#E3E0D8] p-8 lg:p-12 font-sans selection:bg-[#00C725] selection:text-[#0D140B]">

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 flex items-center justify-between"
      >
        <Link
          href="/products/list"
          className="group flex items-center gap-2 text-[#3B5238] hover:text-[#0D140B] transition-colors"
        >
          <div className="p-2 border border-[#0D140B] rounded-full group-hover:bg-[#00C725]/20 group-hover:-translate-x-1 transition-all">
            <ArrowLeft size={16} />
          </div>
          <span className="text-sm font-medium tracking-wide">Back to Catalog</span>
        </Link>
        <div className="flex items-center gap-2 text-[#00C725] text-xs uppercase tracking-widest font-bold">
          <CheckCircle2 size={14} /> Auto-saving draft
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col gap-12"
      >

        {/* ── 01 Identity ── */}
        <section className="flex flex-col gap-6">
          <h2 className="text-2xl font-editorial-serif text-[#0D140B] border-b border-[#0D140B]/20 pb-2">
            01. Specimen identity
          </h2>
          <Field label="Common Name">
            <input
              className={`${inputBase} text-xl md:text-2xl font-editorial-serif`}
              placeholder="e.g. Monstera Albo Borsigiana"
              value={form.commonName}
              onChange={(e) => set("commonName", e.target.value)}
            />
          </Field>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Field label="Scientific Name">
              <input
                className={`${inputBase} italic`}
                placeholder="e.g. Monstera deliciosa"
                value={form.scientificName}
                onChange={(e) => set("scientificName", e.target.value)}
              />
            </Field>
            <Field label="Brand / Nursery">
              <input
                className={inputBase}
                placeholder="e.g. Kerala Greens"
                value={form.brand}
                onChange={(e) => set("brand", e.target.value)}
              />
            </Field>
            <Field label="SKU ID">
              <input
                className={`${inputBase} font-mono`}
                placeholder="HT-MON-ALB"
                value={form.sku}
                onChange={(e) => set("sku", e.target.value)}
              />
            </Field>
          </div>
        </section>

        {/* ── 02 Visuals ── */}
        <section className="flex flex-col gap-6">
          <h2 className="text-2xl font-editorial-serif text-[#0D140B] border-b border-[#0D140B]/20 pb-2">
            02. Visuals
          </h2>
          <label
            className={`border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center p-12 lg:p-20 relative overflow-hidden bg-[#fffafa] cursor-pointer ${
              dragActive
                ? "border-[#00C725] bg-[#00C725]/5"
                : "border-[#0D140B] hover:border-[#00C725] hover:bg-[#00C725]/5"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleFileInput}
            />
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#00C725]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#00C725]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="p-4 bg-[#F2F0EA] shadow-sm border border-[#0D140B] -rotate-2 mb-6">
              <UploadCloud size={32} className="text-[#00C725] stroke-[1.5px]" />
            </div>
            <p className="font-editorial-serif text-xl text-[#0D140B] mb-2">
              Upload visual profile
            </p>
            <p className="text-xs text-[#3B5238] tracking-wide mb-6">
              Drag and drop high-res imagery, or click to browse
            </p>
            <span className="px-5 py-2 border border-[#0D140B] text-[#0D140B] text-xs font-bold uppercase tracking-widest hover:bg-[#0D140B] hover:text-white transition-colors">
              Select files
            </span>
          </label>

          {files.length > 0 && (
            <div className="flex gap-4 mt-2 overflow-x-auto pb-4">
              {files.map((f, i) => (
                <div
                  key={i}
                  className="relative w-24 h-24 bg-gray-100 border border-[#0D140B] shrink-0 p-1 flex flex-col justify-end"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setFiles((prev) => prev.filter((_, idx) => idx !== i))
                    }
                    className="absolute -top-2 -right-2 bg-red-100 text-red-600 rounded-full p-1 border border-white shadow-sm hover:scale-110 transition-transform"
                  >
                    <X size={12} />
                  </button>
                  <p className="text-[9px] font-mono truncate text-[#3B5238] bg-[#F2F0EA]/80 p-1">
                    {f.name}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ── 03 Classification & Economics ── */}
        <section className="flex flex-col gap-6">
          <h2 className="text-2xl font-editorial-serif text-[#0D140B] border-b border-[#0D140B]/20 pb-2">
            03. Classification & economics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Field label="Category">
              {/* <select
                className={`${inputBase} text-base cursor-pointer`}
                value={form.category}
                onChange={(e) => set("category", e.target.value)}
              >
                <option value="" disabled>Select taxonomy...</option>
                <option>Rare Aroids</option>
                <option>Interior Trees</option>
                <option>Foliage Plants</option>
                <option>Succulents & Cacti</option>
                <option>Flowering Plants</option>
              </select> */}

              <select
              className={`${inputBase} text-base cursor-pointer`}
              value={form.category}
              onChange={(e) => set("category", e.target.value)}
            >
              <option value="">Select category...</option>

              {Array.isArray(categories) &&
                categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
              ))}

                    {/* {cat.children?.map((sub: any) => (
                      <option key={sub._id} value={sub._id}>
                        └ {sub.name}
                      </option>
                    ))} */}
                  
            </select>
            </Field>
            <Field label="Type">
              <select
                className={`${inputBase} text-base cursor-pointer`}
                value={form.type}
                onChange={(e) => set("type", e.target.value)}
              >
                <option value="" disabled>Select class...</option>
                <option>Variegated</option>
                <option>Flowering</option>
                <option>Succulent</option>
                <option>Air Plant</option>
              </select>
            </Field>
            <Field label="Placement">
              <ToggleGroup
                options={["Indoor", "Outdoor", "Both"] as const}
                value={form.placement}
                onChange={(v) => set("placement", v)}
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Field label="Price (₹)">
              <input
                className={`${inputBase} text-xl font-editorial-serif`}
                type="number"
                placeholder="12500"
                value={form.price}
                onChange={(e) => set("price", e.target.value)}
              />
            </Field>
            
          </div>

          <Field label="Detailed Description">
            <textarea
              rows={4}
              placeholder="Describe the specimen's unique characteristics, care requirements, and historical background..."
              className="w-full bg-[#F2F0EA] border border-[#0D140B] p-4 text-base text-[#0D140B] focus:ring-0 focus:outline-none focus:border-[#00C725] transition-colors placeholder:text-[#3B5238]/60 resize-none shadow-inner mt-1"
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
            />
          </Field>
        </section>

        {/* ── 04 Inventory & Logistics ── */}
        <section className="flex flex-col gap-6">
          <h2 className="text-2xl font-editorial-serif text-[#0D140B] border-b border-[#0D140B]/20 pb-2">
            04. Inventory & logistics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Field label="Stock Quantity">
              <input
                className={`${inputBase} font-mono`}
                type="number"
                placeholder="0"
                value={form.stockQty}
                onChange={(e) => set("stockQty", e.target.value)}
              />
            </Field>
            <Field label="Low Stock Alert">
              <input
                className={`${inputBase} font-mono`}
                type="number"
                placeholder="5"
                value={form.lowStockAlert}
                onChange={(e) => set("lowStockAlert", e.target.value)}
              />
            </Field>
  
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Field label="Pot Size (cm)">
              <input
                className={inputBase}
                placeholder="e.g. 15 cm"
                value={form.potSize}
                onChange={(e) => set("potSize", e.target.value)}
              />
            </Field>
            <Field label="Plant Height (cm)">
              <input
                className={inputBase}
                placeholder="e.g. 40–60 cm"
                value={form.plantHeight}
                onChange={(e) => set("plantHeight", e.target.value)}
              />
            </Field>
            <Field label="Weight (kg)">
              <input
                className={`${inputBase} font-mono`}
                type="number"
                placeholder="1.2"
                value={form.weight}
                onChange={(e) => set("weight", e.target.value)}
              />
            </Field>
          </div>
        </section>

        {/* ── 05 Plant Care Info ── */}
        <section className="flex flex-col gap-6">
          <h2 className="text-2xl font-editorial-serif text-[#0D140B] border-b border-[#0D140B]/20 pb-2">
            05. Plant care info
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <CareCard label="Sunlight">
              <select
                className={selectBase}
                value={form.sunlight}
                onChange={(e) => set("sunlight", e.target.value)}
              >
                <option value="" disabled>Select...</option>
                <option>Full Sun</option>
                <option>Bright Indirect</option>
                <option>Low Light</option>
                <option>Shade</option>
              </select>
            </CareCard>
            <CareCard label="Watering">
              <select
                className={selectBase}
                value={form.watering}
                onChange={(e) => set("watering", e.target.value)}
              >
                <option value="" disabled>Select...</option>
                <option>Daily</option>
                <option>Every 2–3 days</option>
                <option>Weekly</option>
                <option>Fortnightly</option>
              </select>
            </CareCard>
            <CareCard label="Difficulty">
              <ToggleGroup
                options={["Beginner", "Medium", "Expert"] as const}
                value={form.difficulty}
                onChange={(v) => set("difficulty", v)}
              />
            </CareCard>
            <CareCard label="Season">
              <select
                className={selectBase}
                value={form.season}
                onChange={(e) => set("season", e.target.value)}
              >
                <option value="" disabled>Select...</option>
                <option>Year Round</option>
                <option>Monsoon Special</option>
                <option>Summer</option>
                <option>Winter</option>
              </select>
            </CareCard>
      
          </div>
        </section>

        {/* ── 06 Tags & Visibility ── */}
        <section className="flex flex-col gap-6">
          <h2 className="text-2xl font-editorial-serif text-[#0D140B] border-b border-[#0D140B]/20 pb-2">
            06. Tags & visibility
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Field label="Tags">
              <div className="flex flex-wrap gap-1.5 border-b-2 border-[#0D140B] pb-1.5 min-h-[36px] items-center mt-1">
                {form.tags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1 bg-[#0D140B] text-[#E3E0D8] text-[11px] px-2 py-0.5 tracking-wide"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="opacity-60 hover:opacity-100 text-xs leading-none"
                    >
                      ✕
                    </button>
                  </span>
                ))}
                <input
                  className="bg-transparent border-none outline-none text-sm text-[#0D140B] placeholder:text-[#3B5238]/60 min-w-[80px] flex-1"
                  placeholder="Add tag, press Enter..."
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                />
              </div>
              <p className="text-[11px] text-[#3B5238] mt-1">
                Press Enter to add a tag
              </p>
            </Field>

            <Field label="Listing Flags">
              <div className="flex flex-col gap-2.5 mt-2">
                {(
                  [
                    ["featured", "Featured listing"],
                    ["bestSeller", "Best Seller badge"],
                    ["newArrival", "New Arrival badge"],
                  ] as [keyof FormState, string][]
                ).map(([key, label]) => (
                  <label
                    key={key}
                    className="flex items-center gap-2 cursor-pointer text-sm text-[#0D140B]"
                  >
                    <input
                      type="checkbox"
                      className="accent-[#00C725] w-3.5 h-3.5"
                      checked={form[key] as boolean}
                      onChange={(e) => set(key, e.target.checked as any)}
                    />
                    {label}
                  </label>
                ))}
              </div>
            </Field>
          </div>
        </section>

        {/* ── 07 SEO & Discovery ── */}
        <section className="flex flex-col gap-6">
          <h2 className="text-2xl font-editorial-serif text-[#0D140B] border-b border-[#0D140B]/20 pb-2">
            07. SEO & discovery
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Field label="Meta Title">
              <input
                className={inputBase}
                placeholder="e.g. Buy Monstera Albo Borsigiana Online"
                value={form.metaTitle}
                onChange={(e) => set("metaTitle", e.target.value)}
              />
              <p className="text-[11px] text-[#3B5238] mt-1 flex justify-between">
                <span>Appears in browser tab & search results</span>
                <span className={form.metaTitle.length > 60 ? "text-[#e55c5c]" : "text-[#3B5238]"}>
                  {form.metaTitle.length}/60
                </span>
              </p>
            </Field>

            <Field label="URL Slug">
              <div className="flex items-center gap-1 border-b-2 border-[#0D140B] focus-within:border-[#00C725] transition-colors pb-1.5 pt-1">
                <span className="text-[#3B5238]/60 text-sm shrink-0 font-mono">/shop/</span>
                <input
                  className="bg-transparent border-none outline-none text-sm text-[#0D140B] font-mono flex-1 placeholder:text-[#3B5238]/60"
                  placeholder="monstera-albo-borsigiana"
                  value={form.urlSlug}
                  onChange={(e) =>
                    set(
                      "urlSlug",
                      e.target.value
                        .toLowerCase()
                        .replace(/\s+/g, "-")
                        .replace(/[^a-z0-9-]/g, "")
                    )
                  }
                />
              </div>
              <p className="text-[11px] text-[#3B5238] mt-1">
                Only lowercase letters, numbers and hyphens
              </p>
            </Field>
          </div>

          <Field label="Meta Description">
            <textarea
              rows={3}
              placeholder="A rare variegated Monstera featuring dramatic white and green foliage. Perfect for collectors..."
              className="w-full bg-[#F2F0EA] border border-[#0D140B] p-4 text-sm text-[#0D140B]
                        focus:ring-0 focus:outline-none focus:border-[#00C725] transition-colors
                        placeholder:text-[#3B5238]/60 resize-none shadow-inner mt-1"
              value={form.metaDescription}
              onChange={(e) => set("metaDescription", e.target.value)}
            />
            <p className="text-[11px] text-[#3B5238] mt-1 flex justify-between">
              <span>Shown below the title in Google search results</span>
              <span className={form.metaDescription.length > 160 ? "text-[#e55c5c]" : "text-[#3B5238]"}>
                {form.metaDescription.length}/160
              </span>
            </p>
          </Field>

          {/* Live search preview */}
          {(form.metaTitle || form.metaDescription) && (
            <div className="border border-[#0D140B] bg-[#F2F0EA] p-5">
              <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#3B5238] mb-3">
                Search Preview
              </p>
              <div className="space-y-0.5">
                <p className="text-[#1a73e8] text-base hover:underline cursor-pointer font-medium truncate">
                  {form.metaTitle || form.commonName || "Page title"}
                </p>
                <p className="text-[#006621] text-xs font-mono">
                  yoursite.com/shop/{form.urlSlug || "url-slug"}
                </p>
                <p className="text-[#3B5238] text-sm leading-relaxed line-clamp-2">
                  {form.metaDescription || "Meta description will appear here…"}
                </p>
              </div>
            </div>
          )}

          {/* Auto-fill helper */}
          <button
            type="button"
            onClick={() => {
              if (form.commonName && !form.metaTitle) {
                set("metaTitle", `Buy ${form.commonName} Online | Rare Botanical`);
              }
              if (form.commonName && !form.urlSlug) {
                set(
                  "urlSlug",
                  form.commonName.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")
                );
              }
              if (form.description && !form.metaDescription) {
                set("metaDescription", form.description.slice(0, 155) + (form.description.length > 155 ? "…" : ""));
              }
            }}
            className="self-start text-[11px] font-bold uppercase tracking-widest text-[#00C725]
                      hover:text-[#0D140B] transition-colors flex items-center gap-1.5"
          >
            ↺ Auto-fill from specimen details
          </button>
        </section>

        {/* ── Footer ── */}
        <div className="pt-8 border-t border-[#0D140B] flex justify-end gap-4 mt-4">
          <button  onClick={handleSubmit}
            type="button"
            className="px-6 py-3 text-[#3B5238] text-sm font-bold uppercase tracking-widest hover:text-[#0D140B] transition-colors"
          >
            Save Draft
          </button>
          <button onClick={handleSubmit}
            type="button"
            className="group relative inline-flex items-center justify-center px-10 py-3 bg-[#0D140B] text-[#E3E0D8] overflow-hidden shadow-[4px_4px_0px_#0D140B] hover:shadow-[2px_2px_0px_#0D140B] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-300"
          >
            <div className="absolute inset-0 w-0 bg-[#00C725] transition-all duration-300 ease-out group-hover:w-full" />
            <span className="relative font-bold text-sm tracking-widest uppercase">
              Publish Specimen
            </span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}