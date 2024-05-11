import {
  checkResponse
} from "../utils/utils.js"; 

const baseUrl = "https://nomoreparties.co/v1/wff-cohort-12";
const token = "bf52937a-0b0d-4268-9d24-c6c1b2c0f5e0";

/*const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-12",
  headers: {
    authorization: "bf52937a-0b0d-4268-9d24-c6c1b2c0f5e0",
  },
};*/

export const getUserData = () => {
  return fetch(`${baseUrl}/users/me`, {
    headers: {
      authorization: token,
    },
  }).
    then(checkResponse);
};

export const getInitialCards = () => {
  return fetch(`${baseUrl}/cards`, {
    headers: {
      authorization: token,
    },
  })
    .then(checkResponse);
};

export const patchUserData = (name, about) => {
  //console.log(name + " охблин " + about);
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  })
    .then(checkResponse)
};

export const postCard = (name, link, userId) => {
  //console.log(name + " охблин " + about);
  return fetch(`${baseUrl}/cards`, {
    method: "POST",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  })
    .then(checkResponse)
};

export const removeCard = (id) => {
  return fetch(`${baseUrl}/cards/${id}`, {
    method: "DELETE",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
  })
    .then(checkResponse)
};

export const addLikeCard = (id) => {
  return fetch(`${baseUrl}/cards/likes/${id}`, {
    method: "PUT",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
  })
    .then(checkResponse)
};
export const removeLikeCard = (id) => {
  return fetch(`${baseUrl}/cards/likes/${id}`, {
    method: "DELETE",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
  })
    .then(checkResponse)
};

export const changeAvatar = (data) => {
  return fetch(`${baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(checkResponse)
};
