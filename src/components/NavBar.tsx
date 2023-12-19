import { Container, Nav, Navbar } from "react-bootstrap";
import { User } from "../models/user";
import NavBarLoggedInView from "./NavBarLoggedInView";
import NavBarLoggedOutView from "./NavBarLogedOutView";

interface NavBarProps {
    loggedInUser: User | null,
    onLoggedInClicked: () => void,
    onLogOutSuccesful: () => void,
}


const NavBar = ({ loggedInUser, onLoggedInClicked, onLogOutSuccesful }: NavBarProps) => {
    return (
        <Navbar bg="primary" variant="dark" expand="lg" sticky="top">
            <Container>
                <Navbar.Brand>
                    Gym Classes
                </Navbar.Brand>
            </Container>
            <Nav className="ms-auto">
                { loggedInUser 
                ? <NavBarLoggedInView user={loggedInUser} onLogOutSuccesful={onLogOutSuccesful} />
                : <NavBarLoggedOutView onLogInClicked={onLoggedInClicked} />
                }
            </Nav>
        </Navbar>
    );
}

export default NavBar;