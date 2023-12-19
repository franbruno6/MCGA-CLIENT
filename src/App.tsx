import { useEffect, useState } from 'react';
import { GymClass as GymClassModel } from './models/gymclass';
import GymClass from './components/GymClass';
import { Container, Row, Col, Button } from 'react-bootstrap';
import styles from './styles/GymClassesPage.module.css';
import stylesUtils from './styles/utils.module.css';
import * as GymClassesApi from './network/gymclasses_api';
import ShowAddGymClassDialog from './components/AddGymClassDialog';

function App() {
    const [gymClasses, setGymClasses] = useState<GymClassModel[]>([]);

    const [showAddGymClassDialog, setShowAddGymClassDialog] = useState(false);

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
            <Button
                className={`mb-4 ${stylesUtils.blockCenter}`}
                onClick={() => setShowAddGymClassDialog(true)}>
                Add Gym Class
            </Button>
            <Row xs={1} md={2} lg={3} className="g-4">
                {gymClasses.map(gymClass => (
                    <Col key={gymClass._id}>
                        <GymClass gymClass={gymClass} className={styles.gymClass}/>
                    </Col>
                ))}
            </Row>
            {
                showAddGymClassDialog && 
                    <ShowAddGymClassDialog
                    onDismiss={() => setShowAddGymClassDialog(false)}
                    onGymClassSaved={(newGymClass) => {
                        setGymClasses([...gymClasses, newGymClass]);
                        setShowAddGymClassDialog(false);
                    }}
                    />
            }
        </Container>
    );
}

export default App;
