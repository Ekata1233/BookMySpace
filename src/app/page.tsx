import ExploreOffice from "./componants/exploreOffice/page";
import Hero from "./componants/Hero";


export default function Home() {
  return (
    <main className="mt-16">
      <Hero/>
      <ExploreOffice />
    </main>
  );
}