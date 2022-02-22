import oneRoomIcon from "$js/assets/img/realty-props/rooms-one.svg";
import twoRoomIcon from "$js/assets/img/realty-props/rooms-two.svg";
import threeRoomIcon from "$js/assets/img/realty-props/room-three.svg";
import fourRoomIcon from "$js/assets/img/realty-props/rooms-four.svg";
import layoutAdjacentIcon from "$js/assets/img/realty-props/layout-adjacent.svg";
import layoutMultiLevelIcon from "$js/assets/img/realty-props/layout-multi-level.svg";
import layoutSeparateIcon from "$js/assets/img/realty-props/layout-separate.svg";
import layoutStudioIcon from "$js/assets/img/realty-props/layout-studio.svg";
import layoutOtherIcon from "$js/assets/img/realty-props/layout-other.svg";
import bathroomCombinedIcon from "$js/assets/img/realty-props/bathroom-combined.svg";
import bathroomAdjacentIcon from "$js/assets/img/realty-props/bathroom-adjacent.svg";
import bathroomMultiIcon from "$js/assets/img/realty-props/bathroom-multi.svg";

import {currencies} from '$js/config';

export const advTypes = {
  rent: 'rent',
  sale: 'sale'
}

export const communalPaymentsTypes = {
  byMeters: 'by_meters',
  included: 'included',
}

export const streetTypes = [
  {value: 'ул.', label: 'Улица'},
  {value: 'пер.', label: 'Переулок'},
  {value: 'просп.', label: 'Проспект'},
  {value: 'ал.', label: 'Аллея'},
  {value: 'бул.', label: 'Бульвар'},
  {value: 'наб.', label: 'Набережная'},
]

export const roomCounts = [
  {value: 1, icon: oneRoomIcon, label: 'Одна комната', shortLabel: '1'},
  {value: 2, icon: twoRoomIcon, label: 'Две комнаты', shortLabel: '2'},
  {value: 3, icon: threeRoomIcon, label: 'Три комнаты', shortLabel: '3'},
  {value: 4, icon: fourRoomIcon, label: 'Четыре комнаты', shortLabel: '4'}
]

export const layoutTypes = [
  {value: 'adjacent', label: 'Примыкающий', icon: layoutAdjacentIcon},
  {value: 'multilevel', label: 'Многоуровневый', icon: layoutMultiLevelIcon},
  {value: 'separated', label: 'Раздельный', icon: layoutSeparateIcon},
  {value: 'studio', label: 'Студия', icon: layoutStudioIcon},
  {value: 'other', label: 'Другое', icon: layoutOtherIcon},
]

export const bathroomTypes = [
  {value: 'combined', icon: bathroomCombinedIcon, label: 'Комбинированный',},
  {value: 'adjacent', icon: bathroomAdjacentIcon, label: 'Примыкающий',},
  {value: 'multi', icon: bathroomMultiIcon, label: 'Два или больше',},
]

export const conditionTypes = [
  { value: 'designer', label: 'Дизайнерский ремонт' },
  { value: 'recent', label: 'Свежий ремонт' },
  { value: 'requires', label: 'Нуждается в ремонте'},
  { value: 'grandma', label: 'Бабушкин ремонт'},
  { value: 'cosmetic', label: 'Косметический ремонт' },
]

export const furnitureTypes = [
  { value: 'old', label: 'Старая мебель' },
  { value: 'new', label: 'Новая мебель' },
  { value: 'without', label: 'Без мебели'},
]

export const heatingTypes = [
  {value: 'centralized', label: 'Центральное'},
  {value: 'individual', label: 'Индивидуальное'},
]
export const entranceTypes = [
  {value: 'intercom', label: 'Внутренний'},
  {value: 'concierge', label: 'Консьерж'},
  {value: 'code', label: 'Код'},
  {value: 'key', label: 'Ключ'},
  {value: 'opened', label: 'Открытый'},
]

export const wallTypes = [
  {value: 'brick', label: 'Кирпич'},
  {value: 'panel', label: 'Панель'},
  {value: 'monolithic', label: 'Монолитный'},
  {value: 'cinder', label: 'Шлакоблок'},
  {value: 'other', label: 'Другое'},
]

export const buildingTypes = [
  {value: 'carskij', label: 'Царский Дом'},
  {value: 'stalinka', label: 'Сталинка'},
  {value: 'hrushhevka', label: 'Хрущёвка'},
  {value: 'gostinka', label: 'Общежитие'},
  {value: 'cheshka', label: 'Чешский'},
  {value: '80s', label: 'Строительство 80-90-х'},
  {value: '90s', label: 'Строительство 91-200х'},
  {value: '00s', label: 'Строительство 2001-2010х'},
  {value: '10s', label: 'Постройки с 2011'},
]

export const parkingTypes = [
  {value: 'underground', label: 'Подземный паркинг'},
  {value: 'secure', label: 'Охраняемая парковка'},
  {value: 'own', label: 'Собственное парковочное место'},
  {value: 'public', label: 'Собственное парковочное место'},
  {value: 'noparking', label: 'Нет парковки'},
]


export function setDefaultProps(realty) {
  realty.setAdvType(advTypes.rent);
  realty.setAdvType(advTypes.rent);
  realty.setCurrency(currencies.usd);
  realty.setCommunalPaymentsType(communalPaymentsTypes.byMeters);
  realty.setRoomCount(roomCounts[0].value);
  realty.setLayoutType(layoutTypes[0].value);
  realty.setBathroomType(bathroomTypes[0].value);
  realty.setConditionType(conditionTypes[0].value);
  realty.setFurnitureType(furnitureTypes[0].value);
  realty.setHeatingType(heatingTypes[0].value);
  realty.setWallType(wallTypes[0].value);
  realty.setBuildingType(buildingTypes[0].value);
  realty.setParkingTypes([]);
  realty.setEntranceTypes([]);
  realty.setAllowAnimals(true)
  realty.setAllowKids(true)
  realty.setAllowRoommates(true)
  realty.setAllowSmoking(true)
  realty.setAllowForeigners(true)
  realty.setFeatureIds([]);

  return realty;
}