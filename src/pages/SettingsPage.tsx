import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { Card, Button, Input, Select } from "../components/ui";

export default function SettingsPage() {
  const [activeKey, setActiveKey] = useState("account");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const navItems = [
    { key: "account", label: "Account", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg> },
    { key: "notifications", label: "Notifications", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg> },
    { key: "privacy", label: "Privacy & Security", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg> },
  ];

  return (
    <DashboardLayout
      role="student"
      roleLabel="Student"
      navItems={navItems}
      activeKey={activeKey}
      onNav={setActiveKey}
      userName="Amahoro Jean"
      userInitials="AJ"
    >
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-page-title mb-1" style={{ color: "#102019" }}>Settings</h1>
          <p style={{ color: "#606C66" }}>Manage your account preferences and security settings</p>
        </div>

        {activeKey === "account" && (
          <div className="max-w-2xl">
            <Card title="Personal Information">
              <Input label="Full Name" defaultValue="Amahoro Jean de Dieu" />
              <Input label="Email" type="email" defaultValue="amahoro@example.com" />
              <Input label="Phone" defaultValue="+250 7XX XXX XXX" />
              <Select
                label="Country"
                options={[
                  { value: "rw", label: "Rwanda" },
                  { value: "ug", label: "Uganda" },
                  { value: "ke", label: "Kenya" },
                ]}
              />
              <div className="flex gap-3 mt-6">
                <Button variant="primary" onClick={handleSave}>
                  {saved ? "✓ Saved" : "Save Changes"}
                </Button>
                <Button variant="outline">Cancel</Button>
              </div>
            </Card>

            <Card title="Password" className="mt-6">
              <Input label="Current Password" type="password" />
              <Input label="New Password" type="password" />
              <Input label="Confirm Password" type="password" />
              <div className="flex gap-3 mt-6">
                <Button variant="primary">Update Password</Button>
              </div>
            </Card>
          </div>
        )}

        {activeKey === "notifications" && (
          <div className="max-w-2xl">
            <Card title="Email Notifications">
              <div className="space-y-4">
                {[
                  { label: "Course updates", desc: "Get notified about new lessons and content" },
                  { label: "Assignment feedback", desc: "Receive feedback on submitted work" },
                  { label: "Certificate issuance", desc: "Be notified when you earn a certificate" },
                  { label: "Promotional emails", desc: "Receive special offers and announcements" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-3 border-b border-border">
                    <div>
                      <p className="font-medium text-sm" style={{ color: "#102019" }}>{item.label}</p>
                      <p className="text-xs" style={{ color: "#606C66" }}>{item.desc}</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-5 h-5" style={{ accentColor: "#35C47A" }} />
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {activeKey === "privacy" && (
          <div className="max-w-2xl">
            <Card title="Account Visibility">
              <div className="space-y-4">
                <Select
                  label="Portfolio Visibility"
                  options={[
                    { value: "public", label: "Public - Anyone can view" },
                    { value: "private", label: "Private - Only you can view" },
                    { value: "link", label: "Link-only - Sharable with a link" },
                  ]}
                />
                <p className="text-xs" style={{ color: "#606C66" }}>Your portfolio can be discovered by employers and institutions</p>
              </div>
            </Card>

            <Card title="Delete Account" className="mt-6">
              <p className="text-sm mb-4" style={{ color: "#606C66" }}>
                Once you delete your account, there is no going back. Please be certain.
              </p>
              <Button variant="danger">Delete Account</Button>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
