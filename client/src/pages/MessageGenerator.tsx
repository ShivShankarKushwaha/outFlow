import React, { useState } from 'react';
import { motion } from 'framer-motion';
import InputField from '@components/InputField';
import Button from '@components/Button';
import { generatePersonalizedMessage } from '@api/messages';
import type { LinkedInProfileData } from '../types';
import { toast } from 'react-toastify';
import { aiPropmptConst } from '@constants/index';

const MessageGenerator: React.FC = () => {
  const [profileData, setProfileData] = useState<LinkedInProfileData>({
    name: '',
    job_title: '',
    company: '',
    location: '',
    summary: '',
  });
  const [generatedMessage, setGeneratedMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [aiPropmpt, setAiPrompt] = useState<string>(aiPropmptConst);
  const [aiPropmptVisible, setAiPromptVisible] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setProfileData((prev:any) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setGeneratedMessage('');
    try {
        if(aiPropmpt!== aiPropmptConst) {
            profileData.ai_prompt = aiPropmpt;
        }
      const response = await generatePersonalizedMessage(profileData);
      setGeneratedMessage(response.message);
    } catch (err:any) {
        toast.error(err?.message || 'Failed to generate message. Please check your backend and API key.');
      setError('Failed to generate message. Please check your backend and API key.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold mb-6 text-gray-800"
      >
        LinkedIn Message Generator
      </motion.h1>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md mb-8"
      >
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Enter LinkedIn Profile Data</h2>
        <InputField
          label="Name"
          id="name"
          value={profileData.name}
          onChange={handleChange}
          placeholder="e.g., John Doe"
          required
        />
        <InputField
          label="Job Title"
          id="job_title"
          value={profileData.job_title}
          onChange={handleChange}
          placeholder="e.g., Software Engineer"
          required
        />
        <InputField
          label="Company"
          id="company"
          value={profileData.company}
          onChange={handleChange}
          placeholder="e.g., TechCorp"
          required
        />
        <InputField
          label="Location"
          id="location"
          value={profileData.location}
          onChange={handleChange}
          placeholder="e.g., San Francisco, CA"
          required
        />
        <InputField
          label="Summary"
          id="summary"
          value={profileData.summary}
          onChange={handleChange}
          multiline
          placeholder="e.g., Experienced in AI & ML..."
          required
        />

        <motion.div
            initial={false}
            animate={{ height: aiPropmpt ? 'auto' : 0, opacity: aiPropmpt ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="mb-4 overflow-hidden"
        >
            <button
                type="button"
                className="text-blue-600 underline mb-2 cursor-pointer"
                onClick={() => setAiPromptVisible(!aiPropmptVisible)}
            >
                {aiPropmptVisible ? 'Hide AI Prompt Editor' : 'Edit AI Prompt'}
            </button>
            {aiPropmptVisible && (
                <motion.textarea
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="w-full border rounded p-2 text-gray-700"
                    rows={4}
                    value={aiPropmpt}
                    onChange={e => setAiPrompt(e.target.value)}
                />
            )}
        </motion.div>

        <Button type="submit" disabled={loading} className="mt-4">
          {loading ? 'Generating...' : 'Generate Message'}
        </Button>
      </motion.form>

      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <strong className="font-bold">Error! </strong>
          <span className="block sm:inline">{error}</span>
        </motion.div>
      )}

      {generatedMessage && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-blue-50 p-6 rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Generated Message</h2>
          <p className="text-gray-800 whitespace-pre-wrap">{generatedMessage}</p>
        </motion.div>
      )}
    </div>
  );
};

export default MessageGenerator;
