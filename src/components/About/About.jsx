import React from 'react';
import PropTypes from 'prop-types';

import { t } from '../../intl/helper';

// content
import content from '../../config/aboutProject';

// components
import FullScreenCard from '../FullScreenCard/FullScreenCard';
import Footer from './Footer';

// styled
import Title from './styled/Title';
import Description from './styled/Description';
import SubTitle from './styled/SubTitle';
import CompaniesContainer from './styled/CompaniesContainer';
import Company from './styled/Company';
import CompanyName from './styled/CompanyName';
import Position from './styled/Position';
import Name from './styled/Name';
import Link from './styled/Link';
import MailTo from './styled/MailTo';

const About = ({ locale, closeCard }) => (
  <FullScreenCard onClick={closeCard}>
    <Title>{t('aboutCard.heading')}</Title>
    <Description>
      {content.map(({ id, paragraph }) => (
        <p key={id}>{paragraph[locale]}</p>
      ))}
    </Description>
    <SubTitle>Команда проекта</SubTitle>
    <CompaniesContainer>
      <Company>
        <CompanyName>Музей истории ГУЛАГа</CompanyName>
        <Position>Руководитель проекта</Position>
        <Name>Роман Романов</Name>
        <Position>Научные сотрудники</Position>
        <Name>
          Илья Удовенко, Татьяна Полянская, Артём Латышев, Галина Иванова
        </Name>
        <Position>Кураторы карты</Position>
        <Name>Ирина Неустроева, Елена Солозобова, Анна Кондратьева</Name>
        <Position>Консультант</Position>
        <Name>Константин Коновалов</Name>
        <Position>Редактор</Position>
        <Name>Анна Нуруллина</Name>
        <Position>Переводчик</Position>
        <Name>Дмитрий Белановский</Name>
      </Company>
      <Company>
        <CompanyName>Урбика</CompanyName>
        <Name>Анна Баринова</Name>
        <Name>Андрей Бахвалов</Name>
        <Name>Константин Гордеев</Name>
        <Name>Татьяна Иванникова</Name>
        <Name>Антон Ивченко</Name>
        <Name>Александр Калашников</Name>
        <Name>Андрей Кармацкий</Name>
        <Name>Степан Кузьмин</Name>
        <Name>Тая Лавриненко</Name>
        <Name>Анастасия Потехина</Name>
      </Company>
    </CompaniesContainer>
    <Description>
      <div>
        Благодарим за помощь в поиске информации и предоставлении архивных
        документов и фотографий:
      </div>
      <div>Государственный архив Российской Федерации</div>
      <div>
        Международное историко-просветительское, благотворительное и
        правозащитное общество «Мемориал»
      </div>
      <div>
        Юрия Дмитриева, руководителя Карельского отделения отделения
        Международного «Мемориала»
      </div>
      <div>
        Виктора Паасо, Карельское республиканское общественное учреждение НИЦ
        «Мемориал»
      </div>
      <div>
        Михаила Рогачева, Коми республиканский благотворительный общественный
        фонд жертв политических репрессий «Покаяние»
      </div>
      <div>
        Алексея Захарченко, Самарский филиал Московского городского
        педагогического университета
      </div>
      <div>Светлану Березовскую, Музей города Северска</div>
      <div>Василия Ханевича, Мемориальный музей «Следственная тюрьма НКВД»</div>
      <div>Ирину Витман, Музей «Город на Севере России» (Воркута)</div>
      <div>Ирину Устин, Кемский краеведческий музей «Поморье»</div>
      <div>
        Надежду Толканову, Городской краеведческий музей города Лабытнанги
      </div>
      <div>
        Людмилу Липатову и коллектив Ямало-ненецкого окружного
        музейно-выставочного комплекса им. И.С.Шемановского (Салехард)
      </div>
      <div>Галину Змееву, Музейный центр города Сегежи</div>
      <div>
        Оксану Краснову, Историко-краеведческий мемориальный музей города
        Сосногорска
      </div>
      <div>Михаила Шибистого, Народный музей Сусумана</div>
      <div>
        Светлану Бандуру и Елену Морозову, Национальный музей Республики Коми
      </div>
      <div>
        Шолбана Оржака и Оттука Иргита, Музей истории политических репрессий в
        Туве
      </div>
      <div>Ивана Паникарова, Музей «Память Колымы» (поселок Ягодное)</div>
      <div>
        Ивана Игошина, Музей туристического клуба «Лидер» (Республика Саха)
      </div>
      <br />
      <div>
        Проект реализован с использованием гранта Президента Российской
        Федерации на развитие гражданского общества, предоставленного Фондом
        президентских грантов. Воспоминания людей, прошедших лагеря, и тех, кого
        коснулись репрессии, можно посмотреть на сайте проекта «Мой ГУЛАГ»:
        {' '}
        <Link
          href='https://mygulag.ru'
          rel='noopener noreferrer'
          target='_blank'
        >
          mygulag.ru
        </Link>
      </div>
    </Description>
    <MailTo href='mailto:gulagmap@gmig.ru'>gulagmap@gmig.ru</MailTo>
    <Footer locale={locale} />
  </FullScreenCard>
);

About.propTypes = {
  locale: PropTypes.PropTypes.oneOf(['ru', 'en', 'de']).isRequired,
  closeCard: PropTypes.func.isRequired
};

export default About;
