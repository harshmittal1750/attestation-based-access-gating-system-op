import { useCreateFormStore } from "@/zustand/useCreateFormStore";
import { Input } from "../ui/input";

const AttestationForm = () => {
  const { formData, updateFormData, setCurrentStep } = useCreateFormStore();
  const { attestations } = formData.step2;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setCurrentStep(3);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-5">
      <div className="mb-6">
        <label
          htmlFor="attestations"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Attestations
        </label>
        <Input
          type="text"
          id="attestations"
          value={attestations}
          onChange={
            (e) => updateFormData("step2", { attestations: e.target.value }) // Corrected step reference
          }
          placeholder="Enter attestations"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <button
        type="submit"
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Continue
      </button>
    </form>
  );
};

export default AttestationForm;
