import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Head from 'next/head'
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css'
import { PokemonType } from '../type/pokemon';

export async function getServerSideProps({ res }: GetServerSidePropsContext) {
  const resp = await fetch("https://sidebyside-images.s3.ap-southeast-1.amazonaws.com/config/pokemon-index.json");

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=60, stale-while-revalidate=10'
  )
  return {
    props: {
      pokemon: await resp.json(),
    }
  }
}

// export async function getStaticProps() {
//   const resp = await fetch(
//     "https://sidebyside-images.s3.ap-southeast-1.amazonaws.com/config/pokemon-index.json"
//   );

//   return {
//     props: {
//       pokemon: await resp.json(),
//     },
//   };
// }

export default function Home( { pokemon }: { pokemon: PokemonType[]}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Pokemon List</title>
      </Head>
      <h2>Pokemon List</h2>
      <div className={styles.grid}>
        {pokemon.map((pokemon) => (
          <div className={styles.card} key={pokemon.id}>
            <Link href={`/pokemon/${pokemon.id}`}>
              <img
                src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
                alt={pokemon.name}
              />
              <h3>{pokemon.name}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
