import { useCreateFormStore } from "@/zustand/useCreateFormStore";

export const FormNavigation = () => {
  const { currentStep, setCurrentStep } = useCreateFormStore();

  return (
    <div className="flex space-x-4 p-4">
      {[1, 2].map((step) => (
        <button
          key={step}
          onClick={() => setCurrentStep(step)}
          disabled={currentStep < step}
          className={`px-4 py-2 text-white font-medium rounded-md transition-colors duration-200 ease-in-out
            ${
              currentStep === step
                ? "bg-blue-600 hover:bg-blue-700"
                : currentStep > step
                ? "bg-green-500 hover:bg-green-600"
                : "bg-gray-400 cursor-not-allowed hover:bg-gray-400"
            }`}
        >
          {currentStep > step ? "✓ Completed" : `Step ${step}`}
        </button>
      ))}
    </div>
  );
};
