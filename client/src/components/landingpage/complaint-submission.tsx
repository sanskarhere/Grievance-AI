import { motion } from "motion/react";
import { useState } from "react";
import {
  Send,
  Mic,
  Image as ImageIcon,
  MessageSquare,
  Sparkles,
  CheckCircle,
} from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";

export function ComplaintSubmission() {
  const [complaint, setComplaint] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [analysis, setAnalysis] = useState<{
    language: string;
    category: string;
    priority: string;
    confidence: number;
    summary: string;
  } | null>(null);

  const handleSubmit = () => {
    setIsProcessing(true);
    
    setTimeout(() => {
      setAnalysis({
        language: "Hindi (Detected)",
        category: "Infrastructure",
        priority: "High",
        confidence: 94.5,
        summary: "Road repair needed on MG Road due to multiple potholes causing traffic issues",
      });
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <section className="py-20 px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
            AI-Powered Submission
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold dark:text-white text-gray-900 mb-4">
            Submit Your Complaint
          </h2>
          <p className="text-xl dark:text-gray-400 text-gray-600">
            AI analyzes, classifies, and routes your complaint in real-time
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-8"
        >
          {/* Submission Form */}
          <div
            className="p-8 rounded-3xl border backdrop-blur-xl dark:bg-white/5 dark:border-white/10 bg-white border-gray-200 shadow-2xl"
            style={{
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
            }}
          >
            <div className="space-y-6">
              <div>
                <label className="text-sm dark:text-gray-300 text-gray-700 mb-2 block">
                  Describe your complaint
                </label>
                <Textarea
                  value={complaint}
                  onChange={(e) => setComplaint(e.target.value)}
                  placeholder="Type your complaint in any language... (Hindi, English, etc.)"
                  className="min-h-50 dark:bg-white/5 dark:border-white/10 dark:text-white bg-gray-50 border-gray-300 resize-none"
                />
              </div>

              <div className="flex flex-wrap gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/10"
                >
                  <Mic className="w-4 h-4 mr-2" />
                  Voice Input
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/10"
                >
                  <ImageIcon className="w-4 h-4 mr-2" />
                  Upload Image
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/10"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  WhatsApp
                </Button>
              </div>

              {isProcessing && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="space-y-2"
                >
                  <div className="flex items-center gap-2 dark:text-cyan-400 text-cyan-600">
                    <Sparkles className="w-4 h-4 animate-pulse" />
                    <span className="text-sm">AI is analyzing your complaint...</span>
                  </div>
                  <Progress value={66} className="h-1" />
                </motion.div>
              )}

              <Button
                onClick={handleSubmit}
                disabled={!complaint || isProcessing}
                className="w-full bg-linear-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-0"
              >
                {isProcessing ? (
                  <>Processing...</>
                ) : (
                  <>
                    Submit Complaint
                    <Send className="ml-2 w-4 h-4" />
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* AI Analysis Preview */}
          <div className="space-y-4">
            <div className="p-6 rounded-2xl dark:bg-white/5 dark:border-white/10 bg-white border border-gray-200 backdrop-blur-xl">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <h3 className="font-semibold dark:text-white text-gray-900">
                  AI Analysis
                </h3>
              </div>

              {analysis ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm dark:text-gray-400 text-gray-600">
                      Language
                    </span>
                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                      {analysis.language}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm dark:text-gray-400 text-gray-600">
                      Category
                    </span>
                    <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                      {analysis.category}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm dark:text-gray-400 text-gray-600">
                      Priority
                    </span>
                    <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                      {analysis.priority}
                    </Badge>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm dark:text-gray-400 text-gray-600">
                        Confidence Score
                      </span>
                      <span className="text-sm font-semibold dark:text-white text-gray-900">
                        {analysis.confidence}%
                      </span>
                    </div>
                    <Progress value={analysis.confidence} className="h-2" />
                  </div>

                  <div className="p-4 rounded-xl dark:bg-white/5 bg-gray-50 border dark:border-white/10 border-gray-200">
                    <p className="text-sm dark:text-gray-300 text-gray-700 mb-2">
                      AI-Generated Summary:
                    </p>
                    <p className="text-sm dark:text-white text-gray-900">
                      {analysis.summary}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-green-400">
                    <CheckCircle className="w-5 h-5" />
                    <span className="text-sm">Ready to route to department</span>
                  </div>
                </motion.div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full dark:bg-white/5 bg-gray-100 flex items-center justify-center">
                    <Sparkles className="w-8 h-8 dark:text-gray-600 text-gray-400" />
                  </div>
                  <p className="text-sm dark:text-gray-500 text-gray-600">
                    Submit a complaint to see AI analysis
                  </p>
                </div>
              )}
            </div>

            {/* Live Processing Indicator */}
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 20px rgba(6, 182, 212, 0.2)",
                  "0 0 40px rgba(6, 182, 212, 0.4)",
                  "0 0 20px rgba(6, 182, 212, 0.2)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="p-4 rounded-2xl dark:bg-white/5 dark:border-white/10 bg-white border border-gray-200 backdrop-blur-xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
                <div>
                  <p className="text-sm font-semibold dark:text-white text-gray-900">
                    AI System Active
                  </p>
                  <p className="text-xs dark:text-gray-400 text-gray-600">
                    Real-time multilingual processing enabled
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
