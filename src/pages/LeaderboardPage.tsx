import SiteLayout from "../components/SiteLayout";
import { Card, Badge, StatCard } from "../components/ui";

interface LeaderboardEntry {
  rank: number;
  name: string;
  track: string;
  points: number;
  level: string;
  streak: number;
}

const leaders: LeaderboardEntry[] = [
  {
    rank: 1,
    name: "Kagabo Eric",
    track: "Software Dev",
    points: 2850,
    level: "Advanced",
    streak: 45,
  },
  {
    rank: 2,
    name: "Ineza Grace Marie",
    track: "Multimedia",
    points: 2720,
    level: "Advanced",
    streak: 38,
  },
  {
    rank: 3,
    name: "Nzeyimana Patrick",
    track: "Networking",
    points: 2650,
    level: "Advanced",
    streak: 42,
  },
  {
    rank: 4,
    name: "Amahoro Jean",
    track: "Software Dev",
    points: 2540,
    level: "Intermediate",
    streak: 28,
  },
  {
    rank: 5,
    name: "Munyakazi Lisa",
    track: "Software Dev",
    points: 2420,
    level: "Intermediate",
    streak: 35,
  },
];

export default function LeaderboardPage() {
  return (
    <SiteLayout>
      <div
        style={{
          background: "#071C12",
          borderBottom: "1px solid rgba(53,196,122,0.1)",
        }}
      >
        <div className="max-w-7xl mx-auto px-8 py-12">
          <Link
            to="/student"
            className="inline-block mb-4 text-sm transition-colors"
            style={{ color: "#35C47A" }}
          >
            ← Back to Dashboard
          </Link>
          <h1
            className="text-4xl font-bold mb-3 tracking-tight"
            style={{ color: "#FFFFFF" }}
          >
            Leaderboard
          </h1>
          <p style={{ color: "#606C66" }}>
            Top performers in the TVET Digital Academy community
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          <StatCard label="Total Active Users" value="2,847" />
          <StatCard label="This Month's Leader" value="2,850 pts" />
          <StatCard label="Avg Learning Streak" value="18 days" />
          <StatCard label="Certificates Awarded" value="1,247" />
        </div>

        <Card variant="terminal" title="Top Performers" padding="none">
          <div className="divide-y" style={{ borderColor: "#E2E8E4" }}>
            {leaders.map((entry) => (
              <div
                key={entry.rank}
                className="px-6 py-4 flex items-center justify-between hover:bg-surface transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center font-bold"
                    style={{
                      background:
                        entry.rank === 1
                          ? "#FFD700"
                          : entry.rank === 2
                            ? "#C0C0C0"
                            : entry.rank === 3
                              ? "#CD7F32"
                              : "#F5F7F5",
                      color:
                        entry.rank > 3 ? "#606C66" : "#071C12",
                    }}
                  >
                    {entry.rank}
                  </div>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: "#102019" }}>
                      {entry.name}
                    </p>
                    <p className="text-xs" style={{ color: "#606C66" }}>
                      {entry.track}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <Badge tone="brand" mono>
                    {entry.level}
                  </Badge>
                  <div className="text-right">
                    <p className="font-mono font-bold text-sm" style={{ color: "#1F7A4B" }}>
                      {entry.points}
                    </p>
                    <p className="text-xs" style={{ color: "#606C66" }}>
                      {entry.streak} day streak
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <Card variant="terminal" title="Track Rankings">
            {[
              { track: "Software Dev", users: 856 },
              { track: "Networking", users: 634 },
              { track: "Multimedia", users: 512 },
            ].map((item) => (
              <div
                key={item.track}
                className="flex items-center justify-between py-3 border-b border-border last:border-0"
              >
                <p className="text-sm" style={{ color: "#102019" }}>
                  {item.track}
                </p>
                <p className="font-mono font-bold" style={{ color: "#1F7A4B" }}>
                  {item.users}
                </p>
              </div>
            ))}
          </Card>

          <Card variant="terminal" title="Achievement Tiers">
            {[
              { tier: "🥇 Gold", count: 147, description: "2000+ points" },
              { tier: "🥈 Silver", count: 342, description: "1000-2000 points" },
              { tier: "🥉 Bronze", count: 891, description: "500-1000 points" },
            ].map((item) => (
              <div
                key={item.tier}
                className="py-3 border-b border-border last:border-0"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold" style={{ color: "#102019" }}>
                    {item.tier}
                  </p>
                  <p className="font-mono font-bold" style={{ color: "#1F7A4B" }}>
                    {item.count}
                  </p>
                </div>
                <p className="text-xs" style={{ color: "#606C66" }}>
                  {item.description}
                </p>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </SiteLayout>
  );
}
