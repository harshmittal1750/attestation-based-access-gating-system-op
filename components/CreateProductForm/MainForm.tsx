import { FormNavigation } from "./FormNavigation";
import { useCreateFormStore } from "@/zustand/useCreateFormStore";
import DefineProductForm from "./DefineProductForm";
import AttestationForm from "./AttestationForm";

const MainForm = () => {
  const { currentStep } = useCreateFormStore();

  return (
    <div className="main-form container">
      <FormNavigation />
      {currentStep === 1 && <DefineProductForm />}
      {currentStep === 2 && <AttestationForm />}
    </div>
  );
};

export default MainForm;
