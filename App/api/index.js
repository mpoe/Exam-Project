import React from 'react';

export function createProfile(payload){
  console.log(payload)
  return fetch('http://www.mpoe.dk/game/create-profile.php', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: payload.name,
      password: payload.password
    }),
  });
}

export function login(payload){
  return fetch('http://www.mpoe.dk/game/login.php', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: payload.name,
      password: payload.password,
      facebookID: payload.facebookID,
      token: payload.token,
    }),
  });
}

export function getTopscores(payload){
  console.log(payload)
  let url = "http://www.mpoe.dk/game/get-topscores.php?levelID="+payload.levelID;
  console.log(url);
  return fetch(url);
}