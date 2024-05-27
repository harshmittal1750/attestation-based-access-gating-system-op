import React from "react";
import { ProductsData } from "./ProductsData";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

function Products() {
  return (
    <div>
      {/* <div className="text-3xl">Products</div> */}
      <div className="grid grid-cols-3">
        {ProductsData.map((product) => {
          return (
            <Link key={product.slug} href={`products/${product.slug}`} passHref>
              <CardTitle>{product.name}</CardTitle>

              <CardContent className="">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={200}
                  height={200}
                />
                <Badge>Features:{product.features}</Badge>
              </CardContent>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Products;
