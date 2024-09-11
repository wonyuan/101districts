import { IconBeach } from '@tabler/icons-react';
import { Button } from "@/components/ui/button"
import { useEffect } from 'react';
import { Link } from 'react-router-dom'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
  

function Header () {
    const user = JSON.parse(localStorage.getItem('user') || '');
    
    useEffect(() => {
        console.log(user);
    }, [user])

    return (
        <>
        <div className="p-2 shadow-sm flex justify-between items-center px-5"> 
          <IconBeach stroke={2} size={38} />
          <div>
            { user ? 
            <div className="flex gap-3">
                <Link to={'/create-trip'}>
                    <Button> 
                        + Create a Trip 
                    </Button>
                </Link>
                <Button variant="outline"> View Trips</Button>
                <img src={user?.picture} className="rounded-xl h-[35px]"/>
                <Popover>
                    <PopoverTrigger>Open</PopoverTrigger>
                    <PopoverContent>Place content for the popover here.</PopoverContent>
                </Popover>
            </div>
             :
            <Button>
                Sign In
            </Button>
            } 
          </div>
        </div>
        </>
    )
}

export default Header