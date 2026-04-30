import "./globals.css";
import AppProviders from "@/components/layout/AppProviders";

export const metadata = {
  title: "Trade Bridge | TradeConnect",
  description: "B2B import/export public website and prototype operations portal for the U.S. to Sri Lanka trade lane.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
