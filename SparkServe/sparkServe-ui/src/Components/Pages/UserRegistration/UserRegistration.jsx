import React from 'react';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react';

const UserRegistration = () => {
  return (
    <>
      <SignedOut>
        <SignInButton mode="modal">
          <button>Sign in</button>
        </SignInButton>
        <SignUpButton mode="modal">
          <button>Sign up</button>
        </SignUpButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </>
  );
}

export default UserRegistration;
