export default function Footer() {
  return (
    <>
    <div className="fixed bottom-6 right-6 z-50">
    <a
        href="https://wa.me/254111924282"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 bg-green-600 text-white px-4 py-3 rounded-full shadow-lg hover:bg-green-700 transition"
    >
        <span className="text-lg">💬</span>
        <span className="text-sm font-semibold hidden sm:inline">
        Chat on WhatsApp
        </span>
    </a>
    </div>

    {/* CTA */}
    <section className="py-8 text-center">
        <h2 className="text-lg font-semibold text-green-900 mb-2">
            Need quality seedlings?
        </h2>

        <a
            href="/contact"
            className="inline-block bg-green-700 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-green-800 transition"
        >
            Contact Us
        </a>
    </section>

    {/* CTA */}
    <footer className="bg-green-950 text-white mt-20">

      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8">

        {/* Brand */}
        <div>
          <h2 className="text-xl font-bold mb-3">Oscar Farms</h2>
          <p className="text-sm text-green-200">
            Advancing agriculture through knowledge, quality seedlings,
            and community impact.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-green-200">
            <li><a href="/">Home</a></li>
            <li><a href="/products">Products</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/blog">Blog</a></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="font-semibold mb-3">Services</h3>
          <ul className="space-y-2 text-sm text-green-200">
            <li>Consultancy</li>
            <li>Training</li>
            <li>Tree Initiative</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-3">Contact</h3>
          <p className="text-sm text-green-200">
            📞 +254 0111924282 <br />
            📍 Chuka, Kenya <br />
            📧 info@oscarfarms.co.ke
          </p>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="border-t border-green-800 text-center py-4 text-sm text-green-300">
        © {new Date().getFullYear()} Oscar Farms. All rights reserved.
      </div>
    </footer>
    </>
  );
}