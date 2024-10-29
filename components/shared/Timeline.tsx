"use client";
import React, { useState, useEffect } from "react";
import EventComponent from "./EventComponent";
import { motion } from "framer-motion";
import { getAllEvents } from "@/lib/actions/event.actions";
import { IEvent } from "@/lib/database/models/event.model";
import NotFound from "@/components/shared/NotFound"
import Loading from "@/app/loading";
type CardProps = {
  event: IEvent;
};

export default function Timeline({ userId }: { userId: string }) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [events, setEvents] = useState<IEvent[]>([]); // State to hold the fetched events

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Asynchronous function to fetch events
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        const eventsData = await getAllEvents({
          query: "",
          page: 1,
          limit: 6,
        });
        setEvents(eventsData?.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollFraction = scrollTop / documentHeight;

      setScrollPosition(scrollFraction);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="relative flex mb-5">
      {isLoading ? (
        <div className="flex justify-center w-full">
          <Loading loading={true} />
        </div>
      ) : events.length === 0 ? (
        <div className="flex flex-col items-center justify-center w-full text-xl">
          <span className="text-sm">No Events Found</span>
          <span>
            <NotFound/>
          </span>
        </div>
      ) : (
        <>
          {/* Vertical Timeline Bar on the Left */}
          <div className="relative">
            <div
              className="w-2 ml-32 max-lg:ml-16 max-md:ml-8 rounded-full h-full absolute left-0"
              style={{
                background: `linear-gradient(to bottom, #AC51D2 ${
                  scrollPosition * 100
                }%, #6b7280 ${scrollPosition * 100}%)`,
              }}
            ></div>
          </div>

          {/* Event Cards on the Right */}
          <div className="flex-grow ml-3">
            {events.map((event, index) => (
              <motion.div
                key={index}
                className="relative my-12"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.2,
                }}
                viewport={{ once: true, amount: 0.8 }}
              >
                <div className="ml-3">
                  <EventComponent event={event} userId={userId} />
                </div>
              </motion.div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
