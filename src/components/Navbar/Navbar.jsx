// NavBar.js

import { Avatar, Dropdown, Navbar } from 'flowbite-react';
import { useContext, useEffect } from 'react';
import TokenContext from '../../Context/userContext';

export default function NavBar() {
    const { user, getUserData } = useContext(TokenContext);

    useEffect(() => {
        getUserData();
    }, []);


    return (
        <div className='dark'>
            <Navbar fluid rounded className=''>
                <div className="flex md:order-2">
                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                            <Avatar alt="User settings" img={user?.image} rounded />
                        }
                    >
                        <Dropdown.Header>
                            <span className="block text-sm">{user?.name}</span>
                            <span className="block truncate text-sm font-medium">{user?.email}</span>
                        </Dropdown.Header>
                        <Dropdown.Item>Dashboard</Dropdown.Item>
                        <Dropdown.Item>Settings</Dropdown.Item>
                        <Dropdown.Item>Earnings</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item>Sign out</Dropdown.Item>
                    </Dropdown>
                    <Navbar.Toggle />
                </div>
                <Navbar.Collapse className='w-full'>
                    {/* <Baner /> */}
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}
