/* eslint-disable react/prop-types */
import { useParams } from 'react-router-dom';

const OfferScreen = ({ offers }) => {
  // Получаем id из URL
  const { id } = useParams();

  // Ищем предложение по id
  const offer = offers.find((offer) => offer.id === id);

  // Отображаем информацию о предложении или сообщение, если оно не найдено
  return (
    <div>
      {offer ? (
        <div>
          <h1>{offer.title}</h1>
          <p>{offer.description}</p>
          {/* Остальная информация о предложении */}
        </div>
      ) : (
        <p>Предложение не найдено</p>
      )}
    </div>
  );
};

export default OfferScreen;