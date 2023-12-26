import { Pokemon } from '../pokemon/pokemon'
import { useNavigate } from 'react-router-dom'
import s from './pokemons-list.module.scss'

type PokemonsData = {
	count: number
	message: string
	next: string
	previous: string
	results: Pokemon[]
	status: boolean
	__typename: string
}

type Pokemon = {
	id: number
	image: string
	name: string
	url: string
	__typename: string
}

type PokemonsListProps = {
	data: {
		pokemons: PokemonsData
	}
}

export const PokemonsList = ({ data }: PokemonsListProps) => {
	const navigate = useNavigate()

	const handlePokemonClick = (name: string) => {
		navigate(`/${name}`)
	}

	return (
		<div className={s.pokemonsList}>
			{data.pokemons.results.map((pokemon: Pokemon) => {
				return (
					<Pokemon
						key={pokemon.name}
						name={pokemon.name}
						image={pokemon.image}
						handlePokemonClick={handlePokemonClick}
					/>
				)
			})}
		</div>
	)
}
