// File: Pages/BusinessSetup.tsx

import React, { useState } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';

const BusinessSetupPage = () => {
  const [formData, setFormData] = useState({
    businessName: '',
    phoneNumber: '',
    apiKey: '',
    email: '',
    websiteUrl: '',
    timezone: '',
    chatbotName: '',
    welcomeMessage: 'Hi there! 👋 How can I help you today?',
    fallbackMessage: "I'm sorry, I didn't understand. Could you please rephrase?",
    chatbotTone: 'friendly',
    language: 'en',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post('/api/whatsapp/setup', formData);
      toast.success('Business successfully configured!');
      console.log('Setup Success:', res.data);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Setup failed');
      console.error('Setup Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <Toaster position="top-right" />
      <h2 className="text-2xl font-bold mb-4">WhatsApp Bot Setup</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="businessName" placeholder="Business Name" value={formData.businessName} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input name="phoneNumber" placeholder="WhatsApp Phone (+91...)" value={formData.phoneNumber} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input name="apiKey" placeholder="360dialog API Key" value={formData.apiKey} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input name="email" placeholder="Email" type="email" value={formData.email} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input name="websiteUrl" placeholder="Website URL" value={formData.websiteUrl} onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="timezone" placeholder="Timezone (e.g. Asia/Kolkata)" value={formData.timezone} onChange={handleChange} required className="w-full p-2 border rounded" />

        <hr className="my-4" />

        <input name="chatbotName" placeholder="Chatbot Name" value={formData.chatbotName} onChange={handleChange} required className="w-full p-2 border rounded" />
        <textarea name="welcomeMessage" placeholder="Welcome Message" value={formData.welcomeMessage} onChange={handleChange} className="w-full p-2 border rounded" />
        <textarea name="fallbackMessage" placeholder="Fallback Message" value={formData.fallbackMessage} onChange={handleChange} className="w-full p-2 border rounded" />
        <select name="chatbotTone" value={formData.chatbotTone} onChange={handleChange} className="w-full p-2 border rounded">
          <option value="friendly">Friendly</option>
          <option value="professional">Professional</option>
        </select>
        <select name="language" value={formData.language} onChange={handleChange} className="w-full p-2 border rounded">
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="pa">Punjabi</option>
        </select>

        <button type="submit" disabled={loading} className="w-full bg-green-600 text-white py-2 rounded">
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default BusinessSetupPage;
