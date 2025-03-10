import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectAuthLoading } from "../redux/auth/authSelectors";
import { Navigate } from "react-router-dom";
import Loader from "../components/Loader/Loader";

const PrivateRoute = ({ children, redirectTo = "/" }) => {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const isLoading = useSelector(selectAuthLoading);

    if (isLoading) {
        return <Loader />;
    }

    return isLoggedIn ? children : <Navigate to={redirectTo} />;
};

export default PrivateRoute;
