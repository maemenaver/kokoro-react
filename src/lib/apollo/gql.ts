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

export const subMusicGql = gql`
    subscription Subscription {
        subMusic
    }
`;
