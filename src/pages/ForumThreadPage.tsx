import { Link } from "react-router-dom";
import SiteLayout from "../components/SiteLayout";
import { Card, Badge, Button, Textarea } from "../components/ui";

interface Reply {
  author: string;
  avatar: string;
  content: string;
  date: string;
  likes: number;
}

const replies: Reply[] = [
  {
    author: "Kagabo Eric",
    avatar: "KE",
    content: "I completely agree with this approach. Following these practices has really improved my project quality.",
    date: "2 hours ago",
    likes: 12,
  },
  {
    author: "Alice Uwimana",
    avatar: "AU",
    content: "Great insights! I would add that code reviews are also critical to maintaining these standards.",
    date: "1 hour ago",
    likes: 8,
  },
];

export default function ForumThreadPage() {
  return (
    <SiteLayout>
      <div className="max-w-3xl mx-auto px-8 py-12">
        <Link
          to="/forum"
          className="text-sm mb-6 inline-block transition-colors"
          style={{ color: "#35C47A" }}
        >
          ← Back to Forum
        </Link>

        <Card
          title="Best practices for web development projects"
          padding="lg"
          className="mb-6"
        >
          <div className="mb-4">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm"
                style={{ background: "#35C47A", color: "#071C12" }}
              >
                KE
              </div>
              <div>
                <p className="font-semibold text-sm" style={{ color: "#102019" }}>
                  Kagabo Eric
                </p>
                <p className="text-xs" style={{ color: "#718078" }}>
                  Posted 5 hours ago
                </p>
              </div>
            </div>
            <p className="text-sm mb-4" style={{ color: "#718078" }}>
              I've been working on several web projects lately and wanted to share some best practices I've discovered:
              <br /><br />
              1. Always start with a clear project structure
              <br />
              2. Document your code as you write it
              <br />
              3. Use version control from day one
              <br />
              4. Test frequently, not just at the end
              <br />
              5. Get code reviews before merging
              <br /><br />
              What practices do you all follow?
            </p>
            <div className="flex gap-2">
              <Badge tone="info" mono>
                Software Development
              </Badge>
            </div>
          </div>
        </Card>

        <h3 className="text-lg font-bold mb-4" style={{ color: "#102019" }}>
          Replies ({replies.length})
        </h3>

        <div className="space-y-4 mb-8">
          {replies.map((reply, idx) => (
            <Card key={idx} padding="md">
              <div className="flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0"
                  style={{ background: "#35C47A", color: "#071C12" }}
                >
                  {reply.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-sm" style={{ color: "#102019" }}>
                      {reply.author}
                    </p>
                    <p className="text-xs" style={{ color: "#718078" }}>
                      {reply.date}
                    </p>
                  </div>
                  <p className="text-sm mb-3" style={{ color: "#718078" }}>
                    {reply.content}
                  </p>
                  <div className="flex items-center gap-4">
                    <button
                      className="text-xs transition-colors"
                      style={{ color: "#718078" }}
                    >
                      👍 {reply.likes} Likes
                    </button>
                    <button
                      className="text-xs transition-colors"
                      style={{ color: "#35C47A" }}
                    >
                      Reply
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card title="Post a Reply" padding="lg">
          <Textarea placeholder="Share your thoughts..." rows={5} className="mb-4" />
          <Button variant="primary">Post Reply</Button>
        </Card>
      </div>
    </SiteLayout>
  );
}
