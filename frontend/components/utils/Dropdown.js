import Select from 'react-select';

const customStyles = {
    control: (provided, _) => ({
        ...provided,
        borderRadius: '10px',
        minHeight: '3.5rem',
        height: '3.5rem',
    }),

    menu: (provided, _) => ({
        ...provided,
        borderRadius: '10px',
    }),

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