"use client"


interface PROPS {
    name: string
}

export default function Greeting({ name = "Customer" }: PROPS) {
   var greeting=""
    const now = new Date();
    const ethiopianTime = new Date(now.toLocaleString("en-US", { timeZone: "Africa/Addis_Ababa" }));
    const hours = ethiopianTime.getHours();

    // Determine greeting based on the time of day
    if (hours >= 5 && hours < 12) {
       greeting="Good Morning"
    } else if (hours >= 12 && hours < 17) {
       greeting="Good Afternoon"
    } else {
       greeting='Good Evening'
    }
    return <h1
        className={`py-3 text-center font-extrabold text-xl md:text-3xl text-blue-900`}>
        {greeting} {name}!
    </h1>
}