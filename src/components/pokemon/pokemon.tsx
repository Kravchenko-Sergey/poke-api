import s from './pokemon.module.scss'
import { Card } from '@mui/material'

type PokemonProps = {
	name: string
	image: string
	handlePokemonClick: (name: string) => void
}

export const Pokemon = ({ name, image, handlePokemonClick }: PokemonProps) => {
	return (
		<Card key={name} onClick={() => handlePokemonClick(name)} className={s.card}>
			<img src={image} alt={`pokemon ${name}`} className={s.itemImage} />
			<div className={s.itemInfo}>
				<div className={s.property}>
					<span>name:</span>
					<p>{name}</p>
				</div>
			</div>
		</Card>
	)
}
