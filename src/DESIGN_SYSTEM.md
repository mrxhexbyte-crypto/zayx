# Enterprise Design System

A production-ready, type-safe design system built with React, TypeScript, Tailwind CSS, and Radix UI.

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                      PAGES                               │
│                   (Composition)                          │
└──────────────────────┬──────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────┐
│                    ORGANISMS                             │
│        (Complex Features, Error Boundaries,             │
│         Forms, Headers, etc.)                           │
└──────────────────────┬──────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────┐
│                    MOLECULES                             │
│      (Card, Button, Badge, Input, Section, etc.)        │
└──────────────────────┬──────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────┐
│                    PRIMITIVES                            │
│     (Box, Flex, Grid, Stack, VStack, HStack, Text)      │
└──────────────────────┬──────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────┐
│              DESIGN TOKENS & CSS                         │
│    (Colors, Typography, Spacing, Shadows, etc.)         │
└─────────────────────────────────────────────────────────┘
```

## 📦 Component Hierarchy

### 1. Primitives
Low-level, flexible building blocks for layout.

```typescript
// Box: Basic container with all layout props
<Box padding="4" bgColor="white" borderRadius="lg">
  Content
</Box>

// Flex: Flexbox layout with semantic props
<Flex justify="space-between" align="center" gap="md">
  <div>Left</div>
  <div>Right</div>
</Flex>

// Grid: CSS Grid layout
<Grid columns={3} gap="lg">
  {items.map(item => <div key={item.id}>{item}</div>)}
</Grid>

// Stack variants: VStack (column) and HStack (row)
<VStack gap="lg">
  <h1>Title</h1>
  <p>Description</p>
</VStack>

// Text: Typography with semantic variants
<Text as="h1" size="4xl" weight="bold">
  Heading
</Text>
```

### 2. Molecules
Reusable components built from primitives.

```typescript
// Button with 10+ variants
<Button variant="primary" size="lg" loading={isLoading}>
  Submit
</Button>

// Card with header, content, footer
<Card header="Title" variant="elevated">
  Card content
</Card>

// Input with validation and icons
<Input
  label="Email"
  type="email"
  error={errors.email}
  icon={<Mail />}
/>

// Badge with removable option
<Badge variant="primary" onRemove={handleRemove}>
  Tag
</Badge>

// Section for page sections
<Section title="Features" subtitle="Our capabilities">
  Content
</Section>
```

### 3. Organisms
Complex features and patterns.

```typescript
// ErrorBoundary for error handling
<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>

// Loading skeletons
<Skeleton variant="card" />
<SkeletonTable rows={5} columns={4} />

// Type-safe forms
<Form onSubmit={handleSubmit}>
  <FormField name="email" label="Email" required />
  <FormField name="password" label="Password" type="password" required />
  <FormActions submitText="Login" />
</Form>

// Responsive header
<ResponsiveHeader
  title="App"
  links={[
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
  ]}
  withThemeToggle
/>
```

## 🎨 Design Tokens

All design decisions are encoded as tokens in `src/lib/design-tokens.ts`:

### Colors
- **Brand**: Primary, secondary, accent
- **Semantic**: Success, warning, error, info
- **Neutral**: 11 shades for text, backgrounds, borders
- **Neon**: Futuristic glow effects

### Spacing
8-based scale: 0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32 px

### Typography
- **Font families**: Base, mono, display
- **Sizes**: xs to 7xl
- **Weights**: 300 to 800
- **Line heights**: Tight to loose

### Shadows
- **Elevation levels**: 1-5 for layered design
- **Glows**: Cyan, magenta, purple neon effects

### Transitions
- **Speeds**: Fast (150ms) to slower (500ms)
- **Timing functions**: Multiple easing options

## 🔧 State Management

Using Zustand with slice pattern:

```typescript
// Use individual slices for better performance
const { user, setUser, logout } = useUser();
const { theme, setTheme, toggleTheme } = useUI();
const { initialized, error, setInitialized } = useApp();

// Or use root store for all state
const allState = useRootStore();
```

## 🎯 Theming

Automatic light/dark/system theme support:

```typescript
// In your layout
import { ThemeProvider } from '@/components/providers/ThemeProvider';

export default function Layout({ children }) {
  return (
    <ThemeProvider defaultTheme="auto">
      {children}
    </ThemeProvider>
  );
}

// Use theme in components
const { theme, toggleTheme, isDark } = useTheme();
```

## 📱 Responsive Design

Breakpoints: xs, sm, md, lg, xl, 2xl

```typescript
// Hook-based approach
const isMobile = useMobile();
const isTablet = useTablet();
const isDesktop = useDesktop();

const { breakpoint } = useBreakpoint(); // 'sm', 'md', etc.

// Render conditionally
{isMobile ? <MobileNav /> : <DesktopNav />}
```

## ⚡ Performance Optimizations

### Lazy Loading
```typescript
const { ref, isVisible } = useIntersectionObserver();
return <div ref={ref}>{isVisible && <ExpensiveComponent />}</div>;
```

### Debouncing & Throttling
```typescript
const debouncedSearch = useDebounce(handleSearch, 300);
const throttledScroll = useThrottle(handleScroll, 200);
```

### Caching
```typescript
const { getCache, setCache, clearCache } = useCacheStore('myData');

const data = getCache() || await fetchData();
setCache(data);
```

## 🛡️ Error Handling

### With Error Boundary
```typescript
<ErrorBoundary onError={(error) => logToSentry(error)}>
  <YourComponent />
</ErrorBoundary>
```

### Loading States
```typescript
const [isLoading, setIsLoading] = useState(false);

if (isLoading) return <Skeleton variant="card" />;
```

## 📝 Form Patterns

Type-safe forms with validation:

```typescript
<Form onSubmit={handleSubmit}>
  <FormGroup title="Personal Info" columns={2}>
    <FormField
      name="firstName"
      label="First Name"
      required
      validate={(value) => value.length > 2 || 'Min 2 characters'}
    />
    <FormField name="email" type="email" required />
  </FormGroup>
  
  <FormActions submitText="Save" loading={isLoading} />
</Form>
```

## 📚 Best Practices

### 1. Use Primitives First
Always start with primitives (Box, Flex, Grid) before creating molecules.

### 2. Keep Components Pure
Avoid prop drilling - use store hooks instead.

```typescript
// ❌ Bad: prop drilling
<Component user={user} isLoading={isLoading} onSubmit={handleSubmit} />

// ✅ Good: use hooks
function Component() {
  const { user } = useUser();
  const { showNotification } = useUI();
  // ...
}
```

### 3. Type Safety
Leverage TypeScript and VariantProps:

```typescript
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

const Button: React.FC<ButtonProps> = ({ variant, size, ...props }) => {
  // ...
};
```

### 4. Error Boundaries
Wrap high-risk components:

```typescript
<ErrorBoundary fallback={(error, reset) => (
  <div>
    <p>Error: {error.message}</p>
    <button onClick={reset}>Retry</button>
  </div>
)}>
  <YourComponent />
</ErrorBoundary>
```

### 5. Loading States
Always show skeleton while loading:

```typescript
if (isLoading) return <Skeleton variant="card" count={3} />;
return <YourComponent />;
```

## 🎭 Variants Pattern

All molecules support multiple variants via CVA:

```typescript
<Button variant="primary" /> // Blue solid
<Button variant="secondary" /> // Gray solid
<Button variant="outline" /> // Bordered
<Button variant="ghost" /> // Transparent
<Button variant="link" /> // Text only
```

## 🔄 Compound Components

Build complex components from simpler ones:

```typescript
// These compose naturally
<Card>
  <Card header="Title">
    <VStack gap="md">
      <Input label="Email" />
      <Button>Submit</Button>
    </VStack>
  </Card>
</Card>
```

## 🌙 Dark Mode

Automatic dark mode support via Tailwind:

```typescript
// Use dark: prefix
<Box className="bg-white dark:bg-slate-800">
  Content
</Box>

// Or use CSS variables
<Box className="bg-[var(--color-surface)]">
  Content
</Box>
```

## 📦 Importing

```typescript
// Individual imports
import { Button, Card, Input } from '@/components';
import { VStack, HStack, Grid } from '@/components/primitives';

// Or from specific directories
import { Button } from '@/components/molecules';
import { Box, Flex } from '@/components/primitives';

// Hooks
import { useBreakpoint, useMobile } from '@/hooks';
import { designTokens } from '@/lib/design-tokens';
```

## 🚀 Getting Started

1. Create a new page in `src/app`
2. Use `ResponsiveHeader` for navigation
3. Build layout with `Section`, `VStack`, `Grid`
4. Fill with `Card`, `Button`, `Input`, etc.
5. Wrap in `ErrorBoundary`
6. Test responsive with hooks

See `src/app/templates/enterprise-page.example.tsx` for a complete example.

## 📖 Documentation

- Design tokens: `src/lib/design-tokens.ts`
- Components: `src/components/`
- Hooks: `src/hooks/`
- Store: `src/store/root.store.ts`
- Example: `src/app/templates/enterprise-page.example.tsx`

---

Built with ❤️ for enterprise applications.
