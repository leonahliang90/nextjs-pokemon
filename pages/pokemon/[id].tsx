/* eslint-disable @next/next/no-img-element */
import React from "react";
import Head from "next/head";
import Link from "next/link";
import { PokemonType, PokemonDetailType } from '../../type/pokemon';
import styles from "../../styles/Details.module.css";
import { GetServerSidePropsContext } from "next";

export async function getServerSideProps({ res, params }: GetServerSidePropsContext & { params: PokemonType }) {
  const resp = await fetch(
    `https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${params.id}.json`
  );

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

// export async function getStaticPaths() {
//   const resp = await fetch(
//     "https://sidebyside-images.s3.ap-southeast-1.amazonaws.com/config/pokemon-index.json"
//   );
//   const pokemon = await resp.json();

//   return {
//     paths: pokemon.map((pokemon: PokemonType) => ({
//       params: { id: pokemon.id.toString() },
//     })),
//     fallback: false,
//   };
// }

// export async function getStaticProps({ params }: {params: PokemonType}) {
//   const resp = await fetch(
//     `https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${params.id}.json`
//   );

//   return {
//     props: {
//       pokemon: await resp.json(),
//     },
//     revalidate: 10,
//   };
// }

export default function Details({ pokemon }: { pokemon: PokemonDetailType}) {
  return (
    <div>
      <Head>
        <title>{pokemon.name}</title>
      </Head>
      <div>
        <Link href="/">
          Back to Home
        </Link>
      </div>
      <div className={styles.layout}>
        <div>
          <img
            className={styles.picture}
            src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
            alt={pokemon.name}
          />
        </div>
        <div>
          <div className={styles.name}>{pokemon.name}</div>
          <div className={styles.type}>{pokemon.type.join(", ")}</div>
          <table>
            <thead className={styles.header}>
              <tr>
                <th>Name</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {pokemon.stats.map(({ name, value }) => (
                <tr key={name}>
                  <td className={styles.attribute}>{name}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}