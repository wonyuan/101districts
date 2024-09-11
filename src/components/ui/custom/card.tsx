import { Link } from "react-router-dom";

interface Place {
  travel_time: string;
  ticket_pricing: string;
  detail: string;
  place: string;
  emoji: string;
  // Add more properties as needed
}

function Card({place}: {place: Place}) {
  return (
    <Link to={`https://www.google.com/maps/search/?api=1&query=${place?.place}`} target="_blank" rel="noreferrer">
    <div className="shadow-md text-sm border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 hover:shadow-md transition-all">
        <h2 className="text-6xl mr-4"> {place?.emoji} </h2>
        <div>
            <h2 className="font-bold text-lg"> {place?.place} </h2>
            <p className="text-xs text-gray-500"> {place?.detail}</p>
            <p className="text-sm font-medium pt-2"> 🎟️ {place?.ticket_pricing} </p>
            <p className="text-sm font-medium pt-2"> 🕗 {place?.travel_time} ETA </p>
        </div>
    </div>
    </Link>
  )
}

export default Card