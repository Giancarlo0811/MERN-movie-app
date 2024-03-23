import loadingGif from '../assets/images/34338d26023e5515f6cc8969aa027bca.gif'

function Loader() {
  return (
    <div className='loader'>
        <div className='loader-image'>
            <img src={loadingGif} alt="" />
        </div>
    </div>
  )
}

export default Loader