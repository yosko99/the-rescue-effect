import React from 'react';

import { Col, Row } from 'react-bootstrap';

import AnimalsForAdoption from '../components/AnimalsForAdoption';
import MainPageHeader from '../components/MainPageHeader';
import CustomCard from '../components/utils/custom/CustomCard';
import Footer from '../components/utils/Footer';
import Header from '../components/utils/Header';
import mainPageArticles from '../data/mainPageArticles';

const MainPage = () => {
  return (
    <>
      <Header />
      <MainPageHeader />
      <div className='container'>
        <p className='text-center fs-1 m-0'>Planning to adopt a pet?</p>
        <Row>
          {mainPageArticles.map((article, index: number) => (
            <Col key={index} lg={4} className='mt-5'>
              <CustomCard
                button={article.button}
                title={article.title}
                description={article.description}
                route={article.route}
              />
            </Col>
          ))}
        </Row>
        <p className='text-center fs-1 my-5 mb-4'>Pets Available for Adoption</p>
        <AnimalsForAdoption />
      </div>
      <Footer />
    </>
  );
};

export default MainPage;
