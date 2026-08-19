function Register() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-slate-900">Create Account</h1>

        <p className="mt-2 text-slate-500">Join your DevFlow workspace.</p>

        <input
          type="text"
          placeholder="Full Name"
          className="mt-6 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
        />

        <input
          type="email"
          placeholder="Email"
          className="mt-4 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
        />

        <input
          type="password"
          placeholder="Password"
          className="mt-4 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
        />

        <button className="mt-6 w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700">
          Create Account
        </button>
      </div>
    </div>
  );
}

export default Register;
