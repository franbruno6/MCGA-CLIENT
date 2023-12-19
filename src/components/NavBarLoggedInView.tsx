import { Button, Navbar } from "react-bootstrap";
import { User } from "../models/user"
import * as GymClassesApi from "../network/gymclasses_api"

interface NavBarLoggedInViewProps {
    user: User,
    onLogOutSuccesful: () => void,
}

function NavBarLoggedInView({ user, onLogOutSuccesful}: NavBarLoggedInViewProps) {

    async function logOut() {
        try {
            await GymClassesApi.logOut();
            onLogOutSuccesful();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
        <Navbar.Text className="me-2">
            Signed in as: {user.username}
        </Navbar.Text>
        <Button onClick={logOut}>
            Log Out
        </Button>
        </>
    );
}

export default NavBarLoggedInView