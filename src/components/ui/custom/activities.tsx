import { Link } from "react-router-dom";
import Card from "@/components/ui/custom/card";

interface Trip {
    userPreferences: {
        location: {
            label: string;
        };
        budget: string;
        party: string;
        noOfDays: string;
    };
    tripData?: {
        itinerary?: {
            activities: [{
                place: string;
                time_range: string;
                description: string;
                emoji: string;
            }];
            day: string;
}[]; 
    };
}

function Activities({trip}: {trip: Trip}) {
    return (
        <div>
            <h2 className="font-bold text-xl pt-6 pb-2"> And Now,</h2>
            <div>
                {trip?.tripData?.itinerary?.map((place, idx) => (
                    <div className='grid grid-cols-2'>
                        <div>
                        <h2 className="font-medium text-lg"> {place?.day}</h2>
                        {place?.activities.map((activity, idx) => (
                            <div>
                                <h2 className="font-medium text-sm text-sky-950">{activity?.time_range}</h2>
                                <Card place={activity}/>
                            </div>
                        ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Activities