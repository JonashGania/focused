"use client";

import { User } from "@supabase/supabase-js";
import { motion } from "motion/react";
import { Clock } from "lucide-react";

const Header = ({ user }: { user: User }) => {
  const firstName = user.user_metadata.first_name;

  return (
    <header className="relative py-8 px-4 min-[450px]:px-8 min-[500px]:px-12">
      {/* Decorative elements */}

      <div className="flex justify-end items-center">
        {/* Motivational quote */}
        <div className="flex-1 max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="text-right"
          >
            <div className="relative inline-block">
              {/* Quote background */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 rounded-xl blur-sm" />

              <div className="relative px-6 py-4 rounded-xl backdrop-blur-sm border border-white/10">
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="flex items-start gap-2"
                >
                  <Clock className="w-5 h-5 text-white/80 mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-white/90 text-lg min-[450px]:text-xl font-medium leading-relaxed">
                      &quot;Your focus today defines your{" "}
                      <br className="hidden min-[450px]:block" />
                      success tomorrow,{" "}
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="font-bold text-white relative"
                      >
                        {firstName}
                        <motion.div
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 0.6, delay: 1.2 }}
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-white/50 to-transparent origin-left"
                        />
                      </motion.span>
                      &quot;
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  );
};

export default Header;
