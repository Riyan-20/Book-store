// components/AuthorInfo.js
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function AuthorInfo({ authorId }) {
  const { data: author, error } = useSWR(`/api/authors?id=${authorId}`, fetcher);

  if (error) return <div>Failed to load author information.</div>;
  if (!author) return <div>Loading...</div>;

  return author ? (
    <div>
      <h2>{author.name}</h2>
      <p>{author.biography}</p>
    </div>
  ) : (
    <p>Author information not found.</p>
  );
}
