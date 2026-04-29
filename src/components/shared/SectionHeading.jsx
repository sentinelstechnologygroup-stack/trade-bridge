import React from "react";

export default function SectionHeading({ label, title, description, centered = false }) {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
      {label && (
        <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-3">
          {label}
        </span>
      )}
      <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground leading-tight">
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-muted-foreground text-lg leading-relaxed ${centered ? 'max-w-2xl mx-auto' : 'max-w-3xl'}`}>
          {description}
        </p>
      )}
    </div>
  );
}