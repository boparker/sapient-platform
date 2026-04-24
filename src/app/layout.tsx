import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Andrea Bertoli — Holistic Pleasure Coaching",
  description: "Holistic sex education for midlife intimacy and perimenopause. Courses, workshops, and guided practices with Andrea Bertoli.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${lora.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-charcoal">
        {/* Sticky Navigation */}
        <header className="sticky top-0 z-50 bg-forest text-cream shadow-md">
          <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/" className="font-serif text-xl text-gold hover:text-white transition-colors">
              Andrea Bertoli
            </Link>
            <div className="flex items-center gap-6 text-sm font-semibold">
              <Link href="/courses" className="hover:text-gold transition-colors">Courses</Link>
              <Link href="/pricing" className="hover:text-gold transition-colors">Pricing</Link>
              <Link
                href="/pricing"
                className="bg-burgundy text-white px-4 py-2 rounded-lg hover:bg-burgundy/80 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </nav>
        </header>

        {/* Page Content */}
        <div className="flex-1">{children}</div>

        {/* Global Footer */}
        <footer className="bg-forest text-cream py-12 px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-serif text-xl mb-4">Andrea Bertoli</h4>
              <p className="text-sm text-gold">Sex Educator &amp; Holistic Pleasure Coach</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Explore</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/courses" className="hover:text-gold transition-colors">Courses</Link></li>
                <li><Link href="/pricing" className="hover:text-gold transition-colors">Pricing</Link></li>
                <li><a href="https://andreabertoli.com/about" className="hover:text-gold transition-colors">About Andrea</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="https://andreabertoli.com/contact" className="hover:text-gold transition-colors">Contact</a></li>
                <li><Link href="/pricing#faq" className="hover:text-gold transition-colors">FAQ</Link></li>
                <li><Link href="/login" className="hover:text-gold transition-colors">Login</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-sm text-gold">A Sapient Practice</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
