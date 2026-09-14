import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import { Card, Badge, StatCard, Input, EmptyState } from "../components/ui";
import { navItems } from "./PlatformAdminDashboard";
import { growthData } from "./PlatformAdminDashboard";

interface Transaction {
  id: string;
  student: string;
  plan: "Professional" | "Career";
  amount: number;
  date: string;
  status: "Paid" | "Failed" | "Refunded";
}

const transactions: Transaction[] = [
  { id: "txn-1", student: "Kagabo Eric", plan: "Career", amount: 25000, date: "2026-09-08", status: "Paid" },
  { id: "txn-2", student: "Ineza Grace Marie", plan: "Professional", amount: 15000, date: "2026-09-06", status: "Paid" },
  { id: "txn-3", student: "Nzeyimana Patrick", plan: "Professional", amount: 15000, date: "2026-09-05", status: "Paid" },
  { id: "txn-4", student: "Amahoro Jean de Dieu", plan: "Professional", amount: 15000, date: "2026-09-03", status: "Failed" },
  { id: "txn-5", student: "Uwimana Diane", plan: "Career", amount: 25000, date: "2026-08-29", status: "Paid" },
  { id: "txn-6", student: "Munyakazi Lisa", plan: "Professional", amount: 15000, date: "2026-08-27", status: "Failed" },
  { id: "txn-7", student: "Kagabo Eric", plan: "Career", amount: 25000, date: "2026-08-08", status: "Paid" },
  { id: "txn-8", student: "Ineza Grace Marie", plan: "Professional", amount: 15000, date: "2026-08-06", status: "Paid" },
  { id: "txn-9", student: "Nzeyimana Patrick", plan: "Professional", amount: 15000, date: "2026-07-05", status: "Failed" },
  { id: "txn-10", student: "Uwimana Diane", plan: "Career", amount: 25000, date: "2026-07-29", status: "Paid" },
];

const statusTone: Record<Transaction["status"], "success" | "danger" | "warning"> = {
  Paid: "success",
  Failed: "danger",
  Refunded: "warning",
};

export default function PaymentsPage() {
  const [params] = useSearchParams();
  const userName = params.get("userName") ?? "Platform Admin";
  const userInitials = params.get("userInitials") ?? "PA";

  const [activeKey, setActiveKey] = useState("payments");
  const [search, setSearch] = useState("");

  const [transactionsList, setTransactionsList] = useState<Transaction[]>(transactions);
  const [refundId, setRefundId] = useState<string | null>(null);

  const handleNav = (key: string) => {
    setActiveKey(key);
    if (key === "dashboard") window.location.href = "/admin";
  };

  const handleRetry = (id: string) => {
    setTransactionsList((prev) => prev.map((t) => (t.id === id ? { ...t, status: "Paid" } : t)));
  };

  const handleRefund = (id: string) => {
    setTransactionsList((prev) => prev.map((t) => (t.id === id ? { ...t, status: "Refunded" } : t)));
    setRefundId(null);
  };

  const filtered = transactionsList.filter(
    (t) => t.student.toLowerCase().includes(search.toLowerCase()) || t.plan.toLowerCase().includes(search.toLowerCase())
  );

  const monthlyRevenue = growthData[growthData.length - 1].revenue;
  const failedCount = transactionsList.filter((t) => t.status === "Failed").length;
  const paidCount = transactionsList.filter((t) => t.status === "Paid").length;
  const successRate = Math.round((paidCount / transactionsList.length) * 100);

  return (
    <DashboardLayout
      role="admin"
      roleLabel="Platform Admin"
      navItems={navItems}
      activeKey={activeKey}
      onNav={handleNav}
      userName={userName}
      userInitials={userInitials}
    >
      <div className="p-8">
        <div className="mb-8">
          <p className="font-mono text-xs mb-2" style={{ color: "#1F7A4B" }}>$ ls ./payments --recent</p>
          <h1 className="text-page-title mb-1" style={{ color: "#102019" }}>Payments</h1>
          <p style={{ color: "#606C66" }}>Subscription transactions across the platform</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard label="Monthly Revenue" value={`RWF ${(monthlyRevenue / 1000000).toFixed(1)}M`} />
          <StatCard label="Transactions" value={transactionsList.length} />
          <StatCard label="Failed Payments" value={failedCount} trend={failedCount > 0 ? `${failedCount} need review` : undefined} trendTone={failedCount > 0 ? "down" : "neutral"} />
          <StatCard label="Success Rate" value={`${successRate}%`} />
        </div>

        <div className="mb-6 max-w-sm">
          <Input placeholder="Search by student or plan..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        {filtered.length === 0 ? (
          <EmptyState title="No transactions found" description="Try a different student name or plan." />
        ) : (
          <Card variant="terminal" padding="none" title="Recent Transactions">
            <table className="w-full">
              <thead>
                <tr style={{ background: "#F5F7F5", borderBottom: "1px solid #E2E8E4" }}>
                  {["Student", "Plan", "Amount", "Date", "Status", "Actions"].map((h) => (
                    <th key={h} className="px-6 py-3 text-left font-mono text-xs" style={{ color: "#606C66" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((t, i) => (
                  <tr key={t.id} style={{ borderBottom: i < filtered.length - 1 ? "1px solid #F5F7F5" : "none" }}>
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                          style={{ background: "rgba(53,196,122,0.1)", color: "#1F7A4B" }}
                        >
                          {t.student[0]}
                        </div>
                        <p className="text-sm font-medium" style={{ color: "#102019" }}>{t.student}</p>
                      </div>
                    </td>
                    <td className="px-6 py-3.5 font-mono text-xs" style={{ color: "#606C66" }}>{t.plan}</td>
                    <td className="px-6 py-3.5 font-mono text-xs" style={{ color: "#102019" }}>RWF {t.amount.toLocaleString()}</td>
                    <td className="px-6 py-3.5 font-mono text-xs" style={{ color: "#606C66" }}>{t.date}</td>
                    <td className="px-6 py-3.5">
                      <Badge tone={statusTone[t.status]} mono>
                        {t.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-3.5">
                      {t.status === "Failed" && (
                        <button onClick={() => handleRetry(t.id)} className="font-mono text-xs font-semibold" style={{ color: "#1F7A4B" }}>Retry</button>
                      )}
                      {t.status === "Paid" && (
                        refundId === t.id ? (
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-xs" style={{ color: "#C92C2C" }}>Refund?</span>
                            <button onClick={() => handleRefund(t.id)} className="font-mono text-xs font-semibold" style={{ color: "#C92C2C" }}>Yes</button>
                            <button onClick={() => setRefundId(null)} className="font-mono text-xs" style={{ color: "#606C66" }}>No</button>
                          </div>
                        ) : (
                          <button onClick={() => setRefundId(t.id)} className="font-mono text-xs" style={{ color: "#C92C2C" }}>Refund</button>
                        )
                      )}
                      {t.status === "Refunded" && (
                        <span className="font-mono text-xs" style={{ color: "#606C66" }}>—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
