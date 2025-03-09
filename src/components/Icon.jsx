const Icon = ({ name, width = 20, height = 20, style = {}, className }) => {
    const spritePath = `${import.meta.env.BASE_URL}icons.svg`;

    return (
        <svg
            width={width}
            height={height}
            style={style}
            className={className}
        >
            <use href={`${spritePath}#${name}`} />
        </svg>
    );
};

export default Icon;
