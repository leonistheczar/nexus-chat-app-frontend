"use client";

import { motion } from "framer-motion";

export default function SignUp() {
  return (
    <motion.form
      key="signup"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.35 }}
      className="space-y-4"
    >
      <h2 className="text-2xl font-semibold">Create Account</h2>
      <div className="flex flex-col gap-4">
        <input type="text" placeholder="Full Name" className="input" />
        <input type="email" placeholder="Email" className="input" />
        <input type="password" placeholder="Password" className="input" />

        <button className="btn-primary">Sign Up</button>
      </div>
    </motion.form>
  );
}
