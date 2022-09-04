import { HomeIcon,
         MagnifyingGlassIcon, 
         BuildingLibraryIcon , 
         PlusCircleIcon,
        HeartIcon,
        BookmarkIcon} from '@heroicons/react/24/solid'

function Sidebar() {
  return (
    <div className='text-gray-500 p-5 text-sm border-gray-700'>
        <div className='space-y-4'>
            <button className='flex items-center space-x-2 hover:text-white'>
                <HomeIcon className="h-6 w-6"/>
                <p>Home</p>
            </button>
        
            <button className='flex items-center space-x-2 hover:text-white'>
                <MagnifyingGlassIcon className="h-6 w-6"/>
                <p>Search</p>
            </button>

            <button className='flex items-center space-x-2 hover:text-white'>
                <BuildingLibraryIcon className="h-6 w-6"/>
                <p>Library</p>
            </button>
            
            <br className='mt-5' />

            <button className='flex items-center space-x-2 hover:text-white'>
                <PlusCircleIcon className="h-6 w-6"/>
                <p>Home</p>
            </button>
        
            <button className='flex items-center space-x-2 hover:text-white'>
                <HeartIcon className="h-6 w-6"/>
                <p>Search</p>
            </button>

            <button className='flex items-center space-x-2 hover:text-white'>
                <BookmarkIcon className="h-6 w-6"/>
                <p>Library</p>
            </button>
            <hr className='border-t-[0.1px] border-gray-700' />

            <p>
                playlist 1
            </p>
        </div>
    </div>
  )
}

export default Sidebar