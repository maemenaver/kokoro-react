import { gql } from "@apollo/client";

export const subBoard = gql`
    subscription SubBoard {
        subBoard {
            author
            emote
            id
            music
            place
            primaryColor
            secondaryColor
            shape
            therapeuticColor
        }
    }
`;

export const getBoard = gql`
    query GetBoard {
        getBoard {
            author
            createdAt
            deletedAt
            emote
            id
            music
            place
            primaryColor
            secondaryColor
            shape
            therapeuticColor
            updatedAt
        }
    }
`;

export const getMusicPath = gql`
    query GetMusicPath {
        getMusicPath
    }
`;

export const sendMusicGql = gql`
    mutation Mutation($notes: [Int!]!) {
        sendMusic(notes: $notes)
    }
`;

export const setPlaceGql = gql`
    mutation Mutation($place: String!) {
        setPlace(place: $place)
    }
`;

export const setEmoteGql = gql`
    mutation Mutation($emote: String!) {
        setEmote(emote: $emote)
    }
`;

export const setStartGql = gql`
    mutation Mutation($start: Boolean!) {
        setStart(start: $start)
    }
`;

export const setIsFellowGql = gql`
    mutation Mutation($toggle: Boolean!) {
        setIsFellow(toggle: $toggle)
    }
`;

export const setShapeGql = gql`
    mutation Mutation($shape: [String!]!) {
        setShape(shape: $shape)
    }
`;

export const subStartGql = gql`
    subscription Subscription {
        subStart
    }
`;

export const subMusicGql = gql`
    subscription Subscription {
        subMusic
    }
`;

export const subPlaceGql = gql`
    subscription Subscription {
        subPlace
    }
`;

export const subShapeGql = gql`
    subscription Subscription {
        subShape
    }
`;

export const subColorGql = gql`
    subscription Subscription {
        subColor
    }
`;
