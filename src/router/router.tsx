import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { PokemonsPage } from '../pages/pokemons-page/pokemons-page.tsx'
import { PokemonPage } from '../pages/pokemon-page/pokemon-page.tsx'

const router = createBrowserRouter([
	{
		path: '/',
		element: <PokemonsPage />
	},
	{
		path: '/:name',
		element: <PokemonPage />
	}
])

export const Router = () => <RouterProvider router={router} />
