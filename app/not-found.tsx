"use client";

import Link from "next/link";
import Image from "next/image";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-text-900 w-full text-center rounded-2xl bg-background-50 shadow-lg">
        {/* 404 Code */}
        <h1 className="text-6xl font-black tracking-tight text-secondary-700 select-none mb-2">
          404
        </h1>

        {/* Title */}
        <h2 className="text-xl font-semibold mb-2">
          Lost in Nexus
        </h2>

        {/* Description */}
        <p className="text-sm text-text-600 mb-6">
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        {/* Actions */}
        <div className="flex items-center justify-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-x-2 px-4 py-2 rounded-lg bg-primary-100 transition-all hover:bg-primary-200"
          >
           <Home size={18} className="text-primary-600/70" /> <span>Home</span>
          </Link>
        </div>
    </div>
  );
}