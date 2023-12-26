import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import './index.css'

const client = new ApolloClient({
	uri: 'https://graphql-pokeapi.vercel.app/api/graphql',
	cache: new InMemoryCache()
})

ReactDOM.createRoot(document.getElementById('root')!).render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>
)
