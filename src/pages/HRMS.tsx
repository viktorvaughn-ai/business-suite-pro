import { UserCog, Users, Calendar, Clock, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const employees = [
  { id: "EMP001", name: "Priya Sharma", department: "Sales", designation: "Sales Manager", status: "active", joined: "2022-03-15" },
  { id: "EMP002", name: "Rahul Kapoor", department: "Sales", designation: "Sr. Executive", status: "active", joined: "2023-01-10" },
  { id: "EMP003", name: "Amit Deshmukh", department: "Operations", designation: "Ops Manager", status: "active", joined: "2021-07-01" },
  { id: "EMP004", name: "Sneha Reddy", department: "Finance", designation: "Accountant", status: "on-leave", joined: "2023-06-20" },
  { id: "EMP005", name: "Karan Singh", department: "HR", designation: "HR Lead", status: "active", joined: "2020-11-05" },
  { id: "EMP006", name: "Neha Patel", department: "Manufacturing", designation: "Floor Supervisor", status: "active", joined: "2022-09-12" },
];

const HRMS = () => (
  <div className="space-y-4 animate-fade-in">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="module-header">HR Management</h1>
        <p className="text-sm text-muted-foreground mt-1">Employee management, attendance & payroll</p>
      </div>
      <Button size="sm" className="gap-1.5"><Plus className="w-4 h-4" /> Add Employee</Button>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
      <div className="kpi-card"><p className="stat-label">Total Employees</p><p className="stat-value mt-1">48</p></div>
      <div className="kpi-card"><p className="stat-label">Present Today</p><p className="stat-value mt-1 text-success">42</p></div>
      <div className="kpi-card"><p className="stat-label">On Leave</p><p className="stat-value mt-1 text-warning">4</p></div>
      <div className="kpi-card"><p className="stat-label">Open Positions</p><p className="stat-value mt-1 text-info">3</p></div>
    </div>

    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <table className="w-full text-sm">
        <thead><tr className="border-b border-border bg-muted/50">
          <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">ID</th>
          <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Name</th>
          <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Department</th>
          <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Designation</th>
          <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Joined</th>
          <th className="text-center px-4 py-2.5 font-medium text-muted-foreground">Status</th>
        </tr></thead>
        <tbody>
          {employees.map((e) => (
            <tr key={e.id} className="border-b border-border last:border-0 hover:bg-muted/30">
              <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{e.id}</td>
              <td className="px-4 py-3 font-medium text-foreground">{e.name}</td>
              <td className="px-4 py-3 text-muted-foreground">{e.department}</td>
              <td className="px-4 py-3 text-muted-foreground">{e.designation}</td>
              <td className="px-4 py-3 text-muted-foreground">{e.joined}</td>
              <td className="px-4 py-3 text-center">
                <Badge variant={e.status === "active" ? "secondary" : "outline"} className={e.status === "active" ? "bg-success/10 text-success border-success/20" : "text-warning border-warning/30"}>
                  {e.status === "active" ? "Active" : "On Leave"}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default HRMS;
