import { gql } from "apollo-boost";



export const FETCH_ENTRIES = gql`
  query($userId: String!, $filter: timestamptz) {
    Entry(
      where: {
        _and: { user_id: { _eq: $userId }, created_at: { _gt: $filter } }
      }
    ) {
      created_at
      focus_level
      energy_level
      mood_level
    }
  }
`;