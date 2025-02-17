"use client";
import { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function SignUp() {
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(true);
  const router = useRouter();
  const handleLogin = async () => {
    try {
      const res = await signInWithEmailAndPassword(email, password);
      sessionStorage.setItem("user", true);
      console.log(res);
      setEmail("");
      setPassword("");
      setUser(true);
      if (res !== undefined || res != null) {
        setTimeout(() => {
          //   router.push("/");
        }, 250);
      } else {
        setUser(false);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>

        <div className="mt-4">
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-gray-700 px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mt-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full text-gray-700 px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>

          {user === undefined ||
            (!user && (
              <p className="text-red-600">Email Or Password Incorrect !</p>
            ))}
          <Link href={"/sign-up"} className="text-xs underline text-black">
            Don't Have An Account ?{" "}
          </Link>
          <button
            onClick={handleLogin}
            className="w-full mt-4 px-4 py-2 font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition"
          >
            Login{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
