import { NavLink, Link } from "react-router-dom";
import classes from "./MainNavigation.module.css";

export default function MainNav(props) {
  return (
    <>
      <header className={classes.header}>
        <div className={classes.logo}>
          <Link to="/">Greate Quotes</Link>
        </div>
        <nav className={classes.nav}>
          <ul>
            <li>
              <NavLink
                to={"/quotes"}
                className={(navData) =>
                  navData.isActive ? classes.active : ""
                }
              >
                All qoutes
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/new-quote"}
                className={(navData) =>
                  navData.isActive ? classes.active : ""
                }
              >
                Add new qoute
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
