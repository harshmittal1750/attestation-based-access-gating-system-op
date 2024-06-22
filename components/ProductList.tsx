import React, { useEffect, useState, useCallback } from "react";
import { useContract } from "@/src/hooks/useContract";
import { Feature, Product } from "@/pages/products/Products";

const ProductList = () => {
  const { getProductCount, getProduct, getFeature } = useContract();
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = useCallback(async () => {
    try {
      const count = await getProductCount();
      const productsArray: Product[] = [];
      for (let i = 0; i < Number(count); i++) {
        const product = (await getProduct(i)) as Product;
        const featuresArray: Feature[] = [];
        for (let j = 0; j < Number(product?.featureCount) || 0; j++) {
          const feature = await getFeature(i, j);
          if (feature) {
            featuresArray.push(feature);
          }
        }
        if (product) {
          product.features = featuresArray;
          productsArray.push(product);
        }
      }
      setProducts(productsArray);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, [getProductCount, getProduct, getFeature]);

  useEffect(() => {
    fetchProducts();
    const interval = setInterval(fetchProducts, 60000); // Fetch products every 60 seconds
    return () => {
      clearInterval(interval);
    };
  }, [fetchProducts]);

  useEffect(() => {
    console.log(products);
  }, [products]);

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id?.toString()}>
            <p>Name: {product.name}</p>
            <p>Company Name: {product.companyName}</p>
            <p>Description: {product.description}</p>
            <p>Email: {product.email}</p>
            <p>Feature Count: {product.featureCount?.toString() || ""}</p>
            <ul>
              {product.features !== undefined &&
                product.features.map((feature) => (
                  <li key={feature.id}>
                    <p>Feature ID: {feature.id?.toString() || ""}</p>
                    <p>Description: {feature.description}</p>
                    <p>
                      Required Attestations:{" "}
                      {feature.requiredAttestations.join(", ")}
                    </p>
                  </li>
                ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
