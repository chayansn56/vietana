import React, { lazy, Suspense } from "react";
import { AnimatePresence } from "motion/react";
import { useUIStore } from "../../contexts/UIContext";
import FloatingWhatsApp from "./FloatingWhatsApp";
import FloatingPlanner from "./FloatingPlanner";

const AIPlanner = lazy(() => import("../AIPlanner"));
const MagicMode = lazy(() => import("../MagicMode"));
const CustomTripBuilder = lazy(() => import("../CustomTripBuilder"));
const ExperiencesDrawer = lazy(() => import("../ExperiencesDrawer"));
const MapCurtain = lazy(() => import("../MapCurtain"));
const FlightSearchModal = lazy(() => import("../FlightSearchModal"));
const Contact = lazy(() => import("../Contact"));
const About = lazy(() => import("../About"));

const ModalFallback = () => (
  <div className="fixed inset-0 z-[200] bg-surface-dark flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-8 h-8 border-2 border-brand-gold border-t-transparent rounded-full animate-spin" />
      <span className="text-xs text-brand-gold/60 uppercase tracking-widest">Loading</span>
    </div>
  </div>
);

export const OverlayLayout: React.FC = () => {
  const {
    modals, setModalOpen, hasOpenModal,
    plannerInitialData, setPlannerInitialData,
    builderDestinations, setBuilderDestinations,
    builderSights, setBuilderSights
  } = useUIStore();

  const openPlanner = (destination?: string, prompt?: string) => {
    setPlannerInitialData({ destination, prompt });
    setModalOpen("planner", true);
  };

  return (
    <>
      {!hasOpenModal && <FloatingWhatsApp />}
      {!hasOpenModal && <FloatingPlanner onClick={() => openPlanner()} />}

      <AnimatePresence>
        {modals.planner && (
          <Suspense fallback={<ModalFallback />}>
            <AIPlanner
              isOpen={modals.planner}
              onClose={() => { setModalOpen("planner", false); setPlannerInitialData(null); }}
              initialDestination={plannerInitialData?.destination}
              initialPrompt={plannerInitialData?.prompt}
            />
          </Suspense>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {modals.magicMode && (
          <Suspense fallback={<ModalFallback />}>
            <MagicMode
              isOpen={modals.magicMode}
              onClose={() => setModalOpen("magicMode", false)}
              onOpenPlanner={(dest) => openPlanner(dest)}
              onOpenBuilder={() => { setBuilderDestinations([]); setModalOpen("builder", true); }}
              onOpenPackages={() => {
                const packagesSection = document.getElementById("experiences");
                if (packagesSection) {
                  packagesSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
            />
          </Suspense>
        )}
      </AnimatePresence>

      <Suspense fallback={<ModalFallback />}>
        <CustomTripBuilder
          isOpen={modals.builder}
          onClose={() => setModalOpen("builder", false)}
          initialDestinations={builderDestinations}
          initialSights={builderSights}
          onUpdateCities={setBuilderDestinations}
          onUpdateSights={setBuilderSights}
          onOpenAIPlanner={(prompt) => openPlanner(undefined, prompt)}
        />
        <ExperiencesDrawer
          isOpen={modals.experiences}
          onClose={() => setModalOpen("experiences", false)}
          onOpenPlanner={(dest) => openPlanner(dest)}
        />
        <MapCurtain
          isOpen={modals.map}
          onClose={() => setModalOpen("map", false)}
          onOpenPlanner={(dest) => openPlanner(dest)}
          selectedCities={builderDestinations}
          selectedSights={builderSights}
          onAddCity={(city) => {
            setBuilderDestinations((prev: string[]) => {
              const next = prev.includes(city) ? prev.filter((c: string) => c !== city) : [...prev, city];
              setModalOpen("builder", true);
              return next;
            });
          }}
          onAddSight={(city, sight) => {
            setBuilderDestinations((prev: string[]) => prev.includes(city) ? prev : [...prev, city]);
            setBuilderSights((prev: string[]) => prev.includes(sight) ? prev.filter((s: string) => s !== sight) : [...prev, sight]);
            setModalOpen("builder", true);
          }}
        />
        <Contact
          isOpen={modals.contact}
          onClose={() => setModalOpen("contact", false)}
        />
        <About
          isOpen={modals.about}
          onClose={() => setModalOpen("about", false)}
          onOpenBuilder={() => setModalOpen("builder", true)}
        />
        <FlightSearchModal
          isOpen={modals.flightSearch}
          onClose={() => setModalOpen("flightSearch", false)}
        />
      </Suspense>
    </>
  );
};

export default OverlayLayout;
