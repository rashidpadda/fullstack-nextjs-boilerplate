export default async function ProductDetails(props: {
  params: Promise<{ productId: string }>;
}) {
  const params = await props.params;
  return <h3>Detail about product {params.productId}</h3>;
}
