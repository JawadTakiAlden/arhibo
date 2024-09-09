import React, { useState } from 'react'
import useGetContact from '../../../api/Contact/useGetContact'
import { Box, Button, Collapse, Typography, useTheme } from '@mui/material'
import { useTranslation } from 'react-i18next'
import ContactUsForm from './components/ContactUsForm'
import { Email, Facebook, Instagram, Phone, WhatsApp, X } from '@mui/icons-material'

const ContactInfo = () => {
  const contactUs = useGetContact()
  const [formOpen , setFormOpen] = useState(true)
  const {t} = useTranslation()
  const theme = useTheme()
  if(contactUs.isLoading){
    return t("Shared.loading")
  }
  return (
    <Box>
      {/* <Button onClick={()=>{
        setFormOpen(prev => !prev)
      }} color='darkBlue' variant='contained' size='medium'>{t('add_new')}</Button> */}
      <Collapse in={formOpen}>
        <ContactUsForm initialValues={contactUs?.data?.data} handelClose={() => {
          setFormOpen(false)
        }} />
      </Collapse>
      {/* <Box
        sx={{
          my : 2,
          backgroundColor : 'white',
          boxShadow : '0px 0px 10px -5px rgba(0,0,0,0.4)',
          maxWidth : '500px',
          borderRadius : '10px'
        }}
      >
        <Typography
          sx={{
            color : theme.palette.success.main,
            mb : 2,
            px : 1,
            pt : 1
          }}
        >
          Contact Us
        </Typography>

        <Typography
          sx={{
            px : 1,
            py : 2,
            display : 'flex',
            alignItems : 'center',
            gap : '5px',
            textDecoration : 'underline',
            borderBottom : '2px solid rgba(0,0,0,0.2)'
          }}
        >
          <Facebook /> {contactUs?.data?.data?.facebook}
        </Typography>
        <Typography
          sx={{
            px : 1,
            py : 2,
            display : 'flex',
            alignItems : 'center',
            gap : '5px',
            textDecoration : 'underline',
            borderBottom : '2px solid rgba(0,0,0,0.2)'
          }}
        >
          <Instagram /> {contactUs?.data?.data?.instagram}
        </Typography>
        <Typography
          sx={{
            px : 1,
            py : 2,
            display : 'flex',
            alignItems : 'center',
            gap : '5px',
            textDecoration : 'underline',
            borderBottom : '2px solid rgba(0,0,0,0.2)'
          }}
        >
          <X /> {contactUs?.data?.data?.x}
        </Typography>
        <Typography
          sx={{
            px : 1,
            py : 2,
            display : 'flex',
            alignItems : 'center',
            gap : '5px',
            textDecoration : 'underline',
            borderBottom : '2px solid rgba(0,0,0,0.2)'
          }}
        >
          <WhatsApp /> {contactUs?.data?.data?.whatsapp}
        </Typography>
        <Typography
          sx={{
            px : 1,
            py : 2,
            display : 'flex',
            alignItems : 'center',
            gap : '5px',
            textDecoration : 'underline',
            borderBottom : '2px solid rgba(0,0,0,0.2)'
          }}
        >
          <Phone /> {contactUs?.data?.data?.phone}
        </Typography>
        <Typography
          sx={{
            px : 1,
            py : 2,
            display : 'flex',
            alignItems : 'center',
            gap : '5px',
            textDecoration : 'underline',
          }}
        >
          <Email /> {contactUs?.data?.data?.email}
        </Typography>
      </Box> */}
    </Box>
  )
}

export default ContactInfo