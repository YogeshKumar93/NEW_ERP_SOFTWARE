export default function Header() {
  return (
    <header className="h-9 bg-indigo-700 border border-indigo-400 rounded-sm flex items-center justify-between px-4 text-xs font-semibold text-white shadow-md">
      <span className="flex items-center gap-2">
        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
        ERP GATEWAY
      </span>
      <div className="flex gap-6 opacity-90">
        <span className="cursor-pointer hover:text-yellow-300 transition-colors">F1: Help</span>
        <span className="cursor-pointer hover:text-yellow-300 transition-colors">ALT+C: Settings</span>
      </div>
    </header>
  );
}
