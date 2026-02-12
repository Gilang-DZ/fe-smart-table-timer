import React, { useState } from "react";

interface LoginProps {
  onLogin: (email: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) return;

    setIsLoading(true);

    // ⛔ Dummy credential check (MVP)
    if (email !== "admin@805.com" || password !== "123456") {
      alert("Invalid credentials");
      setIsLoading(false);
      return;
    }

    // Fake delay biar kerasa real login
    setTimeout(() => {
      onLogin(email);
      setIsLoading(false);
    }, 600);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#0c0c0c]">
      <div className="max-w-[400px] w-full">
        <div className="flex flex-col mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-[#22c55e] w-10 h-10 flex items-center justify-center rounded-lg">
              <div className="w-5 h-5 border-4 border-[#0c0c0c] rounded-full"></div>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight uppercase leading-none">
              Smart 805
              <br />
              Timer
            </h1>
          </div>
          <p className="text-[#737373] font-bold text-xs tracking-[0.2em] uppercase">
            Reception Management System
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-[#171717] border border-[#262626] p-8 rounded-xl shadow-xl"
        >
          <div className="space-y-6">
            <div>
              <label className="block text-[10px] font-black text-[#a3a3a3] uppercase tracking-widest mb-2">
                Terminal ID / Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@hall.com"
                className="w-full bg-[#0a0a0a] border border-[#262626] rounded-lg px-4 py-3.5 text-white focus:outline-none focus:border-[#404040] transition-colors font-medium text-sm"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black text-[#a3a3a3] uppercase tracking-widest mb-2">
                Access Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="123456"
                className="w-full bg-[#0a0a0a] border border-[#262626] rounded-lg px-4 py-3.5 text-white focus:outline-none focus:border-[#404040] transition-colors font-medium text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-[#22c55e] hover:bg-[#16a34a] text-[#052e16] font-black py-4 rounded-lg transition-all flex items-center justify-center gap-3 uppercase tracking-tight text-sm ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-[#052e16]/30 border-t-[#052e16] rounded-full animate-spin" />
              ) : (
                "System Access"
              )}
            </button>
          </div>
        </form>

        <div className="mt-8 flex justify-center gap-6">
          <span className="text-[#404040] text-[10px] font-bold uppercase tracking-widest italic">
            V1.0.4-MVP
          </span>
          <span className="text-[#404040] text-[10px] font-bold uppercase tracking-widest">
            Build 2024.12
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
