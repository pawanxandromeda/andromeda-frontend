  import React, { useState } from 'react';
  import { motion, AnimatePresence } from 'framer-motion';
  import { Tab } from '@headlessui/react';
  import { toast, Toaster } from 'react-hot-toast';
  import { 
    Settings2, 
    MessageSquare, 
    Bell, 
    Users, 
    Save,
    Loader2,
    Instagram,
    Globe2,
    Clock,
    Palette,
    Bot,
    Languages,
    AlertCircle,
    CheckCircle2
  } from 'lucide-react';

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  const Settings = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    const [generalSettings, setGeneralSettings] = useState({
      botName: 'InstaSupportAI',
      businessName: 'My Business',
      email: 'contact@business.com',
      timezone: 'UTC-5',
      language: 'en',
      instagramHandle: '@mybusiness',
      websiteUrl: 'https://example.com'
    });

    const [chatSettings, setChatSettings] = useState({
      welcomeMessage: 'Hi there! 👋 I am your AI assistant. How can I help you today?',
      responseDelay: 1,
      maxResponseTime: 5,
      activeHours: '24/7',
      theme: 'light',
      aiPersonality: 'friendly',
      defaultLanguage: 'en',
      fallbackMessage: "I'm not quite sure about that. Could you please rephrase or contact our human support team?",
      endConversationMessage: "Thanks for chatting! Don't forget to follow us for updates! 🌟"
    });

    const [notificationSettings, setNotificationSettings] = useState({
      emailNotifications: true,
      lowConfidenceAlerts: true,
      dailyReports: true,
      weeklyAnalytics: true,
      customerFeedback: true,
      systemUpdates: true
    });

    const [teamSettings, setTeamSettings] = useState({
      teamMembers: [
        { id: 1, name: 'John Doe', role: 'Admin', email: 'john@example.com', status: 'active' },
        { id: 2, name: 'Jane Smith', role: 'Moderator', email: 'jane@example.com', status: 'active' }
      ]
    });

    const validateGeneralSettings = () => {
      const newErrors = {};
      
      if (!generalSettings.botName) newErrors.botName = 'Bot name is required';
      if (!generalSettings.businessName) newErrors.businessName = 'Business name is required';
      if (!generalSettings.email) newErrors.email = 'Email is required';
      if (!generalSettings.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        newErrors.email = 'Invalid email format';
      }
      if (!generalSettings.instagramHandle) newErrors.instagramHandle = 'Instagram handle is required';
      if (!generalSettings.instagramHandle.startsWith('@')) {
        newErrors.instagramHandle = 'Instagram handle must start with @';
      }
      if (generalSettings.websiteUrl && !generalSettings.websiteUrl.match(/^https?:\/\/.+/)) {
        newErrors.websiteUrl = 'Website URL must start with http:// or https://';
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const validateChatSettings = () => {
      const newErrors = {};
      
      if (!chatSettings.welcomeMessage) newErrors.welcomeMessage = 'Welcome message is required';
      if (!chatSettings.fallbackMessage) newErrors.fallbackMessage = 'Fallback message is required';
      if (chatSettings.responseDelay < 0.5) newErrors.responseDelay = 'Minimum response delay is 0.5 seconds';
      if (chatSettings.maxResponseTime < chatSettings.responseDelay) {
        newErrors.maxResponseTime = 'Max response time must be greater than response delay';
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleGeneralSubmit = async (e) => {
      e.preventDefault();
      if (!validateGeneralSettings()) {
        toast.error('Please fix the errors before saving');
        return;
      }

      setIsSubmitting(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        toast.success('General settings updated successfully');
      } catch (error) {
        toast.error('Failed to update settings');
      } finally {
        setIsSubmitting(false);
      }
    };

    const handleChatSubmit = async (e) => {
      e.preventDefault();
      if (!validateChatSettings()) {
        toast.error('Please fix the errors before saving');
        return;
      }

      setIsSubmitting(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        toast.success('Chat settings updated successfully');
      } catch (error) {
        toast.error('Failed to update settings');
      } finally {
        setIsSubmitting(false);
      }
    };

    const handleNotificationSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        toast.success('Notification preferences updated successfully');
      } catch (error) {
        toast.error('Failed to update settings');
      } finally {
        setIsSubmitting(false);
      }
    };

    const renderError = (fieldName) => {
      if (errors[fieldName]) {
        return (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 text-sm mt-1 flex items-center gap-1"
          >
            <AlertCircle className="w-4 h-4" />
            {errors[fieldName]}
          </motion.p>
        );
      }
      return null;
    };

    const categories = [
      { name: 'General', icon: Settings2 },
      { name: 'Chat Settings', icon: MessageSquare },
      { name: 'Notifications', icon: Bell },
      { name: 'Team', icon: Users }
    ];

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8"
      >
        <Toaster position="top-right" />
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center gap-3 mb-8">
              <Bot className="w-8 h-8 text-indigo-600" />
              <h1 className="text-3xl font-bold text-gray-900">BizzFlow AI Settings</h1>
            </div>

            <Tab.Group>
              <Tab.List className="flex space-x-2 rounded-xl bg-indigo-50 p-1.5 mb-8">
                {categories.map(({ name, icon: Icon }) => (
                  <Tab
                    key={name}
                    className={({ selected }) =>
                      classNames(
                        'w-full rounded-lg py-3 text-sm font-medium leading-5 flex items-center justify-center gap-2',
                        'ring-white ring-opacity-60 ring-offset-2 focus:outline-none focus:ring-2',
                        selected
                          ? 'bg-white text-indigo-700 shadow-sm'
                          : 'text-indigo-600 hover:bg-white/50'
                      )
                    }
                  >
                    <Icon className="w-4 h-4" />
                    {name}
                  </Tab>
                ))}
              </Tab.List>

              <Tab.Panels>
                <Tab.Panel>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-8"
                  >
                    <div className="bg-indigo-50 rounded-lg p-4 flex items-start gap-3">
                      <Globe2 className="w-5 h-5 text-indigo-600 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-indigo-900">General Configuration</h3>
                        <p className="text-sm text-indigo-700">Configure your chatbot's basic settings and business information.</p>
                      </div>
                    </div>

                    <form onSubmit={handleGeneralSubmit} className="space-y-6">
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Bot Name *</label>
                          <input
                            type="text"
                            name="botName"
                            className={`mt-1 block w-full px-3 py-2 border ${errors.botName ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
                            value={generalSettings.botName}
                            onChange={(e) => setGeneralSettings({...generalSettings, botName: e.target.value})}
                          />
                          {renderError('botName')}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700">Business Name *</label>
                          <input
                            type="text"
                            name="businessName"
                            className={`mt-1 block w-full px-3 py-2 border ${errors.businessName ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
                            value={generalSettings.businessName}
                            onChange={(e) => setGeneralSettings({...generalSettings, businessName: e.target.value})}
                          />
                          {renderError('businessName')}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700">Instagram Handle *</label>
                          <div className="mt-1 relative">
                            <Instagram className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                            <input
                              type="text"
                              name="instagramHandle"
                              className={`pl-10 block w-full px-3 py-2 border ${errors.instagramHandle ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
                              placeholder="@yourbrand"
                              value={generalSettings.instagramHandle}
                              onChange={(e) => setGeneralSettings({...generalSettings, instagramHandle: e.target.value})}
                            />
                          </div>
                          {renderError('instagramHandle')}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700">Email Address *</label>
                          <input
                            type="email"
                            name="email"
                            className={`mt-1 block w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
                            value={generalSettings.email}
                            onChange={(e) => setGeneralSettings({...generalSettings, email: e.target.value})}
                          />
                          {renderError('email')}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700">Website URL</label>
                          <input
                            type="url"
                            name="websiteUrl"
                            className={`mt-1 block w-full px-3 py-2 border ${errors.websiteUrl ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
                            placeholder="https://example.com"
                            value={generalSettings.websiteUrl}
                            onChange={(e) => setGeneralSettings({...generalSettings, websiteUrl: e.target.value})}
                          />
                          {renderError('websiteUrl')}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700">Timezone</label>
                          <select
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            value={generalSettings.timezone}
                            onChange={(e) => setGeneralSettings({...generalSettings, timezone: e.target.value})}
                          >
                            {['-12', '-11', '-10', '-9', '-8', '-7', '-6', '-5', '-4', '-3', '-2', '-1', 
                              '0', '+1', '+2', '+3', '+4', '+5', '+6', '+7', '+8', '+9', '+10', '+11', '+12'].map((offset) => (
                              <option key={offset} value={`UTC${offset}`}>
                                UTC{offset}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Saving...
                            </>
                          ) : (
                            <>
                              <Save className="w-4 h-4 mr-2" />
                              Save Changes
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  </motion.div>
                </Tab.Panel>

                <Tab.Panel>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-8"
                  >
                    <div className="bg-indigo-50 rounded-lg p-4 flex items-start gap-3">
                      <MessageSquare className="w-5 h-5 text-indigo-600 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-indigo-900">Chat Configuration</h3>
                        <p className="text-sm text-indigo-700">Customize how your AI chatbot interacts with customers.</p>
                      </div>
                    </div>

                    <form onSubmit={handleChatSubmit} className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Welcome Message *</label>
                        <textarea
                          name="welcomeMessage"
                          rows="3"
                          className={`mt-1 block w-full px-3 py-2 border ${errors.welcomeMessage ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
                          value={chatSettings.welcomeMessage}
                          onChange={(e) => setChatSettings({...chatSettings, welcomeMessage: e.target.value})}
                        />
                        {renderError('welcomeMessage')}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Fallback Message *</label>
                        <textarea
                          name="fallbackMessage"
                          rows="3"
                          className={`mt-1 block w-full px-3 py-2 border ${errors.fallbackMessage ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
                          value={chatSettings.fallbackMessage}
                          onChange={(e) => setChatSettings({...chatSettings, fallbackMessage: e.target.value})}
                        />
                        {renderError('fallbackMessage')}
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Response Delay (seconds)</label>
                          <input
                            type="number"
                            name="responseDelay"
                            min="0.5"
                            step="0.5"
                            className={`mt-1 block w-full px-3 py-2 border ${errors.responseDelay ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
                            value={chatSettings.responseDelay}
                            onChange={(e) => setChatSettings({...chatSettings, responseDelay: parseFloat(e.target.value)})}
                          />
                          {renderError('responseDelay')}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700">Max Response Time (seconds)</label>
                          <input
                            type="number"
                            name="maxResponseTime"
                            min="1"
                            className={`mt-1 block w-full px-3 py-2 border ${errors.maxResponseTime ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
                            value={chatSettings.maxResponseTime}
                            onChange={(e) => setChatSettings({...chatSettings, maxResponseTime: parseInt(e.target.value)})}
                          />
                          {renderError('maxResponseTime')}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700">AI Personality</label>
                          <select
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            value={chatSettings.aiPersonality}
                            onChange={(e) => setChatSettings({...chatSettings, aiPersonality: e.target.value})}
                          >
                            <option value="friendly">Friendly</option>
                            <option value="professional">Professional</option>
                            <option value="casual">Casual</option>
                            <option value="formal">Formal</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700">Theme</label>
                          <select
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            value={chatSettings.theme}
                            onChange={(e) => setChatSettings({...chatSettings, theme: e.target.value})}
                          >
                            <option value="light">Light</option>
                            <option value="dark">Dark</option>
                            <option value="auto">System Default</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">End Conversation Message</label>
                        <textarea
                          name="endConversationMessage"
                          rows="2"
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                          value={chatSettings.endConversationMessage}
                          onChange={(e) => setChatSettings({...chatSettings, endConversationMessage: e.target.value})}
                        />
                      </div>

                      <div className="flex justify-end">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Saving...
                            </>
                          ) : (
                            <>
                              <Save className="w-4 h-4 mr-2" />
                              Save Changes
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  </motion.div>
                </Tab.Panel>

                <Tab.Panel>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-8"
                  >
                    <div className="bg-indigo-50 rounded-lg p-4 flex items-start gap-3">
                      <Bell className="w-5 h-5 text-indigo-600 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-indigo-900">Notification Preferences</h3>
                        <p className="text-sm text-indigo-700">Choose when and how you want to be notified.</p>
                      </div>
                    </div>

                    <form onSubmit={handleNotificationSubmit} className="space-y-6">
                      {Object.entries(notificationSettings).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between py-3 border-b">
                          <div>
                            <h3 className="text-sm font-medium text-gray-900">
                              {key.split(/(?=[A-Z])/).join(' ')}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {`Receive notifications for ${key.split(/(?=[A-Z])/).join(' ').toLowerCase()}`}
                            </p>
                          </div>
                          <button
                            type="button"
                            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                              value ? 'bg-indigo-600' : 'bg-gray-200'
                            }`}
                            onClick={() => setNotificationSettings(prev => ({
                              ...prev,
                              [key]: !value
                            }))}
                          >
                            <span
                              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                value ? 'translate-x-5' : 'translate-x-0'
                              }`}
                            />
                          </button>
                        </div>
                      ))}

                      <div className="flex justify-end">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Saving...
                            </>
                          ) : (
                            <>
                              <Save className="w-4 h-4 mr-2" />
                              Save Changes
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  </motion.div>
                </Tab.Panel>

                <Tab.Panel>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-8"
                  >
                    <div className="bg-indigo-50 rounded-lg p-4 flex items-start gap-3">
                      <Users className="w-5 h-5 text-indigo-600 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-indigo-900">Team Management</h3>
                        <p className="text-sm text-indigo-700">Manage team members and their access levels.</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <Users className="w-4 h-4 mr-2" />
                        Invite Team Member
                      </button>

                      <div className="bg-white rounded-lg border">
                        <div className="px-4 py-3 border-b">
                          <h3 className="text-sm font-medium text-gray-900">Current Team Members</h3>
                        </div>
                        <ul className="divide-y divide-gray-200">
                          {teamSettings.teamMembers.map((member) => (
                            <li key={member.id} className="px-4 py-3">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-sm font-medium text-gray-900">{member.name}</p>
                                  <p className="text-sm text-gray-500">{member.email}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    member.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                  }`}>
                                    {member.role}
                                  </span>
                                  <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      </motion.div>
    );
  };

  export default Settings;