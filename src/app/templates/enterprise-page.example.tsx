/**
 * ENTERPRISE PAGE TEMPLATE EXAMPLE
 * 
 * This file demonstrates how to build a page using the enterprise design system.
 * Copy this pattern for new pages in your application.
 * 
 * Key patterns:
 * - Uses primitives for layout (VStack, HStack, Grid, etc)
 * - Uses molecules for common components (Button, Card, Input, etc)
 * - Uses organisms for complex sections (Section, Form, etc)
 * - Implements error boundary for error handling
 * - Uses responsive hooks for adaptive layouts
 * - Implements loading states with skeletons
 * - Type-safe throughout
 */

'use client';

import React, { useState } from 'react';
import {
  // Primitives
  Box,
  VStack,
  HStack,
  Grid,
  Text,
  Flex,
  // Molecules
  Button,
  Card,
  Badge,
  Section,
  Input,
  // Organisms
  ResponsiveHeader,
  Form,
  FormField,
  FormGroup,
  FormActions,
  ErrorBoundary,
  Skeleton,
} from '@/components';
import { useBreakpoint, useMobile } from '@/hooks';
import { Zap, Award, Shield } from 'lucide-react';

// ==================== PAGE COMPONENT ====================

export default function EnterprisePage() {
  const isMobile = useMobile();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-white dark:bg-slate-900">
        {/* Header */}
        <ResponsiveHeader
          title="Enterprise"
          links={[
            { label: 'Features', href: '#features' },
            { label: 'Pricing', href: '#pricing' },
            { label: 'Docs', href: '#docs' },
          ]}
          withThemeToggle
        />

        <main className="flex-1">
          {/* Hero Section */}
          <Section
            variant="gradient"
            padding="lg"
            fullHeight
            maxWidth="xl"
            centered
            title="Build Enterprise-Grade Apps"
            subtitle="Using our advanced design system and component library"
          >
            <VStack gap="lg" className="pt-12">
              <HStack gap="md" className="flex-wrap justify-center">
                <Button variant="primary" size="lg">
                  Get Started
                </Button>
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </HStack>

              {/* Trust Section */}
              <Grid
                columns={isMobile ? 1 : 3}
                gap="lg"
                className="max-w-2xl w-full mx-auto pt-8"
              >
                {[
                  {
                    icon: Zap,
                    label: 'Lightning Fast',
                    desc: 'Optimized performance',
                  },
                  {
                    icon: Shield,
                    label: 'Secure',
                    desc: 'Enterprise security',
                  },
                  {
                    icon: Award,
                    label: 'Reliable',
                    desc: '99.9% uptime SLA',
                  },
                ].map((item, idx) => (
                  <Box
                    key={idx}
                    className="text-center text-white"
                  >
                    <item.icon className="w-8 h-8 mx-auto mb-3 opacity-80" />
                    <Text size="lg" weight="semibold" className="mb-1">
                      {item.label}
                    </Text>
                    <Text size="sm" className="opacity-70">
                      {item.desc}
                    </Text>
                  </Box>
                ))}
              </Grid>
            </VStack>
          </Section>

          {/* Features Section */}
          <Section
            id="features"
            title="Components & Features"
            subtitle="Everything you need for production apps"
            maxWidth="xl"
          >
            <Grid columns={isMobile ? 1 : 2} gap="lg">
              {/* Primitives */}
              <Card variant="elevated">
                <VStack gap="md">
                  <Badge variant="primary">Primitives</Badge>
                  <Text weight="bold" size="lg">
                    Layout Foundation
                  </Text>
                  <Text className="text-slate-600 dark:text-slate-400">
                    Box, Flex, Grid, Stack, VStack, HStack for building any layout
                  </Text>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-500" />
                      Type-safe props
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-500" />
                      Design token integration
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-500" />
                      Responsive by default
                    </li>
                  </ul>
                </VStack>
              </Card>

              {/* Molecules */}
              <Card variant="elevated">
                <VStack gap="md">
                  <Badge variant="secondary">Molecules</Badge>
                  <Text weight="bold" size="lg">
                    Common Components
                  </Text>
                  <Text className="text-slate-600 dark:text-slate-400">
                    Pre-built components with variants for quick development
                  </Text>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-purple-500" />
                      Button (10+ variants)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-purple-500" />
                      Card, Input, Badge, Section
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-purple-500" />
                      Fully customizable
                    </li>
                  </ul>
                </VStack>
              </Card>

              {/* Organisms */}
              <Card variant="elevated">
                <VStack gap="md">
                  <Badge variant="accent">Organisms</Badge>
                  <Text weight="bold" size="lg">
                    Complex Patterns
                  </Text>
                  <Text className="text-slate-600 dark:text-slate-400">
                    High-level components for complete features
                  </Text>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-cyan-500" />
                      ErrorBoundary
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-cyan-500" />
                      Form system with validation
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-cyan-500" />
                      ResponsiveHeader, Skeleton
                    </li>
                  </ul>
                </VStack>
              </Card>

              {/* State Management */}
              <Card variant="elevated">
                <VStack gap="md">
                  <Badge variant="success">State</Badge>
                  <Text weight="bold" size="lg">
                    Advanced Store
                  </Text>
                  <Text className="text-slate-600 dark:text-slate-400">
                    Zustand-based store with slices and hooks
                  </Text>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500" />
                      useUI, useUser, useApp
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500" />
                      Persist middleware
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500" />
                      Type-safe slices
                    </li>
                  </ul>
                </VStack>
              </Card>
            </Grid>
          </Section>

          {/* Form Example Section */}
          <Section
            variant="alt"
            title="Form Example"
            subtitle="Type-safe forms with validation"
            maxWidth="md"
          >
            <Card>
              <Form
                onSubmit={(data) => {
                  console.log('Form data:', data);
                  setIsLoading(true);
                  setTimeout(() => setIsLoading(false), 2000);
                }}
              >
                <FormGroup
                  title="Personal Information"
                  description="Enter your details below"
                  columns={isMobile ? 1 : 2}
                >
                  <FormField
                    name="firstName"
                    label="First Name"
                    placeholder="John"
                    required
                  />
                  <FormField
                    name="lastName"
                    label="Last Name"
                    placeholder="Doe"
                    required
                  />
                </FormGroup>

                <FormGroup
                  title="Contact"
                  columns={1}
                >
                  <FormField
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="john@example.com"
                    required
                  />
                  <FormField
                    name="message"
                    label="Message"
                    placeholder="Your message..."
                  />
                </FormGroup>

                <FormActions submitText="Submit" loading={isLoading} />
              </Form>
            </Card>
          </Section>

          {/* Loading State Example */}
          <Section
            title="Loading States"
            subtitle="Use skeletons for better UX"
            maxWidth="lg"
          >
            <Grid columns={isMobile ? 1 : 2} gap="lg">
              <Box>
                <Text weight="bold" className="mb-4">
                  Card Skeleton
                </Text>
                <Skeleton variant="card" />
              </Box>
              <Box>
                <Text weight="bold" className="mb-4">
                  Table Skeleton
                </Text>
                <Skeleton variant="text" count={3} />
              </Box>
            </Grid>
          </Section>
        </main>
      </div>
    </ErrorBoundary>
  );
}

/**
 * ==================== USAGE GUIDE ====================
 * 
 * This template demonstrates:
 * 
 * 1. STRUCTURE
 *    - ErrorBoundary wraps entire page for error handling
 *    - ResponsiveHeader for navigation
 *    - Section components for content organization
 *    - Proper semantic HTML with Text component
 * 
 * 2. RESPONSIVE DESIGN
 *    - useMobile hook for mobile-first decisions
 *    - Grid columns adjust based on screen size
 *    - HStack/VStack for flexible layouts
 * 
 * 3. STATE MANAGEMENT
 *    - Local state with useState for UI
 *    - Global state via useUI, useUser hooks
 *    - Form validation with react-hook-form
 * 
 * 4. COMPONENT HIERARCHY
 *    - Primitives: Layout building blocks
 *    - Molecules: Common components with variants
 *    - Organisms: Complex features
 *    - Pages: Composition of organisms
 * 
 * 5. STYLING
 *    - Tailwind CSS for utilities
 *    - Design tokens for consistency
 *    - CSS variables for theming
 * 
 * FOLLOW THIS PATTERN FOR ALL NEW PAGES
 */
