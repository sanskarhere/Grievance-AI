import { motion } from "motion/react";
import { ArrowRight, Sparkles, TrendingUp, Clock, CheckCircle2 } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

export function HeroSection() {
  const [metrics, setMetrics] = useState({
    resolved: 15247,
    accuracy: 98.6,
    slaTime: 2.4,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        resolved: prev.resolved + Math.floor(Math.random() * 3),
        accuracy: 98.6 + (Math.random() * 0.4 - 0.2),
        slaTime: 2.4 + (Math.random() * 0.2 - 0.1),
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Background */}
      <div className="absolute inset-0 dark:bg-[#0B1020] bg-linear-to-br from-blue-50 to-purple-50">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        
        {/* Floating orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-20 left-20 w-72 h-72 bg-cyan-500 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full blur-[120px]"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="text-center space-y-8">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm dark:text-gray-200 text-gray-800">
              AI-Powered Civic Intelligence Platform
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold dark:text-white text-gray-900 leading-tight"
          >
            Transforming Citizen
            <br />
            <span className="bg-linear-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Complaints into
            </span>
            <br />
            Intelligent Action
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl dark:text-gray-300 text-gray-600 max-w-3xl mx-auto"
          >
            Multilingual AI-driven complaint analysis • Real-time routing •
            Automated governance workflows
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              size="lg"
              className="bg-linear-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-0 px-8 py-6 text-lg group"
            >
              Submit Complaint
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-6 text-lg dark:bg-white/5 dark:border-white/20 dark:hover:bg-white/10 backdrop-blur-xl"
            >
              Explore AI Dashboard
            </Button>
          </motion.div>

          {/* Live Metrics Ticker */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-12"
          >
            <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20">
              <CheckCircle2 className="w-5 h-5 text-green-400" />
              <div className="text-left">
                <div className="text-2xl font-bold dark:text-white text-gray-900">
                  {metrics.resolved.toLocaleString()}
                </div>
                <div className="text-xs dark:text-gray-400 text-gray-600">
                  Complaints Resolved
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20">
              <TrendingUp className="w-5 h-5 text-cyan-400" />
              <div className="text-left">
                <div className="text-2xl font-bold dark:text-white text-gray-900">
                  {metrics.accuracy.toFixed(1)}%
                </div>
                <div className="text-xs dark:text-gray-400 text-gray-600">
                  AI Accuracy
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20">
              <Clock className="w-5 h-5 text-purple-400" />
              <div className="text-left">
                <div className="text-2xl font-bold dark:text-white text-gray-900">
                  {metrics.slaTime.toFixed(1)}h
                </div>
                <div className="text-xs dark:text-gray-400 text-gray-600">
                  Average SLA Time
                </div>
              </div>
            </div>
          </motion.div>

          {/* Floating AI Cards */}
          <div className="absolute top-32 left-10 hidden lg:block">
            <motion.div
              animate={{
                y: [0, -20, 0],
                rotate: [0, 5, 0],
              }}
              transition={{ duration: 6, repeat: Infinity }}
              className="w-48 p-4 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                <span className="text-xs dark:text-gray-300 text-gray-700">
                  Processing
                </span>
              </div>
              <p className="text-sm dark:text-white text-gray-900">
                Road repair complaint
              </p>
              <p className="text-xs dark:text-gray-400 text-gray-600 mt-1">
                Hindi → English
              </p>
            </motion.div>
          </div>

          <div className="absolute bottom-20 right-10 hidden lg:block">
            <motion.div
              animate={{
                y: [0, 20, 0],
                rotate: [0, -5, 0],
              }}
              transition={{ duration: 7, repeat: Infinity }}
              className="w-52 p-4 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
                <span className="text-xs dark:text-gray-300 text-gray-700">
                  Routed
                </span>
              </div>
              <p className="text-sm dark:text-white text-gray-900">
                Water supply issue
              </p>
              <p className="text-xs dark:text-gray-400 text-gray-600 mt-1">
                Priority: High • PWD Dept.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
