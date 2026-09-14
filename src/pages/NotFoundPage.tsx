import SiteLayout from "../components/SiteLayout";
import { Button, EmptyState } from "../components/ui";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <SiteLayout>
      <div className="flex-1 flex items-center justify-center px-8 py-20">
        <EmptyState
          icon={
            <svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#C17F33"
              strokeWidth="1.5"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          }
          title="Page Not Found"
          description="The page you're looking for doesn't exist or has been moved. Head back to the home page to continue exploring."
          action={
            <Link to="/">
              <Button variant="primary">Go Home</Button>
            </Link>
          }
        />
      </div>
    </SiteLayout>
  );
}
