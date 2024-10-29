import Collection from "@/components/shared/Collection";
import { getEventById, getAllEvents } from "@/lib/actions/event.actions";
import { formatDateTime } from "@/lib/utils";
import { SearchParamProps } from "@/types";
import Image from "next/image";

const EventDetails = async ({
  params: { id },
  searchParams,
}: SearchParamProps) => {
  const event = await getEventById(id);

  const moreEvents = await getAllEvents({
    query: "",
    limit: 5,
    page: 1,
  });

  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    return {
      dateOnly: date.toLocaleDateString(),
      timeOnly: date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  const start = formatDateTime(event.startDateTime);
  const end = formatDateTime(event.endDateTime);

  return (
    <>
      <section className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
          <Image
            src={event.imageUrl}
            alt="hero image"
            width={1000}
            height={1000}
            className="h-full min-h-[300px] object-cover object-center"
          />

          <div className="flex w-full flex-col gap-8 p-5 md:p-10">
            <div className="flex flex-col gap-6">
              <h2 className="h2-bold">{event.title}</h2>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <p className="p-medium-18 ml-2 mt-2 sm:mt-0">
                  by{" "}
                  <span className="text-primary-500">
                    {event.organizer.clubName}
                  </span>
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <div className="flex gap-2 md:gap-3">
                <Image
                  src="/assets/icons/calendar.svg"
                  alt="calendar"
                  width={32}
                  height={32}
                />
                <div className="p-medium-16 lg:p-regular-20 gap-1 flex flex-wrap items-center">
                  {start.dateOnly === end.dateOnly ? (
                    <p>
                      {start.dateOnly} - {start.timeOnly} to {end.timeOnly}
                    </p>
                  ) : (
                    <>
                      <p>
                        {start.dateOnly} - {start.timeOnly}
                      </p>
                      <span>to</span>
                      <p>
                        {end.dateOnly} - {end.timeOnly}
                      </p>
                    </>
                  )}
                </div>
              </div>

              <div className="p-regular-20 flex items-center gap-3">
                <Image
                  src="/assets/icons/location.svg"
                  alt="venue"
                  width={32}
                  height={32}
                />
                <p className="p-medium-16 lg:p-regular-20">{event.venue}</p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <p className="p-bold-20 text-grey-600">What You'll Learn:</p>
              <p className="p-medium-16 lg:p-regular-18">{event.description}</p>
              <p className="p-medium-16 lg:p-regular-18 truncate text-primary-500 underline">
                {event.url}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* EVENTS with the same category */}
      <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold">More Events</h2>

        <Collection
          data={moreEvents?.data}
          emptyTitle="No Events Found"
          emptyStateSubtext="Come back later"
          limit={3}
          page={searchParams.page as string}
          totalPages={moreEvents?.totalPages}
        />
      </section>
    </>
  );
};

export default EventDetails;
