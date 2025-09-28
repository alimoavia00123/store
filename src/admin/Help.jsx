import React, { useState } from "react";

const Help = () => {
  const [activeSection, setActiveSection] = useState("faq");
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    alert("Thank you! Your message has been sent. We'll get back to you within 24 hours.");
    setContactForm({ name: "", email: "", subject: "", message: "" });
  };

  // FAQ Data
  const faqCategories = {
    general: [
      {
        question: "How do I reset my password?",
        answer: "Go to Settings > Security > Change Password. You'll receive a reset link on your email."
      },
      {
        question: "How to add a new product?",
        answer: "Navigate to 'Add Product' from the sidebar. Fill in the required details and click 'Add Product'."
      },
      {
        question: "How to view sales analytics?",
        answer: "Click on 'Sales' in the sidebar to see detailed sales reports and graphs."
      }
    ],
    account: [
      {
        question: "How to update my profile information?",
        answer: "Go to Settings > Profile. Update your details and click 'Save Changes'."
      },
      {
        question: "Can I have multiple admin accounts?",
        answer: "Yes, you can create multiple admin accounts from the Users management section."
      },
      {
        question: "How to change my email notifications?",
        answer: "Navigate to Settings > Notifications to manage your notification preferences."
      }
    ],
    technical: [
      {
        question: "The dashboard is loading slowly. What should I do?",
        answer: "Clear your browser cache or try refreshing the page. If issue persists, contact support."
      },
      {
        question: "Charts are not displaying properly.",
        answer: "Ensure you have a stable internet connection and try using a different browser."
      },
      {
        question: "How to export data reports?",
        answer: "Currently, export feature is available in Analytics and Sales sections. Look for the export button."
      }
    ]
  };

  // Quick Links
  const quickLinks = [
    {
      title: "📊 Dashboard Guide",
      description: "Learn how to navigate the admin dashboard",
      link: "/dashboard"
    },
    {
      title: "📈 Analytics Tutorial",
      description: "Understanding your data analytics",
      link: "/analytics"
    },
    {
      title: "🛍️ Product Management",
      description: "How to manage products effectively",
      link: "/products"
    },
    {
      title: "👥 User Management",
      description: "Managing users and permissions",
      link: "/accounts"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">❓ Help & Support</h1>
          <p className="text-gray-600">Get help, browse FAQs, or contact our support team</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-4 sticky top-6">
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveSection("faq")}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center space-x-3 ${
                    activeSection === "faq"
                      ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <span className="text-lg">❓</span>
                  <span className="font-medium">FAQs</span>
                </button>
                <button
                  onClick={() => setActiveSection("contact")}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center space-x-3 ${
                    activeSection === "contact"
                      ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <span className="text-lg">📞</span>
                  <span className="font-medium">Contact Support</span>
                </button>
                <button
                  onClick={() => setActiveSection("resources")}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center space-x-3 ${
                    activeSection === "resources"
                      ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <span className="text-lg">📚</span>
                  <span className="font-medium">Resources</span>
                </button>
                <button
                  onClick={() => setActiveSection("video")}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center space-x-3 ${
                    activeSection === "video"
                      ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <span className="text-lg">🎥</span>
                  <span className="font-medium">Video Guides</span>
                </button>
              </nav>

              {/* Support Info */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">🚀 Quick Support</h3>
                <div className="space-y-2 text-sm">
                  <p className="text-blue-700">📧 support@yourapp.com</p>
                  <p className="text-blue-700">📞 +92 300 123 4567</p>
                  <p className="text-blue-700">🕒 24/7 Available</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* FAQs Section */}
            {activeSection === "faq" && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold mb-6">❓ Frequently Asked Questions</h2>
                
                {Object.entries(faqCategories).map(([category, faqs]) => (
                  <div key={category} className="mb-8">
                    <h3 className="text-lg font-semibold mb-4 capitalize border-b pb-2">
                      {category} Questions
                    </h3>
                    <div className="space-y-4">
                      {faqs.map((faq, index) => (
                        <div key={index} className="border rounded-lg">
                          <button className="w-full text-left p-4 font-medium hover:bg-gray-50">
                            {faq.question}
                          </button>
                          <div className="p-4 bg-gray-50 border-t">
                            <p className="text-gray-700">{faq.answer}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Contact Support Section */}
            {activeSection === "contact" && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold mb-6">📞 Contact Support Team</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                      <input
                        type="text"
                        name="name"
                        value={contactForm.name}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={contactForm.email}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={contactForm.subject}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <textarea
                      name="message"
                      value={contactForm.message}
                      onChange={handleInputChange}
                      rows="5"
                      className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Describe your issue in detail..."
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                  >
                    Send Message
                  </button>
                </form>

                {/* Support Channels */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl mb-2">📧</div>
                    <h3 className="font-semibold">Email Support</h3>
                    <p className="text-sm text-gray-600">support@yourapp.com</p>
                    <p className="text-xs text-gray-500">Response time: 2-4 hours</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl mb-2">💬</div>
                    <h3 className="font-semibold">Live Chat</h3>
                    <p className="text-sm text-gray-600">Available 24/7</p>
                    <p className="text-xs text-gray-500">Instant response</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl mb-2">📞</div>
                    <h3 className="font-semibold">Phone Support</h3>
                    <p className="text-sm text-gray-600">+92 300 123 4567</p>
                    <p className="text-xs text-gray-500">Mon-Fri, 9AM-6PM</p>
                  </div>
                </div>
              </div>
            )}

            {/* Resources Section */}
            {activeSection === "resources" && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold mb-6">📚 Helpful Resources</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {quickLinks.map((link, index) => (
                    <div key={index} className="border rounded-lg p-4 hover:shadow-md transition duration-200">
                      <h3 className="font-semibold mb-2">{link.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">{link.description}</p>
                      <button className="text-blue-600 text-sm hover:text-blue-800">
                        Learn more →
                      </button>
                    </div>
                  ))}
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-semibold mb-4">📖 Documentation</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center space-x-2">
                      <span>📄</span>
                      <span>User Manual PDF</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span>🔧</span>
                      <span>API Documentation</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span>🛠️</span>
                      <span>Developer Guide</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span>📋</span>
                      <span>Troubleshooting Guide</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* Video Guides Section */}
            {activeSection === "video" && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold mb-6">🎥 Video Tutorials</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Video Placeholders */}
                  {[
                    { title: "Dashboard Overview", duration: "5:30" },
                    { title: "Adding Products", duration: "3:15" },
                    { title: "Analytics Guide", duration: "7:45" },
                    { title: "User Management", duration: "4:20" }
                  ].map((video, index) => (
                    <div key={index} className="border rounded-lg overflow-hidden">
                      <div className="bg-gray-200 h-40 flex items-center justify-center">
                        <span className="text-4xl">🎬</span>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold mb-2">{video.title}</h3>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">{video.duration}</span>
                          <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                            Watch Now
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 text-center">
                  <p className="text-gray-600">More videos available on our YouTube channel</p>
                  <button className="text-blue-600 hover:text-blue-800 mt-2">
                    Visit YouTube Channel →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow-md p-6 text-center">
          <h3 className="text-xl font-semibold mb-2">Still need help?</h3>
          <p className="mb-4">Our support team is here to assist you 24/7</p>
          <button 
            onClick={() => setActiveSection("contact")}
            className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition duration-200"
          >
            Contact Support Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Help;