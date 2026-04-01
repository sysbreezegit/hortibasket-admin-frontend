"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  MapPin, 
  Mail, 
  Phone, 
  ShoppingBag, 
  ShieldBan, 
  ArrowLeft,
  Calendar,
  CreditCard,
  History,
  User as UserIcon,
  ChevronRight,
  Filter
} from "lucide-react";

const USERS = [
  { id: "USR-819", name: "Eleanor Vance", email: "el.vance@gmail.com", phone: "+91 9876543210", location: "Mumbai, MH", orders: 12, spent: "₹24,500", joined: "Oct 2023", status: "active", bio: "A dedicated collector of variegated monsteras and rare philodendrons. Frequent buyer from GreenHouse Co." },
  { id: "USR-818", name: "Arthur Pendelton", email: "arthur.p@outlook.com", phone: "+91 8765432109", location: "Delhi, DL", orders: 3, spent: "₹4,200", joined: "Nov 2023", status: "active", bio: "Casual indoor gardener. Primarily interested in low-maintenance succulents." },
  { id: "USR-817", name: "Clara Hughes", email: "clara.botanist@yahoo.com", phone: "+91 7654321098", location: "Bangalore, KA", orders: 8, spent: "₹18,900", joined: "Jan 2024", status: "active", bio: "Professional botanist. Buys rare specimens for research and collection." },
  { id: "USR-816", name: "Marcus Thorne", email: "m.thorne@company.co", phone: "+91 6543210987", location: "Pune, MH", orders: 1, spent: "₹850", joined: "Today", status: "inactive", bio: "New member interested in nursery supplies." },
  { id: "USR-815", name: "Sophie Laurent", email: "s.laurent@gmail.com", phone: "+91 5432109876", location: "Hyderabad, TS", orders: 0, spent: "₹0", joined: "Yesterday", status: "active", bio: "Exploring the marketplace for exotic seeds." }
];

export default function UserManagementPage() {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const activeUser = USERS.find(u => u.id === selectedUserId);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  // --- DETAIL VIEW ---
  if (selectedUserId && activeUser) {
    return (
      <div className="min-h-full bg-[#E3E0D8] p-6 lg:p-10 font-sans selection:bg-[#00C725] selection:text-[#0D140B]">
        <motion.button 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => setSelectedUserId(null)}
          className="flex items-center gap-2 text-[#3B5238] hover:text-[#0D140B] text-xs font-mono uppercase tracking-widest mb-10 transition-colors group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Back to Directory
        </motion.button>

        <div className="max-w-6xl mx-auto">
          <div className="bg-[#F2F0EA] border border-[#0D140B] shadow-[12px_12px_0px_#0D140B] p-8 lg:p-16 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                <UserIcon size={200} />
             </div>

             <div className="relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-8">
                   <div>
                      <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-[#00C725] block mb-2">Marketplace Patron</span>
                      <h1 className="text-5xl md:text-7xl font-editorial-serif text-[#0D140B] leading-none mb-4">{activeUser.name}</h1>
                      <div className="flex items-center gap-4">
                         <span className={`px-3 py-1 text-[10px] uppercase font-bold tracking-widest border ${activeUser.status === 'active' ? 'border-[#00C725] text-[#00C725] bg-[#00C725]/5' : 'border-[#e55c5c] text-[#e55c5c] bg-[#e55c5c]/5'}`}>
                           {activeUser.status}
                         </span>
                         <span className="text-xs font-mono text-[#3B5238] opacity-50">{activeUser.id}</span>
                      </div>
                   </div>
                   
                   <div className="flex gap-4">
                      <button className="px-6 py-3 border border-[#0D140B] text-[#0D140B] text-[10px] font-bold uppercase tracking-widest hover:bg-[#00C725]/10">Edit Profile</button>
                      <button className="px-6 py-3 border border-[#e55c5c] text-[#e55c5c] text-[10px] font-bold uppercase tracking-widest hover:bg-[#e55c5c]/5 flex items-center gap-2">
                        <ShieldBan size={14} /> Suspend Account
                      </button>
                   </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                   <div className="lg:col-span-2 space-y-12">
                      <section>
                         <h3 className="text-xs font-mono uppercase tracking-widest text-[#3B5238] mb-6 font-bold border-b border-[#0D140B] pb-2">Patron Biography</h3>
                         <p className="text-xl font-editorial-serif text-[#0D140B] leading-relaxed opacity-80 italic">
                            "{activeUser.bio}"
                         </p>
                      </section>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
                         <div>
                            <p className="text-[10px] uppercase font-bold text-[#3B5238] opacity-50 mb-2">Lifetime Value</p>
                            <p className="text-2xl font-editorial-serif text-[#0D140B]">{activeUser.spent}</p>
                         </div>
                         <div>
                            <p className="text-[10px] uppercase font-bold text-[#3B5238] opacity-50 mb-2">Order Count</p>
                            <p className="text-2xl font-editorial-serif text-[#0D140B]">{activeUser.orders}</p>
                         </div>
                         <div>
                            <p className="text-[10px] uppercase font-bold text-[#3B5238] opacity-50 mb-2">Member Since</p>
                            <p className="text-2xl font-editorial-serif text-[#0D140B]">{activeUser.joined}</p>
                         </div>
                         <div>
                            <p className="text-[10px] uppercase font-bold text-[#3B5238] opacity-50 mb-2">Loyalty Tier</p>
                            <p className="text-2xl font-editorial-serif text-[#00C725]">Petal+</p>
                         </div>
                      </div>

                      <section>
                         <h3 className="text-xs font-mono uppercase tracking-widest text-[#3B5238] mb-6 font-bold border-b border-[#0D140B] pb-2 flex items-center justify-between">
                            Recent Activity <History size={14} />
                         </h3>
                         <div className="space-y-4">
                            {[1, 2].map((_, i) => (
                               <div key={i} className="flex items-center justify-between p-4 border border-[#0D140B] hover:border-[#0D140B] transition-colors">
                                  <div className="flex items-center gap-4">
                                     <div className="w-10 h-10 bg-[#00C725]/10 flex items-center justify-center text-[#00C725]">
                                        <ShoppingBag size={18} />
                                     </div>
                                     <div>
                                        <p className="text-sm font-semibold text-[#0D140B]">Order #ORD-945{i}</p>
                                        <p className="text-[10px] text-[#3B5238] uppercase tracking-widest">Delivered • 2 days ago</p>
                                     </div>
                                  </div>
                                  <span className="text-sm font-mono text-[#0D140B]">₹4,200</span>
                               </div>
                            ))}
                         </div>
                      </section>
                   </div>

                   <div className="space-y-10">
                      <div className="p-6 bg-[#E3E0D8] border border-[#0D140B] space-y-6">
                         <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#3B5238] border-b border-[#0D140B] pb-2">Reach Card</h3>
                         <div className="space-y-4">
                            <div className="flex items-center gap-3">
                               <Mail size={14} className="text-[#00C725]" />
                               <span className="text-xs font-mono text-[#0D140B]">{activeUser.email}</span>
                            </div>
                            <div className="flex items-center gap-3">
                               <Phone size={14} className="text-[#00C725]" />
                               <span className="text-xs font-mono text-[#0D140B]">{activeUser.phone}</span>
                            </div>
                            <div className="flex items-center gap-3">
                               <MapPin size={14} className="text-[#00C725]" />
                               <span className="text-xs font-sans text-[#0D140B]">{activeUser.location}</span>
                            </div>
                         </div>
                      </div>

                      <div className="p-6 bg-[#E3E0D8] border border-[#0D140B] space-y-6">
                         <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#3B5238] border-b border-[#0D140B] pb-2">Payment Vault</h3>
                         <div className="flex items-center gap-3">
                            <CreditCard size={18} className="text-[#3B5238]" />
                            <p className="text-xs font-mono text-[#0D140B]">Visa •••• 4242</p>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    );
  }

  // --- LIST VIEW ---
  return (
    <div className="min-h-full bg-[#E3E0D8] p-8 lg:p-12 font-sans selection:bg-[#00C725] selection:text-[#0D140B]">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
        <p className="text-[#00C725] font-mono text-xs uppercase tracking-[0.3em] mb-4 font-bold italic">
          Boutique Patron Registry
        </p>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h1 className="text-5xl md:text-8xl font-editorial-serif text-[#0D140B] tracking-tighter leading-none mb-6">
              The Directory
            </h1>
            <p className="text-[#3B5238] text-lg md:text-xl font-editorial-serif max-w-xl opacity-70 italic leading-relaxed">
              Managing the high-value network of botanical enthusiasts. Overseeing patron engagement and fulfillment history.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between bg-[#F2F0EA] border border-[#0D140B] p-6 shadow-[4px_4px_0px_#0D140B]">
         <div className="relative flex-1 flex items-center gap-4 group">
            <Search size={18} className="text-[#3B5238] group-focus-within:text-[#00C725] transition-colors" />
            <input 
               type="text" 
               placeholder="Search patrons by identity or node..." 
               className="bg-transparent border-0 focus:ring-0 text-sm font-editorial-serif text-[#0D140B] w-full placeholder:text-[#3B5238]/30"
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
            />
         </div>
         <div className="h-4 w-px bg-[#00C725] hidden md:block"></div>
         <div className="flex gap-8 items-center">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#3B5238] flex items-center gap-2">
               <Calendar size={12} /> FY 2024
            </span>
            <button className="text-[10px] font-bold uppercase tracking-widest text-[#0D140B] hover:text-[#00C725] transition-colors flex items-center gap-2">
               <Filter size={12} /> Filter Directory
            </button>
         </div>
      </div>

      {/* Grid List */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10"
      >
        {USERS.map((user, i) => (
          <motion.div 
            key={user.id} 
            variants={itemVariants}
            onClick={() => setSelectedUserId(user.id)}
            className="bg-[#F2F0EA] border border-[#0D140B] hover:border-[#0D140B] transition-colors p-8 group relative flex flex-col h-full cursor-pointer"
          >
            <div className="absolute top-8 right-8">
               <span className={`w-2.5 h-2.5 rounded-full block ${user.status === 'active' ? 'bg-[#00C725]' : 'bg-[#e55c5c] animation-pulse'}`}></span>
            </div>

            <div className="mb-10">
              <span className="text-[9px] font-mono text-[#3B5238] bg-[#00C725]/20 px-2 py-0.5 mb-4 inline-block tracking-widest uppercase font-bold">{user.id}</span>
              <h3 className="text-3xl font-editorial-serif text-[#0D140B] leading-none mb-2 group-hover:text-[#00C725] transition-colors">{user.name}</h3>
              <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#3B5238] opacity-40">Member since {user.joined}</p>
            </div>

            <div className="space-y-4 mb-10">
               <div className="flex items-center gap-3 text-xs text-[#0D140B] font-mono opacity-80">
                 <Mail size={12} className="text-[#3B5238]" /> {user.email}
               </div>
               <div className="flex items-center gap-3 text-xs text-[#0D140B] font-mono opacity-80">
                 <Phone size={12} className="text-[#3B5238]" /> {user.phone}
               </div>
            </div>

            <div className="flex flex-row justify-between items-end mt-auto pt-8 border-t border-[#0D140B] group-hover:border-[#0D140B]/20 transition-colors">
               <div>
                  <p className="text-[9px] uppercase tracking-widest text-[#3B5238] font-bold mb-1 opacity-50 text-sky-900">LifeValue</p>
                  <p className="font-editorial-serif text-[#0D140B] font-bold text-xl">{user.spent}</p>
               </div>
               <div className="text-right">
                  <div className="flex items-center gap-2 text-[#00C725] font-bold text-[10px] uppercase tracking-widest mb-1 group-hover:translate-x-1 transition-transform">
                     Details <ChevronRight size={12} />
                  </div>
                  <p className="font-mono text-[#3B5238] text-[10px] uppercase tracking-widest opacity-50">{user.orders} Orders</p>
               </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Meta Footer */}
      <div className="mt-20 border-t border-[#0D140B] pt-8 flex justify-between items-center text-[10px] font-mono uppercase tracking-[0.3em] text-[#3B5238] opacity-30">
        <span>© Hortibasket Official Patron Registry</span>
        <span>Secure Archive Node</span>
      </div>
    </div>
  );
}
