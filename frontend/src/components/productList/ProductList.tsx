import ProductCard from "../productCard/ProductCard";

interface Iprops {
  products: Array<item>;
}
interface item {
  id: number;
  image: string;
  title: string;
  price: string | number;
  ratings: string | number;
}

const ProductList: React.FC<Iprops> = ({ products }) => {
  return (
    <div className="product-list">
      {products.map((product: item) => (
        <ProductCard
          key={product.id}
          image={product.image}
          title={product.title}
          price={product.price}
          ratings={product.ratings}
        />
      ))}
    </div>
  );
};

export default ProductList;
