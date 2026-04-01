"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Store, 
  MapPin, 
  Mail, 
  Phone, 
  Package, 
  TrendingUp, 
  ShieldCheck, 
  Search, 
  ArrowLeft,
  ExternalLink,
  Globe,
  Facebook,
  Instagram,
  Clock,
  MoreVertical,
  Filter,
  ArrowUpRight,
  ChevronRight,
  TrendingDown,
  Building2
} from "lucide-react";

// Expanded Mock Data
const SELLERS = [
  { 
    id: "VND-401", name: "GreenHouse Co.", owner: "David Thompson", email: "contact@greenhouse.co", phone: "+91 9988776655", location: "Pune, MH", status: "Verified", catalogSize: 145, revenue: "₹2,14,000", growth: "+12.4%", joined: "Aug 2023", bio: "Leading supplier of hydroponic succulents and rare tropicals. Focused on sustainable growth through precision agriculture.",
    orders: 342, rank: "Platinum Tier", website: "greenhouse.co"
  },
  { 
    id: "VND-402", name: "Botanical Rare", owner: "Anita Desai", email: "info@botanicalrare.in", phone: "+91 8877665544", location: "Kochi, KL", status: "Verified", catalogSize: 42, revenue: "₹89,500", growth: "+5.2%", joined: "Sep 2023", bio: "Curating rare variegated specimens and unique forest finds for the most discerning plant enthusiasts.",
    orders: 120, rank: "Gold Tier", website: "botanicalrare.in"
  },
  { 
    id: "VND-403", name: "Aroid Central", owner: "Michael Chang", email: "mike@aroidcentral.in", phone: "+91 9001122334", location: "Mumbai, MH", status: "Verified", catalogSize: 18, revenue: "₹4,25,000", growth: "+22.1%", joined: "Oct 2023", bio: "The premier source for high-end Araceae in India. Specializing in rare Philodendrons and Anthuriums.",
    orders: 54, rank: "Boutique Choice", website: "aroidcentral.in"
  },
  { 
    id: "VND-404", name: "Desert Blooms Nursery", owner: "Sarah Jenkins", email: "info@desertblooms.com", phone: "+91 9123456780", location: "Jaipur, RJ", status: "Under Review", catalogSize: 0, revenue: "₹0", growth: "0%", joined: "Today", bio: "Experimental desert flora nursery specializing in drought-tolerant hybrids and rare cacti seeds.",
    orders: 0, rank: "Emerging", website: "desertblooms.com"
  },
  { 
    id: "VND-405", name: "Urban Jungle Supply", owner: "Priya Sharma", email: "priya@urbanjungle.co", phone: "+91 9911223344", location: "Bangalore, KA", status: "Verified", catalogSize: 85, revenue: "₹1,52,000", growth: "+15.8%", joined: "Dec 2023", bio: "Bringing the jungle to modern apartments. High-quality indoor plants and premium potting mixes.",
    orders: 215, rank: "Gold Tier", website: "urbanjungle.co"
  },
  { 
    id: "VND-406", name: "The Orchid Room", owner: "Robert Chen", email: "robert@orchidroom.in", phone: "+91 8822334455", location: "Kalimpong, WB", status: "Verified", catalogSize: 64, revenue: "₹1,12,000", growth: "+8.4%", joined: "Nov 2023", bio: "Ethereal orchids sourced from the Himalayan foothills. Specializing in Vanda and Dendrobium species.",
    orders: 84, rank: "Specialist", website: "orchidroom.in"
  },
  { 
    id: "VND-407", name: "Leafy Logic", owner: "Karan Malhotra", email: "hi@leafylogic.com", phone: "+91 7733445566", location: "Delhi, DL", status: "Suspended", catalogSize: 31, revenue: "₹12,400", growth: "-14.2%", joined: "Jan 2024", bio: "General nursery supplier. Catalog currently under audit for quality compliance issues.",
    orders: 12, rank: "Standard", website: "leafylogic.com"
  },
  { 
    id: "VND-408", name: "Bloom & Bold", owner: "Esha Gupta", email: "contact@bloomnbold.in", phone: "+91 9944556677", location: "Hyderabad, TS", status: "Verified", catalogSize: 22, revenue: "₹45,800", growth: "+2.1%", joined: "Feb 2024", bio: "Luxury flowering plants for high-end events and interior landscaping projects.",
    orders: 38, rank: "Emerging", website: "bloomnbold.in"
  },
];

export default function SellerRegistryPage() {
  const [selectedSellerId, setSelectedSellerId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const activeSeller = SELLERS.find(s => s.id === selectedSellerId);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.04 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  // --- DETAIL VIEW ---
  if (selectedSellerId && activeSeller) {
    return (
      <div className="min-h-full bg-[#E3E0D8] p-6 lg:p-10 font-sans selection:bg-[#00C725] selection:text-[#0D140B]">
        <motion.button 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => setSelectedSellerId(null)}
          className="flex items-center gap-2 text-[#3B5238] hover:text-[#0D140B] text-xs font-mono uppercase tracking-widest mb-10 transition-colors group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Return to All Suppliers
        </motion.button>

        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="lg:col-span-8 flex-1">
               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="relative mb-12"
               >
                 <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-[#00C725] border-r border-[#0D140B] pr-4">Supplier Dossier</span>
                    <span className={`text-[9px] uppercase font-bold tracking-widest px-2 py-0.5 border ${
                        activeSeller.status === 'Verified' ? 'border-[#00C725] text-[#00C725] bg-[#00C725]/5' : 
                        activeSeller.status === 'Suspended' ? 'border-[#e4a11b] text-[#e4a11b] bg-[#e4a11b]/5' :
                        'border-[#3B5238] text-[#3B5238] bg-[#00C725]/10'
                    }`}>
                        {activeSeller.status}
                    </span>
                 </div>
                 <h1 className="text-5xl md:text-7xl font-editorial-serif text-[#0D140B] mb-4 tracking-tighter leading-none">{activeSeller.name}</h1>
                 <p className="text-[#3B5238] text-lg font-editorial-serif italic opacity-70">Headed by {activeSeller.owner}</p>
               </motion.div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                  <div>
                     <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#0D140B] mb-6 border-b border-[#0D140B] pb-2">Business Ethos</h3>
                     <p className="text-lg text-[#0D140B] font-serif leading-relaxed opacity-80">{activeSeller.bio}</p>
                  </div>
                  <div className="bg-[#E3E0D8] border border-[#0D140B] p-8 grid grid-cols-2 gap-8 relative overflow-hidden group">
                     {/* Decorative leaf icon background */}
                     <div className="absolute -bottom-6 -right-6 opacity-5 group-hover:opacity-10 transition-opacity">
                        <TrendingUp size={120} />
                     </div>
                     
                     <div className="relative z-10">
                        <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#3B5238] mb-2 opacity-50">Collective Revenue</h3>
                        <p className="text-3xl font-editorial-serif text-[#0D140B]">{activeSeller.revenue}</p>
                     </div>
                     <div className="relative z-10 text-right">
                        <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#3B5238] mb-2 opacity-50">Monthly Growth</h3>
                        <p className={`text-3xl font-editorial-serif ${activeSeller.growth.startsWith('+') ? 'text-[#00C725]' : 'text-[#e4a11b]'}`}>
                           {activeSeller.growth}
                        </p>
                     </div>
                     <div className="relative z-10 pt-4 border-t border-[#0D140B]">
                        <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#3B5238] mb-2 opacity-50">Catalog Density</h3>
                        <p className="text-3xl font-editorial-serif text-[#0D140B]">{activeSeller.catalogSize} SKUs</p>
                     </div>
                     <div className="relative z-10 pt-4 border-t border-[#0D140B] text-right">
                        <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#3B5238] mb-2 opacity-50">Fulfillment Rank</h3>
                        <p className="text-xl font-editorial-serif text-[#00C725] tracking-widest uppercase">{activeSeller.rank}</p>
                     </div>
                  </div>
               </div>

               <div className="flex flex-col sm:flex-row items-center gap-4">
                  <button className="flex-1 w-full px-8 py-5 bg-[#0D140B] text-white text-[10px] font-bold uppercase tracking-widest hover:bg-[#00C725] transition-all flex items-center justify-center gap-3">
                     <Store size={14} /> View Storefront Portal
                  </button>
                  <button className="flex-1 w-full px-8 py-5 border border-[#0D140B] text-[#0D140B] text-[10px] font-bold uppercase tracking-widest hover:bg-[#00C725]/10 hover:border-[#0D140B] transition-all flex items-center justify-center gap-3">
                     <Mail size={14} /> Direct Inquiry Hub
                  </button>
               </div>
            </div>

            <div className="lg:w-80 space-y-12 shrink-0">
               <div className="bg-[#F2F0EA] border border-[#0D140B] p-8 shadow-[12px_12px_0px_#0D140B] relative group overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                     <ShieldCheck size={100} />
                  </div>
                  <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#3B5238] mb-6">Credential Registry</h3>
                  <div className="space-y-6">
                    <div className="group cursor-pointer">
                       <p className="text-[10px] uppercase font-bold text-[#00C725] mb-1">Storefront URL</p>
                       <p className="text-sm font-mono text-[#0D140B] flex items-center gap-1 group-hover:underline">hb-marketplace.in/{activeSeller.name.toLowerCase().replace(/ /g, '-')}</p>
                    </div>
                    <div>
                       <p className="text-[10px] uppercase font-bold text-[#00C725] mb-1">Official Registry ID</p>
                       <p className="text-sm font-mono text-[#0D140B]">{activeSeller.id}</p>
                    </div>
                    <div>
                       <p className="text-[10px] uppercase font-bold text-[#00C725] mb-1">Social Assets</p>
                       <div className="flex gap-4 mt-3">
                          <Facebook size={16} className="text-[#3B5238] hover:text-[#0D140B] cursor-pointer transition-colors" />
                          <Instagram size={16} className="text-[#3B5238] hover:text-[#0D140B] cursor-pointer transition-colors" />
                          <Globe size={16} className="text-[#3B5238] hover:text-[#0D140B] cursor-pointer transition-colors" />
                       </div>
                    </div>
                  </div>
               </div>

               <div className="pl-6 border-l border-[#0D140B] py-4">
                  <h3 className="text-[10px] uppercase font-mono font-bold tracking-widest text-[#3B5238] mb-4 opacity-50">Primary Contact Gateway</h3>
                  <p className="text-sm text-[#0D140B] font-mono mb-1">{activeSeller.email}</p>
                  <p className="text-sm text-[#0D140B] font-mono">{activeSeller.phone}</p>
                  <p className="text-[10px] uppercase font-bold text-[#00C725] mt-4 flex items-center gap-1">
                    <MapPin size={10} /> {activeSeller.location}
                  </p>
               </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- REGISTRY LIST VIEW ---
  return (
    <div className="min-h-full bg-[#E3E0D8] p-8 lg:p-12 font-sans selection:bg-[#00C725] selection:text-[#0D140B]">
      {/* Editorial Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
        <p className="text-[#00C725] font-mono text-xs uppercase tracking-[0.4em] mb-4 font-bold">
           Hortibasket Official Network
        </p>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
          <div className="flex-1">
            <h1 className="text-5xl md:text-8xl font-editorial-serif text-[#0D140B] tracking-tighter leading-none mb-6">
              Supplier Directory
            </h1>
            <p className="text-[#3B5238] text-lg md:text-xl font-editorial-serif max-w-3xl opacity-70 italic leading-relaxed">
               An overview of the prestigious botanical entities within our ecosystem. Managing global catalog reach and individual merchant performance vectors.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Control Navigation & Filter */}
      <div className="flex flex-col xl:flex-row gap-6 mb-12 items-center justify-between bg-[#F2F0EA] border border-[#0D140B] p-6 shadow-[1px_1px_15px_rgba(37,66,34,0.05)]">
         <div className="relative flex-1 flex items-center gap-4 group w-full xl:w-auto">
            <Search size={18} className="text-[#3B5238] group-focus-within:text-[#00C725] transition-colors" />
            <input 
               type="text" 
               placeholder="Find entity by ID, name, or primary owner..." 
               className="bg-transparent border-0 focus:ring-0 text-sm font-editorial-serif text-[#0D140B] w-full placeholder:text-[#3B5238]/30"
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
            />
         </div>
         <div className="h-4 w-px bg-[#00C725] hidden xl:block"></div>
         <div className="flex flex-wrap gap-8 items-center w-full xl:w-auto justify-end">
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#3B5238] flex items-center gap-8">
               <span className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00C725]"></div> {SELLERS.filter(s => s.status === 'Verified').length} Verified
               </span>
               <span className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00C725]"></div> {SELLERS.filter(s => s.status === 'Under Review').length} Review
               </span>
               <span className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#e4a11b]"></div> {SELLERS.filter(s => s.status === 'Suspended').length} Suspended
               </span>
            </div>
            <button className="text-[10px] font-bold uppercase tracking-widest text-[#0D140B] hover:text-[#00C725] border-l border-[#0D140B] pl-8 transition-colors flex items-center gap-2">
               <Filter size={12} /> Advanced Oversight
            </button>
         </div>
      </div>

      {/* Formal Data Registry Table */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-[#F2F0EA] border border-[#0D140B] shadow-[8px_8px_0px_#0D140B] overflow-hidden"
      >
        <div className="overflow-x-auto whitespace-nowrap">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#0D140B] text-[10px] uppercase tracking-[0.25em] font-mono text-[#0D140B] bg-[#E3E0D8]">
                <th className="p-6 font-bold">Node ID</th>
                <th className="p-6 font-bold">Entity Identity</th>
                <th className="p-6 font-bold">Origin Trace</th>
                <th className="p-6 font-bold text-center">Catalog Reach</th>
                <th className="p-6 font-bold">Rev. MTD</th>
                <th className="p-6 font-bold text-center">Growth Factor</th>
                <th className="p-6 font-bold">Oversight</th>
                <th className="p-6 font-bold text-right">Context</th>
              </tr>
            </thead>
            <tbody>
              {SELLERS.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.id.toLowerCase().includes(searchQuery.toLowerCase())).map((seller, i) => (
                <motion.tr 
                  key={seller.id}
                  variants={itemVariants}
                  onClick={() => setSelectedSellerId(seller.id)}
                  className="border-b border-[#0D140B] hover:bg-[#00C725]/5 transition-all cursor-pointer group"
                >
                  <td className="p-6">
                    <span className="text-[10px] font-mono text-[#3B5238] group-hover:text-[#0D140B] transition-colors">{seller.id}</span>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 bg-[#E3E0D8] border border-[#0D140B] flex items-center justify-center shrink-0 group-hover:bg-[#0D140B] transition-colors duration-500">
                          <Building2 size={16} className="text-[#3B5238] group-hover:text-[#E3E0D8]" />
                       </div>
                       <div>
                          <p className="text-base font-editorial-serif text-[#0D140B] font-semibold tracking-tight">{seller.name}</p>
                          <p className="text-[10px] uppercase font-bold tracking-widest text-[#3B5238] opacity-50">{seller.owner}</p>
                       </div>
                    </div>
                  </td>
                  <td className="p-6">
                     <div className="flex items-center gap-2 text-xs text-[#0D140B] font-mono opacity-80">
                       <MapPin size={12} className="text-[#00C725]" /> {seller.location.split(',')[0]}
                     </div>
                  </td>
                  <td className="p-6 text-center">
                    <span className="text-base font-editorial-serif text-[#0D140B]">{seller.catalogSize}</span>
                  </td>
                  <td className="p-6">
                     <span className="text-sm font-bold text-[#0D140B] font-mono">{seller.revenue}</span>
                  </td>
                  <td className="p-6 text-center">
                     <div className={`inline-flex items-center gap-1 text-[10px] font-bold font-mono ${seller.growth.startsWith('+') ? 'text-[#00C725]' : seller.growth === '0%' ? 'text-[#3B5238]' : 'text-[#e4a11b]'}`}>
                        {seller.growth.startsWith('+') ? <ArrowUpRight size={10} /> : seller.growth === '0%' ? <Clock size={10} /> : <TrendingDown size={10} />}
                        {seller.growth}
                     </div>
                  </td>
                  <td className="p-6">
                     <div className="flex items-center gap-3">
                        <span className={`px-2 py-0.5 border text-[9px] font-bold uppercase tracking-widest ${
                           seller.status === 'Verified' ? 'border-[#00C725] text-[#00C725] bg-[#00C725]/5' : 
                           seller.status === 'Suspended' ? 'border-[#e4a11b] text-[#e4a11b] bg-[#e4a11b]/5' :
                           'border-[#3B5238] text-[#3B5238] bg-[#00C725]/10'
                        }`}>
                           {seller.status}
                        </span>
                     </div>
                  </td>
                  <td className="p-6 text-right">
                    <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 transition-transform">
                       <span className="text-[10px] uppercase font-bold tracking-widest text-[#00C725]">Enter Dossier</span>
                       <ChevronRight size={14} className="text-[#00C725]" />
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Meta Footer */}
      <div className="mt-20 border-t border-[#0D140B] pt-8 flex justify-between items-center text-[10px] font-mono uppercase tracking-[0.4em] text-[#3B5238] opacity-40">
        <span>© Hortibasket Official Supplier Network</span>
        <span className="flex items-center gap-2"><Clock size={12} /> Sync Time: {new Date().toLocaleTimeString()}</span>
      </div>
    </div>
  );
}
