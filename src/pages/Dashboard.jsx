import React, { useEffect, useState } from "react";
import api from '../lib/axios.js'
import { 
  Users, 
  UserPlus, 
  CheckCircle, 
  IndianRupee, 
  ArrowUpRight, 
  ArrowDownRight, 
  TrendingUp, 
  Sparkles, 
  Smartphone
} from 'lucide-react';

export default function Dashboard() {
  // Enhanced Mock Stats with dynamic trend tags and background accents
  const stats = [
    { 
      title: "Total Leads", 
      value: "1,245", 
      icon: Users, 
      color: "text-blue-600 bg-blue-50 border-blue-100", 
      trend: "+12% vs last month", 
      isPositive: true 
    },
    { 
      title: "New Leads", 
      value: "325", 
      icon: UserPlus, 
      color: "text-indigo-600 bg-indigo-50 border-indigo-100", 
      trend: "+18% this week", 
      isPositive: true 
    },
    { 
      title: "Converted", 
      value: "98", 
      icon: CheckCircle, 
      color: "text-emerald-600 bg-emerald-50 border-emerald-100", 
      trend: "+4% higher ratio", 
      isPositive: true 
    },
    { 
      title: "Target Revenue", 
      value: "₹2.5L", 
      icon: IndianRupee, 
      color: "text-amber-600 bg-amber-50 border-amber-100", 
      trend: "-2% seasonal drop", 
      isPositive: false 
    },
  ];


  const [recentActivities, setRecentActivities] = useState([]);
const [loading, setLoading] = useState(true);
  // Mock data for the live pipeline preview activity
  // const recentActivities = [
  //   { id: 1, name: "Rahul Sharma", action: "joined via Facebook Ads", time: "2 mins ago", channel: "facebook", channelColor: "text-blue-600 bg-blue-50" },
  //   { id: 2, name: "Ananya Mishra", action: "requested WhatsApp brochure", time: "15 mins ago", channel: "whatsapp", channelColor: "text-green-600 bg-green-50" },
  //   { id: 3, name: "Amit Verma", action: "dropped Instagram inquiry", time: "1 hour ago", channel: "instagram", channelColor: "text-pink-600 bg-pink-50" },
  //   { id: 4, name: "Vikram Malhotra", action: "converted to Active Student", time: "3 hours ago", channel: "system", channelColor: "text-emerald-600 bg-emerald-50" },
  // ];
  const getChannelColor = (source = "") => {
  const src = source.toLowerCase();

  if (src.includes("facebook"))
    return "text-blue-600 bg-blue-50";

  if (src.includes("whatsapp"))
    return "text-green-600 bg-green-50";

  if (src.includes("instagram"))
    return "text-pink-600 bg-pink-50";

  return "text-slate-600 bg-slate-50";
};

const formatTimeAgo = (dateString) => {
  const created = new Date(dateString);
  const now = new Date();

  const diffMinutes = Math.floor(
    (now - created) / (1000 * 60)
  );

  if (diffMinutes < 1) return "Just now";
  if (diffMinutes < 60)
    return `${diffMinutes} min ago`;

  const diffHours = Math.floor(diffMinutes / 60);

  if (diffHours < 24)
    return `${diffHours} hr ago`;

  const diffDays = Math.floor(diffHours / 24);

  return `${diffDays} day ago`;
};

const fetchRecentLeads = async () => {
  try {
    const response = await fetch(
      "http://localhost:5000/api/leads"
    );

    const leads = await response.json();

    const formatted = leads
      .slice(0, 10)
      .map((lead) => ({
        id: lead._id,
        name: lead.name || "Unknown Lead",
        action: `${lead.status} via ${lead.source}`,
        channel:
          lead.source?.toLowerCase() || "system",
        channelColor: getChannelColor(
          lead.source
        ),
        time: formatTimeAgo(
          lead.createdAt
        ),
      }));

    setRecentActivities(formatted);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchRecentLeads();

  const interval = setInterval(() => {
    fetchRecentLeads();
  }, 10000);

  return () => clearInterval(interval);
}, []);
  return (
    <div className="p-8 bg-slate-50 min-h-screen space-y-8">
      
      {/* Premium Top Welcome Header Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Overview Dashboard</h1>
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md flex items-center gap-1 shadow-sm">
              <Sparkles size={10} /> Live
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">Real-time performance distribution and channel statistics</p>
        </div>
        <div className="text-right hidden sm:block">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">System Synced</span>
          <span className="text-sm font-bold text-slate-800">{new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short' })}</span>
        </div>
      </div>

      {/* Grid Section for Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all duration-200 group relative overflow-hidden"
          >
            <div className="flex justify-between items-start z-10 relative">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{stat.title}</p>
                <h2 className="text-3xl font-black mt-2 text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">{stat.value}</h2>
              </div>
              <div className={`p-3 rounded-xl border ${stat.color} shadow-sm group-hover:scale-105 transition-transform`}>
                <stat.icon size={22} />
              </div>
            </div>
            
            {/* Dynamic Trend Layout Footer */}
            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between z-10 relative">
              <div className={`flex items-center text-xs font-bold ${stat.isPositive ? 'text-emerald-600' : 'text-rose-500'}`}>
                {stat.isPositive ? <ArrowUpRight size={16} className="mr-0.5" /> : <ArrowDownRight size={16} className="mr-0.5" />}
                <span>{stat.trend}</span>
              </div>
              <span className="text-[10px] bg-slate-100 text-slate-500 font-bold px-2 py-0.5 rounded-md">30d</span>
            </div>
            
            {/* Ambient Graphic Background Accent on Hover */}
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-slate-50/50 rounded-full pointer-events-none group-hover:scale-125 transition-transform" />
          </div>
        ))}
      </div>

      {/* Highly Advanced Multi-Column Section (Charts + Activities) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Core Layout: Custom Lightweight Performance Graph Line */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-center mb-6">
            <div>
              <div className="flex items-center gap-2">
                <TrendingUp size={18} className="text-blue-600" />
                <h3 className="text-base font-bold text-slate-900">Weekly Lead Inflow</h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">Performance analytical trends over the last 7 active days</p>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg text-xs font-bold text-slate-600">
              <button className="px-2.5 py-1 bg-white rounded-md shadow-sm text-blue-600">7D</button>
              <button className="px-2.5 py-1 hover:bg-white/50 rounded-md">1M</button>
            </div>
          </div>

          {/* Premium Native SVG Chart Area - Zero Dependencies */}
          <div className="w-full h-48 relative my-4">
            <svg viewBox="0 0 700 200" className="w-full h-full overflow-visible">
              <defs>
                {/* Smooth Gradient Fill For Line Chart Underlay */}
                <linearGradient id="chart-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2563eb" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#2563eb" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              
              {/* Horizontal Background Grids */}
              <line x1="0" y1="50" x2="700" y2="50" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4,4" />
              <line x1="0" y1="110" x2="700" y2="110" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4,4" />
              <line x1="0" y1="170" x2="700" y2="170" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4,4" />
              
              {/* Area Under the Curve */}
              <path
                d="M 10 170 Q 120 120, 230 140 T 450 60 T 690 40 L 690 170 L 10 170 Z"
                fill="url(#chart-gradient)"
              />
              
              {/* High Precision Spline Indicator Line */}
              <path
                d="M 10 170 Q 120 120, 230 140 T 450 60 T 690 40"
                fill="none"
                stroke="#2563eb"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Graphical Hotspots/Points */}
              <circle cx="230" cy="140" r="5" fill="#2563eb" stroke="#ffffff" strokeWidth="2" />
              <circle cx="450" cy="60" r="5" fill="#2563eb" stroke="#ffffff" strokeWidth="2" />
              <circle cx="690" cy="40" r="6" fill="#4f46e5" stroke="#ffffff" strokeWidth="2.5" />
            </svg>
          </div>

          {/* Chart X-Axis Labels Row */}
          <div className="flex justify-between items-center text-xs font-bold text-slate-400 px-1 border-t border-slate-50 pt-3">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span className="text-indigo-600 font-extrabold">Sun (Today)</span>
          </div>
        </div>

        {/* Core Layout: Live Action Recent Pipeline Feed */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-base font-bold text-slate-900">Pipeline Pulse</h3>
                <p className="text-xs text-slate-500 mt-0.5">Realtime incoming lead activity log</p>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            </div>

            {/* List Array Block */}
            <div className="space-y-4">
              {loading ? (
  <p className="text-sm text-slate-500">
    Loading leads...
  </p>
) : (
              recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3.5 p-2 rounded-xl hover:bg-slate-50 transition-colors">
                  
                  {/* Native High Compatibility Brand Icons Layout */}
                  <div className={`p-2.5 rounded-lg shrink-0 flex items-center justify-center font-bold text-xs ${activity.channelColor}`}>
                    {activity.channel?.includes("facebook") && (
                      <span className="font-sans text-sm select-none tracking-tighter">f</span>
                    )}
                    {activity.channel?.includes("instagram") && (
                      <span className="font-sans text-xs select-none tracking-tighter">ig</span>
                    )}
                    {activity.channel?.includes("whatsapp") && (
                      <Smartphone size={14} />
                    )}
                    {activity.channel === 'system' && (
                      <CheckCircle size={14} />
                    )}
                  </div>
 
                  {/* Log Content Description */}
                  <div className="flex-1 min-w-0 text-xs">
                    <p className="text-slate-900 font-bold truncate">{activity.name}</p>
                    <p className="text-slate-500 font-medium mt-0.5">{activity.action}</p>
                  </div>

                  {/* Timestamp Label */}
                  <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap pt-0.5">
                    {activity.time}
                  </span>
                </div>
              ))
)}
            </div>
          </div>

          {/* Global Footer Navigation Redirection Button */}
          <button 
            onClick={() => window.location.hash = "#/leads"} 
            className="w-full text-center py-2 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 rounded-xl text-xs font-bold text-slate-600 hover:text-blue-600 transition-all mt-4"
          >
            View Entire Pipeline System
          </button>
        </div>

      </div>
    </div>
  );
}