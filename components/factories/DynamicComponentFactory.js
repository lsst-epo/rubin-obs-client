import PropTypes from "prop-types";
import EventList from "@/components/dynamic/EventList";
import GalleryList from "@/dynamic/GalleryList";
import JobList from "@/dynamic/JobList";
import NewsList from "@/dynamic/NewsList";
import RelatedList from "@/dynamic/RelatedList";
import SearchList from "@/dynamic/SearchList";
import SlideshowList from "@/dynamic/SlideshowList";
import StaffList from "@/dynamic/StaffList";
import TempList from "@/dynamic/TempList";

const componentMap = {
  alertStream: TempList,
  events: EventList,
  galleryItems: GalleryList,
  jobs: JobList,
  news: NewsList,
  newsPosts: NewsList,
  pressReleases: NewsList,
  relatedContent: RelatedList,
  search: SearchList,
  slideshows: SlideshowList,
  staffProfiles: StaffList,
  nonScientificStaff: StaffList,
  scientificStaff: StaffList,
  telescopeStatus: TempList,
};

export default function DynamicComponentFactory({ componentType, pageId }) {
  const Component = componentMap[componentType];
  if (!Component) return null;
  return <Component pageId={pageId} component={componentType} />;
}

DynamicComponentFactory.propTypes = {
  componentType: PropTypes.string.isRequired,
  pageId: PropTypes.string.isRequired,
};
