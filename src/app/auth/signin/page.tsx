import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function SignInPage() {
  return (
    <>
      <Navbar />
      <div className="max-w-md mx-auto mt-12 p-4 border rounded shadow">
        <h2 className="text-xl font-bold mb-4">Sign In</h2>
        <form>
          <input
            type="email"
            placeholder="Email"
            className="border p-2 mb-4 w-full rounded"
          />
          <input
            type="password"
            placeholder="Password"
            className="border p-2 mb-4 w-full rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            Sign In
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}
