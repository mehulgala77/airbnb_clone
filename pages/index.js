import Head from 'next/head'
import Header from '../components/Header'
import Banner from '../components/Banner'
import SmallCard from '../components/SmallCard'
import MediumCard from '../components/MediumCard'
import LargeCard from '../components/LargeCard'
import Footer from '../components/Footer'

export default function Home({ exploreData, cardsData }) {
  return (
    <div className="">
      <Head>
        <title>Airbnb</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Banner />

      <main className='max-w-7xl mx-auto px-8 sm:px-16'>

        {/* Snall Cards */}
        <section className='pt-6'>
          <h2 className='text-4xl font-semibold pb-5'>Explore Nearby</h2>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {exploreData?.map(item => (
              <SmallCard 
                key={item.img}
                img={item.img}
                location={item.location}
                distance={item.distance}
              />
            ))}
          </div>
        </section>

        {/* Medium Cards */}
        <article>
          <h2 className='text-4xl font-semibold py-8'>Live Anywhere</h2>

          {/* Carosel implementation */}
          <div className='flex space-x-3 overflow-scroll scrollbar-hide p-3 -ml-3'>
            {cardsData?.map(item => (
              <MediumCard 
                key={item.img}
                img={item.img}
                title={item.title}
              />
            ))}
          </div>
        </article>

        {/* Large Cards */}
        <LargeCard 
          img='https://links.papareact.com/4cj'
          title='The Greatest Outdoors'
          desc='Wishlists curated by Airbnb'
          buttonText='Get Inspired'
        />

      </main>

      <Footer />

    </div>
  )
}

// Note: Static Page Rendering. Page will be built only once at deploy time. 
export const getStaticProps = async () => {
  const exploreData = await fetch('https://links.papareact.com/pyp');
  const exploreDataJson = await exploreData.json();

  const cardsData = await fetch('https://links.papareact.com/zp1');
  const cardsDataJson = await cardsData.json();

  return {
    props: {
      exploreData: exploreDataJson,
      cardsData: cardsDataJson
    }
  }
}