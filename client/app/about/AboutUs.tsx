import React from "react";
import Image from "next/image";
import {
  HiAcademicCap,
  HiUsers,
  HiLightBulb,
  HiGlobeAlt,
  HiStar,
  HiHeart,
  HiShieldCheck,
  HiChartBar,
} from "react-icons/hi";
import {
  FaGraduationCap,
  FaChalkboardTeacher,
  FaCertificate,
  FaRocket,
} from "react-icons/fa";
import Link from "next/link";

const AboutUs = () => {
  const stats = [
    { icon: HiUsers, number: "50,000+", label: "Active Students" },
    { icon: FaChalkboardTeacher, number: "500+", label: "Expert Instructors" },
    { icon: FaGraduationCap, number: "1,000+", label: "Courses Available" },
    { icon: FaCertificate, number: "25,000+", label: "Certificates Issued" },
  ];

  const features = [
    {
      icon: HiLightBulb,
      title: "Expert-Led Learning",
      description:
        "Learn from industry professionals with years of real-world experience in their respective fields.",
    },
    {
      icon: HiGlobeAlt,
      title: "Global Community",
      description:
        "Join a worldwide community of learners and connect with students from over 100 countries.",
    },
    {
      icon: HiStar,
      title: "Quality Content",
      description:
        "High-quality, up-to-date course content that&apos;s regularly reviewed and updated by experts.",
    },
    {
      icon: HiShieldCheck,
      title: "Lifetime Access",
      description:
        "Once enrolled, enjoy lifetime access to your courses with all future updates included.",
    },
  ];

  const team = [
    {
      name: "Kevin Peiterson",
      role: "Founder & CEO",
      avatar:
         "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
      description:
        "Passionate educator and tech entrepreneur with 10+ years in software development and education.",
    },
    {
      name: "Sarah Johnson",
      role: "Head of Education",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
      description:
        "Former university professor with expertise in curriculum development and instructional design.",
    },
    {
      name: "Michael Chen",
      role: "Chief Technology Officer",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      description:
        "Full-stack developer and system architect passionate about creating seamless learning experiences.",
    },
  ];

  const values = [
    {
      icon: HiHeart,
      title: "Student-Centric",
      description:
        "Every decision we make is guided by what&apos;s best for our students&apos; learning journey.",
    },
    {
      icon: HiChartBar,
      title: "Continuous Improvement",
      description:
        "We constantly evolve our platform and content based on student feedback and industry trends.",
    },
    {
      icon: FaRocket,
      title: "Innovation",
      description:
        "We embrace new technologies and teaching methods to enhance the learning experience.",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <HiAcademicCap className="text-6xl lg:text-8xl" />
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold font-Poppins mb-6">
              About ELearning
            </h1>
            <p className="text-xl lg:text-2xl opacity-90 max-w-3xl mx-auto leading-relaxed">
              Empowering learners worldwide through innovative, interactive
              education that transforms knowledge into real-world success.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                At ELearning, we believe that quality education should be accessible
                to everyone, everywhere. Our mission is to democratize learning
                by providing world-class educational content that adapts to your
                schedule, pace, and learning style.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                We&apos;re not just an online learning platform – we&apos;re a
                community of passionate educators, industry experts, and
                lifelong learners working together to create the future of
                education.
              </p>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <stat.icon className="text-4xl mb-2 mx-auto" />
                      <div className="text-2xl lg:text-3xl font-bold mb-1">
                        {stat.number}
                      </div>
                      <div className="text-sm opacity-90">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose ELearning?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              We&apos;re committed to providing the best learning experience
              through cutting-edge technology and proven educational methods.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
              >
                <div className="text-blue-600 dark:text-blue-400 mb-4">
                  <feature.icon className="text-4xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Story
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              From a simple idea to a global learning platform
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 lg:p-12 border border-gray-200 dark:border-gray-700">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                ELearning was founded in 2023 with a simple yet powerful vision: to
                make quality education accessible to everyone, regardless of
                their location, background, or circumstances. Our founder,
                Kevin Peiterson, recognized the gap between traditional
                education and the rapidly evolving demands of the modern world.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                Starting as a small team of passionate educators and developers,
                we set out to create an interactive learning management system
                that would revolutionize how people learn and grow together.
                Today, ELearning serves thousands of students worldwide, offering
                courses in technology, business, design, and more.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                Our journey has just begun. We continue to innovate, expand our
                course offerings, and build features that make learning more
                engaging, effective, and enjoyable for everyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              The passionate individuals behind ELearning&apos;s success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 text-center"
              >
                <div className="relative w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {member.name}
                </h3>
                <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="text-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="text-blue-600 dark:text-blue-400 mb-6">
                  <value.icon className="text-5xl mx-auto" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of students who are already transforming their
            careers with ELearning&apos;s comprehensive courses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/courses"
              className="px-8 py-4 cursor-pointer bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Browse Courses
            </Link>
            <a
              target="_blank"
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=zamszamato17@gmail.com`}
            >
              <button className=" cursor-pointer px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors">
                Contact Us
              </button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
