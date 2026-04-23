"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Sidebar() {
  const [mobileNav, setMobileNav] = useState(false);

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden sm:block px-6 m-6 bg-background-100 rounded-xl shadow-sm">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative block w-24 h-24">
            <Image
              src="/logo/nexus-logo.png"
              alt="Nexus Logo"
              fill
              priority
              sizes="145px"
              className="object-contain"
            />
          </Link>

          {/* Links */}
          <ul className="flex gap-x-6 items-center">
            <li className="group cursor-pointer">
              <div className="flex items-center gap-1">
                <Link href="/features">Features</Link>
                <ChevronDown size={16} />
              </div>
              <div className="w-0 h-0.5 bg-primary-300 transition-all duration-300 group-hover:w-full"></div>
            </li>

            <li className="group cursor-pointer">
              <Link href="/about">About</Link>
              <div className="w-0 h-0.5 bg-primary-300 transition-all duration-300 group-hover:w-full"></div>
            </li>

            <li className="group cursor-pointer">
              <Link href="/contact">Contact</Link>
              <div className="w-0 h-0.5 bg-primary-300 transition-all duration-300 group-hover:w-full"></div>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile Top Bar */}
      <div className="flex items-center justify-between sm:hidden px-6 m-6 max-w-xl bg-background-100 rounded-xl shadow-sm relative z-30">
        {/* Logo */}
        <Link href="/" className="relative block w-20 h-20">
          <Image
            src="/logo/nexus-logo.png"
            alt="Nexus Logo"
            fill
            priority
            sizes="120px"
            className="object-contain"
          />
        </Link>

        {/* Menu Button */}
        <button
          aria-label="Toggle menu"
          className="bg-background-400 text-slate-50 p-2 rounded-md w-10 h-10 flex items-center justify-center relative"
          onClick={() => setMobileNav(!mobileNav)}
        >
          <Menu
            className={`absolute transition-all duration-300 ${
              mobileNav
                ? "opacity-0 rotate-90 scale-75"
                : "opacity-100 rotate-0 scale-100"
            }`}
          />

          <X
            className={`absolute transition-all duration-300 ${
              mobileNav
                ? "opacity-100 rotate-0 scale-100"
                : "opacity-0 -rotate-90 scale-75"
            }`}
          />
        </button>
      </div>

      {/* Overlay */}
      {mobileNav && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileNav(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <nav
        className={`fixed top-0 left-0 sm:hidden w-1/2 h-dvh bg-background-100 z-50 transform transition-transform duration-300 ${
          mobileNav ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button onClick={() => setMobileNav(false)}>
            <X className="transition-all hover:text-secondary-600 hover:cursor-pointer" />
          </button>
        </div>

        {/* Links */}
        <ul className="flex flex-col gap-y-6 px-6 mt-6">
          <li>
            <Link className="transition-all hover:text-text-600" onClick={() => setMobileNav(false)} href="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="transition-all hover:text-text-600" onClick={() => setMobileNav(false)} href="/features">
              Features
            </Link>
          </li>
          <li>
            <Link className="transition-all hover:text-text-600" onClick={() => setMobileNav(false)} href="/about">
              About Us
            </Link>
          </li>
          <li>
            <Link className="transition-all hover:text-text-600" onClick={() => setMobileNav(false)} href="/contact">
              Contact Us
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}