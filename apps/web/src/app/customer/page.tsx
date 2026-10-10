import { CustomerDashboardContent } from "@/components/dashboard/customer-dashboard-content";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export default function CustomerDashboardPage() {
  return (
    <DashboardShell
      badge="Customer workspace"
      title="Continue your property search."
      description="Your saved properties, upcoming viewings and searches are here when you need them."
      cards={[
        {
          title: "Saved Properties",
          text: "Return to properties you want to review later.",
          href: "#saved-properties",
        },
        {
          title: "Viewing Requests",
          text: "Keep requested property visits together.",
          href: "#viewing-requests",
        },
        {
          title: "Saved Searches",
          text: "Return to searches UMURANGA is keeping track of.",
          href: "#saved-searches",
        },
      ]}
    >
      <CustomerDashboardContent />
    </DashboardShell>
  );
}
