export const getApiaryIds = () => {
  const ApiaryIds = localStorage.getItem("saved_apiary")
    ? JSON.parse(localStorage.getItem("saved_apiary"))
    : [];

  return ApiaryIds;
};

export const saveApiaryIds = (apiaryIdArr) => {
  if (apiaryIdArr.length) {
    localStorage.setItem("saved_apiary", JSON.stringify(apiaryIdArr));
  } else {
    localStorage.removeItem("saved_apiary");
  }
};

export const removeApiaryId = (_id) => {
  const ApiaryIds = localStorage.getItem("saved_apiary")
    ? JSON.parse(localStorage.getItem("saved_apiary"))
    : null;

  if (!ApiaryIds) {
    return false;
  }

  const updatedApiaryIds = ApiaryIds?.filter(
    (ApiaryId) => ApiaryId !== _id
  );
  localStorage.setItem("saved_apiary", JSON.stringify(updatedApiaryIds));

  return true;
};
