import { useState } from 'react';
import ScrollableTable from '../table/Table';
import MapView from '../map/MapView';
import { CiViewTable } from 'react-icons/ci';
import { FaMapLocationDot } from 'react-icons/fa6';

interface TabButtonProps {
  onClick: () => void;
  active: boolean;
  children: React.ReactNode;
  icon: React.ReactNode;
}

const TabComponent = () => {
  const [activeTab, setActiveTab] = useState('table');
 const dummyData = [
  {
    id: '1',
    name: 'John Doe',
    phoneNumber: '123-456-7890',
    email: 'john@example.com',
    address: '123 Main St',
    longitude: -74.0059,
    latitude: 40.7128,
  },
  {
    id: '2',
    name: 'Jane Smith',
    phoneNumber: '987-654-3210',
    email: 'jane@example.com',
    address: '456 Oak St',
    longitude: -73.9876,
    latitude: 40.7214,
  },
  {
    id: '3',
    name: 'Bob Johnson',
    phoneNumber: '555-123-4567',
    email: 'bob@example.com',
    address: '789 Pine St',
    longitude: -73.9762,
    latitude: 40.7306,
  },
  {
    id: '4',
    name: 'Alice Williams',
    phoneNumber: '333-999-8888',
    email: 'alice@example.com',
    address: '101 Elm St',
    longitude: -73.9659,
    latitude: 40.7398,
  },
  {
    id: '5',
    name: 'Charlie Brown',
    phoneNumber: '777-444-5555',
    email: 'charlie@example.com',
    address: '202 Birch St',
    longitude: -73.9546,
    latitude: 40.7490,
  },
];

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div>
        <TabButton
          onClick={() => handleTabClick('table')}
          active={activeTab === 'table'}
          icon={<CiViewTable style={{ marginRight: '5px' }} />}
        >
          Table View
        </TabButton>
        <TabButton
          onClick={() => handleTabClick('map')}
          active={activeTab === 'map'}
          icon={<FaMapLocationDot style={{ marginRight: '5px' }} />}
        >
          Map View
        </TabButton>
      </div>

      {activeTab === 'table' && <ScrollableTable contacts={dummyData} />}
      {activeTab === 'map' && <MapView dummyData={dummyData} />}
    </div>
  );
};

const TabButton: React.FC<TabButtonProps> = ({ onClick, active, children, icon }) => (
  <button
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      padding: '10px',
      margin: '5px',
      backgroundColor: active ? '#3498db' : '#ffffff',
      color: active ? '#ffffff' : '#333',
      border: '1px solid #3498db',
      borderRadius: '5px',
      cursor: 'pointer',
    }}
    onClick={onClick}
  >
    {icon}
    <span style={{ marginLeft: '5px' }}>{children}</span>
  </button>
);

export default TabComponent;



