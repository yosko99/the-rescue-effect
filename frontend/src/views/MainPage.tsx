import React from 'react';

import { useQuery } from '@apollo/client';
import { Col, Row } from 'react-bootstrap';

import AnimalCard from '../components/AnimalCard';
import MainPageHeader from '../components/MainPageHeader';
import CustomCard from '../components/utils/custom/CustomCard';
import Footer from '../components/utils/Footer';
import Header from '../components/utils/Header';
import mainPageArticles from '../data/mainPageArticles';
import { GET_ANIMALS_FOR_ADOPTION_QUERY } from '../queries/animal.queries';
import { IAnimal } from '../types/animal.type';

const MainPage = () => {
  const { data, loading } = useQuery(
    GET_ANIMALS_FOR_ADOPTION_QUERY,
    { context: { headers: { authorization: `Bearer ${localStorage.getItem('token')}` } } }
  );

  if (loading) {
    return <div className='App-header'>Loading</div>;
  }

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
        <p className='text-center fs-1 my-5 m-0'>Pets Available for Adoption</p>
        {data.getAnimalsForAdoption === undefined || data.getAnimalsForAdoption.length === 0
          ? <p className='fs-3 text-center'>No data</p>
          : <Row>
            {data.getAnimalsForAdoption.map((animal: IAnimal, index: number) => (
              <Col lg={3} md={6} sm={12} className='my-2' key={index}>
                <AnimalCard animal={animal} />
              </Col>
            ))}
          </Row>
        }
      </div>
      <Footer />
    </>
  );
};

export default MainPage;
