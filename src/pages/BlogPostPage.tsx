import { Link } from "react-router-dom";
import SiteLayout from "../components/SiteLayout";
import { Card, Badge } from "../components/ui";

export default function BlogPostPage() {
  return (
    <SiteLayout>
      <div className="max-w-3xl mx-auto px-8 py-12">
        <Link
          to="/blog"
          className="text-sm mb-8 inline-block transition-colors"
          style={{ color: "#35C47A" }}
        >
          ← Back to Blog
        </Link>

        <article>
          <div className="mb-8">
            <Badge tone="info" mono className="mb-3">
              Web Development
            </Badge>
            <h1
              className="text-4xl font-bold mb-4"
              style={{ color: "#102019", letterSpacing: "-0.02em" }}
            >
              The Future of Web Development in 2026
            </h1>
            <div className="flex items-center justify-between text-sm" style={{ color: "#718078" }}>
              <span>By Emmanuel Nkurunziza</span>
              <span>Sep 15, 2026 • 5 min read</span>
            </div>
          </div>

          <div className="prose prose-sm max-w-none" style={{ color: "#718078" }}>
            <p className="text-base mb-6 leading-relaxed">
              The web development landscape continues to evolve at a rapid pace. As we progress through 2026, several key technologies and practices are shaping how we build for the web. From AI-powered development tools to improved performance standards, developers have more powerful tools at their disposal than ever before.
            </p>

            <h2
              className="text-2xl font-bold mt-8 mb-4"
              style={{ color: "#102019" }}
            >
              Key Trends in Web Development
            </h2>

            <p className="mb-4 leading-relaxed">
              1. <strong style={{ color: "#102019" }}>AI-Assisted Development</strong><br />
              AI tools are transforming how developers write code. From intelligent code completion to automated testing, these tools are increasing productivity while maintaining quality.
            </p>

            <p className="mb-4 leading-relaxed">
              2. <strong style={{ color: "#102019" }}>Performance as Priority</strong><br />
              Users expect fast-loading, responsive websites. New Core Web Vitals and performance metrics are pushing developers to optimize every millisecond.
            </p>

            <p className="mb-4 leading-relaxed">
              3. <strong style={{ color: "#102019" }}>TypeScript Adoption</strong><br />
              Type safety is becoming the standard. More projects are adopting TypeScript to catch errors early and improve code maintainability.
            </p>

            <p className="mb-6 leading-relaxed">
              4. <strong style={{ color: "#102019" }}>Component-Driven Development</strong><br />
              Modern web development favors component-based architectures. Tools like React, Vue, and Svelte continue to dominate.
            </p>

            <h2
              className="text-2xl font-bold mt-8 mb-4"
              style={{ color: "#102019" }}
            >
              What This Means for You
            </h2>

            <p className="leading-relaxed">
              As a developer in 2026, staying current with these trends is essential. Invest in learning new technologies, embrace AI tools for productivity, and never stop optimizing performance. The future of web development is bright, and the opportunities are endless.
            </p>
          </div>

          <Card title="Related Articles" className="mt-12">
            <div className="space-y-3">
              {["Building Scalable Web Apps", "React Best Practices", "Performance Optimization Guide"].map(
                (article) => (
                  <a
                    key={article}
                    href="#"
                    className="block text-sm transition-colors hover:text-pg"
                    style={{ color: "#35C47A" }}
                  >
                    → {article}
                  </a>
                )
              )}
            </div>
          </Card>
        </article>
      </div>
    </SiteLayout>
  );
}
