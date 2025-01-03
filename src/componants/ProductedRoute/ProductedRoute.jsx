import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { userContext } from "../../context/user.context";

export default function ProductedRoute({ children }) {
  let { token } = useContext(userContext);
  if (token) {
    return children;
  } else {
    return <Navigate to="/getstart" />;
  }
}
