"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, ShoppingBag, Store, TrendingUp, ArrowUpRight, ArrowDownRight, Clock } from "lucide-react";

const STATS = [
  { label: "Total Revenue", value: "₹4,25,000", trend: "+12.5%", isPositive: true, icon: TrendingUp },
  { label: "Active Suppliers", value: "142", trend: "+4", isPositive: true, icon: Store },
  { label: "Total Patrons", value: "8,405", trend: "+124", isPositive: true, icon: Users },
  { label: "Pending Orders", value: "38", trend: "-2", isPositive: false, icon: ShoppingBag },
];

const RECENT_ORDERS = [
  { id: "ORD-9482", customer: "Eleanor Vance", value: "₹4,200", status: "Processing", date: "Today, 10:42 AM", supplier: "GreenHouse Co." },
  { id: "ORD-9481", customer: "Arthur Pendelton", value: "₹1,850", status: "Dispatched", date: "Today, 09:15 AM", supplier: "Botanical Rare" },
  { id: "ORD-9480", customer: "Clara Hughes", value: "₹12,500", status: "Delivered", date: "Yesterday, 16:30 PM", supplier: "Aroid Central" },
  { id: "ORD-9479", customer: "Marcus Thorne", value: "₹850", status: "Processing", date: "Yesterday, 14:20 PM", supplier: "GreenHouse Co." },
];

const PENDING_KYC = [
  { id: "KYC-092", name: "Moss & Fern Nursery", submitted: "2 hours ago", status: "Awaiting Review" },
  { id: "KYC-091", name: "Desert Blooms", submitted: "5 hours ago", status: "Awaiting Review" },
  { id: "KYC-090", name: "The Rare Leaf", submitted: "1 day ago", status: "Documents Missing" },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-full bg-[#fcfdfa] p-8 lg:p-12 font-sans selection:bg-[#cae4c5] selection:text-[#254222]">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-12">
        <p className="text-[#82B34B] font-mono text-xs uppercase tracking-[0.2em] mb-2 font-semibold">HQ Overview</p>
        <h1 className="text-4xl md:text-5xl font-editorial-serif text-[#254222] tracking-tight leading-tight">
          Executive Dashboard
        </h1>
        <p className="text-[#4F684C] mt-2 text-sm max-w-xl">
          Complete pulse of your multi-vendor botanical marketplace. Monitor sales, supplier onboarding, and patron activity.
        </p>
      </motion.div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {STATS.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="bg-white border border-[#cae4c5]/60 p-6 flex flex-col justify-between hover:border-[#cae4c5] transition-colors relative overflow-hidden group"
          >
             <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
               <stat.icon size={48} className="text-[#254222]" />
            </div>
            
            <p className="text-[10px] font-mono uppercase tracking-widest text-[#4F684C] mb-4">{stat.label}</p>
            <h3 className="text-3xl font-editorial-serif text-[#254222] mb-4">{stat.value}</h3>
            
            <div className="flex items-center gap-2 pt-4 border-t border-[#cae4c5]/40 mt-auto">
               <span className={`flex items-center text-[10px] font-bold font-mono ${stat.isPositive ? 'text-[#82B34B]' : 'text-[#e55c5c]'}`}>
                 {stat.isPositive ? <ArrowUpRight size={14} className="mr-1" /> : <ArrowDownRight size={14} className="mr-1" />}
                 {stat.trend}
               </span>
               <span className="text-[10px] text-[#4F684C] uppercase tracking-widest">vs Last Week</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Custom Analytics CSS Chart */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-12 bg-white border border-[#254222] shadow-[4px_4px_0px_#cae4c5] p-8 lg:p-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
           <div>
             <h2 className="text-xs uppercase tracking-widest font-mono text-[#82B34B] mb-2 font-bold">Performance Analytics</h2>
             <h3 className="font-editorial-serif text-3xl md:text-4xl text-[#254222]">Platform Revenue Trajectory</h3>
           </div>
           <div className="flex gap-6 mt-6 md:mt-0 pb-2">
              <div className="flex items-center gap-2">
                 <div className="w-3 h-3 bg-[#254222]"></div>
                 <span className="text-[10px] font-mono uppercase tracking-widest text-[#4F684C]">Gross Revenue</span>
              </div>
              <div className="flex items-center gap-2">
                 <div className="w-3 h-3 bg-[#cae4c5]/60 border border-[#cae4c5]"></div>
                 <span className="text-[10px] font-mono uppercase tracking-widest text-[#4F684C]">Storefront Traffic</span>
              </div>
           </div>
        </div>

        {/* Chart Canvas */}
        <div className="relative w-full h-[350px] sm:h-[450px] pl-0 sm:pl-10 pb-10">
           
           {/* Y-Axis Grid */}
           <div className="absolute inset-0 pl-0 sm:pl-10 pb-10 flex flex-col justify-between pointer-events-none z-0">
              {[4, 3, 2, 1, 0].map((line, idx) => (
                 <div key={idx} className="w-full border-t border-dashed border-[#cae4c5]/60 flex-1 relative">
                    <span className="absolute -left-10 top-[-8px] text-[10px] font-mono text-[#4F684C] hidden sm:block">
                       {(line * 50).toString() + "K"}
                    </span>
                 </div>
              ))}
           </div>
           
           {/* Bars Container */}
           <div className="w-full h-full flex items-end justify-between gap-1 sm:gap-3 lg:gap-6 relative z-10 border-b border-[#cae4c5]">
             {[
               { month: "Jan", revenue: 45, traffic: 60 },
               { month: "Feb", revenue: 52, traffic: 65 },
               { month: "Mar", revenue: 38, traffic: 45 },
               { month: "Apr", revenue: 65, traffic: 80 },
               { month: "May", revenue: 85, traffic: 95 },
               { month: "Jun", revenue: 72, traffic: 85 },
               { month: "Jul", revenue: 90, traffic: 110 },
               { month: "Aug", revenue: 115, traffic: 130 },
               { month: "Sep", revenue: 105, traffic: 125 },
               { month: "Oct", revenue: 140, traffic: 160 },
               { month: "Nov", revenue: 165, traffic: 180 },
               { month: "Dec", revenue: 210, traffic: 240 },
             ].map((data, i) => (
               <div key={i} className="flex-1 flex flex-col items-center justify-end h-full group relative">
                  
                  {/* Hover Tooltip */}
                  <div className="absolute -top-16 opacity-0 group-hover:opacity-100 transition-opacity bg-[#254222] text-[#fcfdfa] p-3 pointer-events-none shadow-lg whitespace-nowrap z-30 flex flex-col items-center">
                     <p className="text-[10px] font-bold tracking-widest uppercase mb-1 text-[#cae4c5]">{data.month} 2024</p>
                     <p className="text-sm font-editorial-serif">₹{data.revenue},000</p>
                     <div className="absolute -bottom-2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-8 border-t-[#254222]"></div>
                  </div>
                  
                  {/* Traffic Envelope Bar */}
                  <motion.div 
                    initial={{ height: 0 }} animate={{ height: `${(data.traffic / 250) * 100}%` }} transition={{ delay: 0.4 + (i * 0.05), duration: 0.8, ease: "easeOut" }}
                    className="w-full max-w-[48px] bg-[#cae4c5]/30 flex items-end justify-center relative hover:bg-[#cae4c5]/60 transition-colors border-x border-t border-[#cae4c5]/50"
                  >
                     {/* Revenue Solid Bar */}
                     <motion.div 
                       initial={{ height: 0 }} animate={{ height: `${(data.revenue / data.traffic) * 100}%` }} transition={{ delay: 0.8 + (i * 0.05), duration: 0.6 }}
                       className="w-full bg-[#254222] hover:bg-[#82B34B] transition-colors"
                     />
                  </motion.div>
                  
                  {/* X-Axis Label */}
                  <div className="absolute -bottom-8 w-full text-center">
                     <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-[#4F684C]">
                        {data.month}
                     </span>
                  </div>
               </div>
             ))}
           </div>
        </div>
      </motion.div>
      {/* Secondary Analytics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
         {/* Merchant Performance Matrix */}
         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white border border-[#254222] p-8 shadow-[4px_4px_0px_#cae4c5]">
            <div className="flex justify-between items-end mb-10">
               <div>
                  <h2 className="text-xs uppercase tracking-widest font-mono text-[#82B34B] mb-2 font-bold">Marketplace Intelligence</h2>
                  <h3 className="font-editorial-serif text-2xl text-[#254222]">Merchant Performance Matrix</h3>
               </div>
               <span className="text-[10px] font-mono text-[#4F684C] uppercase tracking-widest bg-[#fcfdfa] px-3 py-1 border border-[#cae4c5]">Top 3 MTD</span>
            </div>
            
            <div className="space-y-8">
               {[
                  { name: "Aroid Central", revenue: "₹4,25,000", growth: "+18%", progress: 85, color: "#254222" },
                  { name: "GreenHouse Co.", revenue: "₹2,14,000", growth: "+12%", progress: 62, color: "#82B34B" },
                  { name: "Botanical Rare", revenue: "₹89,500", growth: "+5%", progress: 38, color: "#cae4c5" },
               ].map((merchant, i) => (
                  <div key={i} className="group">
                     <div className="flex justify-between items-end mb-3">
                        <div>
                           <p className="text-sm font-editorial-serif text-[#254222] mb-1 group-hover:text-[#82B34B] transition-colors">{merchant.name}</p>
                           <p className="text-[10px] font-mono text-[#4F684C] uppercase tracking-widest">{merchant.revenue} Collected</p>
                        </div>
                        <span className="text-xs font-bold text-[#82B34B] font-mono">{merchant.growth}</span>
                     </div>
                     <div className="w-full bg-[#fcfdfa] h-1.5 border border-[#cae4c5]/40 overflow-hidden">
                        <motion.div 
                           initial={{ width: 0 }} 
                           animate={{ width: `${merchant.progress}%` }} 
                           transition={{ delay: 0.6 + (i * 0.1), duration: 1 }}
                           className="h-full" 
                           style={{ backgroundColor: merchant.color }}
                        />
                     </div>
                  </div>
               ))}
            </div>
         </motion.div>

         {/* Category Sales Distribution (CSS Pie) */}
         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-[#254222] p-8 shadow-[4px_4px_0px_#cae4c5] text-[#fcfdfa] relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-10 md:gap-16 h-full">
               <div className="w-48 h-48 rounded-full shrink-0 relative flex items-center justify-center border-12 border-[#1a2e18] shadow-2xl" 
                    style={{ 
                       background: `conic-gradient(#82B34B 0deg 140deg, #cae4c5 140deg 240deg, #4F684C 240deg 360deg)` 
                    }}>
                  <div className="w-32 h-32 rounded-full bg-[#254222] shadow-inner flex flex-col items-center justify-center border border-[#1a2e18]">
                     <p className="text-[10px] font-mono uppercase tracking-widest text-[#82B34B]">Total</p>
                     <p className="text-2xl font-editorial-serif">100%</p>
                  </div>
               </div>
               
               <div className="flex-1 space-y-6">
                  <div>
                     <h2 className="text-xs uppercase tracking-widest font-mono text-[#82B34B] mb-2 font-bold italic">Stock Distribution</h2>
                     <h3 className="font-editorial-serif text-2xl mb-6">Inventory Allocation</h3>
                  </div>
                  
                  <div className="space-y-4">
                     {[
                        { label: "Rare Araceae", percent: 45, color: "#82B34B" },
                        { label: "Tropical Foliage", percent: 35, color: "#cae4c5" },
                        { label: "Supplies & Nursery", percent: 20, color: "#4F684C" },
                     ].map((cat, i) => (
                        <div key={i} className="flex items-center justify-between">
                           <div className="flex items-center gap-3">
                              <div className="w-2 h-2" style={{ backgroundColor: cat.color }}></div>
                              <span className="text-[11px] uppercase tracking-widest font-mono opacity-80">{cat.label}</span>
                           </div>
                           <span className="text-sm font-editorial-serif">{cat.percent}%</span>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
            
            {/* Background Texture Decoration */}
            <div className="absolute -bottom-10 -right-10 opacity-5 pointer-events-none">
               <ShoppingBag size={200} />
            </div>
         </motion.div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders Table */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="lg:col-span-2 bg-white border border-[#cae4c5]/60">
           <div className="p-6 border-b border-[#cae4c5]/40 flex justify-between items-center bg-[#fcfdfa]">
              <h2 className="text-xl font-editorial-serif text-[#254222]">Recent Marketplace Orders</h2>
              <a href="/orders/all" className="text-[10px] uppercase font-bold tracking-widest text-[#82B34B] hover:text-[#254222] transition-colors">View All</a>
           </div>
           
           <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                 <thead>
                    <tr className="border-b border-[#cae4c5]/40 text-[10px] uppercase tracking-widest font-mono text-[#4F684C]">
                       <th className="p-4 font-normal">Order ID</th>
                       <th className="p-4 font-normal">Patron</th>
                       <th className="p-4 font-normal">Supplier</th>
                       <th className="p-4 font-normal">Amount</th>
                       <th className="p-4 font-normal">Status</th>
                    </tr>
                 </thead>
                 <tbody>
                    {RECENT_ORDERS.map((order, i) => (
                       <tr key={order.id} className="border-b border-[#cae4c5]/20 hover:bg-[#cae4c5]/5 transition-colors">
                          <td className="p-4 text-sm font-mono text-[#254222]">{order.id}</td>
                          <td className="p-4 text-sm font-editorial-serif text-[#254222]">{order.customer}</td>
                          <td className="p-4 text-[11px] font-sans text-[#4F684C]">{order.supplier}</td>
                          <td className="p-4 text-sm font-bold text-[#82B34B]">{order.value}</td>
                          <td className="p-4 text-sm text-[#4F684C]">
                             <span className={`inline-flex items-center px-2 py-0.5 border text-[10px] uppercase tracking-widest ${
                               order.status === 'Delivered' ? 'border-[#82B34B] text-[#82B34B] bg-[#82B34B]/10' : 
                               order.status === 'Processing' ? 'border-[#e4a11b] text-[#e4a11b] bg-[#e4a11b]/10' : 
                               'border-[#4F684C] text-[#4F684C] bg-[#cae4c5]/10'
                             }`}>
                               {order.status}
                             </span>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </motion.div>

        {/* KYC Attention Required */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} className="bg-white border border-[#254222] shadow-[4px_4px_0px_#cae4c5] p-6">
           <div className="mb-6 flex justify-between items-center border-b border-[#cae4c5]/40 pb-4">
              <h2 className="text-xl font-editorial-serif text-[#254222]">Supplier Applications</h2>
              <div className="w-2 h-2 rounded-full bg-[#e55c5c] animate-pulse" />
           </div>
           
           <p className="text-[11px] uppercase tracking-widest text-[#4F684C] mb-6 leading-relaxed">
             There are <span className="text-[#254222] font-bold">3 pending</span> Know Your Customer (KYC) submissions requiring executive review.
           </p>

           <div className="space-y-4 mb-8">
              {PENDING_KYC.map((kyc) => (
                 <div key={kyc.id} className="border border-[#cae4c5]/60 hover:border-[#82B34B] p-4 transition-colors cursor-pointer group bg-[#fcfdfa]">
                    <div className="flex justify-between items-start mb-2">
                       <h3 className="font-editorial-serif text-[#254222] group-hover:text-[#82B34B] transition-colors">{kyc.name}</h3>
                       <span className="text-[9px] font-mono text-[#4F684C] bg-white border px-1">{kyc.id}</span>
                    </div>
                    <div className="flex items-center text-[10px] uppercase tracking-widest text-[#4F684C] gap-3">
                       <span className="flex items-center gap-1"><Clock size={10} /> {kyc.submitted}</span>
                       <span className="text-[#e4a11b]">{kyc.status}</span>
                    </div>
                 </div>
              ))}
           </div>

           <a href="/sellers/kyc" className="block w-full text-center py-3 bg-[#254222] text-[#fcfdfa] font-bold uppercase tracking-widest text-[11px] hover:bg-[#82B34B] transition-colors">
              Process Submissions
           </a>
        </motion.div>
      </div>
    </div>
  );
}
