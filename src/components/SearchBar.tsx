import { useState } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // hook up your search later
    console.log("Searching for", query);
  };

  return (
    <form
      onSubmit={handleSearch}
      action="/search"
      method="get"
      className="flex gap-2 my-4"
    >
      <input
        type="text"
        placeholder="Search newsletters..."
        className="border p-2 flex-1 rounded"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" className="bg-blue-600 text-white px-4 rounded">
        Search
      </button>
    </form>
  );
}
