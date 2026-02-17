import { SlidersHorizontal, Plus, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const registries = [
  { module: "Inventory", field: "Batch Number", type: "Text", required: true, status: "active" },
  { module: "Inventory", field: "Expiry Date", type: "Date", required: false, status: "active" },
  { module: "CRM", field: "Industry Sector", type: "Dropdown", required: true, status: "active" },
  { module: "CRM", field: "Annual Revenue", type: "Currency", required: false, status: "active" },
  { module: "HR", field: "Blood Group", type: "Dropdown", required: false, status: "inactive" },
  { module: "Manufacturing", field: "Tolerance %", type: "Number", required: true, status: "active" },
];

const FieldRegistry = () => (
  <div className="space-y-4 animate-fade-in">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="module-header">Field Registry</h1>
        <p className="text-sm text-muted-foreground mt-1">CRUD custom parameters for items, warehouses, stock & all modules</p>
      </div>
      <Button size="sm" className="gap-1.5"><Plus className="w-4 h-4" /> Add Custom Field</Button>
    </div>

    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <table className="w-full text-sm">
        <thead><tr className="border-b border-border bg-muted/50">
          <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Module</th>
          <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Field Name</th>
          <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Type</th>
          <th className="text-center px-4 py-2.5 font-medium text-muted-foreground">Required</th>
          <th className="text-center px-4 py-2.5 font-medium text-muted-foreground">Status</th>
        </tr></thead>
        <tbody>
          {registries.map((r, i) => (
            <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/30">
              <td className="px-4 py-3"><Badge variant="outline" className="text-[10px]">{r.module}</Badge></td>
              <td className="px-4 py-3 font-medium text-foreground">{r.field}</td>
              <td className="px-4 py-3 text-muted-foreground">{r.type}</td>
              <td className="px-4 py-3 text-center text-muted-foreground">{r.required ? "Yes" : "No"}</td>
              <td className="px-4 py-3 text-center">
                <Badge variant="secondary" className={r.status === "active" ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}>
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

export default FieldRegistry;
