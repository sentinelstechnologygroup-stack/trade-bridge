import React from "react";
import PageHero from "../components/shared/PageHero";

const Section = ({ title, children }) => (
  <div className="mb-10">
    <h2 className="font-display text-xl font-bold text-foreground mb-3">{title}</h2>
    <div className="text-muted-foreground leading-relaxed space-y-3 text-sm">{children}</div>
  </div>
);

export default function CookiePolicy() {
  return (
    <>
      <PageHero headline="Cookie Policy" subheadline="Information about how cookies and similar technologies may be used on this website." compact />
      <section className="py-16 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs text-muted-foreground mb-10 pb-6 border-b border-border">Last updated: April 2026. This is placeholder cookie policy content.</p>

          <Section title="What Cookies Are">
            <p>Cookies are small text files that may be stored on your device when you visit a website. They are widely used to make websites function properly, improve performance, and provide analytical insights about how visitors interact with website content.</p>
          </Section>

          <Section title="Analytics / Performance Cookies">
            <p>[Placeholder] This website may use third-party analytics tools that set cookies to help us understand how visitors use our site. Analytics data is collected in aggregate and does not personally identify individual visitors. Specific analytics integrations will be confirmed prior to production launch.</p>
          </Section>

          <Section title="Contact Forms and User Preferences">
            <p>Cookies or local storage may be used to retain form input preferences or session information when you interact with our contact or quote request forms. This is intended solely to improve your experience and is not used for advertising or tracking across other websites.</p>
          </Section>

          <Section title="Managing Cookies">
            <p>Most web browsers allow you to control cookies through browser settings. You can typically configure your browser to refuse cookies or to alert you when cookies are being sent. Disabling certain cookies may affect the functionality of some features on this website.</p>
            <p>Please refer to your browser's help documentation for instructions on managing cookie settings.</p>
          </Section>

          <Section title="Contact">
            <p>For questions about our use of cookies or this policy, please contact us via the <a href="/contact" className="text-accent underline underline-offset-2">Contact page</a>. This policy may be updated as our website and analytics practices evolve.</p>
          </Section>
        </div>
      </section>
    </>
  );
}