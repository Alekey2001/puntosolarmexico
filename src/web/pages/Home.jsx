import Hero from '../components/Hero.jsx';

export default function Home({ onQuoteRequest }) {
  return (
    <main>
      <Hero onQuoteRequest={onQuoteRequest} />
    </main>
  );
}
