import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { Input } from "@/components/ui/input"
import { useEffect, useState } from 'react'
import { geminiPrompt, TravelBudget, TravelParty } from '@/constants/text'
import { Button } from '@/components/ui/button'
import { toast } from "sonner"
import { chatSession } from '@/service/model'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog"
import { IconBeach } from '@tabler/icons-react';
import { IconBrandGoogleFilled, IconLoader2 } from '@tabler/icons-react';
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { doc, setDoc } from "firebase/firestore"; 
import { db } from '@/service/firebaseConfig'
import { useNavigate } from 'react-router-dom'

function CreateTrip() {
  const router = useNavigate();
  const [place, setPlace] = useState<{ label: string; value: string } | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  interface FormData {
    budget: string;
    location: { label: string; value: string } | null;
    noOfDays: string;
    party: string;
  }
  
  const [formData, setFormData] = useState<FormData>({
    budget: '',
    location: null,
    noOfDays: '',
    party: '',
  });
  const handleInputChange = (name: string, value: string | { label: string; value: string } | null | number) => {
    setFormData({
      ...formData,
      [name]: value || '',
    })
  }

  const login = useGoogleLogin({
    onSuccess: (response) => getUserProfile(response),
    onError: (error) => console.log(error),
  })

  const generateTrip = async () => {
    const user = localStorage.getItem('user');
    if (!user) {
      setOpenDialog(true);
    }
    if (!formData?.location || !formData?.noOfDays || !formData?.party || !formData?.budget) {
      toast('Please fill in all fields');
      return ;
    }
    if (Number(formData.noOfDays) > 5) {
      toast('We only plan trips for 5 days or less');
      return ;
    }
    setLoading(true);
    const FINAL_PROMPT = geminiPrompt
    .replace(/{locationName}/g, formData?.location?.label || '')
    .replace(/{totalDays}/g, formData?.noOfDays.toString() || '') // Use regex with 'g' flag
    .replace(/{travelParty}/g, formData?.party || '')
    .replace(/{travelBudget}/g, formData?.budget || '');
    console.log(FINAL_PROMPT);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    setLoading(false);
    storeTrip(result?.response?.text());
  }
    
  useEffect(() => {
    console.log(formData);
  }, [formData])

  const storeTrip = async (tripData: string) => {
    setLoading(true);
    const docId = Date.now().toString();
    const user = JSON.parse(localStorage.getItem('user') || '');
    await setDoc(doc(db, "trips", docId),{
      userPreferences: formData,
      tripData: JSON.parse(tripData),
      userEmail: user?.email,
      id: docId,
    });
    setLoading(false);
    router(`/view-trip/${docId}`);
  }
  const getUserProfile = async (userToken: { access_token: string }) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${userToken?.access_token}`,{
      headers: {
        Authorization: `Bearer ${userToken?.access_token}`,
        Accept: 'Application/json',
      }
    }).then((response) => {
      console.log(response);
      localStorage.setItem('user', JSON.stringify(response.data));
      setOpenDialog(false);
      generateTrip();
    })
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-100 px-5 mt-10 mb-20">
      <h1 className="font-bold text-[28px]">
        Envision Your Trip
      </h1>
      <p className="mt-3 text-gray-500 text-xl">
        if we're going to plan your trip, we're going to want to plan it right. 
        <br/>
        fill in the details and we'll try to match you to an itinerary best for you!
      </p>
      <div className="mt-8 gap-10">
        <div>
          <h2 className="text-xl my-3 font-medium">
            Where are we headed?
            <div className="py-2">
            <GooglePlacesAutocomplete
              apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
              selectProps={{
                value: place,
                onChange: (v: { label: string; value: string } | null) => {
                  setPlace(v);
                  handleInputChange('location', v || '');
                },
                placeholder: "Enter a location...",
                styles: {
                  placeholder: (provided) => ({
                    ...provided,
                    fontSize: '14px', 
                  }),
                  control: (provided) => ({
                    ...provided,
                    fontSize: '14px',
                  }),
                  singleValue: (provided) => ({
                    ...provided,
                    fontSize: '14px',
                  }),
                },            
              }}
            >
            </GooglePlacesAutocomplete>
            </div>
          </h2>
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">
            How long is this getaway?
            <div className="py-2">
            <Input 
              placeholder={'ex. 3'} 
              type="number" 
              onChange={(e)=>handleInputChange('noOfDays', (e.target.value))}
              />
            </div>
          </h2>
        </div>
      </div>
      <div>
        <h2 className="text-xl my-3 pt-8 font-medium">
          What's our budget looking like?
        </h2>
        <div className="grid grid-cols-3 gap-5 mt-2">
          {TravelBudget.map((item, idx) => (
            <div 
              key={idx} 
              className={`p-4 border border-gray-300 rounded-lg hover:shadow-md ${formData?.budget == item.name && 'shadow-md border border-gray-500'}`}
              onClick={() => handleInputChange('budget', item.name)}
            >
              <h2 className="text-3xl">
                {item.icon}
              </h2>
              <h2 className="font-semibold">
                {item.name}
              </h2>
              <h2 className="text-gray-500">
                {item.desc}
              </h2>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-xl my-3 pt-8 font-medium">
          Finally, what's the party situation?
        </h2>
        <div className="grid grid-cols-3 gap-5 mt-2">
          {TravelParty.map((item, idx) => (
            <div 
              key={idx} 
              className={`p-4 border border-gray-300 rounded-lg hover:shadow-md ${formData?.party == item.name && 'shadow-md border border-gray-500'}`}
              onClick={() => handleInputChange('party', item.name)}
            >
              <h2 className="text-3xl">
                {item.icon}
              </h2>
              <h2 className="font-semibold">
                {item.name}
              </h2>
              <h2 className="text-gray-500">
                {item.desc}
              </h2>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-10 flex justify-end">
        <Button 
          onClick={generateTrip}
          disabled={loading}
        > 
        { loading ?
          <IconLoader2 stroke={2} className="h-7 w-7 animate-spin"/>:
          <>
          CREATE MY PLAN 
          </>
      }
        </Button>
      </div>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <IconBeach stroke={2} size={38} color='black' />
              <h2 className="font-bold text-lg mt-7 text-gray-900"> Log In with Google</h2>
              <p> Before we can create your plan, authenticate yourself via Google.</p>
            </DialogDescription>
            <div className="py-5">
            <Button 
              onClick={() => login()}
            > 
              <IconBrandGoogleFilled className="pr-2"/>
              Sign In with Google
            </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default CreateTrip