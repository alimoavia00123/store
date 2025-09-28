import React, { useState, useEffect } from "react";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [user, setUser] = useState(null);
  const [settings, setSettings] = useState({
    // Profile Settings
    profile: {
      name: "",
      email: "",
      phone: "",
      avatar: ""
    },
    // Account Settings
    account: {
      role: "admin",
      language: "english",
      timezone: "UTC+5",
      currency: "PKR"
    },
    // Notification Settings
    notifications: {
      email: true,
      sms: false,
      push: true,
      marketing: false
    },
    // Security Settings
    security: {
      twoFactor: false,
      loginAlerts: true,
      sessionTimeout: 30
    },
    // Appearance Settings
    appearance: {
      theme: "light",
      fontSize: "medium",
      density: "comfortable"
    }
  });

  useEffect(() => {
    // Load user data from localStorage or API
    const userData = JSON.parse(localStorage.getItem("user")) || {
      name: "Ali Moavia",
      email: "ali.moavia@email.com",
      phone: "+92 300 1234567",
      avatar: "",
      role: "admin"
    };
    
    setUser(userData);
    setSettings(prev => ({
      ...prev,
      profile: {
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        avatar: userData.avatar
      },
      account: {
        ...prev.account,
        role: userData.role
      }
    }));
  }, []);

  const handleInputChange = (section, field, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSaveSettings = async (section) => {
    try {
      // Simulate API call
      console.log(`Saving ${section} settings:`, settings[section]);
      
      // Show success message
      alert(`${section.charAt(0).toUpperCase() + section.slice(1)} settings saved successfully!`);
      
      // Update localStorage
      if (section === "profile" && user) {
        const updatedUser = { ...user, ...settings.profile };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
      }
    } catch (error) {
      alert("Error saving settings. Please try again.");
    }
  };

  const tabs = [
    { id: "profile", label: "👤 Profile", icon: "user" },
    { id: "account", label: "⚙️ Account", icon: "settings" },
    { id: "notifications", label: "🔔 Notifications", icon: "bell" },
    { id: "security", label: "🔒 Security", icon: "shield" },
    { id: "appearance", label: "🎨 Appearance", icon: "palette" }
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">⚙️ Settings</h1>
          <p className="text-gray-600">Manage your account settings and preferences</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-4 sticky top-6">
              <nav className="space-y-2">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center space-x-3 ${
                      activeTab === tab.id
                        ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <span className="text-lg">{tab.label.split(' ')[0]}</span>
                    <span className="font-medium">{tab.label.split(' ').slice(1).join(' ')}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Profile Settings */}
            {activeTab === "profile" && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-6">👤 Profile Settings</h2>
                <div className="space-y-6">
                  <div className="flex items-center space-x-6">
                    <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                      {settings.profile.avatar ? (
                        <img src={settings.profile.avatar} alt="Avatar" className="w-20 h-20 rounded-full" />
                      ) : (
                        <span className="text-2xl">👤</span>
                      )}
                    </div>
                    <div>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">
                        Change Avatar
                      </button>
                      <p className="text-gray-500 text-sm mt-1">JPG, PNG max 2MB</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        value={settings.profile.name}
                        onChange={(e) => handleInputChange("profile", "name", e.target.value)}
                        className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      <input
                        type="email"
                        value={settings.profile.email}
                        onChange={(e) => handleInputChange("profile", "email", e.target.value)}
                        className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        value={settings.profile.phone}
                        onChange={(e) => handleInputChange("profile", "phone", e.target.value)}
                        className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => handleSaveSettings("profile")}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                  >
                    Save Profile Changes
                  </button>
                </div>
              </div>
            )}

            {/* Account Settings */}
            {activeTab === "account" && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-6">⚙️ Account Settings</h2>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Account Role</label>
                      <select
                        value={settings.account.role}
                        onChange={(e) => handleInputChange("account", "role", e.target.value)}
                        className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled
                      >
                        <option value="admin">Administrator</option>
                        <option value="user">User</option>
                        <option value="moderator">Moderator</option>
                      </select>
                      <p className="text-gray-500 text-sm mt-1">Role cannot be changed</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                      <select
                        value={settings.account.language}
                        onChange={(e) => handleInputChange("account", "language", e.target.value)}
                        className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="english">English</option>
                        <option value="urdu">Urdu</option>
                        <option value="spanish">Spanish</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                      <select
                        value={settings.account.timezone}
                        onChange={(e) => handleInputChange("account", "timezone", e.target.value)}
                        className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="UTC+5">Pakistan Standard Time (UTC+5)</option>
                        <option value="UTC+0">GMT (UTC+0)</option>
                        <option value="UTC-5">EST (UTC-5)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                      <select
                        value={settings.account.currency}
                        onChange={(e) => handleInputChange("account", "currency", e.target.value)}
                        className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="PKR">Pakistani Rupee (PKR)</option>
                        <option value="USD">US Dollar (USD)</option>
                        <option value="EUR">Euro (EUR)</option>
                      </select>
                    </div>
                  </div>
                  <button
                    onClick={() => handleSaveSettings("account")}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Save Account Settings
                  </button>
                </div>
              </div>
            )}

            {/* Notification Settings */}
            {activeTab === "notifications" && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-6">🔔 Notification Preferences</h2>
                <div className="space-y-4">
                  {Object.entries(settings.notifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</h3>
                        <p className="text-gray-500 text-sm">
                          {key === 'email' && 'Receive email notifications'}
                          {key === 'sms' && 'Receive SMS alerts'}
                          {key === 'push' && 'Browser push notifications'}
                          {key === 'marketing' && 'Marketing and promotional emails'}
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={value}
                          onChange={(e) => handleInputChange("notifications", key, e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  ))}
                  <button
                    onClick={() => handleSaveSettings("notifications")}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Save Notification Settings
                  </button>
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === "security" && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-6">🔒 Security Settings</h2>
                <div className="space-y-6">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="font-medium">Two-Factor Authentication</h3>
                        <p className="text-gray-500 text-sm">Add an extra layer of security to your account</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.security.twoFactor}
                          onChange={(e) => handleInputChange("security", "twoFactor", e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="font-medium">Login Alerts</h3>
                        <p className="text-gray-500 text-sm">Get notified of new logins</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.security.loginAlerts}
                          onChange={(e) => handleInputChange("security", "loginAlerts", e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
                    <input
                      type="number"
                      min="5"
                      max="120"
                      value={settings.security.sessionTimeout}
                      onChange={(e) => handleInputChange("security", "sessionTimeout", parseInt(e.target.value))}
                      className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="space-y-3">
                    <button className="w-full bg-red-50 text-red-600 px-4 py-3 rounded-lg border border-red-200 hover:bg-red-100 text-left">
                      🔐 Change Password
                    </button>
                    <button className="w-full bg-red-50 text-red-600 px-4 py-3 rounded-lg border border-red-200 hover:bg-red-100 text-left">
                      📋 Login Activity
                    </button>
                  </div>

                  <button
                    onClick={() => handleSaveSettings("security")}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Save Security Settings
                  </button>
                </div>
              </div>
            )}

            {/* Appearance Settings */}
            {activeTab === "appearance" && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-6">🎨 Appearance Settings</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Theme</label>
                    <div className="flex space-x-4">
                      {['light', 'dark', 'auto'].map(theme => (
                        <label key={theme} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="radio"
                            name="theme"
                            value={theme}
                            checked={settings.appearance.theme === theme}
                            onChange={(e) => handleInputChange("appearance", "theme", e.target.value)}
                            className="text-blue-600 focus:ring-blue-500"
                          />
                          <span className="capitalize">{theme} mode</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Font Size</label>
                    <div className="flex space-x-4">
                      {['small', 'medium', 'large'].map(size => (
                        <label key={size} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="radio"
                            name="fontSize"
                            value={size}
                            checked={settings.appearance.fontSize === size}
                            onChange={(e) => handleInputChange("appearance", "fontSize", e.target.value)}
                            className="text-blue-600 focus:ring-blue-500"
                          />
                          <span className="capitalize">{size}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => handleSaveSettings("appearance")}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Save Appearance Settings
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
