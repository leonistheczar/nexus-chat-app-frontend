"use client";
import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-primary-100 border-t border-primary-800/20 mt-10">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand Section */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="relative block w-20 h-20 sm:w-28 sm:h-28">
              <Image
                src="/logo/nexus-logo.png"
                alt="Nexus Logo"
                fill
                priority
                sizes="(min-width: 640px) 145px, 120px"
                className="object-contain"
              />
            </Link>

            <p className="text-sm sm:text-base text-primary-900/80 leading-relaxed">
              Nexus is a modern real-time messaging platform built for seamless
              conversations. Designed for speed, privacy, and simplicity.
            </p>
          </div>

          {/* Links Section */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-primary-900">
              Quick Links
            </h2>

            <ul className="flex flex-col gap-y-3 text-sm">
              {[
                { name: "Home", href: "/" },
                { name: "Features", href: "/features" },
                { name: "About", href: "/about" },
                { name: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.name} className="group w-fit">
                  <Link
                    href={link.href}
                    className="relative text-primary-900/80 hover:text-primary-900 transition-colors"
                  >
                    {link.name}
                    <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-primary-900 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Section */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-primary-900">
              Connect
            </h2>

            <p className="text-sm text-primary-900/70 mb-4">
              Follow Nexus and stay updated with new features and releases.
            </p>

            <ul className="flex gap-4 text-3xl">
              <li className="transition-all hover:-translate-y-1">
                <Link
                  href="https://facebook.com"
                  target="_blank"
                  className=" transition-transform"
                >
                  <FaFacebook />
                </Link>
              </li>

              <li className="transition-all hover:-translate-y-1">
                <Link
                  href="https://twitter.com"
                  target="_blank"
                  className=" transition-transform"
                >
                  <FaSquareXTwitter />
                </Link>
              </li>

              <li className="transition-all hover:-translate-y-1">
                <Link
                  href="https://linkedin.com"
                  target="_blank"
                  className=""
                >
                  <FaLinkedin />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-primary-800/20 text-center text-sm text-primary-900/70">
          © {new Date().getFullYear()} Nexus. All rights reserved.
        </div>
      </div>
    </footer>
  );
}