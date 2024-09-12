import { db } from "@/service/firebaseConfig";
import { collection, DocumentData, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HistoryCard from "@/components/ui/custom/historyCard";

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

function TripHistory() {
  const router = useNavigate();
  const [userTrips, setUserTrips] = useState<DocumentData[]>([]);
  useEffect(() => {
    GetUserTrips();
  },[])
  /**
  * Get all trips for the logged in user
  * @returns
  */
  const GetUserTrips = async() => {
    const user = JSON.parse(localStorage.getItem('user') || '');
    if (!user){
        router('/')
        return ;
    }
    const tripQuery = query(collection(db, 'trips'), where('userEmail','==',user?.email));
    const querySnapshot = await getDocs(tripQuery);
    setUserTrips([]);
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        setUserTrips(prev => [...prev, doc.data()]);
    });
  }
  
  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-100 px-5 mt-10 mb-20">
        <h2 className="font-bold text-xl pb-2"> All Your Past Itineraries </h2>
        <div className="grid grid-cols-3 gap-6">
            {userTrips.map((trip) => (
                <HistoryCard trip={trip as Trip} />
            ))}
        </div>
    </div>
  )
}

export default TripHistory