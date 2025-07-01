export default function UpgradeBanner() {
  return (
    <div className="bg-yellow-100 p-4 text-center rounded shadow my-6">
      <h3 className="text-lg font-bold mb-2">Upgrade to Pro</h3>
      <p className="text-gray-700 mb-2">
        Get access to premium playbooks, reports, and exclusive newsletters.
      </p>
      <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
        Upgrade Now
      </button>
    </div>
  );
}
