const YaleInstitutions = () => {
  const institutions = [
    {
      name: "School of Management",
      logo: "/SOM.png"
    },
    {
      name: "College",
      logo: "/College.png"
    },
    {
      name: "School of Engineering",
      logo: "/SEAS.jpg"
    },
    {
      name: "School of Public Health",
      logo: "/MPH.png"
    },
    {
      name: "Faculty of Arts & Sciences",
      logo: "/Faculty.png"
    },
    {
      name: "University Alumni",
      logo: "/Alumni.png"
    }
  ];

  return (
    <section className="bg-white/80 backdrop-blur-lg border-t border-gray-100 py-16 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">
          Featuring Startups From
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {institutions.map((institution) => (
            <div
              key={institution.name}
              className="flex flex-col items-center space-y-4 group"
            >
              <div className="w-full h-32 flex items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                <img
                  src={institution.logo}
                  alt={`${institution.name} logo`}
                  className="max-h-full max-w-full object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>
              <p className="text-sm text-gray-700 font-medium text-center leading-tight group-hover:text-blue-900 transition-colors duration-300">
                {institution.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default YaleInstitutions;
