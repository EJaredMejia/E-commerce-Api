import ClipLoader from "react-spinners/ClipLoader";

export function LoadingScreen() {
  return (
    <div
      style={{ background: "rgba(0,0,0,0.3)" }}
      className="fixed z-50 flex h-screen w-screen items-center justify-center"
    >
      <ClipLoader className="text-red-500" size={120} />
    </div>
  );
}
