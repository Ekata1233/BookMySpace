import ExploreOffice from "./componants/exploreOffice/page";
import Hero from "./componants/Hero";
import OurAmenites from "./componants/ourAmenites/page";
import OfficeTour from "./componants/OfficeTour/page";
import WorkBusiness from "./componants/workBusiness/page";
import SecondWorkBusiness from "./componants/secondWorkBusiness/page";


export default function Home() {
  return (
    <main className="mt-16">
      <Hero/>
      <OfficeTour/>  
      <WorkBusiness />    
      <SecondWorkBusiness />
      <ExploreOffice />
      <OurAmenites />
      
    </main>
  );
}