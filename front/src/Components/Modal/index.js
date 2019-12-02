import React from 'react';
import { Modal as MaterialModal } from '@material-ui/core';
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
          <ModalTitle>
            <Title>소셜 미디어 계정으로 로그인</Title>
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
  font-size: 25px;
`;

const ModalWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
const ModalContainer = styled.div`
  width: 400px;
  height: 300px;
  background-color: white;
`;

const ModalTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  height: 30%;
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
