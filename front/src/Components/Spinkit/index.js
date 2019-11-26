import React from 'react'
import styled from 'styled-components'
import Spinner from 'react-spinkit'

export default ({isLoading})=>{
    if(!isLoading)return null;

    const SpinnerWrapper=styled.div`
        display:flex;
        justify-content:center;
        padding-bottom:50px;
    `

    return(
        <SpinnerWrapper>
            <Spinner name="ball-pulse-rise" color="#fa8000"/>
        </SpinnerWrapper>
    )
}