export default function LoadingTransition() {
  return (
    <div className="fixed transition-all duration-200 flex flex-col gap-1 items-center justify-center inset-0 w-screen h-screen bg-black/5 backdrop-blur-sm text-[#2e3d4b] font-bold text-base z-[9999]">
      <span className="loader"></span>
      Loading...
    </div>
  );
}
