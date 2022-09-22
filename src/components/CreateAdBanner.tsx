import { MagnifyingGlassPlus } from "phosphor-react";

export function CreateAdBanner() {
    return (
        <div className='pt-1 bg-nlw-gradient self-stretch rounded-lg overflow-hidden mt-8'>
            <div className='bg-[#2A2634] px-9 py-8  flex justify-between items-center'>
                <div>
                    <strong className='text-2xl text-white font-black'>Nao encotrou o seu duo?</strong>
                    <span className='text-zinc-400 block'>Publique um anuncio para encontrar novos players</span>
                </div>
                <button className='py-3 px-4 bg-violet-500 hover:bg-violet-600 text-white rounded flex items-center gap-3'>
                    <MagnifyingGlassPlus size={24}/>
                    Publicar anuncio
                </button>
            </div>
      </div>
    )
}    
