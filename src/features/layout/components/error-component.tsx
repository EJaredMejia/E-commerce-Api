import { motion } from "motion/react";
import { AlertCircle, RotateCcw } from "lucide-react";

export function ErrorComponent({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex h-[60vh] w-full flex-col items-center justify-center gap-8 p-6 text-center"
    >
      <motion.div
        initial={{ scale: 0.5, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="relative"
      >
        <div className="absolute -inset-4 animate-pulse rounded-full bg-red-100 opacity-50 blur-xl"></div>
        <div className="relative rounded-full bg-red-50 p-6 shadow-sm">
          <AlertCircle className="h-16 w-16 text-red-500" />
        </div>
      </motion.div>

      <div className="space-y-3">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
          Something went wrong
        </h2>
        <p className="max-w-md text-lg font-medium text-balance text-gray-600">
          {error.message ||
            "An unexpected error occurred. Please try again later."}
        </p>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => reset()}
        className="group relative flex items-center gap-3 overflow-hidden rounded-2xl bg-gray-900 px-8 py-4 font-bold text-white transition-all hover:bg-black hover:shadow-xl focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 focus:outline-none"
      >
        <RotateCcw className="h-5 w-5 transition-transform duration-500 group-hover:rotate-180" />
        Try Again
      </motion.button>
    </motion.div>
  );
}
