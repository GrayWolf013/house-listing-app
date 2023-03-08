function splitString(str) {
  const arr = str.split(" ");
  const last = arr.pop();
  const remaining = arr.join(" ");
  return { last, remaining };
}
export const convertApiModelToEditHouseModel = (originalModel) => {
  const { last, remaining } = splitString(originalModel.location.street);
  const convertedModel = {
    id: originalModel.id,
    image: originalModel.image,
    price: originalModel.price,
    bedrooms: originalModel.rooms.bedrooms,
    bathrooms: originalModel.rooms.bathrooms,
    size: originalModel.size,
    description: originalModel.description,
    streetName: remaining,
    houseNumber: last,
    numberAddition: "",
    city: originalModel.location.city,
    zip: originalModel.location.zip,
    constructionYear: originalModel.constructionYear,
    hasGarage: originalModel.hasGarage,
  };
  return convertedModel;
};

export const convertEditHouseModelToApiModel = (convertedModel) => {
  const originalModel = {
    id: convertedModel.id,
    image: convertedModel.image,
    price: convertedModel.price,
    rooms: {
      bedrooms: convertedModel.bedrooms,
      bathrooms: convertedModel.bathrooms,
    },
    size: convertedModel.size,
    description: convertedModel.description,
    location: {
      street: `${convertedModel.streetName} ${convertedModel.houseNumber}${convertedModel.numberAddition}`,
      city: convertedModel.city,
      zip: convertedModel.zip,
    },
    constructionYear: convertedModel.constructionYear,
    hasGarage: convertedModel.hasGarage,
    madeByMe: true,
  };
  return originalModel;
};
