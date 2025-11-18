import CompanyRegistrationForm from "@/components/my-components/CompanyRegistrationForm";
import CompanyRegistrationInfo from "@/components/my-components/CompanyRegistrationInfo";

const CompanyRegistration: React.FC = () => {
  return (
    <div
      id="company-registration-container"
      className="flex w-full mt-5 justify-center"
    >
      <div
        id="inner-container"
        className="flex w-10/12 md:flex-row items-center flex-col md:space-y-0 md:space-x-28 mb-16"
      >
        <CompanyRegistrationForm />
        <CompanyRegistrationInfo />
      </div>
    </div>
  );
};

export default CompanyRegistration;
