import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  MessageSquare, Bot, Zap, Users, BarChart3, Globe2, Menu, X, 
  ArrowRight, Check, Star,  Shield, Sparkles, ChevronDown, Coffee,
  Building2, ShoppingBag, Stethoscope, Briefcase, ChevronRight
} from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
        <Link to="/" className="text-2xl font-bold gradient-text flex items-center gap-2">
        <img 
  src="/logo.svg" 
  alt="Logo" 
  className="w-16 h-auto sm:w-20 md:w-24 lg:w-28 xl:w-32"
/>


</Link>


          <div className="hidden md:flex items-center space-x-8">
          <NavLink href="#about">About</NavLink>
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#industries">Industries</NavLink>
            <NavLink href="#reviews">Reviews</NavLink>
            <NavLink href="#pricing">Pricing</NavLink>
            <Link
              to="/login"
              className="button-gradient text-white px-6 py-2 rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
             Sign in
            </Link>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-700"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white shadow-lg rounded-2xl mt-2 p-4"
          >
            <div className="flex flex-col space-y-4">
              <MobileNavLink href="#features">Features</MobileNavLink>
              <MobileNavLink href="#about">About</MobileNavLink>
              <MobileNavLink href="#industries">Industries</MobileNavLink>
              <MobileNavLink href="#reviews">Reviews</MobileNavLink>
              <MobileNavLink href="#pricing">Pricing</MobileNavLink>
              <Link
                to="/login"
                className="button-gradient text-white px-4 py-2 rounded-full text-center font-medium"
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

const NavLink = ({ href, children }) => (
  <motion.a
    href={href}
    className="text-gray-700 hover:text-gray-900 font-medium"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    {children}
  </motion.a>
);

const MobileNavLink = ({ href, children }) => (
  <motion.a
    href={href}
    className="text-gray-700 hover:text-gray-900 font-medium block px-3 py-2 rounded-full text-center"
    whileTap={{ scale: 0.95 }}
  >
    {children}
  </motion.a>
);

const FeatureCard = ({ icon: Icon, title, description }) => {
  const [isInView, setIsInView] = useState(false);
                                                                     
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.3 }}
      onViewportEnter={() => setIsInView(true)}
      whileHover={{ scale: 1, y: -5 }} 
      className="card-gradient p-6 rounded-2xl shadow-sm border border-purple-100 transition-transform duration-300 ease-in-out hover:shadow-lg hover:scale-105" // Added hover effects
    >
      <motion.div
        className="flex items-center gap-3 mb-4"
        animate={isInView ? { scale: [0.8, 1.2, 1] } : {}}
        transition={{ duration: 0.5 }}
      >
        <div className="p-2 bg-purple-100 rounded-xl">
          <Icon className="w-6 h-6 text-purple-600" />
        </div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </motion.div>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

const ReviewCard = ({ name, role, review, rating, image }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ y: -5 }}
    className="bg-white p-6 rounded-2xl shadow-lg"
  >
    <div className="flex items-center gap-4 mb-4">
      <img src={image} alt={name} className="w-12 h-12 rounded-full object-cover" />
      <div>
        <h4 className="font-semibold">{name}</h4>
        <p className="text-sm text-gray-600">{role}</p>
      </div>
    </div>
    <div className="flex mb-3">
      {[...Array(rating)].map((_, i) => (
        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
      ))}
    </div>
    <p className="text-gray-700">{review}</p>
  </motion.div>
);
const FloatingElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full"
          style={{
            width: Math.random() * 60 + 20,
            height: Math.random() * 60 + 20,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, Math.random() * 100 - 50],
            x: [0, Math.random() * 100 - 50],
            scale: [1, Math.random() * 0.5 + 0.5],
            opacity: [0.3, 0.6],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

const AnimatedStat = ({ number, label }) => {
  const [ref, inView] = React.useState(true);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center"
    >
      <motion.div
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="text-4xl font-bold text-indigo-600 mb-2"
      >
        {number}
      </motion.div>
      <div className="text-gray-600">{label}</div>
    </motion.div>
  );
};

const GlowingButton = ({ children, primary }) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className={`
      relative overflow-hidden px-8 py-4 rounded-full font-medium inline-flex items-center gap-2
      ${primary ? 'text-white shadow-xl shadow-indigo-500/20' : 'text-indigo-600 bg-white border border-indigo-100'}
    `}
  >
    {primary && (
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600" />
    )}
    <div className="relative flex items-center gap-2">
      {children}
    </div>
    {primary && (
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    )}
  </motion.button>
);

const IndustryCard = ({ icon: Icon, title, description, image }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ y: -10 }}
    className="relative group overflow-hidden rounded-2xl"
  >
    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 z-10" />
    <img
      src={image}
      alt={title}
      className="w-full h-[300px] object-cover transform group-hover:scale-110 transition-transform duration-500"
    />
    <div className="absolute bottom-0 left-0 right-0 p-6 z-20 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </div>
      <p className="text-white/90 transform opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {description}
      </p>
    </div>
  </motion.div>
);

const PricingTier = ({ name, price, features }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ scale: 1.02 }}
    className="bg-white p-8 rounded-2xl shadow-lg border border-purple-100"
  >
    <h3 className="text-xl font-bold mb-2">{name}</h3>
    <div className="mb-6">
      <span className="text-4xl font-bold">&#8377;{price}</span>
      <span className="text-gray-600">/month</span>
    </div>
    <ul className="space-y-3 mb-8">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center gap-2">
          <Check className="w-5 h-5 text-green-500" />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
    <Link
      to="/register"
      className="block w-full button-gradient text-white py-3 rounded-full text-center font-medium transition-all duration-300 hover:shadow-lg"
    >
      Get Started 
    </Link>
  </motion.div>
);

function LandingPage() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-purple-600 origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />

<div className="relative">
        <FloatingElements />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <motion.div
            style={{ opacity }}
            className="relative z-10 text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg shadow-indigo-500/10 mb-8"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-4 h-4 text-indigo-600" />
              </motion.div>
              <span className="text-sm font-medium text-gray-800">
                Revolutionizing Social Media Management
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-shadow"
            >
              Transform Your
              <br />
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Social Media Presence
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-gray-700 mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              Harness the power of AI to automate engagement, analyze trends, and
              grow your audience across all platforms.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <GlowingButton primary>
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </GlowingButton>
              <GlowingButton>
                Watch Demo
              </GlowingButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto"
            >
              <AnimatedStat number="10M+" label="Messages Handled" />
              <AnimatedStat number="99.9%" label="Uptime" />
              <AnimatedStat number="5000+" label="Active Users" />
              <AnimatedStat number="24/7" label="Support" />
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="w-6 h-6 text-indigo-400" />
          </motion.div>
        </motion.div>
      </div>
      {/* About Section */}
      <div id="about" className="py-20 bg-gradient-to-b from-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              About <span className="gradient-text">Gramboard.ai</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're revolutionizing how businesses handle social media engagement through advanced AI technology. Our platform combines cutting-edge machine learning with intuitive design to deliver exceptional customer experiences.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-xl">
                  <Bot className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">AI-Powered Intelligence</h3>
                  <p className="text-gray-600">Advanced machine learning algorithms that understand context and sentiment.</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-xl">
                  <Zap className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Lightning Fast</h3>
                  <p className="text-gray-600">Instant responses and real-time processing for seamless interactions.</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-xl">
                  <Globe2 className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Boosts Engagement</h3>
                  <p className="text-gray-600">Instantly replies to your post's comments boosting sales & engagement</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80"
                alt="Team collaboration"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-600" />
                  <span className="font-semibold">1k+ Happy Customers</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              Why Choose <span className="gradient-text">Gramboard.ai</span>?
            </h2>
            <p className="text-xl text-gray-600">
              Powerful features to revolutionize your social media management
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={MessageSquare}
              title="24/7 Customer Support"
              description="Instant responses to customer inquiries across all social platforms, any time of day."
            />
         <FeatureCard
  icon={Zap}
  title="Multi-Business Support"
  description="Perfect for any business type: Café, Restaurant, E-commerce store, or service-based business."
/>

            <FeatureCard
              icon={Globe2}
              title="Advanced Customer Management"
              description="Manage all your social media queries from a single, unified dashboard."
            />
            <FeatureCard
              icon={Users}
              title="Audience Insights"
              description="Deep analytics and insights about your audience engagement and behavior."
            />
            <FeatureCard
              icon={BarChart3}
              title="Performance Analytics"
              description="Detailed reports and metrics to track your social media success."
            />
            <FeatureCard
              icon={Bot}
              title="Custom AI Training"
              description="Train your bot to handle specific scenarios and maintain brand voice."
            />
          </div>
        </div>
      </div>

{/* Industries Section */}
<div id="industries" className="py-20 bg-gradient-to-b from-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              Perfect for Every <span className="gradient-text">Business</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From cafes to clinics, our AI chatbot adapts to your industry's unique needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <IndustryCard
              icon={Coffee}
              title="Cafes & Restaurants"
              description="Handle reservations, menu inquiries, and customer feedback automatically."
              image="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80"
            />
            <IndustryCard
              icon={Stethoscope}
              title="Healthcare & Clinics"
              description="Manage appointments, answer common health queries, and provide care information."
              image="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80"
            />
            <IndustryCard
              icon={ShoppingBag}
              title="E-commerce"
              description="Handle product inquiries, order status updates, and customer support 24/7."
              image="https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=800&q=80"
            />
            <IndustryCard
              icon={Building2}
              title="Real Estate"
              description="Automate property inquiries, schedule viewings, and provide instant property information."
              image="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80"
            />
            <IndustryCard
              icon={Briefcase}
              title="Professional Services"
              description="Handle client inquiries, schedule consultations, and provide service information."
              image="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80"
            />
            <IndustryCard
              icon={Globe2}
              title="Travel & Tourism"
              description="Manage bookings, provide travel information, and handle customer support globally."
              image="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80"
            />
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div id="reviews" className="py-20 bg-gradient-to-b from-purple-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Customer Success Stories</h2>
            <p className="text-xl text-gray-600">See what our customers are saying about Chatbotify AI</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ReviewCard
              name="Sarah Johnson"
              role="Marketing Director"
              rating={5}
              image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
              review="Chatbotify AI has transformed how we handle customer service. The AI responses are incredibly natural and our engagement rates have soared!"
            />
            <ReviewCard
              name="Michael Chen"
              role="E-commerce Owner"
              rating={5}
              image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80"
              review="The automation features have saved us countless hours. Our response time has dropped from hours to seconds!"
            />
            <ReviewCard
              name="Emma Davis"
              role="Social Media Manager"
              rating={5}
              image="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80"
              review="The analytics and insights provided by Chatbotify AI have helped us fine-tune our social media strategy perfectly."
            />
          </div>
        </div>
      </div>
 
    {/* Pricing Section */}
<div id="pricing" className="py-20">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-16"
    >
      <h2 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
      <p className="text-xl text-gray-600">Choose the perfect plan for your business</p>
    </motion.div>

    <div className="flex flex-wrap justify-center gap-8">
      <PricingTier
        name="Starter"
        price="1499"
        features={[
          "AI Chat Support",
          "5000 Messages",
          "Basic Analytics",
          "1 Team Member",
          "Email Support"
        ]}
      />
      <PricingTier
        name="Growth"
        price="2599"
        features={[
          "Everything in Starter",
          "10,000 Messages",
          "Shopify Integration",
          "Advanced Analytics",
          "7 Team Members",
          "Priority Support"
        ]}
      />
      <PricingTier
        name="Business"
        price="4999"
        features={[
          "Everything in Growth",
          "30,000 Messages",
          "Unlimited Platforms",
          "Custom API Integration",
          "Unlimited Team Members",
          "24/7 Phone Support"
        ]}
      />
      <PricingTier
        name="Enterprise"
        price="9,999"
        features={[
          "Everything in Business",
          "1,00,000 Messages",
          "Unlimited Platforms",
          "Custom API Integration",
          "Unlimited Team Members",
          "24/7 Phone Support"
        ]}
      />
    </div>
  </div>
</div>


      {/* Footer */}
      <footer className="bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Bot className="w-8 h-8 text-purple-600" />
                <span className="text-xl font-bold gradient-text">Gramboard.ai</span>
              </div>
              <p className="text-gray-600">
                Transforming social media management with AI-powered automation.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-600">
                <li>Features</li>
                <li>Pricing</li>
                <li>Documentation</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-600">
                <li>About</li>
                <li>Blog</li>
                <li>Careers</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-600">
                <li>Privacy</li>
                <li>Terms</li>
                <li>Security</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;