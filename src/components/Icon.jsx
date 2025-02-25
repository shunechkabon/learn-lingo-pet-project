const Icon = ({ name, width = 20, height = 20, style = {}}) => {
    return (
        <svg width={width} height={height} style={style} aria-hidden="true">
            <use href={`../assets/icons.svg#${name}`} />
        </svg>
    );
};

export default Icon;
