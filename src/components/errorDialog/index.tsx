import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { fadeIn, fadeOut, translateIn, translateOut } from '../../theme/animations';
import { useExchangeService } from '../../provider/exchange';

export default function ErrorDialog() {
    const { rates } = useExchangeService();
    const animtionDurationMS = 300;

    const [isExiting, setIsExiting] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        return setIsActive(rates.loading === false && rates.error === true);
    }, [ rates.loading, rates.error ])

    useEffect(() => {
        let timeoutId: number;

        if (isActive) {
            setIsMounted(true);
            setIsExiting(false);
        } else if (isMounted === true) {
            setIsExiting(true);
            timeoutId = window.setTimeout(() => {
                setIsMounted(false);
                setIsExiting(false);
            }, animtionDurationMS);
        }

        return () => {
            if (timeoutId) { 
                window.clearTimeout(timeoutId);
            }
        };
    }, [isActive, isMounted]);

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            rates.setError(false);
        }
    };

    if (isMounted === false && isExiting === false) {
        return null;
    }

    return (
        <PopupOverlay
            isActive={isActive}
            isExiting={isExiting}
            animDurationMS={animtionDurationMS}
            onClick={handleOverlayClick}
        >
            <PopupContent 
                isActive={isActive}
                isExiting={isExiting}
                animDurationMS={animtionDurationMS}
            >
                <Title>Error</Title>
                <Message>We could not fetch currency rates, service is unavailable</Message>
            </PopupContent>
        </PopupOverlay>
    );
}

const PopupOverlay = styled.div<{ isActive: boolean; isExiting: boolean; animDurationMS: number }>`
    inset: 0;
    position: fixed;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: start;
    animation: ${(props) => {
        if (props.isActive && !props.isExiting) {
            return css`
                ${fadeIn} ${props.animDurationMS}ms ease-out forwards
            `;
        }
        if (props.isExiting) {
            return css`
                ${fadeOut} ${props.animDurationMS}ms ease-out forwards
            `;
        }
        return 'none';
    }};
    pointer-events: ${(props) => props.isActive || props.isExiting ? 'auto' : 'none'};
`;

const PopupContent = styled.div<{ isActive: boolean; isExiting: boolean; animDurationMS: number  }>`
    background: white;
    border-radius: 1rem;
    padding: 2rem;
    max-width: ${(props) => props.theme.breakpoints.md};
    max-height: 90%;
    overflow: auto;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    position: relative;
    display: flex;
    flex-flow: column nowrap;
    gap: 1rem;
    justify-content: center;
    align-items: start;
    animation: ${(props) => {
        if (props.isActive && !props.isExiting) {
            return css`
                ${translateIn} ${props.animDurationMS}ms ease-out forwards
            `;
        }
        if (props.isExiting) {
            return css`
                ${translateOut} ${props.animDurationMS}ms ease-out forwards
            `;
        }
        return 'none';
    }};

    @media (max-width: ${(props) => props.theme.breakpoints.md}) {
        width: 100%;
        max-width: unset;
        border-radius: 0;
    }
`;

const Title = styled.h2`
    font-size: 1.8rem;
    `;
    
const Message = styled.p`
    line-height: 1.5;
    font-size: 1.1rem;
`;
