"use client";

import { AnimatePresence, motion, Variant, VariantLabels, Variants } from "framer-motion";
import { useEffect } from "react";

type LogoutModalProps = {
  open: boolean;
  onClose: () => void;
  onLogout: () => void;
};

const backdropVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.18,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.15,
      ease: "easeIn",
    },
  },
};

const modalVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.96,
    y: 24,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 380,
      damping: 28,
      mass: 0.9,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: 16,
    transition: {
      duration: 0.18,
      ease: "easeInOut",
    },
  },
};

export default function LogoutModal({
  open,
  onClose,
  onLogout,
}: LogoutModalProps) {
  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence mode="wait">
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <motion.div
            layout
            variants={modalVariants}
            onClick={(e) => e.stopPropagation()}
            className="
              w-full
              max-w-md
              rounded-2xl
              bg-background-100
              text-text-800
              p-7
            "
          >
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">
                Logout
              </h2>

              <p className="text-sm leading-6 text-primary-800">
                Are you sure you want to logout from your account?
              </p>
            </div>

            <div className="mt-7 flex justify-end gap-3">
              <motion.button
                whileTap={{
                  scale: 0.98,
                }}
                transition={{
                  duration: 0.15,
                }}
                onClick={onClose}
                className="
                  rounded-lg
                  bg-background-200
                  px-4
                  py-2
                  text-sm
                  font-medium
                  transition-colors
                  hover:bg-background-300
                  cursor-pointer
                "
              >
                Cancel
              </motion.button>

              <motion.button
                whileTap={{
                  scale: 0.98,
                }}
                transition={{
                  duration: 0.15,
                }}
                onClick={onLogout}
                className="
                  rounded-lg
                  bg-red-500
                  px-4
                  py-2
                  text-sm
                  font-medium
                  text-text-50
                  transition-colors
                  hover:bg-red-600
                  active:bg-red-700
                  cursor-pointer
                "
              >
                Logout
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}