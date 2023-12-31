import { useEffect, useState } from "react";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { default as AddEditGymClassDialog, default as ShowAddEditGymClassDialog } from "../components/AddEditGymClassDialog";
import GymClass from "../components/GymClass";
import { GymClass as GymClassModel } from "../models/gymclass";
import * as GymClassesApi from "../network/gymclasses_api";
import styles from "../styles/GymClassesPage.module.css";
import stylesUtils from "../styles/utils.module.css";
import GymClassesLoggedOutView from "./GymClassesLoggedOutView";

function GymClassesLoggedInView() {
    
    const [gymClasses, setGymClasses] = useState<GymClassModel[]>([]);
    const [gymClassesLoading, setGymClassesLoading] = useState(true);
    const [showGymClassesLoadingError, setShowGymClassesLoadingError] = useState(false);

    const [showAddGymClassDialog, setShowAddGymClassDialog] = useState(false);
    const [gymClassToEdit, setGymClassToEdit] = useState<GymClassModel | null>(null);

    useEffect(() => {
        async function loadGymClasses() {
            try {
                setShowGymClassesLoadingError(false);
                setGymClassesLoading(true);
                const gymClasses = await GymClassesApi.fetchGymClasses();
                setGymClasses(gymClasses);
            } catch (error) {
                console.error(error);
                setShowGymClassesLoadingError(true);
            } finally {
                setGymClassesLoading(false);
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

    const gymClassesGrid =
    <Row xs={1} md={2} lg={3} className={`g-4 ${styles.gymClassesGrid}`}>
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

    return (
        <>
            <Button
                    className={`mb-4 ${stylesUtils.blockCenter} ${stylesUtils.flexCenter}`}
                    onClick={() => setShowAddGymClassDialog(true)}>
                    <FaPlus />
                    Add Gym Class
            </Button>
            {gymClassesLoading && <Spinner animation="border" variant="primary" />}
            {showGymClassesLoadingError && <p>Error loading gym classes, please refresh the page</p>}
            {!gymClassesLoading && !showGymClassesLoadingError &&
            <>
                { gymClasses.length > 0
                    ? gymClassesGrid
                    : <p className={stylesUtils.blockCenter}>No gym classes found</p>
                }
            </>
            }
            {
                showAddGymClassDialog && 
                    <ShowAddEditGymClassDialog
                        onDismiss={() => setShowAddGymClassDialog(false)}
                        onGymClassSaved={(newGymClass) => {
                            setGymClasses([...gymClasses, newGymClass]);
                            setShowAddGymClassDialog(false);
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
        </>
    )
}

export default GymClassesLoggedInView