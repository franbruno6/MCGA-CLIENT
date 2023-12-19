import styles from "../styles/GymClass.module.css";
import stylesUtils from "../styles/utils.module.css";
import { Card } from "react-bootstrap"
import { GymClass as GymClassModel } from "../models/gymclass"
import { formateDate } from "../utils/formateDate";
import { MdDelete } from "react-icons/md";

interface GymClassProps {
    gymClass: GymClassModel,
    onGymClassClicked: (gymClass: GymClassModel) => void,
    onDeleteGymClassClicked: (gymClass: GymClassModel) => void,
    className?: string,
}

const GymClass = ({ gymClass, onGymClassClicked, onDeleteGymClassClicked, className }: GymClassProps) => {
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
        <Card
        className={`${styles.gymClassCard} ${className}`}
        onClick={() => onGymClassClicked(gymClass)}
        >
        <Card.Body className={styles.cardBody}>
            <Card.Title className={stylesUtils.flexCenter}>
            {title}
            <MdDelete
            className="text-muted ms-auto"
            onClick={(e) => {
                onDeleteGymClassClicked(gymClass);
                e.stopPropagation();
            }}
            />
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