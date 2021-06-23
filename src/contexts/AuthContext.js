import { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../firebase";
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [username, setUsername] = useState("");

  const signup = (email, password) => {
    let promise = new Promise(function (resolve, reject) {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((ref) => {
          resolve(ref);
        })
        .catch((error) => reject(error));
    });
    return promise;
  };

  const signin = (email, password) => {
    let promise = new Promise(function (resolve, reject) {
      auth
        .signInWithEmailAndPassword(email, password)
        .then((ref) => {
          resolve(ref);
        })
        .catch((error) => reject(error));
    });
    return promise;
  };

  const signout = () => {
    return auth.signOut();
  };

  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data(),
        }))
      );
    });
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);

        if (user.displayName) {
          // dont update username
        } else {
          return user.updateProfile({
            displayName: username,
          });
        }
      } else {
        setCurrentUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [currentUser]);

  const value = {
    posts,
    signup,
    signin,
    signout,
    currentUser,
    username,
    setUsername,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
