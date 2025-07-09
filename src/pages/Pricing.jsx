import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Globe2, CreditCard, Shield, Zap, Users, MessageCircle, Store, Building2, Briefcase, Gauge, Bot, Sparkles } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Toaster, toast } from 'react-hot-toast';
const currencies = [
  { code: 'INR', symbol: '₹', rate: 1 },
  { code: 'USD', symbol: '$', rate: 0.012 },
  { code: 'EUR', symbol: '€', rate: 0.011 },
  { code: 'GBP', symbol: '£', rate: 0.0096 }
];

const messageTiers = {
  growth: [
    { messages: 2000, price: 2499 },
    { messages: 5000, price: 2999 },
    { messages: 10000, price: 4999 },
    { messages: 15000, price: 7999 }
  ],
  professional: [
    { messages: 2000, price: 2999 },
    { messages: 5000, price: 3499 },
    { messages: 10000, price: 5999 },
    { messages: 15000, price: 9999 }
  ]
};

const pricingTiers = [
  {
    name: 'Starter',
    basePrice: 1299,
    description: 'Perfect for small businesses, local services, and stores',
    features: [
      '2,000 messages per month',
      'GPT-3.5 Turbo model',
      'Google Docs training',
      'Basic dashboard analytics',
      'Single user access',
      'WhatsApp integration',
      'Instagram DM reply',
      'Basic chat templates',
      '8/5 email support'
    ],
    highlight: {
      icon: <Store className="w-6 h-6 text-purple-500" />,
      title: 'Local Business Ready',
      description: 'Everything you need to get started with AI chat support'
    },
    model: {
      icon: <Bot className="w-5 h-5" />,
      name: 'GPT-3.5 Turbo',
      description: 'Fast and reliable for most use cases'
    }
  },
  {
    name: 'Growth',
    basePrice: 2499,
    customizable: true,
    description: 'Ideal for restaurants, clinics, and cafes',
    features: [
      'Customizable message limits',
      'GPT-4 model access',
      'Google Docs + PDF training',
      'Website content training',
      'Multi-user support (up to 3)',
      'Business hours setup',
      'Auto-reply configuration',
      'Custom branding',
      'Story replies & Comments',
      'Engagement boost features',
      'Priority email support'
    ],
    highlight: {
      icon: <Building2 className="w-6 h-6 text-green-500" />,
      title: 'Enhanced Engagement',
      description: 'Boost your social media presence with automated engagement'
    },
    model: {
      icon: <Sparkles className="w-5 h-5" />,
      name: 'GPT-4',
      description: 'Advanced reasoning and complex tasks'
    }
  },
  {
    name: 'Professional',
    basePrice: 2999,
    description: 'For professionals, Shopify stores, and service brands',
    popular: true,
    customizable: true,
    features: [
      'Customizable message limits',
      'GPT-4 model with priority',
      'CRM Integration (Zoho/HubSpot)',
      'Shopify/WordPress integration',
      'Custom workflows & automation',
      'Lead capture & tagging',
      'Advanced analytics dashboard',
      'Team collaboration tools',
      'Story replies & Comments',
      'Engagement boost features',
      '24/7 priority support'
    ],
    highlight: {
      icon: <Briefcase className="w-6 h-6 text-indigo-500" />,
      title: 'Professional Tools',
      description: 'Advanced integrations and automation'
    },
    model: {
      icon: <Sparkles className="w-5 h-5" />,
      name: 'Advanced AI Model Priority',
      description: 'Fastest response times and priority routing'
    }
  }
];

const features = [
  {
    icon: <MessageCircle className="w-8 h-8 text-purple-500" />,
    title: 'Omnichannel Support',
    description: 'Connect with customers on WhatsApp, Instagram, and your website with a unified inbox.'
  },
  {
    icon: <Zap className="w-8 h-8 text-yellow-500" />,
    title: 'Quick Setup',
    description: 'Get started in minutes with our guided setup process and pre-built templates.'
  },
  {
    icon: <Shield className="w-8 h-8 text-green-500" />,
    title: 'Data Security',
    description: 'Enterprise-grade security with end-to-end encryption and data protection.'
  },
  {
    icon: <Gauge className="w-8 h-8 text-blue-500" />,
    title: 'Engagement Boost',
    description: 'Automated story replies and comment management to increase engagement.'
  }
];

const faqs = [
  {
    question: 'What is the difference between GPT-3.5 and GPT-4?',
    answer: 'GPT-4 is the latest and most advanced language model, offering better reasoning, creativity, and handling of complex tasks. While GPT-3.5 is excellent for most basic customer service needs, GPT-4 provides more nuanced responses and better understanding of context, making it ideal for businesses requiring sophisticated interactions.'
  },
  {
    question: 'How are messages counted?',
    answer: 'Each incoming or outgoing message counts towards your monthly limit. Messages are counted in real-time and you can monitor usage in your dashboard. We will notify you when you are approaching your limit.'
  },
  {
    question: 'Can I upgrade my message limit mid-month?',
    answer: 'Yes! You can upgrade your message limit at any time. The new limit and pricing will be prorated for the remainder of the billing cycle. Upgrades take effect immediately.'
  },
  {
    question: 'What happens if I exceed my monthly message limit?',
    answer: 'Well notify you when you reach 80% of your limit. If you exceed your limit, you can either upgrade to a higher tier or pay for additional messages at a per-message rate. Your service wont be interrupted.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit/debit cards, UPI payments, net banking, and wallet payments. For Enterprise plans, we also support NEFT/RTGS transfers.'
  }
];

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

const PricingTier = ({ tier, index, selectedCurrency }) => {
  const [isHovered, setIsHovered] = useState(false);
    const { user, signOut } = useAuth();
  const [selectedMessages, setSelectedMessages] = useState(
    tier.name === 'Growth' 
      ? messageTiers.growth[0]
      : messageTiers.professional[0]
  );

  const price = tier.customizable 
    ? Math.round(selectedMessages.price * selectedCurrency.rate)
    : Math.round(tier.basePrice * selectedCurrency.rate);

    const handlePayment = async () => {
      const res = await loadRazorpay();
      if (!res) {
        toast.error('Razorpay SDK failed to load');
        return;
      }
    
      try {
        // Step 1: Create order from backend
        const createOrderResponse = await fetch('https://localhost:7190/api/payment/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            amount: price * 100,
            currency: selectedCurrency.code,
            receipt: `${tier.name}-${Date.now()}`,
            BusinessId: user.sub,
            notes: {
              BusinessId: user.sub
            }
          })
        });
    
        if (!createOrderResponse.ok) {
          const errText = await createOrderResponse.text();
          console.error("Create Order Error:", errText);
          toast.error("Failed to create order.");
          return;
        }
    
        const orderData = await createOrderResponse.json();
    
        // Step 2: Open Razorpay Checkout
        const options = {
          key: 'rzp_test_oZAAmsJs4ZOQnf',
          amount: price * 100,
          currency: selectedCurrency.code,
          name: 'Andromeda Infotech',
          description: `${tier.name} Plan - ${tier.customizable ? selectedMessages.messages : '2,000'} messages`,
          order_id: orderData.orderId || orderData.id, // Make sure backend returns this
          handler: async function (response) {
            console.log("Payment handler triggered!");
            console.log("Payment response:", response);
    
            try {
              // Step 3: Call backend to verify payment
              const verifyResponse = await fetch('https://localhost:7190/api/payment/verify', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  paymentId: response.razorpay_payment_id,
                  orderId: response.razorpay_order_id,
                  signature: response.razorpay_signature,
                  businessId: user.sub
                })
              });
    
              const verifyText = await verifyResponse.text();
              console.log("Verify response:", verifyText);
    
              if (!verifyResponse.ok) {
                console.error("Payment verification failed:", verifyText);
                toast.error("Payment failed to verify.");
              } else {
                toast.success("Payment verified and saved!");
              }
            } catch (err) {
              console.error("Error verifying payment:", err);
              toast.error("Something went wrong while verifying payment.");
            }
          },
          prefill: {
            name: '', // Optional: Fill user's info here
            email: '',
            contact: ''
          },
          theme: {
            color: '#4F46E5'
          }
        };
    
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    
      } catch (err) {
        console.error("Unexpected error during payment:", err);
        toast.error("Unexpected error. Please try again.");
      }
    };
    

  const containerVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5, delay: index * 0.1 }
    }
  };

  const featureVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`relative p-8 rounded-2xl ${
        tier.popular 
          ? 'bg-gradient-to-b from-white to-indigo-50 border-2 border-indigo-500' 
          : 'bg-white'
      } shadow-xl hover:shadow-2xl transition-all duration-300`}
    >
      {tier.popular && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-1 rounded-full text-sm font-medium shadow-lg"
        >
          Most Popular
        </motion.div>
      )}

      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
        <p className="text-gray-600">{tier.description}</p>
      </div>

      <motion.div
        animate={{ scale: isHovered ? 1.05 : 1 }}
        className="mb-8"
      >
        <div className="flex items-baseline">
          <span className="text-5xl font-bold text-gray-900">
            {selectedCurrency.symbol}{price}
          </span>
          <span className="ml-2 text-gray-600">/month</span>
        </div>
        
        {tier.customizable && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Monthly Messages
            </label>
            <select
              value={selectedMessages.messages}
              onChange={(e) => setSelectedMessages(
                (tier.name === 'Growth' ? messageTiers.growth : messageTiers.professional)
                  .find(t => t.messages === parseInt(e.target.value))
              )}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {(tier.name === 'Growth' ? messageTiers.growth : messageTiers.professional).map((tier) => (
                <option key={tier.messages} value={tier.messages}>
                  {tier.messages.toLocaleString()} messages - ₹{tier.price}
                </option>
              ))}
            </select>
          </div>
        )}
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-gray-50 rounded-xl p-4 mb-6"
      >
        <div className="flex items-start space-x-4">
          {tier.highlight.icon}
          <div>
            <h4 className="font-semibold text-gray-900">{tier.highlight.title}</h4>
            <p className="text-sm text-gray-600">{tier.highlight.description}</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-4 mb-8"
      >
        <div className="flex items-center space-x-3">
          {tier.model.icon}
          <div>
            <h4 className="font-semibold text-gray-900">{tier.model.name}</h4>
            <p className="text-sm text-gray-600">{tier.model.description}</p>
          </div>
        </div>
      </motion.div>

      <ul className="space-y-4 mb-8">
        {tier.features.map((feature, i) => (
          <motion.li
            key={i}
            variants={featureVariants}
            initial="hidden"
            animate="visible"
            custom={i}
            className="flex items-center text-gray-700"
          >
            <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
            <span>{feature}</span>
          </motion.li>
        ))}
      </ul>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handlePayment}
        className={`w-full py-3 px-6 rounded-xl font-medium transition-colors ${
          tier.popular
            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700'
            : 'bg-gray-900 text-white hover:bg-gray-800'
        }`}
      >
        Get Started
      </motion.button>
    </motion.div>
  );
};

const FeatureCard = ({ feature, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    whileHover={{ y: -5 }}
    className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
  >
    <div className="mb-4">{feature.icon}</div>
    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
    <p className="text-gray-600">{feature.description}</p>
  </motion.div>
);

const FAQItem = ({ faq, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 0.1 }}
      className="border-b border-gray-200 py-4"
    >
      <motion.button
        whileHover={{ x: 5 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full text-left"
      >
        <span className="text-lg font-medium text-gray-900">{faq.question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="ml-4 text-indigo-500"
        >
          ▼
        </motion.span>
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-2 text-gray-600"
          >
            {faq.answer}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Pricing = () => {
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
    const { user, signOut } = useAuth();

  return (
    <div className="py-10 px-4 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
         <Toaster position="top-right" />
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Simple, Transparent Pricing
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Choose the perfect plan for your business. All plans include unlimited updates and basic support.
        </p>
        
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex items-center justify-center space-x-2"
        >
          <Globe2 className="w-5 h-5 text-gray-600" />
          <select
            value={selectedCurrency.code}
            onChange={(e) => setSelectedCurrency(currencies.find(c => c.code === e.target.value))}
            className="bg-white border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {currencies.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.code} ({currency.symbol})
              </option>
            ))}
          </select>
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {pricingTiers.map((tier, index) => (
          <PricingTier
            key={index}
            tier={tier}
            index={index}
            selectedCurrency={selectedCurrency}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-20"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <FAQItem key={index} faq={faq} index={index} />
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-16 text-center"
      >
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="inline-flex items-center justify-center space-x-2 text-gray-600 bg-white px-4 py-2 rounded-full shadow-md"
        >
          <CreditCard className="w-5 h-5" />
          <span>Secure payment processing</span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Pricing;