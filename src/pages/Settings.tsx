import { Settings as SettingsIcon, Shield, Bell, Palette, Globe } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const SettingsPage = () => (
  <div className="space-y-4 animate-fade-in">
    <div>
      <h1 className="module-header">Settings</h1>
      <p className="text-sm text-muted-foreground mt-1">Master settings and system configuration</p>
    </div>

    <Tabs defaultValue="general">
      <TabsList>
        <TabsTrigger value="general" className="gap-1.5"><Globe className="w-3.5 h-3.5" /> General</TabsTrigger>
        <TabsTrigger value="security" className="gap-1.5"><Shield className="w-3.5 h-3.5" /> Security</TabsTrigger>
        <TabsTrigger value="notifications" className="gap-1.5"><Bell className="w-3.5 h-3.5" /> Notifications</TabsTrigger>
      </TabsList>

      <TabsContent value="general" className="mt-3">
        <div className="bg-card rounded-lg border border-border p-6 max-w-lg space-y-4">
          <div className="grid gap-1.5"><Label>Company Name</Label><Input defaultValue="My Enterprise Pvt Ltd" /></div>
          <div className="grid gap-1.5"><Label>GSTIN</Label><Input defaultValue="27AABCU9603R1ZM" /></div>
          <div className="grid gap-1.5"><Label>Currency</Label><Input defaultValue="INR (₹)" disabled /></div>
          <div className="grid gap-1.5"><Label>Financial Year</Label><Input defaultValue="April - March" disabled /></div>
          <Button size="sm">Save Changes</Button>
        </div>
      </TabsContent>

      <TabsContent value="security" className="mt-3">
        <div className="bg-card rounded-lg border border-border p-6 max-w-lg space-y-4">
          <div className="flex items-center justify-between">
            <div><Label>Two-Factor Auth</Label><p className="text-xs text-muted-foreground">Require 2FA for all users</p></div>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div><Label>Audit Logging</Label><p className="text-xs text-muted-foreground">Log all CRUD operations</p></div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div><Label>Session Timeout</Label><p className="text-xs text-muted-foreground">Auto-logout after inactivity</p></div>
            <Switch defaultChecked />
          </div>
        </div>
      </TabsContent>

      <TabsContent value="notifications" className="mt-3">
        <div className="bg-card rounded-lg border border-border p-6 max-w-lg space-y-4">
          <div className="flex items-center justify-between">
            <div><Label>Email Notifications</Label><p className="text-xs text-muted-foreground">Receive email alerts</p></div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div><Label>Low Stock Alerts</Label><p className="text-xs text-muted-foreground">Alert when stock falls below reorder</p></div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div><Label>Invoice Reminders</Label><p className="text-xs text-muted-foreground">Auto-remind overdue invoices</p></div>
            <Switch defaultChecked />
          </div>
        </div>
      </TabsContent>
    </Tabs>
  </div>
);

export default SettingsPage;
