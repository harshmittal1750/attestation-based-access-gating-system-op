import { useCreateFormStore } from "@/zustand/useCreateFormStore";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const DefineProductForm = () => {
  const { formData, updateFormData, setCurrentStep } = useCreateFormStore();
  const { name, contact, description, urlName } = formData.step1;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setCurrentStep(2);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-5">
      <div className="space-y-4">
        <Input
          type="text"
          value={name}
          onChange={(e) => updateFormData("step1", { name: e.target.value })}
          placeholder="Product Name"
          className="input border rounded-lg p-3 w-full"
        />
        <Input
          type="text"
          value={urlName}
          onChange={(e) => updateFormData("step1", { urlName: e.target.value })}
          placeholder="URL Name (e.g., company-name)"
          className="input border rounded-lg p-3 w-full"
        />
        <textarea
          value={description}
          onChange={(e) =>
            updateFormData("step1", { description: e.target.value })
          }
          placeholder="Brief Description"
          className="input border rounded-lg p-3 w-full"
          rows={3}
        />
        <Input
          type="text"
          value={contact}
          onChange={(e) => updateFormData("step1", { contact: e.target.value })}
          placeholder="Contact Email"
          className="input border rounded-lg p-3 w-full"
        />
      </div>
      <Button type="submit">Continue</Button>
    </form>
  );
};

export default DefineProductForm;
