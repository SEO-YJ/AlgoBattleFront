import "./login.css";
import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Spinner,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { handleClose } from "../../store/reducers/modal/login";
import { clientLogin, initClient } from "../../store/reducers/user";

export default function ModalLogin() {
  const { loading } = useSelector((state) => state.user);
  const { show } = useSelector((state) => state.showLogin);
  const dispatch = useDispatch();
  const [nickname, setNickname] = useState("");

  const onLogin = () => {
    const action = clientLogin({ nickname });
    dispatch(action)
      .then((data) => {
        setNickname("");
        dispatch(handleClose());
      })
      .catch((err) => {
        alert("백준에 아이디가 존재하지 않습니다.");
        dispatch(initClient());
      });
  };

  return (
    <div>
      <Modal
        show={show}
        className="modalLogin"
        onHide={() => dispatch(handleClose())}
      >
        <ModalHeader closeButton>
          <ModalTitle>Sign in to AlgoBattle</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <div className="modalLoginText">
            Backjoon에서 사용하는 닉네임을 입력해주세요
          </div>
          <input
            className="modalLoginInput"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </ModalBody>
        {loading == "pending" ?
          <Spinner variant="primary" className="modalLoginSpinner"></Spinner>
        :<></>}
        <ModalFooter>
          <Button variant="light" onClick={() => dispatch(handleClose())}>
            취소
          </Button>
          <Button onClick={() => onLogin()}>로그인</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
