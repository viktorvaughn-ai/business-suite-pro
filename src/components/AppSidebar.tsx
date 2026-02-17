import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Package,
  Factory,
  Wallet,
  Receipt,
  FileText,
  Settings,
  Database,
  SlidersHorizontal,
  Warehouse,
  UserCog,
  TrendingUp,
  ClipboardList,
  ChevronLeft,
  Boxes,
} from "lucide-react";
import { useState } from "react";

const navSections = [
  {
    label: "Overview",
    items: [
      { title: "Dashboard", url: "/", icon: LayoutDashboard },
    ],
  },
  {
    label: "Sales & CRM",
    items: [
      { title: "CRM", url: "/crm", icon: Users },
      { title: "Finance", url: "/finance", icon: TrendingUp },
    ],
  },
  {
    label: "Operations",
    items: [
      { title: "Inventory", url: "/inventory", icon: Package },
      { title: "Manufacturing", url: "/manufacturing", icon: Factory },
    ],
  },
  {
    label: "Finance",
    items: [
      { title: "Accounts", url: "/accounts", icon: Wallet },
      { title: "GST Reconciliation", url: "/gst", icon: Receipt },
    ],
  },
  {
    label: "People",
    items: [
      { title: "HR Management", url: "/hrms", icon: UserCog },
    ],
  },
  {
    label: "Configuration",
    items: [
      { title: "Masters", url: "/masters", icon: Database },
      { title: "Field Registry", url: "/field-registry", icon: SlidersHorizontal },
      { title: "Settings", url: "/settings", icon: Settings },
    ],
  },
];

export function AppSidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`${
        collapsed ? "w-16" : "w-60"
      } flex flex-col border-r border-sidebar-border bg-sidebar transition-all duration-200 min-h-screen shrink-0`}
      style={{ background: "var(--gradient-sidebar)" }}
    >
      {/* Logo */}
      <div className="flex items-center justify-between h-14 px-3 border-b border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
              <Boxes className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-sidebar-accent-foreground tracking-tight">
              EnterprisOS
            </span>
          </div>
        )}
        {collapsed && (
          <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center mx-auto">
            <Boxes className="w-4 h-4 text-primary-foreground" />
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`p-1 rounded-md hover:bg-sidebar-accent text-sidebar-foreground transition-colors ${
            collapsed ? "mx-auto mt-2" : ""
          }`}
        >
          <ChevronLeft
            className={`w-4 h-4 transition-transform ${collapsed ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-2">
        {navSections.map((section) => (
          <div key={section.label}>
            {!collapsed && (
              <div className="nav-section-title">{section.label}</div>
            )}
            {collapsed && <div className="h-2" />}
            {section.items.map((item) => {
              const isActive =
                item.url === "/"
                  ? location.pathname === "/"
                  : location.pathname.startsWith(item.url);
              return (
                <NavLink
                  key={item.url}
                  to={item.url}
                  end={item.url === "/"}
                  className={`flex items-center gap-3 mx-2 px-3 py-2 rounded-md text-sm transition-colors ${
                    isActive
                      ? "bg-sidebar-accent text-sidebar-primary font-medium"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  } ${collapsed ? "justify-center px-2" : ""}`}
                  activeClassName=""
                >
                  <item.icon className="w-4 h-4 shrink-0" />
                  {!collapsed && <span>{item.title}</span>}
                </NavLink>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="p-3 border-t border-sidebar-border">
          <div className="flex items-center gap-2 px-2 py-1.5">
            <div className="w-7 h-7 rounded-full bg-sidebar-accent flex items-center justify-center text-xs font-medium text-sidebar-accent-foreground">
              A
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-sidebar-accent-foreground truncate">
                Admin User
              </p>
              <p className="text-[10px] text-sidebar-foreground truncate">
                admin@company.com
              </p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
