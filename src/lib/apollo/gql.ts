import { gql } from "@apollo/client";

export const subBoard = gql`
    subscription SubBoard {
        subBoard {
            therapeuticColor
            authorID
            content
            hashtag
            id
            image
            primaryColor
            secondaryColor
        }
    }
`;

export const getBoard = gql`
    query GetBoard {
        getBoard {
            therapeuticColor
            authorID
            content
            hashtag
            id
            image
            primaryColor
            secondaryColor
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
