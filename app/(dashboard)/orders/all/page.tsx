"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Filter, Search, ChevronDown, Package } from "lucide-react";

const ORDERS_DB = [
  { id: "ORD-9482", customer: "Eleanor Vance", supplier: "GreenHouse Co.", items: 3, value: "₹4,200", status: "Processing", date: "Today, 10:42 AM", payment: "Paid" },
  { id: "ORD-9481", customer: "Arthur Pendelton", supplier: "Botanical Rare", items: 1, value: "₹1,850", status: "Dispatched", date: "Today, 09:15 AM", payment: "Pending" },
  { id: "ORD-9480", customer: "Clara Hughes", supplier: "Aroid Central", items: 12, value: "₹12,500", status: "Delivered", date: "Yesterday, 16:30 PM", payment: "Paid" },
  { id: "ORD-9479", customer: "Marcus Thorne", supplier: "GreenHouse Co.", items: 1, value: "₹850", status: "Processing", date: "Yesterday, 14:20 PM", payment: "Paid" },
  { id: "ORD-9478", customer: "Sophie Laurent", supplier: "Desert Blooms", items: 5, value: "₹2,300", status: "Cancelled", date: "Oct 12, 11:00 AM", payment: "Refunded" },
];

export default function OrdersPage() {
  const [search, setSearch] = useState("");

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
            Fulfillment Management
          </p>
          <h1 className="text-4xl md:text-5xl font-editorial-serif text-[#254222] tracking-tight leading-tight">
            Marketplace Orders
          </h1>
          <p className="text-[#4F684C] mt-2 text-sm md:text-base max-w-xl pr-4">
            Oversee all cross-supplier transactions and patron purchases.
          </p>
        </div>
      </motion.div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between items-center">
         <div className="flex border border-[#cae4c5]/60 bg-white w-full md:max-w-md items-center px-4 py-2 hover:border-[#cae4c5] transition-colors focus-within:border-[#82B34B]">
            <Search size={16} className="text-[#4F684C]" />
            <input 
               type="text" 
               placeholder="Search patron, ID, or supplier..." 
               className="bg-transparent border-0 focus:ring-0 text-sm text-[#254222] w-full ml-2 placeholder:text-[#4F684C]/50"
               value={search}
               onChange={(e) => setSearch(e.target.value)}
            />
         </div>
         <div className="flex gap-4 w-full md:w-auto">
            <button className="flex items-center justify-between w-full md:w-auto gap-4 border border-[#cae4c5]/60 bg-white px-6 py-2 text-[11px] font-bold uppercase tracking-widest text-[#254222]">
              Filter by Status <Filter size={14} />
            </button>
            <button className="flex items-center justify-between w-full md:w-auto gap-4 border border-[#cae4c5]/60 bg-white px-6 py-2 text-[11px] font-bold uppercase tracking-widest text-[#254222]">
              Export CSV <ChevronDown size={14} />
            </button>
         </div>
      </div>

      {/* Heavy Order Table */}
      <div className="bg-white border border-[#254222] shadow-[4px_4px_0px_#cae4c5] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="border-b border-[#254222] text-[10px] uppercase tracking-widest font-mono text-[#254222] bg-[#fcfdfa]">
                <th className="p-5 font-bold">Order ID</th>
                <th className="p-5 font-bold">Date & Time</th>
                <th className="p-5 font-bold">Patron</th>
                <th className="p-5 font-bold">Vendor/Supplier</th>
                <th className="p-5 font-bold text-center">Items</th>
                <th className="p-5 font-bold">Value</th>
                <th className="p-5 font-bold">Payment</th>
                <th className="p-5 font-bold text-right">Fulfillment</th>
              </tr>
            </thead>
            <tbody>
              {ORDERS_DB.map((order, i) => (
                <tr key={order.id} className="border-b border-[#cae4c5]/40 hover:bg-[#cae4c5]/5 transition-colors group">
                  <td className="p-5 text-sm font-mono text-[#254222] font-semibold flex items-center gap-3">
                     <Package size={16} className="text-[#cae4c5] group-hover:text-[#82B34B] transition-colors" />
                     {order.id}
                  </td>
                  <td className="p-5 text-xs text-[#4F684C] font-mono">{order.date}</td>
                  <td className="p-5 text-sm font-editorial-serif text-[#254222]">{order.customer}</td>
                  <td className="p-5 text-xs text-[#254222]"><span className="bg-[#cae4c5]/20 px-2 py-1 border border-[#cae4c5]/50">{order.supplier}</span></td>
                  <td className="p-5 text-sm font-mono text-[#4F684C] text-center">{order.items}</td>
                  <td className="p-5 text-sm font-bold text-[#82B34B]">{order.value}</td>
                  <td className="p-5 text-[10px] uppercase tracking-widest font-bold">
                     <span className={order.payment === 'Paid' ? 'text-[#82B34B]' : order.payment === 'Refunded' ? 'text-[#e55c5c]' : 'text-[#e4a11b]'}>
                        {order.payment}
                     </span>
                  </td>
                  <td className="p-5 text-right">
                    <span className={`inline-flex items-center px-3 py-1 border text-[10px] uppercase tracking-widest ${
                      order.status === 'Delivered' ? 'border-[#82B34B] text-[#82B34B] bg-[#82B34B]/10' : 
                      order.status === 'Processing' ? 'border-[#e4a11b] text-[#e4a11b] bg-[#e4a11b]/10' : 
                      order.status === 'Cancelled' ? 'border-[#e55c5c] text-[#e55c5c] bg-[#e55c5c]/10' :
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
      </div>
    </div>
  );
}
