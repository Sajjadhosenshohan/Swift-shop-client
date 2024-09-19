import image1 from '../assest/banner/img1.webp'
import image2 from '../assest/banner/img2.webp'
import image3 from '../assest/banner/img3.jpg'
import image4 from '../assest/banner/img4.jpg'
import image5 from '../assest/banner/img5.webp'


import image1Mobile from '../assest/banner/img1_mobile.jpg'
import image2Mobile from '../assest/banner/img2_mobile.webp'
import image3Mobile from '../assest/banner/img3_mobile.jpg'
import image4Mobile from '../assest/banner/img4_mobile.jpg'
import image5Mobile from '../assest/banner/img5_mobile.png'
import { useEffect, useState } from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'


const BannerProduct = () => {
    const [currentImage, setCurrentImage] = useState(3)
    const desktopView = [
        image4,
        image1,
        image2,
        image3,
        image5
    ]
    // console.log(desktopView)

    const mobileView = [
        image1Mobile,
        image2Mobile,
        image3Mobile,
        image4Mobile,
        image5Mobile,
    ]

    const nextImage = () => {
        if (desktopView.length -1  > currentImage) {
            setCurrentImage((prev) => prev + 1)
        }
    }
    const preveImage = () => {
        if (currentImage != 0) {
            setCurrentImage((prev) => prev - 1)
        }
    }

    useEffect(()=>{
        const interval = setInterval(()=>{
            if(desktopView.length - 1 > currentImage){
                nextImage()
            }else{
                setCurrentImage(0)
            }
        },5000)

        return ()=> clearInterval(interval)
    },[currentImage])

    return (
        <div className=' mt-5  rounded '>
            <div className='relative h-72 w-full bg-slate-200'>

                <div className='absolute z-30   h-full w-full flex justify-center '>

                    <div className='flex items-center justify-between w-full h-full text-2xl '>
                        <button onClick={preveImage} className='bg-white shadow-md rounded-full p-1'><FaAngleLeft /></button>
                        <button onClick={nextImage} className='bg-white shadow-md rounded-full p-1'><FaAngleRight /></button>
                    </div>

                </div>

                {/* image for desktop view */}

                <div className='flex w-full h-full'>
                    {
                        desktopView?.map((img, index) => {
                            return <div key={index} className=' min-h-full min-w-full w-full h-full transition-all'>

                                <img src={img} alt="image1" className='w-full h-full' style={{ transform: `translateX(-${currentImage * 100}%)` }} />
                            </div>
                        })
                    }
                </div>

                {/* image for mobile view */}

                {
                    mobileView?.map((img, index) => {
                        return <div key={index} className='w-full hidden h-full'>
                            <img src={img} alt="image" className='w-full h-full' />
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default BannerProduct
