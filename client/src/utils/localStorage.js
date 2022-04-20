// export const getActionsIds = () => {
//   const savedActionsIds = localStorage.getItem('saved_actions')
//     ? JSON.parse(localStorage.getItem('saved_actions'))
//     : [];

//   return savedActionsIds;
// };

// export const saveActionIds = (actionIdArr) => {
//   if (actionIdArr.length) {
//     localStorage.setItem('saved_actions', JSON.stringify(actionIdArr));
//   } else {
//     localStorage.removeItem('saved_actions');
//   }
// };

export const getIds = () => {
  const savedActionsIds = localStorage.getItem('id')
    ? JSON.parse(localStorage.getItem('id'))
    : [];

  return savedActionsIds;
};

export const saveIds = (idArr) => {
  if (idArr.length) {
    localStorage.setItem('id', JSON.stringify(idArr));
  } else {
    localStorage.removeItem('id');
  }
};

