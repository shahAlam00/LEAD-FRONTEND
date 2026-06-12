import React, { useState } from "react";
import { Search, MoreHorizontal, Phone, Video, Send, Paperclip, Mail, BookOpen } from "lucide-react";

// 10 Users ka Data
const allUsers = [
  { id: 1, name: "Laiba Siddique", platform: "WhatsApp", message: "Hello Sir", time: "2m", unread: 2, avatar: "https://i.pravatar.cc/150?img=1", phone: "+91 98765 43210", email: "laiba@example.com", course: "MBA" },
  { id: 2, name: "Silent Killer", platform: "Instagram", message: "Sent an attachment", time: "5m", unread: 0, avatar: "https://i.pravatar.cc/150?img=2", phone: "+91 99887 76655", email: "killer@demo.com", course: "B.Tech" },
  { id: 3, name: "Rao Sahab Mohit", platform: "Messenger", message: "Ok", time: "1h", unread: 1, avatar: "https://i.pravatar.cc/150?img=3", phone: "+91 91234 56789", email: "rao@tech.com", course: "BBA" },
  { id: 4, name: "Anushka", platform: "WhatsApp", message: "Please share details", time: "3h", unread: 0, avatar: "https://i.pravatar.cc/150?img=4", phone: "+91 98765 11111", email: "anushka@mail.com", course: "BCA" },
  { id: 5, name: "Rahul Verma", platform: "Instagram", message: "Is it affordable?", time: "5m", unread: 0, avatar: "https://i.pravatar.cc/150?img=5", phone: "+91 98765 22222", email: "rahul@mail.com", course: "MBA" },
  { id: 6, name: "Amit Kumar", platform: "Messenger", message: "I'm interested", time: "45m", unread: 0, avatar: "https://i.pravatar.cc/150?img=8", phone: "+91 98765 33333", email: "amit@mail.com", course: "B.Tech" },
  { id: 7, name: "Sneha", platform: "WhatsApp", message: "Batch start date?", time: "2h", unread: 0, avatar: "https://i.pravatar.cc/150?img=10", phone: "+91 98765 44444", email: "sneha@mail.com", course: "BBA" },
  { id: 8, name: "Vikas", platform: "Instagram", message: "Demo class?", time: "4h", unread: 0, avatar: "https://i.pravatar.cc/150?img=11", phone: "+91 98765 55555", email: "vikas@mail.com", course: "MCA" },
  { id: 9, name: "Deepika", platform: "Messenger", message: "Need brochure", time: "6h", unread: 0, avatar: "https://i.pravatar.cc/150?img=12", phone: "+91 98765 66666", email: "deepika@mail.com", course: "B.Tech" },
  { id: 10, name: "Rohit", platform: "WhatsApp", message: "Can I join?", time: "8h", unread: 0, avatar: "https://i.pravatar.cc/150?img=13", phone: "+91 98765 77777", email: "rohit@mail.com", course: "BBA" },
];

const TABS = ["All", "Messenger", "Instagram", "Whatsapp"];

const Whatsapp = () => {
  const [selectedUser, setSelectedUser] = useState(allUsers[0]);
  const [selectedTab, setSelectedTab] = useState("All");
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, sender: "user", text: "Hello Sir" },
    { id: 2, sender: "me", text: "Hello 👋" },
  ]);

  const filteredUsers = selectedTab === "All" ? allUsers : allUsers.filter(u => u.platform === selectedTab);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    setMessages([...messages, { id: Date.now(), sender: "me", text: inputValue }]);
    setInputValue("");
  };

  return (
    <div className="h-screen bg-gray-100 flex overflow-hidden font-sans text-gray-900">
      {/* LEFT SIDEBAR */}
      <div className="w-[360px] bg-white border-r flex flex-col shadow-sm">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold mb-4">Inbox</h2>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {TABS.map((tab) => (
              <button key={tab} onClick={() => setSelectedTab(tab)}
                className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all ${selectedTab === tab ? "bg-green-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredUsers.map((user) => (
            <div key={user.id} onClick={() => setSelectedUser(user)}
              className={`cursor-pointer px-4 py-3 flex items-center gap-3 transition-colors ${selectedUser.id === user.id ? "bg-green-50" : "hover:bg-gray-50"}`}>
              <img src={user.avatar} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm" />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between"><h4 className="font-semibold truncate">{user.name}</h4><span className="text-[10px] text-gray-400">{user.time}</span></div>
                <p className="text-sm text-gray-500 truncate">{user.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CHAT SECTION */}
      <div className="flex-1 flex flex-col bg-[#e5ddd5]">
        <div className="h-16 bg-[#f0f2f5] border-b px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={selectedUser.avatar} className="w-10 h-10 rounded-full" />
            <div><h3 className="font-semibold text-sm">{selectedUser.name}</h3><p className="text-[10px] text-green-600 font-medium">Online</p></div>
          </div>
          <div className="flex gap-5 text-gray-600"><Phone size={20} /><Video size={20} /><MoreHorizontal size={20} /></div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-3 bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] opacity-90">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[70%] px-4 py-2 rounded-lg shadow-sm text-sm ${msg.sender === "me" ? "bg-[#d9fdd3]" : "bg-white"}`}>{msg.text}</div>
            </div>
          ))}
        </div>

        <div className="bg-[#f0f2f5] p-3 flex items-center gap-3">
          <Paperclip size={24} className="text-gray-500" />
          <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} 
            className="flex-1 bg-white rounded-lg px-4 py-2.5 outline-none text-sm" placeholder="Type a message..." />
          <Send size={20} onClick={handleSend} className="text-green-600 cursor-pointer" />
        </div>
      </div>

      {/* RIGHT PANEL - DYNAMIC DATA */}
      <div className="w-[300px] bg-white border-l p-6 hidden xl:block">
        <div className="flex flex-col items-center text-center">
          <img src={selectedUser.avatar} className="w-24 h-24 rounded-full mb-4 ring-4 ring-gray-50" />
          <h2 className="font-bold text-lg">{selectedUser.name}</h2>
          <p className="text-gray-400 text-xs">{selectedUser.platform} Lead</p>
        </div>
        <div className="mt-8 space-y-6">
          {[
            { label: "Phone", value: selectedUser.phone, icon: <Phone size={14}/> },
            { label: "Email", value: selectedUser.email, icon: <Mail size={14}/> },
            { label: "Course Interested", value: selectedUser.course, icon: <BookOpen size={14}/> },
          ].map((item) => (
            <div key={item.label} className="flex gap-3">
              <div className="text-green-600 mt-1">{item.icon}</div>
              <div>
                <p className="text-[11px] uppercase tracking-wider text-gray-400 font-bold">{item.label}</p>
                <p className="text-sm font-medium">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Whatsapp;