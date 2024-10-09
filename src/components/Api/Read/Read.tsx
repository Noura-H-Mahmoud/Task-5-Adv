import { useEffect, useState } from 'react';
import './Read.css';
import axios from 'axios';
import Button from '../../Button/Button';
import '../../Button/Button.css'
import Pagination from '../../Pagination/Pagination';
import SearchBox from '../../SearchBox/SearchBox';
import { Link, useNavigate } from 'react-router-dom';
import Popup from '../Popup/Popup';
import defaultImage from '../../../assets/images/default.png';

interface Product {
  id: number;
  name: string;
  price: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}

export default function Read() {
  const [Products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productPerPage, setProductPerPage] = useState<number>(8); // control products per page
  const [searchTerm, setSearchTerm] = useState<string>('');
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [productIdToDelete, setpProductIdToDelete] = useState<number | null>(null);
  const [message, setMessage] = useState<string>('');

  // Control productPerPage based on screen width and height
  useEffect(() => {
    const updateProductPerPage = () => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      if (screenWidth <= 870) {
        setProductPerPage(1); // display 1 product
      } else if (screenWidth <= 1120) {
        setProductPerPage(4); // display 4 products
      } else if (screenWidth <= 1370) {
        setProductPerPage(6); // display 6 products
      } else {
        setProductPerPage(8); // default to 8 products
      }

      // control based on screen height
      if (screenHeight <= 750) {
        setProductPerPage(1); // only show one row 
      }
    };

    // Call the function on page load and when resizing the window
    updateProductPerPage();
    window.addEventListener('resize', updateProductPerPage);

    return () => window.removeEventListener('resize', updateProductPerPage);
  }, []);

  useEffect(() => {
    axios.get('https://test1.focal-x.com/api/items', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => {
        setProducts(res.data);
        setError(null);
      })
      .catch(error => {
        console.error("Error fetching products: ", error);
        setError("Error fetching product details.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // The products in current page
  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;

  // to change the page
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  }

  // for the next page
  const handleNextPage = () => {
    if (currentPage < pageCount) {
      setCurrentPage(currentPage + 1);
    }
  }

  // for the pre page
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  // for search
  const filteredProducts = Products.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const pageCount = Math.ceil(filteredProducts.length / productPerPage);

  // for show 
  const showProduct = (id: number) => {
    navigate(`/Task-5-Adv/show/${id}`);
  };

  // for create
  const createProduct = () => {
    navigate('/Task-5-Adv/create');
  }

  // fun to delete
  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>, productId: number) => {
    e.stopPropagation();
    setpProductIdToDelete(productId);
    setShowPopup(true);
  };

  // fun to confirm delete
  const handleConfirmDelete = async () => {
    if (productIdToDelete) {
      try {
        await axios.delete(`https://test1.focal-x.com/api/items/${productIdToDelete}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setProducts(prevProducts => prevProducts.filter(product => product.id !== productIdToDelete));
        setMessage('Product deleted successfully.');
        setTimeout(() => {
          setShowPopup(false);
          setpProductIdToDelete(null);
        }, 2000);
      } catch (error) {
        console.log('Error deleting product:', error);
        setMessage('Error deleting product.');
      }
    }
  };

  // fun to cancel delete
  const handelCancelDelete = () => {
    setShowPopup(false);
  };

  return (
    <div className='NM_Read'>
      {showPopup && <div className="overlay"></div>}
      <div className='NM_SearchBoxWidth'>
        <SearchBox onSearchChange={setSearchTerm} />
      </div>
      <div className='NM_ButtonAdd'>
        <Button type='submit' buttonText='ADD NEW PRODUCT'
          styleButton='NM_StyleAdd' onClick={createProduct} />
      </div>
      {isLoading ? (
        <p className='NM_Loading'>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : filteredProducts.length === 0 ? (
        <p className='NM_Empty'>No products found matching your search criteria.</p>
      ) : (
        <div className="NM_product-list">
          {currentProducts.map(product => (
            <div key={product.id} className="NM_product-card" onClick={() => showProduct(product.id)}>
              <img src={product.image_url || defaultImage}
                alt={product.name}
                className="NM_product-image"
                onError={(e) => {
                  e.currentTarget.src = defaultImage;
                }}
              />
              <div className='NM_hoverContainer'>
                <h3 className="NM_product-name">{product.name}</h3>
                <div className='NM_deleteEditButtons'>
                  <Link to={`/Task-5-Adv/update/${product.id}`}
                    onClick={(e) => { e.stopPropagation(); }}
                  >
                    <Button type='submit' buttonText='Edit' styleButton='NM_StyleEdit' />
                  </Link>
                  <Button type='button' buttonText='Delete'
                    styleButton='NM_StyleEdit NM_StyleDelete'
                    onClick={(e) => handleDeleteClick(e, product.id)} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {showPopup && (
        <Popup message='ARE YOU SURE YOU WANT TO DELETE THE PRODUCT?'>
          <Button buttonText="Yes" styleButton="mainStyleButton NM_DeleteYesNo"
            type='button' onClick={handleConfirmDelete} />
          <Button buttonText="No" styleButton="mainStyleButton NM_DeleteYesNo"
            type='button' onClick={handelCancelDelete} />
          {message && <p className='NM_DeleteProduct'>{message}</p>}
        </Popup>
      )}
      <div className='NM_Pagination'>
        <Pagination
          onClickPrev={handlePreviousPage}
          onClickNext={handleNextPage}
          onClickChange={handlePageChange}
          Page={currentPage}
          Count={pageCount}
        />
      </div>
    </div>
  );
}
