import React from 'react';

import { useMutation } from '@apollo/client';
import { Button, Modal, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import adoptGIF from '../assets/adopt.gif';
import TOKEN_HEADER from '../constants/token';
import { ADOPT_ANIMAL_MUTATION } from '../mutations/user.mutations';
import { GET_ANIMALS_FOR_ADOPTION_QUERY } from '../queries/animal.queries';
import { IAnimal } from '../types/animal.type';

interface Props {
    onHide: () => void;
    show: boolean;
    animal: IAnimal;
}

const AdoptModal:React.FC<Props> = ({ onHide, show, animal }) => {
  const [adoptAnimal] = useMutation(
    ADOPT_ANIMAL_MUTATION,
    { context: { ...TOKEN_HEADER } }
  );

  const handleHide = () => {
    if (localStorage.getItem('token') !== null) {
      adoptAnimal({ variables: { animalID: animal.id }, refetchQueries: [GET_ANIMALS_FOR_ADOPTION_QUERY] });
      onHide();
    } else {
      onHide();
    }
  };

  return (
    <Modal
        show={show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
    >
        {localStorage.getItem('token') === null
          ? <>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    One more step...
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    Hey we know you are in a hurry to adopt this little guy.
                    But first you need to log in to your account so we can get the information needed for adoption.
                </p>
                <div className='d-flex justify-content-center'>
                    <Link to={'/login'}>
                        <Button variant='outline-info me-1'>Login</Button>
                    </Link>
                    <Link to={'/register'}>
                        <Button variant='outline-dark ms-1'>Register</Button>
                    </Link>
                </div>
            </Modal.Body>
        </>
          : <div>
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Hooray! You successfully adopted {animal.name}
                    </Modal.Title>
                </Modal.Header>
                <div className='d-flex justify-content-center flex-column align-items-center'>
                    <Image src={adoptGIF} width={250} height={250} alt='dancing dog'/>
                    <p className='text-center px-5'>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                        Consequuntur eligendi, fuga vero, officiis iusto ex facilis voluptatibus aut labore
                        vel veritatis repellat porro quis ratione vitae amet officia consectetur eius?
                    </p>
                </div>
          </div>
        }
        <Modal.Footer>
            <Button onClick={() => handleHide()}>Close</Button>
        </Modal.Footer>
    </Modal>
  );
};

export default AdoptModal;
