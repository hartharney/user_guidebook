import React, { useState } from 'react';
import { ResponsiveTable } from 'responsive-table-react';

interface Contact {
  id: string;
  name: string;
  phoneNumber: string;
  email: string;
  address: string;
  longitude: number;
  latitude: number;
}

interface ScrollableTableProps {
  contacts: Contact[];
}

const ScrollableTable: React.FC<ScrollableTableProps> = ({ contacts }) => {
  const [dummyData] = useState(contacts);

  const transformedData = dummyData.map((contact) => ({
    id: contact.id,
    name: contact.name,
    phoneNumber: contact.phoneNumber,
    email: contact.email,
    address: contact.address,
    longitude: contact.longitude,
    latitude: contact.latitude,
  }));

  const columns = [
    { id: 'id', text: 'ID' },
    { id: 'name', text: 'Name' },
    { id: 'phoneNumber', text: 'Phone Number' },
    { id: 'email', text: 'Email' },
    { id: 'address', text: 'Address' },
    { id: 'longitude', text: 'Longitude' },
    { id: 'latitude', text: 'Latitude' },
  ];

  const designOptions = {
    color: '#3498db',
  };

  return (
    <>
        <h1>Dashboard</h1>
        <ResponsiveTable columns={columns} data={transformedData} designOptions={designOptions} />
    </>
  )
  
};

export default ScrollableTable;
