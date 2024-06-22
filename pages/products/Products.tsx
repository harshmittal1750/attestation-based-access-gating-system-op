import React, { useEffect, useState, useCallback } from "react";
import { useContract } from "@/src/hooks/useContract";
import Image from "next/image";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import BigNumber from "bignumber.js";

export interface Feature {
  id: number;
  description: string;
  requiredAttestations: number[];
}

export interface Product {
  id: BigNumber;
  name: string;
  companyName: string;
  description: string;
  email: string;
  featureCount: BigNumber;
  features?: Feature[];
}

const Products = () => {
  const { getProductCount, getProduct, getFeature } = useContract();
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = useCallback(async () => {
    try {
      const count = await getProductCount();
      const productsArray: Product[] = [];
      for (let i = 0; i < Number(count); i++) {
        const product = (await getProduct(i)) as Product;
        if (product) {
          const featuresArray: Feature[] = [];
          for (let j = 0; j < Number(product.featureCount); j++) {
            const feature = await getFeature(i, j);
            if (feature) {
              featuresArray.push(feature);
            }
          }
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

  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        {products.map((product) => (
          <Link
            key={product.id.toString()}
            href={`products/${product.id}`}
            passHref
          >
            <Card className="cursor-pointer">
              <CardTitle>{product.name}</CardTitle>
              <CardContent>
                <Image
                  src="https://via.placeholder.com/150"
                  alt={product.name}
                  width={200}
                  height={200}
                />
                <Badge>Features: {product.featureCount.toString()}</Badge>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Products;
