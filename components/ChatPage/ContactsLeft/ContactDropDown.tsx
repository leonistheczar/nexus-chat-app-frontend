"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Settings, MessageSquare, LogOut } from "lucide-react";

export default function ContactDropDown({open}: {open: boolean}){
    return(
        <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            initial={{
              opacity: 0,
              y: -8,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -8,
              scale: 0.95,
            }}
            transition={{
              duration: 0.15,
              ease: "easeOut",
            }}
            className="absolute z-50 left-0 mt-2 w-48 bg-secondary-100 px-3 py-4 rounded-xl flex flex-col gap-y-1 shadow-md"
          >
            <motion.button
              whileTap={{ scale: 0.97 }}
              className="p-2 flex gap-x-2 items-center hover:cursor-pointer hover:bg-primary-300/50 rounded-lg transition"
            >
              <Settings size={20} />
              <span>Settings</span>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.97 }}
              className="p-2 flex gap-x-2 items-center hover:cursor-pointer hover:bg-primary-300/50 rounded-lg transition"
            >
              <MessageSquare size={20} />
              <span>Mark all as read</span>
            </motion.button>

            <div className="w-full h-px bg-slate-800/40 my-1" />

            <motion.button
              whileTap={{
                scale: 0.97,
              }}
              className="group hover:cursor-pointer p-2 flex gap-x-2 items-center rounded-lg transition"
            >
              <LogOut
                size={20}
                className="group-hover:text-red-500 transition-colors"
              />
              <span className="group-hover:text-red-500 transition-colors">
                Logout
              </span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    )
}