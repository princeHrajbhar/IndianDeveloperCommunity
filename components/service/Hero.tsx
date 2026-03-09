"use client"

import { motion } from "framer-motion"
import { HiOutlineRocketLaunch } from "react-icons/hi2"
import { HiOutlineArrowDown } from "react-icons/hi"
import { HiOutlineDeviceMobile } from "react-icons/hi"
import { HiOutlineSearch } from "react-icons/hi"
import { HiOutlineLightningBolt } from "react-icons/hi"

export default function Hero() {
  return (
    <section className="relative bg-[#05070d] text-white overflow-hidden pt-24 pb-20">

      {/* Cyber grid background */}
      <div className="absolute inset-0 opacity-30
      bg-[linear-gradient(rgba(0,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.08)_1px,transparent_1px)]
      bg-[size:40px_40px]" />

      {/* glow orb */}
      <div className="absolute -top-40 left-1/2 w-[600px] h-[600px] bg-cyan-500/10 blur-[140px] rounded-full" />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center relative z-10">

        {/* LEFT CONTENT */}
        <div>

          {/* badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
          border border-cyan-400/40 bg-cyan-400/10 text-xs mb-5 font-mono tracking-wider text-cyan-300">
            ⚡ CYBER AI SYSTEMS
          </div>

          {/* heading */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-5">

            Intelligent Platforms
            <br />

            <span className="text-white">
              Built for the
            </span>

            <br />

            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 text-transparent bg-clip-text">
              AI-Driven Future
            </span>

          </h1>

          {/* description */}
          <p className="text-gray-400 max-w-lg mb-8 text-base leading-relaxed">
            We design cyber-grade digital infrastructure powered by AI.
            Every system is optimized for speed, intelligence and
            scalable architecture built for the next generation of web.
          </p>

          {/* buttons */}
          <div className="flex gap-4 flex-wrap">

            <button className="flex items-center gap-2 px-6 py-3 rounded-lg
            bg-gradient-to-r from-cyan-500 to-blue-500
            hover:scale-105 transition
            shadow-[0_0_25px_rgba(0,255,255,0.35)] text-sm">

              <HiOutlineRocketLaunch />
              Start AI Project

            </button>

            <button className="flex items-center gap-2 px-6 py-3 rounded-lg
            border border-cyan-400/30 bg-white/5
            hover:bg-white/10 transition text-sm">

              Explore Process
              <HiOutlineArrowDown />

            </button>

          </div>
        </div>


        {/* RIGHT SIDE UI MOCK */}
        <div className="relative">

          {/* browser */}
          <div className="bg-white/5 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-5 h-[320px]">

            <div className="flex gap-2 mb-5">
              <span className="w-3 h-3 bg-red-400 rounded-full"/>
              <span className="w-3 h-3 bg-yellow-400 rounded-full"/>
              <span className="w-3 h-3 bg-green-400 rounded-full"/>
            </div>

            <div className="space-y-3">
              <div className="h-3 bg-white/10 rounded w-2/3"/>
              <div className="h-3 bg-white/10 rounded w-full"/>
              <div className="h-3 bg-white/10 rounded w-5/6"/>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-8">
              <div className="h-16 bg-white/10 rounded"/>
              <div className="h-16 bg-white/10 rounded"/>
              <div className="h-16 bg-white/10 rounded"/>
            </div>

          </div>


          {/* AI performance */}
          <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{ repeat: Infinity, duration: 5 }}
            className="absolute -top-5 right-0 bg-black/60 backdrop-blur-lg border border-cyan-400/30 rounded-lg px-3 py-2 shadow-[0_0_15px_rgba(0,255,255,0.3)]"
          >
            <div className="flex items-center gap-2">
              <div className="bg-cyan-500 p-1.5 rounded">
                <HiOutlineLightningBolt />
              </div>
              <div>
                <p className="text-xs font-semibold text-cyan-300">AI Optimized</p>
                <p className="text-[10px] text-gray-400">Ultra Performance</p>
              </div>
            </div>
          </motion.div>


          {/* SEO intelligence */}
          <motion.div
            animate={{ y: [10, -10, 10] }}
            transition={{ repeat: Infinity, duration: 6 }}
            className="absolute right-[-30px] top-[140px] bg-black/60 backdrop-blur-lg border border-purple-400/30 rounded-lg px-3 py-2 shadow-[0_0_15px_rgba(168,85,247,0.3)]"
          >
            <div className="flex items-center gap-2">
              <div className="bg-purple-500 p-1.5 rounded">
                <HiOutlineSearch />
              </div>
              <div>
                <p className="text-xs font-semibold text-purple-300">SEO AI</p>
                <p className="text-[10px] text-gray-400">Rank Intelligence</p>
              </div>
            </div>
          </motion.div>


          {/* responsive system */}
          <motion.div
            animate={{ y: [-8, 8, -8] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="absolute bottom-[-15px] left-[40px] bg-black/60 backdrop-blur-lg border border-blue-400/30 rounded-lg px-3 py-2 shadow-[0_0_15px_rgba(59,130,246,0.3)]"
          >
            <div className="flex items-center gap-2">
              <div className="bg-blue-500 p-1.5 rounded">
                <HiOutlineDeviceMobile />
              </div>
              <div>
                <p className="text-xs font-semibold text-blue-300">Adaptive UI</p>
                <p className="text-[10px] text-gray-400">All Devices</p>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  )
}