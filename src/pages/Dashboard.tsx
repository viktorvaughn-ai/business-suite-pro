import {
  TrendingUp,
  TrendingDown,
  Users,
  Package,
  IndianRupee,
  ShoppingCart,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  AlertTriangle,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const kpis = [
  {
    title: "Revenue (MTD)",
    value: "₹24.5L",
    change: "+12.4%",
    trend: "up" as const,
    icon: IndianRupee,
    color: "text-success",
  },
  {
    title: "Open Leads",
    value: "142",
    change: "+8",
    trend: "up" as const,
    icon: Users,
    color: "text-info",
  },
  {
    title: "Pending Orders",
    value: "38",
    change: "-5",
    trend: "down" as const,
    icon: ShoppingCart,
    color: "text-warning",
  },
  {
    title: "Inventory Value",
    value: "₹1.2Cr",
    change: "+2.1%",
    trend: "up" as const,
    icon: Package,
    color: "text-primary",
  },
];

const revenueData = [
  { month: "Aug", revenue: 18, expenses: 12 },
  { month: "Sep", revenue: 22, expenses: 14 },
  { month: "Oct", revenue: 19, expenses: 13 },
  { month: "Nov", revenue: 26, expenses: 15 },
  { month: "Dec", revenue: 24, expenses: 16 },
  { month: "Jan", revenue: 28, expenses: 14 },
  { month: "Feb", revenue: 24.5, expenses: 13 },
];

const pipelineData = [
  { stage: "New", count: 42 },
  { stage: "Hot", count: 28 },
  { stage: "Qualified", count: 22 },
  { stage: "Proposal", count: 18 },
  { stage: "Negotiation", count: 12 },
  { stage: "Converted", count: 20 },
];

const inventoryByCategory = [
  { name: "Raw Materials", value: 35 },
  { name: "WIP", value: 20 },
  { name: "Finished Goods", value: 30 },
  { name: "Consumables", value: 15 },
];

const COLORS = [
  "hsl(173 80% 36%)",
  "hsl(210 80% 52%)",
  "hsl(38 92% 50%)",
  "hsl(280 65% 55%)",
];

const recentActivities = [
  { text: "New lead added: Reliance Industries", time: "2 min ago", icon: Users },
  { text: "Invoice #INV-2024-089 paid", time: "15 min ago", icon: IndianRupee },
  { text: "Stock alert: Widget-A below reorder level", time: "1 hr ago", icon: AlertTriangle },
  { text: "PO #PO-456 approved", time: "2 hr ago", icon: ShoppingCart },
  { text: "GST return filed for Jan 2025", time: "3 hr ago", icon: Clock },
];

const Dashboard = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="module-header">Executive Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Real-time business intelligence overview
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <div key={kpi.title} className="kpi-card">
            <div className="flex items-start justify-between">
              <div>
                <p className="stat-label">{kpi.title}</p>
                <p className="stat-value mt-1">{kpi.value}</p>
              </div>
              <div className={`p-2 rounded-md bg-muted ${kpi.color}`}>
                <kpi.icon className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-3 text-xs">
              {kpi.trend === "up" ? (
                <ArrowUpRight className="w-3 h-3 text-success" />
              ) : (
                <ArrowDownRight className="w-3 h-3 text-destructive" />
              )}
              <span
                className={
                  kpi.trend === "up" ? "text-success" : "text-destructive"
                }
              >
                {kpi.change}
              </span>
              <span className="text-muted-foreground">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-card rounded-lg border border-border p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">
            Revenue vs Expenses (₹ Lakhs)
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(173 80% 36%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(173 80% 36%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 90%)" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(220 10% 46%)" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(220 10% 46%)" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="hsl(173 80% 36%)"
                fillOpacity={1}
                fill="url(#revGrad)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="expenses"
                stroke="hsl(0 72% 51%)"
                fillOpacity={0.1}
                fill="hsl(0 72% 51%)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Inventory Pie */}
        <div className="bg-card rounded-lg border border-border p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">
            Inventory Distribution
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={inventoryByCategory}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={4}
                dataKey="value"
              >
                {inventoryByCategory.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {inventoryByCategory.map((item, i) => (
              <div key={item.name} className="flex items-center gap-2 text-xs">
                <div
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: COLORS[i] }}
                />
                <span className="text-muted-foreground truncate">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Pipeline */}
        <div className="lg:col-span-2 bg-card rounded-lg border border-border p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">
            CRM Pipeline
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={pipelineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 90%)" />
              <XAxis dataKey="stage" tick={{ fontSize: 11 }} stroke="hsl(220 10% 46%)" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(220 10% 46%)" />
              <Tooltip />
              <Bar dataKey="count" fill="hsl(173 80% 36%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Activity */}
        <div className="bg-card rounded-lg border border-border p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">
            Recent Activity
          </h3>
          <div className="space-y-3">
            {recentActivities.map((activity, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="p-1.5 bg-muted rounded-md mt-0.5">
                  <activity.icon className="w-3 h-3 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-foreground truncate">{activity.text}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
