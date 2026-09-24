"use client";

import { getCurrentUser } from "@/api/auth";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type GuardState = "checking" | "ready" | "error";

export default function ProtectedChatGuard({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [state, setState] = useState<GuardState>("checking");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (!isLoaded) return;

    if (!isSignedIn) {
      router.replace("/auth?mode=signin");
      return;
    }

    let cancelled = false;

    async function checkProfile() {
      setState("checking");

      try {
        const token = await getToken();
        if (!token) {
          throw new Error("No authentication token is available.");
        }

        const user = await getCurrentUser(token);
        if (cancelled) return;

        if (user.profileStatus === "active") {
          if (pathname !== "/chat") {
            router.replace("/chat");
            return;
          }
          setState("ready");
          return;
        }

        if (user.profileStatus === "incomplete") {
          if (pathname !== "/profile") {
            router.replace("/profile");
            return;
          }
          setState("ready");
          return;
        }

        console.error("Current user has an unsupported profile status.");
        setState("error");
        console.log(user);
      } catch (error: unknown) {
        if (cancelled) return;

        if (axios.isAxiosError(error) && error.response?.status === 404) {
          if (pathname !== "/profile") {
            router.replace("/profile");
            return;
          }

          // A missing Nexus profile is the onboarding state.
          setState("ready");
          return;
        }

        console.error("Failed to check current user:", error);
        setState("error");
      }
    }

    void checkProfile();

    return () => {
      cancelled = true;
    };
  }, [attempt, getToken, isLoaded, isSignedIn, pathname, router]);

  if (!isLoaded || !isSignedIn || state === "checking") {
    return (
      <main
        aria-busy="true"
        aria-label="Checking your account"
        className="grid h-screen place-items-center"
      >
        <div className="size-8 animate-spin rounded-full border-4 border-primary-300 border-t-primary-700" />
      </main>
    );
  }

  if (state === "error") {
    return (
      <main className="grid h-screen place-items-center px-4">
        <section className="max-w-md text-center" role="alert">
          <h1 className="text-lg font-semibold">
            We couldn’t load your profile
          </h1>
          <p className="mt-2 text-sm text-text-500">
            Please check your connection and try again.
          </p>
          <button
            className="mt-5 rounded-lg bg-primary-700 px-4 py-2 text-sm font-medium text-white"
            onClick={() => setAttempt((current) => current + 1)}
            type="button"
          >
            Try again
          </button>
        </section>
      </main>
    );
  }

  return children;
}
