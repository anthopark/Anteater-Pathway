import Select from 'react-select';

const customStyles = {
    control: (provided) => ({
        ...provided,
        borderRadius: '10px',
        minHeight: '3.2rem',
        height: '3.2rem',
        paddingBottom: '5px',
    }),

    menu: (provided) => ({
        ...provided,
        borderRadius: '10px',
    }),

    input: (provided) => ({
        ...provided,
        paddingBottom: '6px',
    }),

    placeholder: (provided) => ({
        ...provided,
        paddingBottom: '6px',
    })

}

const Dropdown = ({ id, options, placeholder }) => {
    return (
        <Select
            instanceId={id}
            styles={customStyles}
            options={options}
            placeholder={placeholder}
        />
    );
}

export default Dropdown;