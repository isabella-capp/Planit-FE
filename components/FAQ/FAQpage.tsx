"use client";
import { motion } from "framer-motion";
import { useState } from "react";

import { ChevronRight } from "lucide-react";
import faqData from "./faqData";
import FAQItem from "./FAQItem";

const FAQPage = () => {
    const [activeFaq, setActiveFaq] = useState(1);

    const handleFaqToggle = (id: number) => {
        activeFaq === id ? setActiveFaq(0) : setActiveFaq(id);
    };

    return (
        <>
            {/* <!-- ===== FAQ Start ===== --> */}
            <section className="overflow-hidden h-full pb-20 lg:pb-25 xl:pb-30">
                <div className="relative mx-auto max-w-c-1390 px-7.5 pt-10 lg:px-15 lg:pt-15 xl:px-20 xl:pt-20 lg:flex-row">
                    <div className="mt-10 mb-10 lg:mt-0">
                        <h2 className="text-sectiontitle4 text-center mb-3 font-bold text-black dark:text-white">FAQ</h2>
                        <div className="flex gap-3 justify-end lg:flex-row">
                            <p className="inline-flex items-center">Home <ChevronRight className="h-5" /> <span className="font-bold text-primary">FAQ</span></p>
                        </div>
                    </div>

                    <motion.div
                        variants={{
                            hidden: {
                                opacity: 0,
                                y: -20,
                            },
                            visible: {
                                opacity: 1,
                                y: 0,
                            },
                        }}
                        initial="hidden"
                        whileInView="visible"
                        transition={{ duration: 1, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="animate_right flex items-center justify-center md:w-3/5 lg:w-2/3 mx-auto"
                    >
                        <div className="rounded-lg bg-white shadow-solid-8 dark:border dark:border-strokedark dark:bg-blacksection w-full">
                            {faqData.map((faq, key) => (
                                <FAQItem
                                    key={key}
                                    faqData={{ ...faq, activeFaq, handleFaqToggle }}
                                />
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>
            {/* <!-- ===== FAQ End ===== --> */}
        </>
    );
};

export default FAQPage;
