import Link from 'next/link';
import { Film } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-sky-500 hover:text-sky-400 transition-colors">
          <Film className="w-6 h-6" />
          <span>KinoFree</span>
        </Link>
        
        <div className="flex items-center gap-4">
          <Link href="/search" className="text-slate-300 hover:text-white transition-colors">
            Поиск
          </Link>
        </div>
      </div>
    </nav>
  );
}

