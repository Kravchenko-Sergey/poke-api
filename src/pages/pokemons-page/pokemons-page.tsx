import { PokemonsList } from '../../components/pokemons-list/pokemons-list.tsx'
import { gql, useQuery } from '@apollo/client'
import { Loader } from '../../components/loader/loader.tsx'
import { useState } from 'react'
import s from './pokemons-page.module.scss'
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'

export const PokemonsPage = () => {
	const [selectValue, setSelectValue] = useState('')
	const [params, setParams] = useState({
		limit: 18,
		offset: 0
	})

	const GET_POKEMONS = gql`
		query pokemons($limit: Int, $offset: Int) {
			pokemons(limit: $limit, offset: $offset) {
				count
				next
				previous
				status
				message
				results {
					id
					url
					name
					image
				}
			}
		}
	`

	const { data, loading, error } = useQuery(GET_POKEMONS, {
		variables: params
	})

	const handleButton1 = () => {
		setParams({
			offset: params.offset > 1 ? params.offset - params.limit : params.offset,
			limit: params.limit
		})
	}

	const handleButton2 = () => {
		setParams({
			offset: params.offset + params.limit < data.pokemons.count ? params.offset + params.limit : params.offset,
			limit: params.limit
		})
	}

	const handleSelectValue = (e: SelectChangeEvent) => {
		setSelectValue(e.target.value)
		setParams({
			offset: params.offset,
			limit: Number(e.target.value)
		})
	}

	if (loading) return <Loader />
	if (error) return `Error! ${error.message}`

	return (
		<>
			<PokemonsList data={data} />
			<div className={s.buttons}>
				<button onClick={handleButton1} disabled={params.offset === 0}>
					prev
				</button>
				<button onClick={handleButton2} disabled={params.offset + params.limit > data.pokemons.count}>
					next
				</button>
				<FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
					<InputLabel id='demo-select-small-label'>pageSize</InputLabel>
					<Select
						labelId='demo-select-small-label'
						id='demo-select-small'
						value={selectValue}
						label='pageSize'
						onChange={handleSelectValue}
					>
						<MenuItem value={3}>3</MenuItem>
						<MenuItem value={9}>9</MenuItem>
						<MenuItem value={18}>18</MenuItem>
					</Select>
				</FormControl>
			</div>
		</>
	)
}
