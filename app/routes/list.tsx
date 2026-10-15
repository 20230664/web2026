import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router"
import type { Route } from "./+types/list"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "포켓몬" },
    { name: "description", content: "포켓몬 도감" },
  ]
}

type Pokemon = {
  id: number
  name: string
  image: string
}

export default function List() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([])

  useEffect(() => {
    async function fetchPokemons() {
      try {
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=100")
        const results = response.data.results
        // console.log("포켓몬 results[]:", results)
        
        // results.map을 통해 생성된 100개의 비동기 통신(Promise)들을 하나로 묶어 동시에 실행
        const pokemonData: Pokemon[] = await Promise.all(
          results.map(async ( {url} : { url: string }) => {
            const pokemonResponse = await axios.get(url)
            const { id, name, sprites } = pokemonResponse.data
            return {
              id,
              name,
              image: sprites.other["official-artwork"].front_default,
            }
          })
        )

        setPokemons(pokemonData)
      } catch (error) {
        console.error("포켓몬 데이터 에러: ", error)
      }
    }

    fetchPokemons()
  }, [])


  if (pokemons.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 p-6 flex items-center justify-center text-xl font-semibold text-slate-900">
        포켓몬 데이터를 불러오지 못했습니다.
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <h1 className="text-2xl font-bold mb-6 text-slate-800">포켓몬 목록</h1>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {pokemons.map((pokemon) => (
          <Link 
            to={`detail/${pokemon.id}`}
            className="bg-white rounded-xl shadow hover:shadow-md transition
                      p-4 flex flex-col items-center gap-2
                      border border-slate-200 hover:border-yellow-400"
            key={pokemon.id}>
            <img className="w-24 h-24" src={pokemon.image} alt={pokemon.name} />
            <p className="font-semibold text-slate-700">{pokemon.name}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
