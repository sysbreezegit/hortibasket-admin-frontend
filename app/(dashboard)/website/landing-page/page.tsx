"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Image as ImageIcon, Link as LinkIcon, Type, X, UploadCloud, Grid, CheckCircle2, Trash2, Leaf, Video, Save, ChevronRight } from "lucide-react";

// Mock available products
const AVAILABLE_PRODUCTS = [
  { id: "PRD-1", name: "Monstera Albo", category: "Aroids", sku: "HT-MON", price: "₹12,500", image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&q=80&w=400&h=500" },
  { id: "PRD-2", name: "Ficus Lyrata", category: "Trees", sku: "HT-FIC", price: "₹1,850", image: "https://images.unsplash.com/photo-1600411833196-7c0f28db0c0a?auto=format&fit=crop&q=80&w=400&h=500" },
  { id: "PRD-3", name: "Calathea Orb", category: "Foliage", sku: "HT-CAL", price: "₹950", image: "https://images.unsplash.com/photo-1620127807580-128a1ccaa2b2?auto=format&fit=crop&q=80&w=400&h=500" },
  { id: "PRD-4", name: "Strelitzia", category: "Trees", sku: "HT-STR", price: "₹3,100", image: "https://images.unsplash.com/photo-1602058428580-c0678f566494?auto=format&fit=crop&q=80&w=400&h=500" },
];

export default function LandingPageBuilder() {
  const [activeTab, setActiveTab] = useState<"gallery" | "productCards" | "highlights">("productCards");
  
  // Tab 1: Gallery
  const [galleryItems, setGalleryItems] = useState([
    { id: "g1", image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=800&q=80", title: "Rare Variegation", link: "/category/rare" }
  ]);

  // Tab 2: Product Cards
  const [productCards, setProductCards] = useState([
    { id: "h1", title: "Trending Outdoor Beauties", products: [AVAILABLE_PRODUCTS[0], AVAILABLE_PRODUCTS[3]] }
  ]);
  const [isAddingProductCard, setIsAddingProductCard] = useState(false);
  const [newProductCardTitle, setNewProductCardTitle] = useState("");
  const [selectedProductsForCard, setSelectedProductsForCard] = useState<string[]>([]);

  // Tab 3: Highlights
  const [mediaHighlights, setMediaHighlights] = useState([
    { id: "m1", media: "https://images.unsplash.com/photo-1620127807580-128a1ccaa2b2?w=800&q=80", type: "image", title: "Daily Calathea Care", productId: "PRD-3" }
  ]);

  // Handlers
  const addGalleryItem = () => { if (galleryItems.length < 5) setGalleryItems([{ id: Math.random().toString(), image: null, title: "", link: "" }, ...galleryItems]); };
  const removeGalleryItem = (id: string) => setGalleryItems(galleryItems.filter(item => item.id !== id));

  const saveNewProductCard = () => {
    if (!newProductCardTitle || selectedProductsForCard.length === 0) return;
    const selected = AVAILABLE_PRODUCTS.filter(p => selectedProductsForCard.includes(p.id));
    setProductCards([{ id: Math.random().toString(), title: newProductCardTitle, products: selected }, ...productCards]);
    setIsAddingProductCard(false);
    setNewProductCardTitle("");
    setSelectedProductsForCard([]);
  };

  const addMediaHighlight = () => {
    setMediaHighlights([{ id: Math.random().toString(), media: null, type: 'image', title: "", productId: "" }, ...mediaHighlights]);
  };
  const updateMediaHighlight = (id: string, field: string, value: any) => {
    setMediaHighlights(mediaHighlights.map(h => h.id === id ? { ...h, [field]: value } : h));
  };
  const removeMediaHighlight = (id: string) => setMediaHighlights(mediaHighlights.filter(h => h.id !== id));

  return (
    <div className="min-h-full bg-[#fcfdfa] p-8 lg:p-12 font-sans selection:bg-[#cae4c5] selection:text-[#254222] pb-32 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
        <p className="text-[#82B34B] font-mono text-xs uppercase tracking-[0.2em] mb-2 font-semibold">Website Management</p>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-editorial-serif text-[#254222] tracking-tight leading-tight">Storefront Architecture</h1>
            <p className="text-[#4F684C] mt-2 text-sm md:text-base max-w-xl">
              A refined workspace to configure landing galleries, curate product collections, and manage story highlights.
            </p>
          </div>
          <button className="group relative inline-flex items-center justify-center px-8 py-3 bg-[#254222] text-[#fcfdfa] overflow-hidden rounded-none shadow-[4px_4px_0px_#cae4c5] hover:shadow-[2px_2px_0px_#cae4c5] transition-all duration-300">
            <div className="absolute inset-0 w-0 bg-[#82B34B] transition-all duration-300 ease-out group-hover:w-full"></div>
            <span className="relative flex items-center gap-2 font-bold tracking-widest text-[11px] uppercase">
              <CheckCircle2 size={16} strokeWidth={2.5} /> Publish Structure
            </span>
          </button>
        </div>
      </motion.div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-[#cae4c5]/60 mb-10 overflow-x-auto no-scrollbar gap-8">
        {[
          { id: "gallery", label: "01. Hero Banners" },
          { id: "productCards", label: "02. Product Cards" },
          { id: "highlights", label: "03. Story Highlights" }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`pb-4 text-sm font-bold uppercase tracking-widest relative whitespace-nowrap transition-colors duration-300 ${
              activeTab === tab.id ? "text-[#254222]" : "text-[#4F684C]/50 hover:text-[#4F684C]"
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div layoutId="tabIndicator" className="absolute bottom-0 left-0 right-0 h-px bg-[#254222]" />
            )}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        
        {/* =======================================
            TAB 1: GALLERY EDITOR (Minimal List Focus)
            ======================================= */}
        {activeTab === "gallery" && (
          <motion.div key="gallery" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-editorial-serif text-[#254222]">Primary Carousel ({galleryItems.length}/5)</h2>
              {galleryItems.length < 5 && (
                <button onClick={addGalleryItem} className="text-[11px] uppercase tracking-widest font-bold text-[#82B34B] hover:text-[#254222] flex items-center gap-1">
                  <Plus size={14} /> Add Slide
                </button>
              )}
            </div>

            <div className="space-y-4">
              {galleryItems.map((item, index) => (
                <div key={item.id} className="bg-white border border-[#cae4c5]/40 flex items-center p-4 gap-6 hover:border-[#cae4c5] transition-colors relative group">
                  <span className="text-[10px] font-mono text-[#cae4c5] font-bold">0{index + 1}</span>
                  
                  {/* Chic Thumbnail Upload */}
                  <div className="w-20 h-20 bg-[#fcfdfa] border border-[#cae4c5]/50 flex items-center justify-center overflow-hidden shrink-0 relative group-hover:border-[#82B34B] transition-colors cursor-pointer">
                     {item.image ? (
                        <img src={item.image} alt="Banner" className="w-full h-full object-cover" />
                     ) : (
                        <UploadCloud className="text-[#4F684C]/50" size={20} />
                     )}
                     <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <span className="text-[9px] uppercase tracking-widest font-bold text-white">Upload</span>
                     </div>
                  </div>

                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-[9px] uppercase tracking-widest text-[#4F684C] font-semibold mb-1">Slide Title</label>
                      <input type="text" value={item.title} onChange={e => {
                        const items = [...galleryItems]; items[index].title = e.target.value; setGalleryItems(items);
                      }} placeholder="e.g. New Arrivals" className="w-full bg-transparent border-0 border-b border-[#cae4c5]/40 focus:border-[#82B34B] text-lg font-editorial-serif text-[#254222] px-0 py-1 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-[9px] uppercase tracking-widest text-[#4F684C] font-semibold mb-1">Destination link</label>
                      <input type="text" value={item.link} onChange={e => {
                        const items = [...galleryItems]; items[index].link = e.target.value; setGalleryItems(items);
                      }} placeholder="/store" className="w-full bg-transparent border-0 border-b border-[#cae4c5]/40 focus:border-[#82B34B] text-sm font-mono text-[#254222] px-0 py-1.5 transition-colors" />
                    </div>
                  </div>

                  <button onClick={() => removeGalleryItem(item.id)} className="text-[#cae4c5] hover:text-[#e55c5c] p-2 shrink-0">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* =======================================
            TAB 2: PRODUCT CARDS (Compact Editorial)
            ======================================= */}
        {activeTab === "productCards" && (
          <motion.div key="productCards" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-10">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-editorial-serif text-[#254222]">Horizontal Collections</h2>
                <p className="text-[11px] uppercase tracking-widest text-[#4F684C] mt-1">Design specimen carousels for the storefront.</p>
              </div>
              <button 
                onClick={() => setIsAddingProductCard(!isAddingProductCard)}
                className="group flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#fcfdfa] bg-[#254222] px-5 py-2 hover:bg-[#82B34B] transition-colors shadow-sm"
              >
                {isAddingProductCard ? <X size={14} /> : <Plus size={14} />} 
                {isAddingProductCard ? "Cancel" : "Build Collection"}
              </button>
            </div>

            {/* Compact Builder Row */}
            <AnimatePresence>
              {isAddingProductCard && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <div className="bg-white border border-[#254222] p-6 lg:p-8 flex flex-col lg:flex-row gap-8 items-start shadow-[0_5px_15px_rgba(37,66,34,0.05)]">
                    <div className="flex-1 w-full space-y-6">
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest font-bold text-[#4F684C] mb-2">Collection Header</label>
                        <input type="text" value={newProductCardTitle} onChange={e => setNewProductCardTitle(e.target.value)} placeholder="e.g. Rare Specimens" className="w-full bg-transparent border-0 border-b border-[#cae4c5] text-2xl font-editorial-serif text-[#254222] focus:ring-0 focus:border-[#82B34B] px-0 pb-2 transition-colors" />
                      </div>
                      
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest font-bold text-[#4F684C] mb-3">Include Specimens</label>
                        <div className="flex flex-wrap gap-2">
                          {AVAILABLE_PRODUCTS.map(p => {
                            const isSelected = selectedProductsForCard.includes(p.id);
                            return (
                              <button key={p.id} onClick={() => toggleProductSelection(p.id)} className={`px-4 py-1.5 text-xs font-medium font-sans border transition-all rounded-full flex items-center gap-2 ${isSelected ? "border-[#254222] bg-[#254222] text-white" : "border-[#cae4c5] bg-[#fcfdfa] text-[#4F684C] hover:border-[#82B34B] hover:text-[#254222]"}`}>
                                {p.name} {isSelected && <CheckCircle2 size={12} />}
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                    
                    <div className="shrink-0 flex items-end lg:pt-14">
                       <button onClick={saveNewProductCard} disabled={!newProductCardTitle || selectedProductsForCard.length === 0} className="flex items-center gap-2 bg-[#82B34B] text-white px-6 py-3 font-bold uppercase text-[10px] tracking-widest disabled:opacity-50 transition-colors hover:bg-[#254222]">
                         <Save size={14} /> Finalize Collection
                       </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Rendered Existing List: Clean and minimal */}
            <div className="space-y-4 pt-4">
              {productCards.length === 0 ? (
                 <div className="text-center py-16 border-t border-[#cae4c5]/40 text-[#4F684C] text-[11px] uppercase tracking-widest">
                   No collections exist yet.
                 </div>
              ) : (
                productCards.map((card, i) => (
                  <div key={card.id} className="group bg-white border border-[#cae4c5]/60 hover:border-[#cae4c5] transition-all p-5 flex flex-col md:flex-row md:items-center justify-between gap-6">
                     <div className="flex items-center gap-6">
                        <span className="text-[10px] font-mono text-[#cae4c5] font-bold">0{i+1}</span>
                        <div>
                          <h3 className="text-xl font-editorial-serif text-[#254222] mb-1">{card.title}</h3>
                          <p className="text-[10px] font-mono uppercase tracking-widest text-[#4F684C]">{card.products.length} Specimens Listed</p>
                        </div>
                     </div>
                     
                     <div className="flex items-center gap-6">
                        {/* Avatar stack for products */}
                        <div className="flex -space-x-3">
                           {card.products.slice(0, 4).map((p, idx) => (
                             <img key={p.id} src={p.image} className="w-10 h-10 object-cover border-2 border-white bg-[#fcfdfa] shadow-sm" style={{ zIndex: 10 - idx }} alt={p.name} />
                           ))}
                           {card.products.length > 4 && (
                             <div className="w-10 h-10 border-2 border-white bg-[#fcfdfa] text-[#254222] text-[9px] font-bold flex items-center justify-center font-mono shadow-sm z-0">
                               +{card.products.length - 4}
                             </div>
                           )}
                        </div>
                        <button onClick={() => setProductCards(productCards.filter(c => c.id !== card.id))} className="text-[#cae4c5] hover:text-[#e55c5c] transition-colors p-2">
                          <Trash2 size={16} />
                        </button>
                     </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}

        {/* =======================================
            TAB 3: STORY HIGHLIGHTS (Compact Grid/List)
            ======================================= */}
        {activeTab === "highlights" && (
          <motion.div key="highlights" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
            <div className="flex items-center justify-between mb-4">
               <div>
                  <h2 className="text-xl font-editorial-serif text-[#254222]">Dynamic Story Highlights</h2>
                  <p className="text-[11px] uppercase tracking-widest text-[#4F684C] mt-1">Short vertical media linked to specific inventory.</p>
               </div>
               <button onClick={addMediaHighlight} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#82B34B] hover:text-[#254222] transition-colors">
                  <Plus size={14} /> Add Story
               </button>
            </div>

            <div className="space-y-4">
              {mediaHighlights.length === 0 ? (
                 <div className="text-center py-16 border-t border-[#cae4c5]/40 text-[#4F684C] text-[11px] uppercase tracking-widest">
                   No stories uploaded yet.
                 </div>
              ) : (
                mediaHighlights.map((hl, i) => (
                  <div key={hl.id} className="bg-white border border-[#cae4c5]/60 flex flex-col md:flex-row p-4 gap-6 items-center hover:border-[#cae4c5] transition-colors group">
                    <span className="text-[10px] font-mono text-[#cae4c5] font-bold hidden md:block">0{i+1}</span>
                    
                    {/* Tiny Portrait Thumbnail */}
                    <div className="w-16 h-24 bg-[#fcfdfa] border border-[#cae4c5]/50 flex items-center justify-center overflow-hidden shrink-0 relative cursor-pointer group-hover:border-[#82B34B] transition-colors">
                       {hl.media ? (
                         <img src={hl.media} className="w-full h-full object-cover" alt="Story" />
                       ) : (
                         <Video className="text-[#4F684C]/40" size={16} />
                       )}
                       <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity">
                          <UploadCloud size={14} className="text-white mb-1" />
                       </div>
                    </div>

                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                       <div>
                          <label className="block text-[9px] uppercase tracking-widest text-[#4F684C] font-semibold mb-1">Story Overlay Text</label>
                          <input type="text" value={hl.title} onChange={e => updateMediaHighlight(hl.id, "title", e.target.value)} placeholder="e.g. See how it grows..." className="w-full bg-transparent border-0 border-b border-[#cae4c5]/40 focus:border-[#82B34B] text-base font-editorial-serif text-[#254222] px-0 py-1 transition-colors" />
                       </div>
                       
                       <div>
                          <label className="block text-[9px] uppercase tracking-widest text-[#4F684C] font-semibold mb-1">Redirect Target (Product)</label>
                          <select value={hl.productId} onChange={e => updateMediaHighlight(hl.id, "productId", e.target.value)} className="w-full bg-transparent border-0 border-b border-[#cae4c5]/40 focus:border-[#82B34B] text-sm font-mono text-[#254222] px-0 py-1.5 transition-colors cursor-pointer appearance-none">
                             <option value="" disabled>Select a specimen...</option>
                             {AVAILABLE_PRODUCTS.map(p => (
                               <option key={p.id} value={p.id}>{p.sku} — {p.name}</option>
                             ))}
                          </select>
                       </div>
                    </div>

                    <button onClick={() => removeMediaHighlight(hl.id)} className="text-[#cae4c5] hover:text-[#e55c5c] transition-colors p-2 shrink-0 self-start md:self-center">
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
