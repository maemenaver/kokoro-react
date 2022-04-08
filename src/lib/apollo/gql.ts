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
