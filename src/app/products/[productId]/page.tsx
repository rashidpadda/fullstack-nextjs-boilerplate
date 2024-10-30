export default function ProductDetails({
  params,
}: {
  params: { productId: string };
}) {
  return <h3>Detail about product {params.productId}</h3>;
}
