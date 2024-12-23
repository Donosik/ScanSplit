import style from "./LoggedUserData.module.css"
import {useState} from "react";

export function LoggedUserData()
{
    const [profileName, setProfileName] = useState<string>("Ania")

    //TODO: Get profile name and profile picture from server
    return (
        <div className={style.wrapper}>
            <div className={style.profileData}>
                <img className={style.profilePicture}  alt={"profile picture"}/>
                <span className={style.profileName}>{profileName}</span>
            </div>
        </div>
    );
}
