import { Factory, Plus, ClipboardList, Cog } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const orders = [
  { id: "MO-001", product: "Widget-A Assembly", qty: 200, start: "2025-02-10", deadline: "2025-02-28", status: "in-progress", progress: 65 },
  { id: "MO-002", product: "Motor 5HP", qty: 50, start: "2025-02-15", deadline: "2025-03-10", status: "planned", progress: 0 },
  { id: "MO-003", product: "Circuit Board v3", qty: 500, start: "2025-02-01", deadline: "2025-02-20", status: "completed", progress: 100 },
  { id: "MO-004", product: "Widget-B Deluxe", qty: 150, start: "2025-02-18", deadline: "2025-03-05", status: "in-progress", progress: 30 },
];

const Manufacturing = () => (
  <div className="space-y-4 animate-fade-in">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="module-header">Manufacturing</h1>
        <p className="text-sm text-muted-foreground mt-1">Production planning, work orders & BOM management</p>
      </div>
      <Button size="sm" className="gap-1.5"><Plus className="w-4 h-4" /> New Work Order</Button>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
      <div className="kpi-card"><p className="stat-label">Active Orders</p><p className="stat-value mt-1">4</p></div>
      <div className="kpi-card"><p className="stat-label">In Production</p><p className="stat-value mt-1 text-primary">2</p></div>
      <div className="kpi-card"><p className="stat-label">Completed MTD</p><p className="stat-value mt-1 text-success">8</p></div>
      <div className="kpi-card"><p className="stat-label">Yield Rate</p><p className="stat-value mt-1 text-info">94.2%</p></div>
    </div>

    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <table className="w-full text-sm">
        <thead><tr className="border-b border-border bg-muted/50">
          <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Order #</th>
          <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Product</th>
          <th className="text-right px-4 py-2.5 font-medium text-muted-foreground">Qty</th>
          <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Deadline</th>
          <th className="text-center px-4 py-2.5 font-medium text-muted-foreground">Status</th>
          <th className="text-center px-4 py-2.5 font-medium text-muted-foreground">Progress</th>
        </tr></thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id} className="border-b border-border last:border-0 hover:bg-muted/30">
              <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{o.id}</td>
              <td className="px-4 py-3 font-medium text-foreground">{o.product}</td>
              <td className="px-4 py-3 text-right text-foreground">{o.qty}</td>
              <td className="px-4 py-3 text-muted-foreground">{o.deadline}</td>
              <td className="px-4 py-3 text-center">
                <Badge variant="secondary" className={
                  o.status === "completed" ? "bg-success/10 text-success border-success/20" :
                  o.status === "in-progress" ? "bg-primary/10 text-primary border-primary/20" :
                  "bg-muted text-muted-foreground"
                }>
                  {o.status === "in-progress" ? "In Progress" : o.status === "completed" ? "Completed" : "Planned"}
                </Badge>
              </td>
              <td className="px-4 py-3">
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${o.progress}%` }} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default Manufacturing;
