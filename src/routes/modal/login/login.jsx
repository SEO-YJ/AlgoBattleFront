import "./login.css";
import React, { useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { handleClose } from "../../store/reducers/modal/login";
import { clientLogin } from "../../store/reducers/user";

export default function ModalLogin() {
  const { show } = useSelector((state) => state.showLogin);
  const dispatch = useDispatch();
  const [nickname, setNickname] = useState("");

  const onLogin = () => {
    // TODO 입력된 닉네임 backjoon에 검증
    // 임시로 입력된 것 그대로 로그인 되도록 함
    const action = clientLogin(nickname);
    dispatch(action);
    setNickname("");
    dispatch(handleClose())
  }

  return (
    <Modal 
      show={show}
      className="modalLogin"
      onHide={()=>dispatch(handleClose())}
    >
      <ModalHeader closeButton>
        <Modal.Title>Sign in to AlgoBattle</Modal.Title>
      </ModalHeader>
      <ModalBody>
        <div className="modalLoginText">Backjoon에서 사용하는 닉네임을 입력해주세요</div>
        <input className="modalLoginInput"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
      </ModalBody>
      <ModalFooter>
        <Button variant="light" onClick={()=>dispatch(handleClose())}>취소</Button>
        <Button onClick={()=>onLogin()}>로그인</Button>
      </ModalFooter>
    </Modal>
  );
}
