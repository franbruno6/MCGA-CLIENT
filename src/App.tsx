import { useEffect, useState } from 'react';
import { GymClass as GymClassModel } from './models/gymclass';
import GymClass from './components/GymClass';
import { Container, Row, Col } from 'react-bootstrap';
import styles from './styles/GymClassesPage.module.css';
import * as GymClassesApi from './network/gymclasses_api';

function App() {
    const [gymClasses, setGymClasses] = useState<GymClassModel[]>([]);

    useEffect(() => {
        async function loadGymClasses() {
            try {
                const gymClasses = await GymClassesApi.fetchGymClasses();
                setGymClasses(gymClasses);
            } catch (error) {
                console.error(error);
                alert(error);
            }
        }
        loadGymClasses();
    }, []);

    return (
        <Container>
            <Row xs={1} md={2} lg={3} className="g-4">
                {gymClasses.map(gymClass => (
                    <Col key={gymClass._id}>
                        <GymClass gymClass={gymClass} className={styles.gymClass}/>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default App;
