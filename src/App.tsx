import { useEffect, useState } from 'react';
import { GymClass as GymClassModel } from './models/gymclass';
import GymClass from './components/GymClass';
import { Container, Row, Col, Button } from 'react-bootstrap';
import styles from './styles/GymClassesPage.module.css';
import stylesUtils from './styles/utils.module.css';
import * as GymClassesApi from './network/gymclasses_api';
import ShowAddEditGymClassDialog from './components/AddEditGymClassDialog';
import { FaPlus } from 'react-icons/fa';
import { set } from 'react-hook-form';
import AddEditGymClassDialog from './components/AddEditGymClassDialog';

function App() {
    const [gymClasses, setGymClasses] = useState<GymClassModel[]>([]);

    const [showAddGymClassDialog, setShowEditAddGymClassDialog] = useState(false);
    const [gymClassToEdit, setGymClassToEdit] = useState<GymClassModel | null>(null);

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

    async function deleteGymClass(gymClass: GymClassModel) {
        try {
            await GymClassesApi.deleteGymClass(gymClass._id);
            setGymClasses(gymClasses.filter(existingGymClass => existingGymClass._id !== gymClass._id));
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Container>
            <Button
                className={`mb-4 ${stylesUtils.blockCenter} ${stylesUtils.flexCenter}`}
                onClick={() => setShowEditAddGymClassDialog(true)}>
                <FaPlus />
                Add Gym Class
            </Button>
            <Row xs={1} md={2} lg={3} className="g-4">
                {gymClasses.map(gymClass => (
                    <Col key={gymClass._id}>
                        <GymClass
                        gymClass={gymClass}
                        className={styles.gymClass}
                        onGymClassClicked={setGymClassToEdit}
                        onDeleteGymClassClicked={deleteGymClass}
                        />
                    </Col>
                ))}
            </Row>
            {
                showAddGymClassDialog && 
                    <ShowAddEditGymClassDialog
                    onDismiss={() => setShowEditAddGymClassDialog(false)}
                    onGymClassSaved={(newGymClass) => {
                        setGymClasses([...gymClasses, newGymClass]);
                        setShowEditAddGymClassDialog(false);
                    }}
                    />
            }
            {
                gymClassToEdit &&
                <AddEditGymClassDialog
                gymClassToEdit={gymClassToEdit}
                onDismiss={() => setGymClassToEdit(null)}
                onGymClassSaved={(updatedGymClass) => {
                    setGymClasses(gymClasses.map(existingGymClass => existingGymClass._id === updatedGymClass._id ? updatedGymClass : existingGymClass));
                    setGymClassToEdit(null);
                }}
                />
            }
        </Container>
    );
}

export default App;
