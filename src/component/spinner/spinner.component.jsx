import "./spinner.styles.scss";

const Spinner = () => {
    return (
        <div id="cool-loader">
            <div className="react-spinner-loader-svg">
                <svg id="triangle" width="128" height="128" viewBox="-3 -4 39 39">
                    <polygon fill="transparent" stroke="#808282" strokeWidth="3" points="16,0 32,32 0,32" />
                </svg>  LOADING ...
            </div>
        </div>
    );
}

export default Spinner;