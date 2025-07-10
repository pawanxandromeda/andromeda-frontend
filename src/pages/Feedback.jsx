import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Bot, MessageSquare, Star, Package, Heart, Zap } from 'lucide-react';
import Lottie from 'lottie-react';
import botAnimation from '../animations/bot-animation.json';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '../contexts/AuthContext'; // Adjust path to your auth context

function Feedback() {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [category, setCategory] = useState('general');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      setError('You must be logged in to submit feedback');
      return;
    }

    try {
      const feedbackData = {
        Id: uuidv4(), // Generate unique ID
        UserId: user.userId, // Use ID from authenticated user
        Category: category,
        Rating: rating,
        FeedbackText: feedback,
      };

      const response = await fetch('http://16.170.221.131/api/feedback/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}` // Include auth token
        },
        body: JSON.stringify(feedbackData),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || `HTTP error! Status: ${response.status}`);
      }

      setSubmitted(true);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to submit feedback. Please try again.');
      console.error('Feedback error:', err);
    }
  };

  const categories = [
    { value: 'general', label: 'General Feedback', icon: MessageSquare },
    { value: 'bug', label: 'Report a Bug', icon: Zap },
    { value: 'feature', label: 'Feature Request', icon: Package },
    { value: 'improvement', label: 'Suggestion for Improvement', icon: Heart },
  ];

  const floatingIcons = [
    { icon: Package, delay: 0 },
    { icon: Heart, delay: 0.2 },
    { icon: Zap, delay: 0.4 },
    { icon: MessageSquare, delay: 0.6 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 flex flex-col lg:flex-row rounded-lg">
      {/* Back Button for Mobile */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <motion.div whileHover={{ x: -3 }} whileTap={{ scale: 0.97 }}>
          <Link
            to="/"
            className="text-purple-600 hover:text-purple-700 flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </Link>
        </motion.div>
      </div>

      {/* Left Side - Category Selection */}
      <div className="lg:w-1/2 bg-gradient-to-br from-purple-600 to-indigo-600 p-8 lg:p-12 rounded-lg">
        <div className="max-w-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Bot className="w-12 h-12 text-purple-100 mb-6" />
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Your Feedback Makes Us Better
            </h1>
            <p className="text-purple-100 text-lg mb-8">
              Help us enhance your experience with SocialBot AI.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid gap-6"
          >
            {categories.map((cat, index) => (
              <motion.div
                key={cat.value}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300 cursor-pointer ${
                  category === cat.value ? 'ring-2 ring-purple-400' : ''
                }`}
                onClick={() => setCategory(cat.value)}
              >
                <cat.icon className="w-6 h-6 text-purple-200 mb-4" />
                <h3 className="text-white font-semibold mb-2">{cat.label}</h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Right Side - Form or Success Message */}
      <div className="lg:w-1/2 p-8 lg:p-12 relative">
        <div className="max-w-xl mx-auto">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="text-center relative"
              >
                <div className="w-64 h-64 mx-auto mb-8">
                  <Lottie animationData={botAnimation} loop={true} className="w-full h-full" />
                </div>

                {/* Floating Icons Animation */}
                {floatingIcons.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: [0, 1, 1, 0],
                      y: [-20, -60, -100, -140],
                      x: Math.sin(index) * 30,
                    }}
                    transition={{
                      duration: 2,
                      delay: item.delay,
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
                    className="absolute left-1/2 bottom-1/2"
                  >
                    <item.icon className="w-6 h-6 text-purple-500" />
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h2>
                  <p className="text-gray-600 mb-6">
                    Your feedback helps us create a better experience for everyone.
                  </p>
                  <Link
                    to="/dashboard"
                    className="text-purple-600 hover:text-purple-700 font-medium inline-flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Return to Dashboard
                  </Link>
                </motion.div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="space-y-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {!user && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4 rounded"
                  >
                    <p className="text-yellow-700">
                      Please login to submit feedback. 
                      <Link to="/login" className="text-purple-600 font-medium ml-1 hover:underline">
                        Go to login
                      </Link>
                    </p>
                  </motion.div>
                )}

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm"
                  >
                    {error}
                  </motion.div>
                )}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <label className="block text-gray-700 font-medium mb-2">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all duration-200"
                  >
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <label className="block text-gray-700 font-medium mb-2">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <motion.button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className={`p-2 rounded-lg transition-all duration-200 ${
                          rating >= star
                            ? 'text-yellow-400 hover:text-yellow-500'
                            : 'text-gray-300 hover:text-gray-400'
                        }`}
                      >
                        <Star className="w-6 h-6 fill-current" />
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <label className="block text-gray-700 font-medium mb-2">Your Feedback</label>
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all duration-200 min-h-[150px]"
                    placeholder="Share your thoughts, suggestions, or report issues..."
                    required
                  />
                </motion.div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={!user}
                  className={`w-full bg-gradient-to-r py-3 rounded-xl font-medium transition-all duration-300 ${
                    user 
                      ? 'from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white hover:shadow-lg'
                      : 'from-gray-300 to-gray-400 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {user ? 'Submit Feedback' : 'Login to Submit'}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default Feedback;