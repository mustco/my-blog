export default function DashboardOverview() {
    return (
      <div className="w-full">
        <h1 className="text-xl mb-10">Dashboard Overview</h1>
        <p className="mb-5">All Posts</p>
        <div className="grid gird-cols-1 md:grid-cols-3 gap-5">
            <div className="p-4 h-72 border border-black/30 rounded-md"></div>
            <div className="p-4 h-72 border border-black/30 rounded-md"></div>
            <div className="p-4 h-72 border border-black/30 rounded-md"></div>
        </div>

      </div>
    );
}