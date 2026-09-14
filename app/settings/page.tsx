"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuth } from "@/lib/auth/useAuth";
import { useTheme } from "@/lib/theme/ThemeProvider";
import Link from "next/link";
import { ArrowLeft, Bell, Lock, Palette, LogOut, User, Mail, Phone, MapPin, Save, ShieldCheck, AlertTriangle } from "lucide-react";
import { useState, useEffect } from "react";

interface Preferences {
  emailNotifications: boolean;
  smsNotifications: boolean;
  courseUpdates: boolean;
  weeklyDigest: boolean;
}

function settingsStorageKey(userId: string) {
  return `forge_settings_${userId}`;
}

function SettingsContent() {
  const router = useRouter();
  const { user, logout, changePassword, deleteAccount, updateProfile } = useAuth();
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("profile");

  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordFields, setPasswordFields] = useState({ current: "", next: "", confirm: "" });
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordSaving, setPasswordSaving] = useState(false);

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "+1 (555) 000-0000",
    location: user?.location || "San Francisco, CA",
    bio: user?.bio || "Passionate learner and tech enthusiast",
  });
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileError, setProfileError] = useState("");
  const [profileSuccess, setProfileSuccess] = useState(false);

  const [preferences, setPreferences] = useState<Preferences>({
    emailNotifications: true,
    smsNotifications: false,
    courseUpdates: true,
    weeklyDigest: true,
  });
  const [preferencesSuccess, setPreferencesSuccess] = useState(false);

  // Load any previously saved notification preferences for this user
  // (theme is handled separately by ThemeProvider, which has its own storage)
  useEffect(() => {
    if (!user?.id) return;
    const stored = localStorage.getItem(settingsStorageKey(user.id));
    if (!stored) return;
    try {
      const saved = JSON.parse(stored);
      if (saved.preferences) setPreferences((prev) => ({ ...prev, ...saved.preferences }));
    } catch {
      // ignore malformed local storage data
    }
  }, [user?.id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePreferenceChange = (key: keyof Preferences) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSaveProfile = async () => {
    setProfileError("");
    setProfileSaving(true);
    try {
      await updateProfile(formData);
      setProfileSuccess(true);
      setTimeout(() => setProfileSuccess(false), 2000);
    } catch (err) {
      setProfileError(err instanceof Error ? err.message : "Failed to save profile");
    } finally {
      setProfileSaving(false);
    }
  };

  const handleCancelProfile = () => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "+1 (555) 000-0000",
      location: user?.location || "San Francisco, CA",
      bio: user?.bio || "Passionate learner and tech enthusiast",
    });
    setProfileError("");
  };

  const handleSavePreferences = () => {
    if (user?.id) {
      localStorage.setItem(settingsStorageKey(user.id), JSON.stringify({ preferences }));
    }
    setPreferencesSuccess(true);
    setTimeout(() => setPreferencesSuccess(false), 2000);
  };

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const handleChangePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");

    if (passwordFields.next.length < 6) {
      setPasswordError("New password must be at least 6 characters");
      return;
    }
    if (passwordFields.next !== passwordFields.confirm) {
      setPasswordError("New passwords do not match");
      return;
    }

    setPasswordSaving(true);
    try {
      await changePassword(passwordFields.current, passwordFields.next);
      setPasswordSuccess(true);
      setPasswordFields({ current: "", next: "", confirm: "" });
      setTimeout(() => {
        setShowPasswordForm(false);
        setPasswordSuccess(false);
      }, 1500);
    } catch (err) {
      setPasswordError(err instanceof Error ? err.message : "Failed to change password");
    } finally {
      setPasswordSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    setDeleteError("");
    setDeleting(true);
    try {
      await deleteAccount();
      router.push("/");
    } catch (err) {
      setDeleteError(err instanceof Error ? err.message : "Failed to delete account");
      setDeleting(false);
    }
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Lock },
    { id: "appearance", label: "Appearance", icon: Palette },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center gap-4">
          <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600">Manage your account and preferences</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Tabs */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden sticky top-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium border-b border-gray-200 last:border-0 transition-colors ${
                      activeTab === tab.id
                        ? "bg-forge-soft text-ember-strong"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <Icon size={18} />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Profile Tab */}
              {activeTab === "profile" && (
                <div className="bg-white rounded-lg border border-gray-200 p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Information</h2>

                  <div className="mb-8 flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-ember-strong to-ember flex items-center justify-center text-white text-xl font-bold">
                      {user?.avatar}
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Profile Picture</p>
                      <button className="text-ember-strong hover:text-ember font-medium text-sm mt-1">Change Avatar</button>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ember-strong"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ember-strong"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                          <Phone size={16} /> Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ember-strong"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                          <MapPin size={16} /> Location
                        </label>
                        <input
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ember-strong"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                      <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ember-strong"
                      />
                    </div>

                    {profileError && <p className="text-sm text-red-600">{profileError}</p>}
                    {profileSuccess && <p className="text-sm text-ember-strong">Profile saved.</p>}

                    <div className="flex gap-3 pt-4">
                      <button
                        onClick={handleSaveProfile}
                        disabled={profileSaving}
                        className="px-6 py-2 bg-ember-strong text-white rounded-lg font-medium hover:bg-ember transition-colors disabled:opacity-50 flex items-center gap-2"
                      >
                        <Save size={16} /> {profileSaving ? "Saving..." : "Save Changes"}
                      </button>
                      <button
                        onClick={handleCancelProfile}
                        disabled={profileSaving}
                        className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === "notifications" && (
                <div className="bg-white rounded-lg border border-gray-200 p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Notification Preferences</h2>

                  <div className="space-y-4">
                    {[
                      { key: "emailNotifications" as keyof Preferences, label: "Email Notifications", desc: "Receive updates via email" },
                      { key: "smsNotifications" as keyof Preferences, label: "SMS Notifications", desc: "Receive updates via SMS" },
                      { key: "courseUpdates" as keyof Preferences, label: "Course Updates", desc: "Get notified about course progress" },
                      { key: "weeklyDigest" as keyof Preferences, label: "Weekly Digest", desc: "Receive a weekly summary of your activity" },
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div>
                          <p className="font-medium text-gray-900">{item.label}</p>
                          <p className="text-sm text-gray-600">{item.desc}</p>
                        </div>
                        <button
                          onClick={() => handlePreferenceChange(item.key)}
                          className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors ${
                            preferences[item.key as keyof typeof preferences] ? "bg-ember-strong" : "bg-gray-300"
                          }`}
                        >
                          <span
                            className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                              preferences[item.key as keyof typeof preferences] ? "translate-x-5" : "translate-x-0"
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center gap-3">
                    <button
                      onClick={handleSavePreferences}
                      className="px-6 py-2 bg-ember-strong text-white rounded-lg font-medium hover:bg-ember transition-colors flex items-center gap-2"
                    >
                      <Save size={16} /> Save Preferences
                    </button>
                    {preferencesSuccess && <p className="text-sm text-ember-strong">Preferences saved.</p>}
                  </div>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === "security" && (
                <div className="bg-white rounded-lg border border-gray-200 p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Security Settings</h2>

                  <div className="space-y-6">
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <h3 className="font-semibold text-gray-900 mb-2">Password</h3>
                      <p className="text-sm text-gray-600 mb-4">Change the password used to log in</p>

                      {!showPasswordForm ? (
                        <button
                          onClick={() => setShowPasswordForm(true)}
                          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                        >
                          Change Password
                        </button>
                      ) : (
                        <form onSubmit={handleChangePasswordSubmit} className="space-y-3 max-w-sm">
                          <input
                            type="password"
                            placeholder="Current password"
                            value={passwordFields.current}
                            onChange={(e) => setPasswordFields((p) => ({ ...p, current: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ember-strong"
                            required
                          />
                          <input
                            type="password"
                            placeholder="New password"
                            value={passwordFields.next}
                            onChange={(e) => setPasswordFields((p) => ({ ...p, next: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ember-strong"
                            required
                          />
                          <input
                            type="password"
                            placeholder="Confirm new password"
                            value={passwordFields.confirm}
                            onChange={(e) => setPasswordFields((p) => ({ ...p, confirm: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ember-strong"
                            required
                          />

                          {passwordError && <p className="text-sm text-red-600">{passwordError}</p>}
                          {passwordSuccess && <p className="text-sm text-ember-strong">Password updated.</p>}

                          <div className="flex gap-2">
                            <button
                              type="submit"
                              disabled={passwordSaving}
                              className="px-4 py-2 bg-ember-strong text-white rounded-lg font-medium hover:bg-ember transition-colors disabled:opacity-50 text-sm"
                            >
                              {passwordSaving ? "Saving..." : "Save Password"}
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setShowPasswordForm(false);
                                setPasswordError("");
                                setPasswordFields({ current: "", next: "", confirm: "" });
                              }}
                              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm"
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      )}
                    </div>

                    <div className="p-4 border border-gray-200 rounded-lg">
                      <h3 className="font-semibold text-gray-900 mb-2">Two-Factor Authentication</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        {twoFactorEnabled
                          ? "Two-factor authentication is enabled for your account."
                          : "Enhance your account security with 2FA"}
                      </p>
                      <button
                        onClick={() => setTwoFactorEnabled((v) => !v)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                          twoFactorEnabled
                            ? "bg-forge-soft text-ember-strong hover:bg-brass-soft"
                            : "bg-blue-50 text-blue-600 hover:bg-blue-100"
                        }`}
                      >
                        {twoFactorEnabled && <ShieldCheck size={16} />}
                        {twoFactorEnabled ? "Disable 2FA" : "Enable 2FA"}
                      </button>
                    </div>

                    <div className="p-4 border border-gray-200 rounded-lg">
                      <h3 className="font-semibold text-gray-900 mb-2">Active Sessions</h3>
                      <p className="text-sm text-gray-600 mb-4">Sign out everywhere you're currently logged in</p>
                      <button
                        onClick={handleLogout}
                        className="px-4 py-2 border border-red-300 text-red-600 rounded-lg font-medium hover:bg-red-50 transition-colors"
                      >
                        Sign Out All Sessions
                      </button>
                    </div>

                    <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
                      <h3 className="font-semibold text-red-900 mb-2">Delete Account</h3>
                      <p className="text-sm text-red-700 mb-4">Permanently delete your account and all associated data</p>

                      {!showDeleteConfirm ? (
                        <button
                          onClick={() => setShowDeleteConfirm(true)}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                        >
                          Delete Account
                        </button>
                      ) : (
                        <div className="space-y-3">
                          <p className="text-sm font-medium text-red-900 flex items-center gap-2">
                            <AlertTriangle size={16} /> This cannot be undone. Are you sure?
                          </p>
                          {deleteError && <p className="text-sm text-red-700">{deleteError}</p>}
                          <div className="flex gap-2">
                            <button
                              onClick={handleDeleteAccount}
                              disabled={deleting}
                              className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-50"
                            >
                              {deleting ? "Deleting..." : "Yes, delete my account"}
                            </button>
                            <button
                              onClick={() => setShowDeleteConfirm(false)}
                              disabled={deleting}
                              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Appearance Tab */}
              {activeTab === "appearance" && (
                <div className="bg-white rounded-lg border border-gray-200 p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Appearance</h2>

                  <div className="space-y-6">
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-4">Theme</p>
                      <div className="grid grid-cols-3 gap-4">
                        {[
                          { id: "light" as const, label: "Light", color: "bg-white" },
                          { id: "dark" as const, label: "Dark", color: "bg-gray-900" },
                          { id: "system" as const, label: "System", color: "bg-gradient-to-r from-white to-gray-900" },
                        ].map((option) => (
                          <button
                            key={option.id}
                            onClick={() => setTheme(option.id)}
                            className={`p-4 rounded-lg border-2 transition-colors ${option.color} ${
                              theme === option.id ? "border-ember-strong" : "border-gray-200"
                            }`}
                          >
                            <p className={`font-medium ${option.id === "light" ? "text-gray-900" : "text-white"}`}>
                              {option.label}
                            </p>
                          </button>
                        ))}
                      </div>
                      <p className="text-xs text-gray-500 mt-3">
                        Applies immediately. Full dark styling currently covers part of the app; more pages are being
                        migrated over.
                      </p>
                    </div>

                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">Dark Mode</p>
                          <p className="text-sm text-gray-600">Quick toggle between light and dark</p>
                        </div>
                        <button
                          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                          className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors ${
                            resolvedTheme === "dark" ? "bg-ember-strong" : "bg-gray-300"
                          }`}
                        >
                          <span
                            className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                              resolvedTheme === "dark" ? "translate-x-5" : "translate-x-0"
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Logout Section */}
        <div className="mt-12">
          <button
            onClick={handleLogout}
            className="w-full px-6 py-3 bg-red-50 border border-red-200 text-red-600 rounded-lg font-medium hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
          >
            <LogOut size={18} /> Logout from all devices
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Settings() {
  return (
    <ProtectedRoute>
      <SettingsContent />
    </ProtectedRoute>
  );
}
