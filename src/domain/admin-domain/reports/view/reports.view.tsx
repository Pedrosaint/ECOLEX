import ListOfReport from "../components/list-of-reports"
import ResultCheckForm from "../components/result-check-form"


const ReportsView = () => {
  return (
    <div>
      <ListOfReport />
      <div className="mt-5">
        <ResultCheckForm />
      </div>
    </div>
  )
}

export default ReportsView
