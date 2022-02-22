export default class RealEstateDeveloperDescriptor {
  id;
  name;
  logoSrc;
  url;
  finishedBuildings;
  finishedComplexes;
  inProgressBuildings;
  inProgressComplexes;

  constructor({
    id,
    name,
    logoSrc,
    url,
    finishedBuildings,
    finishedComplexes,
    inProgressBuildings,
    inProgressComplexes,
  }) {
    this.id = id;
    this.name = name;
    this.logoSrc = logoSrc;
    this.url = url;
    this.finishedBuildings = finishedBuildings;
    this.finishedComplexes = finishedComplexes;
    this.inProgressBuildings = inProgressBuildings;
    this.inProgressComplexes = inProgressComplexes;
  }
}
