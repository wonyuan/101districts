import { Badge } from "@/components/ui/badge"
import { Link } from 'react-router-dom'
import { IconCalendarEvent, IconMoneybag, IconSparkles } from '@tabler/icons-react';

interface Trip {
  id: string;
  userPreferences: {
    location: {
      label: string;
    };
    noOfDays: number;
    budget: string;
    party: string;
  };
  tripData: {
    itinerary: {
      activities: {
        emoji: string;
      }[];
    }[];
  };
}

function HistoryCard({trip}: {trip: Trip}) {
  const tripPref = trip?.userPreferences;
  const emoji = trip?.tripData?.itinerary[0]?.activities[3]?.emoji;
  const tripId = trip?.id;
  return (
    <Link to={`/view-trip/${tripId}`}>
    <div className="shadow-md text-sm border rounded-xl py-4 px-6 mt-2 flex gap-5 hover:scale-105 hover:shadow-md transition-all">
        <div>
            <div className="flex items-end justify-end pb-3">
            <h2 className="text-8xl mr-4 pr-2"> {emoji} </h2>
            <h2 className="text-lg font-medium align-bottom"> {tripPref?.location?.label} </h2>
            </div>
            <Badge variant='outline' className="rounded-xl border-gray-300 my-1 px-3"> <IconCalendarEvent className="pr-1"/> {tripPref?.noOfDays} days</Badge>
            <Badge variant='outline' className="rounded-xl border-gray-300 my-1 px-3 ml-2"> <IconMoneybag className="pr-1"/> {tripPref?.budget} </Badge>
            <Badge variant='outline' className="rounded-xl border-gray-300 my-1 px-3"> <IconSparkles className="pr-1"/> {tripPref?.party} </Badge>
        </div>
    </div>
    </Link>
  )
}

export default HistoryCard