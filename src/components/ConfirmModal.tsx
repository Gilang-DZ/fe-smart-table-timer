import type { ConfirmModalProps } from "../types/modal";


export default function ConfirmModal({ isOpen, tableName, onConfirm, onCancel }: ConfirmModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md animate-in fade-in duration-300" onClick={onCancel} />
      <div className="relative w-full max-w-sm bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] p-8 shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
        {/* ... (Isi polesan modal yang super keren tadi) ... */}
        <h3 className="text-2xl font-black text-white uppercase italic text-center">End Session?</h3>
        <p className="text-neutral-500 text-sm mt-3 text-center">Stop session for <span className="text-white font-bold">{tableName}</span>?</p>
        
        <div className="grid grid-cols-2 gap-4 mt-10">
          <button onClick={onCancel} className="px-4 py-4 rounded-2xl bg-white/5 text-neutral-400 text-[10px] font-black uppercase tracking-widest">Cancel</button>
          <button onClick={onConfirm} className="px-4 py-4 rounded-2xl bg-red-600 text-white text-[10px] font-black uppercase tracking-widest">Stop Sesi</button>
        </div>
      </div>
    </div>
  );
}