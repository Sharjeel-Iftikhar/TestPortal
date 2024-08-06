
const CheckboxWithValidation = ({ isChecked, setIsChecked, showError }) => {

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
   
  };

  return (
    <>
    <div className="flex items-center mt-6">
      <input
        type="checkbox"
        id="terms-and-conditions"
        className="h-4 w-4 text-blue-600 border-gray-300 rounded"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <label htmlFor="terms-and-conditions" className="ml-2 text-sm text-gray-700 ">
        By signing up I agree to{' '}
        <a
          href="/en/legal/terms-and-conditions/"
          title="Terms & Conditions"
          className="text-green-600 "
          target="_blank"
          rel="noopener noreferrer"
        >
          Terms & Conditions
        </a>{' '}
        and{' '}
        <a
          href="/en/legal/privacy-policy/"
          title="Privacy Policy"
          className="text-green-600"
          target="_blank"
          rel="noopener noreferrer"
        >
          Privacy Policy
        </a>
        .
      </label>
      
    </div>
    {showError && !isChecked && (
        <p className="ml-7 mt-1 text-xs" style={{ fontSize: '.75rem', color: '#ff7067' }}>
          Your consent is required
        </p>
    )}
    
    </>
    
  );
};

export default CheckboxWithValidation;
