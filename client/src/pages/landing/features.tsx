import jobAppFeatures from "./feat";

export default function Features() {
  return (
    <div className="w-full bg-zinc-50 border">
      <div className="px-4 md:px-28 py-16">
        <div className="font-Aeonik text-center">
          <p className="text-sm md:text-xl">Everything at glance</p>
          <p className="text-6xl md:text-8xl">Features</p>
        </div>

        <div className="py-10 md:px-32">
          <div className="grid grid-cols-4 md:grid-cols-12 gap-4 md:gap-8 py-10">
            {/* <div className="col-span-4 flex flex-col bg-[#74C69D] py-20 px-10 w-11/12 rounded-[40px]">
              <div>
                <img src={eye} />
              </div>
              <div className="pt-10 space-y-2">
                <h1 className="text-[#D8F3DC] text-xl">Pixel Tracking</h1>
                <p className="text-[#C7F9CC] font-normal">
                  Real-time monitoring for insights into user interactions and
                  application strategies.
                </p>
              </div>
            </div> */}

            {jobAppFeatures.map((feature, index) => (
              <div
                key={index}
                style={{ backgroundColor: feature.bgColor }}
                className="col-span-2 md:col-span-4 flex flex-col py-6 px-6 rounded-md md:py-20 md:px-10 md:rounded-[40px]"
              >
                <div>
                  <feature.icon color={feature.titleColor} className="p-1 md:p-0"/>
                </div>
                <div className="md:pt-10 space-y-2">
                  <h1 style={{ color: feature.titleColor }} className="text-[12px] md:text-xl">
                    {feature.title}
                  </h1>
                  <p
                    style={{ color: feature.descriptionColor }}
                    className="text-[10px] md:text-sm"
                  >
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
