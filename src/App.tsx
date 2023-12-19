import { useEffect, useState } from 'react';
import { GymClass as GymClassModel } from './models/gymclass';
import GymClass from './components/GymClass';
import { Container, Row, Col } from 'react-bootstrap';
import styles from '.styles/GymClassPage.module.css';

function App() {
  const [gymClasses, setGymClasses] = useState<GymClassModel[]>([]);
  
  useEffect(() => {
    async function loadGymClasses() {
      try {
        const response = await fetch('api/gymclasses', {method: 'GET'});
        const gymClasses = await response.json();
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
