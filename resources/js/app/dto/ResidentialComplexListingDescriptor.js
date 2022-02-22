export default class ResidentialComplexListingDescriptor {
  id;
  name;
  cityId;
  realEstateDeveloper;
  images;
  type;
  status;
  address;
  hash;
  subwaysDistance;
  minimalPriceUah;
  minimalPriceUsd;
  url;
  lines;
  plans;
  description;
  infrastructure;
  complexAdvantages;
  houseAttributes;
  coordinates;
  completionYear;
  completionQuarter;
  isVerified;
  promotions;
  constructionProgress;
  documents;
  district;
  cityName;

  constructor({
    id,
    name,
    cityId,
    realEstateDeveloper,
    images,
    type,
    status,
    address,
    hash,
    subwaysDistance,
    minimalPriceUah,
    minimalPriceUsd,
    minimalFullPriceUah,
    url,
    lines,
    plans,
    description,
    infrastructure,
    complexAdvantages,
    houseAttributes,
    coordinates,
    completionYear,
    completionQuarter,
    isVerified,
    promotions,
    constructionProgress,
    documents,
    callbackPhone,
    district,
    cityName
  }) {
    this.id = id;
    this.name = name;
    this.cityId = cityId;
    this.realEstateDeveloper = realEstateDeveloper;
    this.images = images;
    this.type = type;
    this.status = status;
    this.address = address;
    this.subwaysDistance = subwaysDistance;
    this.minimalPriceUah = minimalPriceUah;
    this.minimalPriceUsd = minimalPriceUsd;
    this.minimalFullPriceUah = minimalFullPriceUah;
    this.url = url;
    this.hash = hash;
    this.houseAttributes = houseAttributes;
    this.lines = lines;
    this.plans = plans;
    this.description = description;
    this.infrastructure = infrastructure;
    this.complexAdvantages = complexAdvantages;
    this.coordinates = coordinates;
    this.completionYear = completionYear;
    this.completionQuarter = completionQuarter;
    this.isVerified = isVerified;
    this.promotions = promotions;
    this.constructionProgress = constructionProgress;
    this.documents = documents;
    this.callbackPhone = callbackPhone;
    this.district = district;
    this.cityName = cityName;
  }
}
