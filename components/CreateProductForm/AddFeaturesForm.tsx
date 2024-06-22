import { useCreateFormStore } from "@/zustand/useCreateFormStore";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import React, { useState } from "react";
import { useContract } from "@/src/hooks/useContract";

const AddFeaturesForm = () => {
  const { formData, updateFormData, setCurrentStep } = useCreateFormStore();
  const { attestations } = formData.step2;
  const { name, contact, description, urlName } = formData.step1;
  const { ContractInstance, signer } = useContract();
  const [features, setFeatures] = useState([
    { description: "", requiredAttestations: "" },
  ]);

  const handleAddFeature = () => {
    setFeatures([...features, { description: "", requiredAttestations: "" }]);
  };

  const handleFeatureChange = (
    index: number,
    field: "description" | "requiredAttestations",
    value: string
  ) => {
    const newFeatures = [...features];
    newFeatures[index][field] = value;
    setFeatures(newFeatures);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const contractWithSigner =
        ContractInstance && ContractInstance.connect(signer);
      const featureDescriptions = features.map((f) => f.description);
      const requiredAttestations = features.map((f) =>
        f.requiredAttestations.split(",").map(Number)
      );

      const transactionResponse = await (contractWithSigner &&
        contractWithSigner.addProduct(
          name,
          urlName,
          description,
          contact,
          featureDescriptions,
          requiredAttestations
        ));
      await (transactionResponse && transactionResponse.wait());
      console.log("Product with features added!");

      // Clear form and return to step 1 or a confirmation step
      updateFormData("step1", {
        name: "",
        urlName: "",
        description: "",
        contact: "",
      });
      updateFormData("step2", { attestations: "" });
      setFeatures([{ description: "", requiredAttestations: "" }]);
      setCurrentStep(1);
    } catch (err) {
      console.error("Error adding product with features:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-5">
      <div className="space-y-4">
        {features.map((feature, index) => (
          <div key={index}>
            <Input
              type="text"
              value={feature.description}
              onChange={(e) =>
                handleFeatureChange(index, "description", e.target.value)
              }
              placeholder="Feature Description"
              className="input border rounded-lg p-3 w-full"
              required
            />
            <Input
              type="text"
              value={feature.requiredAttestations}
              onChange={(e) =>
                handleFeatureChange(
                  index,
                  "requiredAttestations",
                  e.target.value
                )
              }
              placeholder="Required Attestations (comma-separated) (numbers only)"
              className="input border rounded-lg p-3 w-full"
              required
            />
          </div>
        ))}
      </div>
      <Button type="button" onClick={handleAddFeature} className="my-2">
        Add Another Feature
      </Button>
      <Button type="submit" className="my-2">
        Submit Product
      </Button>
    </form>
  );
};

export default AddFeaturesForm;
