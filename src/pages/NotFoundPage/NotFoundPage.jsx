import { Link } from "react-router-dom";
import s from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div className={s.container}>
      <h1 className={s.title}>404</h1>
      <p className={s.text}>Oops... Page is not found...</p>
      <Link to="/" className={s.link}>Go Home</Link>
    </div>);
};

export default NotFoundPage;
