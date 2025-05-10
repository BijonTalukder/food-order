import { Link } from 'react-router-dom';
import { IStores } from '../../constant'
import './StoreCart.css'
interface StoreCartProps {
  data: IStores;
}
const StoreCart:React.FC<StoreCartProps> = ({data}) => {
  return (
    <Link to={`store/${data._id}`}>
      <div className=" StoreCart">
        <div className='shadow-lg rounded-md'>
            <div className="image">
            <div className="kitchenImage rounded-md">
                <img  src={data.imgUrl} alt="" />
                <div className='bottom-wave'>

                <svg className="sc-cAmlYy jJRrEL" height="6" width="100%" version="1.1" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                <defs>
                    <pattern id="bg-undefined" patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse" width="30" height="6" shape-rendering="geometricPrecision" viewBox="0 0 120 18">
                        <path d="M120,21L120,21H0V1c30,0,29.8,16,60,16c30.2,0,30-16,60-16V21z" className="sc-gEzdPt crmXIf" fill="white"></path>
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#bg-undefined)"></rect>
            </svg> 
               </div>
            
          
               </div>
               <div className='avatar userImage'>
               <div className=" ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
                      <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
            </div>
            </div>
         
            
            <div className="body">
            <h2 className="card-title">Shoes!</h2>
            <div className='description'>
<h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, nemo.</h4>
            </div>
            </div>

        </div>
        {/* <div className="card bg-base-100 w-96 shadow-xl">
  <figure className="kitchenImage">
    <img
      src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
      alt="Shoes" />
      <div className="avatar">
  <div className="userImage ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
  </div>
</div>
  </figure>
  <div className="card-body">
    <h2 className="card-title">Shoes!</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div> */}
    </div>
    </Link>
    
  )
}

export default StoreCart