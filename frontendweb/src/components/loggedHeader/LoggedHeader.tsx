import style from './LoggedHeader.module.css'
import {NavLink} from "react-router-dom";

export function LoggedHeader()
{
    return (
        <div className={style.header}>
            <NavLink to={"/"} className={style.left}>
                <img alt={"logo"} className={style.logo}/>
                <span className={style.title}>
                    Event Cost Manager
                </span>
            </NavLink>
            <div className={style.navigation}>
                <NavLink className={style.navLink} to={"/profile"} >Profile</NavLink>
                <NavLink className={style.navLink} to={"/events"} >Events</NavLink>
                <NavLink className={style.navLink} to={"/bills"} >Bills</NavLink>
            </div>
        </div>
    );
}
