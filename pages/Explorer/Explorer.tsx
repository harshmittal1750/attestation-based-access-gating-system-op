import React from "react";
import Products from "../products/Products";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Explorer() {
  const router = useRouter();

  return (
    <div className="container mx-auto py-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Explorer</h1>
      <div className="flex justify-between items-center mb-6">
        <div className="space-x-4">
          <Button onClick={() => router.push("/your-products")}>
            Your Products
          </Button>
          <Button onClick={() => router.push("/explore")}>Explore</Button>
        </div>
        <Link href="/add" passHref>
          <Button>+ Add</Button>
        </Link>
      </div>
      <Products />
    </div>
  );
}

export default Explorer;
