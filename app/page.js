"use client";
import { auth } from "./firebase/config";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import SignUp from "./sign-up/page";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
export default function Home() {
  const router = useRouter();
  const [user] = useAuthState(auth);
  if (!user) {
    return <SignUp />;
  } else
    return (
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <h1>Home</h1>
        <button
          onClick={() => signOut(auth)}
          className="text-2xl bg-slate-400 text-black "
        >
          Logout
        </button>
      </div>
    );
}
