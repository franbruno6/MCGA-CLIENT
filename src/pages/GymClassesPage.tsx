import { Container } from "react-bootstrap";
import GymClassesLoggedInView from "../components/GymClassesLoggedInView";
import GymClassesLoggedOutView from "../components/GymClassesLoggedOutView";
import { getLoggedInUser } from "../network/gymclasses_api";
import styles from "../styles/GymClassesPage.module.css";
import { User } from "../models/user";

interface GymClassesProps {
    loggedInUser: User | null,
}

const GymClassesPage = ({ loggedInUser }: GymClassesProps) => {
    return ( 
        <Container className={styles.gymClassesPage}>
            <>
            { loggedInUser
            ? <GymClassesLoggedInView />
            : <GymClassesLoggedOutView />
            }
            </>
        </Container>
    );
}

export default GymClassesPage;