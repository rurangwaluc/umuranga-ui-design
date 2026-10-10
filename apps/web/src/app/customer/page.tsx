import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export default function CustomerDashboardPage() {
  return (
    <DashboardShell
      badge="Customer workspace"
      title="Keep Your Property Search Organized."
      description="Save properties you like, keep track of viewing requests, and stay updated when new listings match what you are looking for."
      cards={[
        {
          title: "Saved Properties",
          text: "Return to homes, apartments, land, and commercial spaces you want to compare or review later.",
        },
        {
          title: "Viewing Requests",
          text: "Keep requested property visits and responses from owners or agents in one clear place.",
        },
        {
          title: "Search Alerts",
          text: "Keep track of the searches you care about and get ready for matching property updates.",
        },
      ]}
    />
  );
}
