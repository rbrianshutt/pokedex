import React from 'react';
import Layout from '../components/Layout.jsx';
import Link from 'next/link';

function pokemon({ pokeman }) {
	console.log(pokeman);
	return (
		<Layout title={pokeman.name}>
			<h1 className='text-4xl mb-2 text-center capitalize'>{pokeman.name}</h1>
			<img src={pokeman.image} alt={pokeman.name} className='mx-auto' />
			<p className='font-bold capitalize'>
				<span className='font-bold mr-2'>Species: </span>
				{pokeman.species.name}
			</p>
			<p className='font-bold'>
				<span className='font-bold mr-2'>Weight: </span>
				{pokeman.weight}
			</p>
			<p className='font-bold'>
				<span className='font-bold mr-2'>Height: </span>
				{pokeman.height}
			</p>
			<p className='font-bold'>Types: </p>
			{pokeman.types.map((type, index) => (
				<p key={index} className='capitalize'>
					{type.type.name}
				</p>
			))}

			<h2 className='text-2xl font-bold mt-6 mb-2'>Stats: </h2>
			{pokeman.stats.map((stat, index) => (
				<p key={index} className='capitalize font-bold'>
					{stat.stat.name}: {stat.base_stat}
				</p>
			))}
			<p className='mt-10 text-center'>
				<Link href='/'>
					<button className='text-2xl bg-gray-200 rounded-md p-4 mb-10'>Home</button>
				</Link>
			</p>
		</Layout>
	);
}

export async function getServerSideProps({ query }) {
	const id = query.id;
	try {
		const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
		const pokeman = await res.json();
		const paddedId = ('00' + id).slice(-3);
		pokeman.image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedId}.png`;
		return {
			props: { pokeman }, // will be passed to the page component as props
		};
	} catch (err) {
		console.error(err);
	}
}

export default pokemon;

