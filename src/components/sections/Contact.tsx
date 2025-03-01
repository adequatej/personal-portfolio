"use client";

import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { Input, TextArea } from '@/components/ui/Form';
import { Icons } from '@/components/ui/Icons';
import { motion } from 'framer-motion';
import { useState } from 'react';

const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/yourusername',
    icon: Icons.github
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/yourusername',
    icon: Icons.linkedin
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/yourusername',
    icon: Icons.twitter
  }
];

type FormData = {
  name: string;
  email: string;
  message: string;
};

type FormErrors = {
  [K in keyof FormData]?: string;
};

export function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Replace with your actual form submission logic
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-2 gap-12 md:gap-8 lg:gap-12"
        >
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                Get in Touch
              </h2>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
                Have a question or want to work together? Feel free to reach out!
              </p>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Connect with me</h3>
              <div className="flex gap-4">
                {socialLinks.map(link => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 
                             dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 
                             transition-colors duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={link.name}
                  >
                    <link.icon className="w-6 h-6" />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <Input
              label="Name"
              type="text"
              value={formData.name}
              onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
              error={errors.name}
              disabled={isSubmitting}
              required
            />

            <Input
              label="Email"
              type="email"
              value={formData.email}
              onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
              error={errors.email}
              disabled={isSubmitting}
              required
            />

            <TextArea
              label="Message"
              value={formData.message}
              onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
              error={errors.message}
              disabled={isSubmitting}
              rows={5}
              required
            />

            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting}
              isLoading={isSubmitting}
            >
              Send Message
            </Button>

            {submitStatus === 'success' && (
              <p className="text-green-600 dark:text-green-400 text-sm">
                Message sent successfully! I'll get back to you soon.
              </p>
            )}

            {submitStatus === 'error' && (
              <p className="text-red-600 dark:text-red-400 text-sm">
                Something went wrong. Please try again later.
              </p>
            )}
          </motion.form>
        </motion.div>
      </Container>
    </section>
  );
}
