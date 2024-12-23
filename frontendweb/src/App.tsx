import {AllProviders} from "./utils/allProviders/AllProviders.tsx";
import {Router} from "./utils/router/Router.tsx";

export default function App()
{
    return (
            <AllProviders>
                <Router/>
            </AllProviders>
    )
}
