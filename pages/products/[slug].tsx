import { GetStaticProps, GetStaticPaths } from "next";
import AttestationByUID from "@/components/AttestationByUID";
import { Attestations } from "@/components/Attestations";
import useStore from "@/zustand/useStore";
import AttestationManager from "@/components/AttestationManager";
import { ProductsData } from "./Products";

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: ProductsData.map((product) => ({
      params: { slug: product.slug },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params!;
  const product = ProductsData.find((p) => p.slug === slug);
  return { props: { product } };
};

const Product = ({
  product,
}: {
  product: {
    name: string;
    image: string;
    features: string;
  };
}) => {
  const recipientAddress = useStore((state) => state.address) || "";
  return (
    <div className="container">
      <div className="text-4xl">{product.name}</div>
      <img src={product.image} alt={product.name} />
      <p>Features: {product.features}</p>

      <AttestationByUID />
      <Attestations recipientAddress={recipientAddress} />
      <AttestationManager />
    </div>
  );
};

export default Product;
