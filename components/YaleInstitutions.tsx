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
      logo: "/SEAS.png"
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
    <section className="bg-white/80 backdrop-blur-lg border-t border-gray-100 py-16 mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-center text-blue-900 mb-12">
          Featuring Startups From
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
          {institutions.map((institution) => (
            <div
              key={institution.name}
              className="w-full h-24 flex items-center justify-center p-4"
            >
              <img
                src={institution.logo}
                alt={`${institution.name} logo`}
                className="max-h-full max-w-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default YaleInstitutions;
