import React from 'react';
import { Modal as MaterialModal } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import PropType from 'prop-types';
import styled from 'styled-components';
import Login from '../Auth';

const Modal = ({ open, setOpen }) => {
  const closeHandler = () => {
    setOpen(false);
  };

  return (
    <MaterialModal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={open}
    >
      <ModalWrapper onClick={closeHandler}>
        <ModalContainer onClick={(e) => { e.stopPropagation(); }}>
          <CloseIcon  onClick={closeHandler} />
          <ModalTitle>
            <Title>소셜 미디어 로그인</Title>
          </ModalTitle>
          <ModalContent>
            <Login />
          </ModalContent>
        </ModalContainer>
      </ModalWrapper>
    </MaterialModal>
  );
};


const Title = styled.p`
  font-size: 24px;
`;

const ModalWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
const ModalContainer = styled.div`
  width: 540px;
  height: 310px;
  padding: 15px;
  border-radius: 5px;
  background-color: white;
  & > svg {
    color: #9e9e9e;
    &:hover {
      cursor: pointer;
      border-radius: 50%;
      background: lightgrey;
    }
  }
`;

const ModalTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 20%;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

Modal.propTypes = {
  open: PropType.bool.isRequired,
  setOpen: PropType.func.isRequired,
};

export default Modal;
