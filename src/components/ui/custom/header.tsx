import { IconBeach } from '@tabler/icons-react';
import { Button } from "@/components/ui/button"
import { useEffect, useState } from 'react';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
  

function Header () {
    const [user, setUser] = useState(() => {
        const userJson = localStorage.getItem('user');
        return userJson ? JSON.parse(userJson) : null;
    })
    
    const login = useGoogleLogin({
        onSuccess: (response) => getUserProfile(response),
        onError: (error) => console.log(error),
      })

    const getUserProfile = async (userToken: { access_token: string }) => {
        axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${userToken?.access_token}`,{
          headers: {
            Authorization: `Bearer ${userToken?.access_token}`,
            Accept: 'Application/json',
          }
        }).then((response) => {
          localStorage.setItem('user', JSON.stringify(response.data));
          setUser(response);
          window.location.reload();
        })
      };
    
    useEffect(() => {
    }, [user])

    return (
        <>
        <div className="p-2 shadow-sm flex justify-between items-center px-5"> 
            <a href='/'>
          <IconBeach stroke={2} size={38} />
          </a>
          <div>
            { user ? 
            <div className="flex gap-3">
                <a href='/create-trip'>
                    <Button> + Create a Trip </Button>
                </a>
                <a href='/trip-history'>
                    <Button variant="outline"> View Trips</Button>
                </a>
                <Popover >
                    <PopoverTrigger>
                        <img src={user?.picture} className="rounded-xl h-[35px]"/>
                    </PopoverTrigger>
                    <PopoverContent>
                        <h2 onClick={() => {
                            googleLogout();
                            localStorage.clear();
                            setUser(null);
                            window.location.reload();
                        }}
                        className="cursor-pointer"> 
                            Logout
                        </h2>
                    </PopoverContent>
                </Popover>
            </div>
             :
            <Button onClick={() => login()}>
                Sign In
            </Button>
            } 
          </div>
        </div>
        </>
    )
}

export default Header