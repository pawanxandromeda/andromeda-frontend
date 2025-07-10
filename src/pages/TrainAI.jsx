import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import axios from 'axios';
import { format } from 'date-fns';
import { useAuth } from '../contexts/AuthContext';
import { 
  Coffee, 
  Stethoscope, 
  Store, 
  School, 
  FileText, 
  CheckCircle2, 
  RefreshCw,
  ExternalLink,
  Copy,
  Shield,
  Users,
  Clock,
  BrainCircuit,
  AlertCircle,
  Calendar,
  Link,
  Target,
  Brain,
  Sparkles,
  Gauge
} from 'lucide-react';

const businessTemplates = {
  cafe: {
    icon: Coffee,
    name: 'Café & Restaurant',
    description: 'Complete template for restaurant management and customer service',
    sheetUrl: 'https://docs.google.com/spreadsheets/d/1yA9C31QT1dd0LU_3IX_R9TQdy5UJ1LIoIAM1XQ3GBjU/edit?usp=sharing',
    sections: [
      'Menu Items & Pricing',
      'Customer Service Scripts',
      'Operating Hours & Policies',
      'Reservation Guidelines'
    ],
    sampleData: [
      ['Item', 'Price', 'Category', 'Description'],
      ['Espresso', '$3.50', 'Coffee', 'Single shot of rich espresso'],
      ['Cappuccino', '$4.50', 'Coffee', 'Espresso with steamed milk foam'],
      ['Croissant', '$2.75', 'Bakery', 'Freshly baked butter croissant']
    ]
  },
  clinic: {
    icon: Stethoscope,
    name: 'Medical Clinic',
    description: 'Healthcare service management and patient communication template',
    sheetUrl: 'https://docs.google.com/spreadsheets/d/YOUR_CLINIC_SHEET_ID/edit?usp=sharing',
    sections: [
      'Appointment Scheduling',
      'Patient Information Forms',
      'Medical Services Directory',
      'Healthcare Policies'
    ],
    sampleData: [
      ['Service', 'Duration', 'Price', 'Description'],
      ['General Checkup', '30 min', '$75', 'Routine health examination'],
      ['Blood Test', '15 min', '$50', 'Basic blood panel analysis'],
      ['Vaccination', '10 min', '$25', 'Seasonal flu shot']
    ]
  },
  retail: {
    icon: Store,
    name: 'Retail Store',
    description: 'Retail operations and customer support documentation',
    sheetUrl: 'https://docs.google.com/spreadsheets/d/1yA9C31QT1dd0LU_3IX_R9TQdy5UJ1LIoIAM1XQ3GBjU/edit?usp=sharing',
    sections: [
      'Product Catalog Structure',
      'Customer Service Guidelines',
      'Store Policies & Returns',
      'Loyalty Program Details'
    ],
    sampleData: [
      ['Product', 'Price', 'Category', 'Stock'],
      ['T-Shirt', '$19.99', 'Clothing', '50'],
      ['Jeans', '$49.99', 'Clothing', '30'],
      ['Sneakers', '$79.99', 'Footwear', '25']
    ]
  },
  education: {
    icon: School,
    name: 'Educational Institute',
    description: 'Academic institution management and student services template',
    sheetUrl: 'https://docs.google.com/spreadsheets/d/YOUR_EDUCATION_SHEET_ID/edit?usp=sharing',
    sections: [
      'Course Catalog Format',
      'Student Services Guide',
      'Administrative Procedures',
      'Academic Policies'
    ],
    sampleData: [
      ['Course', 'Credits', 'Duration', 'Description'],
      ['CS101', '3', '15 weeks', 'Introduction to Programming'],
      ['MATH201', '4', '15 weeks', 'Calculus I'],
      ['ENG101', '3', '15 weeks', 'English Composition']
    ]
  }
};

const TrainAI = () => {
  const [selectedBusiness, setSelectedBusiness] = useState('cafe');
  const [isTraining, setIsTraining] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeDocUrl, setActiveDocUrl] = useState(businessTemplates.cafe.sheetUrl);
  const [trainingHistory, setTrainingHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState(600);
  const [insightMetrics, setInsightMetrics] = useState({
    accuracy: 0,
    aiPoints: 0,
    processingSpeed: 0,
    dataQuality: 0
  });
  const progressControls = useAnimation();
  const { user } = useAuth();

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  useEffect(() => {
    let progressInterval;
    let insightInterval;

    if (isTraining) {
      setProgress(0);
      setTimeLeft(600);
      setInsightMetrics({
        accuracy: 0,
        aiPoints: 0,
        processingSpeed: 0,
        dataQuality: 0
      });

      progressInterval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 100 / 600;
          if (newProgress >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return newProgress;
        });

        setTimeLeft(prev => {
          const newTime = prev - 1;
          if (newTime <= 0) {
            clearInterval(progressInterval);
            return 0;
          }
          return newTime;
        });
      }, 1000);

      insightInterval = setInterval(() => {
        setInsightMetrics(prev => ({
          ...prev,
          accuracy: Math.min(100, prev.accuracy + Math.random() * 0.5),
          aiPoints: prev.aiPoints + Math.floor(Math.random() * 4 + 1),
          processingSpeed: Math.min(100, prev.processingSpeed + Math.random() * 0.4),
          dataQuality: Math.min(100, prev.dataQuality + Math.random() * 0.2)
        }));
      }, 1500);
    }

    return () => {
      clearInterval(progressInterval);
      clearInterval(insightInterval);
    };
  }, [isTraining]);

  useEffect(() => {
    fetchTrainingHistory();
  }, []);

  const fetchTrainingHistory = async () => {
    setIsLoading(true);
    try {
      const mockResponse = {
        data: [
          {
            id: '1',
            businessCategory: 'cafe',
            googleDocUrls: [businessTemplates.cafe.sheetUrl],
            createdAt: new Date().toISOString()
          }
        ]
      };
      setTrainingHistory(mockResponse.data);
    } catch (error) {
      setError('Failed to fetch training history');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTemplateUse = async (docUrl) => {
    setActiveDocUrl(docUrl);
    try {
      window.open(docUrl, '_blank');
    } catch (error) {
      setError('Failed to open template. Please ensure the URL is valid and the sheet exists.');
    }
  };

const handleTraining = async (e) => {
  e.preventDefault();

  if (!activeDocUrl || !/^(https?:\/\/)/.test(activeDocUrl)) {
    setError('Please enter a valid Google Sheets URL');
    return;
  }

  setIsTraining(true);
  setError(null);

  try {
    const trainingData = {
      BusinessId: user.sub,
      BusinessCategory: selectedBusiness,
      GoogleDocUrls: [activeDocUrl]
    };

    // Step 1: Submit training data
    const submitResponse = await fetch('https://localhost:7190/api/BusinessTraining/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(trainingData)
    });

    if (!submitResponse.ok) {
      throw new Error('Failed to submit training data');
    }

    // Step 2: Trigger training and embedding
    const trainResponse = await fetch('http://16.170.173.244:5000/api/BusinessTraining/train', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(trainingData)
    });

    if (!trainResponse.ok) {
      throw new Error('Failed to start training process');
    }

    // Optional delay for visual feedback
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Step 3: Update UI state
    setTrainingHistory(prev => [
      ...prev,
      {
        businessId: user.sub,
        businessCategory: selectedBusiness,
        googleDocUrls: [activeDocUrl],
        createdAt: new Date().toISOString(),
        id: Date.now()
      }
    ]);

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  } catch (error) {
    console.error(error);
    setError('Training submission failed. Please try again.');
  } finally {
    setIsTraining(false);
  }
};


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };      

  const progressVariants = {
    initial: { width: 0 },
    animate: { width: `${progress}%`, transition: { duration: 0.5, ease: "easeInOut" } }
  };

  const pulseVariants = {
    initial: { scale: 1 },
    animate: { scale: [1, 1.05, 1], transition: { duration: 2, repeat: Infinity } }
  };

  const TrainingHistoryCard = ({ training }) => (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg p-4 shadow-sm border border-gray-200"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-blue-500" />
          <span className="text-sm text-gray-600">
            {training.createdAt ? format(new Date(training.createdAt), 'MMM dd, yyyy HH:mm') : 'No date'}
          </span>
        </div>
        <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800 capitalize">
          {training.businessCategory || 'No Category'}
        </span>
      </div>

      <div className="space-y-2">
        {Array.isArray(training.googleDocUrls) && training.googleDocUrls.length > 0 ? (
          training.googleDocUrls.map((url, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2 text-gray-700 truncate">
                <Link className="w-4 h-4 text-blue-500" />
                <span className="truncate max-w-[200px]">{url}</span>
              </div>
              <button 
                onClick={() => window.open(url, '_blank')}
                className="text-blue-600 hover:text-blue-800 flex items-center space-x-1"
              >
                <ExternalLink className="w-3 h-3" />
                <span>View</span>
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No documents uploaded yet.</p>
        )}
      </div>
    </motion.div>
  );

  const BusinessIcon = businessTemplates[selectedBusiness].icon;
  const selectedTemplate = businessTemplates[selectedBusiness];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="space-y-8"
      >
        <motion.div variants={itemVariants} className="flex items-center space-x-4">
          <BrainCircuit className="w-10 h-10 text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Train AI with Templates</h1>
            <p className="text-gray-600">Select a business template, customize it in Google Sheets, and train your AI.</p>
          </div>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center"
          >
            <AlertCircle className="w-5 h-5 mr-2" />
            <span>{error}</span>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <motion.div variants={itemVariants} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Template Selection</h2>
                <select
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={selectedBusiness}
                  onChange={(e) => {
                    setSelectedBusiness(e.target.value);
                    setActiveDocUrl(businessTemplates[e.target.value].sheetUrl);
                  }}
                >
                  {Object.entries(businessTemplates).map(([key, { name }]) => (
                    <option key={key} value={key}>{name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-6">
                <div className="bg-blue-50 rounded-lg p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <BusinessIcon className="w-6 h-6 text-blue-600" />
                    <h3 className="text-lg font-semibold text-blue-900">{selectedTemplate.name} Template</h3>
                  </div>
                  <p className="text-blue-700 mb-4">{selectedTemplate.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {selectedTemplate.sections.map((section, index) => (
                      <div 
                        key={index}
                        className="bg-white rounded-lg p-4 shadow-sm border border-blue-100"
                      >
                        <FileText className="w-5 h-5 text-blue-500 mb-2" />
                        <p className="text-sm text-gray-700">{section}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Sample Data Preview</h4>
                    <div className="bg-white rounded-lg p-4 border border-gray-200 max-h-48 overflow-auto">
                      <table className="w-full text-sm text-gray-700">
                        <thead>
                          <tr className="bg-gray-50">
                            {selectedTemplate.sampleData[0].map((header, index) => (
                              <th key={index} className="px-2 py-1 text-left font-medium">{header}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {selectedTemplate.sampleData.slice(1).map((row, rowIndex) => (
                            <tr key={rowIndex} className="border-t">
                              {row.map((cell, cellIndex) => (
                                <td key={cellIndex} className="px-2 py-1">{cell}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <motion.button
                    onClick={() => handleTemplateUse(selectedTemplate.sheetUrl)}
                    className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    title="Open the template in Google Sheets to make a copy and edit"
                  >
                    <Copy className="w-5 h-5" />
                    <span>Open Template in Google Sheets</span>
                  </motion.button>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold mb-4">Start Training</h3>
                  <form onSubmit={handleTraining} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Completed Template URL
                      </label>
                      <div className="flex rounded-lg shadow-sm">
                        <input
                          type="url"
                          className="flex-1 px-4 py-2 border border-r-0 border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          value={activeDocUrl}
                          onChange={(e) => setActiveDocUrl(e.target.value)}
                          placeholder="Paste your Google Sheets URL here"
                        />
                        <button
                          type="button"
                          className="px-4 py-2 border border-gray-300 rounded-r-lg bg-gray-50 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                          onClick={() => window.open(activeDocUrl, '_blank')}
                          disabled={!activeDocUrl || !/^(https?:\/\/)/.test(activeDocUrl)}
                          title="Preview the entered URL"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Copy the template, fill it with your data in Google Sheets, and paste the URL here.
                      </p>
                    </div>

                    <motion.button
                      type="submit"
                      className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={isTraining || !activeDocUrl || !/^(https?:\/\/)/.test(activeDocUrl)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      title="Start training with your customized template"
                    >
                      {isTraining ? (
                        <>
                          <RefreshCw className="w-5 h-5 animate-spin" />
                          <span>Training in Progress...</span>
                        </>
                      ) : (
                        <>
                          <FileText className="w-5 h-5" />
                          <span>Start Training with Template</span>
                        </>
                      )}
                    </motion.button>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.div variants={itemVariants} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">Training History</h2>
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <RefreshCw className="w-6 h-6 text-blue-500 animate-spin" />
                </div>
              ) : error ? (
                <div className="flex items-center justify-center py-8 text-red-500">
                  <AlertCircle className="w-6 h-6 mr-2" />
                  <span>{error}</span>
                </div>
              ) : trainingHistory.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <FileText className="w-8 h-8 mx-auto mb-2" />
                  <p>No training history available</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {trainingHistory.map((training) => (
                    <TrainingHistoryCard key={training.id} training={training} />
                  ))}
                </div>
              )}
            </motion.div>

            <motion.div variants={itemVariants} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg shadow-sm p-6 border border-blue-100">
              <h2 className="text-xl font-semibold mb-6">Training Insights</h2>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <motion.div 
                    className="bg-white p-4 rounded-lg shadow-sm"
                    animate={pulseVariants}
                  >
                    <Clock className="w-5 h-5 text-blue-500 mb-2" />
                    <div className="text-2xl font-bold">{formatTime(timeLeft)}</div>
                    <div className="text-sm text-gray-600">Time Remaining</div>
                  </motion.div>
                  <motion.div 
                    className="bg-white p-4 rounded-lg shadow-sm"
                    whileHover={{ scale: 1.02 }}
                  >
                    <Gauge className="w-5 h-5 text-green-500 mb-2" />
                    <div className="text-2xl font-bold">{Math.round(insightMetrics.processingSpeed)}%</div>
                    <div className="text-sm text-gray-600">Processing Speed</div>
                  </motion.div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <motion.div 
                    className="bg-white p-4 rounded-lg shadow-sm"
                    whileHover={{ scale: 1.02 }}
                  >
                    <Brain className="w-5 h-5 text-purple-500 mb-2" />
                    <div className="text-2xl font-bold">{insightMetrics.aiPoints}</div>
                    <div className="text-sm text-gray-600">AI Points</div>
                  </motion.div>
                  <motion.div 
                    className="bg-white p-4 rounded-lg shadow-sm"
                    whileHover={{ scale: 1.02 }}
                  >
                    <Sparkles className="w-5 h-5 text-yellow-500 mb-2" />
                    <div className="text-2xl font-bold">{Math.round(insightMetrics.dataQuality)}%</div>
                    <div className="text-sm text-gray-600">Data Quality</div>
                  </motion.div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-medium text-gray-700">Training Progress</h3>
                    <span className="text-sm text-blue-600 font-medium">{Math.round(progress)}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-blue-500"
                      variants={progressVariants}
                      initial="initial"
                      animate="animate"
                    />
                  </div>
                </div>

                <motion.div 
                  className="bg-white p-4 rounded-lg shadow-sm mt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Target className="w-5 h-5 text-indigo-500" />
                      <span className="font-medium">Training Accuracy</span>
                    </div>
                    <span className="text-lg font-bold text-indigo-600">
                      {Math.round(insightMetrics.accuracy)}%
                    </span>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">Training Tips</h2>
              <ul className="space-y-3">
                {[
                  { icon: Shield, text: 'Fill all required sections completely' },
                  { icon: FileText, text: 'Use clear, professional language' },
                  { icon: Users, text: 'Include real business scenarios' },
                  { icon: Clock, text: 'Update information regularly' }
                ].map((tip, index) => (
                  <motion.li
                    key={index}
                    className="flex items-center space-x-3 text-sm text-gray-600"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <tip.icon className="w-4 h-4 text-blue-500 flex-shrink-0" />
                    <span>{tip.text}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>Training started with your template!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TrainAI;