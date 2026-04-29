import GradingScheme from "../components/grading-scheme";

const GradingSchemeView = () => {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">Grading Scheme</h2>
        <p className="text-sm text-gray-500 mt-1">
          Set up grading boundaries and assign them to classes.
        </p>
      </div>
      <GradingScheme />
    </div>
  );
};

export default GradingSchemeView;
