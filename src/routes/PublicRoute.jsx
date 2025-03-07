import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/auth/authSelectors";
import { Navigate } from "react-router-dom";
import Loader from "../components/Loader/Loader";

const PublicRoute = ({ children, restricted = false, redirectTo = "/" }) => {
    const isLoggedIn = useSelector(selectIsLoggedIn);

    if (isLoggedIn === undefined) {
        return <Loader />;
    }

    if (isLoggedIn && restricted) {
        return <Navigate to={redirectTo} />;
    }

    return children;
};

export default PublicRoute;
