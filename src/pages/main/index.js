import React, { Fragment } from 'react';

import Map from '../../components/Map';
import AddUser from '../../components/AddUser';
import LeftBar from '../../components/LeftBar';

const Main = () => (
  <Fragment>
    <Map />
    <AddUser />
    <LeftBar />
  </Fragment>
);

export default Main;
