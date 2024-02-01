import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

type Contact = {
  id: string;
  name: string;
  phoneNumber: string;
  email: string;
  address: string;
  longitude: number;
  latitude: number;
};

type MapViewProps = {
  dummyData: Contact[];
};

const MapView: React.FC<MapViewProps> = ({ dummyData }) => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const handleContactSelect = (contact: Contact) => {
    setSelectedContact(contact);
  };

  useEffect(() => {
    if (selectedContact) {
      console.log(selectedContact);
      console.log(selectedContact.longitude);
      console.log(selectedContact.latitude);
    }
  }, [selectedContact]);

 useEffect(() => {
  const iframe = document.getElementById('mapFrame') as HTMLIFrameElement;

  if (iframe && selectedContact) {
    const { latitude, longitude } = selectedContact;

    iframe.src = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.5806871468985!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf7d90ebc1801%3A0x390e8023a5527003!2sCloudBank!5e0!3m2!1sen!2sng!4v1706787546074!5m2!1sen!2sng`;
  } else {
    // Default coordinates when no contact is selected
    iframe.src = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.5806871468985!2d3.5275332793471!3d6.447844807413136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf7d90ebc1801%3A0x390e8023a5527003!2sCloudBank!5e0!3m2!1sen!2sng!4v1706787546074!5m2!1sen!2sng`;
  }
}, [selectedContact]);


  return (
    <>
        <h2>Dashboard</h2>
        <Container>
               <ContactList>
          {dummyData.map((contact) => (
            <ContactItem
              key={contact.id}
              onClick={() => handleContactSelect(contact)}
              isSelected={selectedContact === contact}
            >
              {contact.name}
            </ContactItem>
          ))}
        </ContactList>

        </Container>

              {/* <MapFrame> */}
            <StyledIframe
        id="mapFrame"
        allowFullScreen={false}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></StyledIframe>
            {/* </MapFrame> */}
    </>
  );
};

const Container = styled.div`
  width: 600px;
  height: 100px;
  overflow: scroll;

  @media (max-width: 759px) {
    width: 300px;
  }
`;

const ContactList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  overflow: hidden;
`;

const ContactItem = styled.li<{ isSelected?: boolean }>`
  cursor: pointer;
  padding: 10px;
  margin: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #eee;
  }

  ${({ isSelected }) =>
    isSelected &&
    `
    background-color: #eee;
  `}
`;


const StyledIframe = styled.iframe`
  width: 290px;
  height: 290px;

  @media (min-width: 769px) {
    width: 600px;
    height: 450px;
  }
  `

MapView.propTypes = {
  dummyData: PropTypes.array.isRequired,
};

export default MapView;

