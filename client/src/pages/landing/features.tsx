import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import jobAppFeatures from "./feat";

export default function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0 });
  const control = useAnimation();

  const boxVariant = {
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    hidden: { opacity: 0, scale: 0 },
  };

  useEffect(() => {
    if (isInView) {
      control.start("visible");
    } else {
      control.start("hidden");
    }
  }, [control, isInView]);

  return (
    <section
      id="features"
      className="w-full bg-[#FAFAFA] border border-[#f4f4f4]"
    >
      <div className="px-4 md:px-28 py-16">
        <div className="font-Aeonik text-center">
          <p className="text-sm md:text-xl">Everything at glance</p>
          <p className="text-6xl md:text-8xl">Features</p>
        </div>

        <div className="py-10 md:px-32">
          <div
            className="grid grid-cols-4 md:grid-cols-12 gap-4 md:gap-8 py-10"
            ref={ref}
          >
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
              <motion.div
                variants={boxVariant}
                initial="hidden"
                animate={control}
                key={index}
                style={{ backgroundColor: feature.bgColor }}
                className="col-span-2 md:col-span-4 flex flex-col py-6 px-6 rounded-md md:py-20 md:px-10 md:rounded-[40px]"
              >
                <div>
                  <feature.icon
                    color={feature.titleColor}
                    className="p-1 md:p-0"
                  />
                </div>
                <div className="md:pt-10 space-y-2">
                  <h1
                    style={{ color: feature.titleColor }}
                    className="text-[12px] md:text-xl"
                  >
                    {feature.title}
                  </h1>
                  <p
                    style={{ color: feature.descriptionColor }}
                    className="text-[10px] md:text-sm"
                  >
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
