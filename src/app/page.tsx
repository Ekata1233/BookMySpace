import ExploreOffice from "./componants/exploreOffice/page";
import Hero from "./componants/Hero";
import OurAmenites from "./componants/ourAmenites/page";


export default function Home() {
  return (
    <main className="mt-16">
      <Hero/>
      <ExploreOffice />
      <OurAmenites />
    </main>
  );
}