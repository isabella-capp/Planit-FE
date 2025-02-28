'use client'
import Image from 'next/image';
import TimeSlotsTable from './TimeSlotsTable';
import { useParams, useRouter } from "next/navigation";
import { use, useEffect, useState } from 'react';

interface Event {
    name: string;
    start_time: string;
    end_time: string;
    dates: string[]; // o puoi usare Date[] se vuoi usare oggetti Date
    id: number;
  }

const EventPage = () => {
    const params = useParams();
    const id = params.id;
    const router = useRouter();
    const [eventData, setEventData] = useState<Event | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
   
    const [username, setUsername] = useState('');
    const[userId, setUserId] = useState('');

    console.log(id);

    useEffect(() => {
        async function fetchUser() {
            try {
              const response = await fetch(`http://127.0.0.1:5000/api/user`, {
                method: 'GET',
                credentials: 'include',
              });
        
              const result = await response.json();
              if (response.ok) {
                setUserId(result.id);
                console.log(result);
                console.log(result.data);
                setUsername(result.username);
              } else {
                console.log('Not authorized:', result.message);
                router.push(`/auth/signin?redirect=/event/${id}`);
              }
        
            } catch (error) {
              console.error('Error fetching user:', error);
            }
          }
          fetchUser();
    }, [userId]);
    

    useEffect(() => {
        if (!id) return; // Aspetta che l'ID sia disponibile

        const fetchEventData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/private/event/${id}`, {
                    method: "GET",
                    credentials: "include",
                });

                if (response.status === 404) {
                    console.log("Evento non trovato, reindirizzamento a /error");
                    router.push("/error");
                    return;
                }

                if (!response.ok) {
                    console.error("Errore durante il recupero dei dati dell'evento");
                    setError("Errore durante il recupero dei dati dell'evento");
                    return;
                }

                const data = await response.json();

                if (data && data.event) {
                    const parsedData: Event = {
                        ...data.event,
                        dates: data.event.dates ? JSON.parse(data.event.dates) : [], // Parsing sicuro
                    };

                    console.log("Dati parsati:", parsedData);
                    setEventData(parsedData);
                } else {
                    setError("Dati evento non disponibili.");
                }
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("Errore sconosciuto.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchEventData();
    }, [id]);

    

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    console.log('EventData:', eventData); // Controlla cosa c'è in eventData

    return (
        <section id="event" className="px-4 md:px-8 2xl:px-0">
            <div className="relative mx-auto max-w-c-1390 px-7.5 pt-10 lg:px-15 lg:pt-15 xl:px-20 xl:pt-20 lg:flex-row">
                <div className="absolute bottom-[-255px] left-0 -z-1 h-full w-full">
                    <Image
                        src="/images/shape/shape-dotted-light.svg"
                        alt="Dotted"
                        className="dark:hidden"
                        fill
                    />
                    <Image
                        src="/images/shape/shape-dotted-dark.svg"
                        alt="Dotted"
                        className="hidden dark:block"
                        fill
                    />
                </div>
            </div>

            <div className="flex flex-col w-full justify-center items-center lg:flex-row">
                <div className="mt-5 mb-5 lg:mt-5 text-center">
                    <h1 className="mb-5 text-3xl text-center font-bold text-black dark:text-white xl:text-hero ">
                        <span className="relative inline-block before:absolute before:bottom-2.5 before:left-0 before:-z-1 before:h-3 before:w-full before:bg-titlebg dark:before:bg-titlebgdark ">
                            {eventData?.name}
                        </span>
                    </h1>
                    <h1 className="text-4xl mb-3 font-bold text-black dark:text-white"></h1>
                    <h2 className="text-2xl mb-3 font-bold text-black dark:text-white">Welcome, {username}!</h2>
                    <p className="text-lg mb-8">Please select your availability from the time slots below.</p>
                </div>
            </div>

            {eventData && eventData.dates && eventData.start_time && eventData.end_time && (
                <TimeSlotsTable dates={eventData.dates} startTime={eventData.start_time} endTime={eventData.end_time} userId={userId} />
            )}
        </section>
    );
};

export default EventPage;
