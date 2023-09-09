import { useNavigate } from 'react-router-dom';
import './category-item.style.scss';

const CategoryItem = ({ category }) => {
    const { title, imageUrl } = category;
    const goTo = useNavigate();

    const handleGoToCategory = () =>{
        goTo(`shop/${title}`);
    } 

    return (
        <div className="category-container" >
            <div className='background-image' style={{ backgroundImage: `url(${imageUrl})` }} />
            <div className="category-body-container" onClick={handleGoToCategory}>
                <h2>{title}</h2>
                <p>Shop Now</p>
            </div>
        </div>
    );
}

export default CategoryItem;