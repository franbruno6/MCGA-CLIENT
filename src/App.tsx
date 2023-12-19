import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import GymClassesLoggedInView from "./components/GymClassesLoggedInView";
import GymClassesLoggedOutView from "./components/GymClassesLoggedOutView";
import LogInModal from "./components/LogInModal";
import NavBar from "./components/NavBar";
import { User } from "./models/user";
import * as GymClassesApi from "./network/gymclasses_api";
import styles from "./styles/GymClassesPage.module.css";
import { set } from "react-hook-form";

function App() {
    
    const [loggedInUser, setLoggedInUser] = useState<User|null>(null);

    const [showLogInModal, setShowLogInModal] = useState(false);

    useEffect(() => {
        async function fetchLoggedUser() {
            try {
                const user = await GymClassesApi.getLoggedInUser();
                setLoggedInUser(user);
            } catch (error) {
                console.error(error);
            }
        }
        fetchLoggedUser();
    }, []);	

    return (
        <div>
            <NavBar 
                loggedInUser={loggedInUser}
                onLoggedInClicked={() => setShowLogInModal(true)}
                onLogOutSuccesful={() => setLoggedInUser(null)}
            />
        
        <Container className={styles.gymClassesPage}>
            <>
            { loggedInUser
            ? <GymClassesLoggedInView />
            : <GymClassesLoggedOutView />
            }
            </>
        </Container>
            {showLogInModal &&
                    <LogInModal
                        onDismiss={() => {setShowLogInModal(false)}}
                        onLogInSuccesful={(user) => {
                            setLoggedInUser(user);
                            setShowLogInModal(false);
                        }}
                    />
            }
        </div>
    );
}

export default App;
