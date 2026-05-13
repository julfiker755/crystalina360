"use client"
import { ArrowRight, ArrowRightCircle, ShieldCheck, User, UserRound } from 'lucide-react'
import { motion } from 'framer-motion'
import React from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'


export default function UserAccess() {
    const t = useTranslations("oprator.home.organizer");
    return (
        <section className="mt-24 container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                {/* Left Column: Descriptive text and features */}
                <div className="text-left">
                    <h2 className="text-4xl md:text-5xl font-bold text-text-dark mb-6 leading-tight">
                        {t("title.first")} <br />
                        <span className="text-text-muted italic text-primary">{t("title.second")}</span> {t("title.third")}
                    </h2>
                    <p className="text-text-muted text-lg mb-10 leading-relaxed max-w-lg">
                        {t("text")}
                    </p>

                    <ul className="space-y-6">
                        <li className="flex items-center gap-4 group">
                            <div className="w-10 h-10 rounded-full  flex items-center justify-center bg-primary/10 text-primary transition-colors">
                                <ShieldCheck className="w-5 h-5" />
                            </div>
                            <span className="font-medium text-text-dark">{t("secure_ticket_booking_payments")}</span>
                        </li>
                        <li className="flex items-center gap-4 group">
                            <div className="w-10 h-10 rounded-full  flex items-center justify-center bg-primary/10 text-primary transition-colors">
                                <User className="w-5 h-5" />
                            </div>
                            <span className="font-medium text-text-dark">{t("personalized_event_recommendations")}</span>
                        </li>
                        <li className="flex items-center gap-4 group">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-primary/10 text-primary transition-colors">
                                <ArrowRightCircle className="w-5 h-5" />
                            </div>
                            <span className="font-medium text-text-dark">{t("easy_attendance_management")}</span>
                        </li>
                    </ul>
                </div>

                {/* Right Column: Interaction Card */}
                <div className="relative">
                    <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full transform -translate-x-1/4"></div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative rounded-[3rem] p-12 border border-border/50 text-center"
                    >
                        <div className="w-24 h-24 bg-[#A68F80] rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                            <UserRound className="w-12 h-12 text-white" />
                        </div>

                        <h3 className="text-3xl font-bold text-slate-800 mb-4">{t("standard_user_access")}</h3>
                        <p className="text-text-muted mb-10 leading-relaxed max-w-xs mx-auto">
                            {t("text1")}
                        </p>

                        <Link
                            href="/"
                            className="w-full bg-primary/90 text-white py-5 rounded-full font-bold transition-all flex items-center justify-center gap-3 group"
                        >
                            {t("btn_text")}  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>

                        <p className="mt-10 text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em]">
                            {t("btn_sub")}
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}


// "use client";
// import { motion } from "motion/react";
// import { User, ArrowRight, Shield, Zap, Search, Bookmark, Globe, Star } from "lucide-react";

// export default function UserAccess() {
//     return (
//         <section className="py-32 px-6" id="continue-user">
//             <div className="max-w-7xl mx-auto">
//                 <div className="grid lg:grid-cols-2 gap-20 items-center">
//                     <motion.div
//                         initial={{ opacity: 0, x: -30 }}
//                         whileInView={{ opacity: 1, x: 0 }}
//                         viewport={{ once: true }}
//                         className="space-y-10"
//                     >
//                         <div className="space-y-6">
//                             <h2 className="text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight text-[#1a1a1a]">
//                                 Not an organizer? <br />
//                                 <span className="text-brand italic text-primary">Explore events</span> as a user
//                             </h2>
//                             <p className="text-gray-500 text-xl leading-relaxed max-w-lg">
//                                 If you're looking for exciting events to attend, you can continue as a regular user.
//                                 Browse through thousands of events, book tickets instantly, and manage your attendance.
//                             </p>
//                         </div>

//                         <div className="grid sm:grid-cols-2 gap-6">
//                             {[
//                                 { icon: Shield, title: "Secure Booking", desc: "End-to-end encrypted payments" },
//                                 { icon: Search, title: "Easy Discovery", desc: "Find events near you in seconds" },
//                                 { icon: Bookmark, title: "Save Favorites", desc: "Never miss an event you love" },
//                                 { icon: User, title: "Personal Profile", desc: "Manage all your tickets in one place" }
//                             ].map((item, i) => (
//                                 <div key={i} className="flex gap-4">
//                                     <div className="w-12 h-12 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center text-brand">
//                                         <item.icon className="w-5 h-5" />
//                                     </div>
//                                     <div className="space-y-1">
//                                         <h4 className="font-bold text-[#1a1a1a]">{item.title}</h4>
//                                         <p className="text-sm text-gray-400 leading-tight">{item.desc}</p>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </motion.div>

//                     <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
//                         {/* Section 1: Explore */}
//                         <motion.div
//                             initial={{ opacity: 0, y: 20 }}
//                             whileInView={{ opacity: 1, y: 0 }}
//                             viewport={{ once: true }}
//                             className="bg-white p-8 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-gray-50 flex flex-col gap-6 hover:shadow-2xl hover:border-brand/20 transition-all group relative overflow-hidden"
//                         >
//                             <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50/50 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
//                             <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform relative z-10">
//                                 <Search size={24} />
//                             </div>
//                             <div className="space-y-2 relative z-10">
//                                 <div className="flex items-center gap-2">
//                                     <h3 className="text-xl font-bold text-[#1a1a1a]">Smart Search</h3>
//                                     <span className="bg-blue-100 text-blue-600 text-[8px] font-black uppercase px-2 py-0.5 rounded-full">New</span>
//                                 </div>
//                                 <p className="text-gray-400 text-sm leading-relaxed">AI-powered discovery based on your unique interests.</p>
//                             </div>
//                         </motion.div>

//                         {/* Section 2: Book */}
//                         <motion.div
//                             initial={{ opacity: 0, y: 20 }}
//                             whileInView={{ opacity: 1, y: 0 }}
//                             viewport={{ once: true }}
//                             transition={{ delay: 0.1 }}
//                             className="bg-white p-8 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-gray-50 flex flex-col gap-6 hover:shadow-2xl hover:border-brand/20 transition-all group md:mt-8 relative overflow-hidden"
//                         >
//                             <div className="absolute top-0 right-0 w-24 h-24 bg-orange-50/50 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
//                             <div className="w-14 h-14 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center group-hover:scale-110 transition-transform relative z-10">
//                                 <Zap size={24} />
//                             </div>
//                             <div className="space-y-2 relative z-10">
//                                 <h3 className="text-xl font-bold text-[#1a1a1a]">Instant Booking</h3>
//                                 <p className="text-gray-400 text-sm leading-relaxed">Secure tickets in seconds with unified checkout.</p>
//                             </div>
//                         </motion.div>

//                         {/* Section 3: Community */}
//                         <motion.div
//                             initial={{ opacity: 0, y: 20 }}
//                             whileInView={{ opacity: 1, y: 0 }}
//                             viewport={{ once: true }}
//                             transition={{ delay: 0.2 }}
//                             className="bg-white p-8 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-gray-50 flex flex-col gap-6 hover:shadow-2xl hover:border-brand/20 transition-all group relative overflow-hidden"
//                         >
//                             <div className="absolute top-0 right-0 w-24 h-24 bg-purple-50/50 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
//                             <div className="flex -space-x-3 mb-2 relative z-10">
//                                 {[1, 2, 3].map(i => (
//                                     <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 overflow-hidden shadow-sm">
//                                         <img src={`https://i.pravatar.cc/150?u=${i + 80}`} alt="avatar" />
//                                     </div>
//                                 ))}
//                                 <div className="w-10 h-10 rounded-full border-2 border-white bg-brand text-white flex items-center justify-center text-[10px] font-bold">
//                                     +12k
//                                 </div>
//                             </div>
//                             <div className="space-y-2 relative z-10">
//                                 <h3 className="text-xl font-bold text-[#1a1a1a]">Live Feed</h3>
//                                 <p className="text-gray-400 text-sm leading-relaxed">See what others are hyped about right now.</p>
//                             </div>
//                         </motion.div>

//                         {/* Section 4: Action Card */}
//                         <motion.div
//                             initial={{ opacity: 0, y: 20 }}
//                             whileInView={{ opacity: 1, y: 0 }}
//                             viewport={{ once: true }}
//                             transition={{ delay: 0.3 }}
//                             className="bg-[#1a1a1a] p-8 rounded-[3rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)] flex flex-col justify-between group hover:bg-brand transition-all md:mt-8 cursor-pointer"
//                         >
//                             <div className="flex justify-between items-start">
//                                 <div className="w-14 h-14 rounded-2xl bg-white/10 text-white flex items-center justify-center group-hover:bg-white group-hover:text-brand transition-all">
//                                     <User size={28} strokeWidth={1.5} />
//                                 </div>
//                                 <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/20 transition-all">
//                                     <ArrowRight className="text-white group-hover:translate-x-1 transition-transform" size={20} />
//                                 </div>
//                             </div>
//                             <div className="pt-10">
//                                 <h3 className="text-2xl font-bold text-white mb-2 leading-tight">Continue as <br /> a user</h3>
//                                 <div className="flex items-center gap-2 text-white/40 group-hover:text-white/80 transition-colors">
//                                     <Globe size={12} />
//                                     <span className="text-[10px] font-black uppercase tracking-widest leading-none">Enter Platform</span>
//                                 </div>
//                             </div>
//                         </motion.div>
//                         <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-brand/5 blur-[120px] rounded-full" />
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// }
