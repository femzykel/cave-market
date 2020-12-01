import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const config = {
    apiKey: "AIzaSyCnCyAiA7CU6soHcs3QY-vvbox-PaDsCk8",
    authDomain: "shop-db-922e2.firebaseapp.com",
    databaseURL: "https://shop-db-922e2.firebaseio.com",
    projectId: "shop-db-922e2",
    storageBucket: "shop-db-922e2.appspot.com",
    messagingSenderId: "879369417464",
    appId: "1:879369417464:web:10fadc7978648147cf410d",
    measurementId: "G-0BK4DNRF49"
  };

  export const createUserProfileDocument = async (userAuth, addtionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();


      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...addtionalData
        })
      } catch (error) {
        console.log('error creating user', error.message);
      }
    }
 
    return userRef;
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;