const Loader = () => {
    return (
        <div class="relative flex w-full animate-pulse gap-2 p-4">
            <div class="flex-1">
                <div class="mb-1 h-5 w-3/5 rounded-lg bg-slate-400 text-lg"></div>
                <div class="mb-1 h-5 w-[90%] rounded-lg bg-slate-400 text-sm"></div>
                <div class="mb-1 h-5 w-3/5 rounded-lg bg-slate-400 text-lg"></div>
                <div class="h-5 w-[90%] rounded-lg bg-slate-400 text-sm"></div>
            </div>
        </div>
    );
};

export default Loader;