"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, 
  Search, 
  FileText, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  ExternalLink, 
  Download, 
  ArrowLeft,
  MoreVertical,
  Mail,
  Phone,
  Calendar,
  Building2,
  User as UserIcon,
  Filter,
  CheckCircle,
  AlertCircle
} from "lucide-react";

// Mock Data
const KYC_APPLICATIONS = [
  { 
    id: "KYC-001", vendorName: "The Rare Leaf Co.", applicant: "James Morrison", 
    email: "james@rareleaf.co", phone: "+91 9876543210", status: "pending", date: "2024-10-24 14:30",
    docs: { identity: { name: "James_ID.pdf", size: "2.4 MB" }, business: { name: "RareLeaf_GST.pdf", size: "1.1 MB" }, address: { name: "Electricity_Bill.jpg", size: "800 KB" } },
    biography: "Specializing in rare Araceae and variegated specimens. Operating a nursery in Pune for over 5 years. Seeking to expand digital reach via Hortibasket."
  },
  { 
    id: "KYC-002", vendorName: "Desert Blooms Nursery", applicant: "Sarah Jenkins", 
    email: "info@desertblooms.com", phone: "+91 9123456780", status: "pending", date: "2024-10-24 09:15",
    docs: { identity: { name: "Sarah_Aadhar.pdf", size: "1.2 MB" }, business: { name: "DB_License.pdf", size: "3.5 MB" }, address: { name: "Nursery_Tax_Receipt.pdf", size: "2.1 MB" } },
    biography: "Succulent and Cacti enthusiasts. We focus on drought-tolerant landscaping specimens and rare desert flora."
  },
  { 
    id: "KYC-003", vendorName: "Aroid Central", applicant: "Michael Chang", 
    email: "mike@aroidcentral.in", phone: "+91 9001122334", status: "approved", date: "2024-10-22 11:00",
    docs: { identity: { name: "MC_Passport.pdf", size: "4.1 MB" }, business: { name: "AC_Inc.pdf", size: "1.2 MB" }, address: { name: "Rent_Agreement.pdf", size: "5.4 MB" } },
    biography: "Curators of the finest Philodendrons and Anthuriums. Based in Bangalore."
  },
  { 
    id: "KYC-004", vendorName: "Urban Jungle Supply", applicant: "Priya Sharma", 
    email: "contact@urbanjs.com", phone: "+91 9988776655", status: "rejected", date: "2024-10-20 16:45",
    docs: { identity: { name: "Invalid_File.png", size: "10 KB" }, business: { name: "Draft_GST.pdf", size: "12 KB" }, address: { name: "Blurred_Doc.jpg", size: "45 KB" } },
    biography: "Residential plant supplier. Looking to sell potting mixes and indoor decor plants."
  },
];

export default function KYCManagement() {
  const [activeTab, setActiveTab] = useState<"pending" | "approved" | "rejected">("pending");
  const [selectedKycId, setSelectedKycId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = KYC_APPLICATIONS.filter(app => 
    app.status === activeTab && 
    (app.vendorName.toLowerCase().includes(searchQuery.toLowerCase()) || app.id.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  const activeKyc = KYC_APPLICATIONS.find(a => a.id === selectedKycId);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  // --- RENDERING DETAIL VIEW ---
  if (selectedKycId && activeKyc) {
    return (
      <div className="min-h-full bg-[#fcfdfa] p-6 lg:p-10 font-sans selection:bg-[#cae4c5] selection:text-[#254222]">
        <motion.button 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => setSelectedKycId(null)}
          className="flex items-center gap-2 text-[#4F684C] hover:text-[#254222] text-xs font-mono uppercase tracking-widest mb-8 transition-colors group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Back to Applications
        </motion.button>

        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-[#cae4c5] pb-10 mb-10 gap-6"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                 <span className="text-[10px] font-mono bg-[#cae4c5]/30 text-[#254222] px-2 py-1 uppercase tracking-widest border border-[#cae4c5]/60">
                    Application {activeKyc.id}
                 </span>
                 <span className={`text-[10px] uppercase font-bold tracking-widest px-2 py-1 border ${
                    activeKyc.status === 'approved' ? 'border-[#82B34B] text-[#82B34B] bg-[#82B34B]/10' : 
                    activeKyc.status === 'rejected' ? 'border-[#e55c5c] text-[#e55c5c] bg-[#e55c5c]/10' : 
                    'border-[#e4a11b] text-[#e4a11b] bg-[#e4a11b]/10'
                 }`}>
                   {activeKyc.status}
                 </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-editorial-serif text-[#254222] leading-none mb-2">
                {activeKyc.vendorName}
              </h1>
              <p className="text-[#4F684C] text-lg font-editorial-serif opacity-70 italic">Submitted by {activeKyc.applicant}</p>
            </div>

            <div className="flex gap-4">
               {activeKyc.status === 'pending' && (
                 <>
                   <button className="px-8 py-4 bg-[#254222] text-white text-[11px] font-bold uppercase tracking-widest hover:bg-[#82B34B] transition-all shadow-[4px_4px_0px_#cae4c5] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]">
                      Approve Merchant
                   </button>
                   <button className="px-8 py-4 border border-[#e55c5c] text-[#e55c5c] text-[11px] font-bold uppercase tracking-widest hover:bg-[#e55c5c]/5 transition-all">
                      Deny Entry
                   </button>
                 </>
               )}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Dossier Content */}
            <div className="lg:col-span-8 space-y-12">
              <section>
                 <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-[#82B34B] mb-6 font-bold flex items-center gap-2">
                   <div className="w-8 h-px bg-[#cae4c5]"></div> 01. Merchant Profile
                 </h2>
                 <p className="text-[#254222] leading-relaxed text-lg font-serif">
                   {activeKyc.biography}
                 </p>
              </section>

              <section>
                <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-[#82B34B] mb-6 font-bold flex items-center gap-2">
                  <div className="w-8 h-px bg-[#cae4c5]"></div> 02. Verified Documentation
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { type: "ID Proof", data: activeKyc.docs.identity },
                    { type: "Business License", data: activeKyc.docs.business },
                    { type: "Address Verification", data: activeKyc.docs.address }
                  ].map((doc, idx) => (
                    <div key={idx} className="bg-white border border-[#cae4c5]/60 p-5 group hover:border-[#254222] transition-all flex flex-col justify-between h-40">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                           <FileText size={24} className="text-[#cae4c5] group-hover:text-[#82B34B] transition-colors" />
                           <span className="text-[10px] font-mono text-[#4F684C] opacity-50">{doc.data.size}</span>
                        </div>
                        <p className="text-[10px] uppercase tracking-widest font-bold text-[#4F684C] mb-1">{doc.type}</p>
                        <p className="text-sm font-semibold text-[#254222] truncate">{doc.data.name}</p>
                      </div>
                      <div className="flex gap-4 pt-4 border-t border-[#cae4c5]/30">
                        <button className="text-[10px] uppercase font-bold text-[#82B34B] flex items-center gap-1">
                          <ExternalLink size={12} /> View
                        </button>
                        <button className="text-[10px] uppercase font-bold text-[#4F684C] flex items-center gap-1">
                          <Download size={12} /> Download
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar Details */}
            <div className="lg:col-span-4 bg-[#fcfdfa] border-l border-[#cae4c5] pl-10 space-y-10">
               <div>
                  <h3 className="text-[10px] uppercase font-mono tracking-widest text-[#4F684C] mb-4">Contact Gateway</h3>
                  <div className="space-y-4">
                     <div className="flex items-center gap-3 text-sm text-[#254222]">
                       <div className="w-8 h-8 rounded-full bg-white border border-[#cae4c5] flex items-center justify-center">
                         <Mail size={14} className="text-[#82B34B]" />
                       </div>
                       <span className="font-mono">{activeKyc.email}</span>
                     </div>
                     <div className="flex items-center gap-3 text-sm text-[#254222]">
                       <div className="w-8 h-8 rounded-full bg-white border border-[#cae4c5] flex items-center justify-center">
                         <Phone size={14} className="text-[#82B34B]" />
                       </div>
                       <span className="font-mono">{activeKyc.phone}</span>
                     </div>
                  </div>
               </div>

               <div>
                  <h3 className="text-[10px] uppercase font-mono tracking-widest text-[#4F684C] mb-4">Registry Timeline</h3>
                  <div className="flex items-center gap-3 text-sm text-[#254222]">
                    <div className="w-8 h-8 rounded-full bg-white border border-[#cae4c5] flex items-center justify-center">
                      <Calendar size={14} className="text-[#82B34B]" />
                    </div>
                    <span>{activeKyc.date}</span>
                  </div>
               </div>

               <div className="pt-10 border-t border-[#cae4c5]">
                  <p className="text-[10px] italic text-[#4F684C] leading-relaxed">
                    By approving this merchant, you confirm that all documentation meets the Hortibasket Marketplace Standard for quality and legal compliance.
                  </p>
               </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- RENDERING LIST VIEW ---
  return (
    <div className="min-h-full bg-[#fcfdfa] p-8 lg:p-12 font-sans selection:bg-[#cae4c5] selection:text-[#254222]">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
        <p className="text-[#82B34B] font-mono text-xs uppercase tracking-[0.2em] mb-2 font-semibold font-bold">
          Marketplace Compliance
        </p>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h1 className="text-4xl md:text-6xl font-editorial-serif text-[#254222] tracking-tight leading-none mb-4">
              KYC Verifications
            </h1>
            <p className="text-[#4F684C] text-sm md:text-base max-w-2xl opacity-70 font-editorial-serif">
              An editorial oversight of prospective marketplace merchants. Curating the finest botanical suppliers.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-[#cae4c5]/60 mb-10 w-full overflow-x-auto scrollbar-hide">
         {[
           { key: "pending", label: "Awaiting Review", icon: Clock },
           { key: "approved", label: "Verified Vendors", icon: CheckCircle },
           { key: "rejected", label: "Denied Entries", icon: AlertCircle }
         ].map(tab => (
           <button 
             key={tab.key}
             onClick={() => { setActiveTab(tab.key as any); setSelectedKycId(null); }}
             className={`px-10 py-5 text-[11px] font-bold uppercase tracking-[0.15em] relative whitespace-nowrap transition-all duration-300 flex items-center gap-2 ${
               activeTab === tab.key ? "text-[#254222]" : "text-[#4F684C]/40 hover:text-[#4F684C]"
             }`}
           >
              <tab.icon size={14} className={activeTab === tab.key ? "text-[#82B34B]" : ""} />
              {tab.label}
              {activeTab === tab.key && (
                <motion.div layoutId="kycTabActive" className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#254222]" />
              )}
           </button>
         ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1 bg-white border border-[#cae4c5] p-4 flex items-center gap-4 focus-within:border-[#254222] transition-colors overflow-hidden group">
           <Search size={18} className="text-[#cae4c5] group-hover:text-[#82B34B] transition-colors" />
           <input 
             type="text" 
             placeholder="Find application by ID or merchant name..." 
             className="w-full bg-transparent border-0 focus:ring-0 text-sm font-editorial-serif text-[#254222] placeholder:text-[#4F684C]/30"
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
           />
           <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 pointer-events-none">
              <Filter size={40} />
           </div>
        </div>
      </div>

      {/* Main Table List */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-white border border-[#254222] shadow-[8px_8px_0px_#cae4c5] overflow-hidden"
      >
        <div className="overflow-x-auto whitespace-nowrap">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#254222] text-[10px] uppercase tracking-[0.2em] font-mono text-[#4F684C] bg-[#fcfdfa]">
                <th className="p-6 font-bold">Identity</th>
                <th className="p-6 font-bold">Entity</th>
                <th className="p-6 font-bold">Contact Node</th>
                <th className="p-6 font-bold text-center">Date Filed</th>
                <th className="p-6 font-bold text-right">Oversight</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((app, i) => (
                <motion.tr 
                  key={app.id}
                  variants={itemVariants}
                  onClick={() => setSelectedKycId(app.id)}
                  className="border-b border-[#cae4c5]/40 hover:bg-[#cae4c5]/5 transition-all cursor-pointer group"
                >
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 bg-[#cae4c5]/20 border border-[#cae4c5]/40 flex items-center justify-center shrink-0 group-hover:bg-[#cae4c5]/40 transition-colors">
                          <Building2 size={16} className="text-[#82B34B]" />
                       </div>
                       <div>
                          <p className="text-[10px] font-mono text-[#4F684C] opacity-60 mb-1">{app.id}</p>
                          <p className="text-base font-editorial-serif text-[#254222] font-semibold tracking-tight">{app.vendorName}</p>
                       </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-2">
                       <UserIcon size={14} className="text-[#cae4c5]" />
                       <span className="text-sm text-[#4F684C] font-editorial-serif">{app.applicant}</span>
                    </div>
                  </td>
                  <td className="p-6">
                     <p className="text-[11px] font-mono text-[#254222] mb-1">{app.email}</p>
                     <p className="text-[10px] font-mono text-[#4F684C]">{app.phone}</p>
                  </td>
                  <td className="p-6 text-[11px] font-mono text-[#4F684C] text-center">
                    {app.date.split(' ')[0]}
                  </td>
                  <td className="p-6 text-right">
                    <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 transition-transform">
                       <span className="text-[10px] uppercase font-bold tracking-widest text-[#82B34B]">Open Dossier</span>
                       <div className="w-8 h-8 rounded-full border border-[#cae4c5]/60 flex items-center justify-center text-[#4F684C] group-hover:border-[#82B34B] group-hover:text-[#82B34B] transition-all">
                          <MoreVertical size={14} />
                       </div>
                    </div>
                  </td>
                </motion.tr>
              ))}
              {filteredData.length === 0 && (
                <tr>
                   <td colSpan={5} className="py-32 text-center">
                      <div className="flex flex-col items-center opacity-30">
                         <ShieldCheck size={48} className="mb-4 text-[#cae4c5]" />
                         <p className="text-xs font-mono uppercase tracking-widest text-[#4F684C]">Cleared of all pending dossiers</p>
                      </div>
                   </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Footer Meta */}
      <div className="mt-12 flex justify-between items-center text-[10px] font-mono uppercase tracking-widest text-[#4F684C] opacity-50">
         <span>Boutique Botanical Oversight v2.4</span>
         <div className="flex gap-8">
            <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#82B34B]"></div> All Clear</span>
            <span className="flex items-center gap-2 font-bold text-[#e4a11b]">3 Updates Pending</span>
         </div>
      </div>
    </div>
  );
}
