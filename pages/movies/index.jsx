import React, { useEffect, useContext } from 'react';
import Contextpage from '../Contextpage';
import Moviecard from './Moviecard';
import { motion, AnimatePresence } from 'framer-motion';
import Genre from './Genre';
import Header from './Header';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getSession } from "next-auth/react";
import { GetMovies } from "@/service/http/spiritus";

function Movies({ movies }) {
    // Ovdje možete koristiti movies prop koji je proslijeđen iz getServerSideProps

    const { loader, page, setPage, totalPage, setMovies, activegenre, filteredGenre } = useContext(Contextpage);

    useEffect(() => {
        setPage(1); // Reset Page to 1 on initial render.
    }, []);

    useEffect(() => {
        setMovies([]); // Reset movies on genre change so that movies of other genre will not appear at top.
        setPage(0);
        // Ostatak vašeg koda...
    }, [activegenre]);

    useEffect(() => {
        if (page > 0) {
            filteredGenre(); // Fetch filtered genre when page changes and only if page is greater than 0.
        }
    }, [page]);

    return (
        <div className='w-full bg-[#10141e] md:p-10 mb-20 md:mb-0'>
            <Genre />
            <Header />
            <motion.div
                layout
                className="flex flex-wrap relative justify-evenly md:justify-around">
                <AnimatePresence>
                    {loader ? <span className="loader m-10"></span> : (
                        <InfiniteScroll
                            className="w-full md:p-2 flex flex-wrap relative justify-evenly md:justify-around"
                            dataLength={movies.length} //This is important field to render the next data
                            next={() => setPage(page + 1)}
                            hasMore={page < totalPage}
                            loader={<span className="loader m-10"></span>}
                            scrollThreshol={0.9}
                            style={{ overflow: 'hidden' }}
                        >
                            {movies.map((movie) => (
                                <Moviecard key={movie.id} movie={movie} />
                            ))}
                        </InfiniteScroll>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}

export default Movies;

export async function getServerSideProps(context) {
    const session = await getSession(context);

    if (!session) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
    // Ovdje možete dohvatiti podatke s serverske strane, na primjer, podatke o filmovima
    const movies = await GetMovies(session?.user?.accessToken);// logika za dohvaćanje podataka o filmovima

    // Vraćanje podataka kao props za komponentu
    return {
        props: {
            movies,
        },
    };
}
