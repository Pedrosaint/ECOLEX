import ListOfCampus from "../components/list-of-campus"
import SearchCampusComp from "../components/search-campus-comp"

const CampusView = () => {
  return (
    <div>
      <SearchCampusComp />
      <div className="mt-5">
        <ListOfCampus />
      </div>
    </div>
  )
}

export default CampusView
