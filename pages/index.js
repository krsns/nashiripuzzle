import Head from 'next/head';
import NumberCodingPuzzle from '../components/NumberCodingPuzzle';

export default function Home() {
  return (
    <>
      <Head>
        <title>Game Coding Nashiri - Belajar Angka & Warna</title>
        <meta name="description" content="Game coding sederhana untuk belajar angka dan warna" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NumberCodingPuzzle />
    </>
  );
}
