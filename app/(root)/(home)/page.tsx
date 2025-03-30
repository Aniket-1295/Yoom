"use client";
import MeetingTypeList from "@/components/MeetingTypeList";
import { useState,useEffect } from "react";

const Home = () => {

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date()); // Update time every second
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  // Format current time in HH:MM (24-hour format)
  const time = new Intl.DateTimeFormat("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata"
  }).format(currentTime);

  // Format date in "Day, Month Date, Year"
  const date = new Intl.DateTimeFormat("en-IN", { dateStyle: "full" }).format(currentTime);

  // Calculate meeting time (2 hours ahead)
  const meetingTime = new Date(currentTime.getTime() + 2 * 60 * 60 * 1000);
  const meetingFormattedTime = new Intl.DateTimeFormat("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata"
  }).format(meetingTime);
  // const now = new Date();
  // const meetingTime = new Date(now.getTime() + 2 * 60 * 60 * 1000);

  // const time = now.toLocaleTimeString("en-IN", {
  //   hour: "2-digit",
  //   minute: "2-digit",
  //   hour12: true
  // });
  // const date = new Intl.DateTimeFormat("en-IN", { dateStyle: "full" }).format(
  //   now
  // );
  return (
    <section className="flex size-full flex-col gap-5 text-white">
      <div className="h-[303px] w-full rounded-[20px] bg-hero bg-cover">
        <div className="flex h-full flex-col justify-around max-md:px-5 max-md:py-8 lg:p-11 sm:px-5">
          <h2 className="glassmorphism max-w-[273px] rounded py-2 text-center text-base font-normal">
            Upcoming Meeting at: {meetingFormattedTime}
          </h2>
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-extrabold lg:text-7xl">{time}</h1>
            <p className="text-lg font-medium text-sky-1 lg:text-2xl">{date}</p>
          </div>
        </div>
      </div>

      <MeetingTypeList />
    </section>
  );
};

export default Home;
