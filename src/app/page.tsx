import ExploreOffice from "./componants/exploreOffice/page";
import Hero from "./componants/Hero";
import OurAmenites from "./componants/ourAmenites/page";
import OfficeTour from "./componants/OfficeTour/page";
import WorkBusiness from "./componants/workBusiness/page";
import SecondWorkBusiness from "./componants/secondWorkBusiness/page";
import ThirdWorkBusiness from "./componants/thirdWorkBusiness/page";
import Offices from "./componants/offices/page";
import Boxes from "./componants/boxes/page";


export default function Home() {
  return (
    <main className="mt-16">
      <Hero/>
      <Boxes/>
      <Offices />
      <OfficeTour/>  
<<<<<<< HEAD
        
        
      
=======
>>>>>>> e58d0e28c6bc227f101d5c3872daca942d7c0b84
      <WorkBusiness />    
      <SecondWorkBusiness />
      <ThirdWorkBusiness />
      <ExploreOffice />
<<<<<<< HEAD
      <OurAmenites />
=======
      <OurAmenites /> 
>>>>>>> e58d0e28c6bc227f101d5c3872daca942d7c0b84
      
    </main>
  );
}