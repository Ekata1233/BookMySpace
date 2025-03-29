import ExploreOffice from "./componants/exploreOffice/page";
import Hero from "./componants/Hero";
import OurAmenites from "./componants/ourAmenites/page";
import OfficeTour from "./componants/OfficeTour/page";
import WorkBusiness from "./componants/workBusiness/page";
import SecondWorkBusiness from "./componants/secondWorkBusiness/page";
import ThirdWorkBusiness from "./componants/thirdWorkBusiness/page";
import Offices from "./componants/offices/page";
import Boxes from "./componants/boxes/page";
import OfficeDetails from "./componants/officeDetails/page";


export default function Home() {
  return (
    <main className="mt-16">
      <Hero/>
      <OfficeDetails />
      <Offices />
      <OfficeTour/>  
      <WorkBusiness />    
      <SecondWorkBusiness />
      <ThirdWorkBusiness />
      <ExploreOffice />
      <OurAmenites /> 
      
    </main>
  );
}