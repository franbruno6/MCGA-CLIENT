import { useForm } from "react-hook-form";
import { User } from "../models/user";
import { LogInCredentials } from "../network/gymclasses_api";
import * as GymClassesApi from "../network/gymclasses_api";
import { Button, Form, Modal } from "react-bootstrap";
import TextInputField from "./form/TextInputField";
import styleUtils from "../styles/utils.module.css";

interface LogInModalProps {
    onDismiss: () => void,
    onLogInSuccesful: (user: User) => void,
}

const LogInModal = ({onDismiss, onLogInSuccesful}: LogInModalProps) => {

    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<LogInCredentials>();

    async function onSubmit(credentials: LogInCredentials) {
        try {
            const user = await GymClassesApi.logIn(credentials);
            onLogInSuccesful(user);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Log In
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form id="logInForm" onSubmit={handleSubmit(onSubmit)}>
                    <TextInputField
                        name="username"
                        label="Username"
                        type="text"
                        placeholder="Username"
                        register={register}
                        registerOptions={{required: "Required"}}
                        error={errors.username}
                    />
                    <TextInputField
                        name="password"
                        label="Password"
                        type="password"
                        placeholder="Password"
                        register={register}
                        registerOptions={{required: "Required"}}
                        error={errors.password}
                    />
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className={styleUtils.widht100}>
                        Log In
                    </Button>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={onDismiss}>Cancel</Button>
                <Button variant="primary" form="logInForm" type="submit" disabled={isSubmitting}>Log In</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default LogInModal;