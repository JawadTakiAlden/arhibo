import React from 'react'
import useGetOffers from '../../../api/Offer/useGetOffers'
import {Box , Typography} from '@mui/material'

const OfferList = () => {
    const offers = useGetOffers()

    if(offers.isLoading){
        return "loading ..."
    }

    console.log(offers?.data?.data)

  return (
    <Box>
      {
        offers?.data?.data?.map(offer => (
          <Typography>
            {offer.image}
          </Typography>
        ))
      }
    </Box>
  )
}

export default OfferList