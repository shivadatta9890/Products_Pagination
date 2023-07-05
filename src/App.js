
import React, { useEffect,useState } from 'react';
import './App.css';

const App = () => {
  const [products,setProducts] = useState([]);
  const [page,setPage] = useState(1);

  // one way without using async await
  // useEffect(()=>{
  //   fetch('https://dummyjson.com/products?limit=100')
  //   .then(res => res.json())
  //   .then(data => console.log(data))
  // })
  // second way using async await
  const fetchProducts = async()=>{
    const res = await fetch('https://dummyjson.com/products?limit=100');
    const data = await res.json();
    // console.log(data);
    setProducts(data.products);
  }
  useEffect(()=>{
    fetchProducts();
  },[]);
  const selectpagehandler = (selectedpage)=>{
    if
    (
      selectedpage >=1 &&
      selectedpage <= products.length/10 &&
      selectedpage !== page
    )
    setPage(selectedpage);
  };
  return (
    <div>
      {
        products.length>0 && <div className='products'>
          {
            products.slice(page*10-10,page*10).map((prod)=>{
              return <span className='product__single' key={prod.id}>
                <img src={prod.thumbnail} alt={prod.title}/>
                <span>{prod.title}</span>
              </span>
            })
          }
        </div>
      }
      {
        products.length>0 && <div className='pagination'>
          <span onClick={()=> selectpagehandler(page-1)} className={page > 1 ? "":"pagination__disabled"}>👈</span>
          {
            [...Array(products.length / 10)].map((_,i)=>{
              return <span className= {page ===i+1 ?"selected__page": ""} onClick={()=> selectpagehandler(i+1)} key={i}>{i+1}</span>
            })
          }
          <span onClick={()=> selectpagehandler(page+1)} className={page < products.length/10 ? "":"pagination__disabled"}>👉</span>
        </div>
      }

    </div>
  )
}

export default App;
