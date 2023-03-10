import app from 'firebase/compat/app';
import 'firebase/compat/functions';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_APP_API_KEY,
    authDomain: import.meta.env.VITE_APP_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_APP_PROJECT_ID,
    storageBucket: import.meta.env.VITE_APP_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_APP_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
    measurementId: import.meta.env.VITE_APP_MEASUREMENTID
};

let usuarioId;
let salir;
class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);
        this.auth = app.auth();
        this.db = app.firestore();
        this.stg = app.storage();
        this.functions = app.functions();
        this.firestore = app.firestore
    }

    // *** Auth API ***
    doCreateUserWithEmailAndPassword = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => { console.log('salir'); this.auth.signOut(); }


    // *** Merge Auth and DB User API *** //
    onAuthUserListener = (next, fallback) =>
        this.auth.onAuthStateChanged(authUser => {
            salir = false;
            if (authUser) {
                usuarioId = authUser.uid
                this.usuario(usuarioId).onSnapshot(querySnapshot => {
                    const dbUser = querySnapshot.data();
                    // merge auth and db user
                    if (!salir) {
                        authUser = {
                            uid: usuarioId,
                            ...dbUser,
                        };
                        next(authUser);
                    }
                })
            } else {
                if (usuarioId) {
                    salir = true;
                    this.auth.signOut()
                    fallback();
                } else {
                    salir = true;
                    this.auth.signOut()
                    fallback();
                }
            }

        });


    // *** User API ***
    usuario = uid => this.db.collection('Usuarios').doc(uid);
    usuarios = () => this.db.collection('Usuarios');

    // Mensajes
    mensajes = () => this.db.collection('Mensajes');


}

export default Firebase;