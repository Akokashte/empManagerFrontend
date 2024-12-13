import "../styles/error.css";

const Error = () => {
    return (
        <>
        <div className="error_page">
            <div className="image_container">
                <img src="/error.svg" alt="page not found error" />
            </div>
            <h2>Page not found</h2>
        </div>
        </>
    )
}

export default Error;