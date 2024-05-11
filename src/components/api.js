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
    then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
};

export const getInitialCards = () => {
  return fetch(`${baseUrl}/cards`, {
    headers: {
      authorization: token,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
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
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка тест: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
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
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка тест: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const removeCard = (id) => {
  return fetch(`${baseUrl}/cards/${id}`, {
    method: "DELETE",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка тест: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addLikeCard = (id) => {
  return fetch(`${baseUrl}/cards/likes/${id}`, {
    method: "PUT",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка тест: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
};
export const removeLikeCard = (id) => {
  return fetch(`${baseUrl}/cards/likes/${id}`, {
    method: "DELETE",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка тест: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
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
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка тест: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
};
