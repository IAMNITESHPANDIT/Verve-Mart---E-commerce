import "./category.style.scss";
interface catProps {
  data: any;
}
const CategoryList: React.FC<catProps> = ({ data }) => {
  return (
    <div className="category-list">
      {data.length > 0 &&
        data.map((item: any) => {
          return (
            <div className="category" key={item?.categoryId}>
              <span className="icon">
                <img src={item?.image} alt={item?.name} />
              </span>
              <span className="label">{item?.name}</span>
            </div>
          );
        })}

      {/* Add more categories here */}
    </div>
  );
};

export default CategoryList;
