"use client";

import { useState } from 'react';
import { Icons } from '@/components/ui/Icons';
import { motion } from 'framer-motion';
import { submitContactForm, ContactFormData } from '@/lib/firebase';

const contactMethods = [
  {
    icon: Icons.mail,
    title: 'Email',
    value: 'jedgeoghegan@gmail.com',
    href: 'mailto:jedgeoghegan@gmail.com',
    description: 'Send me an email for any inquiries or opportunities.'
  },
  {
    icon: Icons.github,
    title: 'GitHub',
    value: 'github.com/adequatej',
    href: 'https://github.com/adequatej',
    description: 'Check out my projects.'
  },
  {
    icon: Icons.linkedin,
    title: 'LinkedIn',
    value: 'linkedin.com/in/jedgeoghegan',
    href: 'https://linkedin.com/in/jed-geoghegan',
    description: 'Connect with me professionally and view my experience.'
  }
];

export function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean;
    message?: string;
  }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({});

    try {
      const result = await submitContactForm(formData);
      
      if (result.success) {
        setSubmitStatus({
          success: true,
          message: 'Thank you! Your message has been sent successfully.'
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus({
          success: false,
          message: 'Something went wrong. Please try again later.'
        });
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      setSubmitStatus({
        success: false,
        message: 'Something went wrong. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-16 md:py-24 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8" style={{ boxSizing: 'border-box', minWidth: 0 }}>
        <div className="space-y-12">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-4"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
              Get in Touch
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              I&apos;m always open to new opportunities and collaborations.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto" style={{ minWidth: 0 }}>
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-6 min-w-0"
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Send me a message
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4 min-w-0">
                <div className="w-full min-w-0">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 
                      bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                      focus:ring-2 focus:ring-orange-500 dark:focus:ring-purple-500 focus:border-transparent
                      transition-all duration-200"
                    placeholder="Your name"
                  />
                </div>
                
                <div className="w-full min-w-0">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 
                      bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                      focus:ring-2 focus:ring-orange-500 dark:focus:ring-purple-500 focus:border-transparent
                      transition-all duration-200"
                    placeholder="Your email"
                  />
                </div>
                
                <div className="w-full min-w-0">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 
                      bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                      focus:ring-2 focus:ring-orange-500 dark:focus:ring-purple-500 focus:border-transparent
                      transition-all duration-200"
                    placeholder="Your message"
                  />
                </div>
                
                {submitStatus.message && (
                  <div className={`p-3 rounded-lg ${submitStatus.success ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'}`}>
                    {submitStatus.message}
                  </div>
                )}
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto px-6 py-3 rounded-lg
                    bg-gradient-to-r from-orange-400 via-orange-500 to-red-500 dark:from-purple-500 dark:via-indigo-500 dark:to-indigo-600
                    hover:from-orange-500 hover:via-orange-600 hover:to-red-600 dark:hover:from-purple-600 dark:hover:via-indigo-600 dark:hover:to-indigo-700
                    text-white shadow-lg shadow-orange-500/20 dark:shadow-purple-500/20
                    transition-all duration-300 hover:scale-105 disabled:opacity-70 disabled:hover:scale-100
                    flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <Icons.spinner className="w-5 h-5 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Icons.send className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </motion.div>
            
            {/* Contact Methods Grid */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="min-w-0"
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Other ways to connect
              </h3>
              
              <div className="space-y-4">
                {contactMethods.map((method, index) => (
                  <motion.div
                    key={method.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="min-w-0"
                  >
                    <a
                      href={method.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start p-4 w-full
                        bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm
                        border border-gray-200 dark:border-gray-700
                        hover:border-orange-200 dark:hover:border-purple-500/30
                        hover:shadow-lg hover:shadow-orange-500/10 dark:hover:shadow-purple-500/10
                        rounded-xl transition-all duration-300"
                    >
                      <div className="p-3 mr-4 rounded-lg 
                        bg-gradient-to-br from-orange-400 via-orange-300 to-red-400/40 
                        dark:from-purple-500 dark:via-indigo-500/50 dark:to-indigo-600/30
                        group-hover:from-orange-400 group-hover:via-orange-300 group-hover:to-red-400/60 
                        dark:group-hover:from-purple-500 dark:group-hover:via-indigo-500/70 dark:group-hover:to-indigo-600/50
                        transition-all duration-300"
                      >
                        <method.icon className="w-6 h-6 text-white dark:text-white" />
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                          {method.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                          {method.description}
                        </p>
                        <div className="flex items-center text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500 dark:from-purple-400 dark:to-indigo-500 font-medium">
                          <span className="text-sm">{method.value}</span>
                          <Icons.arrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </a>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
