import {
  Link,
  useCanGoBack,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";
import { motion } from "motion/react";
import { Home, MoveLeft, Search } from "lucide-react";

export function NotFoundComponent() {
  const canGoBack = useCanGoBack();
  const router = useRouter();

  function goBack() {
    if (!canGoBack) {
      router.navigate({ to: "/" });
      return;
    }

    router.history.back();
  }
  return (
    <div className="flex min-h-svh w-full flex-col items-center justify-center gap-10 p-6 text-center">
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative"
      >
        <div className="absolute -inset-8 animate-pulse rounded-full bg-red-100 opacity-40 blur-2xl"></div>
        <div className="relative flex h-32 w-32 items-center justify-center rounded-3xl bg-white shadow-2xl shadow-red-100">
          <Search className="h-16 w-16 text-red-500" />
        </div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
          className="absolute -top-2 -right-2 rounded-full bg-red-500 px-3 py-1 text-sm font-bold text-white shadow-lg"
        >
          404
        </motion.div>
      </motion.div>

      <div className="space-y-4">
        <h1 className="text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
          Lost in Space?
        </h1>
        <p className="max-w-md text-lg font-medium text-balance text-gray-500">
          We couldn't find the page you're looking for. It might have been moved
          or doesn't exist anymore.
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <button
          onClick={goBack}
          className="flex items-center justify-center gap-3 rounded-2xl border-2 border-gray-100 bg-white px-8 py-4 font-bold text-gray-700 transition-all hover:border-gray-200 hover:bg-gray-50"
        >
          <MoveLeft className="h-5 w-5 text-gray-400" />
          Go Back
        </button>
        <Link to="/">
          <div className="flex items-center justify-center gap-3 rounded-2xl bg-red-500 px-8 py-4 font-bold text-white shadow-lg shadow-red-200 transition-all hover:bg-red-600 active:shadow-inner">
            <Home className="h-5 w-5" />
            Back to Home
          </div>
        </Link>
      </div>
    </div>
  );
}
