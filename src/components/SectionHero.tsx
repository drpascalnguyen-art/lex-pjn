import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

type Props = {
  image: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
};

export function SectionHero({ image, eyebrow, title, subtitle, children }: Props) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative mb-10 overflow-hidden rounded-3xl bg-cream-100 shadow-soft"
    >
      <div className="relative h-60 md:h-80">
        <img
          src={image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <p className="text-xs uppercase tracking-[0.18em] text-white/90 text-shadow-soft">
            {eyebrow}
          </p>
          <h1 className="mt-1 font-display text-3xl text-white text-shadow-soft md:text-5xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-2 max-w-xl text-sm text-white/90 text-shadow-soft md:text-base">
              {subtitle}
            </p>
          )}
        </div>
      </div>
      {children && <div className="px-6 pb-6 md:px-10 md:pb-8">{children}</div>}
    </motion.section>
  );
}
