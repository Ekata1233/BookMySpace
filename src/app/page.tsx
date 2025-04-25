import ExploreOffice from "./componants/exploreOffice/page";
import Hero from "./componants/Hero";
import OurAmenites from "./componants/ourAmenites/page";
import OfficeTour from "./componants/OfficeTour/page";
import WorkBusiness from "./componants/workBusiness/page";
import SecondWorkBusiness from "./componants/secondWorkBusiness/page";
import ThirdWorkBusiness from "./componants/thirdWorkBusiness/page";
import Offices from "./componants/officeSpace/page";
import Boxes from "./componants/boxes/page";
import OfficeDetails from "./componants/officeDetails/page";
import TimeCalender from "./componants/calender/page";
import IndiaMap from "./componants/MapComponent/page";
import Loader from "./componants/loader/page";
import FAQs from "./faq/page";

export default function Home() {
  return (
    <main className="mt-16">
      <Hero />
      <Offices />
      <OfficeTour />
      <WorkBusiness />
      {/* <Loader /> */}
      <ExploreOffice />
      <OurAmenites />
      <div className="mt-0">
        <FAQs />
      </div>
    </main>
  );
}
