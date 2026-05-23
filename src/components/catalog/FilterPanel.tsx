"use client";

import { useState } from "react";
import { ChevronDown, X, SlidersHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { FilterState, SortOption } from "@/types/product";

interface Props {
  productTypes: string[];
  tags: string[];
  vendors: string[];
  filters: FilterState;
  onFiltersChange: (f: FilterState) => void;
  totalResults: number;
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "newest",     label: "Newest" },
  { value: "oldest",     label: "Oldest" },
  { value: "price-asc",  label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "alpha-asc",  label: "A → Z" },
  { value: "alpha-desc", label: "Z → A" },
];

function FilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b border-neutral-100 dark:border-neutral-800 pb-4 mb-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-2 text-sm font-semibold text-neutral-900 dark:text-white hover:text-brand-500 transition-colors"
      >
        {title}
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pt-2">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CheckboxItem({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-2.5 py-1 cursor-pointer group">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-4 h-4 rounded border-neutral-300 dark:border-neutral-600 accent-brand-500"
      />
      <span className="text-sm text-neutral-600 dark:text-neutral-400 group-hover:text-brand-500 transition-colors">
        {label}
      </span>
    </label>
  );
}

export function FilterPanel({
  productTypes,
  tags,
  vendors,
  filters,
  onFiltersChange,
  totalResults,
}: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggle = <K extends "productTypes" | "tags" | "vendors">(
    key: K,
    value: string
  ) => {
    const current = filters[key] as string[];
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onFiltersChange({ ...filters, [key]: next });
  };

  const activeCount =
    filters.productTypes.length +
    filters.tags.length +
    filters.vendors.length;

  const reset = () =>
    onFiltersChange({
      search: filters.search,
      productTypes: [],
      tags: [],
      vendors: [],
      sort: "newest",
      priceMin: 0,
      priceMax: 0,
    });

  const filterContent = (
    <div className="space-y-0">
      {/* Sort (mobile only in panel) */}
      <FilterSection title="Sort By">
        <div className="space-y-1">
          {SORT_OPTIONS.map(({ value, label }) => (
            <label key={value} className="flex items-center gap-2.5 py-1 cursor-pointer group">
              <input
                type="radio"
                name="sort"
                value={value}
                checked={filters.sort === value}
                onChange={() => onFiltersChange({ ...filters, sort: value })}
                className="accent-brand-500"
              />
              <span className="text-sm text-neutral-600 dark:text-neutral-400 group-hover:text-brand-500 transition-colors">
                {label}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Product Types */}
      {productTypes.length > 0 && (
        <FilterSection title="Category">
          {productTypes.map((type) => (
            <CheckboxItem
              key={type}
              label={type}
              checked={filters.productTypes.includes(type)}
              onChange={() => toggle("productTypes", type)}
            />
          ))}
        </FilterSection>
      )}

      {/* Vendors */}
      {vendors.length > 0 && (
        <FilterSection title="Brand">
          {vendors.map((vendor) => (
            <CheckboxItem
              key={vendor}
              label={vendor}
              checked={filters.vendors.includes(vendor)}
              onChange={() => toggle("vendors", vendor)}
            />
          ))}
        </FilterSection>
      )}

      {/* Tags */}
      {tags.length > 0 && (
        <FilterSection title="Tags">
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 20).map((tag) => (
              <button
                key={tag}
                onClick={() => toggle("tags", tag)}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                  filters.tags.includes(tag)
                    ? "bg-brand-500 text-white border-brand-500"
                    : "border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:border-brand-300"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </FilterSection>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile filter button */}
      <div className="lg:hidden flex items-center gap-3 mb-6">
        <button
          onClick={() => setMobileOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 border border-neutral-200 dark:border-neutral-700 rounded-full text-sm font-medium hover:border-brand-500 transition-colors"
        >
          <SlidersHorizontal size={16} />
          Filters
          {activeCount > 0 && (
            <span className="w-5 h-5 bg-brand-500 text-white text-xs rounded-full flex items-center justify-center">
              {activeCount}
            </span>
          )}
        </button>

        {/* Sort select for mobile */}
        <select
          value={filters.sort}
          onChange={(e) =>
            onFiltersChange({ ...filters, sort: e.target.value as SortOption })
          }
          className="flex-1 px-4 py-2.5 border border-neutral-200 dark:border-neutral-700 rounded-full text-sm bg-white dark:bg-neutral-900 outline-none"
        >
          {SORT_OPTIONS.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>

        <span className="text-sm text-neutral-500 dark:text-neutral-400 whitespace-nowrap">
          {totalResults} items
        </span>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-[60] bg-black/40 lg:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28 }}
              className="fixed left-0 top-0 bottom-0 z-[70] w-80 bg-white dark:bg-neutral-900 overflow-y-auto p-6 shadow-xl lg:hidden"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-semibold text-neutral-900 dark:text-white">Filters</h2>
                <div className="flex items-center gap-2">
                  {activeCount > 0 && (
                    <button
                      onClick={reset}
                      className="text-xs text-brand-500 hover:underline"
                    >
                      Clear all
                    </button>
                  )}
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
              {filterContent}
              <button
                onClick={() => setMobileOpen(false)}
                className="w-full mt-4 py-3 bg-brand-500 text-white rounded-full font-medium text-sm"
              >
                View {totalResults} Results
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-neutral-900 dark:text-white">Filters</h2>
          {activeCount > 0 && (
            <button
              onClick={reset}
              className="text-xs text-brand-500 hover:underline flex items-center gap-1"
            >
              <X size={12} />
              Clear ({activeCount})
            </button>
          )}
        </div>
        {filterContent}
      </div>
    </>
  );
}
