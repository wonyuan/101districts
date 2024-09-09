import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { Input } from "@/components/ui/input"
import { useEffect, useState } from 'react'
import { TravelBudget, TravelParty } from '@/constants/text'
import { Button } from '@/components/ui/button'
import { toast } from "sonner"

function CreateTrip() {
  const [place, setPlace] = useState<{ label: string; value: string } | null>(null);
  const [formData, setFormData] = useState({
    budget: '',
    location: null,
    noOfDays: 0,
    party: '',
  });
  const handleInputChange = (name: string, value: string | { label: string; value: string } | null | number) => {
    setFormData({
      ...formData,
      [name]: value || '',
    })
  }

  const generateTrip = () => {
    if (formData.noOfDays > 5) {
      toast('We only plan trips for 5 days or less');
      return ;
    }
    console.log(formData.noOfDays > 5)
    console.log(formData);
  }
    
  useEffect(() => {
    console.log(formData);
  }, [formData])

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
              onChange={(e)=>handleInputChange('noOfDays', Number(e.target.value))}
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
        <Button onClick={generateTrip}> 
          CREATE MY PLAN 
        </Button>
      </div>
    </div>
  )
}

export default CreateTrip