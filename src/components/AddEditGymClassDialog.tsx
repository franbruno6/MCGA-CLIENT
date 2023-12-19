import { Button, Form, Modal } from "react-bootstrap";
import { GymClass } from "../models/gymclass";
import { useForm } from "react-hook-form";
import { GymClassInput } from "../network/gymclasses_api";
import * as GymClassesApi from "../network/gymclasses_api";
import TextInputField from "./form/TextInputField";

interface AddEditGymClassDialogProps {
    gymClassToEdit?: GymClass,
    onDismiss: () => void,
    onGymClassSaved: (gymClass: GymClass) => void,
}

const AddEditGymClassDialog = ({gymClassToEdit, onDismiss, onGymClassSaved}: AddEditGymClassDialogProps) => {

    const { register, handleSubmit, formState : { errors, isSubmitting } } = useForm<GymClassInput>({
        defaultValues: {
            title: gymClassToEdit?.title || "",
            text: gymClassToEdit?.text || "",
        }
    });

    async function onSubmit(input: GymClassInput) {
        try {
            let gymClassResponse: GymClass;
            if (gymClassToEdit) {
                gymClassResponse = await GymClassesApi.updateGymClass(gymClassToEdit._id, input);
            } else {
                gymClassResponse = await GymClassesApi.createGymClass(input);
            }
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
                    {gymClassToEdit ? "Edit Gym Class" : "Add Gym Class"}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                
                <Form id="addEditGymClassForm" onSubmit={handleSubmit(onSubmit)}>
                    <TextInputField
                        name="title"
                        label="Title"
                        type="text"
                        placeholder="Title"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.title}
                    />
                    
                    <TextInputField
                        name="text"
                        label="Text"
                        as="textarea"
                        rows={5}
                        placeholder="Text"
                        register={register}
                    />
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button
                type="submit"
                form="addEditGymClassForm"
                disabled={isSubmitting}
                >
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddEditGymClassDialog;