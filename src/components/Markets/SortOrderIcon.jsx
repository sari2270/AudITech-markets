import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";

const SortOrderIcon = ({ order }) => {
  let icon;
  switch (order) {
    case "default":
      icon = null;
      break;
    case "up":
      icon = <AiOutlineUp />;
      break;
    case "down":
      icon = <AiOutlineDown />;
      break;
    default:
      icon = null;

      break;
  }
  return <>{icon}</>;
};

export default SortOrderIcon;
