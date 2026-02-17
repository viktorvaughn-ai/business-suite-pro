import { TrendingUp, Plus, ShoppingCart, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const purchases = [
  { id: "PO-2025-101", vendor: "Steel Suppliers Ltd", amount: "₹4,20,000", date: "2025-02-15", status: "approved" },
  { id: "PO-2025-102", vendor: "Copper World", amount: "₹1,88,000", date: "2025-02-16", status: "pending" },
  { id: "PO-2025-103", vendor: "PackageMart", amount: "₹72,000", date: "2025-02-14", status: "received" },
];

const sales = [
  { id: "SO-2025-201", customer: "TechCorp India", amount: "₹8,50,000", date: "2025-02-15", status: "confirmed" },
  { id: "SO-2025-202", customer: "BuildRight Infra", amount: "₹3,20,000", date: "2025-02-16", status: "draft" },
  { id: "SO-2025-203", customer: "Singh Industries", amount: "₹15,00,000", date: "2025-02-14", status: "shipped" },
];

const Finance = () => (
  <div className="space-y-4 animate-fade-in">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="module-header">Finance Management</h1>
        <p className="text-sm text-muted-foreground mt-1">Purchase orders, sales orders & financial tracking</p>
      </div>
    </div>

    <Tabs defaultValue="purchases">
      <TabsList>
        <TabsTrigger value="purchases" className="gap-1.5"><ShoppingCart className="w-3.5 h-3.5" /> Purchases</TabsTrigger>
        <TabsTrigger value="sales" className="gap-1.5"><TrendingUp className="w-3.5 h-3.5" /> Sales</TabsTrigger>
      </TabsList>

      <TabsContent value="purchases" className="mt-3 space-y-3">
        <div className="flex justify-end"><Button size="sm" className="gap-1.5"><Plus className="w-4 h-4" /> New Purchase Order</Button></div>
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-border bg-muted/50">
              <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">PO #</th>
              <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Vendor</th>
              <th className="text-right px-4 py-2.5 font-medium text-muted-foreground">Amount</th>
              <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Date</th>
              <th className="text-center px-4 py-2.5 font-medium text-muted-foreground">Status</th>
            </tr></thead>
            <tbody>
              {purchases.map((p) => (
                <tr key={p.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{p.id}</td>
                  <td className="px-4 py-3 font-medium text-foreground">{p.vendor}</td>
                  <td className="px-4 py-3 text-right font-medium text-foreground">{p.amount}</td>
                  <td className="px-4 py-3 text-muted-foreground">{p.date}</td>
                  <td className="px-4 py-3 text-center">
                    <Badge variant="secondary" className="text-[10px]">{p.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TabsContent>

      <TabsContent value="sales" className="mt-3 space-y-3">
        <div className="flex justify-end"><Button size="sm" className="gap-1.5"><Plus className="w-4 h-4" /> New Sales Order</Button></div>
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-border bg-muted/50">
              <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">SO #</th>
              <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Customer</th>
              <th className="text-right px-4 py-2.5 font-medium text-muted-foreground">Amount</th>
              <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Date</th>
              <th className="text-center px-4 py-2.5 font-medium text-muted-foreground">Status</th>
            </tr></thead>
            <tbody>
              {sales.map((s) => (
                <tr key={s.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{s.id}</td>
                  <td className="px-4 py-3 font-medium text-foreground">{s.customer}</td>
                  <td className="px-4 py-3 text-right font-medium text-foreground">{s.amount}</td>
                  <td className="px-4 py-3 text-muted-foreground">{s.date}</td>
                  <td className="px-4 py-3 text-center">
                    <Badge variant="secondary" className="text-[10px]">{s.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TabsContent>
    </Tabs>
  </div>
);

export default Finance;
