// src/pages/Scraper.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaUserCircle, FaMapMarkerAlt, FaLinkedinIn, FaSearch } from 'react-icons/fa';
import type { ScrapedLead } from '../types';
import { toast } from 'react-toastify';
import InputField from '@components/InputField';
import { linkedinScrape } from '@api/Scrape';


const tableRowVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 15,
    },
  },
};

const tableContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const Scraper: React.FC = () => {
  const [linkedinSearchUrl, setLinkedinSearchUrl] = useState('');
  const [displayLeads, setDisplayLeads] = useState<ScrapedLead[]>([]);
  const [loading, setLoading] = useState(false);

  const handleScrapeLeads = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setDisplayLeads([]);

    try {
      const data = await linkedinScrape(linkedinSearchUrl);
      setDisplayLeads(data.scrapedProfiles);

    } catch (err) {
        toast.error('Failed to fetch/scrape leads. Please check your URL and backend connection.');
      console.error("Scraping error:", err);
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
        LinkedIn Profile Scraper
      </motion.h1>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        onSubmit={handleScrapeLeads}
        className="bg-white p-6 rounded-lg shadow-md mb-8 flex flex-col md:flex-row items-end gap-4 justify-center items-center"
      >
        <div className="flex-grow w-full md:w-auto">
          <InputField
            label="LinkedIn Search URL"
            id="linkedinSearchUrl"
            value={linkedinSearchUrl}
            onChange={(e) => setLinkedinSearchUrl(e.target.value)}
            placeholder="e.g., https://www.linkedin.com/search/results/people/..."
            required
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-2.5 rounded-md text-lg font-medium hover:bg-indigo-700 transition-colors duration-200 shadow-md flex items-center justify-center gap-2 w-full md:w-auto my-auto"
          disabled={loading}
        >
          {loading ? (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <>
              <FaSearch className="text-xl" />
              <span>Scrape Leads</span>
            </>
          )}
        </button>
      </motion.form>

      {displayLeads.length > 0 && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={tableContainerVariants}
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {/* Avatar */}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <FaUserCircle className="inline-block mr-1" /> Full Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Headline
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Summary
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sub Text
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <FaMapMarkerAlt className="inline-block mr-1" /> Location
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <FaLinkedinIn className="inline-block mr-1" /> LinkedIn URL
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {displayLeads.map((lead, index) => (
                  <motion.tr
                    key={lead.linkedinUrl || index}
                    variants={tableRowVariants}
                    custom={index}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      {lead.image ? (
                        <img
                          src={lead.image}
                          alt={lead.fullName}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <FaUserCircle className="w-8 h-8 text-gray-400" />
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {lead.fullName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {lead.headline}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 max-w-xs truncate" title={lead.summary}>
                      {lead.summary || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 max-w-xs truncate" title={lead.subText}>
                      {lead.subText || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {lead.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                      <a href={lead.linkedinUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center hover:underline">
                        Visit Profile <FaExternalLinkAlt className="ml-1 text-xs" />
                      </a>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {!loading && displayLeads.length === 0 && linkedinSearchUrl && (
        <div className="text-center text-gray-500 py-8">
          No leads found for the provided URL. Try another search!
        </div>
      )}
    </div>
  );
};

export default Scraper;
