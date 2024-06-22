import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useContract } from "@/src/hooks/useContract";
import Image from "next/image";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AttestationByUID from "@/components/AttestationByUID";
import { Attestations } from "@/components/Attestations";
import AttestationManager from "@/components/AttestationManager";
import useStore from "@/zustand/useStore";
import { Feature, Product } from "./Products";
const ProductDetails = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { getProduct, getFeature } = useContract();
  const [product, setProduct] = useState<Product | null>(null);
  const [features, setFeatures] = useState<Feature[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      const productSlug =
        typeof slug === "string"
          ? parseInt(slug)
          : slug
          ? parseInt(slug[0])
          : null;
      if (!productSlug) return;
      setIsLoading(true);

      try {
        const prod = await getProduct(productSlug);
        if (prod) {
          setProduct(prod);
          const feats: Feature[] = [];

          for (let i = 0; i < Number(prod.featureCount); i++) {
            const feature = await getFeature(productSlug, i);
            if (feature) {
              feats.push(feature);
            }
          }
          setFeatures(feats);
        }
      } catch (error) {
        console.error("Failed to fetch product details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductDetails();
  }, [slug, getProduct, getFeature]);

  const recipientAddress = useStore((state) => state.address) || "";
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <div>
      <Card>
        <CardTitle>{product.name}</CardTitle>
        <CardContent>
          <Image
            src="https://via.placeholder.com/150"
            alt={product.name}
            width={200}
            height={200}
          />
          <p>{product.description}</p>
          <p>Company: {product.companyName}</p>
          <p>Email: {product.email}</p>
          <Badge>Features: {product.featureCount.toString()}</Badge>
          <ul>
            {features.map((feature, index) => (
              <li key={index}>
                <p>Feature: {feature.description}</p>
                <p>
                  Required Attestations:{" "}
                  {feature.requiredAttestations.join(", ")}
                </p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <AttestationByUID />
      <Attestations recipientAddress={recipientAddress} />
      <AttestationManager />
    </div>
  );
};

export default ProductDetails;
