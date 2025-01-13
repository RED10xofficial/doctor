'use client';
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { ChevronUpIcon } from "lucide-react";

export default function Modules() {
    const items = [
        {
          section: "Automotive",
          units: [
            { unitName: "Tires", smallDescription: "High-performance tires for your vehicle" },
            { unitName: "Brakes", smallDescription: "Reliable braking system components" },
            { unitName: "Engine Oil", smallDescription: "Premium engine lubricants" },
            { unitName: "Windshield Wipers", smallDescription: "Durable and effective wiper blades" },
            { unitName: "Car Batteries", smallDescription: "Long-lasting automotive batteries" },
            { unitName: "Spark Plugs", smallDescription: "Optimized ignition components" },
            { unitName: "Air Filters", smallDescription: "Improve engine performance" },
            { unitName: "Headlights", smallDescription: "Bright and energy-efficient lighting" },
            { unitName: "Wheel Alignment", smallDescription: "Ensure proper wheel positioning" },
            { unitName: "Coolant", smallDescription: "Prevent engine overheating" },
            { unitName: "Fuel Injectors", smallDescription: "Enhance fuel efficiency" },
            { unitName: "Shock Absorbers", smallDescription: "Smooth ride quality" }
          ]
        },
        {
          section: "Electronics",
          units: [
            { unitName: "Smartphones", smallDescription: "Latest models with advanced features" },
            { unitName: "Laptops", smallDescription: "Powerful and portable computing solutions" },
            { unitName: "Televisions", smallDescription: "Immersive home entertainment experience" },
            { unitName: "Headphones", smallDescription: "High-quality audio for music enthusiasts" },
            { unitName: "Cameras", smallDescription: "Capture stunning photos and videos" },
            { unitName: "Tablets", smallDescription: "Versatile and portable computing devices" },
            { unitName: "Smartwatches", smallDescription: "Seamless integration with your smartphone" },
            { unitName: "Gaming Consoles", smallDescription: "Immersive gaming experiences" },
            { unitName: "Speakers", smallDescription: "Powerful and immersive audio systems" },
            { unitName: "Drones", smallDescription: "Aerial photography and videography" },
            { unitName: "Fitness Trackers", smallDescription: "Monitor your health and activity" },
            { unitName: "Smart Home Devices", smallDescription: "Automate and control your home" }
          ]
        },
        {
          section: "Home Improvement",
          units: [
            { unitName: "Power Tools", smallDescription: "Efficient and durable tools for DIY projects" },
            { unitName: "Hand Tools", smallDescription: "Essential tools for home maintenance" },
            { unitName: "Plumbing Supplies", smallDescription: "Reliable plumbing components" },
            { unitName: "Lighting Fixtures", smallDescription: "Enhance the ambiance of your home" },
            { unitName: "Paint and Stains", smallDescription: "Transform the look of your spaces" },
            { unitName: "Flooring", smallDescription: "Durable and stylish flooring options" },
            { unitName: "Gardening Tools", smallDescription: "Maintain a beautiful outdoor space" },
            { unitName: "Insulation", smallDescription: "Improve energy efficiency and comfort" },
            { unitName: "Windows and Doors", smallDescription: "Enhance the curb appeal of your home" },
            { unitName: "Roofing Supplies", smallDescription: "Protect your home from the elements" },
            { unitName: "Electrical Supplies", smallDescription: "Ensure safe and reliable electrical systems" },
            { unitName: "Appliances", smallDescription: "Upgrade your home with modern appliances" }
          ]
        },
        // 17 more sections with random names and units
      ];
    return (
        <div className="sticky top-[30px] h-[calc(100vh-30px)] bg-white shadow-lg mb-8 rounded-lg">
            <div className=" p-4  max-h-full overflow-y-auto overflow-x-hidden ">
                <div className="w-[300px] space-y-2">
                    <div className="text-xl font-semibold mb-4">Course Modules</div>
                    {items.map((section, index) => (
                      <Disclosure key={index} as="div">
                        {({ open }) => (
                          <>
                            <DisclosureButton className="flex w-full justify-between rounded-lg bg-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-900 hover:bg-sky-200 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75">
                              <span>{section.section}</span>
                              <ChevronUpIcon
                                className={`${
                                  open ? 'rotate-180 transform' : ''
                                } h-5 w-5 text-gray-500`}
                              />
                            </DisclosureButton>
                            <DisclosurePanel className="px-4 pt-2 pb-2 text-sm text-gray-500">
                              <div className="space-y-2">
                                {section.units.map((unit, unitIndex) => (
                                  <div key={unitIndex} className="cursor-pointer hover:bg-gray-50 p-2 rounded">
                                    <div className="font-medium text-gray-900">{unit.unitName}</div>
                                    <div className="text-xs text-gray-500">{unit.smallDescription}</div>
                                  </div>
                                ))}
                              </div>
                            </DisclosurePanel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                </div>
            </div>
        </div>
    );
}