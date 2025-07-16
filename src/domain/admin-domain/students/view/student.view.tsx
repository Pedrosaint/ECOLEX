import ListOfStudent from '../components/list-of-student'
import SearchComp from '../components/search-comp'

const StudentView = () => {
  return (
    <div>
      <SearchComp />
      <div className="mt-5">
        <ListOfStudent />
      </div>
    </div>
  );
}

export default StudentView
