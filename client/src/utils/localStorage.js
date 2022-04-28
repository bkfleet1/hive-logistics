export const getSavedApiaryIds = () => {
  const savedApiaryIds = localStorage.getItem("saved_apiary")
    ? JSON.parse(localStorage.getItem("saved_apiary"))
    : [];

  return savedApiaryIds;
};

export const saveApiaryIds = (apiaryIdArr) => {
  if (apiaryIdArr.length) {
    localStorage.setItem("saved_apiary", JSON.stringify(apiaryIdArr));
  } else {
    localStorage.removeItem("saved_apiary");
  }
};

export const removeApiaryId = (_id) => {
  const savedApiaryIds = localStorage.getItem("saved_apiary")
    ? JSON.parse(localStorage.getItem("saved_apiary"))
    : null;

  if (!savedApiaryIds) {
    return false;
  }

  const updatedSavedApiaryIds = savedApiaryIds?.filter(
    (savedApiaryId) => savedApiaryId !== _id
  );
  localStorage.setItem("saved_apiary", JSON.stringify(updatedSavedApiaryIds));

  return true;
};
