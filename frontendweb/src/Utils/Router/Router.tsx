import {BrowserRouter, Route, Routes} from "react-router-dom";
import AddNewBill from "../../pages/addNewBill/AddNewBill.tsx";
import {NotFound} from "../../pages/notfound/NotFound.tsx";
import {LoggedLayout} from "../../pages/loggedLayout/LoggedLayout.tsx";
import {AvailableRoutes} from "./AvailableRoutes.ts";

export function Router()
{
    return (
        <BrowserRouter>
            <Routes>
                <Route path={AvailableRoutes.HOME} element={<LoggedLayout/>}>
                    <Route index={true} element={<AddNewBill/>} />
                </Route>
                <Route path={"*"} element={<NotFound/>} />
            </Routes>
        </BrowserRouter>
    );
}
