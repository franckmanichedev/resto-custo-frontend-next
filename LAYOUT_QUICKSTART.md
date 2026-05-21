# FETCHOUN Layout System - Quick Start Guide

## 🚀 Quick Integration

### 1. Wrap Your App with AppShell

In your main app entry point (e.g., `src/app.tsx` or router):

```tsx
import { AppShell } from '@/components/layout'

export function App() {
  return (
    <AppShell>
      {/* Your routes/pages go here */}
    </AppShell>
  )
}
```

### 2. Create a Page Layout

For any new page, follow this pattern:

```tsx
import { PageContainer, PageHeader, PageSection, DashboardGrid } from '@/components/layout'
import { Card } from '@/components/ui'

export function DashboardPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Dashboard"
        subtitle="Welcome back!"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Dashboard' }
        ]}
      />

      <PageSection title="Statistics" description="Your key metrics">
        <DashboardGrid cols={3} gap="md">
          <Card>
            <h3>Total Orders</h3>
            <p>1,234</p>
          </Card>
          <Card>
            <h3>Revenue</h3>
            <p>$45,678</p>
          </Card>
          <Card>
            <h3>Customers</h3>
            <p>567</p>
          </Card>
        </DashboardGrid>
      </PageSection>

      <PageSection title="Recent Orders">
        <DashboardContent>
          {/* Your table or list */}
        </DashboardContent>
      </PageSection>
    </PageContainer>
  )
}
```

### 3. Responsive Grid Layouts

```tsx
// 3-column on desktop, 2 on tablet, 1 on mobile (default)
<DashboardGrid cols={3}>
  <Card>Item 1</Card>
  <Card>Item 2</Card>
  <Card>Item 3</Card>
</DashboardGrid>

// 4-column layout
<DashboardGrid cols={4} gap="lg">
  <Card>A</Card>
  <Card>B</Card>
  <Card>C</Card>
  <Card>D</Card>
</DashboardGrid>

// 2-column layout
<DashboardGrid cols={2} gap="sm">
  <Card>Left</Card>
  <Card>Right</Card>
</DashboardGrid>
```

### 4. Section Grouping

```tsx
<PageSection
  title="Advanced Settings"
  description="Configure your preferences"
  className="space-y-6"
>
  <SettingsForm />
</PageSection>

<PageSection title="Danger Zone">
  <DangerZoneContent />
</PageSection>
```

### 5. Content Padding Variants

```tsx
// Large padding (default)
<DashboardContent padding="lg">
  {/* Lots of space */}
</DashboardContent>

// Medium padding (default)
<DashboardContent padding="md">
  {/* Standard spacing */}
</DashboardContent>

// Small padding
<DashboardContent padding="sm">
  {/* Compact layout */}
</DashboardContent>

// No padding
<DashboardContent padding="none">
  {/* Custom spacing */}
</DashboardContent>
```

### 6. Page Actions

```tsx
import { Button } from '@/components/ui'

<PageHeader
  title="Restaurants"
  actions={
    <>
      <Button variant="secondary">Filter</Button>
      <Button>Add Restaurant</Button>
    </>
  }
/>
```

## 🎨 Design System Colors

All components use semantic FETCHOUN tokens:

```tsx
// Primary backgrounds
className="bg-app"          // Main app background
className="bg-surface"      // Card surfaces
className="bg-elevated"     // Hover states

// Text colors
className="text-foreground"           // Main text
className="text-muted-foreground"     // Secondary text
className="text-brand"                // Brand accent

// Borders
className="border-border"   // Dividers, borders

// Shadows
className="shadow-soft"     // Subtle shadow
className="shadow-card"     // Card shadow
className="shadow-floating" // Floating elements
```

## 📱 Responsive Patterns

```tsx
// Hide on mobile, show on sm+
<div className="hidden sm:block">Desktop only</div>

// Show on mobile, hide on lg+
<div className="lg:hidden">Mobile only</div>

// Responsive padding
<div className="p-4 sm:p-6 lg:p-8">Content</div>

// Responsive grid
<DashboardGrid cols={3}>
  {/* 1 col mobile, 2 sm, 3 lg */}
</DashboardGrid>

// Responsive font
<h1 className="text-2xl sm:text-3xl lg:text-4xl">Title</h1>
```

## 🧩 Component Combinations

### Full Dashboard Page
```tsx
<AppShell>
  <PageContainer>
    <PageHeader
      title="Dashboard"
      breadcrumbs={[{ label: 'Dashboard' }]}
    />
    <DashboardGrid cols={3}>
      <Card>Widget 1</Card>
      <Card>Widget 2</Card>
      <Card>Widget 3</Card>
    </DashboardGrid>
    <PageSection title="Details">
      <DashboardContent>
        <Table />
      </DashboardContent>
    </PageSection>
  </PageContainer>
</AppShell>
```

### Settings Page
```tsx
<AppShell>
  <PageContainer maxWidth="lg">
    <PageHeader title="Settings" />
    <PageSection title="Account">
      <DashboardContent>
        <SettingsForm section="account" />
      </DashboardContent>
    </PageSection>
    <PageSection title="Notifications">
      <DashboardContent>
        <NotificationSettings />
      </DashboardContent>
    </PageSection>
  </PageContainer>
</AppShell>
```

### Multi-Column Layout
```tsx
<AppShell>
  <PageContainer>
    <PageHeader title="Restaurants" />
    <DashboardGrid cols={4} gap="md">
      {restaurants.map((r) => (
        <RestaurantCard key={r.id} restaurant={r} />
      ))}
    </DashboardGrid>
  </PageContainer>
</AppShell>
```

## 🎯 Max-Width Options

```tsx
// Small (for modals, narrow pages)
<PageContainer maxWidth="sm">

// Medium (forms, settings)
<PageContainer maxWidth="md">

// Large (dashboards, lists) - DEFAULT
<PageContainer maxWidth="lg">

// Extra large (wide layouts)
<PageContainer maxWidth="xl">

// Full width
<PageContainer maxWidth="full">
```

## 🔌 Integration Checklist

- [ ] Wrap app with `<AppShell>`
- [ ] Update sidebar navigation items (currently placeholder)
- [ ] Update topbar user profile dropdown
- [ ] Connect WorkspaceSwitcher to tenant context
- [ ] Add page content to existing routes
- [ ] Test responsive on mobile/tablet/desktop
- [ ] Verify dark mode support
- [ ] Test breadcrumb navigation
- [ ] Add actions to PageHeaders
- [ ] Style tables/forms within containers

## ⚙️ Customization

### Custom Sidebar Items

Edit `src/components/layout/DashboardSidebar.tsx`:

```tsx
<SidebarSection title="Custom">
  <SidebarItem 
    icon={<IconName />} 
    label="Custom Item" 
    onClick={handleClick}
  />
</SidebarSection>
```

### Custom Topbar Actions

Edit `src/components/layout/Topbar.tsx`:

```tsx
<Topbar
  onSearch={handleSearch}
  onNotifications={handleNotifications}
  onSettings={handleSettings}
  onUserMenu={handleUserMenu}
  userName={currentUser?.name}
/>
```

### Sidebar Collapse State

Control sidebar from parent:

```tsx
const [sidebarOpen, setSidebarOpen] = useState(true)

<AppShell sidebarOpen={sidebarOpen} onSidebarChange={setSidebarOpen}>
  {/* App content */}
</AppShell>
```

## 🐛 Common Issues

### Sidebar not showing on mobile
- Mobile sidebar is a drawer overlay, triggered via menu button
- Check `AppShell` state management

### Content not constrained
- Wrap with `PageContainer`
- Verify `maxWidth` prop

### Styling inconsistencies
- Use semantic color tokens (not hardcoded colors)
- Use `cn()` for class composition
- Check dark mode CSS variables

### Responsive issues
- Use `hidden sm:block` patterns
- Test at actual breakpoints (640px, 768px, 1024px)
- Mobile-first approach (base styles for mobile)

## 📚 Component Reference

```tsx
import {
  AppShell,
  Sidebar,
  MobileSidebar,
  Topbar,
  TopbarSearch,
  TopbarActions,
  TopbarUser,
  PageContainer,
  PageHeader,
  PageSection,
  DashboardGrid,
  DashboardContent,
  DashboardHeader,
  Breadcrumbs,
  WorkspaceSwitcher,
  TenantBadge,
} from '@/components/layout'
```

## 🎓 Full Documentation

See `LAYOUT_SYSTEM.md` for comprehensive documentation including:
- Detailed component props
- Architecture diagrams
- Design system integration
- Accessibility guidelines
- Best practices

---

**Status**: ✅ Production Ready
**Version**: 1.0.0
**Last Updated**: 2024
