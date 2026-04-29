import React from "react";
import PageHero from "../components/shared/PageHero";

const Section = ({ title, children }) => (
  <div className="mb-10">
    <h2 className="font-display text-xl font-bold text-foreground mb-3">{title}</h2>
    <div className="text-muted-foreground leading-relaxed space-y-3 text-sm">{children}</div>
  </div>
);

export default function PrivacyPolicy() {
  return (
    <>
      <PageHero headline="Privacy Policy" subheadline="How we handle information collected through our website and trade service inquiries." compact />
      <section className="py-16 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs text-muted-foreground mb-10 pb-6 border-b border-border">Last updated: April 2026. This is placeholder privacy policy content pending legal review.</p>

          <Section title="Information Collected">
            <p>We collect information that you voluntarily provide when submitting a sourcing quote request, contact form, or other inquiry through this website. We may also collect limited technical information through website analytics.</p>
          </Section>

          <Section title="Contact Information">
            <p>When you submit a contact or inquiry form, we collect your name, email address, phone number, and company name. This information is used to respond to your inquiry and manage our business relationship with you.</p>
          </Section>

          <Section title="Company Information">
            <p>For trade service inquiries, we may collect information about your company, including company name, country, buyer type, and trade role. This helps us assess the feasibility of your request and determine appropriate service options.</p>
          </Section>

          <Section title="Product Request Information">
            <p>Quote requests may include product details, quantities, destination information, timeline requirements, and import/export specifics. This information is used internally to assess feasibility and prepare sourcing responses.</p>
          </Section>

          <Section title="Uploaded Documents / Specification Sheets">
            <p>[Placeholder] Where document upload functionality is available, files you upload (such as product specification sheets or purchase orders) are stored securely and used solely for the purpose of evaluating and fulfilling your trade service request. Document handling and retention policies are pending final system configuration.</p>
          </Section>

          <Section title="Communications">
            <p>We may retain records of email communications, inquiry responses, and internal notes related to your request for the purpose of managing the trade service relationship and maintaining accurate records.</p>
          </Section>

          <Section title="How Information Is Used">
            <p>Information is used to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Respond to sourcing and trade service inquiries</li>
              <li>Assess feasibility and prepare pricing estimates</li>
              <li>Coordinate with U.S. suppliers and logistics partners</li>
              <li>Maintain internal business records</li>
              <li>Communicate regarding active sourcing engagements</li>
            </ul>
            <p>We do not sell, rent, or share personal information with third parties for marketing purposes.</p>
          </Section>

          <Section title="Service Providers">
            <p>We may share information with trusted service providers involved in fulfilling trade service requests, including U.S. suppliers, freight forwarders, customs brokers, and logistics partners, solely to the extent necessary to carry out the requested service.</p>
          </Section>

          <Section title="Data Retention">
            <p>[Placeholder] We retain information for as long as necessary to fulfill the purpose for which it was collected, comply with applicable legal obligations, and maintain business records. Specific retention periods are pending finalization of our data management policies.</p>
          </Section>

          <Section title="Security">
            <p>[Placeholder] We implement reasonable technical and organizational measures to protect information from unauthorized access, use, or disclosure. Specific security controls are being finalized as part of system configuration prior to production launch.</p>
          </Section>

          <Section title="Contact for Privacy Requests">
            <p>For questions about this privacy policy or to request access to, correction of, or deletion of information we hold about you, please contact us via the <a href="/contact" className="text-accent underline underline-offset-2">Contact page</a>.</p>
          </Section>
        </div>
      </section>
    </>
  );
}