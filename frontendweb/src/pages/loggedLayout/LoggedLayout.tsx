import {Outlet} from "react-router-dom";
import style from "./LoggedLayout.module.css";
import {LoggedHeader} from "../../components/loggedHeader/LoggedHeader.tsx";

export function LoggedLayout()
{
    return (
        <div className={style.wrapper}>
            <div className={style.header}>
                <LoggedHeader/>
            </div>
            <Outlet/>
        </div>
    );
}
