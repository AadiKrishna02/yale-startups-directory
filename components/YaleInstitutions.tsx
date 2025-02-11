const YaleInstitutions = () => {
  const institutions = [
    {
      name: "Yale School of Management",
      logo: "/SOM.png"
    },
    {
      name: "Yale College",
      logo: "/College.png"
    },
    {
      name: "Yale School of Engineering",
      logo: "/SEAS.jpg"
    },
    {
      name: "Yale School of Medicine",
      logo: "/MPH.png"
    },
    {
      name: "Yale Law School",
      logo: "/Alumni.png"
    },
    {
      name: "Tsai CITY",
      logo: "/Faculty.png"
    }
  ];

  return (
    <section className="relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/30 to-white"></div>
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-100/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">
              Featuring Startups From
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover innovations from Yale's leading institutions and research centers
            </p>
          </div>

          {/* Institutions Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 lg:gap-12">
            {institutions.map((institution) => (
              <div
                key={institution.name}
                className="group relative bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100/50 hover:border-blue-200"
              >
                {/* Logo Container */}
                <div className="h-24 flex items-center justify-center mb-4">
                  <img
                    src={institution.logo}
                    alt={`${institution.name} logo`}
                    className="max-h-full max-w-full object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300 filter group-hover:brightness-110"
                  />
                </div>

                {/* Institution Details */}
                <div className="text-center">
                  <h3 className="text-blue-900 font-semibold mb-1 group-hover:text-blue-700 transition-colors">
                    {institution.name}
                  </h3>
                  <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors">
                    {institution.description}
                  </p>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-blue-50/0 to-blue-100/0 group-hover:from-blue-50/50 group-hover:via-blue-50/30 group-hover:to-blue-100/50 rounded-xl transition-all duration-300"></div>
              </div>
            ))}
          </div>

          {/* Optional: Additional Information */}
          <div className="mt-16 text-center">
            <p className="text-sm text-gray-500">
              Join the growing community of Yale-affiliated startups and entrepreneurs
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
