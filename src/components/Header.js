import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '../contexts/auth0-context'


function Header() {

  const { isLoading, user, logout, loginWithRedirect } = useAuth0()

  return (
    <nav>
      <div>
        <Link to="/">
          Peaks
        </Link>
      </div>
      <div>
        {!isLoading && user && <button onClick={() => logout({returnTo: window.location.origin})}>Log out</button>}
      </div>
  </nav>
  )
}

export default Header