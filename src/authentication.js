import { getAuth, signOut, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export default function handleAuth(setIsLoggedIn) {
    const auth = getAuth();

    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
        'hd': "hyderabad.bits-pilani.ac.in",
    });
    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            if (!result.user.email.endsWith('hyderabad.bits-pilani.ac.in')) {
                signOut(auth).then(() => {
                    setIsLoggedIn(false);
                }).catch((error) => {
                    console.log('An error occured')
                });
            }
            const token = credential.accessToken;
            // The signed-in user info.
            localStorage.setItem('userEmail', result.user.email)
            localStorage.setItem('userName', result.user.displayName)
            setIsLoggedIn(true);
            // ...
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
            console.log('An error occured')
        });

}