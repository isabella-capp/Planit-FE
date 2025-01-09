import Signup from "@/components/Auth/Signup";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up Page - Planit",
};

export default function Register() {
  return (
    <>
      <Signup />
    </>
  );
}
