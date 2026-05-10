import { motion } from "motion/react";
import { Badge } from "./ui/badge";
import { TrendingUp, AlertCircle, CheckCircle, Clock } from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const activityData = [
  { name: "Mon", complaints: 145 },
  { name: "Tue", complaints: 189 },
  { name: "Wed", complaints: 167 },
  { name: "Thu", complaints: 203 },
  { name: "Fri", complaints: 178 },
  { name: "Sat", complaints: 134 },
  { name: "Sun", complaints: 98 },
];

const categoryData = [
  { name: "Infrastructure", value: 35, color: "#06b6d4" },
  { name: "Water Supply", value: 25, color: "#8b5cf6" },
  { name: "Sanitation", value: 20, color: "#10b981" },
  { name: "Electricity", value: 15, color: "#f59e0b" },
  { name: "Others", value: 5, color: "#ec4899" },
];

const departmentData = [
  { dept: "PWD", pending: 23, resolved: 67 },
  { dept: "Water", pending: 15, resolved: 45 },
  { dept: "Electric", pending: 12, resolved: 38 },
  { dept: "Health", pending: 8, resolved: 29 },
];

const recentActivity = [
  {
    id: 1,
    title: "Road repair on MG Road",
    status: "In Progress",
    time: "2 mins ago",
    priority: "High",
  },
  {
    id: 2,
    title: "Water leakage complaint",
    status: "Assigned",
    time: "5 mins ago",
    priority: "Medium",
  },
  {
    id: 3,
    title: "Street light not working",
    status: "Resolved",
    time: "15 mins ago",
    priority: "Low",
  },
  {
    id: 4,
    title: "Garbage collection delay",
    status: "Pending",
    time: "23 mins ago",
    priority: "High",
  },
];

export function DashboardPreview() {
  return (
    <section
      id="dashboard"
      className="py-20 px-6 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
            Real-Time Intelligence
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold dark:text-white text-gray-900 mb-4">
            Command Dashboard Preview
          </h2>
          <p className="text-xl dark:text-gray-400 text-gray-600 max-w-2xl mx-auto">
            Monitor, analyze, and manage all complaints from one intelligent interface
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-6 rounded-2xl dark:bg-white/5 dark:border-white/10 bg-white border border-gray-200 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 text-cyan-400" />
              <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
                +12%
              </Badge>
            </div>
            <p className="text-3xl font-bold dark:text-white text-gray-900">
              1,247
            </p>
            <p className="text-sm dark:text-gray-400 text-gray-600">
              Total Complaints
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-6 rounded-2xl dark:bg-white/5 dark:border-white/10 bg-white border border-gray-200 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="w-8 h-8 text-green-400" />
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                +8%
              </Badge>
            </div>
            <p className="text-3xl font-bold dark:text-white text-gray-900">
              983
            </p>
            <p className="text-sm dark:text-gray-400 text-gray-600">
              Resolved
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-6 rounded-2xl dark:bg-white/5 dark:border-white/10 bg-white border border-gray-200 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-8 h-8 text-purple-400" />
              <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                Live
              </Badge>
            </div>
            <p className="text-3xl font-bold dark:text-white text-gray-900">
              156
            </p>
            <p className="text-sm dark:text-gray-400 text-gray-600">
              In Progress
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="p-6 rounded-2xl dark:bg-white/5 dark:border-white/10 bg-white border border-gray-200 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between mb-2">
              <AlertCircle className="w-8 h-8 text-red-400" />
              <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                Alert
              </Badge>
            </div>
            <p className="text-3xl font-bold dark:text-white text-gray-900">
              108
            </p>
            <p className="text-sm dark:text-gray-400 text-gray-600">
              Pending
            </p>
          </motion.div>
        </div>

        {/* Charts Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Activity Trend */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-6 rounded-2xl dark:bg-white/5 dark:border-white/10 bg-white border border-gray-200 backdrop-blur-xl"
          >
            <h3 className="font-semibold dark:text-white text-gray-900 mb-4">
              Weekly Activity Trend
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={activityData}>
                <CartesianGrid key="grid-line" strokeDasharray="3 3" stroke="#333" />
                <XAxis key="xaxis-line" dataKey="name" stroke="#888" />
                <YAxis key="yaxis-line" stroke="#888" />
                <Tooltip
                  key="tooltip-line"
                  contentStyle={{
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  key="line-complaints"
                  type="monotone"
                  dataKey="complaints"
                  stroke="#06b6d4"
                  strokeWidth={3}
                  dot={{ fill: "#06b6d4", r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Category Distribution */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-6 rounded-2xl dark:bg-white/5 dark:border-white/10 bg-white border border-gray-200 backdrop-blur-xl"
          >
            <h3 className="font-semibold dark:text-white text-gray-900 mb-4">
              Category Distribution
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  key="pie-category"
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  key="tooltip-pie"
                  contentStyle={{
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Department Performance & Live Feed */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Department Performance */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2 p-6 rounded-2xl dark:bg-white/5 dark:border-white/10 bg-white border border-gray-200 backdrop-blur-xl"
          >
            <h3 className="font-semibold dark:text-white text-gray-900 mb-4">
              Department Performance
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentData}>
                <CartesianGrid key="grid-bar" strokeDasharray="3 3" stroke="#333" />
                <XAxis key="xaxis-bar" dataKey="dept" stroke="#888" />
                <YAxis key="yaxis-bar" stroke="#888" />
                <Tooltip
                  key="tooltip-bar"
                  contentStyle={{
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "8px",
                  }}
                />
                <Legend key="legend-bar" />
                <Bar key="bar-pending" dataKey="pending" fill="#f59e0b" radius={[8, 8, 0, 0]} />
                <Bar key="bar-resolved" dataKey="resolved" fill="#10b981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Live Activity Feed */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-6 rounded-2xl dark:bg-white/5 dark:border-white/10 bg-white border border-gray-200 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold dark:text-white text-gray-900">
                Live Activity
              </h3>
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
            </div>

            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-3 rounded-xl dark:bg-white/5 bg-gray-50 border dark:border-white/5 border-gray-200"
                >
                  <div className="flex items-start justify-between mb-1">
                    <p className="text-sm font-medium dark:text-white text-gray-900 line-clamp-1">
                      {activity.title}
                    </p>
                    <Badge
                      className={
                        activity.priority === "High"
                          ? "bg-red-500/20 text-red-400 border-red-500/30 text-xs"
                          : activity.priority === "Medium"
                          ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-xs"
                          : "bg-green-500/20 text-green-400 border-green-500/30 text-xs"
                      }
                    >
                      {activity.priority}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs dark:text-gray-400 text-gray-600">
                      {activity.status}
                    </p>
                    <p className="text-xs dark:text-gray-500 text-gray-500">
                      {activity.time}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
