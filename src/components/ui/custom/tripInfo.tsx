import { Badge } from "@/components/ui/badge"
import { IconCalendarEvent, IconMoneybag, IconSparkles } from '@tabler/icons-react';

interface Trip {
    userPreferences: {
        location: {
            label: string;
        };
        budget: string;
        party: string;
        noOfDays: string;
    };
}

function InfoSection({trip}: {trip: Trip}) {
    return (
        <div className="pt-4">
            <h2 className="font-bold text-2xl pb-2"> {trip?.userPreferences?.location?.label} </h2>
            <Badge variant='outline' className="rounded-xl border-gray-300 py-1 px-3"> <IconCalendarEvent className="pr-1"/> {trip?.userPreferences?.noOfDays} days</Badge>
            <Badge variant='outline' className="rounded-xl border-gray-300 py-1 px-3 ml-2"> <IconMoneybag className="pr-1"/> {trip?.userPreferences?.budget} </Badge>
            <Badge variant='outline' className="rounded-xl border-gray-300 py-1 px-3 ml-2"> <IconSparkles className="pr-1"/> {trip?.userPreferences?.party} </Badge>
        </div>
    )
}

export default InfoSection