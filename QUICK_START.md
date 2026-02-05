# Quick Start Guide

## ✅ Verification Checklist

Run these to verify your new enterprise design system is working:

### 1. Verify Installation
```bash
# Install any missing dependencies
npm install

# Type checking
npm run typecheck

# Linting
npm run lint
```

### 2. Start Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` - should work as before but with new system underneath.

### 3. Test Components
Create a test page to verify components work:

```typescript
// src/app/test-system/page.tsx
'use client';

import {
  Box,
  Flex,
  VStack,
  HStack,
  Grid,
  Text,
  Button,
  Card,
  Badge,
  Input,
  Section,
} from '@/components';
import { useMobile, useTheme } from '@/hooks';

export default function TestPage() {
  const isMobile = useMobile();
  const { theme, toggleTheme } = useTheme();

  return (
    <Section title="Component Test">
      <VStack gap="lg">
        <HStack gap="md">
          <Button onClick={toggleTheme}>
            Toggle Theme (Current: {theme})
          </Button>
          <Badge variant="primary">Working!</Badge>
        </HStack>

        <Grid columns={isMobile ? 1 : 3} gap="lg">
          <Card variant="elevated">
            <Text weight="bold">Card 1</Text>
            <p>Test content</p>
          </Card>
          <Card variant="primary">
            <Text weight="bold">Card 2</Text>
            <p>Test content</p>
          </Card>
          <Card variant="outline">
            <Text weight="bold">Card 3</Text>
            <p>Test content</p>
          </Card>
        </Grid>

        <Input label="Test Input" placeholder="Type here..." />
      </VStack>
    </Section>
  );
}
```

Then visit: `http://localhost:3000/test-system`

## 🎯 Common Tasks

### Create a New Page

```typescript
'use client';
import { Section, Grid, Card, Button, Text } from '@/components';

export default function MyPage() {
  return (
    <Section title="My Page" subtitle="Using enterprise system">
      <Grid columns={2} gap="lg">
        <Card variant="elevated">
          <Text weight="bold">Feature</Text>
          <p>Description</p>
          <Button>Action</Button>
        </Card>
      </Grid>
    </Section>
  );
}
```

### Add a Form

```typescript
import { Form, FormField, FormGroup, FormActions } from '@/components';

<Form onSubmit={handleSubmit}>
  <FormGroup title="Contact Info">
    <FormField name="email" label="Email" type="email" required />
    <FormField name="message" label="Message" />
  </FormGroup>
  <FormActions />
</Form>
```

### Use Theme

```typescript
import { useTheme } from '@/hooks';

const { theme, toggleTheme, isDark } = useTheme();
```

### Use State

```typescript
import { useUser, useUI } from '@/hooks';

const { user, setUser } = useUser();
const { showNotification } = useUI();
```

### Responsive Layout

```typescript
import { useMobile } from '@/hooks';
import { Grid } from '@/components';

const isMobile = useMobile();

<Grid columns={isMobile ? 1 : 3} gap="lg">
  {/* Cards */}
</Grid>
```

## 📚 Key Files to Know

| File | Purpose |
|------|---------|
| `src/lib/design-tokens.ts` | All design values |
| `src/app/globals.css` | CSS variables |
| `src/components/primitives/` | Layout blocks |
| `src/components/molecules/` | Common components |
| `src/components/organisms/` | Complex features |
| `src/store/root.store.ts` | Global state |
| `src/hooks/` | Custom hooks |
| `src/DESIGN_SYSTEM.md` | Full documentation |

## 🎨 Customize Colors

Edit CSS variables in `src/app/globals.css`:

```css
:root {
  --color-brand-primary: #2563eb;    /* Change brand blue */
  --color-brand-secondary: #7c3aed;  /* Change brand purple */
  --color-brand-accent: #06b6d4;     /* Change accent */
  
  /* Add more... */
}
```

## 🌙 Theme Support

Automatic light/dark mode - no code needed! Uses system preference.

```typescript
// In layout.tsx, add:
import { ThemeProvider } from '@/components/providers/ThemeProvider';

<ThemeProvider defaultTheme="auto">
  {children}
</ThemeProvider>
```

## 📱 Responsive First

All components work on mobile. Use hooks for conditional rendering:

```typescript
const isMobile = useMobile();
const { breakpoint } = useBreakpoint();

if (isMobile) {
  return <MobileLayout />;
}
```

## 🚀 Build & Deploy

```bash
# Build for production
npm run build

# Test production build
npm start

# Deploy to Vercel
# (Just push to GitHub, Vercel deploys automatically)
```

## 🆘 Troubleshooting

### Components not showing?
1. Check import path: `import { Button } from '@/components'`
2. Add `'use client'` for client components
3. Check TypeScript: `npm run typecheck`

### Styles not applying?
1. Verify Tailwind in `tailwind.config.js`
2. Check globals.css is imported in layout
3. Rebuild: `npm run dev`

### TypeScript errors?
1. Run `npm run typecheck`
2. Verify import paths
3. Check React/TypeScript versions match

## 📖 Documentation

- **Design System**: `src/DESIGN_SYSTEM.md`
- **Full Summary**: `TRANSFORMATION_SUMMARY.md`
- **Templates**: `src/app/templates/`

## 🎁 What's Included

✅ 50+ production-ready components
✅ Complete design system
✅ State management (Zustand)
✅ Type safety (TypeScript)
✅ Responsive design
✅ Dark mode
✅ Error handling
✅ Performance optimization
✅ 3 page templates

## 💡 Pro Tips

1. **Always use primitives as base** - VStack, HStack, Grid
2. **Avoid prop drilling** - Use store hooks instead
3. **Keep components small** - Easier to test
4. **Use design tokens** - Never hardcode colors/sizes
5. **Test on mobile** - Use `useMobile()` hook
6. **Check dark mode** - Use DevTools to toggle
7. **Review templates** - Copy patterns from examples

## 🎯 Next Steps

1. ✅ Verify system works (run test page above)
2. ✅ Review `src/DESIGN_SYSTEM.md`
3. ✅ Check page templates in `src/app/templates/`
4. ✅ Build your first page using the system
5. ✅ Deploy to Vercel
6. ✅ Celebrate! 🎉

## ❓ Questions?

1. Check `src/DESIGN_SYSTEM.md` - comprehensive guide
2. Review templates - see examples
3. Check component code - well commented
4. Look at hooks - easy to understand

---

**You're all set! Start building amazing features with your new enterprise design system!**

⚡ Fast development • 🎨 Beautiful design • 🛡️ Type safe • 📱 Responsive
