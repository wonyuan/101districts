import { db } from "@/service/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function TripHistory() {
  const router = useNavigate();
  useEffect(() => {
    GetUserTrips();
  },[])
  const GetUserTrips = async() => {
    const user = JSON.parse(localStorage.getItem('user') || '');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    // const router = useNavigate();
    if (!user){
        router('/')
        return ;
    }
    const tripQuery = query(collection(db, 'trips'), where('userEmail','==',user?.email));
    const querySnapshot = await getDocs(tripQuery);
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
    });
  }
  
  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-100 px-5 mt-10 mb-20">
        <h2 className="font-bold text-xl"> All Your Past Itineraries </h2>
    </div>
  )
}

export default TripHistory