import MainNav from "./MainNav";
import classes from "./Layout.module.css";

export default function Layout(props) {
  return (
    <>
      <MainNav />
      <main className={classes.main}> {props.children} </main>
    </>
  );
}
