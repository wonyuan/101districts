import { IconBeach } from '@tabler/icons-react';
import { Button } from "@/components/ui/button"

function Header () {
    return (
        <>
        <div className="p-2 shadow-sm flex justify-between items-center px-5"> 
          <IconBeach stroke={2} size={38} />
          <div>
            <Button>
                Sign In
            </Button>
          </div>
        </div>
        </>
    )
}

export default Header