import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { Image, VStack, StackDivider, Tooltip, Text, Heading, Flex, Box, Button, Input, InputGroup, InputLeftElement, Spacer, Grid, GridItem, useToast, useDisclosure, ColorModeScript, useColorMode } from '@chakra-ui/react'
import { MoonIcon, SunIcon, SearchIcon, EmailIcon, LockIcon, InfoIcon } from '@chakra-ui/icons'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { useAuth0 } from '@auth0/auth0-react'

import CheckoutForm from '@/components/CheckoutForm'

const stripePromise = loadStripe('pk_test_51MtDIoAMOgtxbUIWhy1XmuOtEKODvZ9kDDIB5317GtDvopKpozl6brJKSFGTHKJ9MRKRtttv8CvEIacL3Ov0hPNg002QcGlZBG')

export default function Payments() {
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { colorMode, toggleColorMode } = useColorMode()
  const [clientSecret, setClientSecret] = useState('')
  const { loginWithPopup, logout, user, isAuthenticated } = useAuth0()

  useEffect(() => {
    fetch("/api/create-payment-intent", {
        method: 'POST',
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({ items: [{ id: "fake-payment"}] })
    }).then(
        (res) => res.json()
        ).then(
            (data) => setClientSecret(data.clientSecret)
        )
  }, [])

  const appearance = {
    theme: 'stripe',
    variables: {
        colorBackground: colorMode === 'light' ? '#f1f1f1' : '#111',
        colorText: colorMode === 'light' ? '#000' : "white"
    }
  }

  const options = {
    clientSecret,
    appearance
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Flex minWidth='40%' alignItems='center' justifyContent='space-between'>
          <Box p='2'>
            <Heading size='md' onClick={() => window.location.href='/'}>Stripe App</Heading>
          </Box>
          <Flex justifyContent='space-between' align='center'>
          {colorMode === 'light' ? <MoonIcon boxSize={5} color='black' onClick={toggleColorMode}/> : <SunIcon boxSize={5} color='white' onClick={toggleColorMode}/>}
          </Flex>
        </Flex>
        <Flex h='80vh' direction='column' justify='center' align='center'>
            <Heading>Test Payment</Heading>
            <Text mb={10}>Use Card: 4242 4242 4242 4242</Text>
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            )}
        </Flex>
      </main>
    </>
  )
}
