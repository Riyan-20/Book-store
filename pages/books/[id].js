// pages/books/[id].js
import data from '../../public/data/books.json';
import Link from 'next/link'; 
import Review from '../../components/Review';
import styles from './BookDetails.module.css';

export async function getStaticPaths() {
  const paths = data.books.map((book) => ({
    params: { id: book.id },
  }));

  return {
    paths,
    fallback: 'blocking', 
  };
}

export async function getStaticProps({ params }) {
  const book = data.books.find((b) => b.id === params.id);

  if (!book) {
    return {
      notFound: true,
    };
  }

  const author = data.authors.find((a) => a.id === book.authorId);
  const reviews = data.reviews.filter((review) => review.bookId === book.id);

  return {
    props: {
      book,
      author,
      reviews,
    },
    revalidate: 10, 
  };
}

export default function BookDetails({ book, author, reviews }) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{book.title}</h1>
      <p className={styles.description}>{book.description}</p>
      <p className={styles.price}>Price: ${book.price}</p>
      <p className={styles.rating}>Rating: {book.rating}</p>

      <h3 className={styles.authorInfo}>Author</h3>
      <Link href={`/books/${book.id}/author`} className={styles.authorLink}>
        <p className={styles.authorName}>{author.name}</p>
      </Link>

      <h3 className={styles.reviews}>Reviews</h3>
      {reviews.map((review) => (
        <Review key={review.id} review={review} />
      ))}
    </div>
  );
}
