import React from "react";
import {
  HiShieldCheck,
  HiDocumentText,
  HiUserGroup,
  HiGlobe,
  HiCreditCard,
  HiLockClosed,
  HiExclamation,
} from "react-icons/hi";

const Policy = () => {
  const sections = [
    {
      id: "terms",
      title: "Terms of Service",
      icon: HiDocumentText,
      content: [
        {
          subtitle: "1. Acceptance of Terms",
          text: "By accessing and using ELearning, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.",
        },
        {
          subtitle: "2. Use License",
          text: "Permission is granted to temporarily download one copy of the materials on Ilmo's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.",
        },
        {
          subtitle: "3. User Account",
          text: "You are responsible for safeguarding the password and for maintaining the confidentiality of your account. You agree not to disclose your password to any third party and to take sole responsibility for activities that occur under your account.",
        },
        {
          subtitle: "4. Course Content",
          text: "All course materials, including videos, documents, and assessments, are the intellectual property of Ilmo and its instructors. Users may not redistribute, reproduce, or share course content without explicit permission.",
        },
      ],
    },
    {
      id: "privacy",
      title: "Privacy Policy",
      icon: HiLockClosed,
      content: [
        {
          subtitle: "1. Information We Collect",
          text: "We collect information you provide directly to us, such as when you create an account, enroll in courses, or contact us. This includes your name, email address, and learning progress data.",
        },
        {
          subtitle: "2. How We Use Your Information",
          text: "We use the information we collect to provide, maintain, and improve our services, process transactions, send you technical notices and support messages, and communicate with you about courses and features.",
        },
        {
          subtitle: "3. Information Sharing",
          text: "We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy or as required by law.",
        },
        {
          subtitle: "4. Data Security",
          text: "We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.",
        },
      ],
    },
    {
      id: "payment",
      title: "Payment & Refund Policy",
      icon: HiCreditCard,
      content: [
        {
          subtitle: "1. Course Pricing",
          text: "All course prices are listed in USD and are subject to change without notice. The price charged will be the price displayed at the time of purchase.",
        },
        {
          subtitle: "2. Payment Methods",
          text: "We accept major credit cards, PayPal, and other payment methods as displayed during checkout. All payments are processed securely through our payment partners.",
        },
        {
          subtitle: "3. Refund Policy",
          text: "We offer a 30-day money-back guarantee for all courses. If you're not satisfied with your purchase, you may request a full refund within 30 days of enrollment.",
        },
        {
          subtitle: "4. Subscription Billing",
          text: "For subscription-based services, you will be automatically charged on a recurring basis until you cancel your subscription through your account settings.",
        },
      ],
    },
    {
      id: "usage",
      title: "Acceptable Use Policy",
      icon: HiUserGroup,
      content: [
        {
          subtitle: "1. Prohibited Activities",
          text: "You may not use our service to upload, post, or transmit any content that is illegal, harmful, threatening, abusive, defamatory, or otherwise objectionable.",
        },
        {
          subtitle: "2. Academic Integrity",
          text: "Students are expected to complete coursework honestly and independently. Sharing answers, cheating on assessments, or engaging in academic dishonesty is strictly prohibited.",
        },
        {
          subtitle: "3. Community Guidelines",
          text: "Treat all community members with respect. Harassment, discrimination, or inappropriate behavior towards other users will result in account suspension or termination.",
        },
        {
          subtitle: "4. Content Sharing",
          text: "Users may not share, distribute, or republish course content outside of the platform without explicit written permission from Ilmo.",
        },
      ],
    },
    {
      id: "intellectual",
      title: "Intellectual Property",
      icon: HiShieldCheck,
      content: [
        {
          subtitle: "1. Course Materials",
          text: "All course content, including but not limited to videos, text, graphics, logos, and software, is owned by ELearning or its content partners and is protected by copyright and other intellectual property laws.",
        },
        {
          subtitle: "2. User-Generated Content",
          text: "By submitting content to ELearning(such as course reviews or forum posts), you grant us a non-exclusive, royalty-free license to use, modify, and display such content.",
        },
        {
          subtitle: "3. Trademark Policy",
          text: "ELearning and its logo are trademarks of our company. You may not use our trademarks without our prior written consent.",
        },
        {
          subtitle: "4. DMCA Compliance",
          text: "We respect intellectual property rights and will respond to clear notices of alleged copyright infringement in accordance with the Digital Millennium Copyright Act.",
        },
      ],
    },
    {
      id: "disclaimers",
      title: "Disclaimers & Limitations",
      icon: HiExclamation,
      content: [
        {
          subtitle: "1. Service Availability",
          text: "While we strive to maintain consistent service availability, we do not guarantee that our platform will be available 24/7 without interruption.",
        },
        {
          subtitle: "2. Educational Outcomes",
          text: "While our courses are designed to provide valuable education, we cannot guarantee specific learning outcomes or career results.",
        },
        {
          subtitle: "3. Third-Party Links",
          text: "Our platform may contain links to third-party websites. We are not responsible for the content or practices of these external sites.",
        },
        {
          subtitle: "4. Limitation of Liability",
          text: "In no event shall ELearning be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use of our service.",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <HiDocumentText className="text-6xl lg:text-8xl" />
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold font-Poppins mb-6">
              Terms & Policies
            </h1>
            <p className="text-xl lg:text-2xl opacity-90 max-w-3xl mx-auto leading-relaxed">
              Your rights, responsibilities, and our commitment to providing a
              safe and secure learning environment.
            </p>
          </div>
        </div>
      </section>

      {/* Last Updated Notice */}
      <section className="bg-blue-50 dark:bg-gray-800 border-b border-blue-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="text-center">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>Last Updated:</strong> August 2025 |
              <span className="ml-2">
                These terms are effective immediately upon posting
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="py-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Quick Navigation
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sections.map((section, index) => (
              <a
                key={index}
                href={`#${section.id}`}
                className="flex items-center p-4 bg-white dark:bg-gray-900 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 group"
              >
                <section.icon className="text-2xl text-blue-600 dark:text-blue-400 mr-3 group-hover:scale-110 transition-transform" />
                <span className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {section.title}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Policy Sections */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {sections.map((section, index) => (
              <div
                key={index}
                id={section.id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 lg:p-12 border border-gray-200 dark:border-gray-700"
              >
                {/* Section Header */}
                <div className="flex items-center mb-8">
                  <div className="text-blue-600 dark:text-blue-400 mr-4">
                    <section.icon className="text-4xl" />
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
                    {section.title}
                  </h2>
                </div>

                {/* Section Content */}
                <div className="space-y-8">
                  {section.content.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="border-l-4 border-blue-500 pl-6"
                    >
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                        {item.subtitle}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Notice */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg opacity-90">
            By using ELearning, you acknowledge that you have read, understood, and
            agree to be bound by these terms and policies.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Policy;
