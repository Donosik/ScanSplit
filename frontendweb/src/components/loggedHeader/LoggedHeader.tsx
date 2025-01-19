import style from './LoggedHeader.module.css'
import {NavLink} from "react-router-dom";
import {AvailableRoutes} from "../../utils/router/AvailableRoutes.ts";

export function LoggedHeader()
{
    return (
        <div className={style.header}>
            <NavLink to={AvailableRoutes.HOME} className={style.left}>
                <img alt={"logo"} className={style.logo}/>
                <span className={style.title}>
                    Event Cost Manager
                </span>
            </NavLink>
            <div className={style.navigation}>
                <NavLink className={style.navLink} to={AvailableRoutes.PROFILE} >Profile</NavLink>
                <NavLink className={style.navLink} to={AvailableRoutes.EVENTS} >Events</NavLink>
                <NavLink className={style.navLink} to={AvailableRoutes.BILLS} >Bills</NavLink>
            </div>
        </div>
    );
}
