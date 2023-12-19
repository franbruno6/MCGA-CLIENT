import styles from "../styles/GymClass.module.css";
import { Card } from "react-bootstrap"
import { GymClass as GymClassModel } from "../models/gymclass"
import { formateDate } from "../utils/formateDate";

interface GymClassProps {
    gymClass: GymClassModel,
    className?: string,
}

const GymClass = ({ gymClass, className }: GymClassProps) => {
    const { 
        title,
        text,
        createdAt,
        updateAt
    } = gymClass;

    let createdUpdatedText: string;
    if (updateAt > createdAt) {
        createdUpdatedText = "Updated: " + formateDate(updateAt);
    } else {
        createdUpdatedText = "Created: " + formateDate(createdAt);
    }

    return (
        <Card className={`${styles.gymClassCard} ${className}`}>
        <Card.Body className={styles.cardBody}>
            <Card.Title>
            {title}
            </Card.Title>
            <Card.Text className={styles.cardText}>
            {text}
            </Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">
            {createdUpdatedText}
        </Card.Footer>
        </Card>
    )
}

export default GymClass