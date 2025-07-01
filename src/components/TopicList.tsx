type Props = {
  topics: string[];
};

export default function TopicList({ topics }: Props) {
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {topics.map((topic) => (
        <span
          key={topic}
          className="bg-gray-200 text-gray-800 px-3 py-1 rounded cursor-pointer hover:bg-gray-300"
        >
          {topic}
        </span>
      ))}
    </div>
  );
}
