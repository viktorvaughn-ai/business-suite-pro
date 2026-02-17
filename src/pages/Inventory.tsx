import { useState } from "react";
import { Package, Warehouse, ArrowLeftRight, ClipboardList, Plus, Search, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const stockItems = [
  { id: "SKU001", name: "Steel Rod 12mm", category: "Raw Materials", warehouse: "Mumbai-W1", qty: 2500, unit: "kg", reorder: 500, value: "₹3.75L" },
  { id: "SKU002", name: "Copper Wire 2mm", category: "Raw Materials", warehouse: "Delhi-W2", qty: 180, unit: "kg", reorder: 200, value: "₹1.44L" },
  { id: "SKU003", name: "Widget-A Assembly", category: "Finished Goods", warehouse: "Mumbai-W1", qty: 450, unit: "pcs", reorder: 100, value: "₹6.75L" },
  { id: "SKU004", name: "Circuit Board v3", category: "WIP", warehouse: "Bangalore-W3", qty: 320, unit: "pcs", reorder: 50, value: "₹4.80L" },
  { id: "SKU005", name: "Packaging Box L", category: "Consumables", warehouse: "Delhi-W2", qty: 1200, unit: "pcs", reorder: 300, value: "₹0.36L" },
  { id: "SKU006", name: "Motor 5HP", category: "Finished Goods", warehouse: "Bangalore-W3", qty: 28, unit: "pcs", reorder: 10, value: "₹8.40L" },
];

const warehouses = [
  { id: "W1", name: "Mumbai-W1", location: "Mumbai, MH", gstin: "27AABCU9603R1ZM", items: 142, value: "₹45.2L" },
  { id: "W2", name: "Delhi-W2", location: "New Delhi, DL", gstin: "07AABCU9603R1ZN", items: 98, value: "₹28.6L" },
  { id: "W3", name: "Bangalore-W3", location: "Bangalore, KA", gstin: "29AABCU9603R1ZP", items: 76, value: "₹32.1L" },
];

const Inventory = () => {
  const [search, setSearch] = useState("");

  const filtered = stockItems.filter(
    (i) => i.name.toLowerCase().includes(search.toLowerCase()) || i.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="module-header">Inventory Management</h1>
          <p className="text-sm text-muted-foreground mt-1">Multi-location stock management & tracking</p>
        </div>
        <Button size="sm" className="gap-1.5"><Plus className="w-4 h-4" /> Add Item</Button>
      </div>

      <Tabs defaultValue="stock" className="space-y-4">
        <TabsList>
          <TabsTrigger value="stock" className="gap-1.5"><Package className="w-3.5 h-3.5" /> Stock & Items</TabsTrigger>
          <TabsTrigger value="warehouses" className="gap-1.5"><Warehouse className="w-3.5 h-3.5" /> Warehouses</TabsTrigger>
          <TabsTrigger value="transfers" className="gap-1.5"><ArrowLeftRight className="w-3.5 h-3.5" /> Transfers</TabsTrigger>
          <TabsTrigger value="adjustments" className="gap-1.5"><ClipboardList className="w-3.5 h-3.5" /> Adjustments</TabsTrigger>
        </TabsList>

        <TabsContent value="stock" className="space-y-3">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search items..." className="pl-9" />
          </div>

          <div className="bg-card rounded-lg border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">SKU</th>
                  <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Item Name</th>
                  <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Category</th>
                  <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Warehouse</th>
                  <th className="text-right px-4 py-2.5 font-medium text-muted-foreground">Qty</th>
                  <th className="text-right px-4 py-2.5 font-medium text-muted-foreground">Value</th>
                  <th className="text-center px-4 py-2.5 font-medium text-muted-foreground">Status</th>
                  <th className="px-4 py-2.5"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item) => (
                  <tr key={item.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{item.id}</td>
                    <td className="px-4 py-3 font-medium text-foreground">{item.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{item.category}</td>
                    <td className="px-4 py-3 text-muted-foreground">{item.warehouse}</td>
                    <td className="px-4 py-3 text-right text-foreground">{item.qty} {item.unit}</td>
                    <td className="px-4 py-3 text-right font-medium text-foreground">{item.value}</td>
                    <td className="px-4 py-3 text-center">
                      {item.qty <= item.reorder ? (
                        <Badge variant="destructive" className="text-[10px]">Low Stock</Badge>
                      ) : (
                        <Badge variant="secondary" className="text-[10px]">In Stock</Badge>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button className="p-1 hover:bg-muted rounded"><MoreHorizontal className="w-4 h-4 text-muted-foreground" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="warehouses" className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {warehouses.map((wh) => (
              <div key={wh.id} className="kpi-card">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground">{wh.name}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{wh.location}</p>
                  </div>
                  <Warehouse className="w-5 h-5 text-primary" />
                </div>
                <p className="text-[10px] text-muted-foreground mt-2 font-mono">GSTIN: {wh.gstin}</p>
                <div className="flex justify-between mt-3 pt-3 border-t border-border">
                  <div>
                    <p className="text-xs text-muted-foreground">Items</p>
                    <p className="text-lg font-bold text-foreground">{wh.items}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Value</p>
                    <p className="text-lg font-bold text-primary">{wh.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="transfers">
          <div className="bg-card rounded-lg border border-border p-12 text-center">
            <ArrowLeftRight className="w-10 h-10 text-muted-foreground mx-auto" />
            <h3 className="font-semibold text-foreground mt-3">Stock Transfers</h3>
            <p className="text-sm text-muted-foreground mt-1">Create and manage stock transfers between warehouses</p>
            <Button size="sm" className="mt-4 gap-1.5"><Plus className="w-4 h-4" /> New Transfer</Button>
          </div>
        </TabsContent>

        <TabsContent value="adjustments">
          <div className="bg-card rounded-lg border border-border p-12 text-center">
            <ClipboardList className="w-10 h-10 text-muted-foreground mx-auto" />
            <h3 className="font-semibold text-foreground mt-3">Stock Adjustments</h3>
            <p className="text-sm text-muted-foreground mt-1">Manage opening stock, adjustments, and recounts</p>
            <Button size="sm" className="mt-4 gap-1.5"><Plus className="w-4 h-4" /> New Adjustment</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Inventory;
