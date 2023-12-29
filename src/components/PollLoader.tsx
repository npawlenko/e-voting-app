import { Container } from "@mui/material"
import React from "react"
import ContentLoader from "react-content-loader"

const PollLoader = () => (
    <Container>
        <ContentLoader 
            speed={2}
            width={400}
            height={160}
            viewBox="0 0 400 160"
            backgroundColor="#252525"
            foregroundColor="#b8b8b8"
        >
            <rect x="48" y="8" rx="3" ry="3" width="88" height="6" /> 
            <rect x="48" y="26" rx="3" ry="3" width="88" height="6" /> 
            <rect x="0" y="56" rx="3" ry="3" width="410" height="6" /> 
            <rect x="0" y="72" rx="3" ry="3" width="380" height="6" /> 
            <rect x="0" y="88" rx="3" ry="3" width="178" height="6" /> 
            <circle cx="20" cy="20" r="20" />
        </ContentLoader>
    </Container>
)

export default PollLoader