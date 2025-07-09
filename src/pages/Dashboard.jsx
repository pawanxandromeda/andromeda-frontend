import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Brain, Users, Clock, Star, MessageSquare, Target, TrendingUp, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
const data = [
  { name: 'Mon', conversations: 400, engagement: 240 },
  { name: 'Tue', conversations: 300, engagement: 139 },
  { name: 'Wed', conversations: 500, engagement: 380 },
  { name: 'Thu', conversations: 280, engagement: 190 },
  { name: 'Fri', conversations: 590, engagement: 480 },
  { name: 'Sat', conversations: 320, engagement: 280 },
  { name: 'Sun', conversations: 450, engagement: 360 }
];

const engagementData = [
  { name: 'Mon', value: 65 },
  { name: 'Tue', value: 59 },
  { name: 'Wed', value: 80 },
  { name: 'Thu', value: 81 },
  { name: 'Fri', value: 56 },
  { name: 'Sat', value: 55 },
  { name: 'Sun', value: 40 }
];

const recentBookings = [
  { id: 'BK001', customer: 'John Doe', service: 'Product Demo', date: '2024-03-20', time: '14:00', status: 'Confirmed' },
  { id: 'BK002', customer: 'Sarah Smith', service: 'Consultation', date: '2024-03-21', time: '15:30', status: 'Pending' },
  { id: 'BK003', customer: 'Mike Johnson', service: 'Support Call', date: '2024-03-22', time: '11:00', status: 'Completed' },
  { id: 'BK004', customer: 'Emily Brown', service: 'Training Session', date: '2024-03-23', time: '16:00', status: 'Confirmed' },
];

function Dashboard() {
  const [selectedMetric, setSelectedMetric] = useState('conversations');
  const { user, signOut } = useAuth();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const stats = [
    {
      title: 'Total Conversations',
      value: '2,840',
      change: '+12.5%',
      icon: MessageSquare,
      color: 'bg-indigo-500'
    },
    {
      title: 'Active Users',
      value: '1,240',
      change: '+18.2%',
      icon: Users,
      color: 'bg-purple-500'
    },
    {
      title: 'Response Time',
      value: '1.2s',
      change: '-0.3s',
      icon: Clock,
      color: 'bg-pink-500'
    },
    {
      title: 'Satisfaction Rate',
      value: '94%',
      change: '+2.3%',
      icon: Star,
      color: 'bg-blue-500'
    }
  ];

  const insights = [
    {
      title: 'Peak Activity Time',
      description: 'Most users engage between 2 PM - 5 PM',
      icon: Target,
      color: 'text-indigo-500'
    },
    {
      title: 'Top Performing Content',
      description: 'Product recommendations have 85% engagement',
      icon: TrendingUp,
      color: 'text-purple-500'
    },
    {
      title: 'Action Required',
      description: '3 conversations need attention',
      icon: AlertCircle,
      color: 'text-red-500'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
   
      <motion.div
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div 
          className="flex items-center justify-between mb-8"
          variants={itemVariants}
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
            <p className="text-gray-600 mt-1">Welcome back {user.sub}! Here's what's happening with your chatbot.</p>
          </div>
          <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer">
            <Brain className="h-5 w-5 text-indigo-600" />
            <span className="text-indigo-600 font-medium">AI Status: Active</span>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          variants={containerVariants}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-lg hover:border-indigo-100 transition-all duration-300 transform hover:-translate-y-1"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center justify-between">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <span className="text-green-500 text-sm font-medium">{stat.change}</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mt-4">{stat.value}</h3>
              <p className="text-gray-600 text-sm mt-1">{stat.title}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <motion.div
            variants={itemVariants}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
            whileHover={{ scale: 1.01 }}
          >
            <h2 className="text-xl font-semibold mb-4">Conversation Analytics</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="conversations" 
                    stroke="#4F46E5" 
                    strokeWidth={2}
                    dot={{ fill: '#4F46E5' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="engagement" 
                    stroke="#7C3AED" 
                    strokeWidth={2}
                    dot={{ fill: '#7C3AED' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
            whileHover={{ scale: 1.01 }}
          >
            <h2 className="text-xl font-semibold mb-4">Engagement Rate</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={engagementData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#7C3AED"
                    fill="url(#colorGradient)"
                  />
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#7C3AED" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Recent Bookings Table */}
        <motion.div
          variants={itemVariants}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8 hover:shadow-lg transition-all duration-300"
          whileHover={{ scale: 1.01 }}
        >
          <h2 className="text-xl font-semibold mb-6">Recent Bookings</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentBookings.map((booking, index) => (
                  <tr 
                    key={booking.id}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.customer}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.service}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.time}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Insights Section */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {insights.map((insight, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-indigo-100 transition-all duration-300 transform hover:-translate-y-1"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center mb-4">
                <insight.icon className={`h-6 w-6 ${insight.color} mr-3`} />
                <h3 className="font-semibold text-gray-900">{insight.title}</h3>
              </div>
              <p className="text-gray-600">{insight.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
 
  );
}

export default Dashboard;