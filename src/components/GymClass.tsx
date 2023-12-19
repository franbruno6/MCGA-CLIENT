import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import { GymClass as GymClassModel } from "../models/gymclass";
import { User } from "../models/user";
import * as GymClassesApi from "../network/gymclasses_api";
import styles from "../styles/GymClass.module.css";
import stylesUtils from "../styles/utils.module.css";
import { formateDate } from "../utils/formateDate";

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

    const [loggedInUser, setLoggedInUser] = useState<User|null>(null);

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
        <Card
        className={`${styles.gymClassCard} ${className}`}
        onClick={() => onGymClassClicked(gymClass)}
        >
        <Card.Body className={styles.cardBody}>
            <Card.Title className={stylesUtils.flexCenter}>
            {title}
            
            { loggedInUser
            ? <MdDelete
            className="text-muted ms-auto"
            onClick={(e) => {
                onDeleteGymClassClicked(gymClass);
                e.stopPropagation();
            }}
            />
            : <></>
            }
            
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