import React, { useContext, useState } from "react";

import HERO_IMG from "../assets/hero-img.png";
import { useNavigate } from "react-router-dom";
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import Modal from "../components/Modal";
import { UserContext } from "../context/userContext";
import ProfileInfoCard from "../components/Cards/ProfileInfoCard";
import { FiEdit3, FiZap, FiDownload, FiArrowRight, FiCheck } from "react-icons/fi";

const LandingPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const handleCTA = () => {
    if (!user) {
      setOpenAuthModal(true);
    } else {
      navigate("/dashboard");
    }
  };

  const features = [
    {
      icon: FiEdit3,
      title: "Smart Editing",
      description: "Live preview with instant formatting. Watch your resume transform in real-time."
    },
    {
      icon: FiZap,
      title: "Beautiful Templates",
      description: "Choose from stunning, professional templates designed by experts."
    },
    {
      icon: FiDownload,
      title: "One-Click Export",
      description: "Download as PDF instantly. Share with anyone, anywhere."
    }
  ];

  const steps = [
    { number: "01", title: "Create", description: "Start your resume with basic information" },
    { number: "02", title: "Customize", description: "Choose templates and personalize colors" },
    { number: "03", title: "Export", description: "Download and share your resume" }
  ];

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-gray-200/50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <FiEdit3 className="text-white text-lg" />
            </div>
            <span className="text-xl font-bold text-gray-900">ResumeBuilder</span>
          </div>
          {user ? (
            <ProfileInfoCard />
          ) : (
            <button
              className="px-6 py-2.5 rounded-lg font-semibold text-sm text-white bg-gradient-to-r from-indigo-500 to-indigo-600 hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-200"
              onClick={() => setOpenAuthModal(true)}
            >
              Sign In
            </button>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-float-up">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-indigo-100/50 border border-indigo-200">
              <FiZap className="text-indigo-600 text-sm" />
              <span className="text-sm font-semibold text-indigo-600">Introducing Resume Builder 2.0</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-gray-900">
              Build Your{" "}
              <span className="gradient-text">Perfect Resume</span>
              <span className="text-gray-900"> Instantly</span>
            </h1>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Craft a standout resume in minutes with our AI-powered resume builder. Professional, modern, and ready to impress.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                className="group px-8 py-4 rounded-lg font-semibold text-white bg-gradient-to-r from-indigo-500 to-indigo-600 hover:shadow-xl hover:shadow-indigo-500/40 transition-all duration-200 flex items-center justify-center gap-2"
                onClick={handleCTA}
              >
                Get Started <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="mt-10 flex gap-6 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <FiCheck className="text-indigo-500 text-lg" />
                No credit card required
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <FiCheck className="text-indigo-500 text-lg" />
                Takes 5 minutes
              </div>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl blur-3xl"></div>
              <img
                src={HERO_IMG}
                alt="Resume Builder Interface"
                className="relative rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need
            </h2>
            <p className="text-lg text-gray-600">
              Powerful features designed to make resume building effortless
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="card-hover p-8 animate-float-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center mb-4">
                    <Icon className="text-indigo-600 text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600">
              Get your perfect resume in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center animate-float-up" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="mb-6 inline-flex">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-indigo-500/30">
                    {step.number}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute right-0 top-1/4 -mr-4 text-indigo-300">
                    <FiArrowRight className="text-3xl" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-indigo-500 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Build Your Resume?
          </h2>
          <p className="text-lg text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have created stunning resumes with our builder.
          </p>
          <button
            className="px-8 py-4 rounded-lg font-semibold text-indigo-600 bg-white hover:shadow-xl hover:shadow-indigo-500/40 transition-all duration-200"
            onClick={handleCTA}
          >
            Get Started Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/50 backdrop-blur-lg border-t border-gray-200/50 py-8">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          <p>© 2024 ResumeBuilder. All rights reserved.</p>
        </div>
      </footer>

      {/* Auth Modal */}
      <Modal isOpen={openAuthModal} onClose={() => setOpenAuthModal(false)}>
        {currentPage === "login" ? (
          <Login
            onSwitch={() => setCurrentPage("signup")}
            onSuccess={() => {
              setOpenAuthModal(false);
              navigate("/dashboard");
            }}
          />
        ) : (
          <SignUp
            onSwitch={() => setCurrentPage("login")}
            onSuccess={() => {
              setOpenAuthModal(false);
              navigate("/dashboard");
            }}
          />
        )}
      </Modal>
    </div>
  );
};

export default LandingPage;
