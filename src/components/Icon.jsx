const Icon = ({ name, width = 20, height = 20, style = {}, className}) => {
    return (
        <svg
            width={width}
            height={height}
            style={style}
            className={className}
        >
            <use href={`/src/assets/icons.svg#${name}`} />
        </svg>
    );
};

export default Icon;
