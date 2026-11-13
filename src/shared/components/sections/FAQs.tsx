"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiMinus, FiPlus } from "react-icons/fi";
import { SectionContainer, SectionHeader } from "@/components";

type FAQItem = {
  question: string;
  answer: string;
};

interface FAQsProps {
  faqs: FAQItem[];
  initialOpenIndex?: number;
}

const FAQs = ({ faqs, initialOpenIndex = 0 }: FAQsProps) => {
  const [openIndex, setOpenIndex] = useState(initialOpenIndex);

  const toggleItem = (index: number) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <section id="faq" className="relative overflow-hidden ">
      <SectionContainer>
        <div className="grid gap-8 sm:gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -40, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.85, ease: "easeOut" }}
            className="relative z-10"
          >
            <SectionHeader
              align="left"
              className="[&>div]:justify-center lg:[&>div]:justify-start"
              lines={[{ text: "FREQUENTLY" }, { text: "ASKED QUESTIONS" }]}
            />
          </motion.div>

          <div className="relative z-10 space-y-4 sm:space-y-6 md:space-y-10">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <motion.div
                  key={`${faq.question}-${index}`}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: index * 0.06, ease: "easeOut" }}
                  className={`overflow-hidden rounded-[12px] transition-all duration-500 ${isOpen
                    ? "bg-secondary text-white shadow-surface-md-soft"
                    : "bg-white text-headingSpecial"
                    }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleItem(index)}
                    className="flex w-full items-start gap-3 px-4 py-4 text-left sm:items-center sm:px-5 sm:py-5 md:px-6 cursor-pointer"
                  >
                    <span className="mt-1 flex w-5 shrink-0 justify-center text-base sm:mt-0.5 sm:text-lg">
                      <AnimatePresence mode="wait">
                        {!isOpen && (
                          <motion.span
                            key="plus"
                            initial={{ opacity: 0, scale: 0.6, rotate: -90 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            exit={{ opacity: 0, scale: 0.6, rotate: 90 }}
                            transition={{ duration: 0.22, ease: "easeOut" }}
                          >
                            <FiPlus />
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </span>
                    <span className="text-lg font-medium leading-snug sm:text-xl md:text-2xl md:leading-7">
                      {faq.question}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 shadow-soft-lg sm:px-5 sm:pb-5 md:px-6 md:pb-6">
                          <div className="flex items-start gap-3 sm:items-center sm:gap-4">
                            <span className="mt-0.5 text-base leading-none sm:text-lg">
                              <FiMinus />
                            </span>

                            <p className="text-sm leading-6 text-white/90 sm:text-base sm:leading-7">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </SectionContainer>
    </section>
  );
};

export default FAQs;