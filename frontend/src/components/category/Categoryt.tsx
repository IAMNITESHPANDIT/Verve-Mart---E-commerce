import { useNavigate } from "react-router-dom";
import "./category.style.scss";
interface catProps {
  data: any;
}
const CategoryList: React.FC<catProps> = ({ data }) => {
  const navigate = useNavigate();

  const onNavigation = (categoryId: string, categoryName: string) => {
    navigate(`/${categoryName}/${categoryId}`);
    return;
  };
  return (
    <div className="category-list">
      {data.length > 0 &&
        data.map((item: any) => {
          return (
            <div
              className="category"
              key={item?.categoryId}
              onClick={() => onNavigation(item.categoryId, item.name)}
            >
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
