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

export const getSavedHiveIds = () => {
  const savedHiveIds = localStorage.getItem("saved_hive")
    ? JSON.parse(localStorage.getItem("saved_hive"))
    : [];

  return savedHiveIds;
};

export const savedHiveIds = (hiveIdArr) => {
  if (hiveIdArr.length) {
    localStorage.setItem("saved_hive", JSON.stringify(hiveIdArr));
  } else {
    localStorage.removeItem("saved_hive");
  }
};

export const removeHiveId = (_id) => {
  const savedHiveIds = localStorage.getItem("saved_hive")
    ? JSON.parse(localStorage.getItem("saved_hive"))
    : null;

  if (!savedHiveIds) {
    return false;
  }

  const updatedSavedHiveIds = savedHiveIds?.filter(
    (savedHiveId) => savedHiveId !== _id
  );
  localStorage.setItem("saved_Hive", JSON.stringify(updatedSavedHiveIds));

  return true;
};
