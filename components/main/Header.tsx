"use client";

import { User } from "@supabase/supabase-js";
import { motion } from "motion/react";

const Header = ({ user }: { user: User }) => {
  return (
    <header className="py-8 px-4 min-[450px]:px-8 min-[500px]:px-12 flex justify-end">
      <div className="">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.3, ease: "easeInOut" }}
          className="text-gray-200 text-end text-xl min-[450px]:text-2xl font-medium select-none"
        >
          &quot;Your focus today defines your <br /> success tomorrow,{" "}
          <span className="font-bold text-white">
            {user.user_metadata.first_name}
          </span>
          &quot;
        </motion.p>
      </div>
    </header>
  );
};

export default Header;
