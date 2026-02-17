import { Receipt, FileCheck, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const gstReturns = [
  { period: "Jan 2025", gstr1: "filed", gstr3b: "filed", match: 98.5, mismatches: 3, status: "reconciled" },
  { period: "Dec 2024", gstr1: "filed", gstr3b: "filed", match: 96.2, mismatches: 8, status: "reconciled" },
  { period: "Nov 2024", gstr1: "filed", gstr3b: "filed", match: 99.1, mismatches: 2, status: "reconciled" },
  { period: "Oct 2024", gstr1: "filed", gstr3b: "pending", match: 0, mismatches: 0, status: "pending" },
];

const GST = () => (
  <div className="space-y-4 animate-fade-in">
    <div>
      <h1 className="module-header">GST Reconciliation</h1>
      <p className="text-sm text-muted-foreground mt-1">GSTR-1 vs GSTR-3B reconciliation and compliance tracking</p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="kpi-card">
        <p className="stat-label">GST Collected (MTD)</p>
        <p className="stat-value mt-1">₹4.41L</p>
      </div>
      <div className="kpi-card">
        <p className="stat-label">ITC Available</p>
        <p className="stat-value mt-1 text-success">₹2.85L</p>
      </div>
      <div className="kpi-card">
        <p className="stat-label">Net Liability</p>
        <p className="stat-value mt-1 text-destructive">₹1.56L</p>
      </div>
    </div>

    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <table className="w-full text-sm">
        <thead><tr className="border-b border-border bg-muted/50">
          <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Period</th>
          <th className="text-center px-4 py-2.5 font-medium text-muted-foreground">GSTR-1</th>
          <th className="text-center px-4 py-2.5 font-medium text-muted-foreground">GSTR-3B</th>
          <th className="text-right px-4 py-2.5 font-medium text-muted-foreground">Match %</th>
          <th className="text-right px-4 py-2.5 font-medium text-muted-foreground">Mismatches</th>
          <th className="text-center px-4 py-2.5 font-medium text-muted-foreground">Status</th>
        </tr></thead>
        <tbody>
          {gstReturns.map((r) => (
            <tr key={r.period} className="border-b border-border last:border-0 hover:bg-muted/30">
              <td className="px-4 py-3 font-medium text-foreground">{r.period}</td>
              <td className="px-4 py-3 text-center">
                {r.gstr1 === "filed" ? <CheckCircle2 className="w-4 h-4 text-success mx-auto" /> : <AlertTriangle className="w-4 h-4 text-warning mx-auto" />}
              </td>
              <td className="px-4 py-3 text-center">
                {r.gstr3b === "filed" ? <CheckCircle2 className="w-4 h-4 text-success mx-auto" /> : <AlertTriangle className="w-4 h-4 text-warning mx-auto" />}
              </td>
              <td className="px-4 py-3 text-right font-medium text-foreground">{r.match > 0 ? `${r.match}%` : "—"}</td>
              <td className="px-4 py-3 text-right text-foreground">{r.mismatches || "—"}</td>
              <td className="px-4 py-3 text-center">
                <Badge variant="secondary" className={r.status === "reconciled" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}>
                  {r.status}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default GST;
