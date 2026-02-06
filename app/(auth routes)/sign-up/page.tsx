"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { APIError } from "@/app/api/api";

import css from "./SignUpPage.module.css";
import { register } from "@/lib/api";
import { useAuthStore } from "@/lib/store/authStore";

interface RegisterFormValues {
  email: string;
  password: string;
}

const SignUp = () => {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const [error, setError] = useState<string | undefined>(undefined);

  const handleSubmit = async (formData: FormData) => {
    try {
      const payload: RegisterFormValues = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      };

      const user = await register(payload);
      console.log(user);

      if (user) {
        setUser(user);
        router.push("/profile");
      } else {
        setError("Oops... Something went wrong");
      }
    } catch (error) {
      setError(
        (error as APIError).response?.data?.error ??
          (error as APIError).message ??
          "Oops... Something went wrong",
      );
    }
  };

  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <form className={css.form} action={handleSubmit}>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Register
          </button>
        </div>

        {error && <p>{error}</p>}
      </form>
    </main>
  );
};

export default SignUp;
