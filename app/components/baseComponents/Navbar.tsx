"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import ThemeToggler from "./ThemeToggler";

export default function Navbar() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };
  const itemVariants: Variants = {
    hidden: { opacity: 0, x:-20 },
    visible: {
      opacity: 1,
      x:0,
      transition: {
        duration: 0.1,
        ease: "easeIn"
      }
    }
  }
  const [mobileNav, setMobileNav] = useState(false);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden sm:block sticky top-0.5 z-50 mx-16 ">
      <nav
        className={`
          mx-6 mt-4 px-6 rounded-xl shadow-lg backdrop-blur-md
          transition-all duration-300
          ${
            scrolled
              ? "bg-primary-100/70"
              : "bg-primary-100"
          }
        `}
      >
        <div className="flex items-center justify-between space-x-6">
          {/* Logo */}
          <Link href="/" className="relative block w-28 h-28">
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
          <ul className="flex gap-x-8 items-center ">
            <li className="group cursor-pointer" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
              <div className="flex items-center gap-1 relative group">
                <Link href="/features">Features</Link>
                <motion.span animate={{rotate: open ? 180 : 0}} transition={{duration: 0.2}}>
                <ChevronDown size={16} />
                  </motion.span>
                <AnimatePresence>
                  {open && (
               <motion.div
               initial={{ opacity: 0, y: 4, scale: 0.96 }}
               animate={{ opacity: 1, y: 10, scale: 1 }}
               exit={{ opacity: 0, y: 4, scale: 0.96 }}
               transition={{ duration: 0.18, ease: "easeOut" }}
               className="absolute top-10 left-0 w-72 bg-primary-200 backdrop-blur-xl p-4 rounded-2xl shadow-xl border border-primary-100 z-50"
             >
               <div className="flex flex-col gap-4 text-sm">
             
                 {/* Messaging */}
                 <Link href="/features">
                 <div className="group flex items-start gap-3 p-2 rounded-lg hover:bg-primary-100/60 transition cursor-pointer">
                   <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-primary-100 group-hover:scale-110 transition">
                     {/* icon */}
                     <span className="text-primary-700">💬</span>
                   </div>
             
                   <div>
                     <p className="font-medium text-primary-900">
                       Real-Time Messaging
                     </p>
                     <p className="text-primary-900/70 text-xs">
                       Instant delivery with typing indicators
                     </p>
                   </div>
                 </div>
                 </Link>
             
                 {/* Encryption */}
                 <Link href="/features">
                 <div className="group flex items-start gap-3 p-2 rounded-lg hover:bg-primary-100/60 transition cursor-pointer">
                   <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-primary-100 group-hover:scale-110 transition">
                     <span className="text-primary-700">🔐</span>
                   </div>
             
                   <div>
                     <p className="font-medium text-primary-900">
                       End-to-End Encryption
                     </p>
                     <p className="text-primary-900/70 text-xs">
                       Client-side encryption with secure keys
                     </p>
                   </div>
                 </div>
                 </Link>
             
                 {/* Groups */}
                 <Link href="/features">
                 <div className="group flex items-start gap-3 p-2 rounded-lg hover:bg-primary-100/60 transition cursor-pointer">
                   <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-primary-100 group-hover:scale-110 transition">
                     <span className="text-primary-700">👥</span>
                   </div>
             
                   <div>
                     <p className="font-medium text-primary-900">
                       Smart Conversations
                     </p>
                     <p className="text-primary-900/70 text-xs">
                       P2P and mini-group chat architecture
                     </p>
                   </div>
                 </div>
                 </Link>
             
                 <Link href="/features">
                 {/* Analytics */}
                 <div className="group flex items-start gap-3 p-2 rounded-lg hover:bg-primary-100/60 transition cursor-pointer">
                   <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-primary-100 group-hover:scale-110 transition">
                     <span className="text-primary-700">📊</span>
                   </div>
             
                   <div>
                     <p className="font-medium text-primary-900">
                       Analytics Dashboard
                     </p>
                     <p className="text-primary-900/70 text-xs">
                       Monitor activity and usage insights
                     </p>
                   </div>
                 </div>
                 </Link>
             
               </div>
             </motion.div>
                  )}
                </AnimatePresence>
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
        <div className="hidden sm:block"><ThemeToggler /></div>
        </div>
      </nav>
      </div>

      {/* Mobile Top Bar */}
      <div className="block sm:hidden sticky top-0.5 z-50 mx-10 ">
      <nav
        className={`flex items-center justify-between
          mx-6 mt-4 px-6 rounded-xl shadow-lg backdrop-blur-md
          transition-all duration-300
          ${
            scrolled
              ? "bg-primary-100/70"
              : "bg-primary-100"
          }
        `}
      >
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

        <div className="flex gap-x-4">
        <div className="block sm:hidden"><ThemeToggler /></div>
        {/* Menu Buttons */}
        <button
          aria-label="Toggle menu"
          className="bg-primary-300 cursor-pointer text-slate-50 p-2 rounded-md w-10 h-10 flex items-center justify-center relative transition hover:bg-primary-400"
          onClick={() => setMobileNav(!mobileNav)}
        >
          <Menu
            className={`absolute transition-all du  ration-300 ${
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
        </nav>
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
        className={`fixed top-0 left-0 sm:hidden w-1/2 h-dvh bg-primary-100 z-50 transform transition-transform duration-300 ${
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
        <motion.ul variants={containerVariants} initial="hidden" animate={mobileNav ? "visible" : "hidden"} className="flex flex-col gap-y-6 px-6 mt-6">
          <motion.li variants={itemVariants}>
            <Link className="transition-all hover:text-secondary-600" onClick={() => setMobileNav(false)} href="/">
              Home
            </Link>
          </motion.li>
          <motion.li variants={itemVariants}>
            <Link className="transition-all hover:text-secondary-600" onClick={() => setMobileNav(false)} href="/features">
              Features
            </Link>
          </motion.li>
          <motion.li variants={itemVariants}>
            <Link className="transition-all hover:text-secondary-600" onClick={() => setMobileNav(false)} href="/about">
              About Us
            </Link>
          </motion.li>
          <motion.li variants={itemVariants}>
            <Link className="transition-all hover:text-secondary-600" onClick={() => setMobileNav(false)} href="/contact">
              Contact Us
            </Link>
          </motion.li>
        </motion.ul >
      </nav>
    </>
  );
}