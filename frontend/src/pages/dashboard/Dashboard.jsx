import {
  FolderKanban,
  CheckSquare,
  Bug,
  TrendingUp,
  ArrowUpRight,
  Clock,
} from "lucide-react";

import StatCard from "../../components/ui/StatCard";

function Dashboard() {
  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
          Thursday, August 20, 2026
        </p>

        <h1 className="mt-1 text-2xl font-bold text-slate-900 md:text-3xl dark:text-white">
          Good morning, Prakash 👋
        </h1>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Here's what's happening across your development workspace.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Projects"
          value="12"
          description="+2 this month"
          icon={FolderKanban}
        />

        <StatCard
          title="Completed Tasks"
          value="84"
          description="+12% from last month"
          icon={CheckSquare}
        />

        <StatCard
          title="Open Issues"
          value="17"
          description="5 high priority"
          icon={Bug}
        />

        <StatCard
          title="Productivity"
          value="87%"
          description="+8% from last week"
          icon={TrendingUp}
        />
      </div>

      {/* Main content */}
      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        {/* Recent Projects */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-slate-900 dark:text-white">
                Recent Projects
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Your latest development projects
              </p>
            </div>

            <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
              View all
            </button>
          </div>

          <div className="mt-6 space-y-4">
            {[
              {
                name: "DevFlow",
                description: "Developer productivity platform",
                progress: 72,
              },
              {
                name: "AI Code Reviewer",
                description: "Automated code analysis",
                progress: 48,
              },
              {
                name: "Task Management API",
                description: "RESTful project management API",
                progress: 91,
              },
            ].map((project) => (
              <div
                key={project.name}
                className="rounded-xl border border-slate-100 p-4 dark:border-slate-800"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-slate-900 dark:text-white">
                      {project.name}
                    </h3>

                    <p className="mt-1 text-xs text-slate-500">
                      {project.description}
                    </p>
                  </div>

                  <span className="text-sm font-semibold text-blue-600">
                    {project.progress}%
                  </span>
                </div>

                <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                  <div
                    className="h-full rounded-full bg-blue-600"
                    style={{
                      width: `${project.progress}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-slate-900 dark:text-white">
                Recent Activity
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Latest workspace activity
              </p>
            </div>

            <Clock size={19} className="text-slate-400" />
          </div>

          <div className="mt-6 space-y-5">
            {[
              {
                text: "Completed authentication module",
                time: "15 min ago",
              },
              {
                text: "Created a new project",
                time: "1 hour ago",
              },
              {
                text: "Resolved critical bug",
                time: "3 hours ago",
              },
              {
                text: "Submitted code for review",
                time: "5 hours ago",
              },
            ].map((activity) => (
              <div key={activity.text} className="flex gap-3">
                <div className="mt-1 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-blue-600" />

                <div>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    {activity.text}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>

          <button className="mt-6 flex items-center gap-1 text-sm font-medium text-blue-600">
            View activity
            <ArrowUpRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
