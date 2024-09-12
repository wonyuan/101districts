import InfoSection from "@/components/ui/custom/tripInfo";
import { db } from "@/service/firebaseConfig";
import { collection, doc, getDoc, DocumentData } from "firebase/firestore";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { toast } from "sonner";
import RandomImage from "@/components/ui/custom/imageHeader";
import Hotels from "@/components/ui/custom/hotels";
import Activities from "@/components/ui/custom/activities";

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
                travel_time: string;
                ticket_pricing: string;
                detail: string;
            }];
            day: string;
        }[],
        hotels?: {
            description: string;
            rating: string;
            price: string;
            address: string;
            name: string; 
            emoji: string 
        }[]; 
    };
}


function ViewTrip() {
    const { tripId } = useParams()
    
    const [trip, setTrip] = useState<DocumentData | null>(null);

    useEffect(() => {
        if (tripId) {
            getTripData();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tripId])

    const getTripData = async() => {
        const collectionRef = collection(db, 'trips');
        const docRef = doc(collectionRef, tripId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log('document:', docSnap.data());
            setTrip(docSnap.data());
        }
        else {
            toast('Trip not found');
        }
    }

    return (
        <div className="sm:px-10 md:px-32 lg:px-56 xl:px-100 px-5 mt-10 mb-20">
            <RandomImage/>
            <InfoSection trip={trip as Trip}/>
            <Hotels trip={trip as Trip}/>
            <Activities trip={trip as Trip}/>
        </div>
    )
}

export default ViewTrip