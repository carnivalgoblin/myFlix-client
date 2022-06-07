import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { RegistrationView } from '../registration-view/registration-view';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ registered, setRegistered] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    // Send a request to the server for autghentication
    // then call props.onLoggedIn(username)
    props.onLoggedIn(username);
  };
  
  if (registered) {
  return (
    <form>
      <label>
        Username:
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <button type="submit" onClick={handleSubmit}>Submit</button>
      <button type="button" onClick={() => setRegistered((registrationStatus) => !registrationStatus)}>Not registered yet? Click here.</button>
    </form>
  );
} else if (!registered) {
  return (
   <RegistrationView />
  )
}
}

LoginView.propTypes = {
    onLoggedIn: PropTypes.func.isRequired
  };
