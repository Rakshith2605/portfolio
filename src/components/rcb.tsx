"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface RCBData {
  title: string;
  subtitle: string;
  year: string;
  journey: string;
  story: string;
  victory: string;
  emotionalMessage: string;
  images: string[];
  keyMoments: string[];
  fanQuote: string;
}

interface RCBProps {
  data: RCBData;
}

export default function RCB({ data }: RCBProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-6xl mx-auto p-4"
    >
      <Card className="bg-gradient-to-br from-red-900 via-red-800 to-red-700 border-red-600 shadow-2xl overflow-hidden">
        <CardContent className="p-6">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-yellow-300 mb-2">
              {data.title}
            </h1>
            <p className="text-xl text-yellow-200 mb-4">
              {data.subtitle}
            </p>
            <Badge className="bg-yellow-500 text-red-900 font-bold text-lg px-4 py-2">
              {data.year} - {data.journey}
            </Badge>
          </motion.div>

          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          >
            {data.images.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="relative h-48 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300"
              >
                <Image
                  src={image}
                  alt={`RCB Victory Moment ${index + 1}`}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-red-900/50 to-transparent" />
              </motion.div>
            ))}
          </motion.div>

          {/* Story Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-6 mb-8"
          >
            <div className="bg-red-800/50 rounded-lg p-6 border border-red-600">
              <h3 className="text-2xl font-bold text-yellow-300 mb-4">
                The Journey of Heartbreak and Hope
              </h3>
              <p className="text-yellow-100 leading-relaxed text-lg">
                {data.story}
              </p>
            </div>

            <div className="bg-yellow-500/10 rounded-lg p-6 border border-yellow-400/30">
              <h3 className="text-2xl font-bold text-yellow-300 mb-4">
                The Victory That Changed Everything
              </h3>
              <p className="text-yellow-100 leading-relaxed text-lg">
                {data.victory}
              </p>
            </div>

            <div className="bg-red-700/50 rounded-lg p-6 border border-red-500">
              <h3 className="text-2xl font-bold text-yellow-300 mb-4">
                A Fan's Perspective
              </h3>
              <p className="text-yellow-100 leading-relaxed text-lg italic">
                {data.emotionalMessage}
              </p>
            </div>
          </motion.div>

          {/* Key Moments */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mb-8"
          >
            <h3 className="text-2xl font-bold text-yellow-300 mb-4 text-center">
              Key Moments That Made History
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.keyMoments.map((moment, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="bg-yellow-500/20 rounded-lg p-4 border border-yellow-400/30"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <p className="text-yellow-100 font-medium">{moment}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Fan Quote */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="text-center"
          >
            <div className="bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-lg p-6 border-2 border-yellow-300">
              <p className="text-red-900 font-bold text-xl italic">
                "{data.fanQuote}"
              </p>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
} 