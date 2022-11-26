import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/Layout.jsx';

export default function Home({ pokemon }) {
	console.log(pokemon);
	return (
		<div>
			<Layout title='Pokedex'>
				<h1 className='text-4xl mb-8 text-center'>Pokedex</h1>
				<ul>
					{pokemon.map((pokeman, index) => (
						<li key={index}>
							<Link href={`/pokemon?id=${index + 1}`}>
								<div className='border p-4 border-gray my-2 capitalize flex items-center text-lg bg-gray-200 rounded-md'>
									<img
										src={pokeman.image}
										alt={pokeman.name}
										className='w-20 h-20 mr-3'
									/>
									<span className='font-bold mr-2'>{index + 1}</span>
									{pokeman.name}
								</div>
							</Link>
						</li>
					))}
				</ul>
			</Layout>
		</div>
	);
}

export async function getStaticProps(context) {
	try {
		const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
		const { results } = await res.json();
		const pokemon = results.map((result, index) => {
			const paddedIndex = ('00' + (index + 1)).slice(-3);
			const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`;
			return {
				...result,
				image,
			};
		});
		return {
			props: { pokemon }, // will be passed to the page component as props
		};
	} catch (err) {
		console.error(err);
	}
}
