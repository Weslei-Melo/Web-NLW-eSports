import { Input } from "./Form/input";
import * as Dialog from '@radix-ui/react-dialog'
import { Check, GameController } from "phosphor-react";
import * as Checkbox from '@radix-ui/react-checkbox'
import { useEffect, useState , FormEvent } from "react";
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import axios from "axios";


interface Game {
    id: string;
    title: string;
  }
  
export function CreateAdModal(){
    const [weekDays, setWeekDays] = useState<string[]>([])
    const [games, setGames] = useState<Game[]>([]);
    const [voiceChannel, setVoiceChannel] = useState(false);
      
    console.log(weekDays)
    useEffect( ()=>{
        axios('http://localhost:3333/games')
        .then(response => {
        setGames(response.data)
        })
    } , [])

    async function handleCreateAd(event:FormEvent){
        event.preventDefault();
        console.log(voiceChannel)

        const formData = new FormData(event.target as HTMLFormElement)
        const data = Object.fromEntries(formData)
        console.log(data)
        console.log(`Dias da semana que joga: ${weekDays}`)
        console.log(`Usa voiceChannel: ${voiceChannel}`)
        console.log(`Discord: ${data.discord}`)
        console.log(`Joga a quanto tempo: ${data.yearsPlaying}`)
        console.log(`Nome: ${data.name}`)
        console.log(`Jogo: ${data.game}`)
        console.log(`Das: ${data.hourStart}`)
        console.log(`Ate: ${data.hourEnd}`)

        //validacoes:
        if(!data.name){
            console.log("For vazio, por favor preencha!")
            return
        }

        try {
           await axios.post(`http://localhost:3333/games/${data.game}/ads`,{
                name: data.name,
                yearsPlaying:  Number(data.yearsPlaying),
                discord: data.discord,
                weekDays: String(weekDays),
                hourStart: data.hourStart,
                hourEnd: data.hourEnd,
                useVoiceChannel: voiceChannel
             }) 
             alert("Anuncio criado com sucesso!")
        } catch (err) {
            console.log(`O erro foi: ${err}`)
            alert("Erro ao criar o anuncio!")
        }
    } 


    return(
        <Dialog.Portal>
            <Dialog.Overlay className='bg-black/60 inset-0 fixed' />

            <Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25'>
            <Dialog.Title className='text-3x font-black'>Publique um anuncio</Dialog.Title>

            
                <form onSubmit={handleCreateAd} className='mt-8 flex flex-col gap-4'>

                <div className='flex flex-col gap-2'>
                    <label className='font-semibold' htmlFor='game'>Qual o game?</label>
                    <select 
                        name='game' 
                        id='game' 
                        defaultValue=""
                        className='bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500' 
                    >
                        <option disabled  value="">Selecione o game que deseja jogar</option>
                        {games.map(game=>{
                            // console.log(game.title)
                            return (
                                <option key={game.id} value={game.id}> {game.title}</option>
                            )
                        })}
                    </select>
                </div>

                <div className='flex flex-col gap-2'>
                    <label htmlFor='name'>Seu nome [ou nickname]</label>
                    <Input name='name' id='name' placeholder='Como te chamam dentro do game?'/>
                </div>

                <div className='grid grid-cols-2 gap-6'>

                    <div className='flex flex-col gap-2'>
                    <label htmlFor='yearsPlaying'>Joga a quantos anos?</label>
                    <Input name='yearsPlaying' id='yearsPlaying' placeholder='Tudo bem ser ZERO!'/>
                    </div>

                    <div className='flex flex-col gap-2'>
                    <label htmlFor='discord'>Qual seu discord?</label>
                    <Input name='discord' id='discord' placeholder='Usuario#0000'/>
                    </div>

                </div>

                <div className='flex gap-6'>
                    <div className='flex flex-col gap-2 '>
                    <label htmlFor='weekDAys'>Quando costuma jogar?</label>
                    <div className='flex gap-1'>
                        <ToggleGroup.Root type='multiple' className="flex gap-1"  value={weekDays} onValueChange={setWeekDays}>
                            <ToggleGroup.Item value='0'  title="Domingo" className={`w-6 h-11 rounded  ${weekDays.includes('0') ? 'bg-violet-600' : 'bg-zinc-900'}`}>D</ToggleGroup.Item>
                            <ToggleGroup.Item value='1'  title="Segunda" className={`w-6 h-11 rounded  ${weekDays.includes('1') ? 'bg-violet-600' : 'bg-zinc-900'}`}>S</ToggleGroup.Item>
                            <ToggleGroup.Item value='2'  title="Terca" className={`w-6 h-11 rounded  ${weekDays.includes('2') ? 'bg-violet-600' : 'bg-zinc-900'}`}>T</ToggleGroup.Item>
                            <ToggleGroup.Item value='3'  title="Quarta" className={`w-6 h-11 rounded  ${weekDays.includes('3') ? 'bg-violet-600' : 'bg-zinc-900'}`}>Q</ToggleGroup.Item>
                            <ToggleGroup.Item value='4'  title="Quinta" className={`w-6 h-11 rounded  ${weekDays.includes('4') ? 'bg-violet-600' : 'bg-zinc-900'}`}>Q</ToggleGroup.Item>
                            <ToggleGroup.Item value='5'  title="Sexta" className={`w-6 h-11 rounded  ${weekDays.includes('5') ? 'bg-violet-600' : 'bg-zinc-900'}`}>S</ToggleGroup.Item>
                            <ToggleGroup.Item value='6'  title="Sabado" className={`w-6 h-11 rounded  ${weekDays.includes('6') ? 'bg-violet-600' : 'bg-zinc-900'}`}>S</ToggleGroup.Item>
                        </ToggleGroup.Root>
                    </div>
                    </div>
                    <div className='flex flex-col gap-2 flex-1'>
                    <label htmlFor='hourStart'>Qual horario do dia?</label>
                    <div className='grid grid-cols-2 gap-6 gap-2'>
                        <Input name='hourStart' id='hourStart' type='time' placeholder='De'></Input>
                        <Input name='hourEnd' id='hourEnd' type='time' placeholder='Ate'></Input>
                    </div>
                    </div>
                </div>
                
                <label className='mt-2 flex gap-2 text-sm items-center'>
                    
                    <Checkbox.Root 
                    checked= {voiceChannel}
                    onCheckedChange={(checked)=>{
                        
                        if(checked ===true){
                            setVoiceChannel(true)
                        }else{
                            setVoiceChannel(false)
                        }
                    }} 
                        className="w-6 h-6 rounded bg-zinc-900 p-1">
                    <Checkbox.Indicator>
                        <Check className="w-4 h-4 text-emerald-400 "  />
                    </Checkbox.Indicator>
                    </Checkbox.Root>  
                    Costumo me conectar ao chat de voz
                </label>

                <footer className='tp-4 flex justify-end gap-4'>
                    <Dialog.Close className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600'>Cancelar</Dialog.Close>
                    <button className='bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600' type='submit'>
                    <GameController className='w-6 h-6'/>
                    Encontrar duo
                    </button>
                </footer>

                </form>
            
            </Dialog.Content>
        </Dialog.Portal>
    )
    
}