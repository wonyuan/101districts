export const TravelParty = [
    {
        id: 1,
        name: 'going solo',
        desc: 'i need one man party activities!',
        icon: '🕺',
        size: '1 person',
    },
    {
        id: 2,
        name: 'a couple',
        desc: 'always more fun with two',
        icon: '🥂',
        size: '2 people',
    },
    {
        id: 3,
        name: 'a few friends',
        desc: 'made it out of the groupchat!',
        icon: '⛵',
        size: '3-5 people',
    },
    {
        id: 4,
        name: 'a family',
        desc: 'some familial bonding time',
        icon: '🏡',
        size: '3-5 people',
    },
    {
        id: 5,
        name: 'a friend group',
        desc: 'the more the merrier',
        icon: '🎉',
        size: '6+ people',
    },
]

export const TravelBudget = [
    {
        id: 1,
        name: 'cheap',
        desc: "let's keep it simple!",
        icon: '🪙',
    },
    {
        id: 2,
        name: 'moderate',
        desc: "i'm here for a good time",
        icon: '🍸',
    },
    {
        id: 3,
        name: 'luxury',
        desc: "i'd like to go all out!",
        icon: '💳',
    },
]

export const geminiPrompt = 'Generate a travel plan/itinerary for a location, {locationName} for {totalDays} days for {travelParty} with a {travelBudget} budget. Give me a hotel option list of at least 4 hotels, including the hotel name, address, price, an emoji of the hotel, geo coordinates, rating, and description and suggest an itinerary for the location {locationName} for {totalDays} days including the place name, place detail, an emoji representing the activity or place, geo coordinates, ticket pricing, rating, time range of when to complete the activity, and time to travel to the activity for the {totalDays} days with each day planned in terms of the best time to visit, all and only in JSON format.'