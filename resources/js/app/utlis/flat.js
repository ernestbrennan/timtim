import {Trans} from '@lingui/macro';
import React from 'react';
import {t} from '@lingui/macro';
import DateTime from 'luxon/src/datetime';

const getRoomsText = (value) => (value ? <Trans>{value} r</Trans> : null);
const getSizeText = (value) => (value ? <Trans>{value} m²</Trans> : null);
const getFloorText = (floor, floorCount) => floor && floorCount ? (<Trans>{floor}/{floorCount} floor</Trans>) : null;
const convertAddress = (streetType, streetName, houseNumber, cityName) =>
  [streetType, streetName, houseNumber, cityName].filter((v) => !!v).join(', ');

const findNearestSubway = (subways, subwaysById) => {
  const nearestSubway =
    subways && subways.length
      ? subways.reduce((prev, cur) => (!prev || prev.minutes > cur.minutes ? cur : prev))
      : null;
  if (!nearestSubway || !subwaysById[nearestSubway.subway_id]) {
    return null;
  }
  return {
    name: subwaysById[nearestSubway.subway_id].name,
    minutes: nearestSubway.minutes,
    lineColor: '#' + subwaysById[nearestSubway.subway_id].lineColor,
    slug_seo: subwaysById[nearestSubway.subway_id].slug_seo,
  };
};

const getTime = (value, locale) => {
  let now = new Date();
  let date = new Date(value);
  if (
    now.getFullYear() === date.getFullYear() &&
    now.getMonth() === date.getMonth() &&
    now.getDate() === date.getDate()
  ) {
    return t`today` + ' ' + DateTime.fromISO(value).setLocale(locale).toFormat('HH:mm');
  } else return DateTime.fromISO(value).setLocale(locale).toFormat('d MMMM HH:mm');
};

const propKeys = {
  room_plan: <Trans>Layout</Trans>,
  bathroom: <Trans>Bathroom</Trans>,
  heating: <Trans>Heating</Trans>,
  entrance: <Trans>Entrance</Trans>,
  wall_type: <Trans>Walls type</Trans>,
  building_type: <Trans>House type</Trans>,
  conditions: <Trans>Renovation</Trans>,
  furniture: <Trans>Furniture</Trans>,
  additional_payments: <Trans>utilities</Trans>,
};
const values = {
  ROOM_PLAN: [
    {
      name: 'walkthrough',
      desc: <Trans>walkthrough</Trans>,
    },
    {
      name: 'separated',
      desc: <Trans>separated</Trans>,
    },
    {
      name: 'studio',
      desc: <Trans>studio</Trans>,
    },
    {
      name: 'multilevel',
      desc: <Trans>multilevel</Trans>,
    },
    {
      name: 'other',
      desc: <Trans>other</Trans>,
    },
  ],
  BATHROOM: [
    {
      name: 'full',
      desc: <Trans>full</Trans>,
    },
    {
      name: 'separated',
      desc: <Trans>separated bathroom</Trans>,
    },
    {
      name: 'multi',
      desc: <Trans>two or more</Trans>,
    },
  ],
  HEATING: [
    {name: 'centralized', desc: <Trans>centralized</Trans>},
    {name: 'individual', desc: <Trans>individual</Trans>},
    /*{name: 'centralized', desc: t('центральное'},
    {name: 'individual', desc: t('индивидуальное'},*/
  ],
  ENTRANCE: [
    {name: 'intercom', desc: <Trans>intercom</Trans>},
    {name: 'concierge', desc: <Trans>concierge</Trans>},
    /*{name: 'intercom', desc: 'домофон'},
    {name: 'concierge', desc: 'консьерж'},*/
  ],
  WALL_TYPE: [
    {name: 'brick', desc: <Trans>brick</Trans>},
    {name: 'panel', desc: <Trans>panel</Trans>},
    {name: 'monolithic', desc: <Trans>monolithic</Trans>},
    {name: 'cinder', desc: <Trans>cinder</Trans>},
    {name: 'other', desc: <Trans>other</Trans>},
    /*{name: 'brick', desc: t('кирпичные'},
    {name: 'panel', desc: t('панельные'},
    {name: 'monolithic', desc: t('монолитные'},
    {name: 'cinder', desc: t('шлакоблок'},
    {name: 'other', desc: t('другое'},*/
  ],
  BUILDING_TYPE: [
    {name: 'carskij', desc: <Trans>carskij</Trans>},
    {name: 'stalinka', desc: <Trans>stalinka</Trans>},
    {name: 'hrushhevka', desc: <Trans>hrushhevka</Trans>},
    {name: 'gostinka', desc: <Trans>gostinka</Trans>},
    {name: 'cheshka', desc: <Trans>cheshka</Trans>},
    {name: '80s', desc: <Trans>Built in 80's</Trans>},
    {name: '90s', desc: <Trans>Built in 90's</Trans>},
    {name: '00s', desc: <Trans>Built in 2000's</Trans>},
    {name: '10s', desc: <Trans>Built in 2010's</Trans>},
    /*{name: 'carskij', desc: t('царский дом'},
    {name: 'stalinka', desc: t('сталинка'},
    {name: 'hrushhevka', desc: t('Хрущевка'},
    {name: 'gostinka', desc: t('Гостинка'},
    {name: 'cheshka', desc: t('Чешка'},
    {name: '80s', desc: t('Постройка 80-90-е'},
    {name: '90s', desc: t('Постройка 91-2000-е'},
    {name: '00s', desc: t('Постройка 2001-2010-е'},
    {name: '10s', desc: t('Постройка от 2011-е'},*/
  ],
  CONDITIONS: [
    {name: 'designer', desc: <Trans>Designer renovation</Trans>},
    {name: 'recent', desc: <Trans>Recent renovation</Trans>},
    {name: 'requires', desc: <Trans>Requires renovation</Trans>},
    {name: 'grandma', desc: <Trans>'Grandma' renovation</Trans>},
    {name: 'cosmetic', desc: <Trans>Cosmetic renovation</Trans>},
    /*{name: 'designer', desc: t('Дизайнерский ремонт'},
    {name: 'recent', desc: t('Свежий ремонт'},
    {name: 'requires', desc: t('Требует ремонта'},
    {name: 'grandma', desc: t('Бабушкин ремонт'},
    {name: 'cosmetic', desc: t('Косметический ремонт'},*/
  ],
  FURNITURE: [
    {name: 'old', desc: <Trans>Old furniture</Trans>},
    {name: 'new', desc: <Trans>New furniture</Trans>},
    {name: 'without', desc: <Trans>No furniture</Trans>},
    /*{name: 'old', desc: t('Старая мебель'},
    {name: 'new', desc: t('Новая мебель'},
    {name: 'without', desc: 'Без мебели'},*/
  ],
  ADDITIONAL_PAYMENTS: [
    {name: 'by_meters', desc: <Trans>By counters</Trans>},
    {name: 'included', desc: <Trans>Included</Trans>},
  ],
};
const getProperties = (properties) => {
  if (!properties) {
    return [];
  }
  const flatProps = [];
  for (const [key, value] of Object.entries(properties)) {
    if (values[key.toUpperCase()]) {
      const prop = values[key.toUpperCase()].find((v) => v.name === value);
      if (prop) {
        flatProps.push([propKeys[key], prop.desc]);
      }
    }
  }
  return flatProps;
};
export {
  getFloorText,
  getSizeText,
  getRoomsText,
  convertAddress,
  findNearestSubway,
  getTime,
  getProperties,
};
