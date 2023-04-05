import React, { useState } from 'react'
import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { Image, VStack, StackDivider, Tooltip, Text, Heading, Flex, Box, Button, Input, InputGroup, InputLeftElement, Spacer, Grid, GridItem, useToast, useDisclosure, ColorModeScript, useColorMode } from '@chakra-ui/react'
import { Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton } from '@chakra-ui/react'
import { MoonIcon, SunIcon, SearchIcon, EmailIcon, LockIcon, InfoIcon } from '@chakra-ui/icons'
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react'
import Index from '@/components/Index'

export default function Home() {
  return (
    <>
      <Auth0Provider
          domain="dev-s5kaptvjbe3jkk02.us.auth0.com"
          clientId="OG8JbdFSF0jmfT5jh29kiEmpj2N30YCX"
          authorizationParams={{
            redirect_uri: 'https://simple-stripe.vercel.app/'
          }}
      >
        <Index />
      </Auth0Provider>
    </>
  )
}
