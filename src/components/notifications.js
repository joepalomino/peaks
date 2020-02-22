import React from 'react'
import { gql } from 'apollo-boost'
import { useAuth0 } from '../contexts/auth0-context'
import { useMutation } from '@apollo/react-hooks'
import { askUserPermission } from '../push'


const UPDATE_USER = gql`
  mutation($userId: String!, $notificationId: String!) {
    update_User(
      where: { auth0_id: { _eq: $userId } },
      _set: {
        notification_id: $notificationId
      }
    ) {
      affected_rows
    }
  }
`

function Notifications() {

  const { user } = useAuth0()

  const [updateUser] = useMutation(UPDATE_USER)


  return (
    <div>
      <button onClick={async (e) => {
        e.preventDefault()

        try {

          const token = await askUserPermission();
          console.log(typeof token);
          

          updateUser({
            variables: { userId: user.sub, notificationId: token }
          }).catch(function(err) {
            console.log(err);

          }) 
          

        } catch(err) {
          console.log(err);
        }
      }}>Allow Notifications</button>
    </div>
  )
}

export default Notifications