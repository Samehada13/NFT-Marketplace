import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useAnimation, useInView } from 'framer-motion';
import image from '../img';
import Logo from '../public/GABR-text-logo.svg';
import {
  ShieldCheckIcon,
  SparklesIcon,
  AcademicCapIcon,
  LockClosedIcon,
  CheckBadgeIcon,
  RocketLaunchIcon,
  ChartBarIcon,
  UserGroupIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';

const AboutUs = () => {
  const founderArray = [
    { name: 'Darwin Pajarillo', position: 'Founder', images: image.user2 },
    { name: ' ', position: 'Co-Founder', images: image.user4 },
    { name: ' ', position: 'Chairman', images: image.user5 },
    { name: ' ', position: 'Programmer', images: image.user7 },
    { name: ' ', position: 'Designer', images: image.user8 },
    { name: ' ', position: 'Software Engineer', images: image.user9 },
    { name: ' ', position: 'Operations', images: image.user10 },
    { name: ' ', position: 'Producer', images: image.user3 },
  ];

  const features = [
    {
      icon: ShieldCheckIcon,
      title: 'Patent-Protected Technology',
      description: 'Casanona Note\'s exclusive patent ensures unmatched authenticity and security for all digital assets.'
    },
    {
      icon: CheckBadgeIcon,
      title: 'Authenticity Verification',
      description: 'Every NFT is verified and certified, guaranteeing genuine ownership and provenance tracking.'
    },
    {
      icon: LockClosedIcon,
      title: 'IP Rights Protection',
      description: 'Comprehensive intellectual property rights management for creators and collectors alike.'
    },
    {
      icon: AcademicCapIcon,
      title: 'Student Support Program',
      description: 'Empowering students and graduates in Camarines Norte to monetize their digital creations.'
    }
  ];

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-slate-100'>
      {/* Hero Section */}
      <HeroSection />

      {/* Mission Section */}
      <MissionSection features={features} />

      {/* Platform Features */}
      <PlatformFeaturesSection />

      {/* Team Section */}
      <TeamSection founderArray={founderArray} />

      {/* Impact & Achievements */}
      <ImpactSection />

      {/* Trust & Security */}
      <TrustSection />
    </div>
  );
};

// Hero Section Component
const HeroSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className='relative overflow-hidden bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 py-24 lg:py-32'
    >
      {/* Animated Background Elements */}
      <div className='absolute inset-0 overflow-hidden'>
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className='absolute top-10 right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl'
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className='absolute bottom-10 left-10 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl'
        />
      </div>

      <div className='max-w-7xl mx-auto px-6 relative z-10'>
        <div className='text-center mb-16'>
          <motion.h1
            variants={itemVariants}
            className='text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight'
          >
            Building the Future of<br />Digital Ownership
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className='text-xl lg:text-2xl text-purple-100 max-w-3xl mx-auto leading-relaxed'
          >
            Empowering creators in Camarines Norte with patent-protected NFT technology.
            Trade, collect, and protect your digital assets with confidence.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className='flex flex-col sm:flex-row gap-4 justify-center mt-10'
          >
            <button className='px-8 py-4 bg-white text-purple-600 rounded-full font-bold text-lg hover:bg-purple-50 transition-all hover:scale-105 shadow-xl'>
              Explore Marketplace
            </button>
            <button className='px-8 py-4 bg-purple-800 text-white rounded-full font-bold text-lg hover:bg-purple-900 transition-all hover:scale-105 shadow-xl border-2 border-white/20'>
              Join Our Community
            </button>
          </motion.div>
        </div>

        {/* Stats Bar */}
        <StatsBar />
      </div>
    </motion.section>
  );
};

// Animated Stats Bar
const StatsBar = () => {
  const stats = [
    { label: 'Market Value', value: 40, suffix: 'B+', prefix: '$' },
    { label: 'Total Sales', value: 152, suffix: 'M+', prefix: '' },
    { label: 'Daily Users', value: 250, suffix: 'K+', prefix: '' },
    { label: 'Active Creators', value: 50, suffix: 'K+', prefix: '' }
  ];

  return (
    <div className='grid grid-cols-2 lg:grid-cols-4 gap-6'>
      {stats.map((stat, index) => (
        <AnimatedStatCard key={index} stat={stat} delay={index * 0.1} />
      ))}
    </div>
  );
};

const AnimatedStatCard = ({ stat, delay }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const end = stat.value;
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [inView, stat.value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay, duration: 0.5 }}
      className='bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20'
    >
      <div className='text-4xl lg:text-5xl font-bold text-white mb-2'>
        {stat.prefix}{count}{stat.suffix}
      </div>
      <div className='text-purple-100 font-medium'>{stat.label}</div>
    </motion.div>
  );
};

// Mission Section Component
const MissionSection = ({ features }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className='py-24 lg:py-32 bg-white'>
      <div className='max-w-7xl mx-auto px-6'>
        <div className='grid lg:grid-cols-1 gap-16 items-center'>
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className='flex items-center gap-3 mb-6'>
              <div className='w-2 h-16 bg-gradient-to-b from-purple-600 to-pink-500 rounded-full' />
              <h2 className='text-4xl lg:text-6xl font-bold text-slate-900'>
                Our Mission
              </h2>
            </div>

            <div className='space-y-6 text-slate-700 text-lg leading-relaxed'>
              <p>
                <strong className='text-purple-600'>Revolutionizing digital ownership</strong> through
                blockchain technology and patent-protected innovation. Our NFT marketplace empowers creators
                to monetize their digital works while ensuring authenticity and security.
              </p>
              <p>
                Focused on supporting <strong>graphic designers and digital artists in Camarines Norte</strong>,
                we provide a platform that extends beyond regional boundaries, connecting local talent with
                global collectors.
              </p>
              <p>
                Built on <strong>Casanona Note's patent-protected technology</strong>, every transaction
                guarantees verified ownership, intellectual property protection, and seamless blockchain integration.
              </p>
            </div>

            {/* Feature Icons Grid */}
            <div className='grid sm:grid-cols-1 gap-6 mt-10'>
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                  className='flex gap-4 items-start'
                >
                  <div className='flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-500 rounded-xl flex items-center justify-center'>
                    <feature.icon className='w-6 h-6 text-white' />
                  </div>
                  <div>
                    <h3 className='font-bold text-slate-900 mb-1'>{feature.title}</h3>
                    <p className='text-sm text-slate-600'>{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

// Platform Features Section
const PlatformFeaturesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  const platformFeatures = [
    {
      icon: RocketLaunchIcon,
      title: 'Lightning-Fast Trading',
      description: 'Execute trades in seconds with our optimized blockchain infrastructure and instant verification.',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Bank-Level Security',
      description: 'Military-grade encryption and multi-layer authentication protect your valuable digital assets.',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: ChartBarIcon,
      title: 'Advanced Analytics',
      description: 'Track market trends, portfolio performance, and make data-driven decisions with real-time insights.',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: GlobeAltIcon,
      title: 'Global Marketplace',
      description: 'Connect with collectors worldwide while supporting local Camarines Norte talent and creators.',
      gradient: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <section ref={ref} className='py-24 lg:py-32 bg-white'>
      <div className='max-w-7xl mx-auto px-6'>
        <div className='text-center mb-16'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className='text-4xl lg:text-6xl font-bold text-slate-900 mb-4'>
              Platform Features
            </h2>
            <p className='text-xl text-slate-600 max-w-2xl mx-auto'>
              Built with cutting-edge technology to deliver the best NFT trading experience
            </p>
          </motion.div>
        </div>

        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {platformFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className='group relative'
            >
              {/* Glassmorphism Card */}
              <div className='relative bg-white/60 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2'>


                {/* Icon */}
                <div className={`w-16 h-16 mb-6 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                  <feature.icon className='w-8 h-8 text-white' />
                </div>

                {/* Content */}
                <h3 className='text-2xl font-bold text-slate-900 mb-3'>
                  {feature.title}
                </h3>
                <p className='text-slate-600 leading-relaxed'>
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Team Section Component
const TeamSection = ({ founderArray }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className='py-24 lg:py-32 bg-white'>
      <div className='max-w-7xl mx-auto px-6'>
        <div className='mb-16'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className='text-center'
          >
            <div className='flex items-center justify-center gap-3 mb-6'>
              <h2 className='text-4xl lg:text-6xl font-bold text-slate-900'>
                Meet Our Team
              </h2>
            </div>
            <p className='text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed'>
              A passionate group of innovators, designers, and technologists dedicated to
              revolutionizing the NFT marketplace. Our diverse expertise ensures every aspect
              of your digital asset journey is seamless and secure.
            </p>
          </motion.div>
        </div>

        <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-8'>
          {founderArray.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className='group'
            >
              <div className='relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2'>
                {/* Image Container with Gradient Overlay */}
                <div className='aspect-square relative overflow-hidden'>
                  <Image
                    src={member.images}
                    alt={member.name}
                    fill
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw'
                    className='object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-500'
                  />
                  {/* Gradient Overlay on Hover */}
                  <div className='absolute inset-0 bg-gradient-to-t from-purple-600/90 via-purple-600/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />

                  {/* Role appears on hover */}
                  <div className='absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300'>
                    <p className='text-white font-bold text-lg'>{member.position}</p>
                  </div>
                </div>

                {/* Name Card */}
                <div className='p-6 bg-gradient-to-br from-purple-600 to-pink-500'>
                  <h3 className='text-xl font-bold text-white text-center'>
                    {member.name || 'Team Member'}
                  </h3>
                  <p className='text-purple-100 text-center text-sm mt-1 group-hover:hidden'>
                    {member.position}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

// Impact & Achievements Section
const ImpactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  const impacts = [
    {
      icon: ChartBarIcon,
      value: 40,
      suffix: 'B+',
      prefix: '$',
      label: 'Total Market Value',
      description: 'The NFT market continues to grow exponentially'
    },
    {
      icon: SparklesIcon,
      value: 91.8,
      suffix: 'M',
      prefix: '$',
      label: 'Highest NFT Sale',
      description: 'Record-breaking digital art transactions'
    },
    {
      icon: RocketLaunchIcon,
      value: 152,
      suffix: 'M+',
      prefix: '',
      label: 'Total NFT Sales',
      description: 'Thousands of transactions happen daily'
    }
  ];

  return (
    <section ref={ref} className='py-24 lg:py-32 bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 relative overflow-hidden'>
      {/* Background Pattern */}
      <div className='absolute inset-0 opacity-10'>
        <div className='absolute inset-0' style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className='max-w-7xl mx-auto px-6 relative z-10'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className='text-center mb-16'
        >
          <h2 className='text-4xl lg:text-6xl font-bold text-white mb-4'>
            Impact & Achievements
          </h2>
          <p className='text-xl text-purple-100 max-w-2xl mx-auto'>
            Driving innovation in the digital ownership economy
          </p>
        </motion.div>

        <div className='grid md:grid-cols-3 gap-8'>
          {impacts.map((impact, index) => (
            <ImpactCard key={index} impact={impact} delay={index * 0.2} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ImpactCard = ({ impact, delay }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const end = impact.value;
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [inView, impact.value]);

  const displayValue = impact.value % 1 === 0 ? Math.floor(count) : count.toFixed(1);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.6 }}
      className='bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 text-center hover:bg-white/20 transition-all duration-300'
    >
      <div className='w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6'>
        <impact.icon className='w-8 h-8 text-white' />
      </div>
      <div className='text-5xl lg:text-6xl font-bold text-white mb-3'>
        {impact.prefix}{displayValue}{impact.suffix}
      </div>
      <h3 className='text-2xl font-bold text-white mb-2'>{impact.label}</h3>
      <p className='text-purple-100'>{impact.description}</p>
    </motion.div>
  );
};

// Trust & Security Section
const TrustSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  const trustFeatures = [
    {
      icon: ShieldCheckIcon,
      title: 'Patent Protection',
      description: 'Casanona Note\'s exclusive patent technology ensures your digital assets are protected with industry-leading security measures.'
    },
    {
      icon: LockClosedIcon,
      title: 'Blockchain Security',
      description: 'Immutable blockchain records provide transparent, tamper-proof verification of ownership and transaction history.'
    },
    {
      icon: CheckBadgeIcon,
      title: 'Verified Authenticity',
      description: 'Every NFT undergoes rigorous authentication to guarantee genuine artwork and prevent counterfeits.'
    }
  ];

  return (
    <section ref={ref} className='py-24 lg:py-32 bg-white'>
      <div className='max-w-7xl mx-auto px-6'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className='text-center mb-16'
        >
          <h2 className='text-4xl lg:text-6xl font-bold text-slate-900 mb-4'>
            Trust & Security
          </h2>
          <p className='text-xl text-slate-600 max-w-2xl mx-auto'>
            Your digital assets are protected by cutting-edge technology and patent-protected innovation
          </p>
        </motion.div>

        <div className='grid md:grid-cols-3 gap-8 mb-16'>
          {trustFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className='text-center'
            >
              <div className='w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl'>
                <feature.icon className='w-10 h-10 text-white' />
              </div>
              <h3 className='text-2xl font-bold text-slate-900 mb-3'>{feature.title}</h3>
              <p className='text-slate-600 leading-relaxed'>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};


export default AboutUs;
