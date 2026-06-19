"use client";

import { motion } from "framer-motion";

export default function SignIn() {
  return (
    <motion.form
      key="signin"
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }}
      transition={{ duration: 0.35 }}
      className="space-y-4"
    >
      <h2 className="text-2xl font-semibold">Welcome Back</h2>

      <input type="email" placeholder="Email" className="input" />
      <input type="password" placeholder="Password" className="input" />

      <button className="btn-primary hover:cursor-pointer">Sign In</button>
    </motion.form>
  );
}