import { useEffect, useState } from 'react';
import ScrollableTable from '../table/Table';
import MapView from '../map/MapView';
import { CiViewTable } from 'react-icons/ci';
import { FaMapLocationDot } from 'react-icons/fa6';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { firebaseApp } from '../../Firebase'; 

interface TabButtonProps {
  onClick: () => void;
  active: boolean;
  children: React.ReactNode;
  icon: React.ReactNode;
}
interface Contact {
  id: string;
  name: string;
  phoneNumber: string;
  email: string;
  address: string;
  longitude: number;
  latitude: number;
}

const TabComponent = () => {
  const [activeTab, setActiveTab] = useState('table');
const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    // Fetch data from Firebase when the component mounts
    const fetchData = async () => {
      const db = getFirestore(firebaseApp);
      const contactsCollection = collection(db, 'contacts');
      const querySnapshot = await getDocs(contactsCollection);

      const contactsData: Contact[] = [];
      querySnapshot.forEach((doc) => {
        contactsData.push({ id: doc.id, ...doc.data() } as Contact);
      });

      setContacts(contactsData);
    };

    fetchData();
  }, []);

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

      {activeTab === 'table' && <ScrollableTable contacts={contacts} />}
      {activeTab === 'map' && <MapView dummyData={contacts} />}
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



