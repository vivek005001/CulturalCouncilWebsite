import React, { useState, useEffect } from 'react';
import events from '@/data/timeline_data.json'; // Adjust the path according to your project structure

const Timeline: React.FC = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const position = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (events.length === 0) {
    return (
      <section className="flex flex-col items-center justify-center min-h-screen py-24 font-['Jost'] text-white">
        <p>No events to display.</p>
      </section>
    );
  }

  return (
    <section className="flex flex-col items-center justify-center min-h-screen py-24 font-['Jost']">
      <div className="w-4/5 max-w-3xl mx-auto">
        <div className="relative grid md:grid-cols-[1fr_3px_1fr] gap-x-5 gap-y-32"> {/* Increased gap-y to 16 */}
          {/* Timeline Bar */}
          <div
            className="absolute w-2 h-full left-1/2 transform -translate-x-1/2 z-0"
            style={{
              background: `linear-gradient(to bottom, 
                rgba(242, 113, 33, 0.1) -50%, 
                #E94057 ${scrollPosition * 100}%,   
                #8A2387 ${scrollPosition * 100}%)`,
            }}
          ></div>

          {events.map((event, index) => (
            <React.Fragment key={index}>
              {/* For even index events (Left Side) */}
              {index % 2 === 0 && (
                <>
                  <div className="border -ml-24  min-w-[400px] border-white rounded-md text-white p-7 transition-all duration-400 break-words relative z-10 md:col-start-1">
                    <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                    <p>{event.description}</p>
                  </div>
                  <div className="hidden md:block relative z-10 md:col-start-2 ">
                    <div className="absolute top-0 left-1/2 w-[15px] h-[15px] rounded-full bg-gradient-to-br from-[#F27121] via-[#E94057] to-[#8A2387] transform -translate-x-1/2"></div>
                  </div>
                </>
              )}
              
              {/* For odd index events (Right Side) */}
              {index % 2 !== 0 && (
                <>
                  <div className="hidden  md:block relative z-10 md:col-start-2">
                    <div className="absolute top-0 left-1/2 w-[15px] h-[15px] rounded-full bg-gradient-to-br from-[#F27121] via-[#E94057] to-[#8A2387] transform -translate-x-1/2"></div>
                  </div>
                  <div className="border -mr-24  min-w-[400px] border-white rounded-md text-white p-7 transition-all duration-400 break-words relative z-10">
                    <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                    <p>{event.description}</p>
                  </div>
                </>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
