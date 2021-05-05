import React from 'react'
import Layout from '../components/layouts/MainLayout'

const NotFoundPage = () => (
    <Layout>
        <section>
            <div className="container">
                <div className="row">
                    <h1>НЕ ЗНАЙДЕНО</h1>
                    <p>Ви щойно потрапили на маршрут, якого не існує...</p>
                </div>
            </div>
        </section>
    </Layout>
)

export default NotFoundPage
