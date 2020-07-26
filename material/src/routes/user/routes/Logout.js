import React from 'react';
import QueueAnim from 'rc-queue-anim';
import AUTH from 'auth/Auth';

const Page = () => {
  console.log("logging out");
  AUTH({userId: null, token: null});

  return (
    <QueueAnim type="bottom" className="ui-animate">
      <div key="1">
        Logout<br />
        <a href='#/user/login'>Log in again</a>
      </div>
    </QueueAnim>
  )
}

export default Page;
