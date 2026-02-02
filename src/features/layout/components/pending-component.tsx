import { Loader2 } from "lucide-react";

export function PendingComponent() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-6">
      <div className="relative flex items-center justify-center">
        <div className="relative flex items-center justify-center rounded-2xl bg-white p-4 shadow-xl">
          <Loader2 className="size-10 animate-spin text-red-500" />
        </div>
      </div>
      <div className="space-y-1 text-center">
        <p className="text-xl font-bold tracking-tight text-gray-900">
          Just a moment
        </p>
        <p className="text-sm font-medium text-gray-500">
          We're preparing your shopping experience...
        </p>
      </div>
    </div>
  );
}
