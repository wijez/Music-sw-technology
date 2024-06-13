import React, { useState } from "react";
import "./user.css";
import { GrContactInfo } from "react-icons/gr";

export default function User({ user }) {
  const [showUser, setShowUser] = useState(false);
  const toggleShowUser = () => {
    setShowUser(!showUser);
  };
  return (
    <>
      <div>
        <GrContactInfo onClick={toggleShowUser}  className="info-button"/>
      </div>
      {showUser && (
        <div className="user-info">
          <ul className="use-user-ul">
          <li className="use-user-li">Username: {user.username} </li>
          <li className="use-user-li">Email: {user.email}</li>
          <li className="use-user-li">ID: {user.id}</li>
          <li className="use-user-li">Created: {new Date(user.created).toLocaleString()}</li>
          <li className="use-user-li">Updated: {new Date(user.updated).toLocaleString()}</li>
          <li className="use-user-li">Active: {user.is_active ? "Yes" : "No"}</li>
          <li className="use-user-li">Superuser: {user.is_superuser ? "Yes" : "No"}</li>
          </ul>
        </div>
      )}
    </>
  );
}
