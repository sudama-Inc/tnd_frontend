import * as React from "react";
import { Admin, Resource } from 'react-admin';
import { customer } from './views';
import { myTheme } from './framework/theme'
import dataProvider from './framework/dataProvider';
import Menu from './framework/menu';
import MyLayout from './framework/MyLayout';

const App = () => (
    <Admin theme={myTheme} layout={MyLayout} menu={Menu} dataProvider={dataProvider}>

        <Resource name="customer" {...customer} />

    </Admin>
);

export default App;