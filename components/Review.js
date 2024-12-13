// components/Review.js
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Review({ review }) {
  const { data: user } = useSWR(`/api/users?id=${review.userId}`, fetcher);

  return (
    <div>
      <p><strong>{user ? user.username : 'Unknown User'}</strong>: {review.comment}</p>
      <p>Rating: {review.rating}</p>
    </div>
  );
}
