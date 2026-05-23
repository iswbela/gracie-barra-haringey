"use client";

import { motion } from "framer-motion";
import { Shield, Truck, RefreshCw, Star } from "lucide-react";

const perks = [
  {
    icon: <Truck size={24} className="text-brand-400" />,
    title: "Free Shipping",
    desc: "On all orders over R$500",
  },
  {
    icon: <RefreshCw size={24} className="text-brand-400" />,
    title: "Easy Returns",
    desc: "30-day hassle-free returns",
  },
  {
    icon: <Shield size={24} className="text-brand-400" />,
    title: "Premium Quality",
    desc: "Crafted with the finest materials",
  },
  {
    icon: <Star size={24} className="text-brand-400" />,
    title: "Loyalty Rewards",
    desc: "Earn points on every purchase",
  },
];

export function PromoSection() {
  return (
    <section className="py-20 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-white mb-4">
            The GB Wear Promise
          </h2>
          <p className="text-neutral-400 max-w-xl mx-auto text-lg">
            Every piece is engineered for performance and designed to last.
            We stand behind everything we make.
          </p>
        </motion.div>

        {/* Perks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {perks.map(({ icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center text-center gap-4 p-6 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-brand-500/40 transition-colors"
            >
              <div className="p-3 bg-brand-500/10 rounded-xl">{icon}</div>
              <h3 className="text-white font-semibold">{title}</h3>
              <p className="text-neutral-400 text-sm">{desc}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 p-10 rounded-3xl bg-gradient-to-r from-brand-900 via-brand-800 to-brand-900 border border-brand-700/50 text-center"
        >
          <p className="text-brand-200 text-sm font-medium uppercase tracking-widest mb-3">
            Limited Time Offer
          </p>
          <h3 className="font-serif text-3xl lg:text-4xl font-bold text-white mb-4">
            Get 15% off your first order
          </h3>
          <p className="text-brand-200 mb-6">
            Use code <span className="font-bold text-white">GBWEAR15</span> at checkout
          </p>
          <a
            href="/products"
            className="inline-block px-8 py-3.5 bg-white text-brand-700 font-semibold rounded-full hover:bg-brand-50 transition-colors text-sm uppercase tracking-wide"
          >
            Shop Now
          </a>
        </motion.div>
      </div>
    </section>
  );
}
