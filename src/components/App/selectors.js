import Immutable from 'immutable';
import { createSelector } from 'reselect';
import layers from '../../config/layers';

export const langSelector = state => state.getIn(['intl', 'locale']);
export const prisonsSelector = state => state.getIn(['data', 'prisons']);
export const mapStyleSelector = state => state.getIn(['data', 'mapStyles']);
export const typesSelector = state => state.getIn(['data', 'types']);
export const currentYearSelector = state => state.getIn(['ui', 'currentYear']);
export const viewportSelector = state => state.getIn(['ui', 'viewport']);
export const isShowAllPrisonsSelector = state => state.getIn(['ui', 'isShowAllPrisons']);
export const isCampFiltersOpenSelector = state => state.getIn(['ui', 'isCampFiltersOpen']);

const emptyGeoJSONSource = Immutable.fromJS({
  type: 'geojson',
  data: {
    type: 'FeatureCollection',
    features: []
  }
});

const prisonSourceSelector = createSelector(
  prisonsSelector,
  langSelector,
  isShowAllPrisonsSelector,
  currentYearSelector,
  (prisons, lang, isShowAllPrisons, currentYear) => {
    if (!prisons) {
      return emptyGeoJSONSource;
    }

    const features = prisons
      .toList()
      .filter(prison => prison.getIn(['published', lang]))
      .reduce((acc, prison) => (
        prison
          .get('features')
          .reduce((oldFeatures, feature) => {
            if (feature.getIn(['properties', currentYear.toString()]) || isShowAllPrisons) {
              const newProperties = Immutable.Map({
                id: prison.get('id'),
                ruName: prison.getIn(['name', 'ru']),
                enName: prison.getIn(['name', 'en']),
                deName: prison.getIn(['name', 'de']),
                peoples: feature.getIn(['properties', currentYear.toString(), 'peoples'])
              });

              return oldFeatures.push(feature.set('properties', newProperties));
            }
            return oldFeatures;
          }, acc)
      ), Immutable.List());

    return emptyGeoJSONSource
      .setIn(['data', 'features'], features);
  }
);

// eslint-disable-next-line import/prefer-default-export
export const finalStyleSelector = createSelector(
  mapStyleSelector,
  prisonSourceSelector,
  currentYearSelector,
  langSelector,
  (mapStyle, prisonSource, currentYear, lang) => {
    if (!mapStyle) {
      return null;
    }

    const ussrLayerId = mapStyle
      .get('layers')
      .findIndex(layer => layer.get('id') === 'USSR');

    const citiesLayerId = mapStyle
      .get('layers')
      .findIndex(layer => layer.get('id') === 'city all last');

    const getUSSRBoundaryFilterByYear = () => {
      if (currentYear !== 1960) {
        return Immutable.fromJS(
          ['all',
            ['<=', 'year_start', currentYear],
            ['>', 'year_end', currentYear]
          ]
        );
      }

      return Immutable.fromJS(
        ['all',
          ['==', 'year_end', currentYear]
        ]
      );
    };
    const citiesFilterByYear = Immutable.fromJS(
      ['all',
        ['==', 'year', currentYear]
      ]
    );

    const citiesLang = `{historical_name${lang === 'ru' ? '' : '_en'}}`;

    return mapStyle
      .setIn(['sources', 'prisons'], prisonSource)
      .setIn(['layers', ussrLayerId, 'filter'], getUSSRBoundaryFilterByYear())
      .setIn(['layers', citiesLayerId, 'filter'], citiesFilterByYear)
      .setIn(['layers', citiesLayerId, 'layout', 'text-field'], citiesLang)
      .update('layers', previousLayers => previousLayers.concat(layers));
  }
);
