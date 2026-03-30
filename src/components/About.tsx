export default function About() {
  return (
    <section className="py-20 px-6 bg-white">

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        {/* Image */}
        <div>
          <img
            src="/projects/oscar.png"
            alt="Oscar Farms"
            className="rounded-2xl shadow-lg"
          />
        </div>

        {/* Text */}
        <div>
          <h2 className="text-4xl font-bold text-green-900 mb-6">
            A Research-Driven Approach to Modern Agriculture
          </h2>

          <p className="text-gray-700 mb-6">
            Oscar Farms is dedicated to advancing sustainable agriculture
            through high-quality seedlings, farmer education, and research-
            informed practices. Led by an experienced university professor,
            the farm bridges academic knowledge with practical farming.
          </p>

          <ul className="space-y-3 text-gray-700">

            <li>🌱 Premium avocado and macadamia seedlings</li>

            <li>🌱 Agricultural programs supporting schools</li>

            <li>🌱 Tree distribution initiatives for communities</li>

            <li>🌱 Professional consultancy for farmers and institutions</li>

          </ul>

        </div>

      </div>

    </section>
  );
}