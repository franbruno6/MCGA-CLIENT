import { GymClass } from "../models/gymclass";
import { User } from "../models/user";

async function fetchData(input: RequestInfo, init?: RequestInit) {
    const response = await fetch(input, init);
    if (response.ok){
        return response;
    } else {
        const errorBody = await response.json();
        const errorMessage = errorBody.error;
        throw Error(errorMessage);
    }
}

export async function getLoggedInUser(): Promise<User> {
    const response = await fetchData("api/users", {method: "GET"});
    return response.json();
}

export interface LogInCredentials {
    username: string,
    password: string,
}

export async function logIn(credentials: LogInCredentials): Promise<User> {
    const response = await fetchData("api/users/login", 
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials)
    });
    return response.json();

}

export async function logOut() {
    await fetchData("api/users/logout", {method: "POST"});
}

export async function fetchGymClasses(): Promise<GymClass[]> {
    const response = await fetchData("api/gymclasses", {method: "GET"});
    return response.json();
}

export interface GymClassInput {
    title: string,
    text?: string,
}

export async function createGymClass(gymClass: GymClassInput): Promise<GymClass> {
    const response = await fetchData("api/gymclasses", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(gymClass)
    });
    return response.json();
}

export async function updateGymClass(gymClassId: string, gymClass: GymClassInput): Promise<GymClass> {
    const response = await fetchData("api/gymclasses/" + gymClassId, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(gymClass)
    });
    return response.json();
}

export async function deleteGymClass(gymClassId: string) {
    await fetchData("/api/gymclasses/" + gymClassId, {method: "DELETE"});
}