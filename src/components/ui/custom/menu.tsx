import { Link } from 'react-router-dom'
import { IconBeach } from '@tabler/icons-react';
import { Button } from '@/components/ui/button'


function Menu() {
  return (
    <div className='flex items-center mx-5 sm:mx-10 md:mx-32 lg:mx-56 my-56 flex-col'>
        <IconBeach stroke={2} size={60} />
        <h1 className="font-extrabold text-[32px]">
          101districts
        </h1>
        <p className="text-center mb-4">
            built on all the reasons why your last trip failed, so you can make
            <br/>
            the next one a success; listing weather, hotels, and more.
        </p>
        <Link to={'/create-trip'}>
        <Button>
            CREATE A PLAN
        </Button>
        </Link>
    </div>
  )
}

export default Menu