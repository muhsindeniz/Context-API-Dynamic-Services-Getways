import React, { useState, useEffect } from 'react'
import NewsCard from '../../Components/NewsCard/NewsCard';

const Home = () => {
    return (
        <div className="container">
            <div className="row d-flex justify-content-center">
                <div className="col-sm-12 col-lg-6">
                    <NewsCard />
                </div>
            </div>

        </div>
    )
}

export default Home
