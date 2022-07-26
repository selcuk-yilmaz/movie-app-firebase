import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";


const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export const createUser=async(email,password,navigate,displayName)=>{
    
try {
    let userCredential= await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(auth.currentUser, {
      displayName: displayName
    });
    navigate("/");
    console.log(userCredential);
} catch (error) {
    console.log(error);
}
};

//* https://console.firebase.google.com/
//* => Authentication => sign-in-method => enable Email/password
//! Email/password ile girişi enable yap
export const signIn = async (email, password, navigate) => {
  //? mevcut kullanıcının giriş yapması için kullanılan firebase metodu
  try {
    let userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    navigate('/');
    console.log(userCredential);
  } catch (err) {
    console.log(err);
  }
};

export const userObserver=(setCurrentUser)=>{
onAuthStateChanged(auth, (user) => {
  if (user) {
setCurrentUser(user)
  } else {
setCurrentUser(false)
  }
});
};

export const logOut =()=>{
  signOut(auth);
};


export const signUpProvider=(navigate)=>{
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      navigate("/")
console.log(result);
    })
    .catch((error) => {
console.log(error);
    });
}
