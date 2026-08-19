function StatCard({ title, value, description, icon: Icon }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {title}
          </p>

          <h3 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
            {value}
          </h3>
        </div>

        {Icon && (
          <div className="rounded-xl bg-blue-50 p-3 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
            <Icon size={20} />
          </div>
        )}
      </div>

      {description && (
        <p className="mt-4 text-xs text-slate-400">{description}</p>
      )}
    </div>
  );
}

export default StatCard;
