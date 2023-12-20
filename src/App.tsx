import { useEffect, useState } from "react";
import LogInModal from "./components/LogInModal";
import NavBar from "./components/NavBar";
import { User } from "./models/user";
import * as GymClassesApi from "./network/gymclasses_api";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import GymClassesPage from "./pages/GymClassesPage";
import PrivacyPage from "./pages/PrivacyPage";
import NotFoundPage from "./pages/NotFoundPage";
import styles from "./styles/App.module.css";


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
        <BrowserRouter>
            <div>
                <NavBar 
                    loggedInUser={loggedInUser}
                    onLoggedInClicked={() => setShowLogInModal(true)}
                    onLogOutSuccesful={() => setLoggedInUser(null)}
                />

                <Container className={styles.pageContainer}>
                    <Routes>
                        <Route
                        path="/"
                        element={<GymClassesPage loggedInUser={loggedInUser} />} 
                        />
                        <Route
                        path="/privacy"
                        element={<PrivacyPage />} 
                        />
                        <Route
                        path="/*"
                        element={<NotFoundPage />} 
                        />

                    </Routes>
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
        </BrowserRouter>
    );
}

export default App;
