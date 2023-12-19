import { Button } from "react-bootstrap";

interface NavBarLoggedOutViewProps {
    onLogInClicked: () => void,
}

const NavBarLoggedOutView = ({ onLogInClicked }: NavBarLoggedOutViewProps) => {

    return (  
        <>
            <Button onClick={onLogInClicked}>
                Log In
            </Button>
        </>
    );
}

export default NavBarLoggedOutView;