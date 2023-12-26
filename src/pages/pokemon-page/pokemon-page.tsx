import { gql, useQuery } from '@apollo/client'
import { useNavigate, useParams } from 'react-router-dom'
import { Card } from '@mui/material'
import { Loader } from '../../components/loader/loader.tsx'
import s from './pokemon-page.module.scss'

type Ability = {
	__typename: string
	ability: {
		__typename: string
		name: string
	}
}

export const PokemonPage = () => {
	const navigate = useNavigate()
	const params = useParams()
	const GET_POKEMON = gql`
		query pokemon($name: String!) {
			pokemon(name: $name) {
				id
				name
				abilities {
					ability {
						name
					}
				}
				moves {
					move {
						name
					}
				}
				types {
					type {
						name
					}
				}
				message
				status
			}
		}
	`
	const gqlVariables = {
		name: params.name
	}

	const { data, loading, error } = useQuery(GET_POKEMON, {
		variables: gqlVariables
	})

	const handleBackToPokemons = () => navigate('/')

	if (loading) return <Loader />
	if (error) return `Error! ${error.message}`

	return (
		<Card className={s.root}>
			<h2 className={s.name}>{data.pokemon.name}</h2>
			<div className={s.abilityBox}>
				<p className={s.title}>ability:</p>
				{data.pokemon.abilities.map((el: Ability) => (
					<p key={el.ability.name}>{el.ability.name}</p>
				))}
			</div>
			<button onClick={handleBackToPokemons} className={s.backBtn}>
				Back to pokemons
			</button>
		</Card>
	)
}
