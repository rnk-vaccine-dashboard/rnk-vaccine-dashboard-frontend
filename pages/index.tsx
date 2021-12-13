import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import StatusLine from '../components/StatusLine'
import Status from '../components/Status'
import getDashboardData, { DashboardData } from '../data/getDashboardData'
import { CenterData } from '../models/DashboardData'
import styles from '../styles/Home.module.css'

interface HomePageProps {
  dashboardData: DashboardData
}

const Home: NextPage<HomePageProps> = (props) => {
  const { data: { centers} } = props.dashboardData
  const centersData = centers ? centers.data : []

  const [isFiltering, setIsFiltering] = useState<boolean>(false)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [filteredItems, setFilteredItems] = useState<CenterData[]>([])

  const onSearch = ( searchString : string ) => {
    setSearchTerm(searchString)
    console.log('onSearch', searchString)

    // if string empty
    if (searchString === '') {
      setIsFiltering(false)
      console.log('not filtering')
    } else {
      setIsFiltering(true)
      console.log('is filtering')
      setFilteredItems(centersData.filter(center => center.attributes.name.toLowerCase().includes(searchString.toLowerCase())))
    }
  }

  const centersToShow = isFiltering ? filteredItems : centersData

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Impftermin Dashboard für den Rhein-Neckar-Kreis, Stadtkreis Heidelberg und Landkreis Karlsruhe</h1>
        <div className={styles.searchWrapper}>
          <label>
            <span>Impfzenten durchsuchen:</span>
            <input type="search" onChange={(e) => onSearch(e.target.value) } placeholder="Suchbegriff eingeben" />
          </label>
        </div>
        <StatusLine isHeading>
          <p>Zentrum</p>
          <p style={{textAlign: 'center'}}>Biontech</p>
          <p style={{textAlign: 'center'}}>Moderna</p>
          <p style={{textAlign: 'center'}}>Johnson & Johnson</p>
        </StatusLine>
            {
              centersToShow.map((center: any) => {
                const { id, attributes: { name, biontechStatus, modernaStatus, johnsonStatus } } = center
                const biontechAvailable = biontechStatus.data[0].attributes.isAvailable
                const modernaAvailable = modernaStatus.data[0].attributes.isAvailable
                const johnsonAvailable = johnsonStatus.data[0].attributes.isAvailable

                const createdAt = biontechStatus.data[0].attributes.createdAt
                
                return (
                  <StatusLine key={`center-line-${id}`}>
                    <p>{name}</p>
                    <Status label="Biontech" status={biontechAvailable ? 'available' : 'unavailable'} lastUpdated={ biontechStatus.data[0].attributes.createdAt } />
                    <Status label="Moderna" status={modernaAvailable ? 'available' : 'unavailable'} lastUpdated={ modernaStatus.data[0].attributes.createdAt }  />
                    <Status label="Johnson & Johnson" status={johnsonAvailable ? 'available' : 'unavailable'} lastUpdated={ johnsonStatus.data[0].attributes.createdAt }  />
                  </StatusLine>
                )
              })
            }

            {
              ! centersToShow.length && (
                <p>Keine Impfzenten mit dem Suchbegriff {searchTerm} gefunden</p>
              )
            }
      </main>
    </div>
  )
}

export default Home


// serverside props
export const getStaticProps: GetStaticProps = async (context) => {

  const dashboardData = await getDashboardData();
  
  return {
    props: {
      dashboardData
    },
    revalidate: 30,
  }
}