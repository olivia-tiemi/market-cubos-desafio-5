import payment from '../../assets/payment.svg';
import shoppingCart from '../../assets/pink-shopping-cart.svg';
import { useProductStore } from '../../hooks/useStore';
import { CustomButton } from '../CustomButton';
import PostalCode from './PostalCode';
import Quantity from './Quantity';
import MainInfo from './MainInfo';

const ProductDetails = () => {
  const storedProduct = useProductStore((state) => state.product);

  return (
    <div className="content-container">
      <div className="product-info">
        <img
          src={storedProduct.photoUrl}
          alt="Foto do produto"
          className="product-photo"
        />
        <div className="product-description">
          <MainInfo />
          <img src={payment} alt="Formas de pagamento" />
          <Quantity />
          <PostalCode />
          <div className="button-container">
            <CustomButton
              text="Adicionar ao carrinho"
              variant="white"
              icon={shoppingCart}
            />
            <CustomButton text="Comprar agora" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
