import { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { Logo } from '../../assets';
import { AiOutlineHome, AiOutlineUser } from 'react-icons/ai';
import styled from 'styled-components';
import { CgMenuGridR } from 'react-icons/cg';
import { FaRegWindowClose } from 'react-icons/fa';

const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState("dashboard");

   const handleTabClick = (tab: string) => {
    setIsActive(tab);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <LayoutContainer>
        <ToggleBtn onClick={toggleSidebar} isOpen={isOpen}>
          {isOpen ? <FaRegWindowClose style={{ color: '#3498db' }} /> : <CgMenuGridR style={{ color: '#3498db' }} />}
        </ToggleBtn>

        <SidebarContainer isOpen={isOpen}>
          <LogoDiv>
            <Link to={'/dashboard'}>
              <img src={Logo} alt="logo" />
            </Link>
          </LogoDiv>

          <SidebarUl>
            <SidebarLi>
              <NavLinkStyle to="/dashboard" onClick={() => handleTabClick('dashboard')} style={{backgroundColor : isActive === 'dashboard' ? "#3498db" : "inherit", color : isActive === 'dashboard' ? "white" : "#3498db" }}>
                <AiOutlineHome /> <span style={{ marginLeft: '10px' }}> Dashboard </span>
              </NavLinkStyle>
            </SidebarLi>
            <SidebarLi>
              <NavLinkStyle to="add-user" onClick={() => handleTabClick('user')} style={{backgroundColor : isActive === 'user' ? "#3498db" : "inherit", color : isActive === 'user' ? "white" : "#3498db"  }}>
                <AiOutlineUser /> <span style={{ marginLeft: '10px' }}>User Actions</span>
              </NavLinkStyle>
            </SidebarLi>
          </SidebarUl>
        </SidebarContainer>

        <MainContent>
          <Outlet />
        </MainContent>
      </LayoutContainer>
    </>
  );
};

const LayoutContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
`;


const ToggleBtn = styled.button<{ isOpen: boolean }>`
  display: none;

  @media (max-width: 759px) {
    display: block;
    position: fixed;
    top: 10px;
    left: 10px;
    z-index: 1000;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 24px;
    color: #333;
    margin-left: ${({ isOpen }) => (isOpen ? '150px' : '0')};
    transition: margin-left 0.3s ease;
  }

`;

const SidebarContainer = styled.div<{ isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  width: 150px;

  @media (max-width: 759px) {
    position: fixed;
    top: 0px;
    left: ${({ isOpen }) => (isOpen ? '0' : '-250px')};
    z-index: 1;
    transition: left 0.3s ease;
    width: 150px;
    background-color: #fff;
    color: black;
    height: 100vh;
  }
`;


const LogoDiv = styled.div`
  font-size: 1.5rem;
  margin-bottom: 10px;
  cursor: pointer;
`;

const SidebarUl = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
`;

const SidebarLi = styled.li`
  margin-bottom: 10px;

  &:hover {
    color: #3538cd;
  }

  &.active {
    background-color: black;
    color: white;
  }
`;

const NavLinkStyle = styled(NavLink)`
  text-decoration: none;
  color: #3498db;
  font-size: 1rem;
  font-weight: bold;
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 10px;
  border-radius: 10px;

  &:hover {
    background-color: #3498db;
    color: white;
  }
`;

const MainContent = styled.main`
  display: flex;
  flex-direction: column;
  padding: 5px;
  flex: 1;
  background-color: #f9fafb;

  @media (max-width: 759px) {
    padding: 20px;
  }
`;

export default Layout;
