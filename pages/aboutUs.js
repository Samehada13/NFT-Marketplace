import React from 'react'
import Image from 'next/image'

import Style from '../styles/aboutUs.module.css'
import {Brand} from '../components/componentIndex'
import image from '../img'

const aboutUs = () => {
    const founderArray = [
        {name: "Ruben Balon", position: "Founder", images: image.user2},
        {name: " ", position: "Co-Founder", images: image.user4},
        {name: " ", position: "Chairman", images: image.user5},
        {name: " ", position: "Programmer", images: image.user7},
        {name: " ", position: "Designer", images: image.user8},
        {name: " ", position: "Software Engineer", images: image.user9},
        {name: " ", position: "Operations", images: image.user10},
        {name: " ", position: "Producer", images: image.user3},
    ]

    const factsArray = [
        {title: "10 Million", info: "This is Info This is Info This is Info "},
        {title: "100,000", info: "This is Info This is Info This is Info "},
        {title: "100", info: "This is Info This is Info This is Info "},
    ]
  return (
    <div className={Style.aboutUs}>
        <div className={Style.aboutUs_box}>
            <div className={Style.aboutUs_box_hero}>
                <div className={Style.aboutUs_box_hero_left}>
                    <h1>About NFT MArketplace</h1>
                    <p>An NFT (Non-Fungible Token) marketplace allows users to purchase, sell, and exchange digital assets represented by NFTs. 
                        NFTs are distinct digital tokens that are frequently used to indicate ownership or authenticity of digital goods 
                        like art, music, films, virtual real estate, collectibles, and so on. In an NFT marketplace, 
                        creators convert their digital works into NFTs and attach information defining their uniqueness and ownership rights. 
                        These NFTs are then placed on the market for sale or auction. Buyers may explore the ads, make bids, 
                        and buy NFTs with cryptocurrency, usually Ethereum or other blockchain-based currencies. 
                        This platform was designed primarily for graphic designers in the Bicol Region but may also be used 
                        to trade outside of the region. This platform was created to support a student's undergraduate research.
                    </p>
                </div>
                <div className={Style.aboutUs_box_hero_right}>
                    <Image src={image.hero}/>
                </div>
            </div>
            <div className={Style.aboutUs_box_title}>
                <h2>Team</h2>
                <p>
                    Building an NFT marketplace is really hard. But with the help of a very talented team, 
                it is easy to oversee this kind of project.  
                </p>
            </div>
            <div className={Style.aboutUs_box_founder}>
                <div className={Style.aboutUs_box_founder_box}>
                    {founderArray.map((el, i)=>(
                        <div className={Style.aboutUs_box_founder_box_img}>
                            <Image src={el.images}
                            alt={el.name}
                            width={500}
                            height={500}
                            className={Style.aboutUs_box_founder_box_img_img}/>
                            <h3>{el.name}</h3>
                            <p>{el.position}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className={Style.aboutUs_box_title}>
                <h2>Fast Fact</h2>
                <p>
                    The NFT market is now worth more than $40 billion, and valuations keep rising. 
                </p>
                <p>
                    The most expensive NFT either sold for $532 million or $91.8 million.
                </p>
                <p>
                    Thousands of NFT sales happen per day.
                </p>
            </div>
            









        </div>
        <Brand/>
    </div>
  )
}

export default aboutUs

// Removed line 70 to 79 
            //<div className={Style.aboutUs_box_facts}>
            //<div className={Style.aboutUs_box_facts_box}>
              //  {factsArray.map((el, i)=> (
                //    <div className={Style.aboutUs_box_facts_box_info}>
                  //      <h3>{el.title}</h3>
                    //    <p>{el.info}</p>
                  //  </div>
               // ))}
            // </div>
        //</div>