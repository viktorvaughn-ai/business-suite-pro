import { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Phone,
  Mail,
  Building2,
  IndianRupee,
  User,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

type LeadStage =
  | "new"
  | "hot"
  | "cold"
  | "contacted"
  | "qualified"
  | "proposal"
  | "negotiation"
  | "converted"
  | "customer"
  | "lost";

interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  value: string;
  stage: LeadStage;
  assignee: string;
  createdAt: string;
}

const stageConfig: Record<
  LeadStage,
  { label: string; color: string; bgColor: string }
> = {
  new: { label: "New", color: "text-info", bgColor: "bg-info/10 border-info/20" },
  hot: { label: "Hot", color: "text-destructive", bgColor: "bg-destructive/10 border-destructive/20" },
  cold: { label: "Cold", color: "text-muted-foreground", bgColor: "bg-muted border-border" },
  contacted: { label: "Contacted", color: "text-warning", bgColor: "bg-warning/10 border-warning/20" },
  qualified: { label: "Qualified", color: "text-primary", bgColor: "bg-primary/10 border-primary/20" },
  proposal: { label: "Proposal", color: "text-chart-4", bgColor: "bg-accent border-border" },
  negotiation: { label: "Negotiation", color: "text-warning", bgColor: "bg-warning/10 border-warning/20" },
  converted: { label: "Converted", color: "text-success", bgColor: "bg-success/10 border-success/20" },
  customer: { label: "Customer", color: "text-success", bgColor: "bg-success/10 border-success/20" },
  lost: { label: "Lost", color: "text-destructive", bgColor: "bg-destructive/10 border-destructive/20" },
};

const stages: LeadStage[] = [
  "new",
  "hot",
  "cold",
  "contacted",
  "qualified",
  "proposal",
  "negotiation",
  "converted",
  "customer",
  "lost",
];

const initialLeads: Lead[] = [
  { id: "1", name: "Vikram Mehta", company: "TechCorp India", email: "vikram@techcorp.in", phone: "+91 98765 43210", value: "₹5.2L", stage: "new", assignee: "Priya S.", createdAt: "2025-02-15" },
  { id: "2", name: "Anita Sharma", company: "Global Exports Ltd", email: "anita@globalexports.com", phone: "+91 87654 32109", value: "₹12L", stage: "hot", assignee: "Rahul K.", createdAt: "2025-02-14" },
  { id: "3", name: "Rajesh Kumar", company: "BuildRight Infra", email: "rajesh@buildright.co.in", phone: "+91 76543 21098", value: "₹3.8L", stage: "contacted", assignee: "Priya S.", createdAt: "2025-02-12" },
  { id: "4", name: "Meena Patel", company: "Patel Enterprises", email: "meena@patelent.com", phone: "+91 65432 10987", value: "₹8.5L", stage: "qualified", assignee: "Amit D.", createdAt: "2025-02-10" },
  { id: "5", name: "Suresh Iyer", company: "Chennai Motors", email: "suresh@chennaimotors.in", phone: "+91 54321 09876", value: "₹22L", stage: "proposal", assignee: "Rahul K.", createdAt: "2025-02-08" },
  { id: "6", name: "Fatima Khan", company: "Star Textiles", email: "fatima@startex.com", phone: "+91 43210 98765", value: "₹15L", stage: "negotiation", assignee: "Priya S.", createdAt: "2025-02-06" },
  { id: "7", name: "Deepak Joshi", company: "Green Farms Pvt", email: "deepak@greenfarms.co", phone: "+91 32109 87654", value: "₹6L", stage: "converted", assignee: "Amit D.", createdAt: "2025-01-28" },
  { id: "8", name: "Lakshmi Rao", company: "Rao & Sons", email: "lakshmi@raosons.in", phone: "+91 21098 76543", value: "₹1.5L", stage: "cold", assignee: "Rahul K.", createdAt: "2025-02-01" },
  { id: "9", name: "Arvind Singh", company: "Singh Industries", email: "arvind@singhindustries.com", phone: "+91 10987 65432", value: "₹45L", stage: "customer", assignee: "Priya S.", createdAt: "2025-01-15" },
  { id: "10", name: "Nisha Gupta", company: "Gupta Pharma", email: "nisha@guptapharma.in", phone: "+91 09876 54321", value: "₹2L", stage: "lost", assignee: "Amit D.", createdAt: "2025-01-20" },
];

const CRM = () => {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [visibleStages, setVisibleStages] = useState<LeadStage[]>(stages);

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    value: "",
    stage: "new" as LeadStage,
    assignee: "",
  });

  const filteredLeads = leads.filter(
    (l) =>
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.company.toLowerCase().includes(search.toLowerCase())
  );

  const openCreate = () => {
    setEditingLead(null);
    setFormData({ name: "", company: "", email: "", phone: "", value: "", stage: "new", assignee: "" });
    setDialogOpen(true);
  };

  const openEdit = (lead: Lead) => {
    setEditingLead(lead);
    setFormData({
      name: lead.name,
      company: lead.company,
      email: lead.email,
      phone: lead.phone,
      value: lead.value,
      stage: lead.stage,
      assignee: lead.assignee,
    });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!formData.name) return;
    if (editingLead) {
      setLeads((prev) =>
        prev.map((l) =>
          l.id === editingLead.id ? { ...l, ...formData } : l
        )
      );
    } else {
      const newLead: Lead = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString().split("T")[0],
      };
      setLeads((prev) => [...prev, newLead]);
    }
    setDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    setLeads((prev) => prev.filter((l) => l.id !== id));
    setSelectedLead(null);
  };

  const moveToStage = (leadId: string, newStage: LeadStage) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, stage: newStage } : l))
    );
  };

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="module-header">CRM Pipeline</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {leads.length} leads · Drag cards or use actions to move stages
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreate} size="sm" className="gap-1.5">
              <Plus className="w-4 h-4" /> Add Lead
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingLead ? "Edit Lead" : "Add New Lead"}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-3 py-2">
              <div className="grid gap-1.5">
                <Label>Name *</Label>
                <Input value={formData.name} onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))} placeholder="Full name" />
              </div>
              <div className="grid gap-1.5">
                <Label>Company</Label>
                <Input value={formData.company} onChange={(e) => setFormData((p) => ({ ...p, company: e.target.value }))} placeholder="Company name" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="grid gap-1.5">
                  <Label>Email</Label>
                  <Input value={formData.email} onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))} placeholder="email@co.in" />
                </div>
                <div className="grid gap-1.5">
                  <Label>Phone</Label>
                  <Input value={formData.phone} onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))} placeholder="+91..." />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="grid gap-1.5">
                  <Label>Deal Value</Label>
                  <Input value={formData.value} onChange={(e) => setFormData((p) => ({ ...p, value: e.target.value }))} placeholder="₹5L" />
                </div>
                <div className="grid gap-1.5">
                  <Label>Stage</Label>
                  <Select value={formData.stage} onValueChange={(v) => setFormData((p) => ({ ...p, stage: v as LeadStage }))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {stages.map((s) => (
                        <SelectItem key={s} value={s}>{stageConfig[s].label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-1.5">
                <Label>Assignee</Label>
                <Input value={formData.assignee} onChange={(e) => setFormData((p) => ({ ...p, assignee: e.target.value }))} placeholder="Assignee name" />
              </div>
              <Button onClick={handleSave} className="mt-2">
                {editingLead ? "Update Lead" : "Create Lead"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="flex gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search leads..."
            className="pl-9"
          />
        </div>
      </div>

      {/* Kanban Board */}
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-3 min-w-max">
          {visibleStages.map((stage) => {
            const config = stageConfig[stage];
            const stageLeads = filteredLeads.filter((l) => l.stage === stage);
            return (
              <div key={stage} className="w-[260px] shrink-0">
                <div className="flex items-center justify-between mb-2 px-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-semibold uppercase tracking-wide ${config.color}`}>
                      {config.label}
                    </span>
                    <Badge variant="secondary" className="text-[10px] h-5 px-1.5">
                      {stageLeads.length}
                    </Badge>
                  </div>
                </div>
                <div className="kanban-column space-y-2">
                  {stageLeads.map((lead) => (
                    <div
                      key={lead.id}
                      className="kanban-card"
                      onClick={() => setSelectedLead(lead)}
                    >
                      <div className="flex items-start justify-between">
                        <h4 className="text-sm font-medium text-foreground truncate pr-2">
                          {lead.name}
                        </h4>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openEdit(lead);
                          }}
                          className="p-0.5 hover:bg-muted rounded"
                        >
                          <MoreHorizontal className="w-3.5 h-3.5 text-muted-foreground" />
                        </button>
                      </div>
                      <div className="flex items-center gap-1.5 mt-1 text-xs text-muted-foreground">
                        <Building2 className="w-3 h-3" />
                        <span className="truncate">{lead.company}</span>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs font-semibold text-primary">
                          {lead.value}
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          {lead.assignee}
                        </span>
                      </div>
                    </div>
                  ))}
                  {stageLeads.length === 0 && (
                    <div className="text-center py-8 text-xs text-muted-foreground">
                      No leads
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lead Detail Sheet */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-foreground/20" onClick={() => setSelectedLead(null)} />
          <div className="relative w-full max-w-md bg-card border-l border-border shadow-xl p-6 overflow-y-auto animate-slide-in">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-foreground">{selectedLead.name}</h2>
                <p className="text-sm text-muted-foreground">{selectedLead.company}</p>
              </div>
              <button onClick={() => setSelectedLead(null)} className="p-1 hover:bg-muted rounded-md">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-muted rounded-md p-3">
                  <p className="text-[10px] font-medium text-muted-foreground uppercase">Stage</p>
                  <Badge className={`mt-1 ${stageConfig[selectedLead.stage].bgColor} ${stageConfig[selectedLead.stage].color} border`}>
                    {stageConfig[selectedLead.stage].label}
                  </Badge>
                </div>
                <div className="bg-muted rounded-md p-3">
                  <p className="text-[10px] font-medium text-muted-foreground uppercase">Value</p>
                  <p className="text-sm font-semibold text-foreground mt-1">{selectedLead.value}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="text-foreground">{selectedLead.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span className="text-foreground">{selectedLead.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="text-foreground">{selectedLead.assignee}</span>
                </div>
              </div>

              <div>
                <Label className="text-xs">Move to Stage</Label>
                <Select
                  value={selectedLead.stage}
                  onValueChange={(v) => {
                    moveToStage(selectedLead.id, v as LeadStage);
                    setSelectedLead({ ...selectedLead, stage: v as LeadStage });
                  }}
                >
                  <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {stages.map((s) => (
                      <SelectItem key={s} value={s}>{stageConfig[s].label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => openEdit(selectedLead)}>
                  Edit
                </Button>
                <Button variant="destructive" size="sm" className="flex-1" onClick={() => handleDelete(selectedLead.id)}>
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CRM;
