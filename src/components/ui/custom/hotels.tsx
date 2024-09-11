import { Link } from "react-router-dom";

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

function Hotels({trip}: {trip: Trip}) {
    return (
        <div>
            <h2 className="font-bold text-xl pt-6 pb-2"> A Humble Abode</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {trip?.tripData?.hotels?.map((hotel, idx) => (
                    <Link to={`https://www.google.com/maps/search/?api=1&query=${hotel?.name}`} key={idx} target="_blank" rel="noreferrer">
                    <div className="hover:scale-105 transition-all text-6xl">
                        {/* <img src="/fireworks.jpg" className="rounded-xl"/> */}
                        {hotel?.emoji}
                        <div className="my-2 text-base font-semibold">
                            <h2>{hotel?.name}</h2>
                            <p className="text-xs font-medium text-gray-500 my-1"> 📍 {hotel?.address}</p>
                            <p className="text-sm font-medium my-1"> 💵 {hotel?.price}</p>
                            <p className="text-sm font-medium my-1"> ⭐ {hotel?.rating}</p>
                            <p className="text-xs font-medium text-gray-500 my-1"> 💬 {hotel?.description}</p>
                        </div>
                    </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Hotels