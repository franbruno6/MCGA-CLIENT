import { useEffect, useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import GymClass from "../components/GymClass";
import { GymClass as GymClassModel } from "../models/gymclass";
import * as GymClassesApi from "../network/gymclasses_api";
import styles from "../styles/GymClassesPage.module.css";
import stylesUtils from "../styles/utils.module.css";

function GymClassesLoggedOutView() {
    
    const [gymClasses, setGymClasses] = useState<GymClassModel[]>([]);
    const [gymClassesLoading, setGymClassesLoading] = useState(true);
    const [showGymClassesLoadingError, setShowGymClassesLoadingError] = useState(false);

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
        </>
    )
}

export default GymClassesLoggedOutView