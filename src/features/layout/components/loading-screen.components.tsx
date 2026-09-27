import { Loader2 } from "lucide-react";

export function LoadingScreen() {
  return (
    <div
      style={{ background: "rgba(0,0,0,0.3)" }}
      className="fixed z-50 flex h-screen w-screen items-center justify-center"
    >
      <Loader2 className="text-red-500 animate-spin" size={120} />
    </div>
  );
}
