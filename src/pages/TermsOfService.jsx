import React from "react";
import PageHero from "../components/shared/PageHero";

const Section = ({ title, children }) => (
  <div className="mb-10">
    <h2 className="font-display text-xl font-bold text-foreground mb-3">{title}</h2>
    <div className="text-muted-foreground leading-relaxed space-y-3 text-sm">{children}</div>
  </div>
);

export default function TermsOfService() {
  return (
    <>
      <PageHero headline="Terms of Service" subheadline="Please read these terms carefully before using our website or submitting a sourcing request." compact />
      <section className="py-16 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs text-muted-foreground mb-10 pb-6 border-b border-border">Last updated: April 2026. This is placeholder legal content pending attorney review.</p>

          <Section title="Use of Website">
            <p>This website is provided for informational purposes and to facilitate trade service inquiries. By accessing or using this website, you agree to use it only for lawful purposes and in a manner consistent with applicable laws and regulations.</p>
            <p>We reserve the right to modify or discontinue website content at any time without notice. Information on this site does not constitute a binding offer, guarantee of availability, or commitment to any specific price or service outcome.</p>
          </Section>

          <Section title="Quote Requests">
            <p>Submitting a sourcing quote request does not create a binding contract or guarantee that a quote, product, or service will be provided. All requests are reviewed individually and are subject to feasibility assessment, supplier availability, export eligibility, and destination import requirements.</p>
            <p>We reserve the right to decline any request at our discretion without obligation to provide a reason.</p>
          </Section>

          <Section title="Sourcing and Coordination Services">
            <p>Our services include product sourcing coordination, supplier communication, order organization, and export logistics coordination. These services are provided on a case-by-case basis and are subject to pricing agreements confirmed in writing.</p>
            <p>We do not guarantee that any product will be sourced, purchased, shipped, or delivered. Service availability depends on supplier cooperation, product eligibility, and logistics feasibility.</p>
            <p>We are not a freight carrier, freight forwarder, or customs broker. Freight forwarding, customs brokerage, and import clearance services may be coordinated through licensed third-party partners where applicable.</p>
          </Section>

          <Section title="Third-Party Freight / Logistics Partners">
            <p>We may coordinate with third-party freight forwarders, logistics providers, and customs brokers on behalf of clients. We are not responsible for the acts, omissions, errors, or delays of third-party logistics providers.</p>
            <p>Freight estimates are provided as general estimates only and may change based on actual cargo dimensions, weight, fuel surcharges, carrier availability, and other factors beyond our control.</p>
          </Section>

          <Section title="Buyer / Importer Responsibilities">
            <p>Unless otherwise agreed in writing, the buyer or importer is responsible for all destination-country duties, taxes, import permits, regulatory approvals, customs clearance, and compliance with destination import laws.</p>
            <p>The buyer or importer is responsible for confirming that the requested products are legally importable into the destination country and that all required import permits, licenses, or certifications have been obtained prior to shipment.</p>
          </Section>

          <Section title="Payment Terms">
            <p>Payment terms are agreed upon in writing prior to any sourcing or coordination work beginning. Standard terms may include a sourcing review fee, product cost deposit, and logistics coordination payment.</p>
            <p>No product will be purchased and no shipment will be coordinated until applicable payments have cleared. All fees are non-refundable unless otherwise stated in a written agreement.</p>
          </Section>

          <Section title="No Guarantee of Customs Clearance">
            <p>We do not guarantee that any product will successfully clear customs in the destination country. Customs clearance depends on destination import regulations, permit status, documentation accuracy, and decisions made by destination import authorities.</p>
            <p>We are not responsible for customs delays, inspections, seizures, or rejections at any point of entry.</p>
          </Section>

          <Section title="No Guarantee of Product Availability">
            <p>Product availability depends on U.S. supplier stock levels, pricing, minimum order quantities, and export eligibility. We do not guarantee the availability of any specific product, brand, or quantity at any given time.</p>
          </Section>

          <Section title="No Legal, Tax, Customs, or Compliance Advice">
            <p>Nothing on this website or provided through our services constitutes legal, tax, customs, or compliance advice. All feasibility reviews, pricing estimates, risk classifications, and AI-assisted recommendations are for internal decision-support purposes only.</p>
            <p>We strongly recommend that clients consult a licensed customs broker, freight forwarder, trade attorney, or import compliance professional for product-specific guidance.</p>
          </Section>

          <Section title="Limitation of Liability">
            <p>[Placeholder — to be completed by a licensed attorney prior to public launch.] To the extent permitted by applicable law, our liability for any claim arising from the use of this website or our services shall be limited to the fees paid for the specific service giving rise to the claim.</p>
            <p>We are not liable for indirect, incidental, consequential, or punitive damages of any kind.</p>
          </Section>

          <Section title="Contact">
            <p>Questions about these terms may be directed to our team via the <a href="/contact" className="text-accent underline underline-offset-2">Contact page</a>. These terms are subject to change and will be updated with a revised effective date.</p>
          </Section>
        </div>
      </section>
    </>
  );
}