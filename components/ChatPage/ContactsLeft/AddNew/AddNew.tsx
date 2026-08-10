"use client";

import { useChatContacts } from "@/lib/providers/ChatProvider";
import { AnimatePresence, motion } from "framer-motion";
import { UserPlus, Users } from "lucide-react";
import { performServerHandshake } from "node:http2";

type AddNewPropsTypes = {
  addNewDropDown: boolean;
  setOpenNewUser?: React.Dispatch<React.SetStateAction<boolean>>
};

export default function AddNew({ addNewDropDown }: AddNewPropsTypes) {
  const {
    openNewUser,
    setOpenNewUser,
    isCreateGroupOpen,
    setIsCreateGroupOpen,
  } = useChatContacts();
  return (
    <AnimatePresence>
      {addNewDropDown && (
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
          className="absolute z-99 left-0 w-56 bg-secondary-100 px-3 py-4 rounded-xl flex flex-col gap-y-1 shadow-md"
        >
            <button className="p-2 flex w-full self-stretch gap-x-2 items-center hover:cursor-pointer hover:bg-primary-300/50 rounded-lg"
            onClick={()=>setOpenNewUser(!openNewUser)}><UserPlus size={22} /><p>Add New User</p></button>
            <button className="p-2 flex w-full self-stretch gap-x-2 items-center hover:cursor-pointer hover:bg-primary-300/50 rounded-lg"
            onClick={()=>setIsCreateGroupOpen(!isCreateGroupOpen)}><Users size={22} /><p>Create New Group</p></button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
