"use client";

import { useEffect } from "react";
import { AlertOctagon, RefreshCcw } from "lucide-react";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error("Global Error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen flex items-center justify-center p-6 bg-background-50 text-primary-900">
        
        <div className="max-w-md w-full text-center rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-lg p-8">

          {/* Icon */}
          <div className="flex justify-center mb-4">
            <AlertOctagon className="w-14 h-14 text-red-500 animate-pulse" />
          </div>

          {/* Title */}
          <h1 className="text-2xl font-semibold mb-2">
            Critical System Error
          </h1>

          {/* Message */}
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 break-words">
            {error?.message || "Something went seriously wrong"}
          </p>

          {/* Digest (debug info) */}
          {error?.digest && (
            <p className="text-xs text-neutral-400 mb-4">
              Error ID: {error.digest}
            </p>
          )}

          {/* Action */}
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-500 text-white hover:bg-primary-600 transition active:scale-95"
          >
            <RefreshCcw className="w-4 h-4" />
            Reload App
          </button>

        </div>
      </body>
    </html>
  );
}