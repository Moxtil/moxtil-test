"use client";
import { useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { updateProfile } from "firebase/auth";

export default function SignUp() {
  const router = useRouter();
  const [createUser, user] = useCreateUserWithEmailAndPassword(auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [myUser, setMyUser] = useState(true);

  const handleSignUp = async () => {
    try {
      const res = await createUser(email, password);
      sessionStorage.setItem("user", true);
      console.log({ res });
      setEmail("");
      setPassword("");
      if (res !== undefined || res != null) {
        setTimeout(() => {
          router.push("/login");
        }, 250);
      } else {
        setMyUser(false);
      }
      if (res) {
        await updateProfile(res.user, {
          displayName: name,
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">
          Sign Up
        </h2>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="mt-4"
          method={"post"}
        >
          <div>
            <label className="block text-gray-700 ">Username</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full text-gray-700 px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your Username"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 ">Email</label>
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
          <Link href={"/login"} className="text-black underline text-xs my-3">
            Already Have An Account ?
          </Link>
          {!myUser && (
            <p className="text-red-600 text-sm">Email Already In Use !</p>
          )}
          <button
            onClick={handleSignUp}
            type="submit"
            className="w-full mt-4 px-4 py-2 font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
