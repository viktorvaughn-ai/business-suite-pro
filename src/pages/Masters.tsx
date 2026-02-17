import { Database, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const masterTabs = [
  { key: "customers", label: "Customers", count: 86 },
  { key: "vendors", label: "Vendors", count: 42 },
  { key: "items", label: "Items", count: 234 },
  { key: "warehouses", label: "Warehouses", count: 3 },
];

const Masters = () => (
  <div className="space-y-4 animate-fade-in">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="module-header">Masters</h1>
        <p className="text-sm text-muted-foreground mt-1">CRUD operations for all master data across modules</p>
      </div>
      <Button size="sm" className="gap-1.5"><Plus className="w-4 h-4" /> Add Record</Button>
    </div>

    <Tabs defaultValue="customers">
      <TabsList>
        {masterTabs.map((t) => (
          <TabsTrigger key={t.key} value={t.key}>{t.label} ({t.count})</TabsTrigger>
        ))}
      </TabsList>
      {masterTabs.map((t) => (
        <TabsContent key={t.key} value={t.key} className="mt-3">
          <div className="bg-card rounded-lg border border-border p-12 text-center">
            <Database className="w-10 h-10 text-muted-foreground mx-auto" />
            <h3 className="font-semibold text-foreground mt-3">{t.label} Master</h3>
            <p className="text-sm text-muted-foreground mt-1">{t.count} records · Add, edit, or delete {t.label.toLowerCase()}</p>
            <div className="flex justify-center gap-2 mt-4">
              <Button size="sm" variant="outline">Import CSV</Button>
              <Button size="sm" className="gap-1.5"><Plus className="w-4 h-4" /> Add New</Button>
            </div>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  </div>
);

export default Masters;
