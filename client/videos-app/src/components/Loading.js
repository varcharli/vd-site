import loadingGif from './assets/loading.gif';
import './Loading.css';

export const PageLoading = () => {
    return (
        <div className="container">
            <div className="loading-page-container">
                <img src={loadingGif} alt="Loading..." className="loading-gif" />
            </div>
        </div>
    );
}

