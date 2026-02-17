-- Supabase initialization SQL
-- Run this in the Supabase SQL editor or via psql using the project's DB connection string.
-- It creates core tables for profiles, CRM, inventory, finance, HR, manufacturing, and role-based access controls.

-- 1) Profiles (linked to auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  avatar_url text,
  role text default 'user',
  metadata jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 2) Roles (optional central role list)
create table if not exists public.roles (
  id serial primary key,
  name text not null unique,
  description text
);

-- 3) CRM: customers and leads
create table if not exists public.customers (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  company text,
  email text,
  phone text,
  address text,
  contact_person text,
  gstin text,
  customer_type text,
  credit_limit numeric,
  metadata jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.leads (
  id uuid default gen_random_uuid() primary key,
  customer_id uuid references public.customers(id) on delete set null,
  source text,
  value numeric,
  assignee uuid references public.profiles(id),
  status text,
  expected_close_date date,
  metadata jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.interactions (
  id uuid default gen_random_uuid() primary key,
  customer_id uuid references public.customers(id) on delete cascade,
  lead_id uuid references public.leads(id) on delete set null,
  type text,
  notes text,
  created_by uuid references public.profiles(id),
  created_at timestamptz default now()
);

-- 4) Products & Inventory
create table if not exists public.products (
  id uuid default gen_random_uuid() primary key,
  sku text unique,
  name text not null,
  description text,
  price numeric,
  cost_price numeric,
  category text,
  uom text,
  hsn_code text,
  gst_rate numeric,
  metadata jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.inventory_items (
  id uuid default gen_random_uuid() primary key,
  product_id uuid references public.products(id) on delete cascade,
  location text,
  quantity numeric default 0,
  reorder_level numeric,
  max_quantity numeric,
  metadata jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.stock_movements (
  id uuid default gen_random_uuid() primary key,
  inventory_item_id uuid references public.inventory_items(id) on delete cascade,
  change numeric not null,
  reason text,
  reference_type text,
  reference_id uuid,
  created_by uuid references public.profiles(id),
  created_at timestamptz default now()
);

-- 5) Finance: accounts, transactions, invoices
create table if not exists public.accounts (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  type text,
  account_number text unique,
  balance numeric default 0,
  currency text default 'INR',
  metadata jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.transactions (
  id uuid default gen_random_uuid() primary key,
  account_id uuid references public.accounts(id) on delete set null,
  amount numeric not null,
  kind text,
  description text,
  reference_type text,
  related_id uuid,
  created_by uuid references public.profiles(id),
  created_at timestamptz default now()
);

create table if not exists public.invoices (
  id uuid default gen_random_uuid() primary key,
  invoice_number text unique,
  customer_id uuid references public.customers(id) on delete set null,
  invoice_date date,
  due_date date,
  total numeric,
  tax_amount numeric,
  status text,
  payment_status text,
  notes text,
  metadata jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.invoice_items (
  id uuid default gen_random_uuid() primary key,
  invoice_id uuid references public.invoices(id) on delete cascade,
  product_id uuid references public.products(id),
  quantity numeric default 1,
  unit_price numeric,
  tax_rate numeric,
  tax_amount numeric,
  line_total numeric,
  created_at timestamptz default now()
);

-- 6) HR: employees, payroll, attendance
create table if not exists public.employees (
  id uuid default gen_random_uuid() primary key,
  profile_id uuid references public.profiles(id) on delete set null,
  employee_number text unique,
  first_name text,
  last_name text,
  email text unique,
  phone text,
  department text,
  title text,
  hired_at date,
  salary numeric,
  status text,
  metadata jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.payrolls (
  id uuid default gen_random_uuid() primary key,
  employee_id uuid references public.employees(id) on delete cascade,
  period_start date,
  period_end date,
  gross numeric,
  net numeric,
  pf numeric,
  esi numeric,
  income_tax numeric,
  taxes jsonb,
  created_at timestamptz default now()
);

create table if not exists public.attendance (
  id uuid default gen_random_uuid() primary key,
  employee_id uuid references public.employees(id) on delete cascade,
  date date,
  status text,
  hours_worked numeric,
  notes text,
  created_at timestamptz default now()
);

-- 7) Manufacturing
create table if not exists public.production_orders (
  id uuid default gen_random_uuid() primary key,
  order_number text unique,
  product_id uuid references public.products(id),
  quantity numeric not null,
  status text,
  start_date date,
  end_date date,
  priority text,
  notes text,
  created_by uuid references public.profiles(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.boms (
  id uuid default gen_random_uuid() primary key,
  product_id uuid references public.products(id) on delete cascade,
  name text,
  version int,
  active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.bom_items (
  id uuid default gen_random_uuid() primary key,
  bom_id uuid references public.boms(id) on delete cascade,
  component_id uuid references public.products(id),
  quantity numeric,
  unit_cost numeric,
  created_at timestamptz default now()
);

create table if not exists public.production_batches (
  id uuid default gen_random_uuid() primary key,
  production_order_id uuid references public.production_orders(id) on delete cascade,
  batch_number text unique,
  status text,
  quantity_produced numeric,
  quality_status text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 8) Purchasing: purchase orders and suppliers
create table if not exists public.suppliers (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text,
  phone text,
  address text,
  city text,
  country text,
  gstin text,
  payment_terms text,
  metadata jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.purchase_orders (
  id uuid default gen_random_uuid() primary key,
  po_number text unique,
  supplier_id uuid references public.suppliers(id),
  order_date date,
  expected_delivery_date date,
  total numeric,
  status text,
  notes text,
  created_by uuid references public.profiles(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.po_items (
  id uuid default gen_random_uuid() primary key,
  purchase_order_id uuid references public.purchase_orders(id) on delete cascade,
  product_id uuid references public.products(id),
  quantity numeric,
  unit_price numeric,
  gst_rate numeric,
  line_total numeric,
  received_qty numeric default 0,
  created_at timestamptz default now()
);

create table if not exists public.goods_receipt (
  id uuid default gen_random_uuid() primary key,
  po_id uuid references public.purchase_orders(id),
  receipt_date date,
  quantity_received numeric,
  quality_check boolean,
  notes text,
  created_by uuid references public.profiles(id),
  created_at timestamptz default now()
);

-- 9) GST / tax records
create table if not exists public.gst_records (
  id uuid default gen_random_uuid() primary key,
  bill_type text,
  invoice_id uuid references public.invoices(id) on delete set null,
  tax_amount numeric,
  tax_rate numeric,
  period date,
  igst numeric,
  sgst numeric,
  cgst numeric,
  created_at timestamptz default now()
);

create table if not exists public.gst_submissions (
  id uuid default gen_random_uuid() primary key,
  period date,
  status text,
  submitted_at timestamptz,
  submission_reference text,
  created_at timestamptz default now()
);

-- 10) Masters (generic key/value or config entries)
create table if not exists public.masters (
  id uuid default gen_random_uuid() primary key,
  key text not null,
  value jsonb,
  namespace text default 'default',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.master_data (
  id uuid default gen_random_uuid() primary key,
  master_type text,
  code text unique,
  name text,
  description text,
  active boolean default true,
  sequence int,
  metadata jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 11) Field Registry / Custom Fields
create table if not exists public.field_definitions (
  id uuid default gen_random_uuid() primary key,
  entity_type text,
  field_name text,
  field_label text,
  field_type text,
  required boolean default false,
  read_only boolean default false,
  default_value text,
  validation_rules jsonb,
  sequence int,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.field_values (
  id uuid default gen_random_uuid() primary key,
  field_definition_id uuid references public.field_definitions(id) on delete cascade,
  entity_type text,
  entity_id uuid,
  value text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 12) Module-level RBAC (assign permissions per role)
create table if not exists public.modules (
  id serial primary key,
  name text not null unique,
  description text,
  icon text
);

create table if not exists public.module_permissions (
  id serial primary key,
  module_id int references public.modules(id) on delete cascade,
  role text not null,
  allowed boolean default true,
  created_at timestamptz default now()
);

-- 13) Audit logs
create table if not exists public.audit_logs (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id),
  action text,
  entity_type text,
  entity_id uuid,
  changes jsonb,
  created_at timestamptz default now()
);

-- Trigger to create a profile row when a new auth user is created
-- Note: Running triggers on the auth schema may require elevated privileges in some Supabase projects.
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, created_at)
  values (new.id, new.email, now())
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();

-- Indexes for performance
create index if not exists idx_profiles_email on public.profiles (lower(email));
create index if not exists idx_customers_email on public.customers (lower(email));
create index if not exists idx_invoices_number on public.invoices (invoice_number);
create index if not exists idx_po_number on public.purchase_orders (po_number);
create index if not exists idx_product_sku on public.products (sku);
create index if not exists idx_employees_email on public.employees (lower(email));
create index if not exists idx_po_items_po on public.po_items (purchase_order_id);
create index if not exists idx_invoice_items_invoice on public.invoice_items (invoice_id);
create index if not exists idx_audit_logs_entity on public.audit_logs (entity_type, entity_id);
create index if not exists idx_production_orders_status on public.production_orders (status);
create index if not exists idx_stock_movements_inventory on public.stock_movements (inventory_item_id);

-- Optional: Insert initial modules for RBAC
insert into public.modules (name, description, icon) values
  ('Dashboard', 'Dashboard overview', 'LayoutDashboard'),
  ('CRM', 'Customer Relationship Management', 'Users'),
  ('Inventory', 'Inventory Management', 'Package'),
  ('Manufacturing', 'Manufacturing Operations', 'Factory'),
  ('Accounts', 'Finance & Accounts', 'Wallet'),
  ('GST', 'GST Reconciliation', 'Receipt'),
  ('HRMS', 'Human Resources', 'UserCog'),
  ('Finance', 'Financial Analytics', 'TrendingUp'),
  ('Masters', 'Master Data Configuration', 'Database'),
  ('Field Registry', 'Custom Fields', 'SlidersHorizontal'),
  ('Settings', 'System Settings', 'Settings')
on conflict (name) do nothing;

-- You can extend these tables with more fields, constraints, and policies as needed.
