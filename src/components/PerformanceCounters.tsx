import React, { useState, useEffect, useRef } from 'react';
import { Award, CheckCircle2, ShieldCheck } from 'lucide-react';

const stats = [
  { id: 1, name: 'B-BBEE Contributor', value: 1, prefix: 'LEVEL ', suffix: '', icon: Award },
  { id: 2, name: 'Projects Delivered', value: 120, prefix: '', suffix: '+', icon: CheckCircle2 },
  { id: 3, name: 'NHBRC & SANS', value: 100, prefix: '', suffix: '% Compliant', icon: ShieldCheck },
];

function Counter({ targetValue, prefix, suffix }: { targetValue: number, prefix: string, suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    
    let startTimestamp: number | null = null;
    const duration = 2000;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const currentCount = Math.floor(progress * targetValue);
      
      setCount(currentCount);

      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      } else {
        setCount(targetValue);
      }
    };

    animationFrameId = window.requestAnimationFrame(step);

    return () => window.cancelAnimationFrame(animationFrameId);
  }, [targetValue, isVisible]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

export default function PerformanceCounters() {
  return (
    <div className="bg-amber-400 py-12 relative z-20 -mt-8 shadow-xl max-w-6xl mx-auto rounded-sm border-b-4 border-amber-600">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <dl className="grid grid-cols-1 gap-x-8 gap-y-8 text-center sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.id} className="mx-auto flex max-w-xs flex-col gap-y-2 items-center">
              <stat.icon className="h-10 w-10 text-slate-800 mb-2 opacity-80" />
              <dt className="text-base font-bold leading-7 text-slate-700 uppercase tracking-wide">{stat.name}</dt>
              <dd className="order-first text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
                <Counter targetValue={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
