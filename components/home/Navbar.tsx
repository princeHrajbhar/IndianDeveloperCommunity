"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Menu, X, ChevronDown, Zap, User } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()

  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  // ✅ Scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // ✅ Auth check (with refresh token)
  const checkAuth = async () => {
    try {
      let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
        credentials: "include",
      })

      // 🔥 If access token expired → refresh
      if (res.status === 401) {
        const refreshRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
          {
            method: "POST",
            credentials: "include",
          }
        )

        if (!refreshRes.ok) {
          setUser(null)
          return
        }

        // retry
        res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
          credentials: "include",
        })
      }

      if (!res.ok) {
        setUser(null)
      } else {
        const data = await res.json()
        setUser(data.data)
      }
    } catch {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkAuth()

    // 🔥 Listen for login/logout changes globally
    const handler = () => checkAuth()
    window.addEventListener("authChanged", handler)

    return () => window.removeEventListener("authChanged", handler)
  }, [])

  // ✅ Logout
  const handleLogout = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    })

    setUser(null)
    window.dispatchEvent(new Event("authChanged")) // 🔥 update navbar everywhere
    router.push("/login")
  }

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    { name: "Careers", href: "/careers" },
  ]

  return (
    <nav
      className={`
        fixed w-full z-50 transition-all duration-500 font-mono
        ${
         isScrolled
  ? "bg-black/80 backdrop-blur-md shadow-md"
  : "bg-transparent"
        }
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

        {/* ✅ RIGHT SIDE (Dynamic) */}
        <div className="hidden md:flex items-center space-x-4">

          {loading ? (
            <span className="text-gray-400 text-sm">...</span>
          ) : user ? (
            <Link
              href="/profile"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:scale-105 transition"
            >
              {/* 🔥 Option 1: Icon */}
              <User className="text-white w-5 h-5" />

              {/* 🔥 Option 2 (better): Uncomment to use initial */}
              {/* <span className="text-white font-bold">
                {user.userId?.charAt(0).toUpperCase()}
              </span> */}
            </Link>
          ) : (
            <Link
              href="/login"
              className="px-5 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-sm font-semibold"
            >
              Login
            </Link>
          )}
        </div>

        {/* 📱 Mobile Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(true)}
        >
          <Menu size={26} />
        </button>
      </div>

      {/* 🔥 MOBILE DRAWER */}
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
              className="fixed top-0 left-0 h-full w-[80%] max-w-sm bg-black z-50 p-6 font-mono"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-10">
                <span className="text-lg font-bold text-cyan-400">
                  Aadharix
                </span>
                <button onClick={() => setIsOpen(false)}>
                  <X size={24} />
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

                {/* ✅ Mobile Auth */}
                {user ? (
                  <Link
                    href="/profile"
                    onClick={() => setIsOpen(false)}
                    className="text-lg hover:text-cyan-400"
                  >
                    Profile
                  </Link>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="text-lg hover:text-cyan-400"
                  >
                    Login
                  </Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  )
}