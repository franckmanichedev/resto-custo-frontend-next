# Application Shell - Layout System Documentation

## Overview

Complete enterprise-grade SaaS layout system for FETCHOUN platform, built with React + TypeScript + TailwindCSS with full FETCHOUN Design System token integration.

## Architecture

### 1. Main Container: `AppShell.tsx`

The root layout component that orchestrates the entire application layout with responsive desktop/mobile support.

**Features:**
- Desktop: Fixed left sidebar + sticky topbar + scrollable content
- Mobile: Drawer sidebar + compact topbar
- State management for sidebar collapse/expand
- Controlled/uncontrolled component patterns

**Props:**
```typescript
type AppShellProps = {
  children: ReactNode
  sidebarOpen?: boolean
  onSidebarChange?: (open: boolean) => void
}
```

**Usage:**
```jsx
<AppShell>
  <YourPageContent />
</AppShell>
```

### 2. Sidebar Components

#### `Sidebar.tsx` - Desktop Sidebar
Wrapper component for desktop sidebar with collapse button.

**Features:**
- Uses `DashboardSidebar` for navigation items
- Collapse/expand toggle button
- Fixed positioning on desktop (z-40)
- Smooth transitions

**Props:**
```typescript
type SidebarProps = {
  collapsed?: boolean
  onCollapse?: (collapsed: boolean) => void
}
```

#### `MobileSidebar.tsx` - Mobile Drawer
Full-screen drawer overlay for mobile navigation.

**Features:**
- Shows when mobile menu toggled
- Close button
- Click-outside to close
- Full navigation hierarchy

#### `DashboardSidebar.tsx` - Navigation Content
Shared navigation content for both desktop and mobile sidebars.

**Structure:**
- Logo section with FETCHOUN branding
- Main navigation sections (Dashboard, Management, Team)
- Bottom navigation (Help, Settings, Logout)

**Navigation Items:**
- Analytics (Dashboard)
- Restaurants, QR Codes, Menus (Management)
- Staff (Team)
- Help, Settings, Logout (Bottom)

### 3. Topbar Components

#### `Topbar.tsx` - Sticky Header
Main topbar containing all header elements.

**Features:**
- Sticky positioning (z-30)
- Responsive design
- Full height 64px (--navbar-height)
- Grid layout: left (search) + right (actions/user)

**Props:**
```typescript
type TopbarProps = {
  onSidebarToggle?: () => void
  onMobileMenuToggle?: () => void
  onSearch?: (query: string) => void
  onNotifications?: () => void
  onSettings?: () => void
  onUserMenu?: () => void
  userName?: string
  userAvatar?: string
}
```

#### `TopbarSearch.tsx` - Search Bar
Global search input with icon.

**Features:**
- Hidden on mobile (sm breakpoint)
- Search icon with live input
- Max width constrained
- Semantic token styling

#### `TopbarActions.tsx` - Notifications & Settings
Quick action buttons in topbar.

**Actions:**
- Notifications (with badge indicator)
- Settings

#### `TopbarUser.tsx` - User Profile Menu
User avatar/profile dropdown trigger.

**Features:**
- Avatar display (initials or image)
- User name (hidden on mobile)
- Chevron dropdown indicator

### 4. Page Components

#### `PageContainer.tsx` - Content Max-Width Wrapper
Constrains page content with responsive padding and max-width.

**Props:**
```typescript
type PageContainerProps = {
  children: ReactNode
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  className?: string
}
```

**Max-Width Values:**
- `sm`: 36rem (2xl)
- `md`: 56rem (4xl)
- `lg`: 72rem (6xl)
- `xl`: 80rem (7xl)
- `2xl`: 96rem (screen-2xl)
- `full`: unlimited

#### `PageHeader.tsx` - Page Title Section
Handles page heading, subtitle, breadcrumbs, and actions.

**Props:**
```typescript
type PageHeaderProps = {
  title: string
  subtitle?: string
  description?: string
  actions?: ReactNode
  breadcrumbs?: Array<{ label: string; href?: string }>
}
```

**Features:**
- Large responsive heading (48px on desktop)
- Optional subtitle and description
- Breadcrumb navigation
- Right-aligned action buttons

#### `PageSection.tsx` - Section Grouping
Groups content into logical sections with optional titles.

**Props:**
```typescript
type PageSectionProps = {
  children: ReactNode
  title?: string
  description?: string
  className?: string
}
```

#### `DashboardGrid.tsx` - Responsive Grid
Multi-column responsive grid layout for dashboard content.

**Props:**
```typescript
type DashboardGridProps = {
  children: ReactNode
  cols?: 1 | 2 | 3 | 4
  gap?: 'sm' | 'md' | 'lg'
  className?: string
}
```

**Column Configurations:**
- `1`: Single column
- `2`: 1 col (mobile), 2 cols (sm+)
- `3`: 1 col (mobile), 2 cols (sm), 3 cols (lg)
- `4`: 1 col (mobile), 2 cols (sm), 4 cols (lg)

**Gap Values:**
- `sm`: 12px (mobile) / 16px (tablet)
- `md`: 16px (mobile) / 24px (tablet) - default
- `lg`: 24px (mobile) / 32px (tablet)

#### `DashboardContent.tsx` - Main Content Wrapper
Card-style content container with padding options.

**Props:**
```typescript
type DashboardContentProps = {
  children: ReactNode
  className?: string
  padding?: 'none' | 'sm' | 'md' | 'lg'
}
```

#### `DashboardHeader.tsx` - Section Header
Flexible header for dashboard sections.

**Props:**
```typescript
type DashboardHeaderProps = {
  title?: string
  subtitle?: string
  actions?: ReactNode
  onOpen?: () => void
  className?: string
}
```

#### `Breadcrumbs.tsx` - Navigation Breadcrumbs
Shows current location in site hierarchy.

**Props:**
```typescript
type BreadcrumbsProps = {
  items: Array<{ label: string; href?: string; onClick?: () => void }>
  className?: string
}
```

### 5. Workspace/Tenant Components

#### `WorkspaceSwitcher.tsx` - Workspace Selection
Dropdown for switching between workspaces/organizations.

**Props:**
```typescript
type WorkspaceSwitcherProps = {
  currentWorkspace: Workspace
  workspaces: Workspace[]
  onSwitch?: (workspace: Workspace) => void
}

type Workspace = {
  id: string
  name: string
  logo?: string
}
```

#### `TenantBadge.tsx` - Tenant/Organization Indicator
Displays current tenant information.

**Props:**
```typescript
type TenantBadgeProps = {
  name?: string
  logo?: string
  size?: 'sm' | 'md' | 'lg'
}
```

## Design System Integration

All layout components use FETCHOUN Design System tokens:

### Colors
- `bg-app`: Main background
- `bg-surface`: Card surfaces
- `bg-elevated`: Hover states
- `text-foreground`: Primary text
- `text-muted-foreground`: Secondary text
- `border-border`: Divider/borders
- `shadow-soft`, `shadow-card`, `shadow-floating`: Depth

### Spacing
- `px-4 sm:px-6 lg:px-8`: Responsive horizontal padding
- `py-6 sm:py-8`: Responsive vertical padding
- `gap-2`, `gap-3`, `gap-4`: Consistent spacing

### Border Radius
- `rounded-card`: Card radius (8px)
- `rounded-md`: Button/input radius (6px)

### Typography
- `text-foreground`: Primary color
- `text-muted-foreground`: Secondary color
- Font weights: `font-semibold`, `font-medium`, `font-bold`

### Height Tokens
- `h-navbar`: 64px
- `h-input`: 40px
- `h-button-md`: 40px

### Width Tokens
- `w-sidebar`: 288px (18rem)
- `w-sidebar-collapsed`: 80px (5rem)

### Z-Index
- `z-40`: Sidebar
- `z-30`: Topbar
- `z-50`: Modal
- `z-55`: Popover
- `z-60`: Tooltip/Notifications

## Responsive Breakpoints

All components are fully responsive:

- **Mobile First**: Base styles for mobile
- **sm (640px)**: Tablet sizing and transitions
- **md (768px)**: iPad/small desktop
- **lg (1024px)**: Desktop (sidebar visible)

**Key Breakpoint Usage:**
```jsx
hidden sm:flex          // Hide on mobile, show on sm+
hidden lg:flex          // Hide on mobile/tablet, show on lg+
w-full sm:w-1/2         // Full width mobile, half width sm+
p-4 sm:p-6 lg:p-8       // Responsive padding
```

## Layout Variants

### Full Page Layout
```jsx
<AppShell>
  <PageContainer>
    <PageHeader
      title="Page Title"
      breadcrumbs={[...]}
      actions={<Button>Action</Button>}
    />
    <PageSection title="Section">
      {/* Content */}
    </PageSection>
  </PageContainer>
</AppShell>
```

### Grid Dashboard Layout
```jsx
<AppShell>
  <PageContainer>
    <DashboardGrid cols={3} gap="md">
      <Card>Item 1</Card>
      <Card>Item 2</Card>
      <Card>Item 3</Card>
    </DashboardGrid>
  </PageContainer>
</AppShell>
```

### With Workspace Switcher
```jsx
<Topbar>
  <WorkspaceSwitcher
    currentWorkspace={workspace}
    workspaces={allWorkspaces}
    onSwitch={switchWorkspace}
  />
</Topbar>
```

## Composition Pattern

All layout components follow composition pattern:

```jsx
<AppShell>
  <PageContainer maxWidth="lg">
    <PageHeader 
      title="Page Title"
      actions={<Button>Action</Button>}
    />
    
    <PageSection title="Section 1">
      <DashboardContent>
        {/* Cards or content */}
      </DashboardContent>
    </PageSection>

    <PageSection title="Section 2">
      <DashboardGrid cols={3}>
        {/* Grid items */}
      </DashboardGrid>
    </PageSection>
  </PageContainer>
</AppShell>
```

## Export Summary

All layout components are exported from `src/components/layout/index.ts`:

```typescript
export { AppShell }
export { Sidebar, MobileSidebar }
export { Topbar, TopbarSearch, TopbarActions, TopbarUser }
export { PageContainer, PageHeader, PageSection, DashboardGrid }
export { DashboardContent, DashboardHeader, DashboardSidebar }
export { Breadcrumbs, WorkspaceSwitcher, TenantBadge }
```

## Best Practices

1. **Always use PageContainer** for consistent max-width and padding
2. **Use PageHeader** for page titles with automatic breadcrumbs
3. **Use PageSection** to group related content
4. **Use DashboardGrid** for multi-column layouts (never hardcode columns)
5. **Use semantic tokens** instead of arbitrary values
6. **Use cn()** for conditional classes
7. **Test responsive behavior** at all breakpoints
8. **Follow accessibility** patterns (ARIA labels, semantic HTML)

## Status

✅ **Phase 4: Application Shell** - COMPLETE

All layout components:
- ✅ Token-driven architecture
- ✅ Fully responsive (mobile-first)
- ✅ Dark mode support
- ✅ Accessibility ready
- ✅ TypeScript strict mode
- ✅ Enterprise-ready

Next Phase: Integration with existing routes and business logic
