import React from 'react';
import PropTypes from 'prop-types';
import styles from './AppWrapper.module.css';
import Footer from "../Footer/Footer";
import Header from "../Header/Header"

const AppWrapper = ({children}) => {
    return (
        <div className={styles.app_wrapper}>
            <Header/>
            <main className={styles.app_content}>
                {children}
            </main>
            <Footer/>
        </div>
    );
};

AppWrapper.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AppWrapper;