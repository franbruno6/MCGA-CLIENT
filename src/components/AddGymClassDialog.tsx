import { Button, Form, Modal } from "react-bootstrap";
import { GymClass } from "../models/gymclass";
import { useForm } from "react-hook-form";
import { GymClassInput } from "../network/gymclasses_api";
import * as GymClassesApi from "../network/gymclasses_api";

interface AddGymClassDialogProps {
    onDismiss: () => void;
    onGymClassSaved: (gymClass: GymClass) => void;
}

const AddGymClassDialog = ({onDismiss, onGymClassSaved}: AddGymClassDialogProps) => {

    const { register, handleSubmit, formState : { errors, isSubmitting } } = useForm<GymClassInput>();

    async function onSubmit(input: GymClassInput) {
        try {
            const gymClassResponse = await GymClassesApi.createGymClass(input);
            onGymClassSaved(gymClassResponse);
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    return ( 
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Add Gym Class
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form id="addGymClassForm" onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                        type="text"
                        placeholder="Title"
                        isInvalid={!!errors.title}
                        {...register("title", { required: true })}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.title?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                        as="textarea"
                        rows={5}
                        placeholder="Text"
                        {...register("text")}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button
                type="submit"
                form="addGymClassForm"
                disabled={isSubmitting}
                >
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddGymClassDialog;