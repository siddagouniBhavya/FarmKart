
const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-slate-900 to-black">
      <div className="flex flex-col items-center gap-4 p-8 rounded-xl bg-white/5 backdrop-blur-md border border-white/10">
        
        <div className="w-16 h-16 border-4 border-white/10 border-t-cyan-400 rounded-full animate-spin"></div>

        <p className="text-gray-300 animate-pulse tracking-wider">
          Loading your experience...
        </p>

      </div>
    </div>
  );
};

export default Loader;