// @flow
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { toggleSidenav } from './../SideNav/actions.js';

const HamburgerButton = styled(FontAwesomeIcon)`
  font-size: 2rem;

  :hover {
    cursor: pointer;
    opacity: 0.8;
  }

  @media (min-width: 769px) {
    display: none;
  }
`;

const HeaderContainer = styled.header`
  align-items: center;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.tertiary};
  display: flex;
  font-size: 2vw;
  font-weight: bold;
  justify-content: space-between;
  padding: 0 10px;
  position: relative;
  transition: all ${({ theme }) => theme.globalTransition};

  @media (max-width: 768px) {
    font-size: 14px;
    min-height: 30px;
  }
`;

const PresetNameDisplay = styled.div`
  color: ${({ theme }) => theme.tertiary};
  font-size: 2rem;
  letter-spacing: 3px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-transform: uppercase;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const SideNavButton = styled.div`
  border: 1px solid ${({ theme }) => theme.tertiary};
  height: auto;
  padding: 5px;
  transition: all ${({ theme }) => theme.globalTransition};

  @media (max-width: 768px) {
    display: none;
  }

  &:hover {
    background-color: ${({ theme }) => theme.quaternary};
    cursor: pointer;
    opacity: 0.8;
  }
`;

const SynthName = styled.h1`
  color: ${({ theme }) => theme.tertiary};
  font-size: 3rem;
  line-height: 2rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

function Header({ presetName, toggleSidenav }) {
  return (
    <HeaderContainer>
      <SynthName>bc-010</SynthName>
      <PresetNameDisplay>{presetName}</PresetNameDisplay>
      <SideNavButton onClick={() => toggleSidenav()}>MENU</SideNavButton>
      <HamburgerButton icon={faBars} onClick={() => toggleSidenav()} />
    </HeaderContainer>
  );
}

const mapStateToProps = state => ({
  presetName: state.preset.name,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      toggleSidenav,
    },
    dispatch,
  );

Header.propTypes = {
  /** Name of current synth preset. */
  presetName: PropTypes.string,
  /** Toggle the side nav bar. */
  toggleSidenav: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
