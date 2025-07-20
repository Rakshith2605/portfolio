'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

export function Contact() {
  // Contact information
  const contactInfo = {
    name: 'Rakshith Dharmappa',
    email: 'dharmappa.r@northeastern.edu',
    phone: '+1-857-398-3843',
    location: 'Peenya, Bangalore',
    handle: '@rakshith2605',
    socials: [
      {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/in/rakshithd26',
      },
      {
        name: 'Github',
        url: 'https://github.com/rakshith2605',
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
          <span className="mt-2 sm:mt-0">
            {contactInfo.handle}
          </span>
        </div>

        {/* Contact Details Section */}
        <div className="mt-8 flex flex-col md:mt-10">
          {/* Email */}
          <div
            className="group mb-4 cursor-pointer"
            onClick={() => openLink(`mailto:${contactInfo.email}`)}
          >
            <div className="flex items-center gap-1">
              <span className="text-base font-medium text-blue-500 hover:underline sm:text-lg">
                {contactInfo.email}
              </span>
              <ChevronRight className="h-5 w-5 text-blue-500 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </div>

          {/* Phone */}
          <div className="mb-4">
            <span className="text-muted-foreground text-base sm:text-lg">
              {contactInfo.phone}
            </span>
          </div>

          {/* Location */}
          <div className="mb-6">
            <span className="text-muted-foreground text-base sm:text-lg">
              {contactInfo.location}
            </span>
            <p className="text-muted-foreground mt-2 text-sm">
              (I respond to emails in &lt;24h, texts are treated as urgent)
            </p>
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap gap-x-6 gap-y-5 sm:gap-x-8">
            {contactInfo.socials.map((social) => (
              <button
                key={social.name}
                className="text-muted-foreground hover:text-foreground cursor-pointer text-sm transition-colors"
                onClick={() => openLink(social.url)}
                title={social.name}
              >
                {social.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
