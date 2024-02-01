import ContactForm from '../components/contactform/ContactForm'
import styled from 'styled-components'

const Location = () => {
  return (
    <>
    <Container> 
        <h1> Add Contact</h1>
        <ContactForm/>
    </Container>
    </>
  )
}

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px 10px 10px;
    justify-content: center;
    align-items: center;
    height: 100vh;
  `;

export default Location