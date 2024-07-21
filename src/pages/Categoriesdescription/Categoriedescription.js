import React from "react";



const Categoriedescription = ({image,title,description}) => {


    return (
        <>

            <article className="categorie-product-photo">
                <img
                    src={image}
                    alt={title}
                />
                <h2 className="categorie-product-photo-name">{title}</h2>
                <p className="categorie-product-photo-description">{description}</p>
            </article>
        </>
    )


}

export default Categoriedescription;
