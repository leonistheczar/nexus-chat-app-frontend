"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Sidebar() {
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
            <li className="group cursor-pointer" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
              <div className="flex items-center gap-1 relative group">
                <Link href="/features">Features</Link>
                <motion.span animate={{rotate: open ? 180 : 0}} transition={{duration: 0.2}}>
                <ChevronDown size={16} />
                  </motion.span>
                <AnimatePresence>
                  {open && (
                <motion.div initial={{opacity: 0, y:10, scale: 0.95}} animate={{opacity:1, y:0, scale:1 }} exit={{opacity: 0, y:10, scale:0.95}} transition={{duration: 0.2}}             className="absolute top-8 left-0 w-64 bg-primary-200 p-4 rounded-xl shadow-lg z-50">
                  <div className="flex flex-col gap-3 text-sm">
                  <span className="font-medium text-primary-900">Messaging</span>
                  <span className="text-primary-900/70">Real-time chat with seamless delivery</span>
                  <span className="font-medium text-primary-900 mt-2">Security</span>
                  <span className="text-primary-900/70">End-to-end encrypted conversations</span>
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
          className="bg-background-400 cursor-pointer text-slate-50 p-2 rounded-md w-10 h-10 flex items-center justify-center relative transition hover:bg-background-500"
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
        <motion.ul variants={containerVariants} initial="hidden" animate={mobileNav ? "visible" : "hidden"} className="flex flex-col gap-y-6 px-6 mt-6">
          <motion.li variants={itemVariants}>
            <Link className="transition-all hover:text-text-600" onClick={() => setMobileNav(false)} href="/">
              Home
            </Link>
          </motion.li>
          <motion.li variants={itemVariants}>
            <Link className="transition-all hover:text-text-600" onClick={() => setMobileNav(false)} href="/features">
              Features
            </Link>
          </motion.li>
          <motion.li variants={itemVariants}>
            <Link className="transition-all hover:text-text-600" onClick={() => setMobileNav(false)} href="/about">
              About Us
            </Link>
          </motion.li>
          <motion.li variants={itemVariants}>
            <Link className="transition-all hover:text-text-600" onClick={() => setMobileNav(false)} href="/contact">
              Contact Us
            </Link>
          </motion.li>
        </motion.ul >
      </nav>
    </>
  );
}