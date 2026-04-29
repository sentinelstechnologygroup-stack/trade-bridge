import React from "react";
import PageHero from "../components/shared/PageHero";
import SectionHeading from "../components/shared/SectionHeading";
import CtaSection from "../components/shared/CtaSection";
import { Target, Eye, Heart, Shield, Users, Handshake, MapPin, Globe } from "lucide-react";
import { motion } from "framer-motion";

const values = [
  { icon: Eye, title: "Transparency", desc: "Clear communication about what's possible, realistic timelines, and honest assessments." },
  { icon: Shield, title: "Reliable Communication", desc: "Consistent updates and responsive engagement with buyers, suppliers, and partners." },
  { icon: Heart, title: "Responsible Trade", desc: "Compliance awareness, ethical sourcing practices, and respect for trade regulations." },
  { icon: Users, title: "Supplier Accountability", desc: "We work with suppliers who meet quality, reliability, and communication standards." },
  { icon: Handshake, title: "Long-Term Partnerships", desc: "Building lasting trade relationships, not one-time transactions." },
];

const differentiators = [
  { icon: MapPin, label: "Houston Presence", desc: "Physical U.S. base for direct supplier engagement" },
  { icon: Globe, label: "Sri Lanka Familiarity", desc: "Cultural and market understanding of both sides" },
  { icon: Users, label: "Supplier Coordination", desc: "Multi-supplier management and communication" },
  { icon: Target, label: "Trade Lane Focus", desc: "Dedicated U.S. ↔ Sri Lanka specialization" },
];

export default function About() {
  return (
    <>
      <PageHero
        headline="A Trade Bridge Between Houston and Sri Lanka"
        subheadline="Built to support a more reliable trade channel between U.S. suppliers and Sri Lankan buyers."
        compact
      />

      {/* Company Story */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeading label="Our Story" title="Built From Real Trade Experience" />
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  TradeConnect was founded to address a genuine need: Sri Lankan businesses require reliable access to U.S. suppliers, but the distance, communication gaps, and complexity of international sourcing often create barriers.
                </p>
                <p>
                  Led by a Sri Lankan-born U.S. citizen based in Houston, the company brings a practical understanding of both markets, cultures, and business expectations. This dual perspective enables more effective communication between U.S. suppliers and Sri Lankan buyers.
                </p>
                <p>
                  Our Houston office serves as the operational center for product sourcing, supplier coordination, and export logistics management — creating a professional bridge for cross-border trade.
                </p>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-primary rounded-2xl p-8 text-primary-foreground"
            >
              <Target className="w-8 h-8 text-accent mb-4" />
              <h3 className="font-display text-xl font-bold mb-3">Our Mission</h3>
              <p className="text-primary-foreground/70 leading-relaxed">
                To help businesses source, coordinate, and move approved goods between the United States and Sri Lanka with clarity, communication, and professionalism.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading label="Our Values" title="Principles That Guide Our Trade Practice" centered />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-card rounded-xl border border-border p-6"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <v.icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading label="What Sets Us Apart" title="A Focused Trade Partner" centered />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {differentiators.map((d, i) => (
              <motion.div
                key={d.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-4">
                  <d.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{d.label}</h3>
                <p className="text-sm text-muted-foreground">{d.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CtaSection
        title="Ready to build a trade partnership?"
        description="Let's discuss how we can support your sourcing needs."
        ctaText="Discuss a Trade Partnership"
      />
    </>
  );
}