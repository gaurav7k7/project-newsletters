type Props = {
  title: string;
  description: string;
  link: string;
};

export default function NewsletterCard({ title, description, link }: Props) {
  return (
    <div className="border rounded p-4 shadow hover:shadow-lg transition">
      <h2 className="font-bold text-xl mb-2">{title}</h2>
      <p className="text-gray-600 mb-4">{description}</p>
      <a href={link} className="text-blue-600 underline">
        Read More
      </a>
    </div>
  );
}
