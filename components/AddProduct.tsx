import React, { useState } from "react";
import { useContract } from "@/src/hooks/useContract";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [features, setFeatures] = useState([
    { description: "", requiredAttestations: "" },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Initialize the contract instance with a signer
  const { ContractInstance, signer } = useContract();

  const handleAddProduct = async () => {
    if (!productName || !companyName || !description || !email) return;
    setLoading(true);
    setError("");
    try {
      const contractWithSigner =
        ContractInstance && ContractInstance.connect(signer);
      const featureDescriptions = features.map((f) => f.description);
      const requiredAttestations = features.map((f) =>
        f.requiredAttestations.split(",").map(Number)
      );
      const transactionResponse = await (contractWithSigner &&
        contractWithSigner.addProduct(
          productName,
          companyName,
          description,
          email,
          featureDescriptions,
          requiredAttestations
        ));
      await (transactionResponse && transactionResponse.wait()); // Wait for the transaction to be mined
      console.log("Product added!");
      // Clear input fields after successful addition
      setProductName("");
      setCompanyName("");
      setDescription("");
      setEmail("");
      setFeatures([{ description: "", requiredAttestations: "" }]);
    } catch (err: any) {
      console.error("Error adding product:", err);
      setError(err.message || String(err));
    }
    setLoading(false);
  };

  const handleFeatureChange = (index: number, field: string, value: string) => {
    const newFeatures = [...features];
    (newFeatures[index] as { [key: string]: string })[field] = value;
    setFeatures(newFeatures);
  };

  const handleAddFeature = () => {
    setFeatures([...features, { description: "", requiredAttestations: "" }]);
  };

  return (
    <div>
      <input
        type="text"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        placeholder="Enter Product Name"
        disabled={loading}
      />
      <input
        type="text"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
        placeholder="Enter Company Name"
        disabled={loading}
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter Description"
        disabled={loading}
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter Email"
        disabled={loading}
      />
      {features.map((feature, index) => (
        <div key={index}>
          <input
            type="text"
            value={feature.description}
            onChange={(e) =>
              handleFeatureChange(index, "description", e.target.value)
            }
            placeholder="Enter Feature Description"
            disabled={loading}
          />
          <input
            type="text"
            value={feature.requiredAttestations}
            onChange={(e) =>
              handleFeatureChange(index, "requiredAttestations", e.target.value)
            }
            placeholder="Enter Required Attestations (comma-separated)"
            disabled={loading}
          />
        </div>
      ))}
      <button onClick={handleAddFeature} disabled={loading}>
        Add Feature
      </button>
      <button onClick={handleAddProduct} disabled={loading}>
        Add Product
      </button>
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default AddProduct;
