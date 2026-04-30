"use client";
import React from "react";
import PageHero from "../components/shared/PageHero";
import CtaSection from "../components/shared/CtaSection";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    q: "Do you ship products directly to Sri Lanka?",
    a: "We coordinate approved shipments through freight forwarders and logistics partners. We do not operate as a freight carrier or postal service.",
  },
  {
    q: "Are you a freight forwarder or customs broker?",
    a: "No. We coordinate with freight and logistics partners. Customs brokerage, freight forwarding, and import clearance may be handled by licensed partners or the buyer/importer.",
  },
  {
    q: "Who handles Sri Lanka customs clearance?",
    a: "The Sri Lankan buyer/importer is responsible for destination clearance, duties, taxes, and permits unless otherwise agreed in writing.",
  },
  {
    q: "Can you source from multiple U.S. suppliers?",
    a: "Yes, multi-supplier coordination is one of our core services. We can manage product requests across multiple U.S. suppliers and consolidate order information.",
  },
  {
    q: "Can you buy the products for us?",
    a: "Depending on the product, payment terms, supplier requirements, and agreement structure, we may support purchasing or order coordination on your behalf.",
  },
  {
    q: "What products can you source?",
    a: "We review each request individually. Common categories may include consumer goods, business supplies, tools, household products, apparel, and commercial supplies. Regulated products require additional review.",
  },
  {
    q: "Do you guarantee delivery time?",
    a: "No. Timelines depend on supplier availability, freight schedules, documentation, customs, and destination clearance. We provide estimated timelines but cannot guarantee specific delivery dates.",
  },
  {
    q: "Do you import Sri Lankan products into the U.S.?",
    a: "The company is developing U.S. import and wholesale distribution channels for selected Sri Lankan products. Contact us if you're interested in this program.",
  },
  {
    q: "How is pricing calculated?",
    a: "Pricing is based on product cost, sourcing complexity, supplier count, order size, documentation needs, freight/logistics requirements, and risk level. Most projects include a sourcing review fee, sourcing/coordination fee, and pass-through logistics costs. Final pricing is provided after feasibility review and supplier/logistics estimates.",
  },
  {
    q: "How do I get started?",
    a: "Submit a sourcing quote request with product details, quantity, destination, and timeline. Our team will review your request and respond with next steps.",
  },
];

export default function FAQ() {
  return (
    <>
      <PageHero
        headline="Frequently Asked Questions"
        subheadline="Answers to common questions about our services, process, and trade support."
        compact
      />

      <section className="py-24 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="bg-card border border-border rounded-xl px-6 data-[state=open]:shadow-md transition-shadow"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <CtaSection
        title="Still have questions?"
        description="Contact our team or submit a sourcing request to get started."
        ctaText="Contact Our Team"
        ctaLink="/contact"
      />
    </>
  );
}