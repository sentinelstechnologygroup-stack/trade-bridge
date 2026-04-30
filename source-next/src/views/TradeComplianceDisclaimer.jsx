"use client";
import React from "react";
import PageHero from "../components/shared/PageHero";
import { ShieldAlert } from "lucide-react";

const Section = ({ title, children }) => (
  <div className="mb-10">
    <h2 className="font-display text-xl font-bold text-foreground mb-3">{title}</h2>
    <div className="text-muted-foreground leading-relaxed space-y-3 text-sm">{children}</div>
  </div>
);

export default function TradeComplianceDisclaimer() {
  return (
    <>
      <PageHero headline="Trade Compliance Disclaimer" subheadline="Important information about the limitations of our product screening, feasibility review, and pricing estimate tools." compact />
      <section className="py-16 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Primary disclaimer block */}
          <div className="mb-10 flex items-start gap-4 px-6 py-5 bg-accent/5 border border-accent/20 rounded-xl">
            <ShieldAlert className="w-5 h-5 text-accent shrink-0 mt-0.5" />
            <p className="text-sm leading-relaxed text-foreground">
              Product availability, export eligibility, import requirements, duties, taxes, permits, documentation, and customs clearance vary by product and destination. Any feasibility review, pricing estimate, restricted-item warning, or AI-assisted recommendation is for internal decision support only and is not legal, customs, tax, or compliance advice. Final approval may require confirmation from freight forwarders, customs brokers, compliance professionals, legal advisors, or destination import authorities.
            </p>
          </div>

          <Section title="Export Eligibility Varies by Product">
            <p>Not all products available in the United States can be legally exported to all destinations. Export eligibility depends on product type, destination country, end user, intended use, and applicable U.S. export regulations including Export Administration Regulations (EAR) and other applicable controls.</p>
            <p>Our product review and feasibility tools are decision-support aids only. They do not constitute an export license determination or compliance clearance.</p>
          </Section>

          <Section title="Destination Import Requirements">
            <p>Each destination country maintains its own import regulations, tariff schedules, permit requirements, and restricted or prohibited goods lists. Requirements may change without notice. It is the buyer's and importer's responsibility to confirm that all destination import requirements are met before any shipment proceeds.</p>
          </Section>

          <Section title="Buyer / Importer Responsibilities">
            <p>Unless otherwise agreed in writing, the buyer or importer is responsible for:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Confirming import eligibility in the destination country</li>
              <li>Obtaining required import permits, licenses, or regulatory approvals</li>
              <li>Paying all applicable destination duties, taxes, and customs fees</li>
              <li>Engaging a licensed customs broker for destination customs clearance</li>
              <li>Ensuring compliance with all applicable destination laws and regulations</li>
            </ul>
          </Section>

          <Section title="Freight Forwarders and Customs Brokers">
            <p>We may coordinate with licensed freight forwarders and customs brokers on behalf of clients. However, freight forwarders and customs brokers are independent third-party service providers. We are not responsible for their acts, omissions, or decisions.</p>
            <p>All clients are encouraged to engage their own licensed customs broker for destination-country import clearance.</p>
          </Section>

          <Section title="AI-Assisted Screening Limitations">
            <p>Our platform may use AI-assisted tools to provide preliminary product screening, risk classification, and feasibility recommendations. These outputs are generated algorithmically and have not been reviewed by a licensed trade compliance professional, customs broker, or legal advisor.</p>
            <p>AI-assisted screening results should not be relied upon as compliance determinations. They are starting points for human review, not final decisions.</p>
          </Section>

          <Section title="Human Review Required">
            <p>All Go, Caution, and No-Go feasibility decisions require human review and approval before any sourcing, quoting, or shipment action is taken. No action should be taken based on AI-assisted recommendations alone.</p>
            <p>Restricted product categories, regulated goods, and high-complexity requests may require review by a licensed freight forwarder, customs broker, trade compliance specialist, or legal advisor before any quote or sourcing action is initiated.</p>
          </Section>

          <Section title="No Guarantee of Approval or Clearance">
            <p>Nothing in our product review, feasibility assessment, or pricing estimate process constitutes a guarantee that a product will be approved for export, cleared through customs, or successfully delivered. Regulatory approvals, customs decisions, and logistics outcomes are determined by authorities and parties outside our control.</p>
            <p>We strongly recommend that all clients consult a licensed customs broker, freight forwarder, trade attorney, or import compliance professional before proceeding with any international trade transaction.</p>
          </Section>

        </div>
      </section>
    </>
  );
}