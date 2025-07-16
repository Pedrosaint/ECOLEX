import ListOfStaff from '../components/list-of-staff'
import SearchStaffComp from '../components/search-staff-comp'

const Staffs = () => {
  return (
    <div>
      <SearchStaffComp />
      <div className="mt-5">
        <ListOfStaff />
      </div>
    </div>
  );
}

export default Staffs
