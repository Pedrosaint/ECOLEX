
import ListOfClasses from "../components/list-of-classes"
import SearchClassComp from "../components/search-class-comp"


const ClassesView = () => {
  return (
    <div>
      <SearchClassComp />
      <div className="mt-5">
        <ListOfClasses />
      </div>
    </div>
  );
}

export default ClassesView
