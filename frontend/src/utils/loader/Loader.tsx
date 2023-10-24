import { Loader, Placeholder } from "rsuite";
import "./load.style.scss";
interface Iprops {
  loading?: boolean;
}
const GenricLoader: React.FC<Iprops> = ({ loading }) => {
  return (
    <>
      {loading && (
        <div className="loader-style">
          <Placeholder.Paragraph rows={8} />
          <Loader center content="loading" />
        </div>
      )}
    </>
  );
};

export default GenricLoader;
