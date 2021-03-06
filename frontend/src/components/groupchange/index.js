import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Wrapper from "./styles";
import CloseIcon from "@material-ui/icons/Close";
import { TextareaAutosize } from "@material-ui/core";
import { groupAPI } from "../../utils/axios";
const Headdiv = styled.div`
  width: 100%;
  height: 60px;
  background-color: #a3cca3;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
`;
const Bodydiv = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  color: white;
`;
const Titlediv = styled.div`
  width: 95%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 2.5%;
  color: black;
`;
const Contentdiv = styled.div`
  width: 95%;
  height: 300px;
  display: flex;
  padding: 0 2.5%;
  align-items: center;
  justify-content: space-between;
  color: black;
`;
const Bottomdiv = styled.div`
  width: 95%;
  height: 60px;
  padding: 0 2.5%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: black;
`;
const Rounddiv = styled.div`
  width: 180px;
  height: 40px;
  border-radius: 45px;
  background-color: #a3cca3;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Closebtn = styled.button`
  height: 60px;
  margin-right: 12px;
  background-color: #a3cca3;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  border: none;
  cursor: pointer;
`;
const Textcontent = styled.textarea`
  height: 75%;
  resize: none;
  width: 65%;
  border-radius: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  padding: 2.5%;
  &:focus {
    outline: none;
  }
`;
const Texttitle = styled.textarea`
  resize: none;
  height: 20px;
  width: 65%;
  border-radius: 45px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: black;
  padding: 8px 2.5%;
  &:focus {
    outline: none;
  }
`;
const Createbtn = styled.button`
  height: 50px;
  width: 60px;
  background-color: #a3cca3;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  color: white;
  border-radius: 8px;
  border: none;
  &:hover {
    background-color: #69a569;
  }
`;
const Duplicatebtn = styled.button`
  height: 40px;
  background-color: #a3cca3;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  border-radius: 8px;
  border: none;
  &:hover {
    background-color: #69a569;
  }
`;
const Create = (props) => {
  const { open, close, groupid } = props;
  const [groupinfo, setGroupinfo] = useState([]);
  const [title, setTitle] = useState("");
  const [context, setContext] = useState("");
  const [ischeck, setIscheck] = useState(false)
  const handleContext = (e) => {
    setContext(e.target.value);
    console.log(e.target.value);
  };
  const handleTitle = (e) => {
    setTitle(e.target.value);
    console.log(e.target.value);
    setIscheck(false)
  };
 
  const handleChange = async () => {
    if(ischeck === true){
      if (window.confirm("?????? ??????????????? ??????????")) {
        await groupAPI
        .updateGroup(groupid, title, context)
        .then(() => {window.alert("??????????????? ?????????????????????.")})
        .catch((e) => {window.alert("????????? ?????????????????????.")});
      window.location.href = `/group/${groupid}/manage`
      }
      else {

      }
    }
    else {
      window.alert("?????? ????????? ????????? ?????????")
    }
    
  };
  const handleDuplicate = async (e) => {
    await groupAPI
      .validateGroupName(title)
      .then(({ data }) => {
        if (data.found === true){
          window.alert("?????? ???????????? ??????????????????.")
          setIscheck(false)
        }
        else{
          window.alert("?????? ????????? ??????????????????.")
          setIscheck(true)
        }
      })
      .catch((e) => {});
  };
  useEffect(() => {
    async function loadGroupinfo() {
      await groupAPI
        .getGroup(groupid)
        .then(({ data }) => {
          console.log(data);
          setTitle(data.name);
          setContext(data.context);
        })
        .catch((e) => {});
    }

    loadGroupinfo();
  }, []);
  return (
    <div>
      {open ? (
        <Wrapper>
          <Headdiv>
            <div></div>
            <div>?????? ??????</div>
            <Closebtn onClick={close}>
              <CloseIcon></CloseIcon>
            </Closebtn>
          </Headdiv>
          <Bodydiv>
            <Titlediv>
              <Rounddiv>?????? ??????</Rounddiv>
              <Texttitle value={title} onChange={handleTitle}></Texttitle>
              <Duplicatebtn onClick={handleDuplicate}>?????? ??????</Duplicatebtn>
            </Titlediv>
            <Contentdiv>
              <Rounddiv>????????? ??????</Rounddiv>
              <Textcontent
                multiline
                rows={4}
                value={context}
                onChange={handleContext}
                variant="outlined"
              ></Textcontent>
            </Contentdiv>
            <Bottomdiv>
              <Createbtn onClick={handleChange}>??????</Createbtn>
            </Bottomdiv>
            <Bottomdiv style={{ height: "0px" }}></Bottomdiv>
          </Bodydiv>
        </Wrapper>
      ) : null}
    </div>
  );
};

export default Create;
