"use client";

import { useId, useState } from "react";

const compactINR = (n: number) => {
  if (n >= 1e7) return `₹${(n / 1e7).toFixed(2)} Cr`;
  if (n >= 1e5) return `₹${(n / 1e5).toFixed(2)} Lac`;
  return `₹${Math.round(n).toLocaleString("en-IN")}`;
};

const fullINR = (n: number) => `₹${Math.round(n).toLocaleString("en-IN")}`;

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  display,
  minLabel,
  maxLabel,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  display: string;
  minLabel: string;
  maxLabel: string;
}) {
  const id = useId();
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-sm text-ink-soft">
          {label}
        </label>
        <span className="font-display text-base font-semibold text-green-950">{display}</span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-1.5 w-full cursor-pointer appearance-none rounded-full outline-none [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-green-900 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-green-900"
        style={{
          background: `linear-gradient(to right, var(--color-green-900) ${pct}%, var(--color-paper-deep) ${pct}%)`,
        }}
      />
      <div className="flex justify-between text-xs text-ink-faint">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
}

export function InvestmentCalculator() {
  const [amount, setAmount] = useState(2_500_000);
  const [rate, setRate] = useState(8.5);
  const [years, setYears] = useState(15);
  const [growth, setGrowth] = useState(6);

  const months = years * 12;
  const monthlyRate = rate / 12 / 100;
  const emi =
    monthlyRate === 0
      ? amount / months
      : (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);

  const totalPayable = emi * months;
  const totalInterest = totalPayable - amount;
  const principalShare = totalPayable > 0 ? amount / totalPayable : 0;

  const projectedValue = amount * Math.pow(1 + growth / 100, years);

  // Semicircular gauge: an arc of radius R spans π·R in length.
  const R = 90;
  const ARC = Math.PI * R;

  return (
    <div className="flex flex-col gap-7 rounded-xl border border-green-950/10 bg-paper-alt p-6 md:p-8">
      <div>
        <h3 className="font-display text-xl font-semibold text-green-950">
          Plan your investment
        </h3>
        <p className="mt-1 text-sm text-ink-soft">
          Move the sliders to see what a plot purchase could look like on your own numbers.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
        <div className="flex flex-col gap-5">
          <Slider
            label="Loan amount"
            value={amount}
            min={100_000}
            max={80_000_000}
            step={100_000}
            onChange={setAmount}
            display={compactINR(amount)}
            minLabel="₹1 Lac"
            maxLabel="₹8 Cr"
          />
          <Slider
            label="Interest rate (p.a.)"
            value={rate}
            min={1}
            max={20}
            step={0.05}
            onChange={setRate}
            display={`${rate.toFixed(2)}%`}
            minLabel="1%"
            maxLabel="20%"
          />
          <Slider
            label="Loan tenure"
            value={years}
            min={1}
            max={30}
            step={1}
            onChange={setYears}
            display={`${years} ${years === 1 ? "Year" : "Years"}`}
            minLabel="1 Year"
            maxLabel="30 Years"
          />
        </div>

        <div className="flex flex-col items-center">
          <svg viewBox="0 0 220 130" className="w-full max-w-[15rem]" role="img" aria-label="Split of principal and interest">
            <path
              d={`M ${110 - R} 115 A ${R} ${R} 0 0 1 ${110 + R} 115`}
              fill="none"
              stroke="var(--color-gold-500)"
              strokeWidth="12"
              strokeLinecap="round"
            />
            <path
              d={`M ${110 - R} 115 A ${R} ${R} 0 0 1 ${110 + R} 115`}
              fill="none"
              stroke="var(--color-green-700)"
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={`${principalShare * ARC} ${ARC}`}
            />
            <text
              x="110"
              y="98"
              textAnchor="middle"
              className="fill-ink-faint"
              style={{ fontSize: "11px" }}
            >
              Monthly EMI
            </text>
            <text
              x="110"
              y="122"
              textAnchor="middle"
              className="fill-green-950 font-display"
              style={{ fontSize: "22px", fontWeight: 600 }}
            >
              {fullINR(emi)}
            </text>
          </svg>

          <dl className="mt-2 grid w-full grid-cols-2 gap-x-6 gap-y-3 text-center">
            <div>
              <dt className="flex items-center justify-center gap-1.5 text-xs text-ink-faint">
                <span className="h-2 w-2 rounded-full bg-green-700" />
                Principal
              </dt>
              <dd className="mt-1 text-sm font-medium text-green-950">{compactINR(amount)}</dd>
            </div>
            <div>
              <dt className="flex items-center justify-center gap-1.5 text-xs text-ink-faint">
                <span className="h-2 w-2 rounded-full bg-gold-500" />
                Interest
              </dt>
              <dd className="mt-1 text-sm font-medium text-green-950">
                {compactINR(totalInterest)}
              </dd>
            </div>
            <div className="col-span-2 border-t border-green-950/10 pt-3">
              <dt className="text-xs text-ink-faint">Total payable</dt>
              <dd className="mt-1 font-display text-lg font-semibold text-green-950">
                {fullINR(totalPayable)}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="flex flex-col gap-4 border-t border-green-950/10 pt-6">
        <Slider
          label="If land value grew at"
          value={growth}
          min={0}
          max={15}
          step={0.5}
          onChange={setGrowth}
          display={`${growth.toFixed(1)}% a year`}
          minLabel="0%"
          maxLabel="15%"
        />
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
          <span className="text-sm text-ink-soft">Value after {years} years</span>
          <span className="font-display text-2xl font-semibold text-green-800">
            {compactINR(projectedValue)}
          </span>
        </div>
        <p className="text-xs leading-relaxed text-ink-faint">
          Indicative only. The growth rate above is a figure you choose to explore a
          &ldquo;what if&rdquo;, not a forecast, offer or assurance of returns from{" "}
          {"Mrityika Realters"}. Actual prices, loan terms and future value will differ. Please
          confirm current rates with our team.
        </p>
      </div>
    </div>
  );
}
