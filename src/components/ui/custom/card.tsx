interface Place {
  place: string;
  emoji: string;
  // Add more properties as needed
}

function Card({place}: {place: Place}) {
  return (
    <div className="shadow-md text-sm border rounded-xl p-3 mt-2 flex gap-5">
        <h2 className="text-6xl mr-4"> {place?.emoji} </h2>
        <div>
            <h2 className="font-bold text-lg"> {place?.place} </h2>
        </div>
    </div>
  )
}

export default Card