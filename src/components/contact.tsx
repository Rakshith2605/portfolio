'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Mail, Phone, MapPin, Github, Linkedin } from 'lucide-react';

export function Contact() {
  // Contact information
  const contactInfo = {
    name: 'Rakshith Dharmappa',
    email: 'dharmappa.r@northeastern.edu',
    phone: '+1-857-398-3843',
    location: 'Frisco, Dallas',
    hometown: 'Bengaluru',
    socials: [
      {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/in/rakshithd26',
        icon: <Linkedin className="inline h-5 w-5 mr-1 text-blue-700" />,
      },
      {
        name: 'GitHub',
        url: 'https://github.com/rakshith2605',
        icon: <Github className="inline h-5 w-5 mr-1 text-black dark:text-white" />,
      },
    ],
  };

  // Function to handle opening links
  const openLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="mx-auto mt-8 w-full">
      <div className="bg-accent w-full overflow-hidden rounded-3xl px-6 py-8 font-sans sm:px-10 md:px-16 md:py-12">
        {/* Header Section */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-foreground text-3xl font-semibold md:text-4xl">
            Contacts
          </h2>
        </div>

        {/* Contact Details Section */}
        <div className="mt-8 flex flex-col md:mt-10 gap-2">
          {/* Email */}
          <div
            className="group flex items-center gap-2 mb-2 cursor-pointer"
            onClick={() => openLink(`mailto:${contactInfo.email}`)}
          >
            <Mail className="h-5 w-5 text-blue-500" />
            <span className="text-base font-medium text-blue-500 hover:underline sm:text-lg">
              {contactInfo.email}
            </span>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-2 mb-2">
            <Phone className="h-5 w-5 text-green-500" />
            <span className="text-muted-foreground text-base sm:text-lg">
              {contactInfo.phone}
            </span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="h-5 w-5 text-red-500" />
            <span className="text-muted-foreground text-base sm:text-lg">
              {contactInfo.location} <span className="text-xs text-gray-500">(Current)</span>
            </span>
          </div>
          {/* Hometown */}
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="h-5 w-5 text-yellow-500" />
            <span className="text-muted-foreground text-base sm:text-lg">
              {contactInfo.hometown} <span className="text-xs text-gray-500">(Hometown)</span>
            </span>
          </div>

          {/* Social Links as List */}
          <ul className="flex flex-col gap-2 mt-2">
            {contactInfo.socials.map((social) => (
              <li key={social.name}>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:underline text-base"
                  title={social.name}
                >
                  {social.icon}
                  {social.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Contact;
