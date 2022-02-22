export function setMapLanguage(event, language) {
  const mapGL = event.target;
  const mapLanguage = language === 'uk' ? '' : `_${language}`;

  const labelList = mapGL.getStyle().layers
    .filter((layer) => layer.layout?.hasOwnProperty('text-field'))
    .filter((layer) => typeof layer.layout['text-field'] !== 'string');

  labelList.forEach((label) => {
    mapGL.setLayoutProperty(label.id, 'text-field', ['get', `name${mapLanguage}`]);
  });
}
