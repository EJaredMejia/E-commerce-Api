import { Link, useCanGoBack, useRouter } from "@tanstack/react-router";
import { Home, MoveLeft, Search } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@root/components/ui/button";

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
        <Button
          onClick={goBack}
          variant="outline"
          size="lg"
          className="h-14 rounded-2xl px-8 font-bold text-gray-700 hover:bg-gray-50"
        >
          <MoveLeft className="mr-2 h-5 w-5 text-gray-400" />
          Go Back
        </Button>
        <Button
          render={(props) => (
            <Link
              to="/"
              className="h-14 rounded-2xl bg-red-500 px-8 font-bold text-white shadow-lg shadow-red-200 hover:bg-red-600"
              {...props}
            >
              <Home className="mr-2 h-5 w-5" />
              Back to Home
            </Link>
          )}
        />
      </div>
    </div>
  );
}
