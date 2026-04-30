"use client";
import React from "react";
import PageHero from "../components/shared/PageHero";

const Section = ({ title, children }) => (
  <div className="mb-10">
    <h2 className="font-display text-xl font-bold text-foreground mb-3">{title}</h2>
    <div className="text-muted-foreground leading-relaxed space-y-3 text-sm">{children}</div>
  </div>
);

export default function AccessibilityStatement() {
  return (
    <>
      <PageHero headline="Accessibility Statement" subheadline="Our commitment to providing an accessible website experience for all users." compact />
      <section className="py-16 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section title="Accessibility Commitment">
            <p>We are committed to ensuring that our website is accessible to all users, including those with disabilities. We strive to meet recognized web accessibility standards and to provide a clear, usable experience regardless of the technologies or tools a visitor may use.</p>
          </Section>

          <Section title="Ongoing Improvement">
            <p>Web accessibility is an ongoing effort. We actively review and improve our website content and functionality to address accessibility needs as standards and best practices evolve. We welcome feedback that helps us identify areas for improvement.</p>
          </Section>

          <Section title="Supported Access Needs">
            <p>We aim to support users who rely on:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Screen readers and assistive technologies</li>
              <li>Keyboard-only navigation</li>
              <li>Browser zoom and text resizing</li>
              <li>High-contrast display modes</li>
              <li>Reduced motion preferences</li>
            </ul>
            <p>If you experience difficulty using any part of our website, please contact us and we will work to provide the information in an alternative format.</p>
          </Section>

          <Section title="Contact for Accessibility Issues">
            <p>If you encounter an accessibility barrier on our website, please let us know. We take accessibility feedback seriously and will make reasonable efforts to address reported issues promptly.</p>
            <p>You can reach us via the <a href="/contact" className="text-accent underline underline-offset-2">Contact page</a>.</p>
          </Section>

          <Section title="Alternative Contact Method">
            <p>If you are unable to access any content or complete any action on this website due to a disability, please contact us directly and we will provide the information or assistance you need through an appropriate alternative method.</p>
          </Section>

          <Section title="Feedback Process">
            <p>We welcome your feedback on the accessibility of this website. Please include a description of the specific barrier encountered and the page or section where it occurred. We will acknowledge receipt and aim to respond with a status update within a reasonable timeframe.</p>
          </Section>
        </div>
      </section>
    </>
  );
}