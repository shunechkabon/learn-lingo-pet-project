import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/auth/authSelectors";
import { Navigate } from "react-router-dom";
import Loader from "../components/Loader/Loader";

const PrivateRoute = ({ children, redirectTo = "/" }) => {
    const isLoggedIn = useSelector(selectIsLoggedIn);

    if (isLoggedIn === undefined) {
        return <Loader />;
    }

    return isLoggedIn ? children : <Navigate to={redirectTo} />;
};

export default PrivateRoute;
