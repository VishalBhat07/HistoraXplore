import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from './firebaseConfig';

export function getUserInfo() {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // If the user is logged in, return their user object (or just specific data)
                resolve(user);
            } else {
                // If no user is logged in
                reject("No user is currently logged in.");
            }

            // Unsubscribe after checking the auth state once
            unsubscribe();
        });
    });
}
