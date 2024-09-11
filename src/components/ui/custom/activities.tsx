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
                time: string;
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
                    <div className="pb-8">
                        <h2 className="font-medium text-lg"> {place?.day}</h2>
                        <div className='grid grid-cols-2 gap-x-12'>
                        {place?.activities.map((activity, idx) => (
                            <div>
                                <h2 className="font-medium text-sm text-amber-700 pt-3">{activity?.time}</h2>
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