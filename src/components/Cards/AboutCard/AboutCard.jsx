import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { langSelector } from '../../App/selectors';

// ico
import urbica from './urbica.svg';
import museum from './museum.svg';
import museumEn from './museum-en.svg';
import cross from '../../../icons/btn-close.svg';

import CardButton from '../../Buttons/CardButton';

// styled
import Container from './Container';
import Header from './Header';
import Title from './Title';
import DescriptionContainer from './DescriptionContainer';
import Footer from './Footer';

const img = {
  ru: museum,
  en: museumEn,
  de: museumEn
};

const AboutCard = props => (
  <Container>
    <Header>
      <Title>О проекте</Title>
      <CardButton onClick={props.dispatch.bind(null, push('/'))}>
        <img src={cross} alt='cross' />
      </CardButton>
    </Header>
    <DescriptionContainer>
      <p>
        «Интерактивная карта ГУЛАГа» — это своего рода попытка наглядно рассказать о политических
        репрессиях в СССР, направленная на развитие у зрителя географического мышления, без которого
        оценить масштабы репрессий просто невозможно. Карта является отдельным музейным проектом по
        объединению и систематизации научных знаний о ГУЛАГе, перенесенных в картографическую
        плоскость.
      </p>
      <p>
        Интерактивная карта предоставит возможность проследить географию и экономику
        принудительного труда в СССР с 1918 по 1960 год. На данный момент карта включает в себя базу
        данных по 479 исправительно-трудовым и особым лагерям, а также содержит информацию по
        лагерям принудительных работ первых лет советской
        власти и спецлагерям НКВД-МВД СССР, образованным на территории Советской зоны оккупации
        Германии в 1945 году. Помимо истории ГУЛАГа, карта иллюстрирует процессы массового
        переселения отдельных категорий граждан {'"'}спецпоселенцев{'"'}, пограничных зачисток
        1930-1940-х гг. и депортации народов. Кроме того, карта будет предоставлять данные о
        концентрационных лагерях, располагавшихся на территории РСФСР в первые годы советской
        власти, {'"'}спецлагерях{'"'} НКВД-МВД в Восточной Германии, а также
        проверочно-фильтрационных лагерях и детских колониях.
      </p>
      <p>
        Карта снабжена научно-справочным аппаратом в виде статистических данных, основанных как на
        научных исследованиях, так и архивных материалах. Проект призван объединить вокруг себя
        специалистов из различных регионов России и стран бывшего СССР для дополнения и уточнения
        исторической информации, а также снабжения карты фотоматериалами и архивными документами.
        Таким образом {'"'}Интерактивная карта ГУЛАГа{'"'} - это постоянно пополняющаяся база данных
        об истории политических репрессий в СССР, которая поможет всем интересующимся не только
        разобраться в данной теме, но и принять непосредственное участие в создании данного
        проекта.
      </p>
    </DescriptionContainer>
    <Footer>
      <a href='http://gmig.ru/' target='_blank' rel='noreferrer noopener'>
        <img src={img[props.lang]} alt='' />
      </a>
      <a href='http://urbica.co/' target='_blank' rel='noreferrer noopener'>
        <img src={urbica} alt='URBICA' />
        <div style={{ marginTop: '9px' }}>Дизайн и разработка</div>
      </a>
    </Footer>
  </Container>
);

AboutCard.propTypes = {
  dispatch: PropTypes.func.isRequired,
  lang: PropTypes.string.isRequired
};

export default connect(
  state => ({
    lang: langSelector(state)
  })
)(AboutCard);
