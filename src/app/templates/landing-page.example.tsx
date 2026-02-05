/**
 * LANDING PAGE TEMPLATE
 * 
 * Optimized for conversion and marketing
 * - Hero section with CTA
 * - Features showcase
 * - Testimonials
 * - Pricing comparison
 * - FAQ section
 * - Final CTA
 */

'use client';

import React from 'react';
import {
  Section,
  Grid,
  VStack,
  HStack,
  Card,
  Button,
  Text,
  Badge,
} from '@/components';
import { useMobile } from '@/hooks';
import { Check, Star, Quote } from 'lucide-react';

export default function LandingPage() {
  const isMobile = useMobile();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Section
        variant="gradient"
        padding="xl"
        fullHeight
        centered
        maxWidth="lg"
      >
        <VStack gap="lg" align="center">
          <Badge variant="primary">Launch Your Product</Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white text-center">
            Build Faster.
            <br />
            Scale Bigger.
          </h1>

          <p className="text-xl text-slate-300 max-w-2xl text-center">
            Enterprise-grade design system and components to ship production apps in days, not months.
          </p>

          <HStack gap="md">
            <Button variant="primary" size="lg">
              Start Free
            </Button>
            <Button variant="outline" size="lg">
              Watch Demo
            </Button>
          </HStack>

          <div className="pt-8 text-center text-slate-300">
            <p className="text-sm">No credit card required. Start building in minutes.</p>
          </div>
        </VStack>
      </Section>

      {/* Features Section */}
      <Section
        title="Powerful Features"
        subtitle="Everything you need for production"
        maxWidth="xl"
      >
        <Grid columns={isMobile ? 1 : 3} gap="lg">
          {[
            {
              title: 'Component Library',
              desc: '50+ pre-built components with multiple variants',
              icon: '⚡',
            },
            {
              title: 'Type Safe',
              desc: 'Full TypeScript support with perfect type inference',
              icon: '🛡️',
            },
            {
              title: 'Responsive',
              desc: 'Mobile-first design with automatic responsive behavior',
              icon: '📱',
            },
            {
              title: 'Accessible',
              desc: 'WCAG 2.1 compliant with built-in a11y features',
              icon: '♿',
            },
            {
              title: 'Dark Mode',
              desc: 'Automatic light/dark theme with system preference',
              icon: '🌙',
            },
            {
              title: 'Performance',
              desc: 'Code splitting, lazy loading, caching out of the box',
              icon: '🚀',
            },
          ].map((feature, idx) => (
            <Card key={idx} variant="elevated">
              <VStack gap="md">
                <div className="text-4xl">{feature.icon}</div>
                <Text weight="bold" size="lg">
                  {feature.title}
                </Text>
                <Text className="text-slate-600 dark:text-slate-400">
                  {feature.desc}
                </Text>
              </VStack>
            </Card>
          ))}
        </Grid>
      </Section>

      {/* Testimonials Section */}
      <Section
        variant="alt"
        title="Loved by Developers"
        subtitle="See what teams are building"
        maxWidth="lg"
      >
        <Grid columns={isMobile ? 1 : 2} gap="lg">
          {[
            {
              name: 'Sarah Chen',
              role: 'CTO at TechCorp',
              text: 'We shipped our entire product redesign in 3 weeks using this system.',
              avatar: '👩‍💼',
              rating: 5,
            },
            {
              name: 'Marcus Johnson',
              role: 'Founder at StartupIO',
              text: 'Best decision we made. Improved our dev velocity by 10x.',
              avatar: '👨‍💼',
              rating: 5,
            },
            {
              name: 'Emily Rodriguez',
              role: 'Product Lead at Enterprise',
              text: 'Finally a design system that actually works and scales.',
              avatar: '👩‍🔬',
              rating: 5,
            },
            {
              name: 'David Lee',
              role: 'Engineer at FintechCo',
              text: 'The documentation is incredible. Made onboarding so easy.',
              avatar: '👨‍💻',
              rating: 5,
            },
          ].map((testimonial, idx) => (
            <Card key={idx} variant="elevated">
              <VStack gap="md">
                <div className="flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <Quote className="w-5 h-5 text-slate-400 opacity-50" />

                <Text className="italic">"{testimonial.text}"</Text>

                <VStack gap="xs" className="pt-4 border-t border-slate-200 dark:border-slate-700">
                  <Text weight="bold" size="sm">
                    {testimonial.name}
                  </Text>
                  <Text size="xs" className="text-slate-600 dark:text-slate-400">
                    {testimonial.role}
                  </Text>
                </VStack>
              </VStack>
            </Card>
          ))}
        </Grid>
      </Section>

      {/* Pricing Section */}
      <Section
        title="Simple, Transparent Pricing"
        subtitle="Choose the plan that fits your needs"
        maxWidth="xl"
      >
        <Grid columns={isMobile ? 1 : 3} gap="lg">
          {[
            {
              name: 'Starter',
              price: '$29',
              period: '/month',
              features: [
                'Component library',
                'Docs & support',
                'Up to 5 projects',
              ],
              highlight: false,
            },
            {
              name: 'Professional',
              price: '$99',
              period: '/month',
              features: [
                'Everything in Starter',
                'Priority support',
                'Unlimited projects',
                'Custom themes',
              ],
              highlight: true,
            },
            {
              name: 'Enterprise',
              price: 'Custom',
              period: 'contact sales',
              features: [
                'Everything in Professional',
                'SLA guarantee',
                'Dedicated support',
                'Custom integrations',
              ],
              highlight: false,
            },
          ].map((plan, idx) => (
            <Card
              key={idx}
              variant={plan.highlight ? 'primary' : 'elevated'}
              className={plan.highlight ? 'scale-105' : ''}
            >
              <VStack gap="lg">
                <div>
                  <Text weight="bold" size="xl">
                    {plan.name}
                  </Text>
                  <div className="flex items-baseline gap-2 mt-2">
                    <Text size="3xl" weight="bold">
                      {plan.price}
                    </Text>
                    <Text className="text-slate-600 dark:text-slate-400">
                      {plan.period}
                    </Text>
                  </div>
                </div>

                <VStack gap="sm">
                  {plan.features.map((feature, featureIdx) => (
                    <HStack key={featureIdx} gap="sm">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <Text size="sm">{feature}</Text>
                    </HStack>
                  ))}
                </VStack>

                <Button
                  variant={plan.highlight ? 'primary' : 'outline'}
                  fullWidth
                >
                  Get Started
                </Button>
              </VStack>
            </Card>
          ))}
        </Grid>
      </Section>

      {/* FAQ Section */}
      <Section
        variant="alt"
        title="Frequently Asked Questions"
        maxWidth="md"
      >
        <VStack gap="lg">
          {[
            {
              q: 'Can I use this for commercial projects?',
              a: 'Yes, all licenses include commercial use rights.',
            },
            {
              q: 'Is TypeScript required?',
              a: 'No, you can use JavaScript, but TypeScript is recommended.',
            },
            {
              q: 'What about accessibility?',
              a: 'All components are WCAG 2.1 AA compliant.',
            },
            {
              q: 'Can I customize the theme?',
              a: 'Yes, full theming via CSS variables and Tailwind.',
            },
          ].map((faq, idx) => (
            <Card key={idx} variant="outline">
              <VStack gap="md">
                <Text weight="bold" size="lg">
                  {faq.q}
                </Text>
                <Text className="text-slate-600 dark:text-slate-400">
                  {faq.a}
                </Text>
              </VStack>
            </Card>
          ))}
        </VStack>
      </Section>

      {/* Final CTA */}
      <Section
        variant="gradient"
        padding="lg"
        centered
        maxWidth="lg"
      >
        <VStack gap="lg" align="center">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center">
            Ready to build something amazing?
          </h2>
          
          <p className="text-xl text-slate-300">
            Join thousands of developers shipping faster.
          </p>

          <Button variant="primary" size="lg">
            Start Building Free
          </Button>
        </VStack>
      </Section>
    </div>
  );
}
