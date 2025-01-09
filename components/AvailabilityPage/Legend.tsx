'use client'

import getNextColor from "@/types/colorUtils";

interface LegendProps {
  maxAvailability: number;
}

export default function AvailabilityLegend({ maxAvailability }: LegendProps) {
  // Generate color samples for the legend
  const colorSamples = Array.from({ length: maxAvailability + 1 }, (_, i) => ({
    count: i,
    color: getNextColor(i, maxAvailability)
  }));

  return (
    <div className="flex items-center justify-center gap-2 p-4">
      <span className="text-sm text-gray-600 dark:text-gray-400">
        0/{maxAvailability} Available
      </span>
      <div className="flex h-6 w-40">
        {colorSamples.map((sample, index) => (
          <div
            key={index}
            style={{ backgroundColor: sample.color }}
            className="flex-1 border-r border-gray-300 dark:border-gray-600 first:rounded-l-md last:rounded-r-md last:border-r-0"
          />
        ))}
      </div>
      <span className="text-sm text-gray-600 dark:text-gray-400">
        {maxAvailability}/{maxAvailability} Available
      </span>
    </div>
  );
}
