"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { Menu, X, ChevronDown, Zap } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    { name: "Careers", href: "/careers" },
  ]

  return (
    <nav
      className={`
        fixed w-full z-50 transition-all duration-500
        ${isScrolled
          ? "bg-black/70 backdrop-blur-xl border-b border-cyan-500/20"
          : "bg-transparent"}
      `}
    >
      <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">

        {/* 🔷 Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center">
            <Zap className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Aadharix
          </span>
        </Link>

        {/* 💻 Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 text-gray-300 font-medium">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className="relative group hover:text-white transition"
              >
                {item.name}
                {item.name === "Services" && (
                  <ChevronDown size={14} className="inline ml-1" />
                )}

                {isActive && (
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-cyan-400 rounded-full"></span>
                )}
              </Link>
            )
          })}
        </div>

        {/* CTA */}
        <div className="hidden md:flex">
          <Link
            href="/contact"
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-sm font-semibold hover:scale-105 transition"
          >
            Start Project
          </Link>
        </div>

        {/* 📱 Mobile Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(true)}
        >
          <Menu size={26} />
        </button>
      </div>

      {/* 🔥 MOBILE SIDE DRAWER */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 25 }}
              className="fixed top-0 left-0 h-full w-[80%] max-w-sm bg-gradient-to-b from-gray-900 via-black to-black border-r border-cyan-500/20 z-50 p-6"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-10">
                <span className="text-lg font-bold text-cyan-400">
                  Aadharix
                </span>
                <button onClick={() => setIsOpen(false)}>
                  <X size={24} className="text-white" />
                </button>
              </div>

              {/* Menu */}
              <div className="flex flex-col space-y-6 text-gray-300">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-lg hover:text-cyan-400 transition"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-10">
                <Link
                  href="/contact"
                  className="block text-center px-5 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold"
                >
                  Start Project
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  )
}