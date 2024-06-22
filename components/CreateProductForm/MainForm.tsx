import { FormNavigation } from "./FormNavigation";
import { useCreateFormStore } from "@/zustand/useCreateFormStore";
import DefineProductForm from "./DefineProductForm";
import AddFeaturesForm from "./AddFeaturesForm";

const MainForm = () => {
  const { currentStep } = useCreateFormStore();

  return (
    <div className="main-form container">
      <FormNavigation />
      {currentStep === 1 && <DefineProductForm />}
      {currentStep === 2 && <AddFeaturesForm />}
    </div>
  );
};

export default MainForm;
