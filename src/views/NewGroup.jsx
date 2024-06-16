import axios from "axios";

import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import Window from "../components/Window";
import Loading from "../components/Loading";

function Form() {
  const [loading, setLoading] = useState(false);
  const [members, setmembers] = useState([]);

  const groupNameInputRef = useRef(null);
  const descriptionInputRef = useRef(null);
  const addMemberInputRef = useRef(null);

  const navigate = useNavigate();

  function addMemberBtnHandler() {
    const memberName = addMemberInputRef.current.value;
    if (
      memberName === "" ||
      members
        .map((member) => member.toUpperCase())
        .includes(memberName.toUpperCase())
    ) {
      addMemberInputRef.current.focus();
    }

    setmembers((members) => [...members, memberName]);
    addMemberInputRef.current.value = "";
  }

  function clearListBtnHandler() {
    setmembers([]);
    addMemberInputRef.current.focus();
  }

  async function submitBtnHandler() {
    const groupName = groupNameInputRef.current.value;

    if (groupName === "") {
      groupNameInputRef.current.focus();
      return;
    } else if (members.length < 2) {
      addMemberInputRef.current.focus();
      return;
    }

    const description = descriptionInputRef.current.value;

    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/new-group`, {
        name: groupName,
        description: description,
        members: members,
      })
      .then((resp) => {
        const group_id = resp.data.group_id;
        navigate(`../group/${group_id.toString(16)}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <form>
      <div className="form-group mb-3">
        <label htmlFor="group-name" className="form-label">
          Group name:
        </label>
        <input
          type="text"
          className="form-control"
          ref={groupNameInputRef}
          onKeyDown={(event) => {
            if (
              (event.key === "Enter" || event.key === "NumpadEnter") &&
              groupNameInputRef.current.value !== ""
            ) {
              descriptionInputRef.current.focus();
            }
          }}
        />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="description" className="form-label">
          Description:
        </label>
        <input
          type="text"
          className="form-control"
          ref={descriptionInputRef}
          onKeyDown={(event) => {
            if (
              (event.key === "Enter" || event.key === "NumpadEnter") &&
              descriptionInputRef.current.value !== ""
            ) {
              addMemberInputRef.current.focus();
            }
          }}
        />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="participant-name" className="form-label">
          Add participant:
        </label>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            ref={addMemberInputRef}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === "NumpadEnter") {
                addMemberBtnHandler();
              }
            }}
          />
          <button
            className="btn btn-primary"
            type="button"
            onClick={addMemberBtnHandler}
          >
            Add
          </button>
        </div>
      </div>
      <div>
        <div className="d-flex align-items-center justify-content-between">
          <h4>members ({members.length})</h4>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={clearListBtnHandler}
          >
            Clear
          </button>
        </div>
        <ul>
          {members.map((member) => (
            <li key={member}>{member}</li>
          ))}
        </ul>
      </div>
      <div className="d-grid gap-2 mx-auto">
        <button
          className="btn btn-primary"
          type="button"
          onClick={submitBtnHandler}
        >
          Done!
        </button>
      </div>
    </form>
  );
}

const NewGroup = () => (
  <Window title="New group">
    <Form />
  </Window>
);

export default NewGroup;
