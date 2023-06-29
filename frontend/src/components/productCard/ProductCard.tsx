interface productCard {
  id?: number;
  image: string;
  title: string;
  price: string | number;
  ratings: string | number;
}

const ProductCard: React.FC<productCard> = ({
  image,
  title,
  price,
  ratings,
}) => {
  return (
    <div className="product-card">
      <img src={image} alt={title} />
      <h3 className="title">{title}</h3>
      <div className="price">{price}</div>
      <div className="ratings">{ratings}</div>
    </div>
  );
};

export default ProductCard;
