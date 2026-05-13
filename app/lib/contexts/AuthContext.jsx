"use client";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";

const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsLoading(false);
      } else {
        setUser(null);
      }
    });
    return () => unsub();
  }, []);

  const handleSignInWithGoogle = async () => {
    setIsLoading(true);
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (error) {
      setError(error?.message);
    }
    setIsLoading(false);
  };
  const handleGoogleAuth = async () => {
    setIsLoading(true);

    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await signOut(auth);
    } catch (error) {
      setError(error?.message);
    }
    setIsLoading(false);
  };

  const handleSignUpWithEmail = async (email, password, name) => {
    setIsLoading(true);
    setError(null);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      if (name) {
        await updateProfile(userCredential.user, {
          displayName: name,
        });
      }

      await sendEmailVerification(userCredential.user, {
        url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/logIn`,
      });

      await signOut(auth);

      return {
        success: true,
        message:
          "Verification email sent. Please verify your email before login.",
      };
    } catch (error) {
      setError(error.message);

      return {
        success: false,
      };
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignInWithEmail = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );

      await userCredential.user.reload();

      if (!userCredential.user.emailVerified) {
        await signOut(auth);

        setError("Please verify your email before logging in.");

        return false;
      }

      return true;
    } catch (error) {
      setError(error.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        handleSignInWithGoogle,
        handleGoogleAuth,
        handleLogout,
        handleSignUpWithEmail,
        handleSignInWithEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => useContext(AuthContext);
