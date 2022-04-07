import {DirectoryItemContainer, BackgroundImageContainer, DirectoryBodyContainer} from './directory-item.styles.jsx';
import { useNavigate } from 'react-router-dom';

const DirectoryItem = ({category}) =>{
    const {imageUrl, title, route} = category;
    const navigate = useNavigate();
    const navigateToCategory = () => {
      navigate(route);
  }

    return(
        <DirectoryItemContainer onClick={navigateToCategory}>
          <BackgroundImageContainer
            imageUrl={imageUrl}
          />
          <DirectoryBodyContainer>
            <h2>{title}</h2>
            <p>Shop Now</p>
          </DirectoryBodyContainer>
        </DirectoryItemContainer>
    )
}

export default DirectoryItem;