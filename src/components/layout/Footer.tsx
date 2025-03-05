import { Container } from './Container';
import { Icons } from '../ui/Icons';
import Link from 'next/link';

const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/adequatej',
    icon: Icons.github
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/jed-geoghegan',
    icon: Icons.linkedin
  },
];

const footerLinks = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

export function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-12">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-16">
          {/* Brand */}
          <div className="space-y-4 md:pr-8">
            <Link 
              href="/" 
              className="text-xl font-bold bg-gradient-to-r from-orange-400 to-red-500 dark:from-purple-500 dark:to-indigo-600 bg-clip-text text-transparent inline-block"
            >
              Jed Geoghegan
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Full Stack Developer focused on creating beautiful, user-centered applications with modern technologies.
            </p>
          </div>

          {/* Links */}
          <div className="md:flex md:justify-center">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-4">Navigation</h3>
              <ul className="space-y-2">
                {footerLinks.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-sm text-gray-600 hover:text-orange-500 dark:text-gray-400 dark:hover:text-purple-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact */}
          <div className="md:flex md:justify-center">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-4">Contact</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>RI/MA/NY</li>
                <li>
                  <a 
                    href="mailto:jedgeoghegan@gmail.com" 
                    className="hover:text-orange-500 dark:hover:text-purple-400 transition-colors"
                  >
                    jedgeoghegan@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Social */}
          <div className="md:flex md:justify-center">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-4">Connect</h3>
              <div className="flex space-x-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-orange-500 dark:text-gray-400 dark:hover:text-purple-400 transition-colors"
                    aria-label={link.name}
                  >
                    <link.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>© {new Date().getFullYear()} Jed Geoghegan. All rights reserved.</p>
          <p className="mt-2">
            Built with Next.js, TypeScript, and Tailwind CSS
          </p>
        </div>
      </Container>
    </footer>
  );
}
