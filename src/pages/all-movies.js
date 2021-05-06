import React from "react";
import MainLayout from "../components/layouts/MainLayout";

const AllMovies = () => {
    return (
        <MainLayout>
            <section className="all-movies">
                <div className="container">
                    <div className="row">
                        <div className="all-moviews__inner">
                            <h1>All Movies</h1>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    )
}

export default AllMovies