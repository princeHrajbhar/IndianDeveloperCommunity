"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { ChevronDown, Settings, Menu, X } from "lucide-react"

export default function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

useEffect(() => {
  let lastScroll = 0

  const handleScroll = () => {
    const currentScroll = window.scrollY

    if (currentScroll > lastScroll) {
      console.log("Scrolling Down")
    } else {
      console.log("Scrolling Up")
    }

    if (currentScroll > 20) {
      setIsScrolled(true)
    } else {
      setIsScrolled(false)
    }

    lastScroll = currentScroll
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
    fixed w-full z-50
    transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]
    ${isScrolled
      ? "bg-black border-b border-white/10"
      : "bg-transparent border-transparent"}
  `}
>
      <div
        className={`
          max-w-7xl mx-auto px-6 py-4 flex items-center justify-between
          transition-all duration-700
          ${isScrolled ? "py-3" : "py-5"}
        `}
      >

        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white">
            SG
          </div>
          <span className="text-white text-xl font-semibold">
            Site<span className="text-blue-500">Guru</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-10 text-gray-300 font-medium">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className="relative group hover:text-white transition duration-300"
              >
                {item.name}

                {item.name === "Services" && (
                  <ChevronDown size={16} className="inline ml-1 opacity-70" />
                )}

                {isActive && (
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-blue-500 rounded-full transition-all duration-500"></span>
                )}
              </Link>
            )
          })}
        </div>

        {/* Right Section */}
        <div className="hidden md:flex items-center space-x-4">

          <button className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:bg-white/10 transition duration-300">
            <Settings size={18} />
          </button>

          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-blue-700 flex items-center justify-center text-white font-semibold">
            P
          </div>

          <Link
            href="/contact"
            className="px-6 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-700 text-white font-medium shadow-lg hover:scale-105 transition duration-300"
          >
            🚀 Start a Project
          </Link>
        </div>

        {/* Mobile Button */}
        <div className="md:hidden text-white">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-[#0b1120] border-t border-white/10 px-6 py-6 space-y-4 text-gray-300">
          {navItems.map((item) => (
            <Link key={item.name} href={item.href} className="block">
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}