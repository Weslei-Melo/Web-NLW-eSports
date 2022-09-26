import './styles/main.css';
import { useState , useEffect} from 'react'
import logoImg from './assets/logo-nlw-esports.svg'
import { GamerBanner } from './components/GamerBanner';
import { CreateAdBanner } from './components/CreateAdBanner';
import * as Dialog from '@radix-ui/react-dialog'
import { CreateAdModal } from './components/CreateAdModal';
import axios from 'axios';


interface Game {
  id: string;
  title: string;
  bannerURL: string;
  _count: {
    ads: number;
  }
}

function App(){
  
  const [games, setGames] = useState<Game[]>([]);

  useEffect( ()=>{
    axios('http://localhost:3333/games')
    .then(response => {
      setGames(response.data)
    })
  } , [] )
    
  return(
    <div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
      <img src= {logoImg}  />
      <h1 className='text-6xl text-white font-black mt-20'>
        Seu <span className='text-transparent bg-nlw-gradient bg-clip-text'>duo</span> esta aqui.
      </h1>

      <div className='grid grid-cols-6 gap-6 mt-16'>
        
        {games.map(game=>{
          console.log(`URL: ${game.bannerURL} `)
          console.log(game)
          return(
            <GamerBanner 
              key={game.id}
              title={game.title}
              bannerURL= {String(game.bannerURL)}
              // bannerURL= 'https://static-cdn.jtvnw.net/ttv-boxart/511224-285x380.jpg'
              adsCount={game._count.ads}
            />
          )
        })}
      </div>

      <Dialog.Root> 
        <CreateAdBanner/>

        <CreateAdModal/>
      </Dialog.Root>
      
    </div>
  )
}
export default App
