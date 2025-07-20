"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface MeData {
  name: string;
  location: string;
  hometown: string;
  currentRole: string;
  background: string;
  interests: string;
  photo: string;
  expertise: string[];
  experience: string[];
}

interface MeProps {
  data: MeData;
}

export default function Me({ data }: MeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-4xl mx-auto p-4"
    >
      <Card className="bg-background/50 backdrop-blur-sm border-border shadow-xl">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Photo Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex-shrink-0"
            >
              <div className="relative w-48 h-48 lg:w-64 lg:h-64 mx-auto lg:mx-0">
                <Image
                  src={data.photo}
                  alt={data.name}
                  fill
                  className="rounded-2xl object-cover shadow-lg"
                  priority
                />
              </div>
            </motion.div>

            {/* Content Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex-1 space-y-4"
            >
              {/* Header */}
              <div className="space-y-2">
                <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
                  {data.name}
                </h1>
                <p className="text-lg text-muted-foreground">
                  {data.currentRole}
                </p>
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  📍 {data.location} (Originally from {data.hometown})
                </p>
              </div>

              {/* Background */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="space-y-3"
              >
                <p className="text-foreground leading-relaxed">
                  {data.background}
                </p>
                <p className="text-foreground leading-relaxed">
                  {data.interests}
                </p>
              </motion.div>

              {/* Expertise */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="space-y-3"
              >
                <h3 className="text-lg font-semibold text-foreground">
                  Expertise
                </h3>
                <div className="flex flex-wrap gap-2">
                  {data.expertise.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </motion.div>

              {/* Experience */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="space-y-3"
              >
                <h3 className="text-lg font-semibold text-foreground">
                  Experience
                </h3>
                <div className="space-y-2">
                  {data.experience.map((exp, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      {exp}
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
} 