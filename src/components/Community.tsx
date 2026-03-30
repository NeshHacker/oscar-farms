export default function Community() {
  return (
    <section className="py-20 px-6 bg-white">

      <div className="max-w-5xl mx-auto text-center">

        <h2 className="text-4xl font-bold text-green-900 mb-6">
          Empowering Local Youth
        </h2>

        <p className="text-gray-700 mb-8">
          Oscar Farms is committed to creating opportunities for young
          people in the community. Through agricultural training,
          seasonal work, and mentorship, the farm provides practical
          skills that empower the next generation of farmers.
        </p>

        <div className="bg-green-50 p-8 rounded-xl shadow-md">

          <h3 className="text-2xl font-semibold text-green-800 mb-4">
            We Are Hiring
          </h3>

          <p className="text-gray-700 mb-6">
            We occasionally recruit motivated youth to assist in farm
            operations including planting, harvesting, irrigation,
            and farm management.
          </p>

          <button className="bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800">
            Apply for Opportunities
          </button>

        </div>

      </div>

    </section>
  );
}