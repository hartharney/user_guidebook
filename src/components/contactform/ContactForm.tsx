import { ChangeEvent, FormEvent, useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import Modal from 'react-modal';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { firebaseApp } from "../../Firebase";
import { getFirestore, addDoc, collection} from "firebase/firestore";

const ContactForm = () => {
  const db = getFirestore(firebaseApp);
   const contactsCollection = collection(db, "contacts");
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    addresses: [""],
    longitude: "40.7128", 
    latitude: "-74.0060",
  });
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
   const [modalIsOpen, setIsOpen] = useState(false);
     const [modalContent, setModalContent] = useState("");
  const [modalStyles, setModalStyles] = useState({
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '4.617px',
        border: '1px solid #ccc',
      transistion: 'all 0.5s ease-in-out',
      height: '100px', 
      width: '100px',  
    },
  });


  const openModal = (content: string) => {
    setModalContent(content);
    setIsOpen(true);
  }



  const closeModal = () => {
    setIsOpen(false);
  }

function isValidPhoneNumber(phoneNumber : string) {
 const phoneRegex = /^(?:[0-9] ?){6,14}[0-9]$/;
  return phoneRegex.test(phoneNumber);
}

function isValidEmail(email : string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email);
}


  const handleChange = (e: ChangeEvent<HTMLInputElement>):  void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

   const handlePhoneChange = (value: string) => {
  setFormData({ ...formData, phoneNumber: value });
};


  const handleAddressChange = (index: number, value: string) => {
    const updatedAddresses = [...formData.addresses];
    updatedAddresses[index] = value;
    setFormData({ ...formData, addresses: updatedAddresses });
  };

  const handleAddAddress = () => {
    if (formData.addresses.length < 5) {
      setFormData({ ...formData, addresses: [...formData.addresses, ""] });
    }
  };

  const handleRemoveAddress = (index : number) => {
    const updatedAddresses = [...formData.addresses];
    updatedAddresses.splice(index, 1);
    setFormData({ ...formData, addresses: updatedAddresses });
  };

  const handleSubmit = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPhoneError("");
    setEmailError("");

    if (!isValidPhoneNumber(formData.phoneNumber)) {
      setPhoneError("Invalid phone number");
      return;
    }

    if (!isValidEmail(formData.email)) {
      setEmailError("Invalid email address");
      return;
    }

     try {
      const docRef = await addDoc(contactsCollection, formData);
      console.log(docRef)
      openModal('Successfully added');
        setFormData({
    name: "",
    phoneNumber: "",
    email: "",
    addresses: [""],
    longitude: "40.7128", 
    latitude: "-74.0060",
  })
    } catch (error) {
       openModal('Failed action');
       toast.error("Error adding document", {
        position: 'top-right',
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }

  };

 const customStyles = {
  containerStyle: {
    width: '100%', 
    borderRadius: '4.617px',
  },
  inputStyle: {
    width: "100%",
    height: '35px',
    borderRadius: '4.617px',
    border: '1.154px solid var(--Gray-3, #828282)',
    background: 'var(--Basic-White, #fff)',
    fontSize: '0.8em',
  },
};

  return (
    // <Container>
     <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyles}
        contentLabel="User Action"
      >
        <h2 ref={(_subtitle) => (_subtitle && (_subtitle.style.color = 'green'))}>Thank you!</h2>
        <button onClick={closeModal}>close</button>
      </Modal>
        <Form>
        <FormGroup>
          <label>Name</label>
          <InputField
            type="text"
            name="name"
            placeholder= "Enter your full name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <label>Phone Number</label>

            <PhoneInput
            containerStyle={customStyles.containerStyle}
            inputStyle={customStyles.inputStyle}
            country={'ng'}
            value={formData.phoneNumber}
            onChange={handlePhoneChange}
            />
        {phoneError && <ErrorText>{phoneError}</ErrorText>}
        </FormGroup>

        <FormGroup>
          <label>Email</label>
          <InputField
            type="email"
            name="email"
            placeholder="youremail@examplemail.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        {emailError && <ErrorText>{emailError}</ErrorText>}
        </FormGroup>

        {formData.addresses.map((address, index) => (
          <FormGroup key={index}>
            <label>Address {index + 1}</label>
            <InputField
              type="text"
              placeholder="pinnock beach estate, lekki"
              value={address}
              onChange={(e) => handleAddressChange(index, e.target.value)}
              required
            />
            {formData.addresses.length > 1 && (
              <RemoveButton onClick={() => handleRemoveAddress(index)}>
                Remove
              </RemoveButton>
            )}

          </FormGroup>
        ))}
        
            {formData.addresses.length < 5 ? (<AddButton type="button" onClick={handleAddAddress}>
          Add Address
        </AddButton>) : "" } 

        <FormGroup>
          <label>Longitude</label>
          <InputField
            type="text"
            name="longitude"
            value={formData.longitude}
            readOnly
            disabled
          />
        </FormGroup>

        <FormGroup>
          <label>Latitude</label>
          <InputField
            type="text"
            name="latitude"
            value={formData.latitude}
            readOnly
            disabled
          />
        </FormGroup>

        <SubmitButton type="submit" onClick={handleSubmit}> SUBMIT </SubmitButton>
      </Form>
     </>

  );
};


const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
  max-width: 600px;
  width: 100%;

  @media (max-width: 759px) {
        display: flex;
        flex-direction: column;
        overflow: scroll;
        margin-bottom: 20px;

    }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

const RemoveButton = styled.button`
  margin-top: 5px;
  color: red;
  cursor: pointer;
  padding: 3px;
  

  &:hover{
    background-color : red;
    color: white;
    outline: none;
    border: none;
  }
`;

const AddButton = styled.button`
  grid-column: span 2;
  background-color: #4caf50;
  height: 35px;
  padding: 10px;
  color: white;
  cursor: pointer;
`;

const SubmitButton = styled.button`
    grid-column: span 2;
    background-color: #008cba;
    color: white;
    cursor: pointer;
    border-radius: 4.617px;
    padding: 10px;
    height: 35px;

    &:hover{
        background-color: green;
        color: white;
    }
`;

const InputField = styled.input`
    border-radius: 4.617px;
    border: 1.154px solid var(--Gray-3, #828282);
    background: var(--Basic-White, #fff);
    padding: 0px 10px 0px;
    height: 35px;
    align-self: stretch;

     ::placeholder {
      font-size: 0.8em;
      color: #888;
      padding: 0px;
    }
`

const ErrorText = styled.p`
  color: red;
  margin-top: 5px;
  font-size: 0.8em;
`;



export default ContactForm;
