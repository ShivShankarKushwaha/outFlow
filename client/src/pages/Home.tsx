import React from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import Button from '@components/Button';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 100 } },
};

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1, transition: { type: 'spring' as const, stiffness: 200, damping: 10 } },
};

const featureItemVariants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { type: 'spring' as const, stiffness: 100, damping: 10 } },
};

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-6rem)] bg-gradient-to-br from-indigo-50 to-purple-50 p-4 text-center overflow-hidden">
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-4xl mx-auto py-16 px-4"
      >
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-4"
        >
          Automate Outreach. <span className="text-indigo-600">Boost Sales.</span>
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto mb-8"
        >
          OutFlo.io empowers sales teams with AI-driven personalized messages and efficient campaign management to book more meetings and drive growth.
        </motion.p>

        <motion.div variants={containerVariants} className="flex flex-col sm:flex-row justify-center gap-4">
          <NavLink to="/campaigns">
            <motion.div variants={buttonVariants}>
              <Button className="px-8 py-3 text-lg">
                Get Started with Campaigns
              </Button>
            </motion.div>
          </NavLink>
          <NavLink to="/message-generator">
            <motion.div variants={buttonVariants}>
              <Button variant="secondary" className="px-8 py-3 text-lg border-indigo-600 text-indigo-600 hover:bg-indigo-50">
                Try Message Generator
              </Button>
            </motion.div>
          </NavLink>
        </motion.div>
      </motion.section>

      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-6xl mx-auto py-16 px-4"
      >
        <motion.h2 variants={itemVariants} className="text-4xl font-bold text-gray-900 mb-12">
          Why OutFlo.io?
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div variants={featureItemVariants} className="bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <h3 className="text-2xl font-semibold text-indigo-600 mb-4">
              AI-Powered Personalization
            </h3>
            <p className="text-gray-700">
              Generate highly personalized outreach messages using advanced AI, tailored to each lead's profile.
            </p>
          </motion.div>
          <motion.div variants={featureItemVariants} className="bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <h3 className="text-2xl font-semibold text-purple-600 mb-4">
              Effortless Campaign Management
            </h3>
            <p className="text-gray-700">
              Create, track, and manage your outreach campaigns with an intuitive and powerful dashboard.
            </p>
          </motion.div>
          <motion.div variants={featureItemVariants} className="bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <h3 className="text-2xl font-semibold text-green-600 mb-4">
              Increase Conversions
            </h3>
            <p className="text-gray-700">
              Automate your outreach process to significantly increase your meeting bookings and sales pipeline.
            </p>
          </motion.div>
        </div>
      </motion.section>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="py-8 text-gray-600 text-sm"
      >
        &copy; {new Date().getFullYear()} OutFlo.io. All rights reserved.
      </motion.footer>
    </div>
  );
};

export default Home;
