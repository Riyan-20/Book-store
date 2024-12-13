// pages/info/[...slug].js
import { useRouter } from 'next/router';
import styles from './Info.module.css'; 

const InfoPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  // Handling different slugs
  let content;

  // If slug is undefined or empty, render the default content for /info
  if (!slug || slug.length === 0) {
    content = (
      <>
        <h1 className={styles.title}>Welcome to the Info Page</h1>
        <p className={styles.text}>Choose a section: FAQs or Support.</p>
      </>
    );
  } else if (slug[0] === 'faqs') {
    content = (
      <>
        <h1 className={styles.title}>FAQs</h1>
        <p className={styles.text}>Here you can find answers to the most frequently asked questions.</p>
      </>
    );
  } else if (slug[0] === 'support') {
    content = (
      <>
        <h1 className={styles.title}>Support</h1>
        <p className={styles.text}>Contact us for support regarding any issues you may have.</p>
      </>
    );
  } else {
    content = <h1 className={styles.title}>404 - Page Not Found</h1>; // Handle unknown routes
  }

  return (
    <div className={styles.container}>
      {content}
    </div>
  );
};

export default InfoPage;
