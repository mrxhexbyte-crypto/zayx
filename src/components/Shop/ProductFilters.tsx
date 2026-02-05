'use client';

import { useState } from 'react';
import { ChevronDown, X } from 'lucide-react';
import { APP_CONFIG } from '@/config';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

interface ProductFiltersProps {
  onFilterChange: (filters: any) => void;
}

export function ProductFilters({ onFilterChange }: ProductFiltersProps) {
  const [filters, setFilters] = useState({
    category: '',
    minPrice: 0,
    maxPrice: 5000,
    rating: 0,
  });

  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    category: true,
    price: true,
    rating: true,
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleCategoryChange = (category: string) => {
    const newFilters = { ...filters, category: filters.category === category ? '' : category };
    handleFilterChange(newFilters);
  };

  const handlePriceChange = (type: 'min' | 'max', value: number) => {
    handleFilterChange({
      ...filters,
      [type === 'min' ? 'minPrice' : 'maxPrice']: value,
    });
  };

  return (
    <div className="space-y-6">
      {/* Categories */}
      <Card className="p-4 bg-gradient-to-b from-slate-800 to-slate-900 border border-white/10 hover:border-cyan-400/50 transition-all">
        <button
          onClick={() => toggleSection('category')}
          className="flex items-center justify-between w-full font-semibold mb-4 text-white hover:text-cyan-400 transition-colors"
        >
          Categories
          <motion.div
            animate={{ rotate: expandedSections.category ? 0 : -90 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </button>

        {expandedSections.category && (
          <div className="space-y-2">
            {APP_CONFIG.categories.map(cat => (
              <label key={cat.id} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.category === cat.id}
                  onChange={() => handleCategoryChange(cat.id)}
                  className="w-4 h-4 rounded"
                />
                <span className="text-sm">{cat.label}</span>
              </label>
            ))}
          </div>
        )}
      </Card>

      {/* Price Range */}
      <Card className="p-4 bg-gradient-to-b from-slate-800 to-slate-900 border border-white/10 hover:border-cyan-400/50 transition-all">
        <button
          onClick={() => toggleSection('price')}
          className="flex items-center justify-between w-full font-semibold mb-4 text-white hover:text-cyan-400 transition-colors"
        >
          Price Range
          <motion.div
            animate={{ rotate: expandedSections.price ? 0 : -90 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </button>

        {expandedSections.price && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-2">Min: ${filters.minPrice}</label>
              <Input
                type="range"
                min="0"
                max="5000"
                value={filters.minPrice}
                onChange={(e) => handlePriceChange('min', parseInt(e.target.value))}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">Max: ${filters.maxPrice}</label>
              <Input
                type="range"
                min="0"
                max="5000"
                value={filters.maxPrice}
                onChange={(e) => handlePriceChange('max', parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        )}
      </Card>

      {/* Clear Filters */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          variant="outline"
          onClick={() => {
            const defaultFilters = { category: '', minPrice: 0, maxPrice: 5000, rating: 0 };
            setFilters(defaultFilters);
            handleFilterChange(defaultFilters);
          }}
          className="w-full border-cyan-400/50 text-cyan-400 hover:bg-cyan-500/20 hover:border-cyan-400 font-semibold"
        >
          <X className="w-4 h-4 mr-2" />
          Clear Filters
        </Button>
      </motion.div>
    </div>
  );
}
