
import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useRouter } from 'next/dist/client/router'
import { format } from 'date-fns'
import InfoCard from '../components/InfoCard'

function Search({ searchResults }) {

  const router = useRouter()
  const { location, startDate, endDate, noOfGuests } = router.query;

  // Note: Date formatting
  const formattedStartDate = format(new Date(startDate), 'dd MMMM yy');
  const formattedEndDate = format(new Date(endDate), 'dd MMMM yy');
  const range = `${formattedStartDate} - ${formattedEndDate}`

  return (
    <div>
      <Header placeholder={`${location} | ${range} | ${noOfGuests}`}/>

      <main className='flex'>

        <section className='flex-grow pt-14 px-6'>
          <p className='text-xs'>300+ Stays - {range} - {noOfGuests} guests</p>

          <h1 className='text-3xl font-semibold mt-2 mb-6'>Stays in {location}</h1>

          <div className='hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap'>
            {/* Note: Tailwind custom utility class */}
            <p className='button'>Cancellation Flexibility</p>
            <p className='button'>Type of Place</p>
            <p className='button'>Price</p>
            <p className='button'>Rooms and Beds</p>
            <p className='button'>More filters</p>
          </div>

          <div className='flex flex-col'>
            {searchResults?.map(item => (
              <InfoCard 
                description={item.description}
                img={item.img}
                location={item.location}
                price={item.price}
                star={item.star}
                title={item.title}
                total={item.total}
              />
            ))}
          </div>

        </section>

      </main>

      <Footer/>
    </div>
  )
}

export default Search

// Note: Server Side Rendering. Page will be built at the time of every request. 
export const getServerSideProps = async () => {
  const searchResultsRaw = await fetch('https://links.papareact.com/isz')
  const searchResults = await searchResultsRaw.json();

  return {
    props: {
      searchResults
    }
  }
}
