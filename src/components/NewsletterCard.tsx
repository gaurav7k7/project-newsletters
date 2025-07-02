// src/components/NewsletterCard.tsx
interface Props {
  newsletter: {
    id: string;
    slug: string;
    title: string;
    createdAt: Date;
    topic?: { name: string };
    imageUrl?: string; // Optional image URL
  };
}

export default function NewsletterCard({ newsletter }: Props) {
  return (
    <div className="card lg:card-side bg-base-100 shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Conditionally render image if it exists */}
      {newsletter.imageUrl && (
        <figure className="lg:w-1/3">
          <img
            src={newsletter.imageUrl}
            alt={newsletter.title}
            className="w-full h-full object-cover"
          />
        </figure>
      )}

      <div className="card-body">
        <a
          href={`/newsletters/${newsletter.slug}`}
          className="card-title link link-hover"
        >
          {newsletter.title}
        </a>

        {newsletter.topic && (
          <div className="badge badge-outline">{newsletter.topic.name}</div>
        )}

        <p className="text-sm text-gray-500">
          Published on {new Date(newsletter.createdAt).toLocaleDateString()}
        </p>

        {/* Make entire card clickable (hidden link overlay) */}
        <a
          href={`/newsletters/${newsletter.slug}`}
          className="absolute inset-0 z-0"
          aria-label={`View ${newsletter.title}`}
        />
      </div>
    </div>
  );
}
