import { Outlet } from "react-router-dom";
import Directory from "../../component/directory/directory.component";
import { Fragment } from "react";

const Home = () => {
    return (
        <Fragment >
            <Outlet />
            <Directory />
        </Fragment>
    );
}

export default Home;