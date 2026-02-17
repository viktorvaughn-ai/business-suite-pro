import { Wallet, FileText, TrendingUp, TrendingDown, IndianRupee, Plus, Search, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const receivables = [
  { id: "INV-2025-001", customer: "TechCorp India", amount: "₹5,20,000", due: "2025-03-01", status: "overdue" },
  { id: "INV-2025-008", customer: "BuildRight Infra", amount: "₹3,80,000", due: "2025-03-10", status: "pending" },
  { id: "INV-2025-012", customer: "Singh Industries", amount: "₹12,50,000", due: "2025-02-28", status: "paid" },
  { id: "INV-2025-015", customer: "Star Textiles", amount: "₹8,40,000", due: "2025-03-15", status: "pending" },
];

const payables = [
  { id: "PO-2025-003", vendor: "Steel Suppliers Ltd", amount: "₹2,10,000", due: "2025-03-05", status: "pending" },
  { id: "PO-2025-007", vendor: "Copper World", amount: "₹1,44,000", due: "2025-02-25", status: "overdue" },
  { id: "PO-2025-011", vendor: "PackageMart", amount: "₹36,000", due: "2025-03-12", status: "paid" },
];

const statusBadge = (status: string) => {
  if (status === "paid") return <Badge variant="secondary" className="bg-success/10 text-success border-success/20">Paid</Badge>;
  if (status === "overdue") return <Badge variant="destructive" className="text-[10px]">Overdue</Badge>;
  return <Badge variant="secondary" className="text-[10px]">Pending</Badge>;
};

const Accounts = () => (
  <div className="space-y-4 animate-fade-in">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="module-header">Accounts & Finance</h1>
        <p className="text-sm text-muted-foreground mt-1">AR/AP management, invoicing & GST compliance</p>
      </div>
      <Button size="sm" className="gap-1.5"><Plus className="w-4 h-4" /> New Invoice</Button>
    </div>

    {/* Summary */}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="kpi-card">
        <p className="stat-label">Accounts Receivable</p>
        <p className="stat-value mt-1 text-success">₹29.9L</p>
        <p className="text-xs text-muted-foreground mt-1">4 invoices outstanding</p>
      </div>
      <div className="kpi-card">
        <p className="stat-label">Accounts Payable</p>
        <p className="stat-value mt-1 text-destructive">₹3.9L</p>
        <p className="text-xs text-muted-foreground mt-1">3 bills outstanding</p>
      </div>
      <div className="kpi-card">
        <p className="stat-label">Net Position</p>
        <p className="stat-value mt-1 text-primary">₹26.0L</p>
        <p className="text-xs text-muted-foreground mt-1">Net receivable</p>
      </div>
    </div>

    <Tabs defaultValue="ar">
      <TabsList>
        <TabsTrigger value="ar" className="gap-1.5"><TrendingUp className="w-3.5 h-3.5" /> Receivables</TabsTrigger>
        <TabsTrigger value="ap" className="gap-1.5"><TrendingDown className="w-3.5 h-3.5" /> Payables</TabsTrigger>
      </TabsList>
      <TabsContent value="ar" className="mt-3">
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-border bg-muted/50">
              <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Invoice</th>
              <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Customer</th>
              <th className="text-right px-4 py-2.5 font-medium text-muted-foreground">Amount</th>
              <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Due Date</th>
              <th className="text-center px-4 py-2.5 font-medium text-muted-foreground">Status</th>
            </tr></thead>
            <tbody>
              {receivables.map((r) => (
                <tr key={r.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{r.id}</td>
                  <td className="px-4 py-3 font-medium text-foreground">{r.customer}</td>
                  <td className="px-4 py-3 text-right font-medium text-foreground">{r.amount}</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.due}</td>
                  <td className="px-4 py-3 text-center">{statusBadge(r.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TabsContent>
      <TabsContent value="ap" className="mt-3">
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-border bg-muted/50">
              <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">PO #</th>
              <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Vendor</th>
              <th className="text-right px-4 py-2.5 font-medium text-muted-foreground">Amount</th>
              <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Due Date</th>
              <th className="text-center px-4 py-2.5 font-medium text-muted-foreground">Status</th>
            </tr></thead>
            <tbody>
              {payables.map((p) => (
                <tr key={p.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{p.id}</td>
                  <td className="px-4 py-3 font-medium text-foreground">{p.vendor}</td>
                  <td className="px-4 py-3 text-right font-medium text-foreground">{p.amount}</td>
                  <td className="px-4 py-3 text-muted-foreground">{p.due}</td>
                  <td className="px-4 py-3 text-center">{statusBadge(p.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TabsContent>
    </Tabs>
  </div>
);

export default Accounts;
